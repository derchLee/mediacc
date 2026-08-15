/**
 * English (EN) – default locale, URLs: /image, /video
 */

import type { CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT, UiT } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mediacc.it.com";

export const common: CommonT = {
  tabImage: "Image Processing",
  tabVideo: "Video Processing",
  followUs: "Follow us at:",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  cookiePolicy: "Cookie Policy",
  disclaimer: "Disclaimer",
  allRightsReserved: "All rights reserved.",
};

export const ui: UiT = {
  dragDropImages: "Drag and drop image files here",
  dragDropVideos: "Drag and drop video files here",
  releaseToUpload: "Release to upload files",
  orClickToSelect: "Or click the button below to select files",
  selectFiles: "Select Files",
  localProcessingNotice: "100% local processing, files are not uploaded to server",
  fileValidationFailed: "File validation failed",
  tooManyFiles: "You can select up to {max} files. {current} file(s) are already selected.",
  fileTooLarge: "Each file must be {max} MB or smaller.",
  totalSizeTooLarge: "The total size cannot exceed {max} MB. {current} MB is already selected.",
  fileTypeMismatch: "{count} selected file(s) do not match the supported format.",
  uploadSuccess: "Files added successfully. Continue to the uploads workspace to convert or compress them.",
  continueProcessing: "Continue to uploads",
  close: "Close",
  cookieSettings: "Cookie Settings",
  cookiesTitle: "We Use Cookies",
  cookiesDescription: "We use cookies to improve your experience and analyze site traffic.",
  learnMore: "Learn more",
  acceptAll: "Accept All",
  rejectAll: "Reject All",
  customize: "Customize",
  necessaryCookies: "Necessary Cookies",
  necessaryCookiesDesc: "Required for the website to function properly",
  analyticsCookies: "Analytics Cookies",
  analyticsCookiesDesc: "Help us understand how visitors use the website",
  advertisingCookies: "Advertising Cookies",
  advertisingCookiesDesc: "Used to deliver relevant advertisements",
  savePreferences: "Save Preferences",
  unexpectedError: "Something went wrong",
  retry: "Try again",
  pageNotFound: "Page not found",
  pageNotFoundDesc: "The page you requested does not exist.",
  backHome: "Back to home",
  selectOperation: "Select Operation",
  formatConversion: "Format Conversion",
  convertToOtherFormats: "Convert to other formats",
  compression: "Compression",
  reduceFileSize: "Reduce file size",
  selectTargetFormat: "Select Target Format",
  converting: "Converting...",
  startConversion: "Start Conversion",
  selectCompressionMode: "Select Compression Mode",
  losslessCompression: "Lossless Compression",
  losslessDesc: "Maintain original quality, limited file size reduction",
  lossyCompression: "Lossy Compression",
  lossyDesc: "Reduce file size with some quality loss",
  compressing: "Compressing...",
  startCompression: "Start Compression",
  processingComplete: "Processing Complete",
  download: "Download",
  remove: "Remove",
  removeFile: "Remove file",
  uploadedFiles: "Uploaded Files",
  supportedImageFormats: "Supported Image Formats",
  supportedVideoFormats: "Supported Video Formats",
  size: "Size",
  type: "Type",
  mode: "Mode",
  lossless: "Lossless",
  lossy: "Lossy",
  targetFormat: "Target Format",
};

