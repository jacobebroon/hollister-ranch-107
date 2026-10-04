import type { MetadataRoute } from "next";
import { photos } from "@/data/photos";
import { photoUrl, videoUrl } from "@/lib/media";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hollisterranch107.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: photos.map((p) => photoUrl(p.slug)),
      videos: [
        {
          title: "Rancho Alegria property tour — Hollister Ranch 107",
          thumbnail_loc: `${SITE_URL}/og/share.jpg`,
          description: "A video tour of Rancho Alegria, Parcel 107 of Hollister Ranch on California's Gaviota Coast.",
          content_loc: videoUrl(),
          duration: 266,
        },
      ],
    },
  ];
}
