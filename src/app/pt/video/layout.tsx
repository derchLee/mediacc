import { getVideoLayoutMetadata, VideoLayoutScripts } from "@/lib/translations/video-layout";

export const metadata = getVideoLayoutMetadata("pt");

export default function PtVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VideoLayoutScripts locale="pt" />
      {children}
    </>
  );
}