export const imagePage: ImagePageT = {
  h1: "Free Image Converter: HEIC to JPG, PNG & WebP",
  intro:
    "Convert HEIC photos to JPG, PNG, or WebP and batch-convert or compress images for free. MediaCC runs locally in your browser—no upload, no signup, and no watermark. Your files never leave your device.",
  whyChoose: "Why Choose MediaCC?",
  whyList: [
    "100% local processing – files never leave your device",
    "Free to use with no signup and no watermark",
    "Batch-convert up to 15 images in one session",
    "Convert iPhone HEIC/HEIF photos and JPG, PNG, or WebP images to JPG, PNG, or WebP",
  ],
  howItWorks: "How It Works",
  howSteps: [
    "Select an image from your device (drag & drop or click to upload)",
    "Choose output format or compression level",
    "Download the processed image instantly – all processing happens locally in your browser",
  ],
  tutorialTitle: "Image conversion and compression example",
  tutorialDescription: "Follow this animated example to add images, choose an output format or compression mode, process them locally, and download the results.",
  detailedGuide: "Detailed Usage Guide",
  howToUse: "How to Use",
  formatConversion: "1. Format Conversion",
  formatConversionList: [
    "Reliable output formats: JPG/JPEG, PNG, and WebP. HEIC/HEIF input is converted in supported browsers; AVIF input depends on browser support.",
    'Select "Convert" operation and choose the target format (e.g., JPG to PNG)',
    'Click the "Start Processing" button, and the system will complete the conversion locally in your browser',
    "After conversion, you can directly download the image in the new format",
  ],
  imageCompression: "2. Image Compression",
  imageCompressionList: [
    'Select "Compress" operation and choose compression mode',
    "High-quality mode: Prioritizes visual quality while optimizing file size",
    "Smaller-size mode: Balances quality and file size for stronger compression",
    "Supports batch processing of multiple image files",
  ],
  batchProcessing: "3. Batch Processing",
  batchList: [
    "You can upload multiple image files simultaneously",
    "All files will be processed in queue order",
    "Each file can be downloaded individually after processing is complete",
  ],
  fileLimits: "4. File Size Limits & Notes",
  fileLimitsList: [
    "Single file limit: Maximum 150MB per image file",
    "Total file size limit: Maximum 1000MB total file size per session",
    "File count limit: Maximum 15 files can be processed simultaneously",
    "Large file processing warnings:",
  ],
  largeFileWarnings: [
    "Larger files take longer to process; we recommend keeping individual files under 50MB for the best experience",
    "Files over 100MB may cause processing timeout or browser memory issues",
    "If processing fails due to large file size, consider compressing the image with another tool first",
    "Keep the browser tab open when processing large files to avoid interruption from switching tabs",
  ],
  implementationPrinciples: "Implementation Principles",
  formatConversionPrinciple: "Format Conversion Principle",
  formatConversionPrincipleList: [
    "HEIC/HEIF: Decoded client-side via heic2any (WebAssembly), then output as JPG/PNG/WebP",
    "JPG, PNG, and WebP: Canvas API loads image, draws to canvas, exports via toBlob()",
    "For JPEG and WebP, preset quality parameters are used for export",
    "AVIF input support depends on the current browser; unsupported formats prompt the user instead of being advertised as guaranteed outputs",
  ],
  compressionPrinciple: "Compression Principle",
  compressionPrincipleList: [
    "HEIC source: First converted to JPG/PNG via heic2any, then compressed",
    "Uses browser-image-compression for browser-side compression presets:",
    "High-quality mode: Keeps visual quality high while applying optimized encoding parameters",
    "Smaller-size mode: Uses stronger compression settings to reduce file size with acceptable visual quality",
    "Uses Web Worker for background thread processing without blocking the main interface",
    "Keeps the original image dimensions unless browser processing requires a compatible fallback",
  ],
  privacySecurity: "Privacy & Security",
  privacyText:
    "All processing happens locally in your browser. MediaCC never uploads, stores, or analyzes your files. Your images stay on your device from start to finish – no server, no cloud, no third-party access.",
  processingFailed: "Processing Failed",
};

