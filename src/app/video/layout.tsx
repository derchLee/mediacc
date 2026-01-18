import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

export const metadata: Metadata = {
  title: "Video Converter & Compressor",
  description: "Convert and compress videos online. Support MP4, WebM, MOV, MKV, AVI formats. 100% local processing, no server upload. Protect your privacy.",
  keywords: ["video converter", "video compressor", "mp4 converter", "video compression", "online video converter"],
  openGraph: {
    title: "Video Converter & Compressor | MediaCC",
    description: "Convert and compress videos online. Support MP4, WebM, MOV, MKV, AVI formats. 100% local processing, no server upload.",
    url: `${baseUrl}/video`,
    images: ["/og-image.jpg"],
  },
  twitter: {
    title: "Video Converter & Compressor | MediaCC",
    description: "Convert and compress videos online. Support MP4, WebM, MOV, MKV, AVI formats. 100% local processing, no server upload.",
  },
  alternates: {
    canonical: "/video",
  },
};

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
