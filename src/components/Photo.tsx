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
}: {
  slug: string;
  alt: string;
  variant?: "full" | "thumb";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const photo = getPhoto(slug);

  return (
    <Image
      src={photoUrl(slug, variant)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={photo?.blurDataURL ? "blur" : undefined}
      blurDataURL={photo?.blurDataURL}
      className={className}
    />
  );
}
