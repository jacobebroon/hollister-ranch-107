import fs from "node:fs";
import path from "node:path";

const PROJECT_URL = "https://mtzjtalugbxiglrbocyz.supabase.co";
const BUCKET = "rancho-alegria";
const ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!ANON_KEY) {
  console.error("Missing SUPABASE_ANON_KEY env var");
  process.exit(1);
}

const OUT_DIR =
  "C:/Users/jacob/AppData/Local/Temp/claude/C--Users-jacob-Claude-code-work/2688526f-521a-4fad-8051-b2cb3b39b390/scratchpad/new-photos";

const manifest = JSON.parse(fs.readFileSync(path.join(OUT_DIR, "manifest.json"), "utf-8"));

async function upload(localPath, remotePath) {
  const body = fs.readFileSync(localPath);
  const res = await fetch(`${PROJECT_URL}/storage/v1/object/${BUCKET}/${remotePath}`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "image/webp",
      "x-upsert": "true",
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed for ${remotePath}: ${res.status} ${text}`);
  }
}

const run = async () => {
  for (const entry of manifest) {
    const fullLocal = path.join(OUT_DIR, "full", `${entry.slug}.webp`);
    const thumbLocal = path.join(OUT_DIR, "thumb", `${entry.slug}.webp`);
    await upload(fullLocal, `photos/full/${entry.slug}.webp`);
    await upload(thumbLocal, `photos/thumb/${entry.slug}.webp`);
    console.log(`uploaded: ${entry.slug}`);
  }
  console.log(`\nUploaded ${manifest.length} photos (full + thumb).`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
