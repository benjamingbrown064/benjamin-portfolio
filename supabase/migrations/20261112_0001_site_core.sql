-- benjaminbrown.co: core tables for requests, discovery, bookings and the newsletter.
-- Row level security is on with no policies: only the server (service role) can read or write.

create extension if not exists pgcrypto;

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  type text not null,
  type_label text,
  name text,
  email text,
  company text,
  data jsonb not null default '{}'::jsonb,
  page text,
  status text not null default 'new',
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists requests_created_at_idx on public.requests (created_at desc);
create index if not exists requests_ip_hash_idx on public.requests (ip_hash, created_at desc);

create table if not exists public.request_files (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  name text not null,
  size_bytes bigint,
  mime text,
  path text not null,
  created_at timestamptz not null default now()
);
create index if not exists request_files_request_idx on public.request_files (request_id);

create table if not exists public.discovery_submissions (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  journey text,
  name text,
  email text,
  company text,
  answers jsonb not null default '{}'::jsonb,
  notes jsonb not null default '{}'::jsonb,
  signals jsonb not null default '{}'::jsonb,
  summary text,
  status text not null default 'new',
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists discovery_created_at_idx on public.discovery_submissions (created_at desc);
create index if not exists discovery_ip_hash_idx on public.discovery_submissions (ip_hash, created_at desc);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  format text,
  slot_date text,
  slot_time text,
  time_zone text,
  note text,
  data jsonb not null default '{}'::jsonb,
  status text not null default 'requested',
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists booking_requests_ip_hash_idx on public.booking_requests (ip_hash, created_at desc);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'unconfirmed',
  source text,
  confirm_token text not null default encode(gen_random_bytes(24), 'hex'),
  ip_hash text,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);
create unique index if not exists subscribers_email_key on public.subscribers (lower(email));
create index if not exists subscribers_ip_hash_idx on public.subscribers (ip_hash, created_at desc);

alter table public.requests enable row level security;
alter table public.request_files enable row level security;
alter table public.discovery_submissions enable row level security;
alter table public.booking_requests enable row level security;
alter table public.subscribers enable row level security;

-- Private bucket for files attached to requests.
insert into storage.buckets (id, name, public, file_size_limit)
values ('request-files', 'request-files', false, 26214400)
on conflict (id) do nothing;
