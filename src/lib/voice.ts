// Shared limits and checks for the assistant's voice. Listening and speaking both count towards one
// allowance of seconds, and their estimated cost counts towards the same monthly cap as the chat.
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
