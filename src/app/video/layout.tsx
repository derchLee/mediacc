/**
 * Video layout (EN) – /video
 */
import { getVideoLayoutMetadata, VideoLayoutScripts } from "@/lib/translations/video-layout";

export const metadata = getVideoLayoutMetadata("en");

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VideoLayoutScripts locale="en" />
      {children}
    </>
  );
}
