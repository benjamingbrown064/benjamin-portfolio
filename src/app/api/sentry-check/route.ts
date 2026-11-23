// TEMPORARY (23 Nov 2026): proves production errors reach Sentry with readable stack traces. Remove after the check.
// Answers 404 unless the request carries SITE_TEST_TOKEN in x-site-test, so the public cannot trigger it.
import { timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";

function failForSentryCheck(): never {
  throw new Error(`Sentry production check ${Date.now()}`);
}

export async function GET(request: Request) {
  const test = process.env.SITE_TEST_TOKEN ?? "";
  const given = request.headers.get("x-site-test") ?? "";
  const ok = test.length >= 32 && given.length === test.length && timingSafeEqual(Buffer.from(test), Buffer.from(given));
  if (!ok) return new Response("Not found", { status: 404 });
  failForSentryCheck();
}
