import { htmlResponse, renderTextPage } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return htmlResponse(
    renderTextPage("privacy", {
      url: "/privacy",
      title: "Privacy",
      description: "What this site collects, why, how long it is kept and how to have it removed.",
      updated: "14 November 2026",
    }),
  );
}
