import { htmlResponse, renderTextPage } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return htmlResponse(
    renderTextPage("terms", {
      url: "/terms",
      title: "Terms",
      description: "The terms for using this site, its assistant and its forms.",
      updated: "12 November 2026",
    }),
  );
}
