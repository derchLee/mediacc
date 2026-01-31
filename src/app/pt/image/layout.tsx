/**
 * Image layout (PT) – /pt/image
 */
import { getImageLayoutMetadata, ImageLayoutScripts } from "@/lib/translations/image-layout";

export const metadata = getImageLayoutMetadata("pt");

export default function PtImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ImageLayoutScripts locale="pt" />
      {children}
    </>
  );
}
