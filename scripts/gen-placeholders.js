#!/usr/bin/env node
/**
 * Generates labelled placeholder images for all image slots.
 * Each placeholder is a dark grey rectangle with the filename as a label.
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PUBLIC = path.join(__dirname, "../public/images");
const BLOG = path.join(PUBLIC, "blog");

fs.mkdirSync(PUBLIC, { recursive: true });
fs.mkdirSync(BLOG, { recursive: true });

// App slugs
const APP_SLUGS = [
  "love-warranty",
  "wilbolaw",
  "taskbox",
  "security-app",
  "the-dms",
  "zebi",
  "hatsafe",
  "dealer-engine",
  "warranty-apps",
  "clarity-os",
  "dealer-next",
  "dgs",
  "support-app",
  "claims-scanner",
];

// Blog slugs
const BLOG_SLUGS = [
  { file: "build-in-public", label: "Why I Build In Public" },
  { file: "ai-builders", label: "AI Won't Replace Builders" },
  { file: "mvp-6-weeks", label: "From Idea to MVP in 6 Weeks" },
  { file: "tech-stack", label: "The Stack That Ships" },
  { file: "saas-failure", label: "Why Most SaaS Products Fail" },
  { file: "four-businesses", label: "Building Four Businesses" },
  { file: "discovery", label: "The Discovery Programme" },
  { file: "co-founder", label: "Technical Co-Founder" },
];

/**
 * Generate a placeholder SVG with a label, then convert to JPEG via Sharp.
 */
async function makePlaceholder({ outputPath, width, height, label, bgHex = "#1A1A1A", textHex = "#555555", tagHex = "#333333" }) {
  const shortLabel = label.length > 30 ? label.substring(0, 27) + "..." : label;
  const filename = path.basename(outputPath);

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgHex}"/>
  <!-- Grid lines -->
  <line x1="${width * 0.5}" y1="0" x2="${width * 0.5}" y2="${height}" stroke="${tagHex}" stroke-width="1" opacity="0.4"/>
  <line x1="0" y1="${height * 0.5}" x2="${width}" y2="${height * 0.5}" stroke="${tagHex}" stroke-width="1" opacity="0.4"/>
  <!-- Corner marks -->
  <rect x="20" y="20" width="30" height="2" fill="${tagHex}"/>
  <rect x="20" y="20" width="2" height="30" fill="${tagHex}"/>
  <rect x="${width - 50}" y="20" width="30" height="2" fill="${tagHex}"/>
  <rect x="${width - 22}" y="20" width="2" height="30" fill="${tagHex}"/>
  <rect x="20" y="${height - 22}" width="30" height="2" fill="${tagHex}"/>
  <rect x="20" y="${height - 50}" width="2" height="30" fill="${tagHex}"/>
  <rect x="${width - 50}" y="${height - 22}" width="30" height="2" fill="${tagHex}"/>
  <rect x="${width - 22}" y="${height - 50}" width="2" height="30" fill="${tagHex}"/>
  <!-- Dimensions label -->
  <text x="${width / 2}" y="${height / 2 - 32}" 
    font-family="monospace" font-size="13" fill="${textHex}" 
    text-anchor="middle" letter-spacing="2">${width} × ${height}</text>
  <!-- Main label -->
  <text x="${width / 2}" y="${height / 2 + 4}" 
    font-family="monospace" font-size="15" fill="#888888" 
    font-weight="bold" text-anchor="middle">${shortLabel}</text>
  <!-- Filename -->
  <text x="${width / 2}" y="${height / 2 + 32}" 
    font-family="monospace" font-size="11" fill="${textHex}" 
    text-anchor="middle" opacity="0.7">${filename}</text>
  <!-- PLACEHOLDER badge -->
  <rect x="${width / 2 - 55}" y="${height - 46}" width="110" height="22" fill="${tagHex}" rx="2"/>
  <text x="${width / 2}" y="${height - 31}" 
    font-family="monospace" font-size="10" fill="#666666" 
    text-anchor="middle" letter-spacing="3">PLACEHOLDER</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(outputPath);

  console.log(`✓ ${path.relative(process.cwd(), outputPath)}`);
}

async function main() {
  console.log("Generating placeholder images...\n");

  // Hero image — wide banner
  await makePlaceholder({
    outputPath: path.join(PUBLIC, "hero-placeholder.jpg"),
    width: 1600,
    height: 640,
    label: "Hero — Benjamin Brown portrait or workspace",
  });

  // App card thumbnails (homepage grid) — 800×500
  for (const slug of APP_SLUGS) {
    await makePlaceholder({
      outputPath: path.join(PUBLIC, `app-${slug}-placeholder.jpg`),
      width: 800,
      height: 500,
      label: `${slug} — homepage card`,
    });
  }

  // App case study heroes — 1600×800
  for (const slug of APP_SLUGS) {
    await makePlaceholder({
      outputPath: path.join(PUBLIC, `app-${slug}-hero.jpg`),
      width: 1600,
      height: 800,
      label: `${slug} — case study hero`,
      bgHex: "#111111",
      tagHex: "#2A2A2A",
      textHex: "#444444",
    });
  }

  // Blog featured images — 1200×630 (OG ratio)
  for (const { file, label } of BLOG_SLUGS) {
    await makePlaceholder({
      outputPath: path.join(BLOG, `${file}.jpg`),
      width: 1200,
      height: 630,
      label,
      bgHex: "#161616",
      tagHex: "#252525",
      textHex: "#444444",
    });
  }

  console.log("\nDone. Replace these files with real images when ready.");
  console.log("\nImage specs:");
  console.log("  hero-placeholder.jpg          — 1600×640  (hero banner)");
  console.log("  app-[slug]-placeholder.jpg    — 800×500   (homepage cards)");
  console.log("  app-[slug]-hero.jpg           — 1600×800  (case study heroes)");
  console.log("  blog/[name].jpg               — 1200×630  (blog featured, OG ratio)");
}

main().catch(console.error);
