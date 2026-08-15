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
    <div className="mt-6 rounded-2xl bg-[#f4f8fa] p-5 dark:bg-slate-800/60">
      <div className="mb-3 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        {formats.map((format, index) => (
          <span key={index} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <span className="font-bold text-slate-700 dark:text-slate-100">
              {format.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

