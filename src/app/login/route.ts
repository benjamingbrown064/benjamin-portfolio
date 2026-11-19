import { htmlResponse, renderPage } from "@/lib/site";

export const dynamic = "force-static";

// Client sign-in page (19 Nov 2026). Front end only for now: the form checks fields and shows its states,
// but nothing is sent anywhere yet. The page is noindex and is not in the sitemap.
export function GET() {
  return htmlResponse(renderPage("login", { url: "/login" }));
}
