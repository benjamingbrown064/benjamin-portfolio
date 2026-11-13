// Receipts sent to a visitor after a form is saved. The wording is fixed and approved by Ben; nothing the
// visitor typed is repeated back except a plain first name, a date and a time that pass strict checks,
// so the forms cannot be used to send someone else a message. Anything Toto drafts himself does not go
// through here: those emails wait for Ben's approval on Telegram.
import facts from "../../site/facts.json";

const FROM = process.env.MAIL_FROM || `${facts.name} <${facts.email}>`;
const REPLY_TO = process.env.MAIL_REPLY_TO || "ben@benjaminbrown.co";

const REQUEST_KIND: Record<string, string> = {
  project: "project enquiry",
  discovery: "Discovery request",
  files: "files",
  bug: "bug report",
  support: "support request",
  assets: "request for materials",
};

export type Receipt =
  | { kind: "request"; to: string; name?: string | null; ref: string; type: string }
  | { kind: "discovery"; to: string; name?: string | null; ref: string }
  | { kind: "booking"; to: string; name?: string | null; date?: string | null; time?: string | null; timeZone?: string | null; format?: string | null };

/** A first name is used only when it is plainly a name: letters, hyphens and apostrophes, up to 30 characters. */
function firstName(name?: string | null): string | null {
  const first = (name ?? "").trim().split(/\s+/)[0] ?? "";
  return /^[\p{L}][\p{L}'’-]{0,29}$/u.test(first) ? first : null;
}

function when(r: Extract<Receipt, { kind: "booking" }>): string | null {
  if (!r.date || !/^\d{4}-\d{2}-\d{2}$/.test(r.date) || !r.time || !/^\d{2}:\d{2}$/.test(r.time)) return null;
  const d = new Date(`${r.date}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  const day = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
  const zone = r.timeZone && /^[A-Za-z_]+(?:\/[A-Za-z0-9_+-]+){0,2}$/.test(r.timeZone) ? ` (${r.timeZone.replace(/_/g, " ")} time)` : "";
  const how = r.format === "video" ? ", by video" : r.format === "in-person" || r.format === "person" ? ", in person" : "";
  return `${day} at ${r.time}${zone}${how}`;
}

export function receiptContent(r: Receipt): { subject: string; lines: string[] } {
  const hello = firstName(r.name) ? `Hi ${firstName(r.name)},` : "Hello,";
  const sign = ["Ben", `${facts.name} · benjaminbrown.co`];
  if (r.kind === "request") {
    const what = REQUEST_KIND[r.type] ?? "request";
    return {
      subject: `Your ${what} has arrived · ${r.ref}`,
      lines: [
        hello,
        `Thanks for getting in touch. Your ${what} has reached me, and its reference is ${r.ref}.`,
        `You will get ${facts.replyPromise}. If you want to add anything in the meantime, reply to this email and quote the reference.`,
        ...sign,
      ],
    };
  }
  if (r.kind === "discovery") {
    return {
      subject: `Your discovery answers are saved · ${r.ref}`,
      lines: [
        hello,
        `Thanks for working through the discovery questions. Your answers are saved under the reference ${r.ref}.`,
        `I will read them myself, and you will get ${facts.replyPromise} with my first thoughts on where to start. If you want to add anything, reply to this email.`,
        ...sign,
      ],
    };
  }
  const slot = when(r);
  return {
    subject: "Your coffee request has arrived",
    lines: [
      hello,
      slot ? `Thanks for asking for a coffee. You asked for ${slot}.` : "Thanks for asking for a coffee.",
      `This is a request, not a confirmed booking yet. I will confirm the time, or suggest another, and you will get ${facts.replyPromise}.`,
      ...sign,
    ],
  };
}

const FOOT = "You are receiving this because this address was entered in a form on benjaminbrown.co. If that was not you, ignore this email and nothing more will be sent.";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Sends a receipt. Never throws: a failed email must not fail the form the visitor just sent. */
export async function sendReceipt(r: Receipt): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const { subject, lines } = receiptContent(r);
    const body = lines.slice(0, -2), sign = lines.slice(-2);
    const text = [...body, sign.join("\n"), "--", FOOT].join("\n\n");
    const html =
      `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#1d1d1f;max-width:560px">` +
      body.map((l) => `<p style="margin:0 0 16px">${esc(l)}</p>`).join("") +
      `<p style="margin:24px 0 0">${esc(sign[0])}<br><span style="color:#6e6e73">${esc(sign[1])}</span></p>` +
      `<p style="margin:28px 0 0;padding-top:16px;border-top:1px solid #e8e8ed;font-size:12.5px;line-height:1.5;color:#6e6e73">${esc(FOOT)}</p></div>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [r.to], reply_to: REPLY_TO, subject, text, html }),
      signal: AbortSignal.timeout(6_000),
    });
    if (!res.ok) throw new Error(`${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
    return true;
  } catch (e) {
    console.error(`mail: ${r.kind} receipt failed`, e);
    return false;
  }
}