export const videoPage: VideoPageT = {
  h1: "Free Video to MP4 Converter & Compressor",
  intro:
    "Convert MOV, WebM, MKV, or AVI to MP4 and compress video for free. MediaCC uses FFmpeg.wasm locally in your browser—no upload, no signup, and no watermark. Your videos never leave your device.",
  whyChoose: "Why Choose MediaCC?",
  whyList: [
    "100% local processing – files never leave your device",
    "Free to use with no signup and no watermark",
    "Private, browser-based conversion powered by FFmpeg.wasm",
    "Convert MOV, WebM, MKV, and AVI to widely compatible MP4",
  ],
  howItWorks: "How It Works",
  howSteps: [
    "Select a video from your device (drag & drop or click to upload)",
    "Choose output format or compression level",
    "Download the processed video – all processing happens locally in your browser",
  ],
  tutorialTitle: "Video format conversion example",
  tutorialDescription: "Follow this animated example to add videos, select the target format, start local conversion, and download each completed file.",
  detailedGuide: "Detailed Usage Guide",
  howToUse: "How to Use",
  formatConversion: "1. Format Conversion",
  formatConversionList: [
    "Supported formats: MP4, WebM, MOV, AVI, MKV, WMV, FLV",
    'Select "Convert" operation and choose the target format (e.g., MOV to MP4)',
    'Click the "Start Processing" button, and the system will complete the conversion locally in your browser',
    "Processing progress will be displayed during conversion, and you can download the video in the new format after completion",
  ],
  videoCompression: "2. Video Compression",
  videoCompressionList: [
    'Select "Compress" operation and choose compression mode',
    "High-quality mode: Uses a quality-focused FFmpeg preset to optimize file size while preserving visual quality",
    "Smaller-size mode: Uses stronger compression settings to reduce file size with acceptable visual quality",
    "Compression may take a considerable amount of time, please be patient",
  ],
  batchProcessing: "3. Batch Processing",
  batchList: [
    "You can upload multiple video files simultaneously",
    "All files will be processed in queue order to avoid browser performance issues from processing multiple large files simultaneously",
    "Each file can be downloaded individually after processing is complete",
  ],
  fileLimits: "4. File Size Limits & Notes",
  fileLimitsList: [
    "Single file limit: Maximum 150MB per video file",
    "Total file size limit: Maximum 1000MB total file size per session",
    "File count limit: Maximum 15 files can be processed simultaneously",
    "Large file processing warnings:",
  ],
  largeFileWarnings: [
    "Video processing is more time-consuming than image processing; we recommend keeping individual files under 50MB for the best experience",
    "Video files over 100MB may cause processing timeout (up to 45 minutes) or browser memory issues",
    "20-50MB videos may take 20-30 minutes, while 50-100MB videos may take 30-45 minutes",
    "If processing fails due to timeout from large files, consider compressing the video with another tool first",
    "Keep the browser tab open when processing large files to avoid interruption from switching tabs",
    "We recommend processing in a stable network environment to avoid failures due to network issues",
  ],
  implementationPrinciples: "Implementation Principles",
  videoEngine: "Video Processing Engine",
  videoEngineList: [
    "Uses FFmpeg.wasm (WebAssembly version of FFmpeg) to process videos in the browser:",
    "FFmpeg.wasm is a WebAssembly port of FFmpeg, providing complete video encoding and decoding capabilities",
    "All processing is completed in a virtual file system within browser memory",
    "Uses iframe isolation environment to ensure stable module loading and execution",
    "Supports multi-threaded processing (requires SharedArrayBuffer support)",
  ],
  conversionProcess: "Format Conversion Process",
  conversionProcessList: [
    "Read video file as ArrayBuffer and write to FFmpeg virtual file system",
    "Use FFmpeg commands for transcoding: -c:v libx264 (video encoder), -c:a aac (audio encoder)",
    "Set encoding parameters: preset controls encoding speed, CRF value controls quality (range 18-28)",
    "Read processed video data from virtual file system and convert to Blob",
    "Clean up temporary files and release memory",
  ],
  compressionPrinciple: "Compression Principle",
  compressionPrincipleList: [
    "High-quality mode: Uses a quality-focused preset to optimize encoding efficiency while preserving visual quality",
    "Smaller-size mode: Uses stronger compression parameters to significantly reduce file size",
    "All processing is completed locally in the browser without relying on server resources",
  ],
  privacySecurity: "Privacy & Security",
  privacyText:
    "All processing happens locally in your browser. MediaCC never uploads, stores, or analyzes your files. Your videos stay on your device from start to finish – no server, no cloud, no third-party access.",
  processingFailed: "Processing Failed",
};

