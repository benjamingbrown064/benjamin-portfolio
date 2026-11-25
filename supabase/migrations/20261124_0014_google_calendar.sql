-- Google Calendar connection for coffee bookings. Holds the long-lived refresh token Google issues when Ben allows the
-- site to add events to his calendar (one row, key 'google_calendar'). Only the server's service key can read it:
-- row level security is on and there are no policies, so the public key sees nothing.
create table if not exists public.site_secrets (
  key text primary key,
  value text not null,
  note text,
  updated_at timestamptz not null default now()
);
alter table public.site_secrets enable row level security;

-- The calendar event made for a booking, so it can be found (and later moved or removed) from the booking.
alter table public.booking_requests add column if not exists calendar_event_id text;
notify pgrst, 'reload schema';
