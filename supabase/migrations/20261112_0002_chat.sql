-- Toto, the website assistant: conversations, messages and the counters used for limits and cost caps.

create table if not exists public.chat_sessions (
  id uuid primary key,
  ip_hash text,
  name text,
  email text,
  user_messages integer not null default 0,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  cost_usd numeric(12,6) not null default 0,
  first_page text,
  created_at timestamptz not null default now(),
  last_at timestamptz not null default now()
);
create index if not exists chat_sessions_last_at_idx on public.chat_sessions (last_at desc);

create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  text text not null,
  actions jsonb,
  page text,
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists chat_messages_session_idx on public.chat_messages (session_id, id);
create index if not exists chat_messages_ip_idx on public.chat_messages (ip_hash, created_at desc) where role = 'user';
create index if not exists chat_messages_created_idx on public.chat_messages (created_at desc);

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- Everything the server needs to decide whether another message is allowed, in one round trip.
create or replace function public.chat_precheck(p_session uuid, p_ip text)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'session_messages', coalesce((select user_messages from public.chat_sessions where id = p_session), 0),
    'ip_hour', (select count(*) from public.chat_messages where role = 'user' and ip_hash = p_ip and created_at > now() - interval '1 hour'),
    'ip_day', (select count(*) from public.chat_messages where role = 'user' and ip_hash = p_ip and created_at > now() - interval '1 day'),
    'site_day', (select count(*) from public.chat_messages where role = 'user' and created_at > now() - interval '1 day'),
    'month_cost', coalesce((select sum(cost_usd) from public.chat_sessions where last_at >= date_trunc('month', now())), 0)
  );
$$;

-- Record one exchange and update the session's counters.
create or replace function public.chat_log_turn(
  p_session uuid, p_ip text, p_page text, p_user text, p_reply text, p_actions jsonb,
  p_in bigint, p_out bigint, p_cost numeric, p_name text, p_email text
) returns void language plpgsql as $$
begin
  insert into public.chat_sessions (id, ip_hash, first_page) values (p_session, p_ip, p_page)
  on conflict (id) do nothing;
  insert into public.chat_messages (session_id, role, text, page, ip_hash) values (p_session, 'user', p_user, p_page, p_ip);
  insert into public.chat_messages (session_id, role, text, actions, page) values (p_session, 'assistant', p_reply, p_actions, p_page);
  update public.chat_sessions set
    user_messages = user_messages + 1,
    input_tokens = input_tokens + coalesce(p_in, 0),
    output_tokens = output_tokens + coalesce(p_out, 0),
    cost_usd = cost_usd + coalesce(p_cost, 0),
    name = coalesce(p_name, name),
    email = coalesce(p_email, email),
    last_at = now()
  where id = p_session;
end;
$$;

revoke all on function public.chat_precheck(uuid, text) from public, anon, authenticated;
revoke all on function public.chat_log_turn(uuid, text, text, text, text, jsonb, bigint, bigint, numeric, text, text) from public, anon, authenticated;
grant execute on function public.chat_precheck(uuid, text) to service_role;
grant execute on function public.chat_log_turn(uuid, text, text, text, text, jsonb, bigint, bigint, numeric, text, text) to service_role;
