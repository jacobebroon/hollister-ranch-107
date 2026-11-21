"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Dict } from "@/i18n";

const ANCHORS = ["#top", "#story", "#memories", "#gallery", "#history", "#contact"];

export default function Nav({
  t,
  base = "",
  overHero = false,
}: {
  t: Dict["nav"];
  base?: string;
  /** Float over a full-bleed hero, see-through until the page scrolls */
  overHero?: boolean;
}) {
  const LINKS = ANCHORS.map((href, i) => ({ href, label: t.links[i] }));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [progress, setProgress] = useState(0);
  const clear = overHero && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Sections far down the page render lazily (content-visibility), so their heights settle a
  // moment after a jump. Re-align on the target a few times so in-page links land exactly.
  useEffect(() => {
    // Runs once the (smooth) scroll has finished, so it never fights the animation
    const settle = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      // Late-rendering sections above can still shift the target, so re-check until it
      // holds still; any wheel, touch, or key from the visitor ends the correction
      let stable = 0;
      let cancelled = false;
      const cancel = () => (cancelled = true);
      window.addEventListener("wheel", cancel, { once: true, passive: true });
      window.addEventListener("touchstart", cancel, { once: true, passive: true });
      window.addEventListener("keydown", cancel, { once: true });
      const align = (tries: number) => {
        if (cancelled) return;
        const offset = el.getBoundingClientRect().top - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
        if (Math.abs(offset) > 4) {
          stable = 0;
          window.scrollBy({ top: offset, behavior: "instant" as ScrollBehavior });
        } else stable += 1;
        if (tries > 0 && stable < 3) window.setTimeout(() => align(tries - 1), 220);
      };
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        window.removeEventListener("scrollend", finish);
        align(14);
      };
      window.addEventListener("scrollend", finish, { once: true });
      window.setTimeout(finish, 2500); // browsers without scrollend
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href*=\"#\"]") as HTMLAnchorElement | null;
      if (!a || a.pathname !== window.location.pathname || !a.hash) return;
      settle(decodeURIComponent(a.hash.slice(1)));
    };
    document.addEventListener("click", onClick);
    if (window.location.hash) settle(decodeURIComponent(window.location.hash.slice(1)));
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const sections = ANCHORS.map((href) => document.getElementById(href.slice(1))).filter(
      (el): el is HTMLElement => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`${overHero ? "fixed inset-x-0" : "sticky"} top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 print:hidden ${
        clear
          ? "border-transparent bg-transparent [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]"
          : `bg-sand/90 backdrop-blur ${scrolled ? "border-cream-line shadow-[0_1px_16px_-4px_rgba(36,28,20,0.15)]" : "border-cream-line/70"}`
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={`${base}#top`} className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/crest.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="flex flex-col leading-none">
            <span className={`font-serif text-lg font-bold tracking-wide transition-colors group-hover:text-terracotta ${clear ? "text-sand" : "text-ink"}`}>
              Rancho Alegria
            </span>
            <span className={`text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${clear ? "text-sand/80" : "text-ocean/70"}`}>
              {t.brandSub}
            </span>
          </span>
        </a>

        <nav className={`hidden items-center gap-7 text-sm font-medium tracking-wide transition-colors md:flex ${clear ? "text-sand/90" : "text-ink/80"}`}>
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={base + link.href}
                className={`group relative py-1 transition-colors ${clear ? "hover:text-white" : "hover:text-terracotta"} ${
                  isActive ? (clear ? "text-white" : "text-terracotta") : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left ${clear ? "bg-sand" : "bg-terracotta"} transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href={t.switchHref}
            hrefLang={t.switchLabel.toLowerCase()}
            aria-label={t.switchAria}
            className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-widest transition-colors ${
              clear ? "border-sand/45 text-sand hover:border-sand" : "border-cream-line text-ocean hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {t.switchLabel}
          </a>
        </nav>

        <button
          className={`-mr-2 grid h-11 w-11 place-items-center transition-colors md:hidden ${clear ? "text-sand" : "text-ink"}`}
          aria-label={t.toggleMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={`grid overflow-hidden bg-sand bg-clip-padding transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr] border-t border-cream-line/70" : "grid-rows-[0fr] border-t border-transparent"
        }`}
      >
        {/* Padding lives on an inner element so the collapsed row is truly 0px tall */}
        <div className="min-h-0">
        <nav className="flex flex-col gap-1 px-5 pb-4 pt-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={base + link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-2.5 text-sm font-medium ${
                active === link.href ? "bg-sand-deep text-terracotta" : "text-ink/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={t.switchHref}
            hrefLang={t.switchLabel.toLowerCase()}
            tabIndex={open ? 0 : -1}
            className="mt-1 flex items-center justify-between rounded-md border border-cream-line px-2 py-2.5 text-sm font-semibold text-ocean"
          >
            {t.switchName}
            <span className="text-xs tracking-widest text-ink/50">{t.switchLabel}</span>
          </a>
        </nav>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
        <div
          className="h-full bg-terracotta transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
