import { htmlResponse, renderMessagePage } from "@/lib/site";

export const dynamic = "force-dynamic";

// The unsubscribe link in every newsletter lands here. Removal happens on the button, not on opening the page,
// so mail scanners that open links cannot unsubscribe someone by accident.
export function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const token = q.get("t") ?? "";
  if (!/^[0-9a-f]{48}$/.test(token)) {
    return htmlResponse(renderMessagePage({ url: "/unsubscribe", title: "That link did not work", lede: "To be removed from the newsletter, email hello@benjaminbrown.co and it will be done." }));
  }
  return htmlResponse(
    renderMessagePage({
      url: "/unsubscribe",
      title: "Unsubscribe",
      lede: q.has("x") ? "That did not go through. Please try the button again, or email hello@benjaminbrown.co." : "Press the button and this address is removed from The Handover. Nothing else will be sent.",
      body: `<form method="post" action="/api/unsubscribe?t=${token}"><button class="btn" type="submit">Unsubscribe</button></form>`,
    }),
  );
}
