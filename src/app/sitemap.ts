import type { MetadataRoute } from "next";
import { JOURNAL } from "@/lib/journal";

const BASE = "https://benjaminbrown.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1],
    ["/work", 0.9],
    ["/work/warrantyos", 0.8],
    ["/work/taskbox", 0.8],
    ["/work/govscape", 0.8],
    ["/method", 0.9],
    ["/discovery", 0.8],
    ["/journal", 0.6],
    ["/contact", 0.8],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: BASE + p, changeFrequency: "monthly" as const, priority })),
    ...JOURNAL.map((e) => ({ url: `${BASE}/journal/${e.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
