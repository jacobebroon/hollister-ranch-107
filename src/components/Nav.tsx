"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#property", label: "Rancho Alegria" },
  { href: "#gallery", label: "Gallery" },
  { href: "#history", label: "The Ranch" },
  { href: "#map", label: "Map & Access" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
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
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
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
        <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
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
              Parcel 107 · Hollister Ranch
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium tracking-wide text-ink/80 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-terracotta ${
                  isActive ? "text-terracotta" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full bg-terracotta transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <button
          className="text-ink md:hidden"
          aria-label="Toggle menu"
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

      {open && (
        <nav className="flex flex-col gap-1 border-t border-cream-line/70 bg-sand px-5 pb-4 pt-2 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-2.5 text-sm font-medium ${
                active === link.href ? "bg-sand-deep text-terracotta" : "text-ink/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
        <div
          className="h-full bg-terracotta transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
