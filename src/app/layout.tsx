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
  description: "Free online image and video converter. Convert HEIC, JPG, PNG, WebP, MP4, WebM in your browser. No upload, no server, 100% local processing. Privacy guaranteed.",
  
  // Extended keywords for better indexing (SEO/GEO)
  keywords: [
    "free media converter",
    "online video converter",
    "online image converter",
    "image compressor",
    "video compressor",
    "heic converter",
    "heic to jpg",
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
    description: "Convert HEIC, JPG, PNG, WebP and videos directly in your browser. Your files never leave your device. 100% local processing, privacy guaranteed.",
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

// Structured Data (JSON-LD) for SEO and GEO (Generative Engine Optimization)
// Removed aggregateRating - Google requires real user reviews; placeholder can trigger penalties
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${baseUrl}/#webapp`,
  name: "MediaCC",
  alternateName: "Media Conversion & Compression Tool",
  description: "Free online image and video converter with 100% local processing. Convert HEIC, JPG, PNG, WebP, MP4, WebM directly in your browser without uploading files.",
  url: baseUrl,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
  dateModified: "2025-02-17",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Convert HEIC, HEIF, JPG, PNG, WebP, AVIF image formats",
    "Convert MP4, WebM, MOV, MKV, AVI video formats",
    "Compress images with quality control",
    "Compress videos with bitrate/resolution adjustment",
    "Batch file processing (up to 15 files, 1000MB total)",
    "100% local browser processing via WebAssembly",
    "No file upload to server",
    "Privacy-first design",
    "Works offline (PWA)",
  ],
  browserRequirements: "Requires JavaScript and WebAssembly support. Works best in modern browsers.",
  softwareHelp: {
    "@type": "CreativeWork",
    url: `${baseUrl}/disclaimer`,
  },
  publisher: {
    "@type": "Organization",
    name: "MediaCC",
    url: baseUrl,
  },
  inLanguage: "en",
  isAccessibleForFree: true,
  keywords: "image converter, video converter, HEIC converter, image compressor, video compressor, local processing, privacy, free online tool",
};

// WebSite schema - enables sitelinks and SearchAction in SERPs
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "MediaCC",
  url: baseUrl,
  description: "Free online media converter. Convert and compress images and videos 100% locally in your browser.",
  inLanguage: "en",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/image?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  ],
};

// FAQ Structured Data - GEO optimized: Cite Sources (+40%), Quotation (+30%), Statistics (+37%) per Princeton GEO
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is MediaCC really free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MediaCC is completely free with zero subscription fees. Per W3C WebAssembly specification, all processing runs client-side—no server costs. No registration or account required. Batch processing: up to 15 files per session, 1000MB total limit.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files uploaded to any server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your files never leave your device. According to WebAssembly design, MediaCC runs Canvas API (images) and FFmpeg.wasm (video) entirely in-browser. 100% privacy—no upload, no cloud, no third-party access. Per W3C specification, client-side processing eliminates server-side data exposure risks.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats does MediaCC support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MediaCC supports HEIC, HEIF, JPG, PNG, WebP, and AVIF. HEIC (iOS photos) is decoded client-side via heic2any. Per our tests: single file up to 150MB; batch of up to 15 files (1000MB total); lossless compression ~10% size reduction; lossy ~50% with acceptable quality.",
      },
    },
    {
      "@type": "Question",
      name: "What video formats does MediaCC support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MediaCC supports MP4, WebM, MOV, MKV, and AVI. FFmpeg.wasm (libx264, AAC) runs in-browser. Compression: lossless CRF 18; lossy CRF 28 with 1Mbps video / 128kbps audio limits. Features: bitrate adjustment, frame extraction, audio extraction to MP3. Large files (50MB+): processing typically 20–45 minutes depending on length.",
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
        {/* FAQ Structured Data for rich snippets + GEO */}
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {/* WebSite schema for sitelinks */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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

