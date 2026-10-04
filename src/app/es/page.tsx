import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import es from "@/i18n/es";

export const metadata: Metadata = {
  title: { absolute: es.meta.title },
  description: es.meta.description,
  alternates: {
    canonical: "/es",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
  openGraph: {
    title: es.meta.title,
    description: es.meta.description,
    url: "/es",
    siteName: "Hollister Ranch 107",
    type: "website",
    images: [{ url: "/og/share.jpg", width: 1200, height: 630, alt: es.meta.title }],
    locale: es.ogLocale,
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/share.jpg"],
    title: es.meta.title,
    description: es.meta.description,
  },
};

export default function HomeEs() {
  return <HomePage lang="es" />;
}
