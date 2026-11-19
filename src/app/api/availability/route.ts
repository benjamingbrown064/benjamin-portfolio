import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { COFFEE_TZ, freeSlots } from "@/lib/calendar";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

// The coffee booking asks this for the times still free on a day. It only ever says which times are free,
// never what is in the calendar.
export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  if (!dbConfigured()) return NextResponse.json({ ok: false, slots: [] }, { status: 503 });
  try {
    return NextResponse.json({ ok: true, date, timeZone: COFFEE_TZ, slots: await freeSlots(date) }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    console.error("availability: failed", e);
    // If the calendar cannot be read, no times are offered rather than times that may be taken.
    return NextResponse.json({ ok: false, slots: [] }, { status: 502 });
  }
}
