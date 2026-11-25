-- Ben gets a short summary of each finished conversation with Harvey (25 Nov 2026). Written once, after the
-- conversation has gone quiet, by /api/admin/summaries, which Ben's assistant on the Mac calls with the alerts.
-- Additive only.
alter table public.chat_sessions add column if not exists summary text;
alter table public.chat_sessions add column if not exists summary_at timestamptz;
create index if not exists chat_sessions_summary_due_idx on public.chat_sessions (last_at) where summary_at is null;
