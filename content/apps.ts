export interface App {
  slug: string;
  name: string;
  category: string;
  year: string;
  description: string;
  status: "Live" | "In Build" | "MVP";
  featured: boolean;
  tagline?: string;
}

export const APPS: App[] = [
  {
    slug: "the-dms",
    name: "The DMS",
    category: "Dealer Management",
    year: "2024",
    description:
      "End-to-end dealer management system replacing legacy DMS platforms. Stock, leads, deals, documents, AutoTrader sync, and AI-driven insights.",
    status: "Live",
    featured: true,
    tagline: "The modern DMS built for independent dealers.",
  },
  {
    slug: "wilbolaw",
    name: "WilboLaw",
    category: "Legal AI",
    year: "2024",
    description:
      "AI-powered legal compliance platform for California workers' compensation attorneys. Processes 200+ page regulatory documents in minutes.",
    status: "Live",
    featured: true,
    tagline: "Faster QME review. Better case outcomes.",
  },
  {
    slug: "zebi",
    name: "Zebi",
    category: "AI Operations",
    year: "2025",
    description:
      "Multi-agent business operating system. Objectives, tasks, agents, and decisions — all connected in one platform.",
    status: "Live",
    featured: true,
    tagline: "The OS for founder-led businesses.",
  },
  {
    slug: "hatsafe",
    name: "HatSafe",
    category: "Safety & Compliance",
    year: "2024",
    description:
      "Digital health and safety management for multi-site operations. Replaces paper-based compliance workflows with real-time audit trails.",
    status: "Live",
    featured: true,
    tagline: "Compliance without the clipboard.",
  },
  {
    slug: "love-warranty",
    name: "Love Warranty",
    category: "Warranty Management",
    year: "2023",
    description:
      "Warranty management platform for the motor trade. Live with 3 dealership groups. Claims, policies, and dealer onboarding in one place.",
    status: "Live",
    featured: false,
  },
  {
    slug: "dealer-engine",
    name: "Dealer Engine",
    category: "Automotive SaaS",
    year: "2024",
    description:
      "Dealer toolset for stock management, deal tracking, and customer communications. Built mobile-first for independent dealers.",
    status: "Live",
    featured: false,
  },
  {
    slug: "taskbox",
    name: "Taskbox",
    category: "Productivity SaaS",
    year: "2024",
    description:
      "Lightweight task management SaaS. Designed for speed-first teams who need focus, not feature bloat.",
    status: "Live",
    featured: false,
  },
  {
    slug: "security-app",
    name: "Security App",
    category: "Site Security",
    year: "2024",
    description:
      "Digital security management for multi-site operations. Replaces paper guard logs with real-time reporting and incident management.",
    status: "Live",
    featured: false,
  },
  {
    slug: "clarity-os",
    name: "Clarity OS",
    category: "Enterprise Operations",
    year: "2025",
    description:
      "Enterprise operations platform. Connects objectives, projects, and performance tracking for growing businesses.",
    status: "Live",
    featured: false,
  },
  {
    slug: "dealer-next",
    name: "Dealer Next",
    category: "Automotive",
    year: "2025",
    description:
      "Next-generation dealer toolset. Mobile-first, AI-assisted stock acquisition and deal management.",
    status: "In Build",
    featured: false,
  },
  {
    slug: "dgs",
    name: "DGS",
    category: "Data & Analytics",
    year: "2023",
    description:
      "Data gathering and segmentation platform. Enables large-scale outreach campaigns with pinpoint ICP targeting.",
    status: "Live",
    featured: false,
  },
  {
    slug: "claims-scanner",
    name: "Claims Scanner",
    category: "Warranty Tech",
    year: "2025",
    description:
      "AI-powered warranty claims assessment tool. Scans diagnostic PDFs, assesses claims against T&Cs, and generates email drafts automatically.",
    status: "In Build",
    featured: false,
  },
];

export const FEATURED_APPS = APPS.filter((a) => a.featured);
export const ALL_APPS = APPS;
