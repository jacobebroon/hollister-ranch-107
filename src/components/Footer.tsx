import Image from "next/image";
import type { Dict } from "@/i18n";

const ANCHORS = ["#property", "#gallery", "#history", "#map"];

export default function Footer({ t, base = "" }: { t: Dict["footer"]; base?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cream-line/70 bg-ocean-deep text-sand/90">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/70 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/brand/crest.png" alt="" width={44} height={44} className="rounded-full" />
              <div>
                <p className="font-serif text-xl font-bold text-sand">Rancho Alegria</p>
                <p className="text-sm text-sand/60">{t.sub}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/70">
              {t.blurb}
            </p>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold uppercase tracking-widest text-sand/50">{t.explore}</p>
            <ul className="text-sand/80 md:space-y-2">
              {ANCHORS.map((href, i) => (
                <li key={href}>
                  <a className="link-sweep inline-block py-2 hover:text-terracotta md:py-0" href={base + href}>
                    {t.links[i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold uppercase tracking-widest text-sand/50">{t.contact}</p>
            <ul className="text-sand/80 md:space-y-2">
              <li>
                <a className="link-sweep inline-block py-2 hover:text-terracotta md:py-0" href="mailto:jeanetteclavin@yahoo.com">
                  jeanetteclavin@yahoo.com
                </a>
              </li>
              <li>
                <a className="link-sweep inline-block py-2 hover:text-terracotta md:py-0" href="tel:+13107101516">
                  {t.callText} 310-710-1516
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-sand/10 pt-6 text-xs text-sand/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.disclaimer}</p>
          <p className="flex items-center gap-4 whitespace-nowrap text-sand/30">
            <a href={t.switchHref} hrefLang={t.switchLang} className="text-sand/60 underline-offset-4 hover:text-sand hover:underline">
              {t.switchName}
            </a>
            &copy; {year} Rancho Alegria
          </p>
        </div>
      </div>
    </footer>
  );
}
