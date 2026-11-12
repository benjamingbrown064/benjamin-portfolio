// Access for Ben's own assistant (Toto, on the Mac): a bearer token that never reaches a browser.
// The admin endpoints are read-only.
import { createHash, timingSafeEqual } from "node:crypto";

export function adminAllowed(request: Request): boolean {
  const expected = process.env.SITE_ADMIN_TOKEN;
  const given = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!expected || expected.length < 32 || !given) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
