import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const imageBuffer = fs.readFileSync(path.join(process.cwd(), "public/brand/crest.png"));
  const imageSrc = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageSrc} alt="" width={180} height={180} style={{ objectFit: "cover" }} />
    ),
    { ...size }
  );
}
