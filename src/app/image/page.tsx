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
import { convertImageFormat, compressImage, generateProcessedFileName } from "@/lib/image-processor";
import { getExtensionFromFormat } from "@/lib/format-utils";
import { trackConversionStart, trackCompressionStart } from "@/lib/analytics";
import type { ProcessedFile } from "@/types";

/**
 * 图片处理页面
 */
export default function ImagePage() {
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

  // 设置文件类型为图片
  useEffect(() => {
    setFileType("image");
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
      trackConversionStart("image", targetFormat);
    } else if (operationType === "compress" && compressionMode) {
      trackCompressionStart("image", compressionMode);
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

          // 图片处理
          if (operationType === "convert" && targetFormat) {
            // 格式转换
            processedBlob = await convertImageFormat(
              uploadedFile.file,
              targetFormat as any
            );
            processedFormat = getExtensionFromFormat(targetFormat);
            processedFileName = generateProcessedFileName(
              uploadedFile.name,
              processedFormat,
              "convert"
            );
          } else if (operationType === "compress" && compressionMode) {
            // 压缩
            processedBlob = await compressImage(uploadedFile.file, compressionMode);
            processedFormat = uploadedFile.format;
            processedFileName = generateProcessedFileName(
              uploadedFile.name,
              undefined,
              "compress"
            );
          } else {
            continue;
          }

          // 创建预览 URL
          let preview: string | undefined;
          if (processedBlob.type.startsWith("image/")) {
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
        fileType="image"
        onFilesSelected={handleFilesSelected}
        multiple={true}
        currentFiles={files}
      />

      {/* 支持的格式列表 */}
      <SupportedFormats fileType="image" />

      {/* 文件列表 */}
      <FilePreviewList files={files} onRemove={handleFileRemove} />

      {/* 操作选择（仅在有文件时显示） */}
      {files.length > 0 && (
        <>
          <OperationSelector
            operationType={operationType}
            onOperationSelect={setOperationType}
            fileType="image"
          />

          {/* 转换/压缩设置 */}
          <ConversionSettings
            fileType="image"
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
