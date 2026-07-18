import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cream-line/70 bg-ocean-deep text-sand/90">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/70 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-bold text-sand">Rancho Alegria</p>
            <p className="mt-1 text-sm text-sand/60">Parcel 107, Hollister Ranch</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/70">
              113 private acres on one of the last undeveloped stretches of the
              California coast, on the Gaviota Coast north of Santa Barbara.
            </p>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold uppercase tracking-widest text-sand/50">Explore</p>
            <ul className="space-y-2 text-sand/80">
              <li><Link className="hover:text-terracotta" href="/rancho-alegria">The Property</Link></li>
              <li><Link className="hover:text-terracotta" href="/gallery">Photo Gallery</Link></li>
              <li><Link className="hover:text-terracotta" href="/history">History of the Ranch</Link></li>
              <li><Link className="hover:text-terracotta" href="/map">Map &amp; Access</Link></li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold uppercase tracking-widest text-sand/50">Rental Inquiries</p>
            <ul className="space-y-2 text-sand/80">
              <li>
                <a className="hover:text-terracotta" href="mailto:jeanetteclavin@yahoo.com">
                  jeanetteclavin@yahoo.com
                </a>
              </li>
              <li>
                <a className="hover:text-terracotta" href="tel:+13107101516">
                  Call or text 310-710-1516
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-sand/10 pt-6 text-xs text-sand/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Hollister Ranch is a private, gated community. This site describes Rancho
            Alegria, Parcel 107, and is not affiliated with the Hollister Ranch Owners&rsquo;
            Association.
          </p>
          <p className="whitespace-nowrap text-sand/30">&copy; {year} Rancho Alegria</p>
        </div>
      </div>
    </footer>
  );
}
