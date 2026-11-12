import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { insert } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";

function obj(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

export async function POST(request: Request) {
  const g = await guard(request, { table: "discovery_submissions", perHour: 4, perDay: 200, maxBytes: 120_000 });
  if (!g.ok) return g.response;
  const b = g.body;
  const c = obj(b.contact);
  const email = str(c.email, 200);
  if (!email || !EMAIL_RE.test(email)) return fail(400, "A valid email is needed.");

  const ref = `BB-D-${randomBytes(3).toString("hex").toUpperCase()}`;
  try {
    await insert("discovery_submissions", {
      ref,
      journey: str(b.journey, 40),
      name: str(c.name, 120),
      email,
      company: str(c.company, 160),
      answers: obj(b.answers),
      notes: obj(b.notes),
      signals: obj(b.signals),
      summary: str(b.text, 40_000),
      ip_hash: g.ip,
    });
    return NextResponse.json({ ok: true, ref });
  } catch (e) {
    console.error("discovery: save failed", e);
    return fail(502, "That did not save. Please try again, or email instead.");
  }
}
