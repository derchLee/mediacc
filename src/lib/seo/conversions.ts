import type { Metadata } from "next";
import type { Locale } from "@/lib/translations";
import { LOCALES } from "@/lib/translations";
import { getLocalePrefix } from "@/lib/translations/types";

export type MediaKind = "image" | "video";
export type ConversionSlug = `${string}-to-${string}`;

export interface ConversionDefinition {
  kind: MediaKind;
  slug: ConversionSlug;
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  popular?: boolean;
  related: ConversionSlug[];
}

interface ConversionCopy {
  converter: string;
  titleSuffix: string;
  privateBrowserTool: string;
  h1: string;
  intro: string;
  cta: string;
  howToHeading: string;
  steps: string[];
  capabilityHeading: string;
  capability: string;
  limitsHeading: string;
  limits: string;
  faqHeading: string;
  relatedHeading: string;
  popularImageHeading: string;
  popularVideoHeading: string;
  backToImage: string;
  backToVideo: string;
  faq: {
    private: string;
    upload: string;
    free: string;
    limits: string;
    quality: string;
    videoTime: string;
  };
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mediacc.it.com";

export const imageConversions: ConversionDefinition[] = [
  { kind: "image", slug: "heic-to-jpg", from: "heic", to: "jpg", fromLabel: "HEIC", toLabel: "JPG", popular: true, related: ["heic-to-png", "heic-to-webp", "png-to-jpg", "jpg-to-webp"] },
  { kind: "image", slug: "heic-to-png", from: "heic", to: "png", fromLabel: "HEIC", toLabel: "PNG", popular: true, related: ["heic-to-jpg", "heic-to-webp", "png-to-webp", "webp-to-png"] },
  { kind: "image", slug: "heic-to-webp", from: "heic", to: "webp", fromLabel: "HEIC", toLabel: "WebP", popular: true, related: ["heic-to-jpg", "heic-to-png", "jpg-to-webp", "png-to-webp"] },
  { kind: "image", slug: "jpg-to-png", from: "jpg", to: "png", fromLabel: "JPG", toLabel: "PNG", related: ["png-to-jpg", "jpg-to-webp", "webp-to-png", "heic-to-png"] },
  { kind: "image", slug: "jpg-to-webp", from: "jpg", to: "webp", fromLabel: "JPG", toLabel: "WebP", popular: true, related: ["png-to-webp", "webp-to-jpg", "jpg-to-png", "heic-to-webp"] },
  { kind: "image", slug: "png-to-jpg", from: "png", to: "jpg", fromLabel: "PNG", toLabel: "JPG", popular: true, related: ["jpg-to-png", "png-to-webp", "webp-to-jpg", "heic-to-jpg"] },
  { kind: "image", slug: "png-to-webp", from: "png", to: "webp", fromLabel: "PNG", toLabel: "WebP", popular: true, related: ["jpg-to-webp", "webp-to-png", "png-to-jpg", "heic-to-webp"] },
  { kind: "image", slug: "webp-to-jpg", from: "webp", to: "jpg", fromLabel: "WebP", toLabel: "JPG", popular: true, related: ["jpg-to-webp", "webp-to-png", "png-to-jpg", "heic-to-jpg"] },
  { kind: "image", slug: "webp-to-png", from: "webp", to: "png", fromLabel: "WebP", toLabel: "PNG", related: ["png-to-webp", "webp-to-jpg", "jpg-to-png", "heic-to-png"] },
];

export const videoConversions: ConversionDefinition[] = [
  { kind: "video", slug: "mov-to-mp4", from: "mov", to: "mp4", fromLabel: "MOV", toLabel: "MP4", popular: true, related: ["webm-to-mp4", "mkv-to-mp4", "avi-to-mp4", "mp4-to-webm"] },
  { kind: "video", slug: "webm-to-mp4", from: "webm", to: "mp4", fromLabel: "WebM", toLabel: "MP4", popular: true, related: ["mov-to-mp4", "mp4-to-webm", "mkv-to-mp4", "avi-to-mp4"] },
  { kind: "video", slug: "mp4-to-webm", from: "mp4", to: "webm", fromLabel: "MP4", toLabel: "WebM", popular: true, related: ["webm-to-mp4", "mov-to-mp4", "mkv-to-mp4", "avi-to-mp4"] },
  { kind: "video", slug: "mkv-to-mp4", from: "mkv", to: "mp4", fromLabel: "MKV", toLabel: "MP4", popular: true, related: ["mov-to-mp4", "webm-to-mp4", "avi-to-mp4", "mp4-to-webm"] },
  { kind: "video", slug: "avi-to-mp4", from: "avi", to: "mp4", fromLabel: "AVI", toLabel: "MP4", popular: true, related: ["mov-to-mp4", "webm-to-mp4", "mkv-to-mp4", "mp4-to-webm"] },
];

export const allConversions = [...imageConversions, ...videoConversions];

const localeCopy: Record<Locale, ConversionCopy> = {
  en: {
    converter: "Converter",
    titleSuffix: "Free, Private Browser Tool",
    privateBrowserTool: "private browser tool",
    h1: "{from} to {to} Converter",
    intro: "Convert {from} to {to} with MediaCC directly in your browser. Your media files stay on your device and are not uploaded to MediaCC servers.",
    cta: "Open the {kind} converter",
    howToHeading: "How to convert {from} to {to}",
    steps: [
      "Open the MediaCC {kind} converter.",
      "Select your {from} file from your device.",
      "Choose {to} as the target format and start conversion.",
      "Download the converted {to} file when local processing finishes.",
    ],
    capabilityHeading: "Browser-based conversion notes",
    capability: "MediaCC processes files locally in supported browsers. Image output is focused on JPG, PNG, and WebP; HEIC/HEIF photos can be converted to JPG, PNG, or WebP. Video conversion uses FFmpeg.wasm and works best with common formats such as MP4, MOV, WebM, MKV, and AVI.",
    limitsHeading: "File limits",
    limits: "You can process up to 15 files per session, with a 150MB single-file limit and 1000MB total session limit. Large videos may take several minutes depending on file size, duration, format, and device performance.",
    faqHeading: "Frequently asked questions",
    relatedHeading: "Related conversions",
    popularImageHeading: "Popular image conversions",
    popularVideoHeading: "Popular video conversions",
    backToImage: "Back to image converter",
    backToVideo: "Back to video converter",
    faq: {
      private: "Is {from} to {to} conversion private?",
      upload: "Are my files uploaded to MediaCC servers?",
      free: "Is the {from} to {to} converter free?",
      limits: "What file size limits apply?",
      quality: "Will conversion change quality?",
      videoTime: "Why can video conversion take time?",
    },
  },
  ja: {
    converter: "変換ツール",
    titleSuffix: "無料・プライベートなブラウザツール",
    privateBrowserTool: "プライベートなブラウザツール",
    h1: "{from} から {to} への変換ツール",
    intro: "MediaCC で {from} を {to} にブラウザ内で変換できます。メディアファイルは端末内に残り、MediaCC サーバーへアップロードされません。",
    cta: "{kind} 変換ツールを開く",
    howToHeading: "{from} を {to} に変換する方法",
    steps: [
      "MediaCC の {kind} 変換ツールを開きます。",
      "端末から {from} ファイルを選択します。",
      "出力形式に {to} を選び、変換を開始します。",
      "ローカル処理が完了したら {to} ファイルをダウンロードします。",
    ],
    capabilityHeading: "ブラウザ変換の注意点",
    capability: "MediaCC は対応ブラウザ内でローカル処理します。画像出力は主に JPG、PNG、WebP に対応し、HEIC/HEIF 写真は JPG、PNG、WebP に変換できます。動画変換は FFmpeg.wasm を使用し、MP4、MOV、WebM、MKV、AVI など一般的な形式に適しています。",
    limitsHeading: "ファイル制限",
    limits: "1セッションで最大15ファイル、1ファイル150MB、合計1000MBまで処理できます。大きな動画はサイズ、長さ、形式、端末性能により数分以上かかる場合があります。",
    faqHeading: "よくある質問",
    relatedHeading: "関連する変換",
    popularImageHeading: "人気の画像変換",
    popularVideoHeading: "人気の動画変換",
    backToImage: "画像変換ツールへ戻る",
    backToVideo: "動画変換ツールへ戻る",
    faq: {
      private: "{from} から {to} への変換はプライベートですか？",
      upload: "ファイルは MediaCC サーバーへアップロードされますか？",
      free: "{from} から {to} への変換は無料ですか？",
      limits: "ファイルサイズ制限はありますか？",
      quality: "変換で画質は変わりますか？",
      videoTime: "動画変換に時間がかかるのはなぜですか？",
    },
  },
  es: {
    converter: "Convertidor",
    titleSuffix: "herramienta privada y gratuita en navegador",
    privateBrowserTool: "herramienta privada en navegador",
    h1: "Convertidor de {from} a {to}",
    intro: "Convierte {from} a {to} con MediaCC directamente en tu navegador. Tus archivos permanecen en tu dispositivo y no se suben a los servidores de MediaCC.",
    cta: "Abrir el convertidor de {kind}",
    howToHeading: "Cómo convertir {from} a {to}",
    steps: [
      "Abre el convertidor de {kind} de MediaCC.",
      "Selecciona tu archivo {from} desde el dispositivo.",
      "Elige {to} como formato de destino e inicia la conversión.",
      "Descarga el archivo {to} convertido cuando termine el procesamiento local.",
    ],
    capabilityHeading: "Notas de conversión en navegador",
    capability: "MediaCC procesa archivos localmente en navegadores compatibles. La salida de imagen se centra en JPG, PNG y WebP; las fotos HEIC/HEIF pueden convertirse a JPG, PNG o WebP. La conversión de video usa FFmpeg.wasm y funciona mejor con formatos comunes como MP4, MOV, WebM, MKV y AVI.",
    limitsHeading: "Límites de archivo",
    limits: "Puedes procesar hasta 15 archivos por sesión, con límite de 150MB por archivo y 1000MB en total. Los videos grandes pueden tardar varios minutos según tamaño, duración, formato y rendimiento del dispositivo.",
    faqHeading: "Preguntas frecuentes",
    relatedHeading: "Conversiones relacionadas",
    popularImageHeading: "Conversiones de imagen populares",
    popularVideoHeading: "Conversiones de video populares",
    backToImage: "Volver al convertidor de imágenes",
    backToVideo: "Volver al convertidor de videos",
    faq: {
      private: "¿La conversión de {from} a {to} es privada?",
      upload: "¿Mis archivos se suben a los servidores de MediaCC?",
      free: "¿El convertidor de {from} a {to} es gratuito?",
      limits: "¿Qué límites de tamaño se aplican?",
      quality: "¿La conversión cambia la calidad?",
      videoTime: "¿Por qué la conversión de video puede tardar?",
    },
  },
  pt: {
    converter: "Conversor",
    titleSuffix: "ferramenta privada e grátis no navegador",
    privateBrowserTool: "ferramenta privada no navegador",
    h1: "Conversor de {from} para {to}",
    intro: "Converta {from} para {to} com o MediaCC diretamente no navegador. Seus arquivos ficam no dispositivo e não são enviados aos servidores do MediaCC.",
    cta: "Abrir o conversor de {kind}",
    howToHeading: "Como converter {from} para {to}",
    steps: [
      "Abra o conversor de {kind} do MediaCC.",
      "Selecione o arquivo {from} no seu dispositivo.",
      "Escolha {to} como formato de destino e inicie a conversão.",
      "Baixe o arquivo {to} convertido quando o processamento local terminar.",
    ],
    capabilityHeading: "Notas sobre conversão no navegador",
    capability: "O MediaCC processa arquivos localmente em navegadores compatíveis. A saída de imagem foca em JPG, PNG e WebP; fotos HEIC/HEIF podem ser convertidas para JPG, PNG ou WebP. A conversão de vídeo usa FFmpeg.wasm e funciona melhor com formatos comuns como MP4, MOV, WebM, MKV e AVI.",
    limitsHeading: "Limites de arquivo",
    limits: "Você pode processar até 15 arquivos por sessão, com limite de 150MB por arquivo e 1000MB no total. Vídeos grandes podem levar vários minutos dependendo do tamanho, duração, formato e desempenho do dispositivo.",
    faqHeading: "Perguntas frequentes",
    relatedHeading: "Conversões relacionadas",
    popularImageHeading: "Conversões de imagem populares",
    popularVideoHeading: "Conversões de vídeo populares",
    backToImage: "Voltar ao conversor de imagens",
    backToVideo: "Voltar ao conversor de vídeos",
    faq: {
      private: "A conversão de {from} para {to} é privada?",
      upload: "Meus arquivos são enviados aos servidores do MediaCC?",
      free: "O conversor de {from} para {to} é gratuito?",
      limits: "Quais limites de tamanho se aplicam?",
      quality: "A conversão altera a qualidade?",
      videoTime: "Por que a conversão de vídeo pode demorar?",
    },
  },
};

export function getConversionsForKind(kind: MediaKind): ConversionDefinition[] {
  return kind === "image" ? imageConversions : videoConversions;
}

export function getPopularConversions(kind: MediaKind): ConversionDefinition[] {
  return getConversionsForKind(kind).filter((conversion) => conversion.popular);
}

export function getConversion(kind: MediaKind, slug: string): ConversionDefinition | undefined {
  return getConversionsForKind(kind).find((conversion) => conversion.slug === slug);
}

export function getRelatedConversions(conversion: ConversionDefinition): ConversionDefinition[] {
  return conversion.related
    .map((slug) => getConversion(conversion.kind, slug))
    .filter(Boolean) as ConversionDefinition[];
}

export function getConversionPath(locale: Locale, kind: MediaKind, slug: string): string {
  const prefix = getLocalePrefix(locale);
  return `${prefix}/${kind}/${slug}`;
}

export function getToolPath(locale: Locale, kind: MediaKind): string {
  const prefix = getLocalePrefix(locale);
  return `${prefix}/${kind}`;
}

export function getAbsoluteConversionUrl(locale: Locale, kind: MediaKind, slug: string): string {
  return `${baseUrl}${getConversionPath(locale, kind, slug)}`;
}

export function getConversionAlternates(kind: MediaKind, slug: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": getAbsoluteConversionUrl("en", kind, slug),
  };
  for (const locale of LOCALES) {
    languages[locale] = getAbsoluteConversionUrl(locale, kind, slug);
  }
  return languages;
}

