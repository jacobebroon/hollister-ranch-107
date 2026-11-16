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

// Copyright tags travel inside each file, so copies elsewhere still carry the family credit
const EXIF = { IFD0: { Artist: "Clavin Family", Copyright: "© Clavin Family / Rancho Alegria (hollisterranch107.com). All rights reserved." } };

// Decode to raw pixels first (lossless), so none of the camera metadata or its embedded
// preview survives; then encode once to WebP carrying only the copyright tags
async function build(src, out, width, sigma, quality) {
  const { data, info } = await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .sharpen({ sigma })
    .raw()
    .toBuffer({ resolveWithObject: true });
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .withExif(EXIF)
    .webp({ quality, effort: 6 })
    .toFile(out);
}

let done = 0;
for (const entry of manifest) {
  const src = findSource(entry);
  if (!src) throw new Error(`No original found for ${entry.slug}`);
  await build(src, path.join(FULL_DIR, `${entry.slug}.webp`), 2400, 0.6, 85);
  await build(src, path.join(THUMB_DIR, `${entry.slug}.webp`), 800, 0.5, 82);
  done += 1;
}
console.log(`built ${done} photos into ${OUT_DIR}`);
