/**
 * Image page (JA) – /ja/image
 */
import { ImagePageClient } from "@/components/ImagePageClient";
import { getImagePageT } from "@/lib/translations";
import { ImageLayoutScripts } from "@/lib/translations/image-layout";

export default function JaImagePage() {
  return (
    <>
      <ImageLayoutScripts locale="ja" />
      <ImagePageClient locale="ja" t={getImagePageT("ja")} />
    </>
  );
}
