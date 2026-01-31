import { getVideoLayoutMetadata, VideoLayoutScripts } from "@/lib/translations/video-layout";

export const metadata = getVideoLayoutMetadata("es");

export default function EsVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VideoLayoutScripts locale="es" />
      {children}
    </>
  );
}
