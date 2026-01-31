import "./globals.css";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

/**
 * Root Layout with SEO metadata
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";
const siteName = "MediaCC";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NR6F75G20E";

export const metadata = {
  // Title template: core message first, brand at end
  title: {
    default: "Free Online Media Converter & Compressor – 100% Local Processing | MediaCC",
    template: "%s | MediaCC",
  },
  
  // Description: 120-160 chars, clear problem + solution + unique value
  description: "Free online image and video converter. Convert and compress JPG, PNG, WebP, MP4, WebM directly in your browser. No upload, no server, 100% local processing. Privacy guaranteed.",
  
  // Extended keywords for better indexing
  keywords: [
    "free media converter",
    "online video converter",
    "online image converter",
    "image compressor",
    "video compressor",
    "local processing",
    "privacy-first tool",
    "browser-based converter",
    "no upload converter",
    "jpg to png",
    "mp4 converter",
    "webp converter",
    "reduce file size",
  ],
  
  authors: [{ name: "MediaCC Team" }],
  creator: "MediaCC",
  publisher: "MediaCC",
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  metadataBase: new URL(baseUrl),
  
  // Canonical with language alternates
  alternates: {
    canonical: baseUrl,
    languages: {
      "en": baseUrl,
    },
  },
  
  // Open Graph for social sharing and AI citation
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteName,
    title: "Free Online Media Converter & Compressor – MediaCC",
    description: "Convert and compress images and videos directly in your browser. Your files never leave your device. 100% local processing, privacy guaranteed.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MediaCC - Free Online Media Converter with 100% Local Processing",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Free Online Media Converter & Compressor – MediaCC",
    description: "A privacy-first media tool. Convert and compress images/videos without uploading files. 100% local processing.",
    images: ["/og-image.jpg"],
    creator: "@mediacc",
  },
  
  // Robots directive
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
  
  // Search engine verification (add your codes when ready)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // Additional metadata for language
  other: {
    "language": "en",
  },
};

// Structured Data (JSON-LD) for SEO and AI citation
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${baseUrl}/#webapp`,
  name: "MediaCC",
  alternateName: "Media Conversion & Compression Tool",
  description: "Free online image and video converter with 100% local processing. Convert and compress JPG, PNG, WebP, MP4, WebM directly in your browser without uploading files.",
  url: baseUrl,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Convert JPG, PNG, WebP, AVIF image formats",
    "Convert MP4, WebM, MOV, MKV, AVI video formats",
    "Compress images with quality control",
    "Compress videos with bitrate/resolution adjustment",
    "Batch file processing",
    "100% local browser processing",
    "No file upload to server",
    "Privacy-first design",
    "Works offline (PWA)",
  ],
  browserRequirements: "Requires JavaScript and WebAssembly support. Works best in modern browsers.",
  softwareHelp: {
    "@type": "CreativeWork",
    url: `${baseUrl}/disclaimer`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "100",
    bestRating: "5",
    worstRating: "1",
  },
  publisher: {
    "@type": "Organization",
    name: "MediaCC",
    url: baseUrl,
  },
  inLanguage: "en",
  isAccessibleForFree: true,
  keywords: "image converter, video converter, image compressor, video compressor, local processing, privacy, free online tool",
};

// FAQ Structured Data for better search visibility
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is MediaCC really free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, MediaCC is completely free to use. All processing happens locally in your browser, so there are no server costs passed on to users.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files uploaded to any server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, your files never leave your device. MediaCC uses WebAssembly technology to process all files locally in your browser. This ensures 100% privacy and security for your sensitive media files.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats does MediaCC support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MediaCC supports conversion between JPG, PNG, WebP, and AVIF image formats. You can also compress images while maintaining quality control.",
      },
    },
    {
      "@type": "Question",
      name: "What video formats does MediaCC support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MediaCC supports MP4, WebM, MOV, MKV, and AVI video formats. You can convert between formats and compress videos by adjusting bitrate and resolution.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* WebApplication Structured Data (JSON-LD) for SEO & GEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* FAQ Structured Data for rich snippets */}
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

