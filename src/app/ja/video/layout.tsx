import { getVideoLayoutMetadata, VideoLayoutScripts } from "@/lib/translations/video-layout";

export const metadata = getVideoLayoutMetadata("ja");

export default function JaVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VideoLayoutScripts locale="ja" />
      {children}
    </>
  );
}