export function interpolate(template: string, conversion: ConversionDefinition, kindLabel: string): string {
  return template
    .replaceAll("{from}", conversion.fromLabel)
    .replaceAll("{to}", conversion.toLabel)
    .replaceAll("{kind}", kindLabel);
}

export function getConversionCopy(locale: Locale): ConversionCopy {
  return localeCopy[locale];
}

export function getKindLabel(locale: Locale, kind: MediaKind): string {
  const labels: Record<Locale, Record<MediaKind, string>> = {
    en: { image: "image", video: "video" },
    ja: { image: "画像", video: "動画" },
    es: { image: "imagen", video: "video" },
    pt: { image: "imagem", video: "vídeo" },
  };
  return labels[locale][kind];
}

export function getConversionTitle(locale: Locale, conversion: ConversionDefinition): string {
  const copy = getConversionCopy(locale);
  return interpolate(copy.h1, conversion, getKindLabel(locale, conversion.kind));
}

export function getConversionDescription(locale: Locale, conversion: ConversionDefinition): string {
  const copy = getConversionCopy(locale);
  return interpolate(copy.intro, conversion, getKindLabel(locale, conversion.kind));
}

export function getConversionMetadata(locale: Locale, kind: MediaKind, slug: string): Metadata {
  const conversion = getConversion(kind, slug);
  if (!conversion) return {};

  const title = `${getConversionTitle(locale, conversion)} - ${getConversionCopy(locale).titleSuffix}`;
  const description = getConversionDescription(locale, conversion);
  const canonical = getAbsoluteConversionUrl(locale, kind, slug);

  return {
    title,
    description,
    keywords: [
      `${conversion.fromLabel.toLowerCase()} to ${conversion.toLabel.toLowerCase()}`,
      `${conversion.fromLabel.toLowerCase()} to ${conversion.toLabel.toLowerCase()} converter online free`,
      `${conversion.fromLabel.toLowerCase()} to ${conversion.toLabel.toLowerCase()} no upload`,
      `convert ${conversion.fromLabel.toLowerCase()} to ${conversion.toLabel.toLowerCase()} in browser`,
      `private ${conversion.fromLabel.toLowerCase()} converter`,
      `${conversion.fromLabel.toLowerCase()} converter`,
      `${conversion.toLabel.toLowerCase()} converter`,
      `free ${kind} converter`,
      "no upload converter",
      "browser-based converter",
      "local processing",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical,
      languages: getConversionAlternates(kind, slug),
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "MediaCC",
      locale: locale === "en" ? "en_US" : locale === "ja" ? "ja_JP" : locale === "es" ? "es_ES" : "pt_BR",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    other: { language: locale },
  };
}

export function getConversionFaq(locale: Locale, conversion: ConversionDefinition) {
  const copy = getConversionCopy(locale);
  const kindLabel = getKindLabel(locale, conversion.kind);
  const commonAnswers = {
    private:
      locale === "en"
        ? `Yes. ${conversion.fromLabel} to ${conversion.toLabel} conversion runs in your browser where supported, so your media file stays on your device.`
        : interpolate(copy.intro, conversion, kindLabel),
    upload:
      locale === "en"
        ? "No. MediaCC does not upload your selected media files to MediaCC servers for conversion. Processing happens locally in your browser where supported."
        : interpolate(copy.intro, conversion, kindLabel),
    free:
      locale === "en"
        ? `Yes. The ${conversion.fromLabel} to ${conversion.toLabel} converter is free to use, with no account required and no watermark added by MediaCC.`
        : interpolate(copy.cta, conversion, kindLabel),
    limits: copy.limits,
    quality:
      locale === "en"
        ? "Format conversion may re-encode the file, so output size and visual quality can vary by source format, target format, and browser support."
        : copy.capability,
    videoTime: copy.limits,
  };

  const items = [
    { name: interpolate(copy.faq.private, conversion, kindLabel), text: commonAnswers.private },
    { name: copy.faq.upload, text: commonAnswers.upload },
    { name: interpolate(copy.faq.free, conversion, kindLabel), text: commonAnswers.free },
    { name: copy.faq.limits, text: commonAnswers.limits },
    conversion.kind === "video"
      ? { name: copy.faq.videoTime, text: commonAnswers.videoTime }
      : { name: copy.faq.quality, text: commonAnswers.quality },
  ];

  return items;
}

export function getConversionHowTo(locale: Locale, conversion: ConversionDefinition) {
  const copy = getConversionCopy(locale);
  const kindLabel = getKindLabel(locale, conversion.kind);
  return {
    name: interpolate(copy.howToHeading, conversion, kindLabel),
    description: getConversionDescription(locale, conversion),
    steps: copy.steps.map((step) => interpolate(step, conversion, kindLabel)),
  };
}

export function buildConversionJsonLd(locale: Locale, conversion: ConversionDefinition) {
  const path = getConversionPath(locale, conversion.kind, conversion.slug);
  const url = `${baseUrl}${path}`;
  const toolPath = `${baseUrl}${getToolPath(locale, conversion.kind)}`;
  const faq = getConversionFaq(locale, conversion);
  const howTo = getConversionHowTo(locale, conversion);
  const title = getConversionTitle(locale, conversion);

  return {
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}${getLocalePrefix(locale) || "/"}` },
        { "@type": "ListItem", position: 2, name: conversion.kind === "image" ? "Image Converter" : "Video Converter", item: toolPath },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
    software: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: `MediaCC ${title}`,
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: conversion.kind === "image" ? "Image Converter" : "Video Converter",
      operatingSystem: "Web Browser",
      url,
      downloadUrl: toolPath,
      inLanguage: locale,
      isAccessibleForFree: true,
      description: getConversionDescription(locale, conversion),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      featureList: [
        `${conversion.fromLabel} to ${conversion.toLabel} conversion`,
        "Local browser processing where supported",
        "No media file upload to MediaCC servers",
        "Batch processing up to 15 files",
      ],
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.name,
        acceptedAnswer: { "@type": "Answer", text: item.text },
      })),
    },
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: howTo.name,
      description: howTo.description,
      tool: { "@type": "HowToTool", name: conversion.kind === "image" ? "MediaCC Image Converter" : "MediaCC Video Converter" },
      step: howTo.steps.map((step, index) => ({ "@type": "HowToStep", position: index + 1, text: step })),
    },
  };
}

export function getConversionStaticParams(kind: MediaKind) {
  return getConversionsForKind(kind).map((conversion) => ({ conversion: conversion.slug }));
}

export function getConversionFromPathname(pathname: string | null): { kind: MediaKind; slug: string } | null {
  if (!pathname) return null;
  const match = pathname.match(/^\/(?:(ja|es|pt)\/)?(image|video)\/([^/]+)$/);
  if (!match) return null;
  const kind = match[2] as MediaKind;
  const slug = match[3];
  if (!getConversion(kind, slug)) return null;
  return { kind, slug };
}
