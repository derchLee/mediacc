/**
 * Image layout (PT) – /pt/image
 */
import { getImageLayoutMetadata } from "@/lib/translations/image-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getImageLayoutMetadata("pt");

export default function PtImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="pt" />
      {children}
    </>
  );
}
