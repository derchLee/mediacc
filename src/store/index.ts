/**
 * Zustand 状态管理
 * 全局状态存储
 */

import { create } from "zustand";
import type {
  FileType,
  UploadedFile,
  OperationType,
  CompressionMode,
  ImageFormat,
  VideoFormat,
  ProcessedFile,
} from "@/types";

interface MediaStore {
  // 文件相关
  files: UploadedFile[];
  fileType: FileType;
  
  // 操作相关
  operationType: OperationType | null;
  compressionMode: CompressionMode | null;
  targetFormat: ImageFormat | VideoFormat | null;

  // 处理结果
  processedFiles: ProcessedFile[];
  isProcessing: boolean;

  // Actions
  setFileType: (type: FileType) => void;
  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  setOperationType: (type: OperationType | null) => void;
  setCompressionMode: (mode: CompressionMode | null) => void;
  setTargetFormat: (format: ImageFormat | VideoFormat | null) => void;
  addProcessedFile: (file: ProcessedFile) => void;
  removeProcessedFile: (id: string) => void;
  clearProcessedFiles: () => void;
  setIsProcessing: (processing: boolean) => void;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  files: [],
  fileType: "image",
  operationType: null,
  compressionMode: null,
  targetFormat: null,
  processedFiles: [],
  isProcessing: false,

  setFileType: (type) =>
    set({
      fileType: type,
      files: [],
      operationType: null,
      processedFiles: [],
    }),

  addFiles: (newFiles) =>
    set((state) => {
      const uploadedFiles: UploadedFile[] = newFiles.map((file) => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const name = file.name;
        const size = file.size;
        const type = file.type;
        const format = file.name.split(".").pop()?.toLowerCase() || "";

        // 为图片创建预览 URL
        let preview: string | undefined;
        if (state.fileType === "image" && file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file);
        }

        return {
          id,
          file,
          name,
          size,
          type,
          format,
          preview,
        };
      });

      return {
        files: [...state.files, ...uploadedFiles],
      };
    }),

  removeFile: (id) =>
    set((state) => {
      const fileToRemove = state.files.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      // 同时移除相关的处理结果
      const relatedProcessed = state.processedFiles.filter(
        (pf) => pf.originalFileId === id
      );
      relatedProcessed.forEach((pf) => {
        if (pf.preview) {
          URL.revokeObjectURL(pf.preview);
        }
      });
      return {
        files: state.files.filter((f) => f.id !== id),
        processedFiles: state.processedFiles.filter(
          (pf) => pf.originalFileId !== id
        ),
      };
    }),

  clearFiles: () =>
    set((state) => {
      // 清理所有预览 URL
      state.files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      state.processedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      return {
        files: [],
        operationType: null,
        compressionMode: null,
        targetFormat: null,
        processedFiles: [],
      };
    }),

  setOperationType: (type) =>
    set({ operationType: type, compressionMode: null, targetFormat: null }),

  setCompressionMode: (mode) => set({ compressionMode: mode }),

  setTargetFormat: (format) => set({ targetFormat: format }),

  addProcessedFile: (file) =>
    set((state) => ({
      processedFiles: [...state.processedFiles, file],
    })),

  removeProcessedFile: (id) =>
    set((state) => {
      const fileToRemove = state.processedFiles.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return {
        processedFiles: state.processedFiles.filter((f) => f.id !== id),
      };
    }),

  clearProcessedFiles: () =>
    set((state) => {
      state.processedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      return { processedFiles: [] };
    }),

  setIsProcessing: (processing) => set({ isProcessing: processing }),
}));
