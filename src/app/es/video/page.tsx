import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";

export default function EsVideoPage() {
  return <VideoPageClient locale="es" t={getVideoPageT("es")} />;
}
