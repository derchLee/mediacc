/**
 * Locale and translation types for static build-time i18n.
 * Each language = independent URL, content baked at build.
 */

export type Locale = "en" | "ja" | "es" | "pt";

export const LOCALES: Locale[] = ["en", "ja", "es", "pt"];

/** URL prefix for locale (en = no prefix, others = /ja, /es, /pt) */
export function getLocalePrefix(locale: Locale): "" | "/ja" | "/es" | "/pt" {
  if (locale === "en") return "";
  return `/${locale}`;
}

/** Path to image page for locale */
export function getImagePath(locale: Locale): string {
  const prefix = getLocalePrefix(locale);
  return prefix ? `${prefix}/image` : "/image";
}

/** Path to video page for locale */
export function getVideoPath(locale: Locale): string {
  const prefix = getLocalePrefix(locale);
  return prefix ? `${prefix}/video` : "/video";
}

/** Common UI strings (MainLayout: tabs, follow, footer) */
export interface CommonT {
  tabImage: string;
  tabVideo: string;
  followUs: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
  disclaimer: string;
  allRightsReserved: string;
}

/** Shared UI strings (FileUploader, OperationSelector, ConversionSettings, ResultList, FilePreviewList) */
export interface UiT {
  dragDropImages: string;
  dragDropVideos: string;
  releaseToUpload: string;
  orClickToSelect: string;
  selectFiles: string;
  localProcessingNotice: string;
  fileValidationFailed: string;
  selectOperation: string;
  formatConversion: string;
  convertToOtherFormats: string;
  compression: string;
  reduceFileSize: string;
  selectTargetFormat: string;
  converting: string;
  startConversion: string;
  selectCompressionMode: string;
  losslessCompression: string;
  losslessDesc: string;
  lossyCompression: string;
  lossyDesc: string;
  compressing: string;
  startCompression: string;
  processingComplete: string;
  download: string;
  remove: string;
  removeFile: string;
  uploadedFiles: string;
  supportedImageFormats: string;
  supportedVideoFormats: string;
  size: string;
  type: string;
  mode: string;
  lossless: string;
  lossy: string;
  targetFormat: string;
}

/** Image page body + guide strings */
export interface ImagePageT {
  h1: string;
  intro: string;
  whyChoose: string;
  whyList: string[];
  howItWorks: string;
  howSteps: string[];
  detailedGuide: string;
  howToUse: string;
  formatConversion: string;
  formatConversionList: string[];
  imageCompression: string;
  imageCompressionList: string[];
  batchProcessing: string;
  batchList: string[];
  fileLimits: string;
  fileLimitsList: string[];
  largeFileWarnings: string[];
  implementationPrinciples: string;
  formatConversionPrinciple: string;
  formatConversionPrincipleList: string[];
  compressionPrinciple: string;
  compressionPrincipleList: string[];
  privacySecurity: string;
  privacyText: string;
  processingFailed: string;
}

/** Video page body + guide strings */
export interface VideoPageT {
  h1: string;
  intro: string;
  whyChoose: string;
  whyList: string[];
  howItWorks: string;
  howSteps: string[];
  detailedGuide: string;
  howToUse: string;
  formatConversion: string;
  formatConversionList: string[];
  videoCompression: string;
  videoCompressionList: string[];
  batchProcessing: string;
  batchList: string[];
  fileLimits: string;
  fileLimitsList: string[];
  largeFileWarnings: string[];
  implementationPrinciples: string;
  videoEngine: string;
  videoEngineList: string[];
  conversionProcess: string;
  conversionProcessList: string[];
  compressionPrinciple: string;
  compressionPrincipleList: string[];
  privacySecurity: string;
  privacyText: string;
  processingFailed: string;
}

/** FAQ item for JSON-LD */
export interface FAQItem {
  name: string;
  text: string;
}

/** HowTo step for JSON-LD */
export interface HowToStep {
  name: string;
  text: string;
}

/** Image layout: metadata + JSON-LD content (per locale) */
export interface ImageLayoutMetaT {
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  openGraphDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  softwareApp: Record<string, unknown>;
  faq: FAQItem[];
  howTo: { name: string; description: string; step: HowToStep[] };
}

/** Video layout: metadata + JSON-LD content (per locale) */
export interface VideoLayoutMetaT {
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  openGraphDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  softwareApp: Record<string, unknown>;
  faq: FAQItem[];
  howTo: { name: string; description: string; step: HowToStep[] };
}
