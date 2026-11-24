import { connect, gcalConfigured, stateValid, CALENDAR_ACCOUNT } from "@/lib/gcal";
import { htmlResponse, renderMessagePage } from "@/lib/site";

export const dynamic = "force-dynamic";

// Where Google sends Ben back after he allows the site to add coffee bookings to his calendar. Only a link made by
// tools/google-connect.py (signed, valid for 30 minutes) is accepted, and only for his own account.
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const page = (title: string, lede: string, status = 200) => htmlResponse(renderMessagePage({ url: "/api/google/callback", title, lede }), status);
  if (!gcalConfigured()) return page("Not set up", "The calendar connection is not switched on for this site.", 404);
  if (!stateValid(q.get("state") ?? "")) return page("Link expired", "This link has expired or was not made for this site. Ask for a new one.", 400);
  if (q.get("error")) return page("Not connected", "Access was not given, so nothing has changed.");
  const code = q.get("code") ?? "";
  if (!code) return page("Not connected", "Google did not send a code back, so nothing has changed.", 400);
  try {
    const r = await connect(code);
    if (r.reason === "wrong-account") return page("Wrong account", `Please sign in as ${CALENDAR_ACCOUNT}. Nothing has been stored.`, 400);
    if (!r.ok) return page("Not connected", "Google did not give lasting access. Ask for a new link and try again.", 400);
    return page("Calendar connected", "New coffee bookings from the site will now appear in your calendar. You can close this page.");
  } catch (e) {
    console.error("google callback: failed", e);
    return page("Not connected", "Something went wrong talking to Google. Nothing has been stored.", 502);
  }
}
