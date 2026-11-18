import Image from "next/image";
import { photoUrl } from "@/lib/media";
import { getPhoto } from "@/data/photos";

export default function Photo({
  slug,
  alt,
  variant = "full",
  className,
  sizes = "100vw",
  priority = false,
  quality,
  enhance = true,
}: {
  slug: string;
  alt: string;
  variant?: "full" | "thumb";
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  /** Live color boost; off for photos whose file already has it baked in (the hero) */
  enhance?: boolean;
}) {
  const photo = getPhoto(slug);

  return (
    <Image
      src={photoUrl(slug, variant)}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : undefined}
      quality={quality ?? (variant === "thumb" ? 75 : 85)}
      // Blur preview only for the above-the-fold hero; elsewhere it costs more than it shows
      placeholder={priority && photo?.blurDataURL ? "blur" : undefined}
      blurDataURL={priority ? photo?.blurDataURL : undefined}
      className={`${enhance ? "photo-enhance " : ""}${className ?? ""}`}
    />
  );
}
