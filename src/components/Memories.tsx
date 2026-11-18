"use client";

import Image from "next/image";
import { photoUrl } from "@/lib/media";
import { openPhotoTour } from "@/components/PhotoTour";
import { MEMORY_GROUPS } from "@/data/memories";
import type { Photo } from "@/data/photos";
import type { Dict } from "@/i18n";

// Small, fixed tilts so the prints look laid out by hand (and render the same on server and client)
const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0", "-rotate-[1.5deg]"];

export default function Memories({ t, photos }: { t: Dict["memories"]; photos: Photo[] }) {
  const bySlug = new Map(photos.map((p) => [p.slug, p]));

  return (
    <div className="space-y-16 sm:space-y-20">
      {MEMORY_GROUPS.map((slugs, g) => {
        const group = t.groups[g];
        const items = slugs.map((s) => bySlug.get(s)).filter((p): p is Photo => Boolean(p));
        return (
          <div key={group.title} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-serif text-5xl font-bold text-terracotta/25" aria-hidden="true">
                {String(g + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">{group.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{group.body}</p>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
              {items.map((photo, i) => (
                <li key={photo.slug}>
                  <button
                    type="button"
                    onClick={() => openPhotoTour(photo.slug)}
                    aria-label={`${t.open}: ${photo.caption ?? ""}`}
                    className={`group block w-full ${TILTS[(i + g) % TILTS.length]} rounded-sm bg-white p-2 pb-3 text-left shadow-[0_6px_20px_-6px_rgba(40,30,20,0.35)] transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] focus-visible:rotate-0 sm:p-2.5 sm:pb-4`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-sand-deep">
                      <Image
                        src={photoUrl(photo.slug, "thumb")}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                        quality={80}
                        placeholder={photo.blurDataURL ? "blur" : undefined}
                        blurDataURL={photo.blurDataURL}
                        className="photo-enhance object-cover"
                      />
                    </span>
                    <span className="mt-2 block font-serif text-[0.8rem] italic leading-snug text-ink/75 sm:text-sm">
                      {photo.caption}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
