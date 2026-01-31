/**
 * Image layout (EN) – /image
 * Metadata + JSON-LD from build-time translations. hreflang for all locales.
 */
import { getImageLayoutMetadata, ImageLayoutScripts } from "@/lib/translations/image-layout";

export const metadata = getImageLayoutMetadata("en");

export default function ImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ImageLayoutScripts locale="en" />
      {children}
    </>
  );
}
