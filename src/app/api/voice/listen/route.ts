import { NextResponse } from "next/server";
import { dbConfigured, ipHash, rpc } from "@/lib/db";
import { fail, originAllowed } from "@/lib/guard";
import { UUID_RE, VOICE, voiceAllowed } from "@/lib/voice";

export const maxDuration = 30;

// Turns a short spoken clip into text. The clip is sent as the request body; nothing is stored.
export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY || !dbConfigured()) return fail(503, "Voice is not connected yet.");
  if (!originAllowed(request)) return fail(403, "Request not allowed.");
  const session = request.headers.get("x-toto-session") ?? "";
  if (!UUID_RE.test(session)) return fail(400, "Invalid session.");
  const type = (request.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!/^audio\/(webm|mp4|ogg|mpeg|wav|x-m4a)$/.test(type)) return fail(415, "Unsupported audio.");

  const audio = await request.arrayBuffer();
  if (audio.byteLength < 800) return fail(400, "I did not catch that.");
  if (audio.byteLength > VOICE.maxClipBytes) return fail(413, "That was too long. Try a shorter message.");
  const claimed = Number(request.headers.get("x-toto-seconds"));
  const seconds = Math.max(1, Math.min(VOICE.maxClipSeconds, Number.isFinite(claimed) && claimed > 0 ? claimed : audio.byteLength / 4000));

  const ip = ipHash(request);
  try {
    const decision = await voiceAllowed(session, ip);
    if (!decision.allow) return NextResponse.json({ ok: false, gate: decision.gate, error: decision.message }, { status: 429 });

    const ext = type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : type.includes("mpeg") ? "mp3" : type.includes("wav") ? "wav" : "webm";
    const body = new FormData();
    body.append("model", "gpt-4o-transcribe");
    body.append("response_format", "json");
    body.append("file", new Blob([audio], { type }), `clip.${ext}`);
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body,
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) throw new Error(`transcription failed (${res.status}): ${(await res.text().catch(() => "")).slice(0, 200)}`);
    const text = String(((await res.json()) as { text?: string }).text ?? "").trim().slice(0, 1200);
    await rpc("voice_log", { p_session: session, p_ip: ip, p_kind: "listen", p_seconds: seconds, p_cost: seconds * VOICE.listenPerSecond });
    if (!text) return fail(422, "I did not catch that. Try again, or type it.");
    return NextResponse.json({ ok: true, text });
  } catch (e) {
    console.error("voice/listen: failed", e);
    return fail(502, "I could not hear that just now. Please type it instead.");
  }
}
