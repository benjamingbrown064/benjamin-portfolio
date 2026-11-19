import { NextResponse } from "next/server";
import { insertIgnore, select, update } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";
import { sendReceipt } from "@/lib/mail";

type Row = { status: string; confirm_token: string };

// Saves a newsletter sign-up as "unconfirmed" and emails a confirmation link; the address only counts once that
// link is opened (/api/subscribe/confirm). Signing up twice is not an error: an unconfirmed or unsubscribed
// address is sent the link again, a confirmed one is left alone. The reply is the same in every case, so the
// box cannot be used to find out whether an address is on the list.
export async function POST(request: Request) {
  const g = await guard(request, { table: "subscribers", perHour: 5, perDay: 500, maxBytes: 2000, bot: true });
  if (!g.ok) return g.response;
  const email = str(g.body.email, 200)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return fail(400, "Please enter a valid email address.");
  try {
    let [row] = await insertIgnore<Row>("subscribers", { email, source: str(g.body.source, 60) ?? "journal", ip_hash: g.ip });
    if (!row) {
      [row] = await select<Row>("subscribers", `select=status,confirm_token&email=eq.${encodeURIComponent(email)}&limit=1`);
      if (row?.status === "unsubscribed") await update("subscribers", `email=eq.${encodeURIComponent(email)}`, { status: "unconfirmed", unsubscribed_at: null });
    }
    if (row && row.status !== "confirmed") await sendReceipt({ kind: "confirm", to: email, token: row.confirm_token });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("subscribe: save failed", e);
    return fail(502, "Something went wrong. Please email instead.");
  }
}
