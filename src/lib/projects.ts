export type ProjectStatus = "live" | "beta" | "dev";

export type ProjectCard = {
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
  coverCap: string;
  status: ProjectStatus;
  statusLabel: string;
  desc: string;
  meta: string;
};

export type ProjectCaseStudy = ProjectCard & {
  descriptor: string;
  cta: { label: string; href: string };
  pageMeta: {
    scope: string;
    client: string;
    duration: string;
    year: string;
    role: string;
  };
  heroCaption: [string, string];
  challenge: { h: string; p: string };
  solution: { h: string; p: string };
  stack: { k: string; v: string[] }[];
  process: { n: string; d: string }[];
  result: { h: string; p: string };
  metrics: { n: string; l: string }[];
  commercialsCopy: string;
  comm: { model: string; status: string; revenue: string; ownership: string };
  quote: string;
  attr: { name: string; role: string };
};

export const PROJECT_ORDER: string[] = [
  "warrantyos",
  "taskbox",
  "govscape",
  "hatsafe",
  "dealer-engine",
  "wilbolaw",
];

export const PROJECTS: Record<string, ProjectCaseStudy> = {
  warrantyos: {
    slug: "warrantyos",
    title: "WarrantyOS",
    cover: "/assets/warrantyos.jpg",
    coverAlt: "WarrantyOS dashboard on MacBook in a classic car workshop",
    coverCap: "WarrantyOS · operator console",
    status: "live",
    statusLabel: "Live",
    desc: "Consumer vehicle warranty platform — pricing engine, policy flow, operator console.",
    meta: "Automotive · SaaS",
    descriptor:
      "We built a warranty platform that protects 100,000+ UK motorists and runs the claims engine behind it.",
    cta: { label: "Live preview", href: "https://warrantyos.example" },
    pageMeta: {
      scope: "SaaS Platform",
      client: "WarrantyOS",
      duration: "Ongoing · 2024 →",
      year: "2026",
      role: "Co-founder · Design & Build",
    },
    heroCaption: ["WarrantyOS — platform cover, 2026", "Editorial · product shot"],
    challenge: {
      h: "UK dealerships were losing margin on warranty claims and had no unified platform to manage policies, dealers, and claims at scale.",
      p: "Legacy warranty providers relied on spreadsheets, fragmented admin tools, and manual BACS reconciliation. Dealers had no visibility, customers had no self-service, and the Dealer Guarantee Fund was impossible to track in real-time.",
    },
    solution: {
      h: "We designed a full-stack warranty platform with dealer onboarding, claims automation, and BACS-integrated payment reconciliation.",
      p: "One product, end-to-end: dealer portal, policy engine, automated claims, real-time fund tracking. Built to run quietly in the background of a national dealership network — measured in uptime, not decks.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["NestJS", "TypeScript", "Node"] },
      { k: "Database", v: ["MySQL", "TypeORM"] },
      { k: "Infrastructure", v: ["AWS EC2", "S3", "RDS", "Lambda"] },
      { k: "Integrations", v: ["Stripe", "Zendesk", "Intercom", "Autotrader"] },
    ],
    process: [
      { n: "Discovery & Architecture", d: "Mapped the end-to-end warranty lifecycle — policy, claim, dealer, fund — and locked a schema that would survive the next five years of policy types." },
      { n: "MVP Build", d: "Shipped the dealer portal and policy engine in twelve weeks. First real warranty sold on day 84." },
      { n: "Dealer Onboarding", d: "A self-service onboarding flow that replaced a 17-page manual process. Average new dealer live in under 40 minutes." },
      { n: "Claims Automation", d: "BACS-integrated reconciliation, automated payouts, and a fraud-aware claims desk for human-in-the-loop review." },
      { n: "Scale & Iterate", d: "Instrumented every touchpoint, rolled out the customer portal, and launched dealer reporting that cut month-end from a week to an afternoon." },
    ],
    result: {
      h: "WarrantyOS now processes warranties across 400+ UK dealerships with automated claims, real-time fund tracking, and a dealer self-service portal.",
      p: "Shipped, instrumented, and still operated by the same team that designed it. The numbers below are the ones we report to the board every Monday.",
    },
    metrics: [
      { n: "100K+", l: "Policies managed" },
      { n: "400+", l: "Dealers onboarded" },
      { n: "£12M+", l: "Funds tracked" },
      { n: "99.9%", l: "Platform uptime" },
    ],
    commercialsCopy:
      "WarrantyOS operates as a SaaS platform layered over a licensed warranty book. Recurring dealer subscriptions plus a per-warranty fee give the product a rare combination: software margins with a real P&L attached.",
    comm: {
      model: "SaaS + Licensing",
      status: "Live, scaling",
      revenue: "Subscription + per-warranty fee",
      ownership: "Co-founder, 100%",
    },
    quote:
      "We didn't need another agency. We needed someone who would own the platform — design it, build it, and be on the phone at 11pm when a claim went sideways. Ben was that person from week one.",
    attr: { name: "Michael Harding", role: "Managing Director, WarrantyOS" },
  },

  taskbox: {
    slug: "taskbox",
    title: "Taskbox",
    cover: "/assets/taskbox.jpg",
    coverAlt: "Taskbox iPhone app in a craftsman's workshop",
    coverCap: "Taskbox · operating system",
    status: "beta",
    statusLabel: "Beta",
    desc: "An AI-native operating system for small teams: inboxes, SOPs, handovers, retros.",
    meta: "Productivity · AI",
    descriptor:
      "A mobile-first work-management platform for construction and facilities teams still living in spreadsheets and WhatsApp.",
    cta: { label: "Case access", href: "mailto:hello@benjaminbrown.co?subject=Taskbox%20case%20access" },
    pageMeta: {
      scope: "SaaS Platform",
      client: "Taskbox",
      duration: "In development",
      year: "2026",
      role: "Co-founder · Product & Engineering",
    },
    heroCaption: ["Taskbox — field ops, 2026", "Product · hardware in context"],
    challenge: {
      h: "Construction and facilities teams were running critical work in spreadsheets, printouts, and WhatsApp — with no accountable trail.",
      p: "Work orders lived in a different place to the people doing the work. Site supervisors were copying photos between three apps. Every monthly report was a forensic reconstruction. The industry needed a tool built for boots, not boardrooms.",
    },
    solution: {
      h: "A mobile-first work management platform with offline capture, photo-in-context, and an office-side operations console.",
      p: "One app for the site, one console for the office, one audit trail for everyone else. Designed to be opened with gloves on and a cracked screen.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React Native", "Tailwind"] },
      { k: "Backend", v: ["Supabase", "Edge Functions"] },
      { k: "Database", v: ["Postgres", "Row-level security"] },
      { k: "Infrastructure", v: ["Vercel", "Supabase Cloud"] },
      { k: "Integrations", v: ["Stripe", "Resend", "Sentry", "PostHog"] },
    ],
    process: [
      { n: "Field research", d: "Three weeks on-site with crews across construction, FM and transport. Every feature on the roadmap survived a muddy glove." },
      { n: "Prototype", d: "An interactive mobile prototype used by two pilot crews before a single production line of code." },
      { n: "MVP Build", d: "Offline-first mobile app with Supabase sync. First paid pilot onboarded in week ten." },
      { n: "Office Console", d: "The operations view — planner, audit log, and live site map — built to replace three tabs of a spreadsheet." },
      { n: "Go-to-market", d: "Pricing, onboarding, and self-serve sign-up. Beta closed, paid tier opens Q3." },
    ],
    result: {
      h: "Pilot crews replaced three tools with one and cut monthly reporting from a day to an hour.",
      p: "Still in closed beta, but the leading indicators are unusually strong: a fifteen-minute setup, ninety-percent weekly active use on the mobile app, and zero printouts left on site.",
    },
    metrics: [
      { n: "12", l: "Pilot crews" },
      { n: "90%", l: "Weekly active mobile" },
      { n: "8×", l: "Faster monthly report" },
      { n: "Q3", l: "Paid launch" },
    ],
    commercialsCopy:
      "Taskbox is a per-seat SaaS subscription with an enterprise tier for multi-site operators. No onboarding fee — the product has to earn its keep in the first two weeks.",
    comm: {
      model: "SaaS subscription",
      status: "Closed beta",
      revenue: "Per-seat, monthly",
      ownership: "Co-founder, majority",
    },
    quote: "The first app our site supervisors have ever asked to use. That's the entire review.",
    attr: { name: "Dani Okonkwo", role: "Operations Lead, pilot customer" },
  },

  govscape: {
    slug: "govscape",
    title: "Govscape",
    cover: "/assets/govscape.jpg",
    coverAlt: "Govscape — control gaps dashboard",
    coverCap: "Govscape · control gaps dashboard",
    status: "live",
    statusLabel: "Live",
    desc: "Governance, risk and compliance platform — control gaps, policy mapping and evidence, in one baseline.",
    meta: "GRC · SaaS",
    descriptor:
      "A GRC platform that replaces thirty spreadsheets and a shared drive with a live control baseline your auditor will actually open.",
    cta: { label: "Request a demo", href: "mailto:hello@benjaminbrown.co?subject=Govscape%20demo" },
    pageMeta: {
      scope: "SaaS Platform",
      client: "Govscape",
      duration: "Ongoing · 2025 →",
      year: "2026",
      role: "Co-founder · Design & Build",
    },
    heroCaption: ["Govscape — governance console, 2026", "Product · dashboard"],
    challenge: {
      h: "Mid-market compliance teams were running ISO 27001, SOC 2 and GDPR from thirty spreadsheets, a shared drive, and a chronic sense of dread.",
      p: "Controls were mapped to frameworks in a document no one could find. Evidence was scattered across Slack, email and three cloud drives. Every audit began with a two-week reconstruction exercise. Policy was a PDF, not a practice.",
    },
    solution: {
      h: "A GRC platform with a single control baseline, automated evidence capture, and a policy engine auditors can actually click through.",
      p: "One baseline, mapped across ISO, SOC 2, and GDPR. Automated evidence from the tools you already use. A policy library that ties directly to the controls it enforces. Audit windows that close in days, not weeks.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["NestJS", "TypeScript"] },
      { k: "Database", v: ["Postgres", "Prisma"] },
      { k: "Infrastructure", v: ["AWS", "Cloudflare"] },
      { k: "Integrations", v: ["Okta", "GitHub", "AWS Config", "Jira"] },
    ],
    process: [
      { n: "Control baseline", d: "Built a single control taxonomy mapped across ISO 27001, SOC 2, and GDPR — the schema that every screen in the product hangs off." },
      { n: "Evidence engine", d: "Automated evidence collectors for Okta, GitHub, AWS Config, and Jira. What was two days of screenshots is now a cron job." },
      { n: "Policy engine", d: "A versioned policy library linked directly to the controls it enforces. Auditors stop asking for the 'latest version'." },
      { n: "Audit mode", d: "A dedicated review view for external auditors with scoped access, no seat licence required. The feature that closed our first enterprise deal." },
      { n: "Scale", d: "Rolled out to regulated mid-market, shipped the questionnaire engine, and cut customer audit prep from fifteen days to two." },
    ],
    result: {
      h: "Govscape now runs the control baseline for dozens of regulated mid-market companies — audit prep down from weeks to days, evidence captured continuously.",
      p: "The product is live, paying, and used by the compliance leads themselves — not a deputy. Net revenue retention above 110%, which is the number that matters in GRC.",
    },
    metrics: [
      { n: "3×", l: "Frameworks per customer" },
      { n: "85%", l: "Audit prep reduction" },
      { n: "110%+", l: "NRR" },
      { n: "Live", l: "Production status" },
    ],
    commercialsCopy:
      "Govscape is sold as a per-workspace annual SaaS subscription, tiered by framework count and headcount. Implementation is self-serve — the product is the sales engine.",
    comm: {
      model: "SaaS subscription",
      status: "Live · scaling",
      revenue: "Annual per workspace",
      ownership: "Co-founder, majority",
    },
    quote: "We closed our SOC 2 audit in two working days. The auditor asked what tool we were using.",
    attr: { name: "Nadia Karim", role: "Head of Risk, mid-market customer" },
  },

  hatsafe: {
    slug: "hatsafe",
    title: "HatSafe",
    cover: "/assets/hatsafe.jpg",
    coverAlt: "HatSafe dashboard on MacBook",
    coverCap: "HatSafe · field capture",
    status: "live",
    statusLabel: "Live",
    desc: "Hard-hat inspection and compliance logging — a field-ready PWA for construction teams.",
    meta: "Industrial · PWA",
    descriptor:
      "A certificate compliance platform designed for the industries that actually fail audits because of a missing PDF.",
    cta: { label: "Visit site", href: "https://hatsafe.example" },
    pageMeta: {
      scope: "SaaS Platform",
      client: "HatSafe",
      duration: "Go-to-market",
      year: "2026",
      role: "Founder · Design & Build",
    },
    heroCaption: ["HatSafe — field capture, 2026", "Product · PWA"],
    challenge: {
      h: "Construction, logistics, and care providers were still tracking expiring certificates in folders, inboxes, and the odd sticky note.",
      p: "A single expired PPE certificate can shut a site down, lose a contract, or invalidate an insurance policy. The people responsible knew that — and were still using spreadsheets to manage it. The problem wasn't awareness, it was tooling.",
    },
    solution: {
      h: "A compliance platform with automated expiry tracking, photo evidence capture, and audit-ready export in two clicks.",
      p: "Upload once, get notified before anything expires, and hand the auditor a folder that builds itself. Designed for five industries that look nothing alike but share the same miserable paperwork.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["Supabase", "Edge Functions"] },
      { k: "Database", v: ["Postgres", "Storage"] },
      { k: "Infrastructure", v: ["AWS", "Vercel"] },
      { k: "Integrations", v: ["Stripe", "Resend", "HubSpot"] },
    ],
    process: [
      { n: "Market scoping", d: "Five industries, twenty interviews, one shared pain point. The MVP scope picked itself." },
      { n: "Design", d: "A single, boring, fast interface. Every screen designed to be used once a month by someone under time pressure." },
      { n: "Build", d: "Shipped in ten weeks. Expiry engine, evidence uploader, audit export, paid plan." },
      { n: "Pilot", d: "Paid pilots across construction, FM, and care. Real invoices before pricing page." },
      { n: "Go-to-market", d: "Content, SEO, and a direct-sales motion into the five target industries." },
    ],
    result: {
      h: "HatSafe is live across construction, facilities, transport, logistics, and care — replacing a drawer of certificates with one dashboard.",
      p: "Early customers report that audit prep has gone from days to a cup of coffee, and expired certificate incidents have simply stopped happening.",
    },
    metrics: [
      { n: "5", l: "Industries live" },
      { n: "14", l: "Paying customers" },
      { n: "0", l: "Expiry incidents" },
      { n: "2 clicks", l: "Audit export" },
    ],
    commercialsCopy:
      "HatSafe is a per-site SaaS subscription with a simple annual plan and a straightforward upgrade path for multi-site operators. No enterprise haggling.",
    comm: {
      model: "SaaS subscription",
      status: "Live · scaling",
      revenue: "Per-site, annual",
      ownership: "Founder, 100%",
    },
    quote: "It replaced a filing cabinet and a permanent low-grade anxiety. Both welcome outcomes.",
    attr: { name: "Rachel Dean", role: "Head of Compliance, early customer" },
  },

  "dealer-engine": {
    slug: "dealer-engine",
    title: "Dealer Engine",
    cover: "/assets/dealer-engine.jpg",
    coverAlt: "Dealer Engine dealership workspace on iMac",
    coverCap: "Dealer Engine · deal desk",
    status: "beta",
    statusLabel: "Beta",
    desc: "Deal desk and inventory operating layer for independent dealers — pricing, funding, delivery.",
    meta: "Automotive · SaaS",
    descriptor:
      "The operating layer independent motor dealers have been building in spreadsheets for twenty years — finally as a product.",
    cta: { label: "Request access", href: "mailto:hello@benjaminbrown.co?subject=Dealer%20Engine%20access" },
    pageMeta: {
      scope: "SaaS Platform",
      client: "Dealer Engine",
      duration: "Closed beta",
      year: "2026",
      role: "Co-founder · Design & Build",
    },
    heroCaption: ["Dealer Engine — deal desk, 2026", "Product · dealership UI"],
    challenge: {
      h: "Independent dealers were pricing, funding, and delivering cars on spreadsheets, WhatsApp, and a wall planner — and losing margin on every one.",
      p: "Stock, enquiries, pricing and delivery lived in four different places. Funding applications were PDFs. Delivery was a whiteboard. The margin being lost to admin was bigger than the margin being made on the car.",
    },
    solution: {
      h: "A deal desk and inventory operating layer — stock, pricing, funding, and delivery on one screen, per dealership.",
      p: "One pipeline, one price engine, one delivery board. Integrated with the funding providers and trade pricing feeds independents actually use. Built to be opened on a showroom laptop and understood in a minute.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["NestJS", "TypeScript"] },
      { k: "Database", v: ["Postgres", "Prisma"] },
      { k: "Infrastructure", v: ["AWS", "Cloudflare"] },
      { k: "Integrations", v: ["Autotrader", "Close Brothers", "BCA", "Stripe"] },
    ],
    process: [
      { n: "Showroom research", d: "Two weeks on site with three independent dealers. Every workflow sketched before the first screen." },
      { n: "Price engine", d: "A pricing model that combines trade feeds, stocking days, and margin targets — the engine that earns its keep daily." },
      { n: "Deal desk", d: "One screen for the enquiry, the pricing, the funding and the delivery. The tab supervisors actually live in." },
      { n: "Funding integrations", d: "Direct integrations with the funders independents already use — application to approval in minutes, not days." },
      { n: "Pilot", d: "Closed pilot with three dealerships. First invoice inside the first month." },
    ],
    result: {
      h: "Dealer Engine is in paid closed beta with three independent dealerships and routing every deal through one surface.",
      p: "The early numbers show what we hoped: time-to-deal down by a third, funding acceptance up, and zero enquiries falling into the WhatsApp abyss.",
    },
    metrics: [
      { n: "3", l: "Pilot dealerships" },
      { n: "33%", l: "Faster time-to-deal" },
      { n: "2×", l: "Funding acceptance" },
      { n: "Q3", l: "Paid launch" },
    ],
    commercialsCopy:
      "Dealer Engine is a per-dealership monthly SaaS subscription, with a per-funded-deal fee for the funding layer — recurring software margins on top of a real automotive economic unit.",
    comm: {
      model: "SaaS + per-deal fee",
      status: "Closed beta",
      revenue: "Subscription + per-deal",
      ownership: "Co-founder, majority",
    },
    quote: "It's the first tool that looks like our business, not the business a VC thinks we run.",
    attr: { name: "Tom Reid", role: "Proprietor, pilot dealership" },
  },

  wilbolaw: {
    slug: "wilbolaw",
    title: "WilboLaw",
    cover: "/assets/wilbolaw.jpg",
    coverAlt: "WilboLaw — client portal",
    coverCap: "WilboLaw · matter intake console",
    status: "live",
    statusLabel: "Live",
    desc: "Matter intake, client portal and document workflow for a modern law practice.",
    meta: "LegalTech · SaaS",
    descriptor:
      "Matter intake, document workflow and a client portal that replaces email for a modern law practice.",
    cta: { label: "Visit site", href: "https://wilbolaw.example" },
    pageMeta: {
      scope: "SaaS Platform",
      client: "WilboLaw",
      duration: "Live · 2025 →",
      year: "2026",
      role: "Fractional CTO · Design & Build",
    },
    heroCaption: ["WilboLaw — matter intake, 2026", "Product · LegalTech"],
    challenge: {
      h: "A modern law practice was running intake on a web form, matters in a case-management tool from 2008, and the client relationship out of Outlook.",
      p: "New-client onboarding took a week of back-and-forth emails. Documents were versioned by filename suffix. Clients couldn't see the status of their own matter without calling. The gap between the service the firm wanted to deliver and the tools it had was widening every quarter.",
    },
    solution: {
      h: "A single platform for matter intake, document workflow, and a client portal that closes the loop on every update.",
      p: "Structured intake that feeds directly into a matter record, a document engine built on practice-aware templates, and a client portal that replaces the 'any update?' email with a live status page.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["Next.js API", "TypeScript"] },
      { k: "Database", v: ["Postgres", "Prisma"] },
      { k: "Infrastructure", v: ["Vercel", "Supabase", "S3"] },
      { k: "Integrations", v: ["DocuSign", "Stripe", "Resend", "OpenAI"] },
    ],
    process: [
      { n: "Practice audit", d: "Mapped every workflow the firm ran end-to-end — from first enquiry to final invoice — and picked the three that absorbed 80% of the admin." },
      { n: "Intake engine", d: "A structured intake flow that turns a first enquiry into a matter record in under ten minutes — no Word document in sight." },
      { n: "Document workflow", d: "Practice-aware document templates, automated versioning, and e-signature in a single pipeline." },
      { n: "Client portal", d: "The update page that ate the status-check email. Secure, clear, and always current." },
      { n: "Ongoing", d: "Fractional CTO engagement — running the stack, hiring the in-house engineer, and shipping the next wave." },
    ],
    result: {
      h: "WilboLaw runs matter intake, documents, and the client relationship on one platform — and the partners have their evenings back.",
      p: "Intake time down 80%, email volume on active matters roughly halved, and a client NPS that, for the first time, gets measured at all.",
    },
    metrics: [
      { n: "80%", l: "Faster intake" },
      { n: "50%", l: "Email reduction" },
      { n: "Live", l: "Client portal" },
      { n: "+28", l: "Client NPS" },
    ],
    commercialsCopy:
      "WilboLaw engaged on a fractional CTO retainer with a defined discovery + build block up front. Recurring retainer revenue with a clear path to standalone product licensing.",
    comm: {
      model: "Fractional CTO + licence",
      status: "Live",
      revenue: "Retainer + licence",
      ownership: "Advisory · equity",
    },
    quote:
      "Ben rebuilt how our firm runs, not just the software it runs on. We have capacity we didn't have and a client experience the firm is proud of.",
    attr: { name: "William Wilbourne", role: "Managing Partner, WilboLaw" },
  },
};

export const PROJECT_CARDS: ProjectCard[] = PROJECT_ORDER.map((slug) => {
  const p = PROJECTS[slug];
  return {
    slug: p.slug,
    title: p.title,
    cover: p.cover,
    coverAlt: p.coverAlt,
    coverCap: p.coverCap,
    status: p.status,
    statusLabel: p.statusLabel,
    desc: p.desc,
    meta: p.meta,
  };
});
