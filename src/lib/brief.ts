// The visitor's brief (what they are looking for) is kept on their chat session and filled in a field at a time,
// as Harvey learns it. Later answers replace earlier ones field by field; nothing is ever cleared.
import { select, update } from "./db";
import type { Brief } from "./toto";

/** Merges what was learned this turn into the session's brief. Best effort: a failure is logged, never shown. */
export async function saveBrief(session: string, learned: Brief | null): Promise<void> {
  if (!learned || !Object.keys(learned).length) return;
  try {
    const [row] = await select<{ brief: Brief | null }>("chat_sessions", `select=brief&id=eq.${encodeURIComponent(session)}&limit=1`);
    if (!row) return;
    await update("chat_sessions", `id=eq.${encodeURIComponent(session)}`, { brief: { ...(row.brief ?? {}), ...learned }, brief_at: new Date().toISOString() });
  } catch (e) {
    console.error("brief: save failed", e);
  }
}
