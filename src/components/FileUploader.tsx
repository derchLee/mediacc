"use client";

import React, { useCallback, useState } from "react";
import { Upload, File, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAcceptString } from "@/lib/file-formats";
import { validateFiles } from "@/lib/file-utils";
import type { FileType } from "@/types";
import { getUiT, type Locale } from "@/lib/translations";
import type { FileValidationResult } from "@/lib/file-utils";

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
  const [uploadSucceeded, setUploadSucceeded] = useState(false);

  const getValidationMessage = useCallback(
    (validation: FileValidationResult) => {
      if (!validation.errorCode) return t.fileValidationFailed;
      return Object.entries(validation.values || {}).reduce(
        (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
        t[validation.errorCode]
      );
    },
    [t]
  );

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
      setUploadSucceeded(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        const validation = validateFiles(currentFiles, files, fileType);
        
        if (validation.valid) {
          if (onFilesSelected) {
            onFilesSelected(files);
          }
          setUploadSucceeded(true);
        } else {
          setError(getValidationMessage(validation));
        }
        
        e.dataTransfer.clearData();
      }
    },
    [onFilesSelected, currentFiles, fileType, getValidationMessage]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setUploadSucceeded(false);
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        const validation = validateFiles(currentFiles, files, fileType);
        
        if (validation.valid) {
          if (onFilesSelected) {
            onFilesSelected(files);
          }
          setUploadSucceeded(true);
        } else {
          setError(getValidationMessage(validation));
        }
        
        // 清空 input，允许重复选择同一文件
        e.target.value = "";
      }
    },
    [onFilesSelected, currentFiles, fileType, getValidationMessage]
  );

  // 根据文件类型设置默认 accept
  const defaultAccept = accept || getAcceptString(fileType);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border-[6px] border-[#176b9a] bg-[#1976a8] p-2 shadow-[0_18px_45px_rgba(25,118,168,.28)] transition-all duration-200",
        isDragging
          ? "scale-[1.01] border-[#0d557d] bg-[#2588be]"
          : "hover:bg-[#1d80b5] dark:border-[#164f6e]"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/70 px-6 py-10 text-center sm:min-h-[340px]">
        <div
          className={cn(
            "mb-5 rounded-2xl p-4 shadow-inner",
            isDragging
              ? "bg-white text-[#1976a8]"
              : "bg-white/15 text-white"
          )}
        >
          {isDragging ? (
            <Upload className="h-11 w-11 text-[#1976a8]" />
          ) : (
            <File className="h-11 w-11 text-white" />
          )}
        </div>
        <h3 className="mb-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
          {isDragging
            ? t.releaseToUpload
            : fileType === "image"
              ? t.dragDropImages
              : t.dragDropVideos}
        </h3>
        <p className="mb-5 text-sm text-blue-50/90">
          {t.orClickToSelect}
        </p>
        <label
          htmlFor={`file-upload-${fileType}`}
          className="inline-flex cursor-pointer items-center rounded-xl bg-white px-5 py-3 font-bold text-[#176b9a] shadow-[0_8px_20px_rgba(0,0,0,.14)] transition-all hover:-translate-y-0.5 hover:bg-blue-50"
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
        <p className="mt-5 rounded-full bg-black/10 px-3 py-1.5 text-xs font-medium text-blue-50">
          {t.localProcessingNotice}
        </p>
        
        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {uploadSucceeded && (
          <div className="mt-4 w-full rounded-lg border border-green-200 bg-green-50 p-3 text-left text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="flex-1">
                <p>{t.uploadSuccess}</p>
                <button
                  type="button"
                  onClick={() => document.getElementById("uploads")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="mt-2 font-medium text-green-700 underline hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
                >
                  {t.continueProcessing}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
