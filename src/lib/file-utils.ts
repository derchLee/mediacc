/**
 * 文件工具函数
 * 处理文件验证、格式化等工具函数
 */

import type { FileType } from "@/types";

export type FileValidationErrorCode =
  | "tooManyFiles"
  | "fileTooLarge"
  | "totalSizeTooLarge"
  | "fileTypeMismatch";

export interface FileValidationResult {
  valid: boolean;
  errorCode?: FileValidationErrorCode;
  values?: Record<string, string | number>;
}

/**
 * 文件大小限制（字节）
 */
export const MAX_FILE_COUNT = 15;
export const MAX_TOTAL_SIZE = 1000 * 1024 * 1024; // 1000MB
export const MAX_SINGLE_FILE_SIZE = 150 * 1024 * 1024; // 150MB - 单个文件最大大小

/**
 * 验证文件数量
 */
export function validateFileCount(currentCount: number, newFilesCount: number): FileValidationResult {
  const totalCount = currentCount + newFilesCount;
  if (totalCount > MAX_FILE_COUNT) {
    return {
      valid: false,
      errorCode: "tooManyFiles",
      values: { max: MAX_FILE_COUNT, current: currentCount },
    };
  }
  return { valid: true };
}

/**
 * 验证单个文件大小
 */
export function validateSingleFileSize(file: File): FileValidationResult {
  if (file.size > MAX_SINGLE_FILE_SIZE) {
    return {
      valid: false,
      errorCode: "fileTooLarge",
      values: { max: MAX_SINGLE_FILE_SIZE / 1024 / 1024 },
    };
  }
  return { valid: true };
}

/**
 * 验证文件总大小
 */
export function validateTotalSize(
  currentTotalSize: number,
  newFiles: File[]
): FileValidationResult {
  const newFilesSize = newFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSize = currentTotalSize + newFilesSize;

  if (totalSize > MAX_TOTAL_SIZE) {
    const currentSizeMB = (currentTotalSize / (1024 * 1024)).toFixed(2);
    const maxSizeMB = (MAX_TOTAL_SIZE / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      errorCode: "totalSizeTooLarge",
      values: { max: maxSizeMB, current: currentSizeMB },
    };
  }

  return { valid: true };
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/** 图片扩展名（含 HEIC，部分浏览器对 HEIC 的 file.type 为空） */
const IMAGE_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "gif", "webp", "avif", "heic", "heif", "bmp", "tiff", "tif",
]);

/** 视频扩展名 */
const VIDEO_EXTENSIONS = new Set([
  "mp4", "mov", "avi", "webm", "mkv", "wmv", "flv",
]);

/**
 * 检查文件类型是否匹配
 * HEIC 在 Windows 等系统上 file.type 常为空，需结合扩展名判断
 */
export function isFileTypeMatch(file: File, fileType: FileType): boolean {
  const ext = getFileExtension(file.name);
  if (fileType === "image") {
    return file.type.startsWith("image/") || IMAGE_EXTENSIONS.has(ext);
  } else {
    return file.type.startsWith("video/") || VIDEO_EXTENSIONS.has(ext);
  }
}

/**
 * 验证文件
 */
export function validateFiles(
  currentFiles: { size: number }[],
  newFiles: File[],
  fileType: FileType
): FileValidationResult {
  // 验证单个文件大小（优先检查，避免处理大文件）
  for (const file of newFiles) {
    const singleFileValidation = validateSingleFileSize(file);
    if (!singleFileValidation.valid) {
      return singleFileValidation;
    }
  }

  // 验证文件数量
  const countValidation = validateFileCount(currentFiles.length, newFiles.length);
  if (!countValidation.valid) {
    return countValidation;
  }

  // 验证文件总大小
  const currentTotalSize = currentFiles.reduce((sum, file) => sum + file.size, 0);
  const sizeValidation = validateTotalSize(currentTotalSize, newFiles);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  // 验证文件类型
  const invalidFiles = newFiles.filter((file) => !isFileTypeMatch(file, fileType));
  if (invalidFiles.length > 0) {
    return {
      valid: false,
      errorCode: "fileTypeMismatch",
      values: { count: invalidFiles.length },
    };
  }

  return { valid: true };
}

