const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "/media-preview";

export function photoUrl(slug: string, variant: "full" | "thumb" = "full") {
  return `${MEDIA_BASE}/photos/${variant}/${slug}.webp`;
}

export function videoUrl() {
  return `${MEDIA_BASE}/video/rancho-alegria-tour.mp4`;
}

