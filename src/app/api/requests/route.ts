import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { insert, signedUploadUrl } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";

const TYPES = new Set(["project", "discovery", "files", "bug", "support", "assets"]);
const MAX_FILES = 5;
const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED_EXT = /\.(pdf|docx?|xlsx?|pptx?|csv|txt|log|md|png|jpe?g|gif|webp|heic|svg|mp4|mov|webm|zip|fig|key|pages|numbers)$/i;

type FileMeta = { name?: unknown; size?: unknown; type?: unknown };

// Saves a contact request. Files do not pass through this server: the reply contains one-time
// upload addresses and the browser sends each file straight to private storage.
export async function POST(request: Request) {
  const g = await guard(request, { table: "requests", perHour: 6, perDay: 300 });
  if (!g.ok) return g.response;
  const b = g.body;

  const type = str(b.type, 20);
  const email = str(b.email, 200);
  const name = str(b.name, 120);
  if (!type || !TYPES.has(type)) return fail(400, "Unknown request type.");
  if (!name) return fail(400, "A name is needed.");
  if (!email || !EMAIL_RE.test(email)) return fail(400, "A valid email is needed so there can be a reply.");

  // Everything else the form collected, as short strings only.
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(b)) {
    if (["type", "typeLabel", "name", "email", "company", "page", "ref", "at", "files", "fileList"].includes(k)) continue;
    if (!/^[a-z_]{1,30}$/i.test(k)) continue;
    const s = str(v, 6000);
    if (s) data[k] = s;
    if (Object.keys(data).length >= 25) break;
  }

  const files = (Array.isArray(b.fileList) ? (b.fileList as FileMeta[]) : []).slice(0, MAX_FILES);
  for (const f of files) {
    if (typeof f?.name !== "string" || typeof f?.size !== "number") return fail(400, "Invalid file details.");
    if (f.size > MAX_BYTES) return fail(400, `"${f.name}" is over 25 MB.`);
    if (!ALLOWED_EXT.test(f.name)) return fail(400, `"${f.name}" is not a file type that can be sent here. Share a link instead.`);
  }

  const now = new Date();
  const ref = `BB-${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}-${randomBytes(3).toString("hex").toUpperCase()}`;

  try {
    const [row] = await insert<{ id: string }>("requests", {
      ref,
      type,
      type_label: str(b.typeLabel, 60),
      name,
      email,
      company: str(b.company, 160),
      data,
      page: str(b.page, 300),
      ip_hash: g.ip,
      user_agent: (request.headers.get("user-agent") ?? "").slice(0, 300),
    });

    const uploads: { name: string; url: string }[] = [];
    if (files.length) {
      const rows = files.map((f, i) => {
        const original = String(f.name);
        const safe = original.replace(/[^A-Za-z0-9._-]+/g, "_").slice(-80);
        return { request_id: row.id, name: original.slice(0, 200), size_bytes: f.size as number, mime: str(f.type, 100), path: `${ref}/${i + 1}-${safe}` };
      });
      await insert("request_files", rows);
      for (const r of rows) uploads.push({ name: r.name, url: await signedUploadUrl("request-files", r.path) });
    }
    return NextResponse.json({ ok: true, ref, uploads });
  } catch (e) {
    console.error("requests: save failed", e);
    return fail(502, "That did not save. Please try again, or email instead.");
  }
}
