"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/rancho-alegria", label: "Rancho Alegria" },
  { href: "/gallery", label: "Gallery" },
  { href: "/history", label: "The Ranch" },
  { href: "/map", label: "Map & Access" },
  { href: "/contact", label: "Inquire" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cream-line/70 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg font-bold tracking-wide text-ink group-hover:text-terracotta transition-colors">
            Rancho Alegria
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ocean/70">
            Parcel 107 · Hollister Ranch
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium tracking-wide text-ink/80 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-terracotta ${
                pathname === link.href ? "text-terracotta" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-ink"
          aria-label="Toggle menu"
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-2.5 text-sm font-medium ${
                pathname === link.href ? "bg-sand-deep text-terracotta" : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
