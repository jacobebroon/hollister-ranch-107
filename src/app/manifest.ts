import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hollister Ranch 107 — Rancho Alegria",
    short_name: "Rancho Alegria",
    description:
      "Rancho Alegria, Parcel 107 of Hollister Ranch: 113 bluff-top acres on California's Gaviota Coast, built by Harold and Jeanette Clavin.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f4ea",
    theme_color: "#ad4f28",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
