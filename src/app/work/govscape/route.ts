import { htmlResponse, renderPage } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return htmlResponse(renderPage("work-govscape", { url: "/work/govscape" }));
}
