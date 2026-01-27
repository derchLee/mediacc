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

      {/* Usage Guide and Implementation Principles */}
      <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Video Conversion & Compression Guide
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
                <li>Supported formats: MP4, WebM, MOV, AVI, MKV, WMV, FLV</li>
                <li>Select "Convert" operation and choose the target format (e.g., MOV to MP4)</li>
                <li>Click the "Start Processing" button, and the system will complete the conversion locally in your browser</li>
                <li>Processing progress will be displayed during conversion, and you can download the video in the new format after completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">2. Video Compression</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Select "Compress" operation and choose compression mode</li>
                <li><strong>Lossless compression</strong>: Maintains original quality using fast preset and low CRF value (CRF 18) to optimize file size</li>
                <li><strong>Lossy compression</strong>: Balances quality and file size using medium preset and higher CRF value (CRF 28), with bitrate limits (video 1Mbps, audio 128kbps)</li>
                <li>Compression may take a considerable amount of time, please be patient</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">3. Batch Processing</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You can upload multiple video files simultaneously</li>
                <li>All files will be processed in queue order to avoid browser performance issues from processing multiple large files simultaneously</li>
                <li>Each file can be downloaded individually after processing is complete</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">4. File Size Limits & Notes</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Single file limit</strong>: Maximum 150MB per video file</li>
                <li><strong>Total file size limit</strong>: Maximum 500MB total file size per session</li>
                <li><strong>File count limit</strong>: Maximum 5 files can be processed simultaneously</li>
                <li><strong>Large file processing warnings</strong>:
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
                    <li>Video processing is more time-consuming than image processing; we recommend keeping individual files under 50MB for the best experience</li>
                    <li>Video files over 100MB may cause processing timeout (up to 45 minutes) or browser memory issues</li>
                    <li>20-50MB videos may take 20-30 minutes, while 50-100MB videos may take 30-45 minutes</li>
                    <li>If processing fails due to timeout from large files, consider compressing the video with another tool first</li>
                    <li>Keep the browser tab open when processing large files to avoid interruption from switching tabs</li>
                    <li>We recommend processing in a stable network environment to avoid failures due to network issues</li>
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
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Video Processing Engine</h4>
              <p className="ml-4">
                Uses <strong>FFmpeg.wasm</strong> (WebAssembly version of FFmpeg) to process videos in the browser:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-8 mt-2">
                <li>FFmpeg.wasm is a WebAssembly port of FFmpeg, providing complete video encoding and decoding capabilities</li>
                <li>All processing is completed in a virtual file system within browser memory</li>
                <li>Uses iframe isolation environment to ensure stable module loading and execution</li>
                <li>Supports multi-threaded processing (requires SharedArrayBuffer support)</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Format Conversion Process</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Read video file as ArrayBuffer and write to FFmpeg virtual file system</li>
                <li>Use FFmpeg commands for transcoding: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-c:v libx264</code> (video encoder), <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-c:a aac</code> (audio encoder)</li>
                <li>Set encoding parameters: preset controls encoding speed, CRF value controls quality (range 18-28)</li>
                <li>Read processed video data from virtual file system and convert to Blob</li>
                <li>Clean up temporary files and release memory</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Compression Principle</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li><strong>Lossless compression</strong>: Uses CRF 18 (high quality) and fast preset to optimize encoding efficiency while maintaining visual quality</li>
                <li><strong>Lossy compression</strong>: Uses CRF 28 (lower quality) and medium preset, with video bitrate (1Mbps) and audio bitrate (128kbps) limits to significantly reduce file size</li>
                <li>All processing is completed locally in the browser without relying on server resources</li>
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
              <strong>Important Notice:</strong> All video processing operations are completed entirely in your browser locally. Files are <strong>never uploaded to any server</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All processing occurs in browser memory and virtual file system, and files are only saved on your device after processing</li>
              <li>No file data is sent to any external servers</li>
              <li>Your video content is not stored or recorded</li>
              <li>Supports offline use (PWA mode) - no network connection required to process videos</li>
              <li>Your privacy and data security are fully protected</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
