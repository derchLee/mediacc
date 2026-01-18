/**
 * 文件格式配置
 * 定义支持的图片和视频格式及其 MIME 类型
 */

import type { ImageFormat, VideoFormat } from "@/types";

/**
 * 图片格式信息
 */
export const imageFormats: Array<{
  name: string;
  extensions: string[];
  mimeTypes: string[];
  description: string;
}> = [
  {
    name: "JPG/JPEG",
    extensions: [".jpg", ".jpeg"],
    mimeTypes: ["image/jpeg", "image/jpg"],
    description: "JPEG 图片格式，最常用的图片格式",
  },
  {
    name: "PNG",
    extensions: [".png"],
    mimeTypes: ["image/png"],
    description: "PNG 图片格式，支持透明通道",
  },
  {
    name: "GIF",
    extensions: [".gif"],
    mimeTypes: ["image/gif"],
    description: "GIF 动画图片格式",
  },
  {
    name: "WebP",
    extensions: [".webp"],
    mimeTypes: ["image/webp"],
    description: "WebP 现代图片格式，高效压缩",
  },
  {
    name: "HEIC",
    extensions: [".heic", ".heif"],
    mimeTypes: ["image/heic", "image/heif"],
    description: "HEIC 高效图片格式（iOS 常用）",
  },
  {
    name: "AVIF",
    extensions: [".avif"],
    mimeTypes: ["image/avif"],
    description: "AVIF 高效压缩格式",
  },
  {
    name: "BMP",
    extensions: [".bmp"],
    mimeTypes: ["image/bmp", "image/x-ms-bmp"],
    description: "BMP 位图格式",
  },
  {
    name: "TIFF",
    extensions: [".tiff", ".tif"],
    mimeTypes: ["image/tiff"],
    description: "TIFF 高质量图片格式",
  },
];

/**
 * 视频格式信息
 */
export const videoFormats: Array<{
  name: string;
  extensions: string[];
  mimeTypes: string[];
  description: string;
}> = [
  {
    name: "MP4",
    extensions: [".mp4"],
    mimeTypes: ["video/mp4"],
    description: "MPEG-4 视频格式，最常用的视频格式",
  },
  {
    name: "MOV",
    extensions: [".mov"],
    mimeTypes: ["video/quicktime"],
    description: "QuickTime 视频格式（macOS/iOS 常用）",
  },
  {
    name: "AVI",
    extensions: [".avi"],
    mimeTypes: ["video/x-msvideo", "video/avi"],
    description: "AVI 视频格式",
  },
  {
    name: "WebM",
    extensions: [".webm"],
    mimeTypes: ["video/webm"],
    description: "WebM 开源视频格式",
  },
  {
    name: "MKV",
    extensions: [".mkv"],
    mimeTypes: ["video/x-matroska"],
    description: "Matroska 视频容器格式",
  },
  {
    name: "WMV",
    extensions: [".wmv"],
    mimeTypes: ["video/x-ms-wmv"],
    description: "Windows Media Video 格式",
  },
  {
    name: "FLV",
    extensions: [".flv"],
    mimeTypes: ["video/x-flv"],
    description: "Flash Video 格式",
  },
];

/**
 * 获取图片格式的 accept 字符串（用于文件输入）
 * 同时包含 MIME 类型和扩展名以提高浏览器兼容性
 */
export function getImageAcceptString(): string {
  const mimeTypes = imageFormats.flatMap((format) => format.mimeTypes);
  const extensions = imageFormats.flatMap((format) => format.extensions);
  return [...mimeTypes, ...extensions].join(",");
}

/**
 * 获取视频格式的 accept 字符串（用于文件输入）
 * 同时包含 MIME 类型和扩展名以提高浏览器兼容性
 */
export function getVideoAcceptString(): string {
  const mimeTypes = videoFormats.flatMap((format) => format.mimeTypes);
  const extensions = videoFormats.flatMap((format) => format.extensions);
  return [...mimeTypes, ...extensions].join(",");
}

/**
 * 根据文件类型获取 accept 字符串
 */
export function getAcceptString(fileType: "image" | "video"): string {
  return fileType === "image" ? getImageAcceptString() : getVideoAcceptString();
}

