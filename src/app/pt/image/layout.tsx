/**
 * Image layout (PT) – /pt/image
 */
import { getImageLayoutMetadata, ImageLayoutScripts } from "@/lib/translations/image-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getImageLayoutMetadata("pt");

export default function PtImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="pt" />
      <ImageLayoutScripts locale="pt" />
      {children}
    </>
  );
}
