/**
 * Image page (PT) – /pt/image
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";
import { ImageLayoutScripts } from "@/lib/translations/image-layout";

export default function PtImagePage() {
  return (
    <>
      <ImageLayoutScripts locale="pt" />
      <ImagePageClient locale="pt" t={getImagePageT("pt")} />
    </>
  );
}
