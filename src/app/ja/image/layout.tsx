/**
 * Image layout (JA) – /ja/image
 */
import { getImageLayoutMetadata, ImageLayoutScripts } from "@/lib/translations/image-layout";

export const metadata = getImageLayoutMetadata("ja");

export default function JaImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ImageLayoutScripts locale="ja" />
      {children}
    </>
  );
}
