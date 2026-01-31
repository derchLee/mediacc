/**
 * English (EN) – default locale, URLs: /image, /video
 */

import type { CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT, UiT } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";

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
  h1: "Free Online Image Converter & Compressor",
  intro:
    "MediaCC Image Converter is a tool that lets you convert and compress images directly in your browser. No file upload, no server processing, and no privacy risk. Your files never leave your device.",
  whyChoose: "Why Choose MediaCC?",
  whyList: [
    "100% local processing – files never leave your device",
    "Free to use, no signup required",
    "Fast image conversion and compression",
    "Supports JPG, PNG, WebP, AVIF and more",
  ],
  howItWorks: "How It Works",
  howSteps: [
    "Select an image from your device (drag & drop or click to upload)",
    "Choose output format or compression level",
    "Download the processed image instantly – all processing happens locally in your browser",
  ],
  detailedGuide: "Detailed Usage Guide",
  howToUse: "How to Use",
  formatConversion: "1. Format Conversion",
  formatConversionList: [
    "Supported formats: JPG/JPEG, PNG, GIF, WebP, AVIF, HEIC, BMP, TIFF",
    'Select "Convert" operation and choose the target format (e.g., JPG to PNG)',
    'Click the "Start Processing" button, and the system will complete the conversion locally in your browser',
    "After conversion, you can directly download the image in the new format",
  ],
  imageCompression: "2. Image Compression",
  imageCompressionList: [
    'Select "Compress" operation and choose compression mode',
    "Lossless compression: Maintains original quality while optimizing file size (approximately 10% reduction)",
    "Lossy compression: Balances quality and file size, significantly reducing file size (approximately 50% reduction)",
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
    "Total file size limit: Maximum 500MB total file size per session",
    "File count limit: Maximum 5 files can be processed simultaneously",
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
    "Uses the browser's native Canvas API for image format conversion:",
    "Load the original image into an Image object in memory",
    "Draw the image onto a Canvas",
    "Export to the target format using Canvas's toBlob() method",
    "For JPEG and WebP formats, quality parameters can be set (default 92%)",
    "Unsupported formats (such as HEIC, AVIF) will attempt to downgrade to PNG or prompt the user",
  ],
  compressionPrinciple: "Compression Principle",
  compressionPrincipleList: [
    "Uses the browser-image-compression library for intelligent compression:",
    "Lossless compression: Maintains original format and quality while reducing file size through optimized encoding parameters",
    "Lossy compression: Adjusts quality parameters (75%) and compression algorithms to maximize compression ratio within acceptable visual quality",
    "Uses Web Worker for background thread processing without blocking the main interface",
    "Automatically maintains original resolution without changing image dimensions",
  ],
  privacySecurity: "Privacy & Security",
  privacyText:
    "All processing happens locally in your browser. MediaCC never uploads, stores, or analyzes your files. Your images stay on your device from start to finish – no server, no cloud, no third-party access.",
  processingFailed: "Processing Failed",
};

export const videoPage: VideoPageT = {
  h1: "Free Online Video Converter & Compressor",
  intro:
    "MediaCC Video Converter is a tool that lets you convert and compress videos directly in your browser. No file upload, no server processing, and no privacy risk. Your files never leave your device.",
  whyChoose: "Why Choose MediaCC?",
  whyList: [
    "100% local processing – files never leave your device",
    "Free to use, no signup required",
    "Fast video conversion and compression powered by FFmpeg.wasm",
    "Supports MP4, WebM, MOV, MKV, AVI and more",
  ],
  howItWorks: "How It Works",
  howSteps: [
    "Select a video from your device (drag & drop or click to upload)",
    "Choose output format or compression level",
    "Download the processed video – all processing happens locally in your browser",
  ],
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
    "Lossless compression: Maintains original quality using fast preset and low CRF value (CRF 18) to optimize file size",
    "Lossy compression: Balances quality and file size using medium preset and higher CRF value (CRF 28), with bitrate limits (video 1Mbps, audio 128kbps)",
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
    "Total file size limit: Maximum 500MB total file size per session",
    "File count limit: Maximum 5 files can be processed simultaneously",
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
    "Lossless compression: Uses CRF 18 (high quality) and fast preset to optimize encoding efficiency while maintaining visual quality",
    "Lossy compression: Uses CRF 28 (lower quality) and medium preset, with video bitrate (1Mbps) and audio bitrate (128kbps) limits to significantly reduce file size",
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
    title: "Free Online Image Converter & Compressor – 100% Local | MediaCC",
    description:
      "Free online image converter and compressor. Convert JPG, PNG, WebP, AVIF and reduce image size in your browser. No upload, no server, 100% local processing.",
    keywords: [
      "free image converter",
      "online image compressor",
      "jpg to png converter",
      "png to webp converter",
      "webp to jpg",
      "image compression online",
      "reduce image size",
      "local image processing",
      "privacy-first image tool",
      "browser-based image converter",
    ],
    openGraphTitle: "Free Online Image Converter & Compressor – MediaCC",
    openGraphDescription:
      "Convert and compress images directly in your browser. Your files never leave your device. Support JPG, PNG, WebP, AVIF formats.",
    twitterTitle: "Free Online Image Converter & Compressor",
    twitterDescription:
      "A privacy-first image tool with 100% local processing. Convert JPG, PNG, WebP, AVIF without uploading files.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Image Converter",
      alternateName: "Online Image Converter & Compressor",
      description: "Convert and compress images locally in your browser.",
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
        text: "No. All image conversion and compression is done locally in your browser using Canvas API and WebAssembly technology. Your files never leave your device, ensuring 100% privacy.",
      },
      {
        name: "Is MediaCC Image Converter free to use?",
        text: "Yes. MediaCC Image Converter is completely free and requires no registration or account. There are no hidden fees, watermarks, or usage limits.",
      },
      {
        name: "What image formats are supported?",
        text: "MediaCC supports JPG/JPEG, PNG, WebP, and AVIF image formats. You can convert between any of these formats and compress images to reduce file size.",
      },
      {
        name: "What is the maximum file size for image conversion?",
        text: "You can process images up to 150MB per file. For best performance, we recommend keeping individual files under 50MB. You can process up to 5 files at once with a total limit of 500MB.",
      },
      {
        name: "How does browser-based image processing work?",
        text: "MediaCC uses the browser's built-in Canvas API and the browser-image-compression library to process images. Everything runs in JavaScript within your browser - no server communication is required.",
      },
      {
        name: "Can I batch convert multiple images at once?",
        text: "Yes. You can select up to 5 images at once and convert or compress them all in a single batch. Each file is processed sequentially to ensure browser stability.",
      },
      {
        name: "Will image quality be affected during conversion?",
        text: "You have full control over output quality. Use the quality slider to balance between file size and image quality. For lossless conversions (like PNG), there is no quality loss.",
      },
    ],
    howTo: {
      name: "How to Convert and Compress Images Online",
      description: "Step-by-step guide to convert image formats and reduce file size using MediaCC's browser-based tool.",
      step: [
        { name: "Upload Images", text: "Drag and drop your images or click to select files. Supports JPG, PNG, WebP, AVIF formats up to 150MB per file." },
        { name: "Choose Output Format", text: "Select your desired output format from the dropdown menu: JPG, PNG, WebP, or AVIF." },
        { name: "Adjust Quality Settings", text: "Use the quality slider to balance between file size and image quality. Lower values mean smaller files." },
        { name: "Process and Download", text: "Click Convert/Compress to process your images locally. Download the results when complete." },
      ],
    },
  };
}

