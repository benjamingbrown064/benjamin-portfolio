// Vercel BotID: tells people from scripts on the requests that cost money (starting a call, sending an email code).
// The browser side is public/site/v13/vendor/botid.js. My own test runs can pass the admin token instead.
import { checkBotId } from "botid/server";
import { createHash, timingSafeEqual } from "node:crypto";

export async function isBot(request: Request): Promise<boolean> {
  const admin = process.env.SITE_ADMIN_TOKEN ?? "";
  const given = request.headers.get("x-site-test") ?? "";
  if (admin && given.length === admin.length && timingSafeEqual(Buffer.from(admin), Buffer.from(given))) return false;
  try {
    const v = await checkBotId();
    return v.isBot;
  } catch (e) {
    console.error("bot: check failed", e);
    return false; // the other limits still apply; a broken check must not lock everyone out
  }
}

/** Only a hash of an email code is stored, tied to the conversation it was sent for. */
export function codeHash(session: string, code: string): string {
  return createHash("sha256").update(`${process.env.SITE_HASH_SALT ?? ""}:code:${session}:${code}`).digest("hex");
}
