"use client";

import React from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileType, OperationType, CompressionMode, ImageFormat, VideoFormat } from "@/types";
import { imageFormats, videoFormats } from "@/lib/file-formats";
import { getFormatKeyFromExtension } from "@/lib/format-mapper";
import { getUiT, type Locale } from "@/lib/translations";

interface ConversionSettingsProps {
  fileType: FileType;
  operationType: OperationType | null;
  compressionMode: CompressionMode | null;
  targetFormat: ImageFormat | VideoFormat | null;
  onTargetFormatChange: (format: ImageFormat | VideoFormat | null) => void;
  onCompressionModeChange: (mode: CompressionMode | null) => void;
  onStart: () => void;
  isProcessing?: boolean;
  locale?: Locale;
}

export function ConversionSettings({
  fileType,
  operationType,
  compressionMode,
  targetFormat,
  onTargetFormatChange,
  onCompressionModeChange,
  onStart,
  isProcessing = false,
  locale = "en",
}: ConversionSettingsProps) {
  if (!operationType) {
    return null;
  }

  const t = getUiT(locale);
  const formats = fileType === "image" ? imageFormats : videoFormats;

  if (operationType === "convert") {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t.selectTargetFormat}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {formats.map((format) => {
            // 处理 JPG/JPEG 特殊情况，使用 jpg 作为默认键
            let formatKey: ImageFormat | VideoFormat | null;
            if (format.name === "JPG/JPEG") {
              formatKey = "jpg";
            } else {
              formatKey = getFormatKeyFromExtension(format.extensions[0]);
            }
            if (!formatKey) return null;
            const isSelected = targetFormat === formatKey || (formatKey === "jpg" && targetFormat === "jpeg");
            return (
              <button
                key={format.name}
                onClick={() => onTargetFormatChange(isSelected ? null : formatKey!)}
                className={cn(
                  "p-3 border-2 rounded-lg transition-all text-center",
                  "hover:border-blue-300 dark:hover:border-blue-700",
                  isSelected
                    ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                )}
              >
                <div
                  className={cn(
                    "font-medium mb-1",
                    isSelected
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-gray-100"
                  )}
                >
                  {format.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format.extensions.join(", ")}
                </div>
              </button>
            );
          })}
        </div>
        {targetFormat && (
          <button
            onClick={onStart}
            disabled={isProcessing}
            className={cn(
              "w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium",
              isProcessing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            )}
          >
            <Play className={cn("w-5 h-5", isProcessing && "animate-spin")} />
            {isProcessing ? t.converting : t.startConversion}
          </button>
        )}
      </div>
    );
  }

  // 压缩模式
  if (operationType === "compress") {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t.selectCompressionMode}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* 无损压缩 */}
          <button
            onClick={() =>
              onCompressionModeChange(compressionMode === "lossless" ? null : "lossless")
            }
            className={cn(
              "p-4 border-2 rounded-lg transition-all text-left",
              "hover:border-blue-300 dark:hover:border-blue-700",
              compressionMode === "lossless"
                ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {t.losslessCompression}
              </div>
              {compressionMode === "lossless" && (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t.losslessDesc}
            </div>
          </button>

          {/* 有损压缩 */}
          <button
            onClick={() =>
              onCompressionModeChange(compressionMode === "lossy" ? null : "lossy")
            }
            className={cn(
              "p-4 border-2 rounded-lg transition-all text-left",
              "hover:border-blue-300 dark:hover:border-blue-700",
              compressionMode === "lossy"
                ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {t.lossyCompression}
              </div>
              {compressionMode === "lossy" && (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t.lossyDesc}
            </div>
          </button>
        </div>
        {compressionMode && (
          <button
            onClick={onStart}
            disabled={isProcessing}
            className={cn(
              "w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium",
              isProcessing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            )}
          >
            <Play className={cn("w-5 h-5", isProcessing && "animate-spin")} />
            {isProcessing ? t.compressing : t.startCompression}
          </button>
        )}
      </div>
    );
  }

  return null;
}

