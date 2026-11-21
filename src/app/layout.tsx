import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { preconnect } from "react-dom";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hollisterranch107.com";
const TITLE = "Hollister Ranch 107 — Rancho Alegria, the Clavin Family Ranch";
const DESCRIPTION =
  "Rancho Alegria, Hollister Ranch Parcel 107: the bluff-top ranch on California's Gaviota Coast that Harold and Jeanette Clavin built from the ground up in 1987 — its story, family photos, and history, above Razor Blades.";
const SHARE_IMAGE = { url: "/og/share.jpg", width: 1200, height: 630, alt: TITLE };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Hollister Ranch 107",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
  openGraph: {
    url: "/",
    images: [SHARE_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Hollister Ranch 107",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#ad4f28",
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Hollister Ranch 107 — Rancho Alegria",
  alternateName: "Rancho Alegria",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/crest.png`,
};

// Tells Google which name to show for the site in search results
const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Hollister Ranch 107",
  alternateName: ["Rancho Alegria", "hollisterranch107.com"],
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#org` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Map tiles (satellite imagery + elevation) come from these hosts
  preconnect("https://server.arcgisonline.com", { crossOrigin: "anonymous" });
  preconnect("https://s3.amazonaws.com", { crossOrigin: "anonymous" });
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand text-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
