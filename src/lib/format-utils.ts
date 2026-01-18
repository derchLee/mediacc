/**
 * 格式工具函数
 */

import type { ImageFormat, VideoFormat } from "@/types";

/**
 * 根据格式键获取文件扩展名
 */
export function getExtensionFromFormat(format: ImageFormat | VideoFormat): string {
  // 图片格式
  if (format === "jpg" || format === "jpeg") {
    return format === "jpg" ? "jpg" : "jpeg";
  }
  
  // 其他格式直接返回
  return format;
}

/**
 * 根据格式键获取 MIME 类型
 */
export function getMimeTypeFromFormat(format: ImageFormat | VideoFormat): string {
  const imageMimeMap: Record<ImageFormat, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    avif: "image/avif",
    heic: "image/heic",
    bmp: "image/bmp",
    tiff: "image/tiff",
  };

  const videoMimeMap: Record<VideoFormat, string> = {
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    webm: "video/webm",
    mkv: "video/x-matroska",
    wmv: "video/x-ms-wmv",
    flv: "video/x-flv",
  };

  if (format in imageMimeMap) {
    return imageMimeMap[format as ImageFormat];
  }
  if (format in videoMimeMap) {
    return videoMimeMap[format as VideoFormat];
  }

  return "application/octet-stream";
}

