import { ipHash, rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { UUID_RE, VOICE, voiceAllowed } from "@/lib/voice";

export const maxDuration = 15;

// Live transcription: hands the browser a short-lived, single-use token so the visitor's words can
// appear on the page as they speak. The API key never leaves the server. Each token counts as one
// spoken message against the voice allowance, whatever its real length, because the server cannot
// see how long the visitor talks for.
export async function POST(request: Request) {
  if (!process.env.ELEVENLABS_API_KEY) return fail(503, "Live voice is not connected.");
  const g = await guard(request, { maxBytes: 2000 });
  if (!g.ok) return g.response;
  const session = str(g.body.session, 40) ?? "";
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  const ip = ipHash(request);

  try {
    const decision = await voiceAllowed(session, ip);
    if (!decision.allow) return Response.json({ ok: false, gate: decision.gate, error: decision.message }, { status: 429 });

    const res = await fetch("https://api.elevenlabs.io/v1/single-use-token/realtime_scribe", {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`token failed (${res.status}): ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const token = String(((await res.json()) as { token?: string }).token ?? "");
    if (!token) throw new Error("token missing");
    await rpc("voice_log", { p_session: session, p_ip: ip, p_kind: "listen", p_seconds: VOICE.liveClipSeconds, p_cost: VOICE.liveClipSeconds * VOICE.liveListenPerSecond });
    return Response.json({ ok: true, token, maxSeconds: VOICE.maxClipSeconds }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    console.error("voice/live: failed", e);
    return fail(502, "Live voice is not available just now.");
  }
}
