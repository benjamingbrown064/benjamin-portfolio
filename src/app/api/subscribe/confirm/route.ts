import { NextResponse } from "next/server";
import { update } from "@/lib/db";

export const dynamic = "force-dynamic";

// The link in the confirmation email. The long random token in it is the proof that the address is theirs.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("t") ?? "";
  let ok = false;
  if (/^[0-9a-f]{48}$/.test(token)) {
    try {
      const rows = await update("subscribers", `confirm_token=eq.${token}&status=neq.unsubscribed`, { status: "confirmed", confirmed_at: new Date().toISOString() });
      ok = rows.length > 0;
    } catch (e) {
      console.error("subscribe/confirm: failed", e);
    }
  }
  return NextResponse.redirect(new URL(ok ? "/subscribed" : "/subscribed?x=1", url), 303);
}
