export type ProjectStatus = "live" | "beta" | "dev";

export type ProjectCard = {
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
  coverCap: string;
  coverFit?: "cover" | "contain";
  coverPosition?: string;
  coverBg?: string;
  titleLogo?: string;
  titleLogoAlt?: string;
  status: ProjectStatus;
  statusLabel: string;
  desc: string;
  meta: string;
};

export type ProjectCaseStudy = ProjectCard & {
  descriptor: string;
  logo?: string;
  logoAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageFit?: "cover" | "contain";
  heroImagePosition?: string;
  heroImageBg?: string;
  cta: { label: string; href: string };
  pageMeta: {
    scope: string;
    client: string;
    duration: string;
    year: string;
    role: string;
  };
  heroCaption: [string, string];
  detailImages?: { src: string; alt: string }[];
  processImage?: { src: string; alt: string; fit?: "cover" | "contain"; position?: string; bg?: string };
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
  "wilbolaw",
  "warrantyos",
  "govscape",
  "dealer-engine",
  "taskbox",
  "love-warranty",
  "hatsafe",
  "the-dms",
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
    coverAlt: "Govscape — AI governance and financial exposure console",
    coverCap: "Govscape · AI-QEF governance console",
    status: "live",
    statusLabel: "Live",
    desc: "AI governance and financial exposure platform — turns governance gaps into measurable financial outcomes.",
    meta: "AI Governance · SaaS",
    descriptor:
      "An AI governance platform for regulated enterprises — built around one idea: AI governance requires data governance, and weak data governance creates measurable financial exposure.",
    cta: { label: "Live preview", href: "https://govscape.app" },
    pageMeta: {
      scope: "AI Governance Platform",
      client: "Govscape",
      duration: "Live · 2025 →",
      year: "2026",
      role: "Founder · Design & Build",
    },
    heroCaption: ["Govscape — AI-QEF console, 2026", "Product · governance & financial exposure"],
    challenge: {
      h: "Enterprises are adopting AI faster than they can govern it — and treating governance as a compliance checkbox rather than a financial exposure problem.",
      p: "Mid-to-large organisations are deploying AI tools without the data foundations to back them up. Compliance teams assess AI governance in isolation from data quality, system fragmentation, and operational risk — so the link between weak governance and real revenue leakage stays invisible until it surfaces as a fine, an audit finding, or a failed rollout. The tools they have produce static reports. None of them tell the board what poor governance is actually costing the business.",
    },
    solution: {
      h: "A consultant-led governance platform that quantifies the financial exposure of AI and data governance gaps in pounds, not RAG ratings.",
      p: "Six structured assessment modules — strategic AI positioning, data governance, AI risk & compliance, data quality, operational efficiency, and ongoing monitoring — feed an AI Governance Cost Engine that translates every gap into a defensible financial range. Discovery, remediation, and managed governance all run from one platform, with AI-generated executive narrative on top of every score.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["Supabase", "Edge Functions"] },
      { k: "Database", v: ["Postgres", "Row-level security"] },
      { k: "AI Layer", v: ["Claude Sonnet 4", "OpenAI"] },
      { k: "Infrastructure", v: ["Vercel", "Supabase Cloud"] },
    ],
    process: [
      { n: "Strategic positioning", d: "Locked the core thesis — AI governance requires data governance — and built every module around the link between governance maturity and financial outcomes." },
      { n: "Six-module framework", d: "Designed structured assessments across AI strategy, data governance, AI risk, data quality, operational efficiency, and ongoing monitoring. Each module produces concrete scores, heatmaps, and remediation effort estimates rather than narrative." },
      { n: "AI Governance Cost Engine", d: "Built the four-pillar financial exposure model — operational inefficiency, technology waste, revenue leakage, risk exposure — with every coefficient living in a configurable benchmarks table. Tweaking a number is a 30-second admin task, not a release." },
      { n: "AI insight layer", d: "Wired Claude Sonnet 4 and OpenAI to generate executive-language insights, prioritised actions, and narrative summaries — every figure ships with explainable drill-down on inputs, benchmarks, and assumptions." },
      { n: "Three-phase commercial model", d: "Productised the journey from Discovery to Remediation to Managed Governance — so a consulting engagement converts naturally into recurring subscription revenue, without a separate sales motion." },
    ],
    result: {
      h: "Govscape now translates AI and data governance gaps into board-ready financial exposure for regulated mid-market and enterprise buyers.",
      p: "The product replaces qualitative RAG ratings with defensible financial ranges, executive narrative, and explainable drill-downs on every number. Discovery engagements are running, remediation programmes are in motion, and managed governance subscriptions create the recurring revenue base the strategy depends on.",
    },
    metrics: [
      { n: "6", l: "Assessment modules" },
      { n: "4", l: "Cost engine pillars" },
      { n: "$7bn", l: "Addressable market" },
      { n: "Live", l: "Production status" },
    ],
    commercialsCopy:
      "Govscape runs a three-phase commercial model. A discovery engagement quantifies financial exposure, a remediation programme closes the gaps, and a managed governance subscription monitors them continuously. Consulting margins on the way in, recurring software revenue on the way out — and a deliberate transition from services to platform that improves both scalability and valuation.",
    comm: {
      model: "Three-phase: Discovery → Remediation → Managed",
      status: "Live",
      revenue: "£15K–£35K discovery · £20K–£100K remediation · £1K–£5K/mo managed",
      ownership: "Founder · partnered with IDS",
    },
    quote:
      "Every governance tool we looked at produced a report. Govscape produced a number — and that's what got the board moving.",
    attr: { name: "Risk Director", role: "Mid-market enterprise customer" },
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
    coverAlt: "WilboLaw — defence-side AI review workspace for QME analysis",
    coverCap: "WilboLaw · QME review workspace",
    status: "live",
    statusLabel: "Live",
    desc: "A defence-side AI review layer for California workers' compensation attorneys analysing QME and PQME reports.",
    meta: "LegalTech · AI",
    descriptor:
      "A defence-side AI review layer for California workers' compensation attorneys, built around one specific workflow: tearing apart a QME report before opposing counsel can lean on it.",
    logo: "/assets/wilbolaw-title-logo.jpg",
    logoAlt: "WilboLaw logo",
    heroImage: "/assets/wilbolaw-hero.jpg",
    heroImageAlt: "WilboLaw executive dashboard on laptop in a law office",
    heroImageFit: "cover",
    heroImagePosition: "center center",
    titleLogo: "/assets/wilbolaw-title-logo.jpg",
    titleLogoAlt: "WilboLaw logo",
    coverFit: "cover",
    coverPosition: "center 35%",
    cta: { label: "Live preview", href: "https://benjamin-portfolio-swart.vercel.app/work/wilbolaw" },
    pageMeta: {
      scope: "Legal AI Platform",
      client: "CW Law",
      duration: "Live · 2026",
      year: "2026",
      role: "Product strategy · Design & Build",
    },
    heroCaption: ["WilboLaw — QME review layer, 2026", "Product · LegalTech"],
    detailImages: [
      { src: "/assets/wilbolaw-detail-1.jpg", alt: "WilboLaw case details view on desktop in law office" },
      { src: "/assets/wilbolaw-detail-2.jpg", alt: "WilboLaw document and reports view on laptop in law office" },
    ],
    processImage: {
      src: "/assets/wilbolaw-process.jpg",
      alt: "WilboLaw missing evidence report on desktop in law office",
      fit: "cover",
      position: "center center",
    },
    challenge: {
      h: "California workers' compensation defence is brutally document-heavy, and the core work is finding weaknesses in QME and PQME reports before they shape the case.",
      p: "A single file can span hundreds of pages across QME reports, AME reports, treating physician records, imaging, depositions, prior injuries, and employer correspondence, all of it cross-checked against AMA Guides 5th Edition, California Labor Code, CCR Title 8, the 2005 PDRS, and WCAB decisions. General-purpose legal AI is not enough here. If it invents a page number or misstates a source, the output is unusable.",
    },
    solution: {
      h: "WilboLaw is a narrow, defence-aware review layer that processes the case file, verifies every citation against the source PDF, and produces outputs an attorney can actually rely on.",
      p: "The platform generates a Vulnerability and Weakness Report, a Missing Evidence Report, and an AI Advisor over the full case file. It also drafts the four letters the firm actually writes: Initial File Review, Status Report, Conference Summary, and Deposition Summary. Every finding is source-backed. If the system cannot find evidence for a claim, it does not make the claim.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind", "Vercel"] },
      { k: "Backend", v: ["Supabase", "Postgres", "Prisma", "pgvector"] },
      { k: "Document processing", v: ["Railway Docker worker", "Page-level chunking", "Voyage AI voyage-law-2"] },
      { k: "Reasoning layer", v: ["Claude Sonnet", "Claude Opus", "Citation verification"] },
      { k: "Infrastructure", v: ["Vercel", "Railway", "Supabase", "Sentry", "Resend"] },
    ],
    process: [
      { n: "Workflow definition", d: "Built around one real defence workflow at CW Law: interrogating QME and PQME reports faster and with more rigour than a manual review allows." },
      { n: "Case ingestion", d: "Bulk-upload a full case file, then parse, chunk, embed, and index every page with filename and page-number traceability." },
      { n: "Defence-aware analysis", d: "Run structured analysis that classifies vulnerabilities, flags missing evidence, and keeps deterministic extraction for case facts and numeric fields." },
      { n: "Reference corpus", d: "Maintain a versioned California workers' compensation corpus with temporal filtering so a 2024 QME is reasoned against the law in force in 2024." },
      { n: "Attorney-ready output", d: "Generate auditable reports, letter drafts, and conversational Q and A, with every citation resolved against the source before it renders." },
    ],
    result: {
      h: "The better part of a week's review work compresses into a day, with stronger defence preparation because the systematic checks actually get done.",
      p: "WilboLaw gives Catherine Wilbourn a source-backed deposition report, a missing-evidence view, and a case-wide AI Advisor she can interrogate directly. The value is not that AI can read documents. It is that the output is trustworthy enough for an attorney to audit and use.",
    },
    metrics: [
      { n: "3", l: "Primary outputs" },
      { n: "4", l: "Letter types" },
      { n: "1 day", l: "Review instead of a week" },
      { n: "7 years", l: "Audit retention" },
    ],
    commercialsCopy:
      "WilboLaw starts as a live pilot with CW Law and is designed to generalise to other California workers' compensation defence firms once the workflow is proven on real files. The commercial shape is deliberate: prove the workflow in one specialist firm, then productise the same defence-side review layer as repeatable legal-tech software.",
    comm: {
      model: "Pilot firm → product licensing",
      status: "Live pilot",
      revenue: "Pilot build + future firm licensing",
      ownership: "Product build partner",
    },
    quote:
      "I have wanted a tool like this for fifteen years and never expected to actually get one. The Vulnerability and Weakness Report finds things in the file in two minutes that would have taken me half a day, and every finding is cited back to the page so I can check it before I rely on it.",
    attr: { name: "Catherine Wilbourn", role: "Founding Attorney, CW Law" },
  },

  "love-warranty": {
    slug: "love-warranty",
    title: "Love Warranty",
    cover: "/assets/love-warranty.jpg",
    coverAlt: "Love Warranty — claims and dealer console",
    coverCap: "Love Warranty · claims operations console",
    status: "live",
    statusLabel: "Live",
    desc: "Technology-led vehicle warranty platform — products, claims engine, dealer analytics, and direct-to-consumer.",
    meta: "Automotive · Warranty",
    descriptor:
      "A transparent, technology-driven vehicle warranty platform — entry-level cover, comprehensive True Love protection, and an AI-assisted claims engine that pays fairly and predictably.",
    cta: { label: "Live preview", href: "https://lovewarranty.co.uk" },
    pageMeta: {
      scope: "Warranty Platform · Claims Engine",
      client: "Love Warranty",
      duration: "Live · 2024 →",
      year: "2026",
      role: "Founder · Design & Build",
    },
    heroCaption: ["Love Warranty — claims operations, 2026", "Product · automotive warranty"],
    challenge: {
      h: "Vehicle warranty is an industry built on opaque underwriting, sales-led commissions, and rejected claims — and dealers and customers were paying for it.",
      p: "Most warranty providers focus on distributing policies and outsource claims, underwriting, and fund management to people the dealer never sees. The result is inconsistent claim outcomes, brittle pricing, and a relationship that quietly damages the dealer's reputation every time a claim is denied. Dealers had no visibility on warranty performance, no transparency on fund health, and no way to defend the customer experience attached to their forecourt.",
    },
    solution: {
      h: "A technology-led warranty platform built on transparent fund management, AI-assisted claims, and dealer-grade reporting.",
      p: "Two warranty products — an entry-level cover bundled with vehicle sales and the comprehensive True Love Cover for upsell — sit on top of an internal platform that handles registrations, claims processing, fund forecasting, and dealer performance analytics. The claims engine ingests inbound claims from email, telephony, and a public form, uses Claude to extract structured facts from unstructured claim packs, applies policy logic, and drafts handler-ready outcomes. Dealers see exactly how their fund is performing in real time.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["Next.js API", "Node", "TypeScript"] },
      { k: "Database", v: ["Supabase", "Postgres", "Prisma"] },
      { k: "AI", v: ["Claude (Anthropic)", "OpenAI Whisper"] },
      { k: "Integrations", v: ["Aircall", "Gmail API", "Resend", "DVLA VES"] },
    ],
    process: [
      { n: "Fund-first design", d: "Re-architected the commercial model around long-term fund sustainability rather than sales-volume incentives. Every product, claim policy, and reporting surface ties back to fund health." },
      { n: "Two-product line", d: "Shipped the entry-level warranty bundled with vehicle sales and the upgraded True Love Cover for upsell — designed so dealers can include cover with every car and grow margin without extra admin." },
      { n: "AI-assisted claims engine", d: "Built the Love Warranty Claims Scanner: inbound claims from email, Aircall, and a public form flow into a Claude-powered extraction layer, get assessed against policy, and arrive on a handler's desk with a provisional payout and drafted comms." },
      { n: "Dealer reporting layer", d: "Per-dealer dashboards on warranty performance, claim exposure, and fund forecasting — so dealers can manage warranty as a business line, not a black box." },
      { n: "Direct-to-consumer expansion", d: "Layered a D2C channel on top of the dealer platform so vehicle owners can buy and renew protection directly — with the same fund discipline behind it." },
    ],
    result: {
      h: "Love Warranty operates as a technology-enabled warranty provider with structured fund management, AI-assisted claims, and dealer analytics — covering a £1.5–2bn UK market.",
      p: "The claims platform is in production at claims.lovewarranty.com, processing claims with full audit trails, telephony integration, and AI-extracted fact packs. Dealers get the transparency the industry historically refused to provide; customers get a claim experience that pays out when it should.",
    },
    metrics: [
      { n: "£1.5–2bn", l: "UK market" },
      { n: "2", l: "Warranty products" },
      { n: "Live", l: "Claims engine" },
      { n: "AI-led", l: "Claims assessment" },
    ],
    commercialsCopy:
      "Love Warranty earns through warranty product margin, claim handling, and the dealer platform. Recurring premium income, a structured fund-management model, and the dealer technology layer combine to give the business the durability that traditional warranty providers lack.",
    comm: {
      model: "Warranty + platform + claims",
      status: "Live · scaling",
      revenue: "Premium income + dealer platform",
      ownership: "Founder",
    },
    quote:
      "We needed a warranty partner who would actually pay claims and tell us how the fund was performing. Love Warranty was the first one that did both.",
    attr: { name: "Independent dealer", role: "Group operator, southern England" },
  },

  "the-dms": {
    slug: "the-dms",
    title: "The DMS",
    cover: "/assets/the-dms.jpg",
    coverAlt: "The DMS — AI dealer management platform",
    coverCap: "The DMS · dealer operating system",
    status: "live",
    statusLabel: "Live",
    desc: "An AI-powered dealer management system built specifically for UK independent car dealers.",
    meta: "Automotive · SaaS",
    descriptor:
      "A modern, AI-powered operating system for independent car dealers — stock, leads, deals, prep, team and reporting in one place, with an AI layer that tells you what to do next.",
    cta: { label: "Live preview", href: "https://www.thedms.app" },
    pageMeta: {
      scope: "Dealer Management Platform",
      client: "The DMS",
      duration: "Live · 2026 →",
      year: "2026",
      role: "Founder · Design & Build",
    },
    heroCaption: ["The DMS — dealer operating system, 2026", "Product · automotive SaaS"],
    challenge: {
      h: "13,000+ UK independent dealerships are running a multi-million-pound business on spreadsheets, WhatsApp, a stock tool, an accounts package, and a legacy DMS that was designed for franchised groups in 2008.",
      p: "Enterprise dealer management systems are expensive, slow to implement, and built for franchised networks. Independent dealers are stuck stitching together inventory tools, messaging apps, finance systems, and manual processes — losing leads, mispricing stock, and burning hours on admin that nobody actually owns. The independent market has been waiting for a system designed for the way they actually run a forecourt.",
    },
    solution: {
      h: "A modern, AI-powered operating system for independent dealerships — purpose-built for the way they run, not retro-fitted from a franchised playbook.",
      p: "One platform for stock, leads, deals, customers, documents, team activity, and reporting — with an AI layer that highlights what needs attention now, drafts comms, and answers operational questions in plain English. Designed for fast onboarding, low-friction migration, and a 30-day pilot that gets a dealer from sign-up to visible ROI in days, not quarters.",
    },
    stack: [
      { k: "Frontend", v: ["Next.js", "React", "Tailwind"] },
      { k: "Backend", v: ["Next.js API", "Node", "TypeScript"] },
      { k: "Database", v: ["Supabase", "Postgres"] },
      { k: "AI Layer", v: ["Claude", "OpenAI", "Operational reasoning"] },
      { k: "Integrations", v: ["DVLA VES", "Autotrader", "Vercel"] },
    ],
    process: [
      { n: "Independent-first scope", d: "Wrote the spec around the operational reality of 5–200 vehicle/month independents — not a watered-down version of a franchised DMS. Every feature earned its place by reducing admin or surfacing decisions." },
      { n: "Operating backbone", d: "Built the unified platform: stock, leads, customers, deals, documents, team activity, and reporting. One interface, one dataset, one place where the dealership actually lives." },
      { n: "AI operating layer", d: "Wired AI in as an operational assistant — surfacing what needs attention today, drafting documents and notes, suggesting next-best actions, and letting the team chat with the system to create and update work." },
      { n: "Pilot-ready package", d: "Designed a 30-day pilot path: sign-up, data import (or demo data), AI analysis, and an ROI dashboard a dealer can read in under a minute. The product proves itself in the first session." },
      { n: "Production deployment", d: "Live at thedms.app on Vercel, integrated with DVLA for vehicle lookups and Autotrader for stock advertising. GitHub-driven deploys, Supabase-backed data layer, and a clear path from pilot to paid." },
    ],
    result: {
      h: "The DMS is live at thedms.app — a working independent-first dealer operating system replacing the legacy + spreadsheet stack with one platform, one dataset, and an AI assistant.",
      p: "The core platform is in production and pilot-ready: dealer workspace, stock, deals, AI analysis, and the 30-day onboarding flow. Aimed at the 13,000–15,000 UK independent dealerships the legacy DMS market has structurally underserved.",
    },
    metrics: [
      { n: "13K+", l: "UK independent dealers" },
      { n: "30 days", l: "Pilot to ROI" },
      { n: "AI-native", l: "Operating layer" },
      { n: "Live", l: "Production status" },
    ],
    commercialsCopy:
      "The DMS is sold as a per-dealership SaaS subscription with a structured 30-day pilot path. The pilot is the sales motion — the product has to deliver visible operational ROI in the first session, then scale across the dealership team.",
    comm: {
      model: "SaaS subscription",
      status: "Live · pilots running",
      revenue: "Per-dealership monthly",
      ownership: "Founder",
    },
    quote:
      "It's the first dealer system that fits how we actually work. Less admin, more selling, and a clear view of what's slipping.",
    attr: { name: "Independent dealer", role: "Owner-operator, pilot dealership" },
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
    coverFit: p.coverFit,
    coverPosition: p.coverPosition,
    coverBg: p.coverBg,
    titleLogo: p.titleLogo,
    titleLogoAlt: p.titleLogoAlt,
    status: p.status,
    statusLabel: p.statusLabel,
    desc: p.desc,
    meta: p.meta,
  };
});
