/**
 * Image page (JA) – /ja/image
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";

export default function JaImagePage() {
  return <ImagePageClient locale="ja" t={getImagePageT("ja")} />;
}
