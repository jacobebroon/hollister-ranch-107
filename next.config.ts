import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    qualities: [75, 80, 85, 90],
    // Photos are immutable per slug, so cache optimized variants for a year
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
