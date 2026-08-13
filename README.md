# benjaminbrown.co

Personal portfolio and journal for Benjamin Brown — founder, builder, operator.

Live at **[benjaminbrown.co](https://benjaminbrown.co)**.

## Stack

- **Next.js 16** (App Router, Turbopack) with **React 19.2**
- **Tailwind v4** for utilities, with the bulk of the design system hand-written in `src/app/globals.css`
- **framer-motion** for all scroll and pointer motion
- TypeScript throughout. No database, no CMS — content lives in typed files.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

There is no `.env` needed for local development. The newsletter route degrades
gracefully without credentials (see below).

## Where the content lives

All copy is typed data, not a CMS:

| File | Contains |
| --- | --- |
| `src/lib/projects.ts` | The nine case studies — copy, metrics, imagery, commercials |
| `src/lib/journal.ts` | Journal posts, including body sections |
| `src/components/*.tsx` | Homepage section copy, inline |

Routes are `/`, `/journal`, `/journal/[slug]` and `/work/[slug]`, all statically
generated. `robots.ts`, `sitemap.ts` and `opengraph-image.tsx` are Next file
conventions and are generated at build time.

## Motion

Motion is deliberately sparse — a handful of things move per viewport, not
everything. The primitives:

- `LineReveal` — headline lines slide up from behind their own baseline, staggered
- `Stagger` / `StaggerItem` — one scroll observer per grid, not one per child
- `Reveal` — general section entrance
- `HeroPortrait` — scroll-linked parallax on the hero image
- `Magnetic` — primary CTAs drift toward the cursor (two places only)
- `CountUp` — stat strip, seeded with the final value so SSR carries real numbers

All of them respect `prefers-reduced-motion`.

Route navigations crossfade via the View Transitions API
(`experimental.viewTransition`). Note that the shared-element morph between a
work card and its case-study hero is wired up but **dormant** — React 19.2
stable does not assign `view-transition-name`. The `<ViewTransition>` wrappers
must stay regardless: without one in the tree, Next does not start a transition
at all and the crossfade is lost.

## Newsletter

`POST /api/subscribe` adds a contact to a Resend audience. It requires:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_AUDIENCE_ID` | Target audience to add contacts to |

Both are set in Vercel. If either is missing the route returns a 503 and the
form shows a real error — it never reports success it did not achieve.

## Deploying

Pushing to `main` triggers a Vercel production deploy (~60–90s). Commits must be
authored with an email on the Vercel team or the build is rejected.

```bash
git push origin main
```
