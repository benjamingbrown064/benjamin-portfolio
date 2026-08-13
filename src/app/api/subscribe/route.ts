import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Fail loudly rather than pretending to succeed — the previous version of
  // this form told everyone "Sent" and dropped the address on the floor.
  if (!apiKey || !audienceId) {
    console.error("subscribe: RESEND_API_KEY or RESEND_AUDIENCE_ID is not set");
    return NextResponse.json(
      { error: "Signup is temporarily unavailable. Please email instead." },
      { status: 503 }
    );
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim(), unsubscribed: false }),
    }
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("subscribe: resend rejected the contact", res.status, detail);
    return NextResponse.json(
      { error: "Something went wrong. Please email instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
