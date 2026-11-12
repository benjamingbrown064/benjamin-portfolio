// Server-side access to the site database (Supabase). Uses the REST interface directly with the
// service role key, so nothing here may be imported by code that runs in the browser.
import { createHash } from "node:crypto";

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function dbConfigured(): boolean {
  return Boolean(URL_ && KEY);
}

function headers(extra: Record<string, string> = {}): Record<string, string> {
  return { apikey: KEY!, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...extra };
}

export async function insert<T = Record<string, unknown>>(table: string, row: Record<string, unknown> | Record<string, unknown>[]): Promise<T[]> {
  const res = await fetch(`${URL_}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new DbError(res.status, await res.text().catch(() => ""));
  return (await res.json()) as T[];
}

/** Insert, or do nothing if the row already exists on the given unique column(s). Returns inserted rows. */
export async function insertIgnore<T = Record<string, unknown>>(table: string, row: Record<string, unknown>): Promise<T[]> {
  const res = await fetch(`${URL_}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
  });
  if (res.status === 409) return [];
  if (!res.ok) throw new DbError(res.status, await res.text().catch(() => ""));
  return (await res.json()) as T[];
}

/** Count rows matching a PostgREST filter string, e.g. "ip_hash=eq.abc&created_at=gte.2026-…". */
export async function count(table: string, filter: string): Promise<number> {
  const res = await fetch(`${URL_}/rest/v1/${table}?select=id&${filter}`, {
    method: "HEAD",
    headers: headers({ Prefer: "count=exact", Range: "0-0" }),
  });
  if (!res.ok && res.status !== 206 && res.status !== 416) throw new DbError(res.status, "");
  const total = res.headers.get("content-range")?.split("/")[1];
  return total && total !== "*" ? Number(total) : 0;
}

/** A one-time address the browser can upload a file to, straight into private storage. */
export async function signedUploadUrl(bucket: string, path: string): Promise<string> {
  const res = await fetch(`${URL_}/storage/v1/object/upload/sign/${bucket}/${path}`, { method: "POST", headers: headers(), body: "{}" });
  if (!res.ok) throw new DbError(res.status, await res.text().catch(() => ""));
  const j = (await res.json()) as { url: string };
  return `${URL_}/storage/v1${j.url}`;
}

/** Read rows. `query` is a PostgREST query string, e.g. "select=ref,name&created_at=gte.2026-…&order=created_at.desc". */
export async function select<T = Record<string, unknown>>(table: string, query: string): Promise<T[]> {
  const res = await fetch(`${URL_}/rest/v1/${table}?${query}`, { headers: headers() });
  if (!res.ok) throw new DbError(res.status, await res.text().catch(() => ""));
  return (await res.json()) as T[];
}

/** Call a database function. */
export async function rpc<T = unknown>(fn: string, args: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, { method: "POST", headers: headers(), body: JSON.stringify(args) });
  if (!res.ok) throw new DbError(res.status, await res.text().catch(() => ""));
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export class DbError extends Error {
  constructor(public status: number, public detail: string) {
    super(`database request failed (${status})`);
  }
}

/** Visitors are never stored by IP address, only by a salted hash used for rate limits. */
export function ipHash(request: Request): string {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  return createHash("sha256").update(`${process.env.SITE_HASH_SALT ?? "bb"}:${ip}`).digest("hex").slice(0, 32);
}
