import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";
import { VideoLayoutScripts } from "@/lib/translations/video-layout";

export default function JaVideoPage() {
  return (
    <>
      <VideoLayoutScripts locale="ja" />
      <VideoPageClient locale="ja" t={getVideoPageT("ja")} />
    </>
  );
}
