"use client";

import { useState } from "react";

export default function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cream-line pb-6 last:border-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group -mx-2 flex w-full items-center justify-between gap-4 rounded-lg px-2 py-1 text-left transition-colors hover:bg-terracotta/5"
      >
        <h4 className="font-serif text-lg font-bold text-ink transition-colors group-hover:text-terracotta">{q}</h4>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`flex-shrink-0 text-terracotta transition-transform duration-300 print:hidden ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        aria-hidden={!open}
        className={`faq-answer grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <p className="min-h-0 overflow-hidden pt-2 leading-relaxed text-ink/70">{a}</p>
      </div>
    </div>
  );
}
