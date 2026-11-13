// Serves the designed pages. The design is plain HTML, CSS and JS; scripts/import-design.py turns the
// design export into site/pages/*.html with {{tokens}} and <!--block:name--> markers, and this module
// fills them in from site/facts.json and the journal.
import { readFileSync } from "node:fs";
import path from "node:path";
import facts from "../../site/facts.json";
import { JOURNAL, journalDate, type JournalEntry } from "./journal";

const SITE_URL = facts.siteUrl;

export type PageOptions = {
  /** Path of the page on the site, used for the canonical address. */
  url: string;
  title?: string;
  description?: string;
  /** Replace <main>…</main> with this markup (used by the plain text pages). */
  main?: string;
  noindex?: boolean;
  /** Picture for link previews; the site-wide one is used when this is left out. */
  image?: string;
  /** "article" for journal entries. */
  ogType?: string;
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function readPage(name: string): string {
  return readFileSync(path.join(process.cwd(), "site", "pages", `${name}.html`), "utf8");
}

function readContent(name: string): string {
  return readFileSync(path.join(process.cwd(), "site", "content", `${name}.html`), "utf8");
}

/** Keep, drop or replace a <!--block:name-->…<!--/block:name--> region. */
function block(html: string, name: string, replacement: string | null | undefined): string {
  const re = new RegExp(`<!--block:${name}-->([\\s\\S]*?)<!--/block:${name}-->`, "g");
  return html.replace(re, (_m, inner: string) => (replacement === undefined ? inner : (replacement ?? "")));
}

function footerSocial(): string {
  const links = facts.social as { label: string; url: string }[];
  if (!links.length) return "";
  return `<div><h4>Elsewhere</h4>${links
    .map((l) => `<a href="${esc(l.url)}" rel="me noopener" target="_blank">${esc(l.label)}</a>`)
    .join("")}</div>`;
}

/* ---------- journal ---------- */
const ARROW = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>`;

function kind(e: JournalEntry): string {
  return e.issue ? `${e.category} · ${e.issue}` : e.category;
}

function meta(e: JournalEntry, withTime: boolean): string {
  return `<span class="jx-meta"><span>${esc(kind(e))}</span><span>${journalDate(e.date)}</span>${withTime ? `<span>${e.minutes} min read</span>` : ""}</span>`;
}

/** The journal index: the newest entry large, the next four as cards, anything older as a list. */
function journalIndex(): string {
  const [first, ...rest] = JOURNAL;
  const cards = rest.slice(0, 4);
  const older = rest.slice(4);
  const cats = Array.from(new Set(older.map((e) => e.category)));
  let html = `<section class="jx-sec" data-screen-label="02 Latest entry"><div class="w">
<a class="jx-feat rv" href="/journal/${first.slug}"><div class="jx-cover art"><img src="${first.cover}" alt="${esc(first.coverAlt)}" decoding="async"></div>
<div class="jx-ft">${meta(first, true)}<h2 class="h-m">${esc(first.title)}</h2><p>${esc(first.excerpt)}</p><span class="lnk">Read the entry</span></div></a>`;
  if (cards.length) {
    html += `<div class="jx-thumbs rv-g">${cards
      .map((e) => `<a class="jx-th" href="/journal/${e.slug}"><div class="jx-cover art"><img src="${e.thumb}" alt="" loading="lazy" decoding="async"></div>${meta(e, false)}<h3>${esc(e.title)}</h3></a>`)
      .join("")}</div>`;
  }
  html += `</div></section>`;
  if (older.length) {
    html += `<section class="jx-sec" id="entries" data-screen-label="03 Earlier entries"><div class="w"><div class="jx-bar rv"><h2 class="h-s">Earlier entries</h2>
<div class="jx-filters" role="group" aria-label="Filter entries by category"><button type="button" data-cat="all" aria-pressed="true">All</button>${cats
      .map((c) => `<button type="button" data-cat="${esc(c)}" aria-pressed="false">${esc(c)}</button>`)
      .join("")}</div></div>
<ul class="jx-list rv-g">${older
      .map((e) => `<li data-cat="${esc(e.category)}"><a class="jx-row" href="/journal/${e.slug}"><span class="d">${journalDate(e.date)}</span><span class="t">${esc(e.title)}</span><span class="c">${esc(kind(e))}</span><span class="ar" aria-hidden="true">→</span></a></li>`)
      .join("")}</ul><p class="jx-empty" hidden>Nothing filed under that yet.</p></div></section>`;
  }
  return html;
}

/** Home page: the "Latest journal entry" tile. */
function homeLatestJournal(): string {
  const e = JOURNAL[0];
  return `<a class="lt-c bw" href="/journal/${e.slug}"><img src="${e.tile}" alt="" loading="lazy" decoding="async"><span class="lt-k">Latest journal entry</span><span class="lt-b"><span class="lt-x"><span class="lt-t">${esc(e.title)}</span><span class="lt-s">${esc(kind(e))} · ${journalDate(e.date)}</span></span><span class="go" aria-hidden="true">${ARROW}</span></span></a>`;
}

/** Home page: the three-card journal section. Shown once there are three entries to fill it. */
function homeJournal(html: string): string {
  if (JOURNAL.length < 3) return block(html, "home_journal", null);
  const posts = JOURNAL.slice(0, 3)
    .map((e) => `<a class="post" href="/journal/${e.slug}"><div class="media img art"><img src="${e.thumb}" alt="" loading="lazy" decoding="async"><span class="tag"><span class="sq"></span>${esc(e.category)}</span></div><h3>${esc(e.title)}</h3><div class="ps"><span class="small">${journalDate(e.date)}</span><span class="small">${e.minutes} min read</span></div></a>`)
    .join("");
  return block(html, "home_journal", undefined).replace(/<div class="posts rv-g">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, () => `<div class="posts rv-g">${posts}</div></div></section>`);
}

const JOURNAL_EMPTY = `<section class="jx-sec" data-screen-label="02 Entries"><div class="w"><p class="lede rv">The first entries are being written. Subscribe below and the first one comes to you.</p></div></section>`;

export function renderPage(name: string, opts: PageOptions): string {
  let html = readPage(name);

  if (opts.main !== undefined) {
    html = html.replace(/<main>[\s\S]*<\/main>/, () => `<main>${opts.main}</main>`);
  }
  if (opts.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(opts.title!)}</title>`);
  }
  if (opts.description) {
    html = html.replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${esc(opts.description!)}">`);
  }

  // Journal: nothing invented. Until real entries exist the home page drops its journal blocks and
  // the journal page shows an empty state.
  const hasJournal = JOURNAL.length > 0;
  if (html.includes("<!--block:home_journal-->")) html = hasJournal ? homeJournal(html) : block(html, "home_journal", null);
  html = block(html, "home_latest_journal", hasJournal ? homeLatestJournal() : null);
  html = block(html, "journal_entries", hasJournal ? journalIndex() : JOURNAL_EMPTY);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? facts.name).trim();
  const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1] ?? "";
  const canonical = SITE_URL + (opts.url === "/" ? "" : opts.url);
  const head = [
    `<link rel="canonical" href="${canonical}">`,
    opts.noindex ? `<meta name="robots" content="noindex">` : "",
    `<meta property="og:type" content="${opts.ogType ?? "website"}">`,
    `<meta property="og:site_name" content="${esc(facts.name)}">`,
    `<meta property="og:title" content="${title}">`,
    description ? `<meta property="og:description" content="${description}">` : "",
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${opts.image ? SITE_URL + opts.image : `${SITE_URL}/opengraph-image`}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ]
    .filter(Boolean)
    .join("\n");
  // The assistant is on every page except the discovery questionnaire, which is a focused full-screen flow.
  const bodyEnd =
    `<script src="/site/v13/site.js" defer></script>` + (name === "discovery" ? "" : `\n<script src="/site/v13/toto.js" defer></script>`);

  const tokens: Record<string, string> = {
    head,
    body_end: bodyEnd,
    footer_social: footerSocial(),
    availability: facts.availability,
  };
  for (const [k, v] of Object.entries(facts.prices)) {
    tokens[`price.${k}.gbp`] = v.gbp;
    tokens[`price.${k}.usd`] = v.usd;
  }
  html = html.replace(/\{\{([a-z_.]+)\}\}/g, (m, key: string) => (key in tokens ? tokens[key] : m));

  const left = html.match(/\{\{[a-z_.]+\}\}/);
  if (left) throw new Error(`Unfilled token ${left[0]} in page "${name}"`);
  return html;
}

