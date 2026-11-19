-- "Say it" on the request form (/api/brief) had no working limit: it counted rows in chat_voice but never wrote one.
-- It now has its own small log, counted per connection per hour and site-wide per day.
create table if not exists public.brief_log (
  id bigint generated always as identity primary key,
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists brief_log_ip_idx on public.brief_log (ip_hash, created_at desc);
create index if not exists brief_log_created_idx on public.brief_log (created_at desc);
alter table public.brief_log enable row level security;
notify pgrst, 'reload schema';
