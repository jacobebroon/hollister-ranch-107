"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">
          Something Went Wrong
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold text-ink sm:text-5xl">
          The page hit a snag
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink/70">
          Something didn&rsquo;t load correctly. Try again, or head back to
          the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => unstable_retry()}
            className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-sand shadow-lg transition-colors hover:bg-terracotta-deep"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-ocean/30 px-6 py-3 text-sm font-semibold text-ocean transition-colors hover:bg-ocean hover:text-sand"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
