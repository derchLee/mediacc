/**
 * Image page (PT) – /pt/image
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";

export default function PtImagePage() {
  return <ImagePageClient locale="pt" t={getImagePageT("pt")} />;
}
