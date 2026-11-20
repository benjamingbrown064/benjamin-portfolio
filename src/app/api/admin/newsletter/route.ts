import { NextResponse } from "next/server";
import { adminAllowed } from "@/lib/admin";
import { count, dbConfigured, insert, select } from "@/lib/db";
import { EMAIL_RE } from "@/lib/guard";
import { findIssue, issueMail, sendBatch } from "@/lib/newsletter";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Sub = { email: string; confirm_token: string };

// Sends an issue of the newsletter. For Ben's own assistant only (admin token); there is no page for this.
//   GET                          how many confirmed subscribers, and what has been sent
//   POST {slug, mode:"test", to}  one copy to Ben, to check it
//   POST {slug, mode:"send"}      to every confirmed subscriber who has not had this issue yet
// A send works through the list in hundreds and stops before the time limit; the reply says how many are left,
// and asking again carries on. Nobody is sent the same issue twice.
export async function GET(request: Request) {
  if (!adminAllowed(request)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!dbConfigured()) return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  const [confirmed, unconfirmed, sent] = await Promise.all([
    count("subscribers", "status=eq.confirmed"),
    count("subscribers", "status=eq.unconfirmed"),
    select<{ slug: string; sent_at: string }>("newsletter_deliveries", "select=slug,sent_at&order=sent_at.desc&limit=5000"),
  ]);
  const issues: Record<string, { sent: number; last: string }> = {};
  for (const d of sent) issues[d.slug] = { sent: (issues[d.slug]?.sent ?? 0) + 1, last: issues[d.slug]?.last ?? d.sent_at };
  return NextResponse.json({ ok: true, confirmed, unconfirmed, issues });
}

export async function POST(request: Request) {
  if (!adminAllowed(request)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!dbConfigured()) return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  const body = (await request.json().catch(() => ({}))) as { slug?: unknown; mode?: unknown; to?: unknown };
  const issue = typeof body.slug === "string" ? findIssue(body.slug) : undefined;
  if (!issue) return NextResponse.json({ ok: false, error: "No published Notes entry has that address." }, { status: 400 });

  try {
    if (body.mode === "test") {
      const to = typeof body.to === "string" && EMAIL_RE.test(body.to) ? body.to : process.env.MAIL_NOTICE_TO || "ben@benjaminbrown.co";
      // A test copy carries a token that matches nobody, so its unsubscribe link does nothing.
      const [id] = await sendBatch([issueMail(issue, to, "0".repeat(48), true)]);
      return NextResponse.json({ ok: true, mode: "test", to, id });
    }
    if (body.mode !== "send") return NextResponse.json({ ok: false, error: 'mode must be "test" or "send".' }, { status: 400 });

    const started = Date.now();
    const subs = await select<Sub>("subscribers", "select=email,confirm_token&status=eq.confirmed&order=id.asc&limit=10000");
    const had = new Set((await select<{ email: string }>("newsletter_deliveries", `select=email&slug=eq.${encodeURIComponent(issue.slug)}&limit=10000`)).map((d) => d.email.toLowerCase()));
    const todo = subs.filter((s) => !had.has(s.email.toLowerCase()));
    let sent = 0;
    while (sent < todo.length && Date.now() - started < 40_000) {
      const chunk = todo.slice(sent, sent + 100);
      const ids = await sendBatch(chunk.map((s) => issueMail(issue, s.email, s.confirm_token)));
      await insert("newsletter_deliveries", chunk.map((s, i) => ({ slug: issue.slug, email: s.email, mail_id: ids[i] ?? null })));
      sent += chunk.length;
    }
    console.log(JSON.stringify({ newsletter: { slug: issue.slug, sent, left: todo.length - sent, already: had.size } }));
    return NextResponse.json({ ok: true, mode: "send", slug: issue.slug, sent, left: todo.length - sent, alreadyHad: had.size, confirmed: subs.length });
  } catch (e) {
    console.error("admin/newsletter: failed", e);
    return NextResponse.json({ ok: false, error: "The send did not go through. Nothing is lost: ask again to carry on." }, { status: 502 });
  }
}
