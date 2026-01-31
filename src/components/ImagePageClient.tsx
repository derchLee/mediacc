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
import type { Locale } from "@/lib/translations";
import type { ImagePageT } from "@/lib/translations";

interface ImagePageClientProps {
  locale: Locale;
  t: ImagePageT;
}

export function ImagePageClient({ locale, t }: ImagePageClientProps) {
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
    setFileType("image");
  }, [setFileType]);

  const handleFilesSelected = (newFiles: File[]) => addFiles(newFiles);
  const handleFileRemove = (id: string) => removeFile(id);

  const handleStartOperation = async () => {
    if (!operationType || files.length === 0) return;
    if (operationType === "convert" && !targetFormat) return;
    if (operationType === "compress" && !compressionMode) return;
    if (operationType === "convert" && targetFormat) trackConversionStart("image", targetFormat);
    else if (operationType === "compress" && compressionMode) trackCompressionStart("image", compressionMode);
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      for (const uploadedFile of files) {
        try {
          let processedBlob: Blob;
          let processedFileName: string;
          let processedFormat: string;
          if (operationType === "convert" && targetFormat) {
            processedBlob = await convertImageFormat(uploadedFile.file, targetFormat as "jpg" | "png" | "webp" | "avif");
            processedFormat = getExtensionFromFormat(targetFormat);
            processedFileName = generateProcessedFileName(uploadedFile.name, processedFormat, "convert");
          } else if (operationType === "compress" && compressionMode) {
            processedBlob = await compressImage(uploadedFile.file, compressionMode);
            processedFormat = uploadedFile.format;
            processedFileName = generateProcessedFileName(uploadedFile.name, undefined, "compress");
          } else continue;
          let preview: string | undefined;
          if (processedBlob.type.startsWith("image/")) preview = URL.createObjectURL(processedBlob);
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

        <FileUploader fileType="image" onFilesSelected={handleFilesSelected} multiple currentFiles={files} locale={locale} />
        <SupportedFormats fileType="image" locale={locale} />
        <FilePreviewList files={files} onRemove={handleFileRemove} locale={locale} />

        {files.length > 0 && (
          <>
            <OperationSelector operationType={operationType} onOperationSelect={setOperationType} fileType="image" locale={locale} />
            <ConversionSettings
              fileType="image"
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
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.imageCompression}</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {t.imageCompressionList.map((item, i) => (
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
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.formatConversionPrinciple}</h4>
                <ol className="list-decimal list-inside space-y-1 ml-8 mt-2">
                  {t.formatConversionPrincipleList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{t.compressionPrinciple}</h4>
                <ol className="list-decimal list-inside space-y-1 ml-8 mt-2">
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
