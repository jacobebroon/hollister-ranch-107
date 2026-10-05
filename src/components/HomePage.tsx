import { Suspense } from "react";
import { featuredSlugs, heroSlug, type Photo as PhotoT } from "@/data/photos";
import { getDict, localizedPhotos, type Dict, type Lang } from "@/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PhotoTour, { TourTrigger } from "@/components/PhotoTour";
import EstateExplorer from "@/components/EstateExplorer";
import MapEmbed from "@/components/MapEmbed";
import { ESTATE_SLUGS } from "@/data/estate";
import Photo from "@/components/Photo";
import StatBar from "@/components/StatBar";
import VideoPlayer from "@/components/VideoPlayer";
import Gallery from "@/components/Gallery";
import Terrain3D from "@/components/Terrain3DLazy";
import LazyMount from "@/components/LazyMount";
import Conditions from "@/components/Conditions";
import DistanceFinder from "@/components/DistanceFinder";
import TiltCard from "@/components/TiltCard";
import TimelineRail from "@/components/TimelineRail";
import FaqItem from "@/components/FaqItem";
import SpotlightCard from "@/components/SpotlightCard";
import ParallaxLayer from "@/components/ParallaxLayer";
import Reveal from "@/components/Reveal";
import { SURF_BREAKS, PROPERTY } from "@/data/surf";
import { photoUrl, videoUrl } from "@/lib/media";
import {
  IconLand,
  IconEye,
  IconGate,
  IconWave,
  IconHome,
  IconMoon,
  IconTennis,
  IconCompass,
  IconMail,
  IconPhone,
  IconWhale,
  IconFlower,
  IconTrail,
  IconGuestHome,
  IconHotTub,
  IconBird,
  IconPaw,
  IconShell,
} from "@/components/icons";

const ADVANTAGE_ICONS = [
  IconLand,
  IconEye,
  IconGate,
  IconWave,
  IconWave,
  IconHome,
  IconMoon,
  IconTennis,
  IconGuestHome,
  IconHotTub,
  IconTrail,
];

const HIGHLIGHTS = [
  "162",
  "167",
  "157",
  "img-0602",
  "1000002157",
  "img-20150118-173149189",
  "ranch-020",
  "1000002822",
  "1000003478",
];

const WILDLIFE_ICONS = [IconBird, IconPaw, IconFlower, IconShell];

const SEASON_META = [
  { icon: IconWave, startMonth: 12, endMonth: 2 },
  { icon: IconWave, startMonth: 5, endMonth: 9 },
  { icon: IconWhale, startMonth: 12, endMonth: 5 },
  { icon: IconFlower, startMonth: 3, endMonth: 5 },
];

function isCurrentSeason(startMonth: number, endMonth: number) {
  const now = new Date().getMonth() + 1;
  return startMonth <= endMonth ? now >= startMonth && now <= endMonth : now >= startMonth || now <= endMonth;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hollisterranch107.com";

function buildJsonLd(t: Dict, localPhotos: PhotoT[]) {
  const pageUrl = new URL(t.homePath, SITE_URL).toString();
  const place = {
    "@context": "https://schema.org",
    "@type": ["Place", "LandmarksOrHistoricalBuildings"],
    "@id": `${SITE_URL}/#place`,
    name: "Hollister Ranch 107 — Rancho Alegria",
    alternateName: ["Rancho Alegria", "Hollister Ranch Parcel 107", "107 Hollister Ranch", "HR 107"],
    url: pageUrl,
    description: t.schema.placeDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "107 Hollister Ranch Rd",
      addressLocality: "Gaviota",
      addressRegion: "CA",
      postalCode: "93117",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: PROPERTY.center[1],
      longitude: PROPERTY.center[0],
    },
    containedInPlace: {
      "@type": "Place",
      name: "Hollister Ranch",
      address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
    },
    publicAccess: false,
    amenityFeature: t.schema.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Acreage", value: 113, unitText: "acres" },
      { "@type": "PropertyValue", name: "Parcel", value: "107" },
      { "@type": "PropertyValue", name: "Established", value: "1987" },
    ],
    photo: localPhotos.slice(0, 12).map((p) => ({
      "@type": "ImageObject",
      contentUrl: photoUrl(p.slug),
      ...(p.caption ? { caption: p.caption } : {}),
    })),
  };
  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: t.schema.videoName,
    description: t.schema.videoDescription,
    inLanguage: "en",
    thumbnailUrl: [`${SITE_URL}/og/share.jpg`, photoUrl("ranch-004")],
    contentUrl: videoUrl(),
    uploadDate: "2026-07-18T00:00:00-07:00",
    duration: "PT4M26S",
    contentLocation: { "@id": `${SITE_URL}/#place` },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.htmlLang,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return [place, video, faq];
}

