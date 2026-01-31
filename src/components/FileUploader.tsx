"use client";

import React, { useCallback, useState } from "react";
import { Upload, File, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAcceptString } from "@/lib/file-formats";
import { validateFiles } from "@/lib/file-utils";
import type { FileType } from "@/types";
import { getUiT, type Locale } from "@/lib/translations";

interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  fileType: FileType;
  currentFiles?: { size: number }[];
  locale?: Locale;
}

/**
 * 文件上传组件
 * 支持拖拽上传和点击选择
 */
export function FileUploader({
  onFilesSelected,
  accept,
  multiple = true,
  fileType,
  currentFiles = [],
  locale = "en",
}: FileUploaderProps) {
  const t = getUiT(locale);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragging(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setDragCounter(0);
      setError(null);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        const validation = validateFiles(currentFiles, files, fileType);
        
        if (validation.valid) {
          if (onFilesSelected) {
            onFilesSelected(files);
          }
        } else {
          setError(validation.error || t.fileValidationFailed);
        }
        
        e.dataTransfer.clearData();
      }
    },
    [onFilesSelected, currentFiles, fileType, t]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        const validation = validateFiles(currentFiles, files, fileType);
        
        if (validation.valid) {
          if (onFilesSelected) {
            onFilesSelected(files);
          }
        } else {
          setError(validation.error || t.fileValidationFailed);
        }
        
        // 清空 input，允许重复选择同一文件
        e.target.value = "";
      }
    },
    [onFilesSelected, currentFiles, fileType, t]
  );

  // 根据文件类型设置默认 accept
  const defaultAccept = accept || getAcceptString(fileType);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg transition-all duration-200",
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600",
        "bg-white dark:bg-gray-900"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div
          className={cn(
            "mb-4 p-4 rounded-full",
            isDragging
              ? "bg-blue-100 dark:bg-blue-900/30"
              : "bg-gray-100 dark:bg-gray-800"
          )}
        >
          {isDragging ? (
            <Upload className="w-10 h-10 text-blue-500" />
          ) : (
            <File className="w-10 h-10 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {isDragging
            ? t.releaseToUpload
            : fileType === "image"
              ? t.dragDropImages
              : t.dragDropVideos}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t.orClickToSelect}
        </p>
        <label
          htmlFor={`file-upload-${fileType}`}
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          {t.selectFiles}
        </label>
        <input
          id={`file-upload-${fileType}`}
          type="file"
          className="hidden"
          accept={defaultAccept}
          multiple={multiple}
          onChange={handleFileInput}
        />
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          {t.localProcessingNotice}
        </p>
        
        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