function buildVideoLayoutMeta(): VideoLayoutMetaT {
  const url = `${baseUrl}/video`;
  return {
    title: "Free Online Video Converter & Compressor – 100% Local | MediaCC",
    description:
      "Free online video converter and compressor. Convert MP4, WebM, MOV, MKV, AVI and reduce video size in your browser. No upload, no server, 100% local processing.",
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
    ],
    openGraphTitle: "Free Online Video Converter & Compressor – MediaCC",
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
        text: "No. All video conversion and compression is done locally in your browser using FFmpeg.wasm (WebAssembly). Your files never leave your device, ensuring 100% privacy for sensitive videos.",
      },
      {
        name: "Is MediaCC Video Converter free to use?",
        text: "Yes. MediaCC Video Converter is completely free with no registration required. There are no hidden fees, watermarks, or daily usage limits.",
      },
      {
        name: "What video formats are supported?",
        text: "MediaCC supports MP4, WebM, MOV, MKV, and AVI video formats. You can convert between any of these formats and compress videos to reduce file size.",
      },
      {
        name: "What is the maximum file size for video conversion?",
        text: "You can process videos up to 150MB per file. For best performance, we recommend keeping individual files under 100MB. Processing large videos may take several minutes depending on your device's performance.",
      },
      {
        name: "How does browser-based video processing work?",
        text: "MediaCC uses FFmpeg.wasm, a WebAssembly port of the powerful FFmpeg library. This allows full video encoding and decoding to run entirely in your browser without any server communication.",
      },
      {
        name: "Can I extract audio from a video?",
        text: "Yes. MediaCC can extract audio tracks from videos and save them as MP3 files. This is useful for creating audio versions of video content.",
      },
      {
        name: "Why is video processing slower than image processing?",
        text: "Video files contain many frames and require complex encoding/decoding. Since all processing happens in your browser using WebAssembly, it may take longer than server-based tools.",
      },
      {
        name: "Can I batch convert multiple videos at once?",
        text: "Yes. You can select up to 5 videos at once. Videos are processed sequentially (one at a time) to prevent browser memory issues and ensure stable operation.",
      },
    ],
    howTo: {
      name: "How to Convert and Compress Videos Online",
      description: "Step-by-step guide to convert video formats and reduce file size using MediaCC's browser-based FFmpeg.wasm tool.",
      step: [
        { name: "Upload Videos", text: "Drag and drop your videos or click to select files. Supports MP4, WebM, MOV, MKV, AVI formats up to 150MB per file." },
        { name: "Choose Output Format", text: "Select your desired output format from the dropdown menu: MP4, WebM, MOV, MKV, or AVI." },
        { name: "Adjust Compression Settings", text: "Configure bitrate, resolution, and quality settings to balance file size and video quality." },
        { name: "Process and Download", text: "Click Convert/Compress to process your videos locally using FFmpeg.wasm. Download the results when complete." },
      ],
    },
  };
}

export const imageLayoutMeta = buildImageLayoutMeta();
export const videoLayoutMeta = buildVideoLayoutMeta();
