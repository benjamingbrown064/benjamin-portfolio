import { htmlResponse, renderMessagePage } from "@/lib/site";

export const dynamic = "force-dynamic";

// Where the confirmation link in the newsletter email lands. ?x=1 means the link was old or already removed.
export function GET(request: Request) {
  const bad = new URL(request.url).searchParams.has("x");
  return htmlResponse(
    renderMessagePage(
      bad
        ? { url: "/subscribed", title: "That link did not work", lede: "It may be an old link, or the address has since been removed. Sign up again from Notes and a fresh link comes to you.", body: `<form method="get" action="/journal"><button class="btn" type="submit">Go to Notes</button></form>` }
        : { url: "/subscribed", title: "You are subscribed", lede: "Thanks for confirming. The Handover comes to you each week, and every one has an unsubscribe link.", body: `<form method="get" action="/journal"><button class="btn" type="submit">Read Notes</button></form>` },
    ),
  );
}
