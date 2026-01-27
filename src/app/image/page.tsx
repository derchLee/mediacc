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

      {/* Usage Guide and Implementation Principles */}
      <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Image Conversion & Compression Guide
        </h2>

        {/* Operation Instructions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            How to Use
          </h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">1. Format Conversion</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Supported formats: JPG/JPEG, PNG, GIF, WebP, AVIF, HEIC, BMP, TIFF</li>
                <li>Select "Convert" operation and choose the target format (e.g., JPG to PNG)</li>
                <li>Click the "Start Processing" button, and the system will complete the conversion locally in your browser</li>
                <li>After conversion, you can directly download the image in the new format</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">2. Image Compression</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Select "Compress" operation and choose compression mode</li>
                <li><strong>Lossless compression</strong>: Maintains original quality while optimizing file size (approximately 10% reduction)</li>
                <li><strong>Lossy compression</strong>: Balances quality and file size, significantly reducing file size (approximately 50% reduction)</li>
                <li>Supports batch processing of multiple image files</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">3. Batch Processing</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You can upload multiple image files simultaneously</li>
                <li>All files will be processed in queue order</li>
                <li>Each file can be downloaded individually after processing is complete</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">4. File Size Limits & Notes</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Single file limit</strong>: Maximum 150MB per image file</li>
                <li><strong>Total file size limit</strong>: Maximum 500MB total file size per session</li>
                <li><strong>File count limit</strong>: Maximum 5 files can be processed simultaneously</li>
                <li><strong>Large file processing warnings</strong>:
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
                    <li>Larger files take longer to process; we recommend keeping individual files under 50MB for the best experience</li>
                    <li>Files over 100MB may cause processing timeout or browser memory issues</li>
                    <li>If processing fails due to large file size, consider compressing the image with another tool first</li>
                    <li>Keep the browser tab open when processing large files to avoid interruption from switching tabs</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Principles */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Implementation Principles
          </h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Format Conversion Principle</h4>
              <p className="ml-4">
                Uses the browser&apos;s native <strong>Canvas API</strong> for image format conversion:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-8 mt-2">
                <li>Load the original image into an Image object in memory</li>
                <li>Draw the image onto a Canvas</li>
                <li>Export to the target format using Canvas&apos;s <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">toBlob()</code> method</li>
                <li>For JPEG and WebP formats, quality parameters can be set (default 92%)</li>
                <li>Unsupported formats (such as HEIC, AVIF) will attempt to downgrade to PNG or prompt the user</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Compression Principle</h4>
              <p className="ml-4">
                Uses the <strong>browser-image-compression</strong> library for intelligent compression:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-8 mt-2">
                <li>Lossless compression: Maintains original format and quality while reducing file size through optimized encoding parameters</li>
                <li>Lossy compression: Adjusts quality parameters (75%) and compression algorithms to maximize compression ratio within acceptable visual quality</li>
                <li>Uses Web Worker for background thread processing without blocking the main interface</li>
                <li>Automatically maintains original resolution without changing image dimensions</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Privacy & Security Notice */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            100% Local Processing, Protecting Your Privacy
          </h3>
          <div className="space-y-2 text-green-700 dark:text-green-300">
            <p>
              <strong>Important Notice:</strong> All image processing operations are completed entirely in your browser locally. Files are <strong>never uploaded to any server</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All processing occurs in browser memory, and files are only saved on your device after processing</li>
              <li>No file data is sent to any external servers</li>
              <li>Your image content is not stored or recorded</li>
              <li>Supports offline use (PWA mode) - no network connection required to process images</li>
              <li>Your privacy and data security are fully protected</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