function buildImageLayoutMeta(): ImageLayoutMetaT {
  const url = `${baseUrl}/image`;
  return {
    title: "HEIC to JPG & Free Image Converter – No Upload",
    description:
      "Convert HEIC to JPG, PNG or WebP and batch-compress images free in your browser. No upload, signup or watermark; files stay on your device.",
    keywords: [
      "free image converter",
      "heic to jpg",
      "heic converter",
      "online image compressor",
      "jpg to png converter",
      "png to webp converter",
      "webp to jpg",
      "image compression online",
      "reduce image size",
      "local image processing",
      "privacy-first image tool",
      "browser-based image converter",
      "batch image converter",
      "convert images without uploading",
      "image converter no signup",
    ],
    openGraphTitle: "HEIC to JPG & Free Batch Image Converter – MediaCC",
    openGraphDescription:
      "Convert HEIC photos and JPG, PNG, WebP images directly in your browser. Your files never leave your device.",
    twitterTitle: "Free Online Image Converter & Compressor",
    twitterDescription:
      "A privacy-first image tool with 100% local processing. Convert HEIC, JPG, PNG, and WebP without uploading files.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Image Converter",
      alternateName: "Online Image Converter & Compressor",
      description: "Convert HEIC, JPG, PNG, WebP and compress images locally in your browser.",
      softwareVersion: "1.0",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Image Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "en",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "Are my images uploaded to a server?",
        text: "No. All conversion and compression runs locally via Canvas API, heic2any (for HEIC), and WebAssembly. Your files never leave your device—zero upload, 100% privacy.",
      },
      {
        name: "Is MediaCC Image Converter free to use?",
        text: "Yes. MediaCC is completely free with no registration, no account, and no usage caps. Zero hidden fees, no watermarks. All features—including batch processing of up to 15 files—are included.",
      },
      {
        name: "What image formats are supported?",
        text: "MediaCC supports JPG/JPEG, PNG, WebP, and HEIC/HEIF input in supported browsers. HEIC (iOS photos) is decoded client-side via heic2any and can be exported as JPG, PNG, or WebP. AVIF input depends on browser support.",
      },
      {
        name: "What is the maximum file size for image conversion?",
        text: "Single file limit: 150MB. Session limit: 1000MB total across up to 15 files. For best performance, we recommend files under 50MB each.",
      },
      {
        name: "How does browser-based image processing work?",
        text: "MediaCC uses Canvas API and browser-image-compression. HEIC uses heic2any for client-side decoding. All processing runs in JavaScript/WebAssembly—no server requests. Images are processed and exported locally.",
      },
      {
        name: "Can I batch convert multiple images at once?",
        text: "Yes. You can process up to 15 images per batch with a 1000MB total limit. Files are processed sequentially to avoid memory issues and ensure stable operation.",
      },
      {
        name: "Will image quality be affected during conversion?",
        text: "Format conversion and compression can affect output quality depending on the selected format and mode. MediaCC uses preset browser-side quality settings for JPG/WebP output and a stronger compression mode when smaller files are preferred.",
      },
    ],
    howTo: {
      name: "How to Convert and Compress Images Online",
      description: "Step-by-step guide to convert image formats and reduce file size using MediaCC's browser-based tool.",
      step: [
        { name: "Upload Images", text: "Drag and drop your images or click to select files. Supports JPG, PNG, WebP, and HEIC/HEIF input up to 150MB per file." },
        { name: "Choose Output Format", text: "Select your desired output format from the dropdown: JPG, PNG, or WebP." },
        { name: "Choose Compression Mode", text: "Use the available compression modes to prioritize either visual quality or smaller file size." },
        { name: "Process and Download", text: "Click Convert/Compress to process your images locally. Download the results when complete." },
      ],
    },
  };
}

