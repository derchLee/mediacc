import "@/app/globals.css";
import { getContentDate } from "@/lib/seo/page-metadata";
import type { Locale } from "@/lib/translations/types";
import { CookieConsent } from "@/components/CookieConsent";
import { ProductAnalytics } from "@/components/ProductAnalytics";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

/**
 * Root Layout with SEO metadata
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediakit.upupdays.com";
const siteName = "MediaKit";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NR6F75G20E";

export const metadata = {
  // Title template: core message first, brand at end（默认标题控制在约 50–58 字符可见长度，避免 SERP 截断）
  title: {
    default: "Free Media Converter, Image Resizer & Compressor | MediaKit",
    template: "%s | MediaKit",
  },
  
  // Description: ~150 字符，兼顾关键词与可读性
  description:
    "Convert and compress images and videos, and resize images free in your browser. HEIC to JPG, WebP to PNG, MOV to MP4 and more, with local processing and no file uploads.",
  
  // Descriptive terms for non-Google consumers; Google ignores meta keywords.
  keywords: [
    "free media converter",
    "online video converter",
    "online image converter",
    "image compressor",
    "image resizer",
    "video compressor",
    "heic converter",
    "heic to jpg",
    "webp to jpg",
    "webp to png",
    "png to jpg",
    "mov to mp4",
    "webm to mp4",
    "compress jpg",
    "compress mp4",
    "local processing",
    "privacy-first tool",
    "browser-based converter",
    "no upload converter",
    "jpg to png",
    "mp4 converter",
    "webp converter",
    "reduce file size",
  ],
  
  authors: [{ name: "MediaKit Team" }],
  creator: "MediaKit",
  publisher: "MediaKit",
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  metadataBase: new URL(baseUrl),
  
  // Canonical + hreflang（正式域 mediakit.upupdays.com；默认落地 /image）
  // Canonicals are page-specific. A root canonical here would be inherited by
  // unrelated pages and make search engines consolidate their URLs.
  
  // Open Graph for social sharing and AI citation
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP", "es_ES", "pt_BR"],
    url: baseUrl,
    siteName: siteName,
    title: "Free Media Converter, Image Resizer & Compressor | MediaKit",
    description:
      "Convert and resize images, or compress images and videos in your browser. Files stay on your device—local processing, no upload.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "MediaKit - Free Media Converter, Image Resizer & Compressor",
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Free Media Converter, Image Resizer & Compressor | MediaKit",
    description: "Privacy-first media tool: convert, resize images & compress media locally—no file upload to any server.",
    images: ["/og"],
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
  
  // Search engine verification
  // 拿到验证码后替换字符串即可；或改用 NEXT_PUBLIC_*_VERIFICATION 环境变量。
  //   - Google Search Console:  https://search.google.com/search-console  → "HTML 标记" 方式拿 content
  //   - Bing Webmaster Tools:   https://www.bing.com/webmasters
  //   - Yandex Webmaster:       https://webmaster.yandex.com
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
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
  name: "MediaKit",
  alternateName: "Media Conversion, Image Resize & Compression Tool",
  description: "Free online image resizer and image/video converter with local browser processing. Convert HEIC photos to JPG/PNG/WebP and process common video formats without uploading files to MediaKit servers.",
  url: baseUrl,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
  dateModified: getContentDate("/"),
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Convert HEIC/HEIF photos to JPG, PNG, or WebP in supported browsers",
    "Convert JPG, PNG, and WebP images locally in the browser",
    "Convert common video formats including MP4, WebM, MOV, MKV, and AVI",
    "Compress images and videos with preset quality modes",
    "Resize images to exact pixel dimensions or fit proportionally without cropping",
    "Batch file processing (up to 15 files, 150MB per file, 1000MB total)",
    "Local browser processing via JavaScript and WebAssembly",
    "No media file upload to MediaKit servers",
    "Privacy-first design",
  ],
  browserRequirements: "Requires JavaScript and WebAssembly support. Works best in modern browsers.",
  softwareHelp: {
    "@type": "CreativeWork",
    url: `${baseUrl}/disclaimer`,
  },
  publisher: {
    "@type": "Organization",
    name: "MediaKit",
    url: baseUrl,
  },
  inLanguage: "en",
  isAccessibleForFree: true,
  keywords: "image converter, video converter, HEIC converter, image compressor, video compressor, local processing, privacy, free online tool",
};

// WebSite schema - enables site-level entity understanding in SERPs
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "MediaKit",
  url: baseUrl,
  description: "Free online media converter. Convert and compress images and videos, and resize images locally in your browser.",
  inLanguage: "en",
};

export default function DocumentLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html lang={locale === "pt" ? "pt-BR" : locale}>
      <head>
        {/* JSON-LD 使用原生 script，确保首屏 HTML 即含结构化数据（部分爬虫不执行 next/script） */}
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...jsonLd, inLanguage: locale }) }}
        />
        <script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...websiteJsonLd, inLanguage: locale }) }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicon — SVG first（现代浏览器），ICO 兜底（IE/旧设备/Slack/Discord 抓站） */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" sizes="any" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body>
        <GoogleAnalytics />
        <ProductAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

