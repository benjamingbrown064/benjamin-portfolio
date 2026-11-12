// Shared checks for the public form endpoints: same-site origin, size, and rate limits kept in the
// database (so they hold across server instances). A spam challenge can be added here later.
import { NextResponse } from "next/server";
import { count, dbConfigured, ipHash } from "./db";

const ALLOWED_HOSTS = /^(?:(?:www\.)?benjaminbrown\.co|localhost(?::\d+)?|127\.0\.0\.1(?::\d+)?|benjamin-portfolio-[a-z0-9-]+\.vercel\.app)$/;

export type Guarded = { ok: true; ip: string; body: Record<string, unknown> } | { ok: false; response: NextResponse };

export function fail(status: number, error: string): NextResponse {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function guard(request: Request, opts: { table?: string; perHour?: number; perDay?: number; maxBytes?: number }): Promise<Guarded> {
  if (!dbConfigured()) return { ok: false, response: fail(503, "This form is not connected yet. Please email instead.") };

  const origin = request.headers.get("origin");
  let host = "";
  try {
    host = origin ? new URL(origin).host : "";
  } catch {}
  if (!host || !ALLOWED_HOSTS.test(host)) return { ok: false, response: fail(403, "Request not allowed.") };

  const text = await request.text();
  if (text.length > (opts.maxBytes ?? 60_000)) return { ok: false, response: fail(413, "That is too long to send.") };
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return { ok: false, response: fail(400, "Invalid request.") };
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, response: fail(400, "Invalid request.") };

  const ip = ipHash(request);
  // Callers with their own limits (the chat) pass no table.
  if (!opts.table) return { ok: true, ip, body: body as Record<string, unknown> };
  const hourAgo = new Date(Date.now() - 3600_000).toISOString();
  const dayAgo = new Date(Date.now() - 86_400_000).toISOString();
  const [mine, all] = await Promise.all([
    count(opts.table, `ip_hash=eq.${ip}&created_at=gte.${hourAgo}`),
    count(opts.table, `created_at=gte.${dayAgo}`),
  ]);
  if (mine >= (opts.perHour ?? Infinity) || all >= (opts.perDay ?? Infinity)) {
    return { ok: false, response: fail(429, "Too many requests. Please try again later, or email instead.") };
  }
  return { ok: true, ip, body: body as Record<string, unknown> };
}

export function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
