import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Addresses from the previous site. Case studies that exist keep their address; the rest and the
      // old journal entries land on the nearest index page instead of a 404.
      { source: "/services", destination: "/method", permanent: true },
      { source: "/work/:slug((?!warrantyos$|taskbox$|govscape$)[^/]+)", destination: "/work", permanent: false },
      { source: "/journal/:slug", destination: "/journal", permanent: false },
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
