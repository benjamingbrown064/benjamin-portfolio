// Serves the designed pages. The design is plain HTML, CSS and JS; scripts/import-design.py turns the
// design export into site/pages/*.html with {{tokens}} and <!--block:name--> markers, and this module
// fills them in from site/facts.json and the journal.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import facts from "../../site/facts.json";
import { JOURNAL, journalDate, type JournalEntry } from "./journal";

const SITE_URL = facts.siteUrl;
// The picture shown when a page is shared (public/og/site.jpg). Rename the file when it changes: apps that show
// link previews keep the old picture for as long as the address stays the same.
const SHARE_IMAGE = "/og/site.jpg";

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

/** A short fingerprint of a script in public/, added to its address so a changed script is fetched at once
 *  and is not held back by the browser's copy of the old one. */
const versions = new Map<string, string>();
function versioned(src: string): string {
  let v = versions.get(src);
  if (v === undefined) {
    try {
      v = createHash("md5").update(readFileSync(path.join(process.cwd(), "public", src))).digest("hex").slice(0, 10);
    } catch {
      v = "";
    }
    versions.set(src, v);
  }
  return v ? `${src}?v=${v}` : src;
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

/* Social links: small icons on the footer's brand row, right-aligned (links in site/facts.json). */
const SOCIAL_ICONS: Record<string, string> = {
  X: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.8 2h6.4l4.4 5.9L18.9 2Zm-1.1 18.2h1.7L8.3 3.7H6.5l11.3 16.5Z"/></svg>`,
  LinkedIn: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>`,
};
const SOCIAL_CSS = `<style>.foot>.w{position:relative}.foot-brand{font-size:40px}.foot-soc{position:absolute;right:var(--gut,20px);top:0;height:40px;display:flex;align-items:center;gap:10px}.foot-soc a{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--bone,#fff);color:var(--ink,#1d1d1f);box-shadow:inset 0 0 0 1px var(--line,rgba(0,0,0,.14));transition:background .2s,color .2s}.foot-soc a:hover{background:var(--ink,#1d1d1f);color:var(--bone,#fff)}.foot-soc svg{width:17px;height:17px}.foot-grid{margin-top:52px;padding-top:36px}.foot-grid h4{display:flex;align-items:center;gap:8px;margin-bottom:16px}.foot-grid h4::before{content:'';width:5px;height:5px;border-radius:50%;background:#f5391b;flex:none}.foot-grid .t{font-size:clamp(40px,4.4vw,60px);font-weight:700;letter-spacing:-.05em;line-height:1}.foot-grid a{padding:2px 0}.foot-grid .fs-n{display:block;color:var(--ink,#1d1d1f);font-weight:500;margin-bottom:4px}.foot-grid .fs-a{display:block;color:var(--mute,#6e6e73)}.foot-bot{justify-content:flex-start;margin-top:72px}.foot-bot nav{margin-left:auto}@media(max-width:600px){.foot-bot>span{flex-basis:100%}.foot-bot nav{margin-left:0}.foot-bot .top{margin-left:auto}}@media(max-width:800px){.foot-brand{font-size:26px}.foot-soc{height:26px;gap:8px}.foot-soc a{width:36px;height:36px}.foot-soc svg{width:15px;height:15px}}</style>`;
function footerSocial(): string {
  return ""; // shown as icons on the brand row instead (see socialIcons)
}
function socialIcons(): string {
  const links = facts.social as { label: string; url: string }[];
  if (!links.length) return "";
  return `<span class="foot-soc">${links
    .map((l) => `<a href="${esc(l.url)}" rel="me noopener" target="_blank" aria-label="${esc(l.label)}">${SOCIAL_ICONS[l.label] ?? esc(l.label)}</a>`)
    .join("")}</span>`;
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

/** Home page: the journal tile. It always shows the newest weekly roundup (The Handover), whose artwork carries
 *  its own lettering, so nothing is laid over it. With no roundup yet, the newest entry is shown with its title over a plain picture. */
function homeLatestJournal(): string {
  const roundup = JOURNAL.find((e) => e.category === "The Handover");
  if (roundup) {
    const label = `Latest in Notes: ${kind(roundup)}, ${roundup.title}, ${journalDate(roundup.date)}`;
    return `<a class="lt-c art" href="/journal/${roundup.slug}" aria-label="${esc(label)}" style="--art:url('${roundup.cover}')"><picture><source media="(max-width:760px)" srcset="${roundup.thumb}"><img src="${roundup.cover}" alt="" loading="lazy" decoding="async"></picture></a>`;
  }
  const e = JOURNAL[0];
  return `<a class="lt-c bw" href="/journal/${e.slug}"><img src="${e.tile ?? e.thumb}" alt="" loading="lazy" decoding="async"><span class="lt-k">Latest in Notes</span><span class="lt-b"><span class="lt-x"><span class="lt-t">${esc(e.title)}</span><span class="lt-s">${esc(kind(e))} · ${journalDate(e.date)}</span></span><span class="go" aria-hidden="true">${ARROW}</span></span></a>`;
}

/** Home page: the three-card journal section. Shown once there are three entries to fill it. */
function homeJournal(html: string): string {
  if (JOURNAL.length < 3) return block(html, "home_journal", null);
  const posts = JOURNAL.slice(0, 3)
    .map((e) => `<a class="post" href="/journal/${e.slug}"><div class="media img art${e.category === "The Handover" ? " lettered" : ""}"><img src="${e.thumb}" alt="" loading="lazy" decoding="async"><span class="tag"><span class="sq"></span>${esc(e.category)}</span></div><h3>${esc(e.title)}</h3><div class="ps"><span class="small">${journalDate(e.date)}</span><span class="small">${e.minutes} min read</span></div></a>`)
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
  // Google Tag Manager, on the live domain only so test and preview visits are not counted. Analytics cookies
  // stay off (Consent Mode "denied") until the visitor accepts in the banner (v13/site.js keeps the choice).
  const gtm = (facts as { gtm?: string }).gtm;
  const analytics = gtm
    ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}(function(){var c=null;try{c=localStorage.getItem("bb:consent")}catch(e){}gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:c==="granted"?"granted":"denied"});if(!/(^|\\.)benjaminbrown\\.co$/.test(location.hostname))return;dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});var j=document.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=${gtm}";document.head.appendChild(j)})();</script>`
    : "";
  const head = [
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
    opts.noindex ? `<meta name="robots" content="noindex">` : "",
    `<meta property="og:type" content="${opts.ogType ?? "website"}">`,
    `<meta property="og:site_name" content="${esc(facts.name)}">`,
    `<meta property="og:title" content="${title}">`,
    description ? `<meta property="og:description" content="${description}">` : "",
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${SITE_URL}${opts.image ?? SHARE_IMAGE}">`,
    opts.image ? "" : `<meta property="og:image:width" content="2400">\n<meta property="og:image:height" content="1260">\n<meta property="og:image:alt" content="Benjamin Brown. Agents that make teams superhuman.">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    description ? `<meta name="twitter:description" content="${description}">` : "",
    `<meta name="twitter:image" content="${SITE_URL}${opts.image ?? SHARE_IMAGE}">`,
    analytics,
  ]
    .filter(Boolean)
    .join("\n");
  // The assistant is on every page except the discovery questionnaire, which is a focused full-screen flow.
  const bodyEnd =
    `<script src="${versioned("/site/v13/site.js")}" defer></script>` +
    (name === "discovery"
      ? ""
      : // BotID tags the requests that start a call or send an email code; the call library itself loads only when a call starts.
        `\n<script src="${versioned("/site/v13/vendor/botid.js")}" defer></script>\n<script src="${versioned("/site/v13/toto.js")}" data-call="${versioned("/site/v13/vendor/call.mjs")}" defer></script>`);

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
  // Social icons on the footer's brand row.
  html = html.replace("Benjamin Brown<sup>®</sup></a>\n<div class=\"foot-grid\">", () => `Benjamin Brown<sup>®</sup></a>${socialIcons()}${SOCIAL_CSS}\n<div class="foot-grid">`);
  html = html.replace(/\{\{([a-z_.]+)\}\}/g, (m, key: string) => (key in tokens ? tokens[key] : m));
  // Hand-written scripts already in the page (for example the "What changes" dialog) get the same fingerprint.
  html = html.replace(/(<script src=")(\/site\/v1[0-9]\/[a-z0-9-]+\.js)(")/g, (_m, pre: string, src: string, post: string) => pre + versioned(src) + post);

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
<a class="ax-back rv" href="/journal"><span aria-hidden="true">←</span> Notes</a>
<span class="jx-meta rv"><span>${esc(kind(e))}</span><span>${journalDate(e.date)}</span><span>${e.minutes} min read</span></span>
<h1 class="ax-t rv">${esc(e.title)}</h1>
<p class="lede rv">${esc(e.excerpt)}</p>
</div></header>
<div class="w"><figure class="ax-cover art rv"><img src="${e.cover}" alt="${esc(e.coverAlt)}" decoding="async" fetchpriority="high"></figure></div>
<div class="w ax-w ax-body rv">
${body}
</div>
<div class="w ax-w"><div class="ax-by rv"><img src="/site/assets/ben-portrait.jpg" alt=""><div><b>Ben</b></div></div></div>
</article>
<section class="jx-sub grey" id="subscribe" data-screen-label="02 Subscribe"><div class="w rv">
<span class="eyebrow">Subscribe</span>
<h2 class="h-m">The Handover, in your inbox each week.</h2>
<p class="lede">The AI news worth your time, in plain English, with one thing to do about each. Unsubscribe in one click.</p>
<form class="jx-form" data-sub><input type="email" placeholder="you@company.com" aria-label="Email address" required><button class="btn" type="submit">Subscribe</button></form>
</div></section>
<section class="ax-next" data-screen-label="03 ${next ? "Next entry" : "Notes"}"><div class="w ax-w rv">
${next ? `<span class="eyebrow">Next entry</span><a class="ax-nx" href="/journal/${next.slug}"><span>${esc(next.title)}</span><span class="ar" aria-hidden="true">→</span></a>` : `<span class="eyebrow">Notes</span><a class="ax-nx" href="/journal"><span>All entries</span><span class="ar" aria-hidden="true">→</span></a>`}
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
