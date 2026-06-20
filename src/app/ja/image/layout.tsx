/**
 * Image layout (JA) – /ja/image
 */
import { getImageLayoutMetadata } from "@/lib/translations/image-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getImageLayoutMetadata("ja");

export default function JaImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="ja" />
      {children}
    </>
  );
}
