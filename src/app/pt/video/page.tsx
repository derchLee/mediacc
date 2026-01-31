import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";

export default function PtVideoPage() {
  return <VideoPageClient locale="pt" t={getVideoPageT("pt")} />;
}
