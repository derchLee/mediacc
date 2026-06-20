import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";
import { VideoLayoutScripts } from "@/lib/translations/video-layout";

export default function PtVideoPage() {
  return (
    <>
      <VideoLayoutScripts locale="pt" />
      <VideoPageClient locale="pt" t={getVideoPageT("pt")} />
    </>
  );
}
