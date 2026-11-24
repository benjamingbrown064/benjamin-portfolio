// Coffee bookings written straight into Ben's Google Calendar.
//
// Off until three things exist: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (a Google OAuth client, "web application",
// redirect https://benjaminbrown.co/api/google/callback) in the hosting settings, and Ben having allowed access once
// through the link tools/google-connect.py prints. The refresh token Google gives back is kept in the database
// (site_secrets), never in a browser or a log. Access is limited to creating and changing events
// (calendar.events); the free/busy times are still read from the private iCal address as before.
//
// Nothing here ever throws into a booking: if the calendar cannot be written, the booking still stands and Ben's
// notice keeps its "add to your calendar" link.
import { createHmac, timingSafeEqual } from "node:crypto";
import facts from "../../site/facts.json";
import { insert, select, update } from "./db";

const C = facts.coffee;
const SCOPE = "openid email https://www.googleapis.com/auth/calendar.events";
const REDIRECT = "https://benjaminbrown.co/api/google/callback";
// The only account whose calendar may be connected.
export const CALENDAR_ACCOUNT = "ben@benjaminbrown.co";
const KEY = "google_calendar";

export function gcalConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

// The connect link carries a signed, time-stamped state so a stray or forged callback cannot store a token.
function sign(ts: string): string {
  return createHmac("sha256", `${process.env.SITE_ADMIN_TOKEN ?? ""}:google`).update(ts).digest("hex").slice(0, 32);
}
export function connectState(now = Date.now()): string {
  const ts = String(now);
  return `${ts}.${sign(ts)}`;
}
export function stateValid(state: string, now = Date.now()): boolean {
  const [ts, sig] = state.split(".");
  if (!ts || !sig || !/^\d+$/.test(ts) || now - Number(ts) > 30 * 60_000 || Number(ts) > now + 60_000) return false;
  if ((process.env.SITE_ADMIN_TOKEN ?? "").length < 32) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(ts));
  return a.length === b.length && timingSafeEqual(a, b);
}
export function connectUrl(state: string): string {
  const q = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID ?? "", redirect_uri: REDIRECT, response_type: "code", scope: SCOPE, access_type: "offline", prompt: "consent", login_hint: CALENDAR_ACCOUNT, state });
  return `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
}

async function token(params: Record<string, string>): Promise<Record<string, unknown>> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID ?? "", client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "", ...params }),
  });
  const j = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(`google token ${res.status} ${String(j.error ?? "")}`);
  return j;
}

/** Called by /api/google/callback: swaps the one-time code for a refresh token and keeps it, if the account is Ben's. */
export async function connect(code: string): Promise<{ ok: boolean; reason?: string }> {
  const t = await token({ code, grant_type: "authorization_code", redirect_uri: REDIRECT });
  const refresh = typeof t.refresh_token === "string" ? t.refresh_token : "";
  const idToken = typeof t.id_token === "string" ? t.id_token : "";
  // The id token came straight from Google over TLS in this exchange, so its claims can be read without a signature check.
  let email = "";
  try {
    email = String(JSON.parse(Buffer.from(idToken.split(".")[1] ?? "", "base64url").toString("utf8")).email ?? "").toLowerCase();
  } catch {}
  if (email !== CALENDAR_ACCOUNT) return { ok: false, reason: "wrong-account" };
  if (!refresh) return { ok: false, reason: "no-refresh-token" };
  const rows = await select<{ key: string }>("site_secrets", `key=eq.${KEY}&select=key`);
  const row = { value: refresh, note: `calendar.events for ${email}`, updated_at: new Date().toISOString() };
  if (rows.length) await update("site_secrets", `key=eq.${KEY}`, row);
  else await insert("site_secrets", { key: KEY, ...row });
  cached = null;
  return { ok: true };
}

let cached: { access: string; until: number } | null = null;

async function accessToken(): Promise<string | null> {
  if (!gcalConfigured()) return null;
  if (cached && cached.until > Date.now() + 60_000) return cached.access;
  const [row] = await select<{ value: string }>("site_secrets", `key=eq.${KEY}&select=value`);
  if (!row?.value) return null;
  const t = await token({ refresh_token: row.value, grant_type: "refresh_token" });
  cached = { access: String(t.access_token), until: Date.now() + Number(t.expires_in ?? 3000) * 1000 };
  return cached.access;
}

/** Adds a booked coffee to Ben's calendar. Returns the event id, or null if the calendar is not connected or the
 *  write failed (the failure is logged, so Sentry sees it). The visitor is not added as a guest, so Google sends
 *  them nothing: the site's own receipt is their confirmation. */
export async function addCoffee(b: { at: number; name: string | null; email: string; format: string | null; note: string | null; theirTime: string }): Promise<string | null> {
  try {
    const access = await accessToken();
    if (!access) return null;
    const who = b.name ?? b.email;
    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: { authorization: `Bearer ${access}`, "content-type": "application/json" },
      body: JSON.stringify({
        summary: `Coffee with ${who}`,
        start: { dateTime: new Date(b.at).toISOString() },
        end: { dateTime: new Date(b.at + C.slotMinutes * 60_000).toISOString() },
        location: b.format === "video" ? "Video call" : b.format === "person" ? "In person" : undefined,
        description: [`Booked on benjaminbrown.co.`, `Name: ${b.name ?? "not given"}`, `Email: ${b.email}`, `Format: ${b.format ?? "not given"}`, `Their time: ${b.theirTime}`, b.note ? `Note: ${b.note}` : ""].filter(Boolean).join("\n"),
        reminders: { useDefault: true },
        source: { title: "benjaminbrown.co coffee booking", url: "https://benjaminbrown.co/contact" },
      }),
    });
    if (!res.ok) throw new Error(`calendar insert ${res.status} ${(await res.text()).slice(0, 200)}`);
    return String(((await res.json()) as { id?: string }).id ?? "") || null;
  } catch (e) {
    console.error("gcal: could not add the coffee to the calendar", e);
    return null;
  }
}
