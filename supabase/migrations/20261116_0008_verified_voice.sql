-- Longer voice use needs an email the visitor has proved is theirs (the code), not just one typed into the chat.
alter table public.chat_sessions add column if not exists verified_at timestamptz;

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
  update public.chat_sessions set verified_at = coalesce(verified_at, now()) where id = p_session;
  return jsonb_build_object('ok', true, 'name', c.name);
end;
$$;

-- 'known' for voice now means a checked email.
create or replace function public.voice_precheck(p_session uuid, p_ip text)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'session_seconds', coalesce((select voice_seconds from public.chat_sessions where id = p_session), 0),
    'known', coalesce((select verified_at is not null from public.chat_sessions where id = p_session), false),
    'ip_day_seconds', coalesce((select sum(seconds) from public.chat_voice where ip_hash = p_ip and created_at > now() - interval '1 day'), 0),
    'site_day_seconds', coalesce((select sum(seconds) from public.chat_voice where created_at > now() - interval '1 day'), 0),
    'month_cost', coalesce((select sum(cost_usd) from public.chat_sessions where last_at >= date_trunc('month', now())), 0),
    'last_reply', (select text from public.chat_messages where session_id = p_session and role = 'assistant' order by id desc limit 1)
  );
$$;

notify pgrst, 'reload schema';
