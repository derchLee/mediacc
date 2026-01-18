"use client";

import React from "react";
import { X, FileImage, FileVideo } from "lucide-react";
import type { UploadedFile } from "@/types";
import { formatFileSize } from "@/lib/file-utils";
import { cn } from "@/lib/utils";

interface FilePreviewListProps {
  files: UploadedFile[];
  onRemove?: (id: string) => void;
}

/**
 * 文件预览列表组件
 * 显示已选择文件的详细信息
 */
export function FilePreviewList({
  files,
  onRemove,
}: FilePreviewListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Uploaded Files ({files.length})
      </h3>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {/* 预览图/图标 */}
            <div className="flex-shrink-0">
              {file.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-16 h-16 object-cover rounded border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-700">
                  <FileVideo className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* 文件信息 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {file.name}
                </h4>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded uppercase">
                  {file.format}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Size: {formatFileSize(file.size)}</span>
                <span>Type: {file.type || "Unknown"}</span>
              </div>
            </div>

            {/* 删除按钮 */}
            {onRemove && (
              <button
                onClick={() => onRemove(file.id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
