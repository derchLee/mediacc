/**
 * Image page (ES) – /es/image
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";
import { ImageLayoutScripts } from "@/lib/translations/image-layout";

export default function EsImagePage() {
  return (
    <>
      <ImageLayoutScripts locale="es" />
      <ImagePageClient locale="es" t={getImagePageT("es")} />
    </>
  );
}
