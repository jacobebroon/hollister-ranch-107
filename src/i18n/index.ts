import en, { type Dict } from "./en";
import es from "./es";
import { photos, type Photo } from "@/data/photos";

export type Lang = "en" | "es";
export type { Dict };

export const DICTS: Record<Lang, Dict> = { en, es };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}

/** Fills {placeholders} in a dictionary string. */
export function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

/** The photo list with captions in the requested language (English captions as fallback). */
export function localizedPhotos(t: Dict): Photo[] {
  return photos.map((p) => ({ ...p, caption: t.captions[p.slug] ?? p.caption }));
}
