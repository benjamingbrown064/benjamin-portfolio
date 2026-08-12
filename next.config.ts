import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables React's <ViewTransition> during route navigation, which drives
    // the work-card -> case-study hero morph.
    viewTransition: true,
  },
};

export default nextConfig;
