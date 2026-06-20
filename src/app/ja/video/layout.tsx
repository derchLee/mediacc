import { getVideoLayoutMetadata } from "@/lib/translations/video-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getVideoLayoutMetadata("ja");

export default function JaVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="ja" />
      {children}
    </>
  );
}
