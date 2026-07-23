import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "C:/Users/jacob/Downloads";
const FILES = [
  "1000000893.JPG",
  "1000000918.JPG",
  "1000002157.JPG",
  "1000002160.JPG",
  "1000002725.jpeg",
  "1000002820.JPG",
  "1000002822.JPG",
  "1000003478.JPG",
  "IMG_0991.JPG",
];

const OUT_DIR =
  "C:/Users/jacob/AppData/Local/Temp/claude/C--Users-jacob-Claude-code-work/2688526f-521a-4fad-8051-b2cb3b39b390/scratchpad/new-photos";
const FULL_DIR = path.join(OUT_DIR, "full");
const THUMB_DIR = path.join(OUT_DIR, "thumb");
fs.mkdirSync(FULL_DIR, { recursive: true });
fs.mkdirSync(THUMB_DIR, { recursive: true });

function slugify(name) {
  return name
    .replace(/\.(jpg|jpeg)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const run = async () => {
  const manifest = [];
  for (const file of FILES) {
    const srcPath = path.join(SRC_DIR, file);
    const slug = slugify(file);
    const fullOut = path.join(FULL_DIR, `${slug}.webp`);
    const thumbOut = path.join(THUMB_DIR, `${slug}.webp`);

    await sharp(srcPath)
      .rotate()
      .resize({ width: 3200, withoutEnlargement: true })
      .sharpen({ sigma: 0.6 })
      .webp({ quality: 92, effort: 6 })
      .toFile(fullOut);

    await sharp(srcPath)
      .rotate()
      .resize({ width: 800, withoutEnlargement: true })
      .sharpen({ sigma: 0.5 })
      .webp({ quality: 85, effort: 6 })
      .toFile(thumbOut);

    const blurBuffer = await sharp(srcPath)
      .rotate()
      .resize({ width: 16, withoutEnlargement: true })
      .webp({ quality: 40 })
      .toBuffer();
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

    const rotatedMeta = await sharp(srcPath).rotate().metadata();
    manifest.push({
      slug,
      original: file,
      width: rotatedMeta.width,
      height: rotatedMeta.height,
      blurDataURL,
    });
    console.log(`done: ${file} -> ${slug}.webp (${rotatedMeta.width}x${rotatedMeta.height})`);
  }

  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nProcessed ${manifest.length} new photos.`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
