"use client";

import React from "react";
import { Download, FileImage, FileVideo, X, CheckCircle2 } from "lucide-react";
import type { ProcessedFile } from "@/types";
import { formatFileSize } from "@/lib/file-utils";
import { cn } from "@/lib/utils";

interface ResultListProps {
  files: ProcessedFile[];
  onRemove?: (id: string) => void;
  onDownload: (file: ProcessedFile) => void;
}

/**
 * 处理结果列表组件
 * 显示处理后的文件列表和下载功能
 */
export function ResultList({
  files,
  onRemove,
  onDownload,
}: ResultListProps) {
  if (files.length === 0) {
    return null;
  }

  const handleDownload = (file: ProcessedFile) => {
    onDownload(file);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Processing Complete ({files.length})
          </h3>
        </div>
      </div>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-4 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            {/* 预览图/图标 */}
            <div className="flex-shrink-0">
              {file.preview ? (
                file.blob.type.startsWith("video/") ? (
                  <video
                    src={file.preview}
                    className="w-16 h-16 object-cover rounded border border-green-200 dark:border-green-700"
                    muted
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-16 h-16 object-cover rounded border border-green-200 dark:border-green-700"
                  />
                )
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded border border-green-200 dark:border-green-700">
                  <FileVideo className="w-8 h-8 text-green-400" />
                </div>
              )}
            </div>

            {/* 文件信息 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {file.name}
                </h4>
                <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded uppercase">
                  {file.format}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                  {file.operationType === "convert" ? "Format Conversion" : "Compression"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Size: {formatFileSize(file.size)}</span>
                {file.compressionMode && (
                  <span>
                    Mode: {file.compressionMode === "lossless" ? "Lossless" : "Lossy"}
                  </span>
                )}
                {file.targetFormat && (
                  <span>Target Format: {file.targetFormat.toUpperCase()}</span>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(file)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              {onRemove && (
                <button
                  onClick={() => onRemove(file.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label="Remove"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