function buildVideoLayoutMeta(): VideoLayoutMetaT {
  const url = `${baseUrl}/video`;
  return {
    title: "Video to MP4 Converter – Free, Private, No Upload",
    description:
      "Convert MOV, WebM, MKV or AVI to MP4 and compress video free in your browser. Private FFmpeg.wasm processing with no upload, signup or watermark.",
    keywords: [
      "free video converter",
      "online video compressor",
      "mp4 converter",
      "webm to mp4",
      "mov converter",
      "video compression online",
      "reduce video size",
      "local video processing",
      "privacy-first video tool",
      "browser-based video converter",
      "ffmpeg online",
      "video to mp4 converter",
      "mov to mp4 converter",
      "convert video without uploading",
      "video converter no signup",
    ],
    openGraphTitle: "Free Video to MP4 Converter – No Upload | MediaCC",
    openGraphDescription:
      "Convert and compress videos directly in your browser. Your files never leave your device. Support MP4, WebM, MOV, MKV, AVI formats.",
    twitterTitle: "Free Online Video Converter & Compressor",
    twitterDescription:
      "A privacy-first video tool with 100% local processing. Convert MP4, WebM, MOV, MKV, AVI without uploading files.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Video Converter",
      alternateName: "Online Video Converter & Compressor",
      description: "Convert and compress videos locally in your browser.",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Video Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "en",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "Are my videos uploaded to a server?",
        text: "No. All video conversion and compression runs locally via FFmpeg.wasm (WebAssembly). Your files never leave your device—zero upload, 100% privacy. FFmpeg runs entirely in the browser.",
      },
      {
        name: "Is MediaCC Video Converter free to use?",
        text: "Yes. MediaCC Video Converter is completely free with no registration, no daily limits, and no watermarks. Browser-based format conversion and compression features are included.",
      },
      {
        name: "What video formats are supported?",
        text: "MediaCC supports common browser-side video conversion workflows for MP4, WebM, MOV, MKV, and AVI. You can convert between these formats and use preset compression modes to reduce file size.",
      },
      {
        name: "What is the maximum file size for video conversion?",
        text: "Single file: 150MB. Session: 1000MB across up to 15 files. 20–50MB videos may take 20–30 minutes; 50–100MB may take 30–45 min. Recommended: keep files under 50MB for faster processing.",
      },
      {
        name: "How does browser-based video processing work?",
        text: "MediaCC uses FFmpeg.wasm—a WebAssembly port of FFmpeg. Encoding/decoding runs in an in-memory virtual filesystem. No server calls. Supports libx264 (video) and AAC (audio) codecs.",
      },
      {
        name: "Does MediaCC upload videos for processing?",
        text: "No. MediaCC processes videos locally in your browser with FFmpeg.wasm. The tradeoff is that large videos can take longer and depend on your device memory and CPU.",
      },
      {
        name: "Why is video processing slower than image processing?",
        text: "Videos contain hundreds or thousands of frames and require full decode/encode cycles. FFmpeg.wasm runs in the browser—typically 20–45 minutes for 50–100MB files—but ensures complete privacy.",
      },
      {
        name: "Can I batch convert multiple videos at once?",
        text: "Yes. Up to 15 videos per batch (1000MB total). Videos are processed sequentially to prevent browser memory exhaustion and ensure stable operation.",
      },
    ],
    howTo: {
      name: "How to Convert and Compress Videos Online",
      description: "Step-by-step guide to convert video formats and reduce file size using MediaCC's browser-based FFmpeg.wasm tool.",
      step: [
        { name: "Upload Videos", text: "Drag and drop your videos or click to select files. Supports MP4, WebM, MOV, MKV, AVI formats up to 150MB per file." },
        { name: "Choose Output Format", text: "Select your desired output format from the dropdown menu: MP4, WebM, MOV, MKV, or AVI." },
        { name: "Choose Compression Mode", text: "Select a preset compression mode to prioritize either visual quality or smaller file size." },
        { name: "Process and Download", text: "Click Convert/Compress to process your videos locally using FFmpeg.wasm. Download the results when complete." },
      ],
    },
  };
}

export const imageLayoutMeta = buildImageLayoutMeta();
export const videoLayoutMeta = buildVideoLayoutMeta();
