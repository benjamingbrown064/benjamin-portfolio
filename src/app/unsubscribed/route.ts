import { htmlResponse, renderMessagePage } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return htmlResponse(renderMessagePage({ url: "/unsubscribed", title: "You are unsubscribed", lede: "This address has been removed from The Handover. If that was a mistake, you can sign up again from Notes.", body: `<form method="get" action="/journal"><button class="btn" type="submit">Go to Notes</button></form>` }));
}
