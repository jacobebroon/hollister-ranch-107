// Rebuilds every gallery photo into public/media from the original files, so the site
// serves its own images instead of depending on an external storage bucket.
//
// Usage: node scripts/build-local-media.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SOURCE_DIRS = [
  "C:/Users/jacob/OneDrive/Documents/Hollister/DVD RW Drive",
  "C:/Users/jacob/Downloads",
];
const OUT_DIR = path.resolve("public/media/photos");
const FULL_DIR = path.join(OUT_DIR, "full");
const THUMB_DIR = path.join(OUT_DIR, "thumb");
fs.mkdirSync(FULL_DIR, { recursive: true });
fs.mkdirSync(THUMB_DIR, { recursive: true });

const manifest = JSON.parse(fs.readFileSync("src/data/photos-manifest.json", "utf8"));

// Index source files by lowercase name (the second photo batch has no `original` recorded,
// so fall back to "<slug>.jpg"-style names, e.g. img-0991 -> IMG_0991.JPG)
const sources = new Map();
for (const dir of SOURCE_DIRS) {
  for (const name of fs.readdirSync(dir)) {
    if (/\.(jpe?g)$/i.test(name)) sources.set(name.toLowerCase(), path.join(dir, name));
  }
}
function findSource(entry) {
  if (entry.original && sources.has(entry.original.toLowerCase())) return sources.get(entry.original.toLowerCase());
  const base = entry.slug.replace(/-/g, "_");
  for (const ext of ["jpg", "jpeg"]) {
    for (const candidate of [`${entry.slug}.${ext}`, `${base}.${ext}`]) {
      if (sources.has(candidate)) return sources.get(candidate);
    }
  }
  return null;
}

let done = 0;
for (const entry of manifest) {
  const src = findSource(entry);
  if (!src) throw new Error(`No original found for ${entry.slug}`);
  await sharp(src)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 85, effort: 6 })
    .toFile(path.join(FULL_DIR, `${entry.slug}.webp`));
  await sharp(src)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(THUMB_DIR, `${entry.slug}.webp`));
  done += 1;
}
console.log(`built ${done} photos into ${OUT_DIR}`);
