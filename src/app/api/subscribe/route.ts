import { NextResponse } from "next/server";
import { insertIgnore } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";

// Saves a newsletter sign-up. New addresses are stored as "unconfirmed"; the confirmation email is
// sent once outgoing mail is set up for the domain. Signing up twice is not an error.
export async function POST(request: Request) {
  const g = await guard(request, { table: "subscribers", perHour: 5, perDay: 500, maxBytes: 2000 });
  if (!g.ok) return g.response;
  const email = str(g.body.email, 200);
  if (!email || !EMAIL_RE.test(email)) return fail(400, "Please enter a valid email address.");
  try {
    await insertIgnore("subscribers", { email: email.toLowerCase(), source: str(g.body.source, 60) ?? "journal", ip_hash: g.ip });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("subscribe: save failed", e);
    return fail(502, "Something went wrong. Please email instead.");
  }
}
