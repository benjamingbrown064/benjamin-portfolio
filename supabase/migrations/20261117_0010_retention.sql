-- Keeps the privacy page's promise: "Assistant conversations: 90 days, unless they became a request."
-- Runs every night at 03:15 UTC inside the database (pg_cron), so it does not depend on the website or the Mac.
-- A conversation is kept if its visitor's email is on a request or a discovery submission, or a first-look
-- report was made from it. Deleting a conversation also deletes its messages, voice use and calls (cascade).

create extension if not exists pg_cron;

create or replace function public.retention_purge()
returns jsonb language plpgsql as $$
declare
  n_chats int;
  n_codes int;
begin
  with gone as (
    delete from public.chat_sessions s
    where s.last_at < now() - interval '90 days'
      and not exists (select 1 from public.requests r where s.email is not null and lower(r.email) = lower(s.email))
      and not exists (select 1 from public.discovery_submissions d
                      where (s.email is not null and lower(d.email) = lower(s.email)) or d.answers->>'session' = s.id::text)
    returning 1
  ) select count(*) into n_chats from gone;
  -- Email codes are only useful for 10 minutes; keep a week for abuse checks, then delete.
  with gone as (delete from public.visitor_codes where created_at < now() - interval '7 days' returning 1)
  select count(*) into n_codes from gone;
  return jsonb_build_object('chats_deleted', n_chats, 'codes_deleted', n_codes, 'at', now());
end;
$$;

revoke all on function public.retention_purge() from public, anon, authenticated;
grant execute on function public.retention_purge() to service_role;

select cron.unschedule(jobid) from cron.job where jobname = 'site-retention';
select cron.schedule('site-retention', '15 3 * * *', $$select public.retention_purge()$$);
