import React from "react";
import { FileImage, FileVideo } from "lucide-react";
import type { FileType } from "@/types";
import { imageFormats, videoFormats } from "@/lib/file-formats";
import { getUiT, type Locale } from "@/lib/translations";

interface SupportedFormatsProps {
  fileType: FileType;
  locale?: Locale;
}

export function SupportedFormats({ fileType, locale = "en" }: SupportedFormatsProps) {
  const t = getUiT(locale);
  const formats = fileType === "image" ? imageFormats : videoFormats;
  const Icon = fileType === "image" ? FileImage : FileVideo;
  const title = fileType === "image" ? t.supportedImageFormats : t.supportedVideoFormats;

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Icon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {formats.map((format, index) => (
          <span key={index} className="inline-flex items-center">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {format.name}
            </span>
            {index < formats.length - 1 && (
              <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