export function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/** A plain text page (privacy, terms) in the article layout. */
export function renderTextPage(file: string, opts: { url: string; title: string; description: string; updated: string }): string {
  const body = readContent(file);
  const main = `
<article class="ax" data-screen-label="01 ${esc(opts.title)}">
<header class="ax-head"><div class="w ax-w">
<span class="jx-meta rv"><span>Last updated ${esc(opts.updated)}</span></span>
<h1 class="ax-t rv">${esc(opts.title)}</h1>
<p class="lede rv">${esc(opts.description)}</p>
</div></header>
<div class="w ax-w ax-body rv">
${body}
</div>
</article>
`;
  return renderPage("journal-article", {
    url: opts.url,
    title: `${opts.title} · Benjamin Brown®`,
    description: opts.description,
    main,
  });
}

/** A journal entry: its body comes from site/content/journal/<slug>.html. Returns null for an unknown slug. */
export function renderJournalEntry(slug: string): string | null {
  const i = JOURNAL.findIndex((e) => e.slug === slug);
  if (i < 0) return null;
  const e = JOURNAL[i];
  const next = JOURNAL[i + 1]; // the entry before this one in time
  const body = readContent(`journal/${e.slug}`);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: e.title,
    description: e.excerpt,
    datePublished: e.date,
    image: SITE_URL + e.cover,
    author: { "@type": "Person", name: facts.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/journal/${e.slug}`,
  };
  const main = `
<article class="ax" data-screen-label="01 Article">
<header class="ax-head"><div class="w ax-w">
<a class="ax-back rv" href="/journal"><span aria-hidden="true">←</span> Journal</a>
<span class="jx-meta rv"><span>${esc(kind(e))}</span><span>${journalDate(e.date)}</span><span>${e.minutes} min read</span></span>
<h1 class="ax-t rv">${esc(e.title)}</h1>
<p class="lede rv">${esc(e.excerpt)}</p>
</div></header>
<div class="w"><figure class="ax-cover art rv"><img src="${e.cover}" alt="${esc(e.coverAlt)}" decoding="async" fetchpriority="high"></figure></div>
<div class="w ax-w ax-body rv">
${body}
</div>
<div class="w ax-w"><div class="ax-by rv"><img src="/site/assets/ben-portrait.jpg" alt=""><div><b>Ben Brown</b><span>Founder, operator and full-stack builder</span></div></div></div>
</article>
<section class="ax-next" data-screen-label="02 ${next ? "Next entry" : "Journal"}"><div class="w ax-w rv">
${next ? `<span class="eyebrow">Next entry</span><a class="ax-nx" href="/journal/${next.slug}"><span>${esc(next.title)}</span><span class="ar" aria-hidden="true">→</span></a>` : `<span class="eyebrow">Journal</span><a class="ax-nx" href="/journal"><span>All entries</span><span class="ar" aria-hidden="true">→</span></a>`}
${next ? `<a class="lnk" href="/journal">All entries</a>` : ""}
</div></section>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
`;
  return renderPage("journal-article", {
    url: `/journal/${e.slug}`,
    title: `${e.title} · Benjamin Brown®`,
    description: e.excerpt,
    main,
    image: e.cover,
    ogType: "article",
  });
}
