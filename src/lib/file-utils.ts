/**
 * 文件工具函数
 * 处理文件验证、格式化等工具函数
 */

import type { FileType } from "@/types";

/**
 * 文件大小限制（字节）
 */
export const MAX_FILE_COUNT = 5;
export const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_SINGLE_FILE_SIZE = 150 * 1024 * 1024; // 150MB - 单个文件最大大小

/**
 * 验证文件数量
 */
export function validateFileCount(currentCount: number, newFilesCount: number): {
  valid: boolean;
  error?: string;
} {
  const totalCount = currentCount + newFilesCount;
  if (totalCount > MAX_FILE_COUNT) {
    return {
      valid: false,
      error: `Maximum ${MAX_FILE_COUNT} files allowed. Currently have ${currentCount} file(s)`,
    };
  }
  return { valid: true };
}

/**
 * 验证单个文件大小
 */
export function validateSingleFileSize(file: File): {
  valid: boolean;
  error?: string;
} {
  if (file.size > MAX_SINGLE_FILE_SIZE) {
    return {
      valid: false,
      error: "目前不支持上传太大的文件",
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
): {
  valid: boolean;
  error?: string;
} {
  const newFilesSize = newFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSize = currentTotalSize + newFilesSize;

  if (totalSize > MAX_TOTAL_SIZE) {
    const currentSizeMB = (currentTotalSize / (1024 * 1024)).toFixed(2);
    const maxSizeMB = (MAX_TOTAL_SIZE / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `Total file size cannot exceed ${maxSizeMB}MB, currently using ${currentSizeMB}MB`,
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

/**
 * 检查文件类型是否匹配
 */
export function isFileTypeMatch(file: File, fileType: FileType): boolean {
  if (fileType === "image") {
    return file.type.startsWith("image/");
  } else {
    return file.type.startsWith("video/");
  }
}

/**
 * 验证文件
 */
export function validateFiles(
  currentFiles: { size: number }[],
  newFiles: File[],
  fileType: FileType
): {
  valid: boolean;
  error?: string;
} {
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
      error: `Selected ${invalidFiles.length} file(s) with mismatched file types`,
    };
  }

  return { valid: true };
}

