import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "C:/Users/jacob/OneDrive/Documents/Hollister/DVD RW Drive";
const OUT_DIR = "C:/Users/jacob/AppData/Local/Temp/claude/C--Users-jacob-Claude-code-work/2688526f-521a-4fad-8051-b2cb3b39b390/scratchpad/media/photos";

const FULL_DIR = path.join(OUT_DIR, "full");
const THUMB_DIR = path.join(OUT_DIR, "thumb");

fs.mkdirSync(FULL_DIR, { recursive: true });
fs.mkdirSync(THUMB_DIR, { recursive: true });

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => /\.(jpg|jpeg)$/i.test(f))
  .filter((f) => !/copy/i.test(f))
  .sort();

let slugCounter = 0;
const manifest = [];

function slugify(name) {
  const base = name.replace(/\.(jpg|jpeg)$/i, "");
  if (/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_\d+$/i.test(base)) {
    slugCounter += 1;
    return `ranch-${String(slugCounter).padStart(3, "0")}`;
  }
  return base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const run = async () => {
  for (const file of files) {
    const srcPath = path.join(SRC_DIR, file);
    const slug = slugify(file);
    const fullOut = path.join(FULL_DIR, `${slug}.webp`);
    const thumbOut = path.join(THUMB_DIR, `${slug}.webp`);

    const img = sharp(srcPath).rotate();
    const meta = await img.metadata();

    await sharp(srcPath)
      .rotate()
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(fullOut);

    await sharp(srcPath)
      .rotate()
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(thumbOut);

    const blurBuffer = await sharp(srcPath)
      .rotate()
      .resize({ width: 16, withoutEnlargement: true })
      .webp({ quality: 40 })
      .toBuffer();
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

    manifest.push({
      slug,
      original: file,
      width: meta.width,
      height: meta.height,
      blurDataURL,
    });
    console.log(`done: ${file} -> ${slug}.webp`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nProcessed ${manifest.length} photos.`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
