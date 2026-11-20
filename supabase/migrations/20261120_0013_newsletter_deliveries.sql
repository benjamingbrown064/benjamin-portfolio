-- Newsletter sending. One row per issue per address once it has been handed to the mail service, so an issue is
-- never sent to the same person twice and a send that stops half way can be carried on.
create table if not exists public.newsletter_deliveries (
  id bigint generated always as identity primary key,
  slug text not null,
  email text not null,
  mail_id text,
  sent_at timestamptz not null default now()
);
create unique index if not exists newsletter_deliveries_once on public.newsletter_deliveries (slug, lower(email));
create index if not exists newsletter_deliveries_sent_idx on public.newsletter_deliveries (sent_at desc);
alter table public.newsletter_deliveries enable row level security;
notify pgrst, 'reload schema';
