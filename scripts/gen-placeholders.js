#!/usr/bin/env node
/**
 * Generates clearly visible labelled placeholder images.
 * Light grey background with dark text — easy to see while building.
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PUBLIC = path.join(__dirname, "../public/images");
const BLOG = path.join(PUBLIC, "blog");

fs.mkdirSync(PUBLIC, { recursive: true });
fs.mkdirSync(BLOG, { recursive: true });

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

async function makePlaceholder({ outputPath, width, height, label, category = "" }) {
  const filename = path.basename(outputPath);
  const shortLabel = label.length > 36 ? label.substring(0, 33) + "..." : label;
  const fontSize = width > 1000 ? 28 : 20;
  const catSize = width > 1000 ? 16 : 12;
  const dimSize = width > 1000 ? 14 : 11;

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background — light warm grey, highly visible -->
  <rect width="${width}" height="${height}" fill="#D8D8D3"/>

  <!-- Subtle checkerboard-style grid to indicate it's a placeholder -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#grid)" opacity="0.18"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#BFBFBA"/>
      <rect x="20" y="20" width="20" height="20" fill="#BFBFBA"/>
    </pattern>
  </defs>

  <!-- Center white card -->
  <rect x="${width / 2 - 200}" y="${height / 2 - 70}" width="400" height="140" rx="4" fill="white" opacity="0.85"/>

  <!-- Category pill -->
  <rect x="${width / 2 - 70}" y="${height / 2 - 62}" width="140" height="24" rx="3" fill="#333333"/>
  <text x="${width / 2}" y="${height / 2 - 46}"
    font-family="monospace" font-size="${catSize}" fill="white"
    text-anchor="middle" letter-spacing="3" font-weight="bold">${category || "PLACEHOLDER"}</text>

  <!-- Main label -->
  <text x="${width / 2}" y="${height / 2 + 4}"
    font-family="monospace" font-size="${fontSize}" fill="#111111"
    font-weight="bold" text-anchor="middle">${shortLabel}</text>

  <!-- Filename -->
  <text x="${width / 2}" y="${height / 2 + 34}"
    font-family="monospace" font-size="${dimSize}" fill="#666666"
    text-anchor="middle">${filename}</text>

  <!-- Dimensions badge -->
  <rect x="${width / 2 - 55}" y="${height / 2 + 48}" width="110" height="20" rx="2" fill="#E8E8E3"/>
  <text x="${width / 2}" y="${height / 2 + 62}"
    font-family="monospace" font-size="11" fill="#666666"
    text-anchor="middle">${width}×${height}</text>

  <!-- Corner markers -->
  <line x1="0" y1="0" x2="60" y2="0" stroke="#999999" stroke-width="2"/>
  <line x1="0" y1="0" x2="0" y2="60" stroke="#999999" stroke-width="2"/>
  <line x1="${width}" y1="0" x2="${width - 60}" y2="0" stroke="#999999" stroke-width="2"/>
  <line x1="${width}" y1="0" x2="${width}" y2="60" stroke="#999999" stroke-width="2"/>
  <line x1="0" y1="${height}" x2="60" y2="${height}" stroke="#999999" stroke-width="2"/>
  <line x1="0" y1="${height}" x2="0" y2="${height - 60}" stroke="#999999" stroke-width="2"/>
  <line x1="${width}" y1="${height}" x2="${width - 60}" y2="${height}" stroke="#999999" stroke-width="2"/>
  <line x1="${width}" y1="${height}" x2="${width}" y2="${height - 60}" stroke="#999999" stroke-width="2"/>
</svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(`✓ ${path.relative(process.cwd(), outputPath)}`);
}

async function main() {
  console.log("Generating placeholder images (light, clearly visible)...\n");

  await makePlaceholder({
    outputPath: path.join(PUBLIC, "hero-placeholder.jpg"),
    width: 1600,
    height: 640,
    label: "Hero Portrait / Workspace Photo",
    category: "HERO IMAGE",
  });

  for (const slug of APP_SLUGS) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    await makePlaceholder({
      outputPath: path.join(PUBLIC, `app-${slug}-placeholder.jpg`),
      width: 800,
      height: 500,
      label: name,
      category: "APP CARD",
    });
  }

  for (const slug of APP_SLUGS) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    await makePlaceholder({
      outputPath: path.join(PUBLIC, `app-${slug}-hero.jpg`),
      width: 1600,
      height: 800,
      label: name,
      category: "CASE STUDY HERO",
    });
  }

  for (const { file, label } of BLOG_SLUGS) {
    await makePlaceholder({
      outputPath: path.join(BLOG, `${file}.jpg`),
      width: 1200,
      height: 630,
      label,
      category: "BLOG IMAGE",
    });
  }

  console.log("\nDone — all placeholders are light grey, clearly labelled.");
}

main().catch(console.error);
