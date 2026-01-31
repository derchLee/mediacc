/**
 * Image layout (ES) – /es/image
 */
import { getImageLayoutMetadata, ImageLayoutScripts } from "@/lib/translations/image-layout";

export const metadata = getImageLayoutMetadata("es");

export default function EsImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ImageLayoutScripts locale="es" />
      {children}
    </>
  );
}
