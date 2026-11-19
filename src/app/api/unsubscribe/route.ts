import { NextResponse } from "next/server";
import { update } from "@/lib/db";

export const dynamic = "force-dynamic";

// Removes an address from the newsletter. Reached from the button on /unsubscribe, and directly by mail apps that
// offer their own "unsubscribe" button (one-click, a POST with no page). The token from the email is the proof.
export async function POST(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("t") ?? "";
  if (/^[0-9a-f]{48}$/.test(token)) {
    try {
      await update("subscribers", `confirm_token=eq.${token}`, { status: "unsubscribed", unsubscribed_at: new Date().toISOString() });
    } catch (e) {
      console.error("unsubscribe: failed", e);
      return NextResponse.redirect(new URL("/unsubscribe?x=1", url), 303);
    }
  }
  return NextResponse.redirect(new URL("/unsubscribed", url), 303);
}
