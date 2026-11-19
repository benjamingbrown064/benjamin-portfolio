import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { dbConfigured, removeFiles, rpc } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Nightly clean-up, run by the hosting scheduler (vercel.json), which sends CRON_SECRET as a bearer token.
// Removes what the privacy page says is not kept: people whose last contact was over two years ago (their
// uploaded files first, then their rows), and newsletter addresses 30 days after unsubscribing.
export async function GET(request: Request) {
  const want = process.env.CRON_SECRET ?? "";
  const got = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const same = want.length >= 24 && timingSafeEqual(createHash("sha256").update(want).digest(), createHash("sha256").update(got).digest());
  if (!same) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!dbConfigured()) return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  try {
    const files = await rpc<{ path: string }[]>("retention_expired_files", {});
    const paths = (files ?? []).map((f) => f.path);
    for (let i = 0; i < paths.length; i += 100) await removeFiles("request-files", paths.slice(i, i + 100));
    const result = await rpc<Record<string, unknown>>("retention_purge_people", {});
    console.log(JSON.stringify({ retention: { files: paths.length, ...result } }));
    return NextResponse.json({ ok: true, files: paths.length, ...result });
  } catch (e) {
    console.error("cron/retention: failed", e);
    return NextResponse.json({ error: "Clean-up failed" }, { status: 502 });
  }
}
