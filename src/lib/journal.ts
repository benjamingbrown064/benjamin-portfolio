// Journal entries. Each article is written by hand as site/content/journal/<slug>.html (the body only) with its
// pictures in public/media/journal/<slug>/ (not under public/site, which the design import rebuilds). List it here, newest first, and the journal index, the article page,
// the home page tile, the sitemap and the assistant all pick it up.
export type JournalEntry = {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. 2026-11-30
  category: "Essay" | "Notes" | "Field notes" | "Build log" | "The Handover" | "The 1%" | "Journal";
  /** Show the cover and thumbnail in greyscale, like the journal photos (default: in colour, as artwork). */
  grey?: boolean;
  /** Difficulty tag under the meta line, e.g. "Beginner · No experience needed" (how-to articles). */
  level?: string;
  /** Shown beside the category, e.g. "No. 1" for a numbered series. */
  issue?: string;
  excerpt: string;
  minutes: number;
  /** 2:1 picture at the top of the article and on the journal index. */
  cover: string;
  coverAlt: string;
  /** Optional picture for the top of the article page only (no title lettering, since the page has its own title). Falls back to cover. */
  hero?: string;
  heroAlt?: string;
  /** Optional 4:3 version of the article-top picture for screens under 700px wide. */
  heroSmall?: string;
  /** Optional credit line under the article-top picture, e.g. "Image: Meta". */
  credit?: string;
  /** Optional picture for link previews (Open Graph). Falls back to cover. */
  og?: string;
  /** 4:3 picture for the smaller cards. */
  thumb: string;
  /** A picture with no lettering in it. Only used on the home page tile when there is no weekly roundup to show there. */
  tile?: string;
  /** Home "Latest journal entry" panel image (tall crop); falls back to cover. panelPos is its object-position. */
  panel?: string;
  panelPos?: string;
  /** Never shown as the home page "Latest journal entry" panel (Ben's call per article). */
  noFeature?: boolean;
  /** Extra class on the article element, e.g. "sc" for Ben's showcase layout (The 1% No. 2). */
  articleClass?: string;
  /** Extra stylesheets and scripts for this article only, under /site/v13/. */
  css?: string[];
  js?: string[];
};

const HANDOVER_1 = "/media/journal/the-handover-1";
const HANDOVER_2 = "/media/journal/the-handover-2";

const MUSE = "/media/journal/meta-muse-uk";

