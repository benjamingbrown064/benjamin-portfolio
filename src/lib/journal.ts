// Journal entries. Each article is written by hand as site/content/journal/<slug>.html (the body only) with its
// pictures in public/media/journal/<slug>/ (not under public/site, which the design import rebuilds). List it here, newest first, and the journal index, the article page,
// the home page tile, the sitemap and the assistant all pick it up.
export type JournalEntry = {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. 2026-11-30
  category: "Essay" | "Notes" | "Field notes" | "Build log" | "The Handover";
  /** Shown beside the category, e.g. "No. 1" for a numbered series. */
  issue?: string;
  excerpt: string;
  minutes: number;
  /** 2:1 picture at the top of the article and on the journal index. */
  cover: string;
  coverAlt: string;
  /** 4:3 picture for the smaller cards. */
  thumb: string;
  /** A picture with no lettering in it. Only used on the home page tile when there is no weekly roundup to show there. */
  tile?: string;
};

const HANDOVER_1 = "/media/journal/the-handover-1";

export const JOURNAL: JournalEntry[] = [
  {
    slug: "the-handover-1",
    title: "Five AI updates worth knowing this week",
    date: "2026-11-13",
    category: "The Handover",
    issue: "No. 1",
    excerpt: "Five useful changes from 9 to 12 November, in plain English, plus one thing you can do about each of them this week.",
    minutes: 5,
    cover: `${HANDOVER_1}/cover.jpg`,
    coverAlt: "Ben Brown at his desk in a dark studio. Lettering reads: The Handover, weekly AI roundup, number 1, 13 November 2026.",
    thumb: `${HANDOVER_1}/thumb.jpg`,
    tile: `${HANDOVER_1}/portrait.jpg`,
  },
  {
    slug: "ai-answers-my-website",
    title: "I let an AI answer my website. Here is the fence I built around it.",
    date: "2026-11-12",
    category: "Essay",
    excerpt: "An AI assistant now answers visitors on my own site, by text and by voice. What it does, the seven rules around it, and what it has not proved yet.",
    minutes: 6,
    cover: "/media/journal/ai-answers-my-website/cover.jpg",
    coverAlt: "Benjamin Brown in a dark studio, talking into a phone on loudspeaker and smiling.",
    thumb: "/media/journal/ai-answers-my-website/thumb.jpg",
  },
  {
    slug: "enterprise-agent-small-company",
    title: "An enterprise agent a small company can afford to try",
    date: "2026-11-11",
    category: "Essay",
    excerpt: "What OpenClaw changed, where it stands today, and four ways a smaller company can put an agent to work. With a 30-day plan for trying one.",
    minutes: 7,
    cover: "/media/journal/enterprise-agent-small-company/cover.jpg",
    coverAlt: "A lobster rests one claw on a closed book on a steel kitchen counter at night.",
    thumb: "/media/journal/enterprise-agent-small-company/thumb.jpg",
  },
];

export function journalDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}
