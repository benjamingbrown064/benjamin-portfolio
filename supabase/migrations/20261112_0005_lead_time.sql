-- Record the moment a conversation first gains an email, so a chat lead is reported once.
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
    known_at = case when p_email is not null and known_at is null then now() else known_at end,
    email = coalesce(p_email, email),
    last_at = now()
  where id = p_session;
end;
$$;
notify pgrst, 'reload schema';
