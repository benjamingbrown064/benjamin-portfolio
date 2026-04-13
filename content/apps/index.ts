export interface AppFeature {
  title: string;
  description: string;
}

export interface AppCaseStudy {
  slug: string;
  name: string;
  category: string;
  year: string;
  status: "Live" | "In Build" | "MVP";
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: AppFeature[];
  techStack: string[];
  metrics?: string[];
  type: "detailed" | "brief";
}

export const APP_CASE_STUDIES: AppCaseStudy[] = [
  // ─── Detailed case studies ────────────────────────────────────────────────
  {
    slug: "love-warranty",
    name: "Love Warranty",
    category: "Warranty Management",
    year: "2023",
    status: "Live",
    tagline: "Warranty management platform for the motor trade.",
    overview:
      "Love Warranty is a full-stack warranty management platform built for UK motor dealers. It handles policy creation, claims processing, dealer onboarding, and revenue tracking — replacing fragmented spreadsheets and manual processes.",
    problem:
      "UK motor dealers were managing warranty policies and claims using spreadsheets, email chains, and manual processes. Claims took days to process, data was fragmented, and there was no visibility across dealer groups.",
    solution:
      "A multi-tenant SaaS platform where dealers can issue policies, customers can submit claims with photo evidence, and administrators can review and approve claims in real time. Built with role-based access for dealers, customers, and admin.",
    features: [
      {
        title: "Claims Processing",
        description:
          "Customers submit claims with photo evidence and vehicle diagnostics. Claims are routed to the right team automatically based on type and value.",
      },
      {
        title: "Policy Management",
        description:
          "Dealers issue and manage warranty policies from a single dashboard. Coverage terms, exclusions, and renewal dates tracked automatically.",
      },
      {
        title: "Dealer Onboarding",
        description:
          "New dealers go live in under an hour. Multi-dealership groups supported with shared billing and separate operational views.",
      },
      {
        title: "Revenue Dashboard",
        description:
          "Real-time revenue tracking across all policies, claims, and dealer groups. Fund balance calculations and forecasting built in.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Tailwind CSS", "Resend"],
    metrics: ["3 dealership groups onboarded", "Live in production", "Claims processed in < 24hrs"],
    type: "detailed",
  },
  {
    slug: "wilbolaw",
    name: "WilboLaw",
    category: "Legal AI",
    year: "2024",
    status: "Live",
    tagline: "AI-powered QME review for California workers' compensation attorneys.",
    overview:
      "WilboLaw processes 200+ page QME/PQME reports against AMA Guides 5th Edition in minutes, surfacing discrepancies, apportionment issues, and deposition angles for California workers' compensation defence attorneys.",
    problem:
      "California workers' comp defence attorneys were spending days manually reviewing QME reports against AMA Guides 5th Edition. The process was time-consuming, prone to missed findings, and created bottlenecks before depositions.",
    solution:
      "An AI-assisted review platform that ingests QME reports, cross-references findings against AMA Guides, surfaces discrepancies and vulnerabilities, and generates structured case analysis — with full source attribution and attorney oversight throughout.",
    features: [
      {
        title: "AI Report Analysis",
        description:
          "Processes 200+ page QME/PQME reports against AMA Guides 5th Edition. Surfaces discrepancies, missing evidence, and apportionment issues with source citations.",
      },
      {
        title: "Deposition Prep",
        description:
          "Generates structured deposition angle suggestions based on report vulnerabilities. Each finding traceable to specific AMA Guides sections.",
      },
      {
        title: "Case Memory",
        description:
          "5-layer memory system accumulates intelligence across cases — finding patterns, attorney preferences, and successful challenge strategies.",
      },
      {
        title: "Security Architecture",
        description:
          "Multi-tenant isolation, prompt injection protection, AES-256 encryption, TLS 1.3, full audit trails. PHI never leaves the platform.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Anthropic Claude", "Supabase", "PostgreSQL", "pgvector", "Tailwind CSS"],
    metrics: ["200+ page reports in < 5 mins", "26 security layers", "Full tenant isolation"],
    type: "detailed",
  },
  {
    slug: "taskbox",
    name: "Taskbox",
    category: "Productivity SaaS",
    year: "2024",
    status: "Live",
    tagline: "Lightweight task management SaaS built for speed-first teams.",
    overview:
      "Taskbox is a no-friction task management platform designed for small teams who need focus and speed — not feature bloat. Built from scratch with fast onboarding, clean UX, and keyboard-first navigation.",
    problem:
      "Small teams were abandoning enterprise task tools because they were too heavy, too slow to set up, and full of features that got in the way. They needed something that worked in 60 seconds, not 60 minutes.",
    solution:
      "A stripped-back task board with just enough structure: workspaces, projects, tasks, statuses, and priorities. No meetings, no AI copilots, no bloat. Fast to load, fast to use, fast to onboard.",
    features: [
      {
        title: "Instant Workspaces",
        description:
          "New workspace created in seconds. No onboarding flow, no credit card, no configuration required to start working.",
      },
      {
        title: "Keyboard-First",
        description:
          "Every action has a keyboard shortcut. Power users never need to reach for the mouse. Designed for speed.",
      },
      {
        title: "Clean Board View",
        description:
          "Kanban board with drag-and-drop. Status columns, priority indicators, and assignee avatars. Nothing more.",
      },
      {
        title: "Team Collaboration",
        description:
          "Invite team members, assign tasks, and see activity in real time. Simple RBAC without the enterprise overhead.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    metrics: ["Sub-100ms page loads", "< 60s onboarding", "Mobile-first"],
    type: "detailed",
  },
  {
    slug: "security-app",
    name: "Security App",
    category: "Site Security",
    year: "2024",
    status: "Live",
    tagline: "Digital security management replacing paper guard logs.",
    overview:
      "A real-time security management platform for multi-site operations. Guards check in via mobile, incidents are logged with photo evidence, and managers get instant visibility across all sites — replacing paper guard books entirely.",
    problem:
      "Multi-site businesses were managing security guards with paper logbooks, WhatsApp messages, and phone calls. Incidents were under-reported, response times were slow, and there was zero audit trail.",
    solution:
      "A mobile-first platform where guards check in via QR code, log patrols, report incidents with photos, and supervisors see live status across all sites. Incident reports auto-generated for insurance and compliance.",
    features: [
      {
        title: "Mobile Guard Interface",
        description:
          "Guards use their phone to check in, start patrols, log incidents, and submit reports. Works offline and syncs when connected.",
      },
      {
        title: "Live Site Dashboard",
        description:
          "Managers see real-time status across all sites — guard positions, patrol progress, open incidents, and response times.",
      },
      {
        title: "Incident Reporting",
        description:
          "Guards submit incident reports with photos, location, and description. Auto-formatted for insurance and compliance documentation.",
      },
      {
        title: "Audit Trail",
        description:
          "Full time-stamped audit trail of all guard activity. Exportable for compliance, insurance claims, and performance reviews.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Real-time subscriptions", "Tailwind CSS"],
    metrics: ["Multi-site support", "Real-time updates", "Full audit trail"],
    type: "detailed",
  },

  // ─── Brief case studies ────────────────────────────────────────────────────
  {
    slug: "the-dms",
    name: "The DMS",
    category: "Dealer Management",
    year: "2024",
    status: "Live",
    tagline: "End-to-end dealer management system for independent dealers.",
    overview:
      "Full-stack dealer management system replacing legacy DMS platforms. Handles stock management, leads, deals, documents, AutoTrader sync, AI chat assistant, and operational reporting in one platform built for independent dealers.",
    problem: "Independent dealers were locked into expensive legacy DMS systems that were slow, hard to use, and didn't connect to modern sales channels.",
    solution: "A modern, mobile-first DMS with AutoTrader integration, AI-powered insights, and a clean UX that dealers can actually use without training.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "OpenAI", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "zebi",
    name: "Zebi",
    category: "AI Operations",
    year: "2025",
    status: "Live",
    tagline: "Multi-agent business operating system for founder-led businesses.",
    overview:
      "Zebi is a multi-agent AI operating system. Objectives, tasks, agents, and decisions all connect in one platform. Built to replace manual coordination across growing businesses with AI-native workflows and full auditability.",
    problem: "Founder-led businesses were managing operations across disconnected tools — task managers, docs, email, Slack — with no single source of truth and no AI integration.",
    solution: "A unified operating system where agents pick up tasks, complete work, and hand off — all tracked, auditable, and connected to business objectives.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Anthropic Claude", "OpenAI", "Prisma"],
    type: "brief",
  },
  {
    slug: "hatsafe",
    name: "HatSafe",
    category: "Safety & Compliance",
    year: "2024",
    status: "Live",
    tagline: "Digital health and safety management for multi-site operations.",
    overview:
      "HatSafe replaces paper-based health and safety compliance workflows with real-time audit trails, digital risk assessments, and automated reporting — designed for companies operating across multiple sites.",
    problem: "Multi-site businesses were managing H&S compliance using spreadsheets, paper forms, and manual inspections with no visibility across sites.",
    solution: "A digital compliance platform where site managers complete digital checklists, incidents are logged in real time, and compliance reports are auto-generated.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "dealer-engine",
    name: "Dealer Engine",
    category: "Automotive SaaS",
    year: "2024",
    status: "Live",
    tagline: "Stock management and deal tracking for independent dealers.",
    overview:
      "Dealer Engine is a lightweight dealer toolset for stock management, deal tracking, and customer communications. Built mobile-first for independent dealers who need speed over complexity.",
    problem: "Independent dealers needed a lighter-weight alternative to full DMS platforms — something that handled the core stock and deal workflow without the overhead.",
    solution: "A focused mobile-first toolset: stock in, stock out, deal tracking, and customer messaging. No bloat, fast to learn, fast to use.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "warranty-apps",
    name: "Warranty Apps",
    category: "Warranty Platform",
    year: "2024",
    status: "Live",
    tagline: "Warranty management suite for the automotive industry.",
    overview:
      "Warranty Apps is an enterprise warranty workflow suite — a broader platform layer above Love Warranty. Handles multi-product warranty management, integration APIs, and white-label deployments for warranty providers.",
    problem: "Warranty providers needed a platform that could handle multiple products, white-labelled dealer portals, and integration with existing dealer management systems.",
    solution: "An enterprise platform layer with REST APIs, white-label support, multi-product configuration, and dealer portal branding.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "clarity-os",
    name: "Clarity OS",
    category: "Enterprise Operations",
    year: "2025",
    status: "Live",
    tagline: "Enterprise operations platform connecting objectives to execution.",
    overview:
      "Clarity OS is an enterprise-grade operations platform that connects strategic objectives to daily execution. Built for growing businesses that need visibility across teams, projects, and performance metrics.",
    problem: "Growing businesses were managing strategy in spreadsheets and execution in task tools with no connection between the two.",
    solution: "A unified platform where objectives connect to projects, projects connect to tasks, and all progress is visible in real time.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "dealer-next",
    name: "Dealer Next",
    category: "Automotive",
    year: "2025",
    status: "In Build",
    tagline: "Next-generation mobile-first dealer toolset.",
    overview:
      "Dealer Next is the next evolution of the dealer toolset — fully mobile-first, AI-assisted stock acquisition, and deal management. Designed for the independent dealer who works from their phone, not their desk.",
    problem: "Existing dealer tools assumed desk-based workflows. Independent dealers needed something that worked entirely on mobile.",
    solution: "Mobile-native dealer app with AI-powered stock pricing recommendations, deal tracking, and customer communication — all from a phone.",
    features: [],
    techStack: ["Next.js", "React Native", "Supabase", "OpenAI", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "dgs",
    name: "DGS",
    category: "Data & Analytics",
    year: "2023",
    status: "Live",
    tagline: "Data gathering and segmentation platform for large-scale outreach.",
    overview:
      "DGS is a data gathering and segmentation platform that enables large-scale targeted outreach campaigns. Processes and segments contact databases into prioritised, ICP-matched lists for sales and marketing teams.",
    problem: "Sales teams had large contact databases but no way to segment and prioritise them for targeted outreach. Manual segmentation was slow and inconsistent.",
    solution: "An automated segmentation platform that processes contact data, scores leads against ICP criteria, and outputs prioritised outreach lists with contact enrichment.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Python"],
    type: "brief",
  },
  {
    slug: "support-app",
    name: "Support App",
    category: "Customer Support",
    year: "2024",
    status: "MVP",
    tagline: "AI-assisted customer support platform.",
    overview:
      "A lightweight customer support platform with AI-assisted response suggestions. Designed for small teams handling high-volume support without the overhead of enterprise helpdesk tools.",
    problem: "Small support teams were drowning in repetitive queries with no tooling to surface patterns or suggest responses.",
    solution: "A clean ticketing interface with AI-powered response suggestions based on historical resolutions.",
    features: [],
    techStack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Tailwind CSS"],
    type: "brief",
  },
  {
    slug: "claims-scanner",
    name: "Claims Scanner",
    category: "Warranty Tech",
    year: "2025",
    status: "In Build",
    tagline: "AI-powered warranty claims assessment from diagnostic PDFs.",
    overview:
      "Claims Scanner processes vehicle diagnostic PDFs using AI, assesses claims against warranty T&Cs, and generates email draft responses for claims handlers — reducing assessment time from hours to minutes.",
    problem: "Warranty claims handlers were manually reading diagnostic reports, cross-referencing T&Cs, and writing response emails — taking 30-60 minutes per claim.",
    solution: "An AI pipeline that ingests PDF diagnostics, extracts relevant data, assesses coverage eligibility, and generates a structured email draft ready for review.",
    features: [],
    techStack: ["Next.js", "TypeScript", "OpenAI GPT-4o", "Supabase", "Tailwind CSS"],
    type: "brief",
  },
];

export function getAppBySlug(slug: string): AppCaseStudy | undefined {
  return APP_CASE_STUDIES.find((a) => a.slug === slug);
}

export function getAdjacentApps(slug: string): {
  prev: AppCaseStudy | null;
  next: AppCaseStudy | null;
} {
  const index = APP_CASE_STUDIES.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? APP_CASE_STUDIES[index - 1] : null,
    next: index < APP_CASE_STUDIES.length - 1 ? APP_CASE_STUDIES[index + 1] : null,
  };
}

export const ALL_SLUGS = APP_CASE_STUDIES.map((a) => a.slug);
