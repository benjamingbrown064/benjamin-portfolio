import { JOURNAL } from "@/lib/journal";
import { htmlResponse, renderJournalEntry, renderPage } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNAL.map((e) => ({ slug: e.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const html = renderJournalEntry(slug);
  return html ? htmlResponse(html) : htmlResponse(renderPage("journal", { url: "/journal" }), 404);
}
