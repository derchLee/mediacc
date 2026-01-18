"use client";

import React from "react";
import { ArrowRight, Minimize2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OperationType } from "@/types";

interface OperationSelectorProps {
  operationType: OperationType | null;
  onOperationSelect: (type: OperationType | null) => void;
  fileType: "image" | "video";
}

/**
 * 操作选择组件
 * 选择格式转换或大小压缩
 */
export function OperationSelector({
  operationType,
  onOperationSelect,
  fileType,
}: OperationSelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Select Operation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 格式转换 */}
        <button
          onClick={() =>
            onOperationSelect(operationType === "convert" ? null : "convert")
          }
          className={cn(
            "flex items-center justify-between p-4 border-2 rounded-lg transition-all",
            "hover:border-blue-300 dark:hover:border-blue-700",
            operationType === "convert"
              ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg",
                operationType === "convert"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}
            >
              <Download className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                Format Conversion
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Convert to other formats
              </div>
            </div>
          </div>
          <ArrowRight
            className={cn(
              "w-5 h-5 transition-transform",
              operationType === "convert" ? "text-blue-500 rotate-90" : "text-gray-400"
            )}
          />
        </button>

        {/* 大小压缩 */}
        <button
          onClick={() =>
            onOperationSelect(operationType === "compress" ? null : "compress")
          }
          className={cn(
            "flex items-center justify-between p-4 border-2 rounded-lg transition-all",
            "hover:border-blue-300 dark:hover:border-blue-700",
            operationType === "compress"
              ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg",
                operationType === "compress"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}
            >
              <Minimize2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                Compression
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Reduce file size
              </div>
            </div>
          </div>
          <ArrowRight
            className={cn(
              "w-5 h-5 transition-transform",
              operationType === "compress" ? "text-blue-500 rotate-90" : "text-gray-400"
            )}
          />
        </button>
      </div>
    </div>
  );
}

