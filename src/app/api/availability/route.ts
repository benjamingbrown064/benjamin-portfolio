import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { freeSlots, validZone } from "@/lib/calendar";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

// The coffee booking asks this for the times still free on a day, in the visitor's own time zone (tz). It only
// ever says which times are free, never what is in the calendar.
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const date = q.get("date") ?? "", tz = q.get("tz");
  if (!dbConfigured()) return NextResponse.json({ ok: false, slots: [] }, { status: 503 });
  try {
    const free = await freeSlots(date, validZone(tz) ? tz : undefined);
    return NextResponse.json({ ok: true, date, slots: free.map((s) => s.time), at: free.map((s) => s.at) }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    console.error("availability: failed", e);
    // If the calendar cannot be read, no times are offered rather than times that may be taken.
    return NextResponse.json({ ok: false, slots: [] }, { status: 502 });
  }
}
