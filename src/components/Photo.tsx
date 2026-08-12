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
}: {
  slug: string;
  alt: string;
  variant?: "full" | "thumb";
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}) {
  const photo = getPhoto(slug);

  return (
    <Image
      src={photoUrl(slug, variant)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality ?? (variant === "thumb" ? 75 : 95)}
      placeholder={photo?.blurDataURL ? "blur" : undefined}
      blurDataURL={photo?.blurDataURL}
      className={`photo-enhance ${className ?? ""}`}
    />
  );
}
