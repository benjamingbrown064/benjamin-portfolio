import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";
import { rpc } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";
import { codeHash, isBot } from "@/lib/bot";
import { sendReceipt } from "@/lib/mail";
import { UUID_RE } from "@/lib/voice";

// Step one of leaving your details: sends a six-digit code to the email given. Step two is /api/visitor.
export async function POST(request: Request) {
  if (await isBot(request)) return fail(403, "Request not allowed.");
  const g = await guard(request, { maxBytes: 2000 });
  if (!g.ok) return g.response;
  const session = str(g.body.session, 40) ?? "";
  const name = str(g.body.name, 120);
  const email = str(g.body.email, 200);
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  if (!name) return fail(400, "Please add your name.");
  if (!email || !EMAIL_RE.test(email)) return fail(400, "That email does not look right.");
  try {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const made = await rpc<{ ok: boolean }>("visitor_code_create", { p_session: session, p_ip: g.ip, p_name: name, p_email: email, p_hash: codeHash(session, code) });
    if (!made.ok) return fail(429, "Too many codes asked for. Please try again later.");
    const sent = await sendReceipt({ kind: "code", to: email, name, code });
    if (!sent) return fail(502, "The code did not send. Please check the email and try again.");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("visitor/code: failed", e);
    return fail(502, "The code did not send. Please try again.");
  }
}
