"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Dict } from "@/i18n";

const ANCHORS = ["#top", "#property", "#gallery", "#history", "#map", "#contact"];

export default function Nav({ t, base = "" }: { t: Dict["nav"]; base?: string }) {
  const LINKS = ANCHORS.map((href, i) => ({ href, label: t.links[i] }));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [progress, setProgress] = useState(0);

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
      className={`sticky top-0 z-50 border-b bg-sand/90 backdrop-blur transition-shadow print:hidden ${
        scrolled ? "border-cream-line shadow-[0_1px_16px_-4px_rgba(36,28,20,0.15)]" : "border-cream-line/70"
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
            <span className="font-serif text-lg font-bold tracking-wide text-ink transition-colors group-hover:text-terracotta">
              Rancho Alegria
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ocean/70">
              {t.brandSub}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium tracking-wide text-ink/80 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={base + link.href}
                className={`group relative py-1 transition-colors hover:text-terracotta ${
                  isActive ? "text-terracotta" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-terracotta transition-transform duration-300 group-hover:scale-x-100 ${
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
            className="rounded-full border border-cream-line px-3 py-1 text-xs font-semibold tracking-widest text-ocean transition-colors hover:border-terracotta hover:text-terracotta"
          >
            {t.switchLabel}
          </a>
        </nav>

        <button
          className="-mr-2 grid h-11 w-11 place-items-center text-ink md:hidden"
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
        className={`grid overflow-hidden bg-sand transition-[grid-template-rows] duration-300 ease-out md:hidden ${
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
