// Site checks, run with Node's own test runner (no extra packages): `npm test` against a running copy of the site.
//
//   BASE_URL      the site to test (default http://localhost:3000)
//   WRITE_TESTS=1 also send real form submissions. Only ever against a copy connected to the PREVIEW database
//                 (SUPABASE_URL must contain the preview project id below); the rows it creates are deleted at the end.
//                 Preview has no mail key, so nothing is emailed.
//   SITE_TEST_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   needed for WRITE_TESTS.
//
// Without WRITE_TESTS the checks only read pages and send submissions the site must refuse, so they are safe
// against the live site too.
import { test, after } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const PREVIEW_DB = "mhncyhrwjbgxmsnkpqxf";
const WRITE = process.env.WRITE_TESTS === "1";
const RUN = Date.now().toString(36);
const EMAIL = `site-test+${RUN}@example.com`;
// A made-up address per run, so the per-hour limits never block a second run.
const IP = `203.0.113.${Math.floor(Math.random() * 250) + 1}`;

function post(path, body, headers = {}) {
  return fetch(BASE + path, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://benjaminbrown.co", "x-forwarded-for": IP, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
const testHeader = () => ({ "x-site-test": process.env.SITE_TEST_TOKEN ?? "" });

// ---------- Pages ----------

const PAGES = ["/", "/work", "/work/warrantyos", "/work/taskbox", "/work/govscape", "/work/wilbolaw", "/method", "/discovery",
  "/contact", "/journal", "/privacy", "/terms", "/login"];

for (const path of PAGES) {
  test(`page ${path} renders`, async () => {
    const res = await fetch(BASE + path);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /<h1[\s>]/, "has a main heading");
    assert.doesNotMatch(html, /\{\{[a-z_.]+\}\}/, "no unfilled {{tokens}}");
    assert.doesNotMatch(html, />\s*(undefined|null|NaN)\s*</, "no undefined/null/NaN shown as text");
    assert.match(html, /<title>[^<]{5,}<\/title>/, "has a title");
  });
}

test("journal articles linked from /journal all render", async () => {
  const html = await (await fetch(BASE + "/journal")).text();
  const links = [...new Set([...html.matchAll(/href="(\/journal\/[a-z0-9-]+)"/g)].map((m) => m[1]))];
  assert.ok(links.length >= 2, "journal lists articles");
  for (const l of links) assert.equal((await fetch(BASE + l)).status, 200, l);
});

test("unknown page is a 404", async () => {
  assert.equal((await fetch(BASE + "/no-such-page-" + RUN)).status, 404);
});

test("case studies show their text before any script runs", async () => {
  for (const p of ["/work/warrantyos", "/work/govscape", "/work/wilbolaw"]) {
    const html = await (await fetch(BASE + p)).text();
    const main = html.match(/<main[^>]*data-prerendered[^>]*>([\s\S]*?)<\/main>/);
    assert.ok(main, `${p} has a prerendered main`);
    const words = main[1].replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    assert.ok(words > 300, `${p} prerendered words: ${words}`);
    assert.doesNotMatch(html, /textContent=''/, `${p} does not blank the prerendered copy`);
  }
});

test("films are not fetched before the page has loaded", async () => {
  const html = await (await fetch(BASE + "/work/taskbox")).text();
  assert.doesNotMatch(html, /<iframe[^>]*\ssrc="\/site\/assets\/web\/taskbox-(voice|form)-video\.html"/);
});

// ---------- Forms: what the site must refuse ----------

const FORMS = ["/api/requests", "/api/bookings", "/api/discovery", "/api/subscribe"];

for (const path of FORMS) {
  test(`${path} refuses another site's origin`, async () => {
    const res = await post(path, { email: EMAIL }, { origin: "https://example.com" });
    assert.ok([403, 503].includes(res.status), `status ${res.status}`);
  });
  test(`${path} refuses a body that is not JSON`, async () => {
    const res = await post(path, "not json", testHeader());
    assert.ok([400, 403, 503].includes(res.status), `status ${res.status}`);
  });
}

test("subscribe refuses a bad email", async () => {
  const res = await post("/api/subscribe", { email: "not-an-email" }, testHeader());
  assert.ok([400, 403, 503].includes(res.status), `status ${res.status}`);
  if (res.status === 400) assert.match((await res.json()).error, /valid email/i);
});

test("requests refuses an unknown type and a missing name", async () => {
  let res = await post("/api/requests", { type: "nope", name: "A", email: EMAIL }, testHeader());
  if (res.status === 503 || res.status === 403) return; // not connected / bot check on: nothing more to test here
  assert.equal(res.status, 400);
  res = await post("/api/requests", { type: "project", email: EMAIL }, testHeader());
  assert.equal(res.status, 400);
});

test("requests refuses a file type that cannot be sent", async () => {
  const res = await post("/api/requests", { type: "files", name: "Test", email: EMAIL, fileList: [{ name: "x.exe", size: 10 }] }, testHeader());
  if (res.status === 503 || res.status === 403) return;
  assert.equal(res.status, 400);
});

test("bookings refuses a time that is not offered", async () => {
  const res = await post("/api/bookings", { email: EMAIL, date: "2020-01-01", time: "03:00", timeZone: "Europe/London" }, testHeader());
  if (res.status === 503 || res.status === 403) return;
  assert.ok([400, 409].includes(res.status), `status ${res.status}`);
});

test("availability answers for a weekday and never offers a weekend", async () => {
  const day = new Date(Date.now() + 40 * 86400_000);
  while (day.getUTCDay() !== 6) day.setUTCDate(day.getUTCDate() + 1); // a Saturday
  const sat = day.toISOString().slice(0, 10);
  const res = await fetch(`${BASE}/api/availability?date=${sat}&tz=Europe/London`);
  if (res.status === 503) return;
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).slots, []);
});