export default function HomePage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const photos = localizedPhotos(t);
  const featuredPhotos = featuredSlugs
    .map((slug) => photos.find((p) => p.slug === slug))
    .filter((p): p is PhotoT => Boolean(p));

  return (
    <div lang={t.htmlLang} className="flex min-h-full flex-col">
      {buildJsonLd(t, photos).map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-terracotta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-sand"
      >
        {lang === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <Nav t={t.nav} />
      <main id="main-content" className="flex-1">
      {/* Hero */}
      <section id="top" className="relative flex min-h-[92vh] scroll-mt-24 items-end overflow-hidden">
        <Photo
          slug={heroSlug}
          alt={t.hero.imageAlt}
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 text-sand sm:px-8 sm:pb-24">
          <h1 className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
              {t.hero.eyebrow}
            </span>
            <span className="mt-4 block text-balance font-serif text-5xl font-bold leading-[1.05] drop-shadow-sm sm:text-7xl">
              Rancho Alegria
            </span>
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-xl text-lg text-sand/85 sm:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.tagline}
          </p>

          <div
            className="animate-fade-up mt-6 flex flex-wrap gap-2"
            style={{ animationDelay: "0.25s" }}
          >
            {t.hero.facts.map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-sand/30 bg-ink/20 px-3 py-1 text-xs font-medium text-sand/90 backdrop-blur-sm"
              >
                {fact}
              </span>
            ))}
          </div>

          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.35s" }}
          >
            <a
              href="#property"
              className="btn-shine group rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-sand shadow-lg transition-colors hover:bg-terracotta-deep"
            >
              {t.hero.ctaPrimary}
              <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <TourTrigger
              label={t.hero.ctaTour}
              className="flex items-center gap-2 rounded-full border border-sand/50 bg-ink/20 px-6 py-3 text-sm font-semibold text-sand backdrop-blur transition-colors hover:bg-sand/15"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
              {t.hero.ctaTour}
            </TourTrigger>
            <a
              href="#gallery"
              className="hidden rounded-full px-4 py-3 text-sm font-semibold text-sand/85 underline-offset-4 transition-colors hover:text-sand hover:underline sm:inline-block"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <a
          href="#video"
          aria-label={t.hero.scrollAria}
          className="animate-bob absolute bottom-14 left-1/2 z-10 hidden -translate-x-1/2 text-sand/70 transition-colors hover:text-sand sm:bottom-20 sm:block"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-10 w-full text-sand sm:h-14"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      {/* Video */}
      <section id="video" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
            {t.video.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            {t.video.title}
          </h2>
        </Reveal>
        <Reveal delay={100} className="print:hidden">
          <VideoPlayer posterSlug="ranch-004" t={t.video} />
          <p className="mt-3 text-center text-sm text-ink/50">
            {t.video.caption}
          </p>
        </Reveal>
      </section>

      {/* Live conditions */}
      <section id="conditions" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8 print:hidden">
        <Reveal>
          <Suspense fallback={<ConditionsFallback />}>
            <Conditions t={t.conditions} />
          </Suspense>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <StatBar labels={t.stats} />
        </Reveal>
      </section>

      {/* Intro */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
              {t.intro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.intro.title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-4 text-ink/75 leading-relaxed">
            <p>{t.intro.p1}</p>
            <p>{t.intro.p2}</p>
            <a
              href="#history"
              className="inline-block font-semibold text-ocean underline decoration-terracotta decoration-2 underline-offset-4 hover:text-ocean-deep"
            >
              {t.intro.link}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Property */}
      <section id="property" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
            {t.property.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            {t.property.title}
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">{t.property.p1}</p>
          <p className="mt-4 leading-relaxed text-ink/75">{t.property.p2}</p>
          <p className="mt-4 leading-relaxed text-ink/75">{t.property.p3}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.property.advantages.map((a, i) => {
            const Icon = ADVANTAGE_ICONS[i];
            return (
            <Reveal key={a.title} delay={i * 80}>
              <SpotlightCard className="rounded-2xl border border-cream-line bg-sand-deep/40 p-6 transition-shadow hover:shadow-md">
                <div className="relative z-10">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta icon-badge">
                    <Icon />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{a.body}</p>
                </div>
              </SpotlightCard>
            </Reveal>
            );
          })}
        </div>

        <Reveal className="mb-6 mt-20 flex items-end justify-between">
          <h3 className="font-serif text-3xl font-bold text-ink sm:text-4xl">{t.property.insideOut}</h3>
          <a href="#gallery" className="hidden text-sm font-semibold text-ocean hover:text-ocean-deep sm:block">
            {t.property.viewGallery}
          </a>
        </Reveal>
        <Reveal delay={120} className="grid gap-3 sm:grid-cols-3">
          {HIGHLIGHTS.map((slug) => {
            const caption = photos.find((p) => p.slug === slug)?.caption;
            return (
              <a
                key={slug}
                href="#gallery"
                aria-label={caption ? `${t.property.viewInGallery}: ${caption}` : t.property.viewInGallery}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Photo
                  slug={slug}
                  variant="thumb"
                  alt={caption ?? t.property.fallbackAlt}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            );
          })}
        </Reveal>
      </section>

      {/* The Clavin family story */}
      <section id="story" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">{t.story.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">{t.story.title}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
              {t.story.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "drop-cap text-lg text-ink/80" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Photo slug="img-0604" variant="thumb" alt={t.story.photoAlt} sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Photo slug="ranch-027" variant="thumb" alt={t.story.courtAlt} sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-cream-line bg-sand-deep/40 p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-bold text-ink">{t.story.timelineTitle}</h3>
              <ol className="relative mt-6 space-y-7 border-l-2 border-terracotta/30 pl-6">
                {t.story.timeline.map((m) => (
                  <li key={m.year} className="relative">
                    <span className="absolute -left-[2.05rem] top-1 h-3.5 w-3.5 rounded-full bg-terracotta ring-4 ring-sand-deep" aria-hidden="true" />
                    <p className="font-serif text-xl font-bold text-terracotta">{m.year}</p>
                    <p className="mt-0.5 font-semibold text-ink">{m.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">{m.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-6 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">{t.story.builderEyebrow}</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-ink">{t.story.builderName}</h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/75">
                {t.story.builderBio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive estate guide */}
      <section id="estate" className="scroll-mt-24 border-t border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
              {t.estate.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">{t.estate.title}</h2>
            <p className="mt-4 leading-relaxed text-ink/70">{t.estate.intro}</p>
          </Reveal>
          <Reveal delay={100}>
            <EstateExplorer t={t.estate} photos={photos.filter((p) => ESTATE_SLUGS.has(p.slug))} />
          </Reveal>
        </div>
      </section>

      {/* Featured teaser grid */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal delay={120} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {featuredPhotos.slice(0, 8).map((photo, i) => (
              <a
                key={photo.slug}
                href="#gallery"
                aria-label={photo.caption ? `${t.property.viewInGallery}: ${photo.caption}` : t.property.viewInGallery}
                className={`group relative block overflow-hidden rounded-xl bg-sand-deep ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Photo
                  slug={photo.slug}
                  variant="thumb"
                  alt={photo.caption ?? t.property.fallbackAlt}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
          {t.gallery.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
          {t.gallery.title}
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70">{t.gallery.intro}</p>

        <div className="mt-10">
          <Gallery photos={photos} t={t.gallery} fallbackAlt={t.property.fallbackAlt} />
        </div>
      </section>

      {/* History */}
      <section id="history" className="scroll-mt-24 border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
              {t.history.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
              {t.history.title}
            </h2>
            <p className="drop-cap mt-6 text-lg leading-relaxed text-ink/80">{t.history.lead}</p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <TimelineRail>
            {t.history.timeline.map((item, i) => (
              <li key={item.title} className="mb-12 last:mb-0">
                <Reveal delay={i * 60}>
                  <div className="absolute -ml-[2.35rem] mt-1.5 h-3 w-3 rounded-full bg-terracotta ring-4 ring-sand" />
                  <p className="text-sm font-bold uppercase tracking-widest text-terracotta">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-ink sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </TimelineRail>
        </div>

        {/* Surf culture */}
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <ParallaxLayer>
                <Photo
                  slug="ranch-001"
                  alt={t.history.surfPhotoAlt}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </ParallaxLayer>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
                {t.history.surfEyebrow}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
                {t.history.surfTitle}
              </h3>
              <p className="mt-4 leading-relaxed text-ink/75">{t.history.surfBody}</p>
            </Reveal>
          </div>

          <Reveal delay={100} className="mt-16 max-w-3xl">
            <h3 className="font-serif text-2xl font-bold text-ink">
              {t.history.shortboardTitle}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/75">{t.history.shortboardBody}</p>
            <p className="pull-quote mt-6">{t.history.pullQuote}</p>
          </Reveal>

          <Reveal delay={80} className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-ink">
              {t.history.breaksTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-ink/70">{t.history.breaksIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SURF_BREAKS.map((b, i) => (
                <div key={b.name}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-serif text-lg font-bold text-ink">{b.name}</p>
                    <p className="whitespace-nowrap rounded-full bg-terracotta/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-terracotta">
                      {t.terrain.breaks[i]?.swell ?? b.swell}
                    </p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{t.terrain.breaks[i]?.note ?? b.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-16 max-w-3xl">
            <h3 className="font-serif text-2xl font-bold text-ink">
              {t.history.accessTitle}
            </h3>
            <div className="mt-3 space-y-4 leading-relaxed text-ink/75">
              <p>{t.history.access1}</p>
              <p>{t.history.access2}</p>
            </div>
          </Reveal>
        </div>

        {/* Conservation & wildlife */}
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
              {t.history.consEyebrow}
            </p>
            <h3 className="mt-3 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              {t.history.consTitle}
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">{t.history.cons1}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">{t.history.cons2}</p>
          </Reveal>

          <Reveal delay={60} className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-lg">
            <ParallaxLayer strength={20}>
              <Photo
                slug="1000002820"
                alt={t.history.cattleAlt}
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            </ParallaxLayer>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {t.history.wildlife.map((w, i) => {
              const Icon = WILDLIFE_ICONS[i];
              return (
              <Reveal key={w.title} delay={i * 70}>
                <SpotlightCard className="h-full rounded-2xl border border-cream-line bg-sand-deep/40 p-6 transition-shadow hover:shadow-md">
                  <div className="relative z-10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta icon-badge">
                      <Icon />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/70">{w.body}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
              );
            })}
          </div>

          <Reveal delay={280} className="mt-12 max-w-2xl leading-relaxed text-ink/75">
            <p>{t.history.tidepool}</p>
          </Reveal>
        </div>
      </section>

      {/* Best time to visit */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
            {t.seasons.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            {t.seasons.title}
          </h2>
          <p className="mt-4 leading-relaxed text-ink/70">{t.seasons.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.seasons.items.map((s, i) => {
            const meta = SEASON_META[i];
            const Icon = meta.icon;
            const isNow = isCurrentSeason(meta.startMonth, meta.endMonth);
            return (
              <Reveal key={s.title} delay={i * 80}>
                <SpotlightCard
                  className={`relative h-full rounded-2xl border p-6 transition-shadow hover:shadow-md ${
                    isNow ? "border-terracotta bg-terracotta/5" : "border-cream-line bg-sand-deep/40"
                  }`}
                >
                  {isNow && (
                    <span className="absolute -top-2.5 right-5 z-10 rounded-full bg-terracotta px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-sand shadow-sm">
                      {t.seasons.now}
                    </span>
                  )}
                  <div className="relative z-10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta icon-badge">
                      <Icon />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
                      {s.months}
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.body}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Map & Access */}
      <section id="map" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 sm:px-8">
        <Reveal>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconCompass />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
            {t.map.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
            {t.map.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">{t.map.body}</p>
        </Reveal>
        <Reveal delay={80} className="mt-6 print:hidden">
          <DistanceFinder t={t.distance} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 print:hidden">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
            {t.map.terrainEyebrow}
          </p>
          <h3 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
            {t.map.terrainTitle}
          </h3>
          <p className="mt-4 max-w-2xl text-ink/70">{t.map.terrainBody}</p>
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <LazyMount fallback={<TerrainFallback label={t.map.loadingTerrain} />}>
            <Terrain3D t={t.terrain} />
          </LazyMount>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/60">
            <span className="flex items-center gap-2">
              <span className="legend-dot h-2.5 w-2.5 rounded-full bg-gold text-gold ring-2 ring-gold/30" /> {t.map.legend.property}
            </span>
            <span className="flex items-center gap-2">
              <span className="legend-dot h-2.5 w-2.5 rounded-full bg-terracotta text-terracotta" /> {t.map.legend.surf}
            </span>
            <span className="flex items-center gap-2">
              <span className="legend-dot h-2.5 w-2.5 rounded-full bg-ocean text-ocean" /> {t.map.legend.landmark}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Reveal className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.map.distances.map((d) => (
            <div key={d.label} className="rounded-xl border border-cream-line bg-sand-deep/40 px-4 py-3 text-center">
              <p className="font-serif text-xl font-bold text-terracotta">{d.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">{d.label}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="print:hidden">
          <MapEmbed
            title={t.map.iframeTitle}
            src={`https://www.google.com/maps?q=${PROPERTY.center[1]},${PROPERTY.center[0]}&z=14&hl=${lang}&output=embed`}
            label={t.map.showMap}
            posterAlt={t.map.aerialAlt1}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
            <p>{t.map.approx}</p>
            <a
              href="https://earth.google.com/web/search/Point+Conception,+California"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ocean hover:text-ocean-deep"
            >
              {t.map.earth}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
              {t.map.aboveEyebrow}
            </p>
            <h3 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              {t.map.aboveTitle}
            </h3>
            <p className="mt-4 max-w-2xl text-ink/70">{t.map.aboveBody}</p>
          </Reveal>

          <Reveal delay={120} className="mt-12 grid gap-8 sm:grid-cols-2">
            <TiltCard slug="ranch-004" alt={t.map.aerialAlt1} />
            <TiltCard slug="dsc-0067" alt={t.map.aerialAlt2} />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24">
        <div className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden">
          <Photo
            slug="img-20150118-173149189"
            alt={t.contact.sunsetAlt}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 text-sand sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">{t.contact.title}</h2>
          </div>

          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-10 w-full text-sand sm:h-14"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M0,48 C240,16 480,64 720,32 C960,0 1200,80 1440,32 L1440,80 L0,80 Z"
            />
          </svg>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <Reveal>
            <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              {t.contact.reachTitle}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">{t.contact.reachBody}</p>

            <div className="mt-8 space-y-4">
              <SpotlightCard className="rounded-xl border border-cream-line bg-sand-deep/50 transition-colors hover:border-terracotta">
                <a
                  href="mailto:jeanetteclavin@yahoo.com"
                  className="relative z-10 flex items-center gap-4 px-6 py-5"
                >
                  <span className="icon-badge flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                    <IconMail />
                  </span>
                  <span>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.contact.email}</p>
                    <p className="mt-1 font-serif text-xl font-bold text-ink">jeanetteclavin@yahoo.com</p>
                  </span>
                </a>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl border border-cream-line bg-sand-deep/50 transition-colors hover:border-terracotta">
                <a href="tel:+13107101516" className="relative z-10 flex items-center gap-4 px-6 py-5">
                  <span className="icon-badge flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                    <IconPhone />
                  </span>
                  <span>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.contact.callOrText}</p>
                    <p className="mt-1 font-serif text-xl font-bold text-ink">310-710-1516</p>
                  </span>
                </a>
              </SpotlightCard>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">{t.contact.aboutTitle}</h3>
            <ul className="mt-4 space-y-4">
              {t.contact.expect.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink/75">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="border-t border-cream-line bg-sand-deep/40">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient-gold">
                {t.faq.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
                {t.faq.title}
              </h3>
            </Reveal>
            <div className="mt-10 space-y-6">
              {t.faq.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 70}>
                  <FaqItem q={item.q} a={item.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer t={t.footer} />
      <BackToTop label={t.footer.backToTop} />
      <PhotoTour photos={photos.map((p) => ({ ...p, blurDataURL: undefined }))} t={t.tour} />
    </div>
  );
}

function ConditionsFallback() {
  return (
    <div className="skeleton-shimmer h-[220px] rounded-2xl border border-cream-line bg-sand-deep/40" />
  );
}

function TerrainFallback({ label }: { label: string }) {
  return (
    <div className="skeleton-shimmer flex h-[480px] w-full items-center justify-center rounded-2xl border border-cream-line bg-sand-deep sm:h-[620px]">
      <p className="text-sm text-ink/40">{label}</p>
    </div>
  );
}
