/**
 * Image page (ES) – /es/image
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";

export default function EsImagePage() {
  return <ImagePageClient locale="es" t={getImagePageT("es")} />;
}
