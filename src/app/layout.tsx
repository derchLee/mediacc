import "./globals.css";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

/**
 * Root Layout with SEO metadata
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
const siteName = "MediaCC";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NR6F75G20E";

export const metadata = {
  title: {
    default: "MediaCC - Local Media Conversion & Compression Tool",
    template: "%s | MediaCC",
  },
  description: "100% local processing for image/video conversion and compression, protecting your privacy. Convert and compress images and videos without uploading to any server.",
  keywords: ["media converter", "video converter", "image converter", "video compression", "image compression", "privacy", "local processing", "online converter"],
  authors: [{ name: "MediaCC" }],
  creator: "MediaCC",
  publisher: "MediaCC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteName,
    title: "MediaCC - Local Media Conversion & Compression Tool",
    description: "100% local processing for image/video conversion and compression, protecting your privacy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MediaCC - Local Media Conversion & Compression Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaCC - Local Media Conversion & Compression Tool",
    description: "100% local processing for image/video conversion and compression, protecting your privacy",
    images: ["/og-image.jpg"],
    creator: "@mediacc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

// Structured Data (JSON-LD) for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MediaCC",
  description: "100% local processing for image/video conversion and compression, protecting your privacy",
  url: baseUrl,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Image format conversion",
    "Video format conversion",
    "Image compression",
    "Video compression",
    "100% local processing",
    "Privacy protected",
    "No server upload",
  ],
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  softwareHelp: {
    "@type": "CreativeWork",
    url: `${baseUrl}/privacy`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data (JSON-LD) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

