import { NextResponse } from "next/server";
import { insert } from "@/lib/db";
import { EMAIL_RE, fail, guard, str } from "@/lib/guard";

// Records a coffee request. The calendar is not connected yet, so this is a request for a time,
// not a confirmed booking; it is confirmed by hand until the calendar stage is built.
export async function POST(request: Request) {
  const g = await guard(request, { table: "booking_requests", perHour: 3, perDay: 60, maxBytes: 8000 });
  if (!g.ok) return g.response;
  const b = g.body;
  const email = str(b.email, 200);
  if (!email || !EMAIL_RE.test(email)) return fail(400, "A valid email is needed.");
  try {
    await insert("booking_requests", {
      name: str(b.name, 120),
      email,
      format: str(b.format, 20),
      slot_date: str(b.date, 20),
      slot_time: str(b.time, 10),
      time_zone: str(b.timeZone, 60),
      note: str(b.note, 2000),
      data: { page: str(b.page, 300), duration: typeof b.duration === "number" ? b.duration : null },
      ip_hash: g.ip,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("bookings: save failed", e);
    return fail(502, "That did not save.");
  }
}
