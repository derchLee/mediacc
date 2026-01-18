/**
 * 格式映射工具
 * 将文件扩展名映射到类型定义中的格式键
 */

import type { ImageFormat, VideoFormat } from "@/types";

/**
 * 扩展名到格式键的映射
 */
const extensionToFormatMap: Record<string, ImageFormat | VideoFormat> = {
  // 图片格式
  jpg: "jpg",
  jpeg: "jpeg",
  png: "png",
  gif: "gif",
  webp: "webp",
  heic: "heic",
  heif: "heic", // HEIF 映射到 HEIC
  avif: "avif",
  bmp: "bmp",
  tiff: "tiff",
  tif: "tiff", // TIF 映射到 TIFF
  
  // 视频格式
  mp4: "mp4",
  mov: "mov",
  avi: "avi",
  webm: "webm",
  mkv: "mkv",
  wmv: "wmv",
  flv: "flv",
};

/**
 * 从扩展名获取格式键
 */
export function getFormatKeyFromExtension(extension: string): ImageFormat | VideoFormat | null {
  const ext = extension.replace(".", "").toLowerCase();
  return extensionToFormatMap[ext] || null;
}

/**
 * 从格式名称获取格式键（用于 UI 显示）
 */
export function getFormatKeyFromFormatName(
  formatName: string,
  isImage: boolean
): ImageFormat | VideoFormat | null {
  const name = formatName.toLowerCase();
  
  if (isImage) {
    const imageMap: Record<string, ImageFormat> = {
      "jpg/jpeg": "jpg",
      jpg: "jpg",
      jpeg: "jpeg",
      png: "png",
      gif: "gif",
      webp: "webp",
      heic: "heic",
      avif: "avif",
      bmp: "bmp",
      tiff: "tiff",
    };
    return imageMap[name] || null;
  } else {
    const videoMap: Record<string, VideoFormat> = {
      mp4: "mp4",
      mov: "mov",
      avi: "avi",
      webm: "webm",
      mkv: "mkv",
      wmv: "wmv",
      flv: "flv",
    };
    return videoMap[name] || null;
  }
}

