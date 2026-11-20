import { NextResponse } from "next/server";
import { insert } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";
import { sendNotice, sendReceipt } from "@/lib/mail";
import { addToCalendarLink, forBen, instant, validZone } from "@/lib/calendar";

// Records a coffee request. The times offered come from Ben's calendar (see /api/availability), but nothing is
// written to it: this is a request for a time, and Ben confirms it himself. His notice carries a link that adds it.
export async function POST(request: Request) {
  const g = await guard(request, { table: "booking_requests", perHour: 3, perDay: 60, maxBytes: 8000, bot: true });
  if (!g.ok) return g.response;
  const b = g.body;
  const email = str(b.email, 200);
  if (!email || !EMAIL_RE.test(email)) return fail(400, "A valid email is needed.");
  // The visitor picks a time on their own clock; the exact moment is worked out from it and their time zone.
  const date = str(b.date, 20) ?? "", time = str(b.time, 10) ?? "";
  const at = /^\d{4}-\d{2}-\d{2}$/.test(date) && /^\d{2}:\d{2}$/.test(time) && validZone(b.timeZone) ? instant(date, time, b.timeZone) : null;
  try {
    await insert("booking_requests", {
      name: str(b.name, 120),
      email,
      format: str(b.format, 20),
      slot_date: str(b.date, 20),
      slot_time: str(b.time, 10),
      time_zone: str(b.timeZone, 60),
      note: str(b.note, 2000),
      data: { page: str(b.page, 300), duration: typeof b.duration === "number" ? b.duration : null, at: at ? new Date(at).toISOString() : null },
      ip_hash: g.ip,
    });
    await sendNotice(`New coffee request: ${str(b.name, 120) ?? email}`, [["Name", str(b.name, 120)], ["Email", email], ["When for you", at ? forBen(at) : null], ["When for them", [str(b.date, 20), str(b.time, 10), str(b.timeZone, 60)].filter(Boolean).join(" ")], ["Format", str(b.format, 20)], ["Note", str(b.note, 2000)], ["Add to your calendar", at ? addToCalendarLink({ at, name: str(b.name, 120), email, format: str(b.format, 20) }) : null]]);
    await sendReceipt({ kind: "booking", to: email, name: str(b.name, 120), date: str(b.date, 20), time: str(b.time, 10), timeZone: str(b.timeZone, 60), format: str(b.format, 20) });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("bookings: save failed", e);
    return fail(502, "That did not save.");
  }
}
