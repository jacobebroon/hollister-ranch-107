import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const imageBuffer = fs.readFileSync(path.join(process.cwd(), "public/og/rancho-alegria.jpg"));
  const imageSrc = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  const crestBuffer = fs.readFileSync(path.join(process.cwd(), "public/brand/crest.png"));
  const crestSrc = `data:image/png;base64,${crestBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          width={1200}
          height={630}
          style={{ objectFit: "cover", position: "absolute", inset: 0 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(36,28,20,0.85) 0%, rgba(36,28,20,0.25) 55%, rgba(36,28,20,0.1) 100%)",
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={crestSrc}
          alt=""
          width={92}
          height={92}
          style={{ position: "absolute", right: 56, top: 56, borderRadius: "50%" }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 56,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: "#f8f4ea",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Hollister Ranch &middot; Gaviota Coast, California
          </div>
          <div
            style={{
              color: "#f8f4ea",
              fontSize: 84,
              fontWeight: 700,
              marginTop: 12,
            }}
          >
            Rancho Alegria
          </div>
          <div style={{ color: "#f8f4ea", fontSize: 28, marginTop: 8, opacity: 0.9 }}>
            113 private acres &middot; Parcel 107
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
