import { NextResponse } from "next/server";
import { rpc } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";
import { UUID_RE } from "@/lib/voice";

// The ask-once step: a visitor leaves a name and email, and gated features open for their conversation.
export async function POST(request: Request) {
  const g = await guard(request, { table: "chat_sessions", perHour: 10, perDay: 2000, maxBytes: 2000 });
  if (!g.ok) return g.response;
  const session = str(g.body.session, 40) ?? "";
  const name = str(g.body.name, 120);
  const email = str(g.body.email, 200);
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  if (!name) return fail(400, "Please add your name.");
  if (!email || !EMAIL_RE.test(email)) return fail(400, "That email does not look right.");
  try {
    await rpc("visitor_identify", { p_session: session, p_ip: g.ip, p_name: name, p_email: email });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("visitor: failed", e);
    return fail(502, "That did not save. Please try again.");
  }
}
