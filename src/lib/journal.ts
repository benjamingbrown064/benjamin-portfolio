// Journal entries. Each article is added by hand as its own page; list it here so the journal index,
// the home page and the sitemap pick it up. Empty until the first article is published.
export type JournalEntry = {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. 2026-11-30
  category: "Essay" | "Notes" | "Field notes" | "Build log";
  excerpt: string;
};

export const JOURNAL: JournalEntry[] = [];
