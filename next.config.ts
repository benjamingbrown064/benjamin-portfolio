import type { NextConfig } from "next";
import { JOURNAL } from "./src/lib/journal";

const nextConfig: NextConfig = {
  // Files read at run time by the page renderer and the assistant.
  outputFileTracingIncludes: {
    "/api/chat": ["./site/assistant.md", "./site/pages/*.html"],
    "/api/voice/llm/chat/completions": ["./site/assistant.md", "./site/pages/*.html"],
    "/api/voice/llm": ["./site/assistant.md", "./site/pages/*.html"],
    "/api/voice/call": ["./site/assistant.md", "./site/pages/*.html"],
  },
  async redirects() {
    return [
      // One address for the site: www goes to the bare domain, so search engines and analytics see a single site.
      { source: "/:path*", has: [{ type: "host", value: "www.benjaminbrown.co" }], destination: "https://benjaminbrown.co/:path*", permanent: true },
      // Addresses from the previous site. Case studies that exist keep their address; the rest and the
      // old journal entries land on the nearest index page instead of a 404.
      { source: "/services", destination: "/method", permanent: true },
      { source: "/work/:slug((?!warrantyos$|taskbox$|govscape$)[^/]+)", destination: "/work", permanent: false },
      // Real entries are left alone; every other /journal/... address (the old site's entries) goes to the index.
      { source: `/journal/:slug((?!(?:${JOURNAL.map((e) => e.slug).join("|") || "-"})$).*)`, destination: "/journal", permanent: false },
      // The journal has never lived at /blog, but people type it and old links use it.
      // The share picture used to be generated at this address; anything still pointing at it gets the new one.
      { source: "/opengraph-image", destination: "/og/site.jpg", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:path*", destination: "/journal", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/site/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
