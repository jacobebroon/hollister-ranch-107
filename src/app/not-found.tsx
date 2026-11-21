import Link from "next/link";
import Photo from "@/components/Photo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import en from "@/i18n/en";

export default function NotFound() {
  return (
    <>
    <Nav t={en.nav} base="/" />
    <main className="flex-1">
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <Photo
        slug="img-20150119-123532632"
        alt="Fog over Hollister Ranch's coastal hills"
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative z-10 px-5 text-center text-sand">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/70">
          Off the Map
        </p>
        <h1 className="mt-4 font-serif text-5xl font-bold sm:text-6xl">404</h1>
        <p className="mx-auto mt-4 max-w-md text-sand/80">
          This page has wandered further than the ranch road goes. Let&rsquo;s
          get you back to solid ground.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-sand shadow-lg transition-colors hover:bg-terracotta-deep"
        >
          Return Home
        </Link>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-sand/80">
          <Link href="/#story" className="underline-offset-4 hover:text-sand hover:underline">Our Story</Link>
          <Link href="/#memories" className="underline-offset-4 hover:text-sand hover:underline">Family Photos</Link>
          <Link href="/#gallery" className="underline-offset-4 hover:text-sand hover:underline">Gallery</Link>
          <Link href="/es" hrefLang="es" lang="es" className="underline-offset-4 hover:text-sand hover:underline">Volver al inicio en español</Link>
        </div>
      </div>
    </div>
    </main>
    <Footer t={en.footer} base="/" />
    </>
  );
}
