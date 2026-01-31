/**
 * Image page (EN) – /image
 * Build-time translation: content baked at build.
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";

export default function ImagePage() {
  return <ImagePageClient locale="en" t={getImagePageT("en")} />;
}
