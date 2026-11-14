import { ipHash, rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { UUID_RE, VOICE, verifySay, voiceAllowed } from "@/lib/voice";

export const maxDuration = 30;

const VOICE_NAME = process.env.TOTO_VOICE || "ash";
const STYLE = "Calm, warm and unhurried. British English. Conversational, like a thoughtful colleague, never a salesperson.";
// The ElevenLabs voice is used when its key is set; the OpenAI voice above is the fallback.
const ELEVEN_VOICE = process.env.TOTO_ELEVEN_VOICE || "DPSolStDPHwmw34akfe3";
// Turbo starts speaking in about 0.2s; the more expressive "eleven_v3_conversational" takes about 0.7s.
const ELEVEN_MODEL = process.env.TOTO_ELEVEN_MODEL || "eleven_turbo_v2_5";
// A touch slower than the voice's natural pace (1 = natural; ElevenLabs accepts 0.7 to 1.2).
const ELEVEN_SPEED = Math.min(1.2, Math.max(0.7, Number(process.env.TOTO_ELEVEN_SPEED) || 0.9));

async function elevenSpeech(text: string): Promise<ArrayBuffer | null> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: ELEVEN_MODEL, voice_settings: { speed: ELEVEN_SPEED } }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
    return await res.arrayBuffer();
  } catch (e) {
    console.error("voice/speak: ElevenLabs failed, using the fallback voice", e);
    return null;
  }
}

// Reads Toto's latest reply aloud. It will only speak the reply the server itself gave in this
// conversation, so the endpoint cannot be used to voice arbitrary text.
export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY && !process.env.ELEVENLABS_API_KEY) return fail(503, "Voice is not connected yet.");
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

    const seconds = Math.max(1, spoken.length / 15);
    const eleven = await elevenSpeech(spoken);
    if (eleven) {
      await rpc("voice_log", { p_session: session, p_ip: ip, p_kind: "speak", p_seconds: seconds, p_cost: seconds * VOICE.elevenSpeakPerSecond });
      return new Response(eleven, { headers: { "content-type": "audio/mpeg", "cache-control": "no-store" } });
    }

    if (!process.env.OPENAI_API_KEY) return fail(502, "I could not speak that just now.");
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini-tts", voice: VOICE_NAME, input: spoken, instructions: STYLE, response_format: "mp3" }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) throw new Error(`speech failed (${res.status}): ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const audio = await res.arrayBuffer();
    await rpc("voice_log", { p_session: session, p_ip: ip, p_kind: "speak", p_seconds: seconds, p_cost: seconds * VOICE.speakPerSecond });
    return new Response(audio, { headers: { "content-type": "audio/mpeg", "cache-control": "no-store" } });
  } catch (e) {
    console.error("voice/speak: failed", e);
    return fail(502, "I could not speak that just now.");
  }
}

/** Speaks one signed piece of a reply, streaming the audio as it is made so the browser can start playing at once.
 *  Used through an <audio> address, so it is a GET; the signature (made by the chat for this conversation) is what
 *  authorises it, and the usual voice allowance still applies. */
export async function GET(request: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return fail(503, "Voice is not connected yet.");
  const q = new URL(request.url).searchParams;
  const session = q.get("s") ?? "";
  const text = (q.get("t") ?? "").trim();
  if (!UUID_RE.test(session) || !text || text.length > VOICE.maxSpeakChars) return fail(400, "Invalid request.");
  if (!verifySay(session, text, Number(q.get("e")), q.get("g") ?? "")) return fail(403, "Request not allowed.");
  const ip = ipHash(request);

  try {
    // The allowance check and the voice request run side by side, so the check adds no delay.
    const [decision, res] = await Promise.all([
      voiceAllowed(session, ip),
      fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE}/stream?output_format=mp3_44100_128`, {
        method: "POST",
        headers: { "xi-api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({ text, model_id: ELEVEN_MODEL, voice_settings: { speed: ELEVEN_SPEED } }),
        signal: AbortSignal.timeout(20_000),
      }),
    ]);
    if (!decision.allow) {
      await res.body?.cancel().catch(() => {});
      return Response.json({ ok: false, gate: decision.gate, error: decision.message }, { status: 429 });
    }
    if (!res.ok || !res.body) throw new Error(`speech failed (${res.status}): ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const seconds = Math.max(1, text.length / 15);
    await rpc("voice_log", { p_session: session, p_ip: ip, p_kind: "speak", p_seconds: seconds, p_cost: seconds * VOICE.elevenSpeakPerSecond });
    return new Response(res.body, { headers: { "content-type": "audio/mpeg", "cache-control": "no-store" } });
  } catch (e) {
    console.error("voice/speak: stream failed", e);
    return fail(502, "I could not speak that just now.");
  }
}
