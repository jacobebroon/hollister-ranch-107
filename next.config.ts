import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90],
    // Photos are immutable per slug, so cache optimized variants for a year
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
