// Coffee booking times. The hours on offer are in site/facts.json; a time is left out when Ben's calendar shows him
// busy, or when someone has already asked for it. The calendar is read through its private read-only address
// (CALENDAR_ICS_URL, Google Calendar's "secret address in iCal format"); nothing is ever written to it.
import ICAL from "ical.js";
import facts from "../../site/facts.json";
import { select } from "./db";

const C = facts.coffee;
export const COFFEE_TZ = C.timeZone;

type Busy = { start: number; end: number };

/** How far a time zone is ahead of UTC at a given moment, in ms. */
function offset(at: number, tz: string): number {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(at).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(at / 1000) * 1000;
}

/** The moment a wall-clock time happens in the booking time zone. */
function at(date: string, time: string): number {
  const [y, m, d] = date.split("-").map(Number), [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, mi);
  const first = guess - offset(guess, COFFEE_TZ);
  return guess - offset(first, COFFEE_TZ);
}

function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: COFFEE_TZ }).format(new Date());
}

let feed: { text: string; fetched: number } | null = null;
async function calendarText(): Promise<string | null> {
  const url = process.env.CALENDAR_ICS_URL;
  if (!url) return null;
  if (feed && Date.now() - feed.fetched < 5 * 60_000) return feed.text;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000), cache: "no-store" });
  if (!res.ok) throw new Error(`calendar feed ${res.status}`);
  const text = await res.text();
  if (!text.includes("BEGIN:VCALENDAR")) throw new Error("calendar feed is not a calendar");
  feed = { text, fetched: Date.now() };
  return text;
}

/** Busy periods that touch one day. Events marked "free", cancelled events and declined copies are ignored. */
function busyOn(text: string, date: string): Busy[] {
  const dayStart = at(date, "00:00"), dayEnd = dayStart + 26 * 3600_000;
  const cal = new ICAL.Component(ICAL.parse(text));
  for (const tz of cal.getAllSubcomponents("vtimezone")) ICAL.TimezoneService.register(tz);
  const events = cal.getAllSubcomponents("vevent");
  const changed = new Map<string, ICAL.Component[]>(); // single occurrences of a repeating event that were moved or edited
  for (const ve of events) {
    if (ve.hasProperty("recurrence-id")) {
      const uid = String(ve.getFirstPropertyValue("uid"));
      changed.set(uid, [...(changed.get(uid) ?? []), ve]);
    }
  }
  const out: Busy[] = [];
  const add = (ve: ICAL.Component, start: ICAL.Time, end: ICAL.Time) => {
    if (String(ve.getFirstPropertyValue("transp") ?? "").toUpperCase() === "TRANSPARENT") return;
    if (String(ve.getFirstPropertyValue("status") ?? "").toUpperCase() === "CANCELLED") return;
    // An all-day event has dates, not times: it covers those whole days in the booking time zone.
    const s = start.isDate ? at(start.toString(), "00:00") : start.toJSDate().getTime();
    const e = end.isDate ? at(end.toString(), "00:00") : end.toJSDate().getTime();
    if (s < dayEnd && e > dayStart) out.push({ start: s, end: e });
  };
  for (const ve of events) {
    if (ve.hasProperty("recurrence-id")) continue;
    const ev = new ICAL.Event(ve);
    if (!ev.isRecurring()) { add(ve, ev.startDate, ev.endDate); continue; }
    for (const x of changed.get(ev.uid) ?? []) ev.relateException(x);
    const it = ev.iterator();
    for (let n = 0; n < 4000; n++) {
      const next = it.next();
      if (!next) break;
      const d = ev.getOccurrenceDetails(next);
      if (d.startDate.toJSDate().getTime() > dayEnd + 86_400_000) break;
      add(d.item.component, d.startDate, d.endDate);
    }
  }
  return out;
}

const cache = new Map<string, { slots: string[]; made: number }>();

/** The times still free on a day, as HH:MM in the booking time zone. An empty list for days that are not offered. */
export async function freeSlots(date: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return [];
  const now = today();
  const last = new Date(Date.parse(now) + C.daysAhead * 86_400_000).toISOString().slice(0, 10);
  if (date <= now || date > last) return []; // nothing sooner than tomorrow
  if (!C.days.includes(new Date(`${date}T12:00:00Z`).getUTCDay())) return [];
  const hit = cache.get(date);
  if (hit && Date.now() - hit.made < 60_000) return hit.slots;

  const [fh, fm] = C.from.split(":").map(Number), [th, tm] = C.to.split(":").map(Number);
  const times: string[] = [];
  for (let t = fh * 60 + fm; t + C.slotMinutes <= th * 60 + tm; t += C.slotMinutes) times.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);

  const text = await calendarText();
  const busy = text ? busyOn(text, date) : [];
  // Times already asked for through the site are held too, until Ben confirms or declines them.
  const asked = await select<{ slot_time: string }>("booking_requests", `select=slot_time&slot_date=eq.${date}&time_zone=eq.${encodeURIComponent(COFFEE_TZ)}&status=in.(requested,confirmed)`);
  const taken = new Set(asked.map((a) => a.slot_time));
  const slots = times.filter((t) => {
    if (taken.has(t)) return false;
    const s = at(date, t), e = s + C.slotMinutes * 60_000;
    return !busy.some((b) => b.start < e && b.end > s);
  });
  cache.set(date, { slots, made: Date.now() });
  if (cache.size > 200) cache.clear();
  return slots;
}

/** A link that opens Google Calendar with the coffee filled in, for the notice Ben gets. */
export function addToCalendarLink(b: { date: string; time: string; name: string | null; email: string; format: string | null }): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date) || !/^\d{2}:\d{2}$/.test(b.time)) return null;
  const s = at(b.date, b.time), stamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: `Coffee with ${b.name ?? b.email}`, dates: `${stamp(s)}/${stamp(s + C.slotMinutes * 60_000)}`, add: b.email, details: b.format === "video" ? "Video call (website coffee request)" : "In person (website coffee request)" });
  return `https://calendar.google.com/calendar/render?${q}`;
}
