/**
 * Build metadata and JSON-LD for image layout by locale.
 * Used by app/image/layout.tsx and app/[ja|es|pt]/image/layout.tsx.
 */
import type { Metadata } from "next";
import Script from "next/script";
import { getImageLayoutMeta } from "./index";
import { LOCALES } from "./index";
import type { Locale } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";

function getImageCanonical(locale: Locale): string {
  return locale === "en" ? `${baseUrl}/image` : `${baseUrl}/${locale}/image`;
}

/**
 * Image page metadata per locale.
 * Ensures each language has: independent <title> (with language keywords),
 * <meta name="description"> (concise core functionality), <meta name="robots"> (allow index).
 */
export function getImageLayoutMetadata(locale: Locale): Metadata {
  const meta = getImageLayoutMeta(locale);
  const canonical = getImageCanonical(locale);
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => {
    languages[l] = l === "en" ? `${baseUrl}/image` : `${baseUrl}/${l}/image`;
  });
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
      url: canonical,
      siteName: "MediaCC",
      locale: locale === "en" ? "en_US" : locale === "ja" ? "ja_JP" : locale === "es" ? "es_ES" : "pt_BR",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: meta.openGraphTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: ["/og-image.jpg"],
    },
    alternates: { canonical, languages },
    other: { language: locale },
  };
}

export function ImageLayoutScripts({ locale }: { locale: Locale }) {
  const meta = getImageLayoutMeta(locale);
  const softwareAppJsonLd = { ...meta.softwareApp, "@context": "https://schema.org" };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faq.map((q) => ({
      "@type": "Question" as const,
      name: q.name,
      acceptedAnswer: { "@type": "Answer" as const, text: q.text },
    })),
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo" as const,
    name: meta.howTo.name,
    description: meta.howTo.description,
    totalTime: "PT2M" as const,
    tool: { "@type": "HowToTool" as const, name: "MediaCC Image Converter" },
    step: meta.howTo.step.map((s, i) => ({ "@type": "HowToStep" as const, position: i + 1, name: s.name, text: s.text })),
  };
  return (
    <>
      <Script id="image-software-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <Script id="image-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id="image-howto-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </>
  );
}
