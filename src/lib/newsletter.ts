// The newsletter. The list lives in this site's own database (subscribers); the mail service (Resend) only delivers.
// An issue is a published Notes entry: the email carries its picture, title and opening line and a button to read
// it on the site, plus an unsubscribe link that belongs to that one subscriber.
import facts from "../../site/facts.json";
import { JOURNAL, journalDate, type JournalEntry } from "./journal";

const FROM = process.env.MAIL_FROM || `${facts.name} <${facts.email}>`;
const REPLY_TO = process.env.MAIL_REPLY_TO || "ben@benjaminbrown.co";
const ADDRESS = "Benjamin Brown · Patch Studio, The Bonding Warehouse, Terry Ave, York YO1 6FA, United Kingdom";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function findIssue(slug: string): JournalEntry | undefined {
  return JOURNAL.find((e) => e.slug === slug);
}

export type Mail = { from: string; to: string[]; reply_to: string; subject: string; html: string; text: string; headers: Record<string, string>; tags: { name: string; value: string }[] };

/** One subscriber's copy of an issue. `token` is their own unsubscribe token. */
export function issueMail(e: JournalEntry, to: string, token: string, test = false): Mail {
  const url = `${facts.siteUrl}/journal/${e.slug}`;
  const unsub = `${facts.siteUrl}/unsubscribe?t=${token}`;
  const kind = e.issue ? `${e.category} · ${e.issue}` : e.category;
  const subject = `${test ? "[Test] " : ""}${e.title}`;
  const text = [
    `${kind} · ${journalDate(e.date)}`,
    e.title,
    e.excerpt,
    `Read it (${e.minutes} min): ${url}`,
    "Ben",
    "--",
    `You are receiving this because you signed up to The Handover on benjaminbrown.co and confirmed this address.\nUnsubscribe: ${unsub}\n${ADDRESS}`,
  ].join("\n\n");
  const html =
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#1d1d1f;max-width:560px;margin:0 auto">` +
    `<p style="margin:0 0 14px;font-size:12.5px;letter-spacing:.04em;text-transform:uppercase;color:#6e6e73">${esc(kind)} · ${journalDate(e.date)}</p>` +
    `<a href="${url}"><img src="${facts.siteUrl}${e.cover}" alt="${esc(e.coverAlt)}" width="560" style="display:block;width:100%;max-width:560px;height:auto;border-radius:14px;border:0"></a>` +
    `<h1 style="margin:24px 0 10px;font-size:26px;line-height:1.15;letter-spacing:-.02em;font-weight:600">${esc(e.title)}</h1>` +
    `<p style="margin:0 0 22px;color:#3a3a3c">${esc(e.excerpt)}</p>` +
    `<p style="margin:0 0 28px"><a href="${url}" style="display:inline-block;background:#1d1d1f;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:500">Read it · ${e.minutes} min</a></p>` +
    `<p style="margin:0">Ben<br><span style="color:#6e6e73">${esc(facts.name)} · benjaminbrown.co</span></p>` +
    `<p style="margin:28px 0 0;padding-top:16px;border-top:1px solid #e8e8ed;font-size:12.5px;line-height:1.5;color:#6e6e73">You are receiving this because you signed up to The Handover on benjaminbrown.co and confirmed this address. <a href="${unsub}" style="color:#6e6e73">Unsubscribe</a><br>${esc(ADDRESS)}</p></div>`;
  return {
    from: FROM, to: [to], reply_to: REPLY_TO, subject, html, text,
    // Lets mail apps show their own Unsubscribe button, which removes the address in one click.
    headers: { "List-Unsubscribe": `<${facts.siteUrl}/api/unsubscribe?t=${token}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    tags: [{ name: "kind", value: test ? "newsletter-test" : "newsletter" }, { name: "issue", value: e.slug.replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 200) }],
  };
}

/** Hands up to 100 emails to the mail service in one call. Returns the id it gave each, in order. */
export async function sendBatch(mails: Mail[]): Promise<string[]> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("mail is not connected");
  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(mails),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`mail service answered ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
  const j = (await res.json()) as { data?: { id: string }[] };
  return (j.data ?? []).map((d) => d.id);
}
