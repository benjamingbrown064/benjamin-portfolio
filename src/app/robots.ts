import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://benjaminbrown.co/sitemap.xml",
    host: "https://benjaminbrown.co",
  };
}
