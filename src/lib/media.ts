// Photos and the tour video are served from public/media with the site itself (they used to
// live in a Supabase bucket, which broke the site when that free project was paused).
const MEDIA_BASE = "/media";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hollisterranch107.com";

export function photoUrl(slug: string, variant: "full" | "thumb" = "full") {
  return `${MEDIA_BASE}/photos/${variant}/${slug}.webp`;
}

export function videoUrl() {
  return `${MEDIA_BASE}/video/rancho-alegria-tour.mp4`;
}

/** Full https:// address for places that need one (sitemap, structured data). */
export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
