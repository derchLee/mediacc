/**
 * 全局类型定义
 */

/**
 * 文件类型
 */
export type FileType = "image" | "video";

/**
 * 图片格式
 */
export type ImageFormat =
  | "jpg"
  | "jpeg"
  | "png"
  | "gif"
  | "webp"
  | "heic"
  | "avif"
  | "bmp"
  | "tiff";

/**
 * 视频格式
 */
export type VideoFormat =
  | "mp4"
  | "mov"
  | "avi"
  | "webm"
  | "mkv"
  | "wmv"
  | "flv";

/**
 * 转换设置接口
 */
export interface ConversionSettings {
  format?: ImageFormat | VideoFormat;
  quality?: number; // 0-100
  width?: number;
  height?: number;
  bitrate?: number; // 视频码率
  fps?: number; // 视频帧率
  [key: string]: unknown;
}

/**
 * 操作类型
 */
export type OperationType = "convert" | "compress";

/**
 * 压缩模式
 */
export type CompressionMode = "lossless" | "lossy";

/**
 * 上传的文件信息
 */
export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  format: string;
  preview?: string; // 预览 URL（用于图片）
}

/**
 * 文件处理任务
 */
export interface FileTask {
  id: string;
  file: File;
  type: FileType;
  status: "pending" | "processing" | "completed" | "error";
  progress: number; // 0-100
  result?: Blob;
  error?: string;
  settings?: ConversionSettings;
}

/**
 * 处理结果
 */
export interface ProcessedFile {
  id: string;
  originalFileId: string; // 原始文件的 ID
  name: string; // 处理后的文件名
  size: number; // 文件大小（字节）
  format: string; // 文件格式
  blob: Blob; // 处理后的文件 Blob
  preview?: string; // 预览 URL（用于图片）
  operationType: OperationType; // 操作类型
  compressionMode?: CompressionMode; // 压缩模式（如果是压缩操作）
  targetFormat?: ImageFormat | VideoFormat; // 目标格式（如果是转换操作）
}

