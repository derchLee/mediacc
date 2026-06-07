import { getVideoLayoutMetadata, VideoLayoutScripts } from "@/lib/translations/video-layout";
import { HtmlLang } from "@/components/HtmlLang";

export const metadata = getVideoLayoutMetadata("es");

export default function EsVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang locale="es" />
      <VideoLayoutScripts locale="es" />
      {children}
    </>
  );
}
