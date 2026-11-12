import { ipHash, rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { UUID_RE, VOICE, voiceAllowed } from "@/lib/voice";

export const maxDuration = 30;

const VOICE_NAME = process.env.TOTO_VOICE || "ash";
const STYLE = "Calm, warm and unhurried. British English. Conversational, like a thoughtful colleague, never a salesperson.";

// Reads Toto's latest reply aloud. It will only speak the reply the server itself gave in this
// conversation, so the endpoint cannot be used to voice arbitrary text.
export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) return fail(503, "Voice is not connected yet.");
  const g = await guard(request, { maxBytes: 4000 });
  if (!g.ok) return g.response;
  const session = str(g.body.session, 40) ?? "";
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  const ip = ipHash(request);

  try {
    const decision = await voiceAllowed(session, ip);
    if (!decision.allow) return Response.json({ ok: false, gate: decision.gate, error: decision.message }, { status: 429 });
    const text = (decision.check.last_reply ?? "").trim();
    if (!text) return fail(404, "Nothing to say.");
    const spoken = text.slice(0, VOICE.maxSpeakChars);

    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini-tts", voice: VOICE_NAME, input: spoken, instructions: STYLE, response_format: "mp3" }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) throw new Error(`speech failed (${res.status}): ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const audio = await res.arrayBuffer();
    const seconds = Math.max(1, spoken.length / 15);
    await rpc("voice_log", { p_session: session, p_ip: ip, p_kind: "speak", p_seconds: seconds, p_cost: seconds * VOICE.speakPerSecond });
    return new Response(audio, { headers: { "content-type": "audio/mpeg", "cache-control": "no-store" } });
  } catch (e) {
    console.error("voice/speak: failed", e);
    return fail(502, "I could not speak that just now.");
  }
}
