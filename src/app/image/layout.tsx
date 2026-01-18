import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

export const metadata: Metadata = {
  title: "Image Converter & Compressor",
  description: "Convert and compress images online. Support JPG, PNG, WebP, AVIF formats. 100% local processing, no server upload. Protect your privacy.",
  keywords: ["image converter", "image compressor", "jpg converter", "png converter", "webp converter", "image compression"],
  openGraph: {
    title: "Image Converter & Compressor | MediaCC",
    description: "Convert and compress images online. Support JPG, PNG, WebP, AVIF formats. 100% local processing, no server upload.",
    url: `${baseUrl}/image`,
    images: ["/og-image.jpg"],
  },
  twitter: {
    title: "Image Converter & Compressor | MediaCC",
    description: "Convert and compress images online. Support JPG, PNG, WebP, AVIF formats. 100% local processing, no server upload.",
  },
  alternates: {
    canonical: "/image",
  },
};

export default function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
