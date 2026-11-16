-- Live voice calls with Toto. A call is billed by the minute while it is open (the voice provider charges for
-- the whole call, listening included), so each call is a row whose open time is billed in steps: at every turn,
-- and when it ends. The seconds land in chat_voice like any other voice use, so the existing allowances and the
-- monthly cap count them.

alter table public.chat_voice drop constraint if exists chat_voice_kind_check;
alter table public.chat_voice add constraint chat_voice_kind_check check (kind in ('listen', 'speak', 'call'));

create table if not exists public.chat_calls (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  ip_hash text,
  started_at timestamptz not null default now(),
  billed_until timestamptz not null default now(),
  ended_at timestamptz,
  seconds numeric(10,2) not null default 0
);
create index if not exists chat_calls_open_idx on public.chat_calls (ended_at, billed_until desc);
create index if not exists chat_calls_ip_idx on public.chat_calls (ip_hash, started_at desc);
alter table public.chat_calls enable row level security;

-- Opens a call if fewer than p_max_open calls are running on the whole site. A call counts as running until it
-- ends, or until nothing has been heard from it for 15 minutes (a call cannot run longer than 10).
create or replace function public.call_open(p_session uuid, p_ip text, p_max_open int)
returns jsonb language plpgsql as $$
declare
  v_open int;
  v_id uuid;
begin
  perform pg_advisory_xact_lock(4242001);
  select count(*) into v_open from public.chat_calls where ended_at is null and started_at > now() - interval '15 minutes';
  if v_open >= p_max_open then
    return jsonb_build_object('ok', false, 'open', v_open);
  end if;
  insert into public.chat_sessions (id, ip_hash) values (p_session, p_ip) on conflict (id) do nothing;
  insert into public.chat_calls (session_id, ip_hash) values (p_session, p_ip) returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

-- Bills the time since the last step. p_end closes the call. Returns the call's total seconds so far.
create or replace function public.call_tick(p_call uuid, p_rate numeric, p_end boolean)
returns jsonb language plpgsql as $$
declare
  c public.chat_calls%rowtype;
  v_secs numeric;
begin
  select * into c from public.chat_calls where id = p_call for update;
  if not found then return jsonb_build_object('ok', false); end if;
  if c.ended_at is not null then return jsonb_build_object('ok', true, 'seconds', c.seconds, 'ended', true); end if;
  v_secs := least(greatest(extract(epoch from now() - c.billed_until), 0), 900);
  if v_secs > 0 then
    insert into public.chat_voice (session_id, ip_hash, kind, seconds, cost_usd) values (c.session_id, c.ip_hash, 'call', v_secs, v_secs * p_rate);
    update public.chat_sessions set voice_seconds = voice_seconds + v_secs, cost_usd = cost_usd + v_secs * p_rate, last_at = now() where id = c.session_id;
  end if;
  update public.chat_calls set billed_until = now(), seconds = seconds + v_secs, ended_at = case when p_end then now() else null end where id = p_call
  returning seconds into v_secs;
  return jsonb_build_object('ok', true, 'seconds', v_secs, 'ended', p_end);
end;
$$;

revoke all on function public.call_open(uuid, text, int) from public, anon, authenticated;
revoke all on function public.call_tick(uuid, numeric, boolean) from public, anon, authenticated;
grant execute on function public.call_open(uuid, text, int) to service_role;
grant execute on function public.call_tick(uuid, numeric, boolean) to service_role;

notify pgrst, 'reload schema';