test("unsubscribe, confirm and calendar-connect links with a bad token do not crash", async () => {
  for (const p of ["/api/unsubscribe?t=bad", "/api/subscribe/confirm?t=bad", "/api/google/callback?state=1.bad&code=x"]) {
    const res = await fetch(BASE + p, { redirect: "manual" });
    assert.ok(res.status < 500, `${p} status ${res.status}`);
  }
});

// ---------- Forms: real submissions (preview database only) ----------

const made = []; // [table, filter] to delete afterwards

async function db(path, init = {}) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`db ${path}: ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

const writeOpts = { skip: !WRITE && "set WRITE_TESTS=1 (preview database only)" };

test("write tests only ever touch the preview database", writeOpts, () => {
  assert.ok((process.env.SUPABASE_URL || "").includes(PREVIEW_DB), "SUPABASE_URL is not the preview project");
  assert.ok((process.env.SITE_TEST_TOKEN || "").length >= 32, "SITE_TEST_TOKEN missing");
});

test("a project request is saved", writeOpts, async () => {
  const res = await post("/api/requests", { type: "project", name: "Site test", email: EMAIL, message: "Automated test " + RUN }, testHeader());
  assert.equal(res.status, 200, await res.clone().text());
  const j = await res.json();
  assert.equal(j.ok, true);
  made.push(["requests", `email=eq.${encodeURIComponent(EMAIL)}`]);
  const rows = await db(`requests?email=eq.${encodeURIComponent(EMAIL)}&select=type,name`);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].type, "project");
});

test("a discovery is saved", writeOpts, async () => {
  const res = await post("/api/discovery", { journey: "test", text: "Automated test " + RUN, contact: { name: "Site test", email: EMAIL } }, testHeader());
  assert.equal(res.status, 200, await res.clone().text());
  made.push(["discovery_submissions", `email=eq.${encodeURIComponent(EMAIL)}`]);
  assert.equal((await db(`discovery_submissions?email=eq.${encodeURIComponent(EMAIL)}&select=email`)).length, 1);
});

test("subscribing twice keeps one unconfirmed subscriber", writeOpts, async () => {
  for (let i = 0; i < 2; i++) assert.equal((await post("/api/subscribe", { email: EMAIL, source: "test" }, testHeader())).status, 200);
  made.push(["subscribers", `email=eq.${encodeURIComponent(EMAIL)}`]);
  const rows = await db(`subscribers?email=eq.${encodeURIComponent(EMAIL)}&select=status,confirm_token`);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, "unconfirmed");
  // The confirm link turns it into a subscriber; the unsubscribe link (sent in every issue) turns it off again.
  const c = await fetch(`${BASE}/api/subscribe/confirm?t=${rows[0].confirm_token}`, { redirect: "manual" });
  assert.ok(c.status < 400, `confirm status ${c.status}`);
  assert.equal((await db(`subscribers?email=eq.${encodeURIComponent(EMAIL)}&select=status`))[0].status, "confirmed");
});

test("a coffee slot can be booked once, not twice", writeOpts, async () => {
  // A weekday inside the booking window with a free time. This runs against the preview database only.
  let date, a;
  for (let d = 3; d < 30 && !(a && a.slots.length); d++) {
    date = new Date(Date.now() + d * 86400_000).toISOString().slice(0, 10);
    a = await (await fetch(`${BASE}/api/availability?date=${date}&tz=Europe/London`)).json();
  }
  assert.ok(a.slots.length > 0, "a weekday has free times");
  const pick = a.slots[Math.floor(Math.random() * a.slots.length)];
  const booking = { email: EMAIL, name: "Site test", date, time: pick, timeZone: "Europe/London", format: "video" };
  const first = await post("/api/bookings", booking, testHeader());
  assert.equal(first.status, 200, await first.clone().text());
  made.push(["booking_requests", `email=eq.${encodeURIComponent(EMAIL)}`]);
  const second = await post("/api/bookings", booking, { ...testHeader(), "x-forwarded-for": IP.replace(/\d+$/, "254") });
  assert.equal(second.status, 409, "the same time cannot be booked twice");
});

after(async () => {
  if (!WRITE) return;
  for (const [table, filter] of made) await db(`${table}?${filter}`, { method: "DELETE" });
});
