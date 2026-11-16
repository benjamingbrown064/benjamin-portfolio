// What is on each page of the site, as plain text, so Toto can talk about the pages the visitor is looking at
// instead of only the short fact sheet. Read from the same HTML the pages are served from, so it never drifts.
// Sections that have an id are marked, so Toto can point the visitor at one (see show_section).
import { readFileSync } from "node:fs";
import path from "node:path";

const PAGES: { file: string; path: string; name: string }[] = [
  { file: "home", path: "/", name: "Home page" },
  { file: "work", path: "/work", name: "Work (all projects)" },
  { file: "work-taskbox", path: "/work/taskbox", name: "Taskbox case study" },
  { file: "work-warrantyos", path: "/work/warrantyos", name: "WarrantyOS case study" },
  { file: "work-govscape", path: "/work/govscape", name: "Govscape case study" },
  { file: "method", path: "/method", name: "The method" },
  { file: "contact", path: "/contact", name: "Let's talk" },
];

function clean(s: string): string {
  return s
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function pageText(html: string): string {
  let s = html.replace(/[\s\S]*?<body[^>]*>/i, "");
  s = s.replace(/<(script|style|svg|nav|footer|dialog|template|noscript)\b[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");
  s = s.replace(/<header class="nav[\s\S]*?<\/header>/i, " ");
  // Mark sections that can be shown, then turn structure into plain lines.
  s = s.replace(/<section\b[^>]*\bid="([a-z0-9-]+)"[^>]*>/gi, "\n\n[section id=$1]\n");
  s = s.replace(/<h[1-3][^>]*>/gi, "\n## ").replace(/<\/h[1-3]>/gi, "\n");
  s = s.replace(/<li[^>]*>/gi, "\n- ").replace(/<(p|div|br|tr|dd|dt|figcaption)\b[^>]*>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  return clean(s).split("\n").filter((l, i, a) => l !== a[i - 1]).join("\n");
}

let cache: string | null = null;
/** Every page's text in one block, for the cached part of Toto's prompt. */
export function siteText(): string {
  if (cache !== null) return cache;
  const parts: string[] = [];
  for (const p of PAGES) {
    try {
      const html = readFileSync(path.join(process.cwd(), "site", "pages", `${p.file}.html`), "utf8");
      parts.push(`=== PAGE ${p.path} (${p.name}) ===\n${pageText(html).slice(0, 18000)}`);
    } catch {
      // a missing page is left out
    }
  }
  cache = parts.join("\n\n");
  return cache;
}

/** The section ids marked on a page, so a section Toto names can be checked before it reaches the browser. */
export function sectionIds(pagePath: string): Set<string> {
  const text = siteText();
  const start = text.indexOf(`=== PAGE ${pagePath} (`);
  if (start < 0) return new Set();
  const end = text.indexOf("\n=== PAGE ", start + 1);
  const block = text.slice(start, end < 0 ? undefined : end);
  return new Set([...block.matchAll(/\[section id=([a-z0-9-]+)\]/g)].map((m) => m[1]));
}