export const JOURNAL: JournalEntry[] = [
  {
    slug: "the-1-percent-training-videos",
    title: "The 1%: the training videos nobody films",
    date: "2026-11-25",
    category: "The 1%",
    issue: "No. 2",
    level: "Advanced · One agent, start to finish",
    excerpt: "164 narrated training videos for WarrantyOS, written, voiced, filmed and checked by one agent in 24 hours. Here’s how it works, step by step.",
    minutes: 8,
    cover: "/media/journal/the-1-percent-training-videos/hero.jpg",
    coverAlt: "A claims handler on a leather sofa in a sunlit office, watching a WarrantyOS training video, Deciding a claim, on her tablet.",
    thumb: "/media/journal/the-1-percent-training-videos/thumb.jpg",
    noFeature: true, // Ben, 26 Nov: not the home page feature
    articleClass: "sc",
    css: ["/site/v13/showcase.css"],
    js: ["/site/v13/gallery.js", "/site/v13/showcase.js"],
  },
  {
    slug: "meta-muse-uk",
    title: "The AI agent for everyone else",
    date: "2026-11-24",
    category: "Journal",
    level: "Beginner · No experience needed",
    excerpt: "Meta’s Muse landed in the UK this week. I’ve been using it in the US since September. Here’s why it’s different, and five jobs to give it.",
    minutes: 5,
    cover: `${MUSE}/hero-2x1.jpg`,
    coverAlt: "Jolly the Muse mascot holding an umbrella",
    heroSmall: `${MUSE}/hero-4x3.jpg`,
    credit: "Image: Meta",
    og: `${MUSE}/hero-16x9.jpg`,
    thumb: `${MUSE}/hero-4x3.jpg`,
    panel: `${MUSE}/panel.webp`, // Ben's crop, Benjamin (30).zip, 26 Nov 2026
    panelPos: "50% 30%",
  },
  {
    slug: "the-handover-2",
    title: "This week, AI was given some jobs",
    date: "2026-11-20",
    category: "The Handover",
    issue: "No. 2",
    excerpt: "Five things that changed in AI from 17 to 20 November, in plain English. And one thing to do about each this week.",
    minutes: 5,
    cover: `${HANDOVER_2}/cover.jpg`,
    coverAlt: "Ben Brown at a desk in a dark studio, chin resting on his hand. Lettering beside him on black with an orange glow reads: Ben Brown · Journal. Weekly AI roundup. The Handover. No. 2. 20 Nov 2026.",
    thumb: `${HANDOVER_2}/thumb.jpg`,
  },
  {
    slug: "the-1-percent-email",
    title: "The 1%: teach Claude to write your emails like you",
    date: "2026-11-18",
    category: "The 1%",
    issue: "No. 1",
    level: "Beginner · No experience needed",
    excerpt: "Don’t rebuild your business with AI. Get 1% better at one thing you do every day. This week, that’s email.",
    minutes: 7,
    cover: "/media/journal/the-1-percent-email/cover-2.jpg",
    coverAlt: "A woman at a laptop in warm window light. Beside her, a 12-second voice note (Tell Sarah we’re two weeks late, new date’s the 4th) becomes a short email drafted by Claude in her voice. Lettering: The 1%. Email that sounds like you. No. 1, 18 Nov 2026",
    hero: "/media/journal/the-1-percent-email/hero.jpg",
    heroAlt: "A woman at a laptop in warm window light. A 12-second voice note beside her becomes a short email drafted by Claude in her voice: Hi Sarah, straight answer: we’re two weeks behind. New date is Friday 4 December, and I’ll run your team’s training myself to make up for it.",
    thumb: "/media/journal/the-1-percent-email/thumb-3.jpg",
  },
  {
    slug: "ai-answers-my-website",
    title: "I let an AI answer my website. Here’s the fence I built round it.",
    date: "2026-11-15",
    category: "Notes",
    excerpt: "An AI now answers people on my site, by text and by voice. What it does, the seven rules I put round it, and what it hasn’t proved yet.",
    minutes: 6,
    cover: "/media/journal/ai-answers-my-website/cover.jpg",
    coverAlt: "Benjamin Brown in a dark studio with framed sunset prints, phone in both hands, smiling and looking towards the window.",
    thumb: "/media/journal/ai-answers-my-website/thumb.jpg",
  },
  {
    slug: "enterprise-agent-small-company",
    title: "An enterprise agent a small company can afford to try",
    date: "2026-11-14",
    category: "Notes",
    excerpt: "What OpenClaw changed, where it is now, and four ways a smaller company can put an agent to work. With a 30-day plan for trying one.",
    minutes: 7,
    cover: "/media/journal/enterprise-agent-small-company/cover.jpg",
    coverAlt: "A lobster rests one claw on a closed book on a steel kitchen counter at night.",
    thumb: "/media/journal/enterprise-agent-small-company/thumb.jpg",
  },
  {
    slug: "the-handover-1",
    title: "This week, AI turned up to the meeting",
    date: "2026-11-13",
    category: "The Handover",
    issue: "No. 1",
    excerpt: "Five things that changed in AI from 9 to 12 November, in plain English. And one thing to do about each this week.",
    minutes: 4,
    cover: `${HANDOVER_1}/cover-2.jpg`,
    coverAlt: "Ben Brown at a desk in a dark studio, hands open mid-explanation. Lettering beside him on black with an orange glow reads: Ben Brown · Journal. Weekly AI roundup. The Handover. No. 1. 13 Nov 2026.",
    thumb: `${HANDOVER_1}/thumb-2.jpg`,
    tile: `${HANDOVER_1}/portrait.jpg`,
  },
];

export function journalDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}
