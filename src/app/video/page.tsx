"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { FileUploader } from "@/components/FileUploader";
import { SupportedFormats } from "@/components/SupportedFormats";
import { FilePreviewList } from "@/components/FilePreviewList";
import { OperationSelector } from "@/components/OperationSelector";
import { ConversionSettings } from "@/components/ConversionSettings";
import { ResultList } from "@/components/ResultList";
import { useMediaStore } from "@/store";
import { convertVideoFormat, compressVideo, generateProcessedVideoFileName } from "@/lib/video-processor";
import { getExtensionFromFormat } from "@/lib/format-utils";
import { trackConversionStart, trackCompressionStart } from "@/lib/analytics";
import type { ProcessedFile } from "@/types";

/**
 * 视频处理页面
 */
export default function VideoPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const {
    files,
    fileType,
    operationType,
    compressionMode,
    targetFormat,
    processedFiles,
    isProcessing,
    setFileType,
    addFiles,
    removeFile,
    setOperationType,
    setCompressionMode,
    setTargetFormat,
    addProcessedFile,
    removeProcessedFile,
    setIsProcessing,
  } = useMediaStore();

  // 设置文件类型为视频
  useEffect(() => {
    setFileType("video");
  }, [setFileType]);

  const handleFilesSelected = (newFiles: File[]) => {
    addFiles(newFiles);
  };

  const handleFileRemove = (id: string) => {
    removeFile(id);
  };

  const handleStartOperation = async () => {
    if (!operationType || files.length === 0) return;
    if (operationType === "convert" && !targetFormat) return;
    if (operationType === "compress" && !compressionMode) return;

    // 追踪事件
    if (operationType === "convert" && targetFormat) {
      trackConversionStart("video", targetFormat);
    } else if (operationType === "compress" && compressionMode) {
      trackCompressionStart("video", compressionMode);
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 处理所有文件
      for (const uploadedFile of files) {
        try {
          let processedBlob: Blob;
          let processedFileName: string;
          let processedFormat: string;

          // 视频处理
          if (operationType === "convert" && targetFormat) {
            // 格式转换
            processedBlob = await convertVideoFormat(
              uploadedFile.file,
              targetFormat as any
            );
            processedFormat = getExtensionFromFormat(targetFormat);
            processedFileName = generateProcessedVideoFileName(
              uploadedFile.name,
              targetFormat as any,
              "convert"
            );
          } else if (operationType === "compress" && compressionMode) {
            // 压缩
            processedBlob = await compressVideo(uploadedFile.file, compressionMode);
            processedFormat = uploadedFile.format;
            processedFileName = generateProcessedVideoFileName(
              uploadedFile.name,
              undefined,
              "compress"
            );
          } else {
            continue;
          }

          // 创建预览 URL（视频也可以创建预览 URL）
          let preview: string | undefined;
          if (processedBlob.type.startsWith("video/")) {
            preview = URL.createObjectURL(processedBlob);
          }

          // 创建处理结果
          const processedFile: ProcessedFile = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            originalFileId: uploadedFile.id,
            name: processedFileName,
            size: processedBlob.size,
            format: processedFormat,
            blob: processedBlob,
            preview,
            operationType,
            compressionMode: operationType === "compress" ? (compressionMode ?? undefined) : undefined,
            targetFormat: operationType === "convert" ? (targetFormat ?? undefined) : undefined,
          };

          addProcessedFile(processedFile);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          setErrorMessage(`${uploadedFile.name} processing failed: ${errorMsg}`);
          // Continue processing other files
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setErrorMessage(`Operation failed: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (file: ProcessedFile) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* 文件上传区域 */}
        <FileUploader
        fileType="video"
        onFilesSelected={handleFilesSelected}
        multiple={true}
        currentFiles={files}
      />

      {/* 支持的格式列表 */}
      <SupportedFormats fileType="video" />

      {/* 文件列表 */}
      <FilePreviewList files={files} onRemove={handleFileRemove} />

      {/* 错误提示 */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                Processing Failed
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="flex-shrink-0 text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              aria-label="Close error message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 操作选择（仅在有文件时显示） */}
      {files.length > 0 && (
        <>
          <OperationSelector
            operationType={operationType}
            onOperationSelect={setOperationType}
            fileType="video"
          />

          {/* 转换/压缩设置 */}
          <ConversionSettings
            fileType="video"
            operationType={operationType}
            compressionMode={compressionMode}
            targetFormat={targetFormat}
            onTargetFormatChange={setTargetFormat}
            onCompressionModeChange={setCompressionMode}
            onStart={handleStartOperation}
            isProcessing={isProcessing}
          />

          {/* 处理结果列表 */}
          <ResultList
            files={processedFiles.filter(
              (pf) =>
                files.some((f) => f.id === pf.originalFileId) &&
                pf.operationType === operationType
            )}
            onRemove={removeProcessedFile}
            onDownload={handleDownload}
          />
        </>
      )}
      </div>
    </MainLayout>
  );
}
