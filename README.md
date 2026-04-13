# Benjamin Brown — Personal Portfolio Website

> Editorial magazine-inspired personal portfolio for Benjamin Brown, founder behind One Beyond. Built with Next.js 16, Tailwind CSS v4, and Framer Motion.

**Live site:** [benjaminbrown.co](https://benjaminbrown.co)  
**Stack:** Next.js 16.2 · TypeScript · Tailwind CSS v4 · Framer Motion · MDX · Vercel

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, PageTransition
│   ├── page.tsx                # Homepage with all 11 sections
│   ├── globals.css             # Tailwind v4 @theme tokens + base styles
│   ├── opengraph-image.tsx     # Edge OG image generation
│   ├── blog/
│   │   ├── page.tsx            # Blog listing — /blog
│   │   └── [slug]/page.tsx     # Individual post — /blog/[slug]
│   └── apps/
│       └── [slug]/page.tsx     # App case study — /apps/[slug]
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Sticky nav, scroll blur, mobile hamburger
│   │   └── Footer.tsx          # Black footer, nav + social links
│   ├── sections/               # 11 homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── FeaturedApps.tsx
│   │   ├── WhySection.tsx
│   │   ├── AllAppsGrid.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── SectionHeader.tsx   # Editorial number + category tag
│       ├── MotionWrapper.tsx   # FadeInUp, StaggerContainer, ClipReveal
│       ├── CountUp.tsx         # Animated count-up on scroll
│       ├── PageTransition.tsx  # AnimatePresence route transitions
│       ├── MDXComponents.tsx   # Custom MDX styled components
│       └── JsonLd.tsx          # JSON-LD structured data
├── content/
│   ├── apps/index.ts           # 15 app case study data objects
│   └── blog/                   # .mdx blog posts (8 seed posts)
├── lib/
│   ├── animations.ts           # Framer Motion variants
│   ├── constants.ts            # Site data, nav, services, FAQs, testimonials
│   ├── blog.ts                 # Blog utility functions (MDX parsing)
│   └── utils.ts                # cn(), sectionNum()
└── next-sitemap.config.js      # Sitemap + robots.txt configuration
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2025-05-01"
category: "BUILDING"   # BUILDING | AI | STRATEGY | LESSONS
excerpt: "One-sentence description for cards and meta."
featuredImage: "/images/blog/your-image.jpg"
tags: ["building", "founder"]
readTime: 6
---

Your post content here...
```

The post will automatically appear in the blog listing and generate a static page at `/blog/your-post-title`.

---

## Adding App Case Studies

Add a new entry to `content/apps/index.ts`:

```typescript
{
  slug: "your-app",
  name: "Your App",
  category: "SaaS",
  year: "2025",
  status: "Live",          // "Live" | "In Build" | "MVP"
  tagline: "Short tagline for cards.",
  overview: "Longer overview paragraph...",
  problem: "The problem it solves...",
  solution: "How it solves it...",
  features: [
    { title: "Feature One", description: "Description." },
  ],
  techStack: ["Next.js", "TypeScript", "Supabase"],
  metrics: ["Metric one", "Metric two"],
  type: "detailed",        // "detailed" | "brief"
}
```

---

## Content Updates

| Content | Location |
|---------|----------|
| Site metadata | `lib/constants.ts` → `SITE` |
| Navigation links | `lib/constants.ts` → `NAV_LINKS` |
| Services | `lib/constants.ts` → `SERVICES` |
| Process steps | `lib/constants.ts` → `PROCESS_STEPS` |
| FAQs | `lib/constants.ts` → `FAQS` |
| Testimonials | `lib/constants.ts` → `TESTIMONIALS` |
| Hero stats | `lib/constants.ts` → `HERO_STATS` |
| Tech marquee | `lib/constants.ts` → `TECH_STACK` |

---

## Images

Replace placeholder images at `/public/images/`:

| File | Usage |
|------|-------|
| `hero-placeholder.jpg` | Hero section |
| `app-[slug]-placeholder.jpg` | App cards on homepage |
| `app-[slug]-hero.jpg` | App case study hero |
| `blog/[slug].jpg` | Blog post featured images |

All images use `next/image` with `fill` sizing. Recommended: 1600×900px for hero, 800×500px for cards.

---

## Environment Variables

```bash
# For deployment
SITE_URL=https://benjaminbrown.co
```

Set these in your Vercel project settings.

---

## Deployment

### Vercel (recommended)

1. Push repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set `SITE_URL` environment variable
4. Deploy

Sitemap and robots.txt are generated automatically at build time via `next-sitemap`.

---

## Design System

| Token | Value |
|-------|-------|
| Font — Serif | Playfair Display (via `--font-playfair`) |
| Font — Sans | Inter (via `--font-inter`) |
| Black | `#000000` |
| White | `#FFFFFF` |
| Warm gray scale | `warm-50` → `warm-900` |
| Brand orange | `#FF4500` (period in ONE BEYOND.) |

---

Built by [Doug](https://zebi.app) · One Beyond · 2025
