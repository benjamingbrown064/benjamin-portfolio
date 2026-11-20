// Coffee booking times. The hours on offer are in site/facts.json and apply in the time zone of wherever Ben is
// that day (York unless his calendar says California). A time is left out when his calendar shows him busy, or when
// someone has already asked for it. Visitors are shown the times in their own time zone.
// The calendar is read through its private read-only address (CALENDAR_ICS_URL, Google Calendar's "secret address
// in iCal format"); nothing is ever written to it.
import ICAL from "ical.js";
import facts from "../../site/facts.json";
import { select } from "./db";

const C = facts.coffee;
const AWAY_RE = new RegExp(`\\b(?:${C.awayWords})\\b`, "i");

type Busy = { start: number; end: number };
type Calendar = { timed: Busy[]; dayBusy: Set<string>; away: Set<string> };
export type Slot = { time: string; at: string };

export function validZone(tz: unknown): tz is string {
  if (typeof tz !== "string" || tz.length > 60) return false;
  try { new Intl.DateTimeFormat("en-GB", { timeZone: tz }); return true; } catch { return false; }
}

/** How far a time zone is ahead of UTC at a given moment, in ms. */
function offset(at: number, tz: string): number {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(at).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(at / 1000) * 1000;
}

/** The moment a wall-clock time happens in a time zone. */
export function instant(date: string, time: string, tz: string): number {
  const [y, m, d] = date.split("-").map(Number), [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, mi);
  return guess - offset(guess - offset(guess, tz), tz);
}

/** A moment as a date and a time on the wall in a time zone. */
export function local(ms: number, tz: string): { date: string; time: string } {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(ms).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` };
}

function shift(date: string, days: number): string {
  return new Date(Date.parse(`${date}T12:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
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

/** What the calendar says about a run of days: timed busy periods, whole days marked busy, and days Ben is away
 *  (an all-day event whose title names the other studio's place). Events marked "free" and cancelled events are
 *  ignored, except that an away marker counts whether it is marked free or busy and never blocks the day itself. */
function readCalendar(text: string, days: string[]): Calendar {
  const from = Date.parse(`${days[0]}T00:00:00Z`) - 14 * 3600_000, to = Date.parse(`${days[days.length - 1]}T00:00:00Z`) + 40 * 3600_000;
  const out: Calendar = { timed: [], dayBusy: new Set(), away: new Set() };
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
  const add = (ve: ICAL.Component, start: ICAL.Time, end: ICAL.Time) => {
    if (String(ve.getFirstPropertyValue("status") ?? "").toUpperCase() === "CANCELLED") return;
    const free = String(ve.getFirstPropertyValue("transp") ?? "").toUpperCase() === "TRANSPARENT";
    if (start.isDate) {
      // An all-day event has dates, not times.
      const s = start.toString().slice(0, 10), e = end.toString().slice(0, 10);
      const marker = AWAY_RE.test(String(ve.getFirstPropertyValue("summary") ?? ""));
      for (const d of days) if (d >= s && (d < e || d === s)) { if (marker) out.away.add(d); else if (!free) out.dayBusy.add(d); }
      return;
    }
    if (free) return;
    const s = start.toJSDate().getTime(), e = end.toJSDate().getTime();
    if (s < to && e > from) out.timed.push({ start: s, end: e });
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
      if (d.startDate.toJSDate().getTime() > to + 86_400_000) break;
      add(d.item.component, d.startDate, d.endDate);
    }
  }
  return out;
}

const cache = new Map<string, { slots: Slot[]; made: number }>();

/** The times still free on a day, for a visitor in a given time zone: each as the time on their own clock and the
 *  exact moment. `date` is the day on the visitor's calendar. Without a visitor zone, Ben's own zone is used. */
export async function freeSlots(date: string, visitorZone?: string, fresh = false): Promise<Slot[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return [];
  const key = `${date}|${visitorZone ?? ""}`, hit = cache.get(key);
  if (!fresh && hit && Date.now() - hit.made < 60_000) return hit.slots;

  // Ben's working day can fall on the day before or after on the visitor's calendar, so three of his days are looked at.
  const days = [shift(date, -1), date, shift(date, 1)];
  const text = await calendarText();
  const cal: Calendar = text ? readCalendar(text, days) : { timed: [], dayBusy: new Set(), away: new Set() };
  const asked = await select<{ slot_date: string; slot_time: string; time_zone: string | null }>("booking_requests", `select=slot_date,slot_time,time_zone&slot_date=gte.${shift(date, -2)}&slot_date=lte.${shift(date, 2)}&status=in.(requested,confirmed)`);
  // Times already asked for through the site are held too, until Ben confirms or declines them.
  const taken = new Set(asked.filter((a) => /^\d{4}-\d{2}-\d{2}$/.test(a.slot_date) && /^\d{2}:\d{2}$/.test(a.slot_time) && validZone(a.time_zone)).map((a) => instant(a.slot_date, a.slot_time, a.time_zone!)));

  const [fh, fm] = C.from.split(":").map(Number), [th, tm] = C.to.split(":").map(Number);
  const slots: Slot[] = [];
  for (const day of days) {
    const zone = benZone(day, cal);
    if (!C.days.includes(new Date(`${day}T12:00:00Z`).getUTCDay()) || cal.dayBusy.has(day)) continue;
    const today = local(Date.now(), zone).date;
    if (day <= today || day > shift(today, C.daysAhead)) continue; // nothing sooner than tomorrow
    for (let t = fh * 60 + fm; t + C.slotMinutes <= th * 60 + tm; t += C.slotMinutes) {
      const s = instant(day, `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`, zone), e = s + C.slotMinutes * 60_000;
      if (taken.has(s) || cal.timed.some((b) => b.start < e && b.end > s)) continue;
      const seen = local(s, visitorZone ?? zone);
      if (seen.date === date) slots.push({ time: seen.time, at: new Date(s).toISOString() });
    }
  }
  slots.sort((a, b) => a.at.localeCompare(b.at));
  cache.set(key, { slots, made: Date.now() });
  if (cache.size > 400) cache.clear();
  return slots;
}

/** Called after a booking is saved, so the time stops being offered straight away. */
export function forgetSlots(): void {
  cache.clear();
}

function benZone(day: string, cal: Calendar): string {
  return (C.location === "away") !== cal.away.has(day) ? C.away.timeZone : C.home.timeZone;
}

/** A link that opens Google Calendar with the coffee filled in, for the notice Ben gets. */
export function addToCalendarLink(b: { at: number; name: string | null; email: string; format: string | null }): string {
  const stamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: `Coffee with ${b.name ?? b.email}`, dates: `${stamp(b.at)}/${stamp(b.at + C.slotMinutes * 60_000)}`, add: b.email, details: b.format === "video" ? "Video call (website coffee request)" : "In person (website coffee request)" });
  return `https://calendar.google.com/calendar/render?${q}`;
}

/** The same moment written out for Ben in both of his time zones. */
export function forBen(at: number): string {
  const f = (tz: string, label: string) => `${new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(at)} ${label}`;
  return `${f(C.home.timeZone, "UK")} · ${f(C.away.timeZone, "California")}`;
}
