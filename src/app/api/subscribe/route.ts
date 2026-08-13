import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every Resend key on this account is send-only restricted, so the Contacts
// API (POST /audiences/:id/contacts) is not available — it 401s with
// "restricted_api_key". Signups are therefore delivered as a notification
// email instead. If a full-access key is ever issued, switching to a real
// audience is the better shape.
const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  const to = process.env.NEWSLETTER_TO;

  // Fail loudly rather than pretending to succeed — the original version of
  // this form told everyone "Sent" and dropped the address on the floor.
  if (!apiKey || !from || !to) {
    console.error(
      "subscribe: RESEND_API_KEY, NEWSLETTER_FROM or NEWSLETTER_TO is not set"
    );
    return NextResponse.json(
      { error: "Signup is temporarily unavailable. Please email instead." },
      { status: 503 }
    );
  }

  const address = email.trim();

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: address,
      subject: `Newsletter signup: ${address}`,
      text: `${address} signed up via the benjaminbrown.co footer form.`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("subscribe: resend rejected the send", res.status, detail);
    return NextResponse.json(
      { error: "Something went wrong. Please email instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
