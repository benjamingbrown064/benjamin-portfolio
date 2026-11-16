// Live voice calls with Toto. The voice provider (ElevenLabs) runs the call itself: it listens, decides when the
// visitor has finished, lets them cut in, and speaks. For every reply it asks this site's own model endpoint
// (/api/voice/llm/chat/completions), so Toto's facts, rules and limits stay here.
//
// A call starts with a ticket made by /api/voice/call. The ticket rides along inside the call as a dynamic
// variable, so every reply request can be tied back to the visitor's conversation and checked against their
// allowance. It is signed, so it cannot be made up or altered.
import { createHmac, timingSafeEqual } from "node:crypto";

export const CALL = {
  agentId: process.env.TOTO_CALL_AGENT_ID ?? "",
  llmSecret: process.env.TOTO_LLM_SECRET ?? "",
  off: process.env.TOTO_CALLS_OFF === "1", // the off switch: voice calls stop, typing carries on
  maxOpen: Number(process.env.TOTO_CALLS_MAX_OPEN ?? 3), // calls running at once on the whole site
  maxSeconds: 600, // the longest single call
  // ElevenLabs charges about $0.08 a minute for the open call, listening included.
  perSecond: 0.08 / 60,
};

export type Ticket = {
  c: string; // call id
  s: string; // conversation (session) id
  i: string; // visitor's ip hash, taken when the call started (replies come from ElevenLabs, not the visitor)
  p: string; // page the call started on
  k: 0 | 1; // visitor has left their details
  m?: 1; // test page only: answer with the faster, smaller model
  x: number; // when this call's allowance runs out, ms
};

function sign(body: string): string {
  return createHmac("sha256", `${process.env.SITE_HASH_SALT ?? ""}:call`).update(body).digest("base64url").slice(0, 43);
}

export function makeTicket(t: Ticket): string {
  const body = Buffer.from(JSON.stringify(t)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** The ticket if it is genuine and, unless allowExpired, still in date. */
export function readTicket(raw: string, allowExpired = false): Ticket | null {
  const [body, sig] = raw.split(".");
  if (!body || !sig) return null;
  const want = sign(body);
  if (want.length !== sig.length || !timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return null;
  try {
    const t = JSON.parse(Buffer.from(body, "base64url").toString()) as Ticket;
    return typeof t.x === "number" && (allowExpired || Date.now() < t.x) ? t : null;
  } catch {
    return null;
  }
}
