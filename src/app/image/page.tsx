/**
 * Image page (EN) – /image
 * Build-time translation: content baked at build.
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";
import { ImageLayoutScripts } from "@/lib/translations/image-layout";

export default function ImagePage() {
  return (
    <>
      <ImageLayoutScripts locale="en" />
      <ImagePageClient locale="en" t={getImagePageT("en")} />
    </>
  );
}
