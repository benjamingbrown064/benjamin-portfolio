// Shared limits and checks for the assistant's voice. Listening and speaking both count towards one
// allowance of seconds, and their estimated cost counts towards the same monthly cap as the chat.
import { createHmac, timingSafeEqual } from "node:crypto";
import { rpc } from "./db";

export const VOICE = {
  anonSessionSeconds: 120, // a taste, before the visitor leaves their details
  knownDaySeconds: 600, // per visitor per day once they have
  siteDaySeconds: 7200,
  maxClipSeconds: 45,
  maxClipBytes: 1_500_000,
  maxSpeakChars: 700,
  monthlyUsd: Number(process.env.CHAT_MONTHLY_CAP_USD ?? 40),
  // Estimates in USD, used only for the cap.
  listenPerSecond: 0.006 / 60,
  speakPerSecond: 0.015 / 60,
  // Live transcription and the ElevenLabs voice. A live session is counted as a typical spoken message.
  liveClipSeconds: 15,
  liveListenPerSecond: 0.008 / 60,
  elevenSpeakPerSecond: 0.18 / 60,
};

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type VoiceCheck = { session_seconds: number; known: boolean; ip_day_seconds: number; site_day_seconds: number; month_cost: number; last_reply: string | null };

export type VoiceDecision = { allow: true; check: VoiceCheck } | { allow: false; gate: boolean; message: string };

export async function voiceAllowed(session: string, ip: string): Promise<VoiceDecision> {
  const c = await rpc<VoiceCheck>("voice_precheck", { p_session: session, p_ip: ip });
  if (Number(c.month_cost) >= VOICE.monthlyUsd || Number(c.site_day_seconds) >= VOICE.siteDaySeconds) {
    return { allow: false, gate: false, message: "Voice is resting for now. You can still type." };
  }
  if (!c.known && Number(c.session_seconds) >= VOICE.anonSessionSeconds) {
    return { allow: false, gate: true, message: "Leave your name and email below to keep talking. You can still type." };
  }
  if (Number(c.ip_day_seconds) >= VOICE.knownDaySeconds) {
    return { allow: false, gate: false, message: "That is today’s voice allowance used. You can still type." };
  }
  return { allow: true, check: c };
}

/* ---------- speaking a reply while it is still being written ----------
   The chat hands the browser each piece of the reply with a signature, and the speak endpoint will only voice
   text carrying a valid one. So it can start on the first sentence without waiting for the whole reply to be
   saved, and still cannot be used to voice text the assistant did not write. */
const SAY_TTL_MS = 10 * 60_000;

function saySignature(session: string, expires: number, text: string): string {
  return createHmac("sha256", `${process.env.SITE_HASH_SALT ?? ""}:say`).update(`${session}\n${expires}\n${text}`).digest("hex").slice(0, 40);
}

export type Sayable = { text: string; e: number; g: string };

export function signSay(session: string, text: string): Sayable {
  const e = Date.now() + SAY_TTL_MS;
  return { text, e, g: saySignature(session, e, text) };
}

export function verifySay(session: string, text: string, expires: number, signature: string): boolean {
  if (!process.env.SITE_HASH_SALT || !Number.isFinite(expires) || expires < Date.now() || expires > Date.now() + SAY_TTL_MS + 60_000) return false;
  const want = Buffer.from(saySignature(session, expires, text));
  const got = Buffer.from(signature);
  return want.length === got.length && timingSafeEqual(want, got);
}

/** Splits a reply into pieces to speak: the first sentence on its own, so the voice can start early, then the rest
 *  in a few larger pieces. Call push() with each new bit of text; it returns any pieces that are now complete. */
export function sayChunker(maxChars: number) {
  let pending = "";
  let spoken = 0;
  let first = true;
  const take = (final: boolean): string[] => {
    const out: string[] = [];
    for (;;) {
      if (spoken >= maxChars) { pending = ""; break; }
      let cut = -1;
      if (first) {
        // First piece: one sentence, as long as it is a real one.
        const m = /[.!?…]["’”)]?(\s|$)/.exec(pending);
        if (m && m.index >= 24) cut = m.index + m[0].length;
      } else {
        // Later pieces: break at a paragraph, or at the last sentence end once there is a good amount of text.
        const para = pending.indexOf("\n\n");
        if (para >= 0) cut = para + 2;
        else if (pending.length > 260) {
          const ends = [...pending.matchAll(/[.!?…]["’”)]?\s/g)];
          const last = ends[ends.length - 1];
          if (last && last.index !== undefined) cut = last.index + last[0].length;
        }
      }
      if (cut < 0) {
        if (final && pending.trim()) cut = pending.length;
        else break;
      }
      const piece = pending.slice(0, cut).trim().slice(0, maxChars - spoken);
      pending = pending.slice(cut);
      if (piece) { out.push(piece); spoken += piece.length; first = false; }
    }
    return out;
  };
  return {
    push(delta: string): string[] { pending += delta; return take(false); },
    end(): string[] { return take(true); },
  };
}
