-- Voice for the assistant, and the ask-once details gate.

alter table public.chat_sessions add column if not exists voice_seconds numeric(10,2) not null default 0;
alter table public.chat_sessions add column if not exists known_at timestamptz;

create table if not exists public.chat_voice (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  ip_hash text,
  kind text not null check (kind in ('listen', 'speak')),
  seconds numeric(10,2) not null default 0,
  cost_usd numeric(12,6) not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists chat_voice_ip_idx on public.chat_voice (ip_hash, created_at desc);
create index if not exists chat_voice_created_idx on public.chat_voice (created_at desc);
alter table public.chat_voice enable row level security;

create or replace function public.voice_precheck(p_session uuid, p_ip text)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'session_seconds', coalesce((select voice_seconds from public.chat_sessions where id = p_session), 0),
    'known', coalesce((select email is not null from public.chat_sessions where id = p_session), false),
    'ip_day_seconds', coalesce((select sum(seconds) from public.chat_voice where ip_hash = p_ip and created_at > now() - interval '1 day'), 0),
    'site_day_seconds', coalesce((select sum(seconds) from public.chat_voice where created_at > now() - interval '1 day'), 0),
    'month_cost', coalesce((select sum(cost_usd) from public.chat_sessions where last_at >= date_trunc('month', now())), 0),
    'last_reply', (select text from public.chat_messages where session_id = p_session and role = 'assistant' order by id desc limit 1)
  );
$$;

create or replace function public.voice_log(p_session uuid, p_ip text, p_kind text, p_seconds numeric, p_cost numeric)
returns void language plpgsql as $$
begin
  insert into public.chat_sessions (id, ip_hash) values (p_session, p_ip) on conflict (id) do nothing;
  insert into public.chat_voice (session_id, ip_hash, kind, seconds, cost_usd) values (p_session, p_ip, p_kind, p_seconds, p_cost);
  update public.chat_sessions set voice_seconds = voice_seconds + p_seconds, cost_usd = cost_usd + p_cost, last_at = now() where id = p_session;
end;
$$;

-- The visitor leaves their details once; every gated feature then opens for that conversation.
create or replace function public.visitor_identify(p_session uuid, p_ip text, p_name text, p_email text)
returns void language plpgsql as $$
begin
  insert into public.chat_sessions (id, ip_hash, name, email, known_at) values (p_session, p_ip, p_name, p_email, now())
  on conflict (id) do update set name = coalesce(excluded.name, public.chat_sessions.name), email = excluded.email, known_at = coalesce(public.chat_sessions.known_at, now());
end;
$$;

revoke all on function public.voice_precheck(uuid, text) from public, anon, authenticated;
revoke all on function public.voice_log(uuid, text, text, numeric, numeric) from public, anon, authenticated;
revoke all on function public.visitor_identify(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.voice_precheck(uuid, text) to service_role;
grant execute on function public.voice_log(uuid, text, text, numeric, numeric) to service_role;
grant execute on function public.visitor_identify(uuid, text, text, text) to service_role;

notify pgrst, 'reload schema';

-- The message check now also reports whether the visitor has left their details.
create or replace function public.chat_precheck(p_session uuid, p_ip text)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'session_messages', coalesce((select user_messages from public.chat_sessions where id = p_session), 0),
    'known', coalesce((select email is not null from public.chat_sessions where id = p_session), false),
    'ip_hour', (select count(*) from public.chat_messages where role = 'user' and ip_hash = p_ip and created_at > now() - interval '1 hour'),
    'ip_day', (select count(*) from public.chat_messages where role = 'user' and ip_hash = p_ip and created_at > now() - interval '1 day'),
    'site_day', (select count(*) from public.chat_messages where role = 'user' and created_at > now() - interval '1 day'),
    'month_cost', coalesce((select sum(cost_usd) from public.chat_sessions where last_at >= date_trunc('month', now())), 0)
  );
$$;
