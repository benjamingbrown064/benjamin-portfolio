-- What each visitor is looking for, as Harvey learns it in the conversation (Ben, 25 Nov 2026): need, why, business,
-- role, size, today, timeline, budget, who decides, stage, fit. One JSON object per conversation, merged a field at a
-- time by the chat and call routes. Read by /api/admin/summaries and /api/admin/leads. Additive only.
alter table public.chat_sessions add column if not exists brief jsonb;
alter table public.chat_sessions add column if not exists brief_at timestamptz;
create index if not exists chat_sessions_brief_idx on public.chat_sessions (brief_at desc) where brief is not null;
