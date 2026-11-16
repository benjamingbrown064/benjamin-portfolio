import { NextResponse, after } from "next/server";
import { rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { CALL, makeTicket, readTicket } from "@/lib/call";
import { UUID_RE, VOICE, voiceAllowed } from "@/lib/voice";
import { warmToto } from "@/lib/toto";
import { isBot } from "@/lib/bot";

export const maxDuration = 20;

/* Starts or ends a live voice call with Toto.
   start: checks the visitor's voice allowance and how many calls are running, then returns a single-use
          ElevenLabs conversation token and a signed ticket for the call.
   end:   bills the call up to now and closes it (sent when the visitor hangs up or leaves the page). */
export async function POST(request: Request) {
  const g = await guard(request, { maxBytes: 4000 });
  if (!g.ok) return g.response;

  if (g.body.op === "end") {
    const t = readTicket(str(g.body.ticket, 2000) ?? "", true);
    if (!t) return fail(400, "Invalid request.");
    await rpc("call_tick", { p_call: t.c, p_rate: CALL.perSecond, p_end: true }).catch((e) => console.error("call: end failed", e));
    return NextResponse.json({ ok: true });
  }

  if (await isBot(request)) return fail(403, "I could not start a call from this browser. You can type instead.");
  if (CALL.off || !CALL.agentId || !CALL.llmSecret || !process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ ok: false, error: "Calls are resting for now. You can still type." }, { status: 503 });
  }
  const session = str(g.body.session, 40) ?? "";
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  const page = (str(g.body.page, 80) ?? "/").replace(/[^a-z0-9/_-]/gi, "") || "/";

  try {
    const decision = await voiceAllowed(session, g.ip);
    if (!decision.allow) return NextResponse.json({ ok: false, gate: decision.gate, error: decision.message }, { status: 429 });
    const c = decision.check;
    // What this call may use: a first call without details is short; with details, the rest of today's allowance.
    // Without a checked email the free allowance also holds per connection, so a fresh conversation does not reset it.
    const left = Math.floor(c.known
      ? VOICE.knownDaySeconds - Number(c.ip_day_seconds)
      : Math.min(VOICE.anonSessionSeconds - Number(c.session_seconds), VOICE.anonIpDaySeconds - Number(c.ip_day_seconds)));
    if (left < 15) {
      return NextResponse.json({ ok: false, gate: !c.known, error: c.known ? "That is today’s voice allowance used. You can still type." : "Leave your name and email below to keep talking. You can still type." }, { status: 429 });
    }

    const opened = await rpc<{ ok: boolean; id?: string }>("call_open", { p_session: session, p_ip: g.ip, p_max_open: CALL.maxOpen });
    if (!opened.ok || !opened.id) {
      return NextResponse.json({ ok: false, error: "Toto is on a few calls already. Try again in a minute, or type." }, { status: 429 });
    }

    const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(CALL.agentId)}`, {
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY },
      signal: AbortSignal.timeout(8000),
    });
    const j = (await res.json().catch(() => ({}))) as { token?: string };
    if (!res.ok || !j.token) {
      await rpc("call_tick", { p_call: opened.id, p_rate: 0, p_end: true }).catch(() => {});
      throw new Error(`token ${res.status}`);
    }
    // While Toto says hello, get his prompt ready so the first answer comes quickly.
    after(() => warmToto(g.body.fast === true ? "claude-haiku-5-5" : undefined));
    const seconds = Math.min(left, CALL.maxSeconds);
    const ticket = makeTicket({ c: opened.id, s: session, i: g.ip, p: page, k: c.known ? 1 : 0, ...(g.body.fast === true ? { m: 1 as const } : {}), x: Date.now() + seconds * 1000 });
    return NextResponse.json({ ok: true, token: j.token, ticket, seconds, known: c.known });
  } catch (e) {
    console.error("call: start failed", e);
    return fail(502, "I could not start a call just now. You can still type.");
  }
}
