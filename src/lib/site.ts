// Serves the designed pages. The design is plain HTML, CSS and JS; scripts/import-design.py turns the
// design export into site/pages/*.html with {{tokens}} and <!--block:name--> markers, and this module
// fills them in from site/facts.json and the journal.
import { readFileSync } from "node:fs";
import path from "node:path";
import facts from "../../site/facts.json";
import { JOURNAL } from "./journal";

const SITE_URL = facts.siteUrl;

export type PageOptions = {
  /** Path of the page on the site, used for the canonical address. */
  url: string;
  title?: string;
  description?: string;
  /** Replace <main>…</main> with this markup (used by the plain text pages). */
  main?: string;
  noindex?: boolean;
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
  html = block(html, "home_journal", hasJournal ? undefined : null);
  html = block(html, "home_latest_journal", hasJournal ? undefined : null);
  html = block(html, "journal_entries", hasJournal ? undefined : JOURNAL_EMPTY);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? facts.name).trim();
  const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1] ?? "";
  const canonical = SITE_URL + (opts.url === "/" ? "" : opts.url);
  const head = [
    `<link rel="canonical" href="${canonical}">`,
    opts.noindex ? `<meta name="robots" content="noindex">` : "",
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(facts.name)}">`,
    `<meta property="og:title" content="${title}">`,
    description ? `<meta property="og:description" content="${description}">` : "",
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${SITE_URL}/opengraph-image">`,
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
