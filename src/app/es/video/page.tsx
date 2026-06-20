import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";
import { VideoLayoutScripts } from "@/lib/translations/video-layout";

export default function EsVideoPage() {
  return (
    <>
      <VideoLayoutScripts locale="es" />
      <VideoPageClient locale="es" t={getVideoPageT("es")} />
    </>
  );
}
