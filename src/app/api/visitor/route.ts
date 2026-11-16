import { NextResponse } from "next/server";
import { rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { UUID_RE } from "@/lib/voice";
import { codeHash } from "@/lib/bot";

// Step two of leaving your details: the visitor types the code sent by /api/visitor/code. A match proves the
// email is theirs, and gated features (longer chats, longer calls) open for their conversation.
export async function POST(request: Request) {
  const g = await guard(request, { maxBytes: 2000 });
  if (!g.ok) return g.response;
  const session = str(g.body.session, 40) ?? "";
  const code = (str(g.body.code, 12) ?? "").replace(/\D/g, "");
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  if (code.length !== 6) return fail(400, "Type the six-digit code from the email.");
  try {
    const r = await rpc<{ ok: boolean; reason?: string; left?: number; name?: string }>("visitor_code_verify", { p_session: session, p_ip: g.ip, p_hash: codeHash(session, code) });
    if (r.ok) return NextResponse.json({ ok: true, name: r.name });
    const msg = r.reason === "wrong" && (r.left ?? 0) > 0 ? "That code is not right. Please check the email and try again."
      : "That code has expired. Ask for a new one.";
    return NextResponse.json({ ok: false, error: msg, expired: r.reason !== "wrong" || (r.left ?? 0) <= 0 }, { status: 400 });
  } catch (e) {
    console.error("visitor: failed", e);
    return fail(502, "That did not save. Please try again.");
  }
}
