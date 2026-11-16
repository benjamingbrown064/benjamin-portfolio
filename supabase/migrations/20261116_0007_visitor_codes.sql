-- Email codes: a visitor's email is only counted as theirs once they type the six-digit code sent to it.
-- Only a hash of the code is kept. A code works for 10 minutes and allows 5 tries.

create table if not exists public.visitor_codes (
  id bigint generated always as identity primary key,
  session_id uuid not null,
  ip_hash text,
  name text,
  email text not null,
  code_hash text not null,
  attempts int not null default 0,
  used_at timestamptz,
  expires_at timestamptz not null default now() + interval '10 minutes',
  created_at timestamptz not null default now()
);
create index if not exists visitor_codes_session_idx on public.visitor_codes (session_id, created_at desc);
create index if not exists visitor_codes_ip_idx on public.visitor_codes (ip_hash, created_at desc);
create index if not exists visitor_codes_email_idx on public.visitor_codes (lower(email), created_at desc);
alter table public.visitor_codes enable row level security;

-- Saves a new code unless this connection or this email has asked for too many lately.
create or replace function public.visitor_code_create(p_session uuid, p_ip text, p_name text, p_email text, p_hash text)
returns jsonb language plpgsql as $$
begin
  if (select count(*) from public.visitor_codes where ip_hash = p_ip and created_at > now() - interval '1 hour') >= 6
     or (select count(*) from public.visitor_codes where lower(email) = lower(p_email) and created_at > now() - interval '1 hour') >= 3
     or (select count(*) from public.visitor_codes where created_at > now() - interval '1 day') >= 300 then
    return jsonb_build_object('ok', false);
  end if;
  insert into public.visitor_codes (session_id, ip_hash, name, email, code_hash) values (p_session, p_ip, p_name, p_email, p_hash);
  return jsonb_build_object('ok', true);
end;
$$;

-- Checks a code against the newest one for this conversation. On a match the visitor is identified.
create or replace function public.visitor_code_verify(p_session uuid, p_ip text, p_hash text)
returns jsonb language plpgsql as $$
declare
  c public.visitor_codes%rowtype;
begin
  select * into c from public.visitor_codes where session_id = p_session and used_at is null order by id desc limit 1 for update;
  if not found or c.expires_at < now() then return jsonb_build_object('ok', false, 'reason', 'expired'); end if;
  if c.attempts >= 5 then return jsonb_build_object('ok', false, 'reason', 'tries'); end if;
  if c.code_hash <> p_hash then
    update public.visitor_codes set attempts = attempts + 1 where id = c.id;
    return jsonb_build_object('ok', false, 'reason', 'wrong', 'left', 4 - c.attempts);
  end if;
  update public.visitor_codes set used_at = now() where id = c.id;
  perform public.visitor_identify(p_session, p_ip, c.name, c.email);
  return jsonb_build_object('ok', true, 'name', c.name);
end;
$$;

revoke all on function public.visitor_code_create(uuid, text, text, text, text) from public, anon, authenticated;
revoke all on function public.visitor_code_verify(uuid, text, text) from public, anon, authenticated;
grant execute on function public.visitor_code_create(uuid, text, text, text, text) to service_role;
grant execute on function public.visitor_code_verify(uuid, text, text) to service_role;

notify pgrst, 'reload schema';
