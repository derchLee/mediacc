import { getVideoLayoutMetadata } from "@/lib/translations/video-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getVideoLayoutMetadata("pt");

export default function PtVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="pt" />
      {children}
    </>
  );
}
