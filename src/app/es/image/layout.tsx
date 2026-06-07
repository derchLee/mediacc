/**
 * Image layout (ES) – /es/image
 */
import { getImageLayoutMetadata, ImageLayoutScripts } from "@/lib/translations/image-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getImageLayoutMetadata("es");

export default function EsImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="es" />
      <ImageLayoutScripts locale="es" />
      {children}
    </>
  );
}
