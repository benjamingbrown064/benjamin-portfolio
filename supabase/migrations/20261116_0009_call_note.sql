-- A short note is written once per call when it ends.
alter table public.chat_calls add column if not exists noted boolean not null default false;
notify pgrst, 'reload schema';

-- True once only per call, so a note cannot be asked for again and again.
create or replace function public.call_claim_note(p_call uuid)
returns boolean language sql as $$
  with c as (update public.chat_calls set noted = true where id = p_call and not noted returning id)
  select exists (select 1 from c);
$$;
revoke all on function public.call_claim_note(uuid) from public, anon, authenticated;
grant execute on function public.call_claim_note(uuid) to service_role;
notify pgrst, 'reload schema';
