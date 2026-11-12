-- Discovery by conversation: the message check also returns who the visitor is, so a first-look
-- report can be saved against their details.
create or replace function public.chat_precheck(p_session uuid, p_ip text)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'session_messages', coalesce((select user_messages from public.chat_sessions where id = p_session), 0),
    'known', coalesce((select email is not null from public.chat_sessions where id = p_session), false),
    'name', (select name from public.chat_sessions where id = p_session),
    'email', (select email from public.chat_sessions where id = p_session),
    'reports', (select count(*) from public.discovery_submissions where journey = 'conversation' and ip_hash = p_ip and created_at > now() - interval '1 day'),
    'ip_hour', (select count(*) from public.chat_messages where role = 'user' and ip_hash = p_ip and created_at > now() - interval '1 hour'),
    'ip_day', (select count(*) from public.chat_messages where role = 'user' and ip_hash = p_ip and created_at > now() - interval '1 day'),
    'site_day', (select count(*) from public.chat_messages where role = 'user' and created_at > now() - interval '1 day'),
    'month_cost', coalesce((select sum(cost_usd) from public.chat_sessions where last_at >= date_trunc('month', now())), 0)
  );
$$;
notify pgrst, 'reload schema';
