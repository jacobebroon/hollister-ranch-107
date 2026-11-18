// Adds the photos Harold Clavin sent (Aug 2026) to the photo manifest and builds their web
// versions. Originals live in harold-photos/ (kept out of git); re-running is safe.
//
// Usage: node scripts/add-harold-photos.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const MANIFEST = "src/data/photos-manifest.json";
const OUT = path.resolve("public/media/photos");
const EXIF = { IFD0: { Artist: "Clavin Family", Copyright: "© Clavin Family / Rancho Alegria (hollisterranch107.com). All rights reserved." } };

// slug -> original file (relative to the project root)
const PHOTOS = {
  "hc-5264": "harold-photos/drive/5264.jpg",
  "hc-front-a": "harold-photos/front-page/front-a.jpg",
  "hc-front-b": "harold-photos/front-page/front-b.jpg",
  "hc-jeanette-garden": "harold-photos/garden/jeanette-garden.jpg",
  "hc-1385": "harold-photos/descriptions/1385.jpg",
  "hc-1395": "harold-photos/descriptions/1395.jpg",
  "hc-dining": "harold-photos/descriptions/20260604_175517.jpg",
  "hc-bobcat-patio": "harold-photos/descriptions/20260605_110256.jpg",
  "hc-1440": "harold-photos/drive/1440.jpg",
  "hc-1494": "harold-photos/drive/1494.jpg",
  "hc-1907": "harold-photos/drive/1907.jpg",
  "hc-1908": "harold-photos/drive/1908.jpg",
  "hc-1917": "harold-photos/drive/1917.jpg",
  "hc-garden-stairs": "harold-photos/drive/20260118_131453.jpg",
  "hc-garden-lawn": "harold-photos/drive/20260118_131457.jpg",
  "hc-house-cactus": "harold-photos/drive/20260118_131511.jpg",
  "hc-palms-sea": "harold-photos/drive/20260118_131516.jpg",
  "hc-palm-path": "harold-photos/drive/20260118_131544.jpg",
  "hc-terrace-chairs": "harold-photos/drive/20260118_131624.jpg",
  "hc-low-tide": "harold-photos/drive/20260118_153017.jpg",
  "hc-family-beach": "harold-photos/drive/4627ef6f-3c1f-452c-bb61-06dbab2ec8c9-1_all_332.jpg",
  "hc-5251": "harold-photos/drive/5251.jpg",
  "hc-5260": "harold-photos/drive/5260.jpg",
  "hc-5296": "harold-photos/drive/5296.jpg",
  "hc-5298": "harold-photos/drive/5298.jpg",
  "hc-2999": "harold-photos/more/2999.jpg",
  "hc-3014": "harold-photos/more/3014.jpg",
  "hc-4772": "harold-photos/more/4772.jpg",
  "hc-4876": "harold-photos/more/4876.jpg",
  "hc-4942": "harold-photos/more/4942.jpg",
  "hc-4943": "harold-photos/more/4943.jpg",
  "hc-5232": "harold-photos/more/5232.jpg",
  "hc-5234": "harold-photos/more/5234.jpg",
  "hc-guest-house-sign": "harold-photos/older/1064.jpg",
  "hc-tennis": "harold-photos/older/1316.jpg",
  "hc-spa": "harold-photos/older/1503.jpg",
  "hc-sunset-gathering": "harold-photos/older/1507.jpg",
  "hc-bobcat-drive": "harold-photos/older/887.jpg",
  "hc-967": "harold-photos/older/967.jpg",
  "hc-968": "harold-photos/older/968.jpg",
  "hc-quail": "harold-photos/personal/4627ef6f-3c1f-452c-bb61-06dbab2ec8c9-1_all_5252.jpg",
  "hc-cactus-garden": "harold-photos/personal/4627ef6f-3c1f-452c-bb61-06dbab2ec8c9-1_all_5268.jpg",
  "hc-guest-house": "harold-photos/personal/5301.jpg",
  "hc-veranda-chairs": "harold-photos/personal/5313.jpg",
  "hc-garden-path": "harold-photos/personal/5337.jpg",
  "hc-palm-walk": "harold-photos/personal/5343.jpg",
};

async function encode(src, out, width, sigma, quality) {
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
  return info;
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const bySlug = new Map(manifest.map((e) => [e.slug, e]));

for (const [slug, original] of Object.entries(PHOTOS)) {
  const full = await encode(original, path.join(OUT, "full", `${slug}.webp`), 2400, 0.6, 85);
  await encode(original, path.join(OUT, "thumb", `${slug}.webp`), 800, 0.5, 82);
  const blur = await sharp(original).rotate().resize(16).webp({ quality: 40 }).toBuffer();
  bySlug.set(slug, {
    slug,
    width: full.width,
    height: full.height,
    original,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  });
  console.log("built", slug, `${full.width}x${full.height}`);
}

fs.writeFileSync(MANIFEST, JSON.stringify([...bySlug.values()], null, 2) + "\n");
console.log(`manifest now has ${bySlug.size} photos`);
