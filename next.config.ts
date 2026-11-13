import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Files read at run time by the page renderer and the assistant.
  outputFileTracingIncludes: {
    "/api/chat": ["./site/assistant.md"],
  },
  async redirects() {
    return [
      // Addresses from the previous site. Case studies that exist keep their address; the rest and the
      // old journal entries land on the nearest index page instead of a 404.
      { source: "/services", destination: "/method", permanent: true },
      { source: "/work/:slug((?!warrantyos$|taskbox$|govscape$)[^/]+)", destination: "/work", permanent: false },
      { source: "/journal/:slug", destination: "/journal", permanent: false },
      // The journal has never lived at /blog, but people type it and old links use it.
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
