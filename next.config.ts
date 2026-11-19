import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";
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
      { source: "/work/:slug((?!warrantyos$|taskbox$|govscape$|wilbolaw$)[^/]+)", destination: "/work", permanent: false },
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
    const year = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      {
        // Every response. The pages embed their own animations in frames, so framing is allowed from this site only.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=(), usb=(), microphone=(self)" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
        ],
      },
      {
        source: "/site/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      // Files whose address changes when their content does can be kept for a year: the bundled stylesheets
      // (hash in the name) and anything asked for with a ?v= fingerprint. Later rules win over the hour above.
      { source: "/site/css/:path*", headers: year },
      { source: "/site/:path*", has: [{ type: "query", key: "v" }], headers: year },
    ];
  },
};

// Sentry wraps the server routes so errors are sent before a request ends. No source maps are uploaded.
export default withSentryConfig(nextConfig, { silent: true, telemetry: false, sourcemaps: { disable: true } });
