/**
 * Video page (EN) – /video
 */
import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";

export default function VideoPage() {
  return <VideoPageClient locale="en" t={getVideoPageT("en")} />;
}
