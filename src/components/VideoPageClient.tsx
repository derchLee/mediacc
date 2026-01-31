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
import type { Locale } from "@/lib/translations";
import type { VideoPageT } from "@/lib/translations";

interface VideoPageClientProps {
  locale: Locale;
  t: VideoPageT;
}

export function VideoPageClient({ locale, t }: VideoPageClientProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    files,
    setFileType,
    addFiles,
    removeFile,
    operationType,
    compressionMode,
    targetFormat,
    processedFiles,
    isProcessing,
    setOperationType,
    setCompressionMode,
    setTargetFormat,
    addProcessedFile,
    removeProcessedFile,
    setIsProcessing,
  } = useMediaStore();

  useEffect(() => {
    setFileType("video");
  }, [setFileType]);

  const handleFilesSelected = (newFiles: File[]) => addFiles(newFiles);
  const handleFileRemove = (id: string) => removeFile(id);

  const handleStartOperation = async () => {
    if (!operationType || files.length === 0) return;
    if (operationType === "convert" && !targetFormat) return;
    if (operationType === "compress" && !compressionMode) return;
    if (operationType === "convert" && targetFormat) trackConversionStart("video", targetFormat);
    else if (operationType === "compress" && compressionMode) trackCompressionStart("video", compressionMode);
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      for (const uploadedFile of files) {
        try {
          let processedBlob: Blob;
          let processedFileName: string;
          let processedFormat: string;
          if (operationType === "convert" && targetFormat) {
            processedBlob = await convertVideoFormat(uploadedFile.file, targetFormat as "mp4" | "webm" | "mov" | "mkv" | "avi");
            processedFormat = getExtensionFromFormat(targetFormat);
            processedFileName = generateProcessedVideoFileName(uploadedFile.name, targetFormat as "mp4" | "webm" | "mov" | "mkv" | "avi", "convert");
          } else if (operationType === "compress" && compressionMode) {
            processedBlob = await compressVideo(uploadedFile.file, compressionMode);
            processedFormat = uploadedFile.format;
            processedFileName = generateProcessedVideoFileName(uploadedFile.name, undefined, "compress");
          } else continue;
          let preview: string | undefined;
          if (processedBlob.type.startsWith("video/")) preview = URL.createObjectURL(processedBlob);
          const processedFile: ProcessedFile = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            originalFileId: uploadedFile.id,
            name: processedFileName,
            size: processedBlob.size,
            format: processedFormat,
            blob: processedBlob,
            preview,
            operationType,
            compressionMode: operationType === "compress" ? compressionMode ?? undefined : undefined,
            targetFormat: operationType === "convert" ? targetFormat ?? undefined : undefined,
          };
          addProcessedFile(processedFile);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          setErrorMessage(`${uploadedFile.name}: ${errorMsg}`);
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setErrorMessage(errorMsg);
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
      <main className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t.h1}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t.intro}</p>
        </header>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t.whyChoose}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
            {t.whyList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t.howItWorks}</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
            {t.howSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        <FileUploader fileType="video" onFilesSelected={handleFilesSelected} multiple currentFiles={files} locale={locale} />
        <SupportedFormats fileType="video" locale={locale} />
        <FilePreviewList files={files} onRemove={handleFileRemove} locale={locale} />

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">{t.processingFailed}</h4>
                <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
              <button onClick={() => setErrorMessage(null)} className="flex-shrink-0 text-red-500 hover:text-red-700" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <>
            <OperationSelector operationType={operationType} onOperationSelect={setOperationType} fileType="video" locale={locale} />
            <ConversionSettings
              fileType="video"
              operationType={operationType}
              compressionMode={compressionMode}
              targetFormat={targetFormat}
              onTargetFormatChange={setTargetFormat}
              onCompressionModeChange={setCompressionMode}
              onStart={handleStartOperation}
              isProcessing={isProcessing}
              locale={locale}
            />
            <ResultList
              files={processedFiles.filter((pf) => files.some((f) => f.id === pf.originalFileId) && pf.operationType === operationType)}
              onRemove={removeProcessedFile}
              onDownload={handleDownload}
              locale={locale}
            />
          </>
        )}

        <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{t.detailedGuide}</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t.howToUse}</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.formatConversion}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {t.formatConversionList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.videoCompression}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {t.videoCompressionList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.batchProcessing}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {t.batchList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.fileLimits}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {t.fileLimitsList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
                    {t.largeFileWarnings.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t.implementationPrinciples}</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.videoEngine}</h4>
                <ol className="list-decimal list-inside space-y-1 ml-8 mt-2">
                  {t.videoEngineList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.conversionProcess}</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  {t.conversionProcessList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.compressionPrinciple}</h4>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  {t.compressionPrincipleList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-gray-100">{t.privacySecurity}</h2>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-300">{t.privacyText}</p>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
