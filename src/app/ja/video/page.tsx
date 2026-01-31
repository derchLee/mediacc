import { VideoPageClient } from "@/components/VideoPageClient";
import { getVideoPageT } from "@/lib/translations";

export default function JaVideoPage() {
  return <VideoPageClient locale="ja" t={getVideoPageT("ja")} />;
}
