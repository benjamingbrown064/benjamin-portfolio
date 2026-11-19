-- Privacy page: requests, discovery answers and bookings are kept "up to two years after the last contact".
-- A person's rows go once their newest contact of any kind is over two years old. Marking any of their requests,
-- discoveries or bookings with status 'keep' (or 'client') holds everything of theirs: a working relationship.
-- Uploaded files live in storage and can only be removed through its API, so the website's nightly job
-- (/api/cron/retention) asks for the list, removes the files, then calls the purge.
create or replace function public.retention_expired_emails()
returns table (email text) language sql stable as $$
  with contact as (
    select lower(r.email) e, r.created_at t, r.status s from public.requests r where r.email is not null
    union all select lower(d.email), d.created_at, d.status from public.discovery_submissions d where d.email is not null
    union all select lower(b.email), b.created_at, b.status from public.booking_requests b where b.email is not null
    union all select lower(c.email), c.last_at, null from public.chat_sessions c where c.email is not null
  )
  select e from contact group by e
  having max(t) < now() - interval '2 years' and not bool_or(coalesce(s, '') in ('keep', 'client'));
$$;

create or replace function public.retention_expired_files()
returns table (path text) language sql stable as $$
  select f.path from public.request_files f join public.requests r on r.id = f.request_id
  where lower(r.email) in (select email from public.retention_expired_emails());
$$;

create or replace function public.retention_purge_people()
returns jsonb language plpgsql as $$
declare
  gone text[];
  n_req int; n_disc int; n_book int; n_chat int; n_sub int; n_brief int;
begin
  select coalesce(array_agg(email), '{}') into gone from public.retention_expired_emails();
  with d as (delete from public.requests where lower(email) = any(gone) returning 1) select count(*) into n_req from d;
  with d as (delete from public.discovery_submissions where lower(email) = any(gone) returning 1) select count(*) into n_disc from d;
  with d as (delete from public.booking_requests where lower(email) = any(gone) returning 1) select count(*) into n_book from d;
  with d as (delete from public.chat_sessions where lower(email) = any(gone) returning 1) select count(*) into n_chat from d;
  -- Newsletter: kept until unsubscribed, then removed after 30 days. Unconfirmed sign-ups go after 30 days too.
  with d as (delete from public.subscribers
             where (status = 'unsubscribed' and unsubscribed_at < now() - interval '30 days')
                or (status = 'unconfirmed' and created_at < now() - interval '30 days') returning 1) select count(*) into n_sub from d;
  with d as (delete from public.brief_log where created_at < now() - interval '7 days' returning 1) select count(*) into n_brief from d;
  return jsonb_build_object('people', coalesce(array_length(gone, 1), 0), 'requests', n_req, 'discoveries', n_disc, 'bookings', n_book,
                            'chats', n_chat, 'subscribers', n_sub, 'brief_log', n_brief, 'at', now());
end;
$$;

revoke all on function public.retention_expired_emails() from public, anon, authenticated;
revoke all on function public.retention_expired_files() from public, anon, authenticated;
revoke all on function public.retention_purge_people() from public, anon, authenticated;
grant execute on function public.retention_expired_emails() to service_role;
grant execute on function public.retention_expired_files() to service_role;
grant execute on function public.retention_purge_people() to service_role;
notify pgrst, 'reload schema';
