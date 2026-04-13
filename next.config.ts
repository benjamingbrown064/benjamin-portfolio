import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX support — configured in Phase 5
  experimental: {
    // mdxRs: true, // enable in Phase 5
  },
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
