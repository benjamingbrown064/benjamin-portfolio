import type { MetadataRoute } from "next";
import { PROJECT_ORDER } from "@/lib/projects";
import { JOURNAL_ORDER } from "@/lib/journal";

const BASE = "https://benjaminbrown.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/journal`, changeFrequency: "monthly", priority: 0.7 },
    ...PROJECT_ORDER.map((slug) => ({
      url: `${BASE}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...JOURNAL_ORDER.map((slug) => ({
      url: `${BASE}/journal/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
