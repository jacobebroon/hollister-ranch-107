import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90],
    // Fewer candidate widths keeps every srcset (and the page) smaller; these still cover phones to 4K
    deviceSizes: [640, 828, 1200, 1920, 2560],
    imageSizes: [96, 256, 384],
    // Photos are immutable per slug, so cache optimized variants for a year
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Photos, the tour video, and share images rarely change: let browsers and the CDN keep
        // them for 30 days (serving the cached copy while checking for a newer one after that)
        source: "/:dir(media|og|brand)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
