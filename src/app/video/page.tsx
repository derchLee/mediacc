/**
 * Video page (EN) – /video
 */
import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";
import { VideoLayoutScripts } from "@/lib/translations/video-layout";

export default function VideoPage() {
  return (
    <>
      <VideoLayoutScripts locale="en" />
      <VideoPageClient locale="en" t={getVideoPageT("en")} />
    </>
  );
}
