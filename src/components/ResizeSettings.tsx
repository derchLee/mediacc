"use client";

import { useId, useState } from "react";
import { Play } from "lucide-react";
import type { ImageResizeOptions } from "@/types";
import { isValidResizeSize, MAX_RESIZE_DIMENSION, MAX_RESIZE_PIXELS } from "@/lib/image-resize";
import { getUiT, type Locale } from "@/lib/translations";

interface ResizeSettingsProps {
  onStart: (options: ImageResizeOptions) => void;
  isProcessing: boolean;
  locale: Locale;
}

export function ResizeSettings({ onStart, isProcessing, locale }: ResizeSettingsProps) {
  const t = getUiT(locale);
  const id = useId();
  const [width, setWidth] = useState("1000");
  const [height, setHeight] = useState("500");
  const [keepAspectRatio, setKeepAspectRatio] = useState(false);
  const valid = isValidResizeSize(Number(width), Number(height));

  return (
    <form className="mt-6 space-y-4" onSubmit={(event) => {
      event.preventDefault();
      if (valid && !isProcessing) onStart({ width: Number(width), height: Number(height), keepAspectRatio });
    }}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.resizeImage}</h3>
      <div className="grid max-w-lg grid-cols-2 gap-4">
        {([{ key: "width", label: t.imageWidth, value: width, change: setWidth }, { key: "height", label: t.imageHeight, value: height, change: setHeight }]).map((field) => (
          <div key={field.key}>
            <label htmlFor={`${id}-${field.key}`} className="mb-2 block text-sm font-medium">{field.label} (px)</label>
            <input
              id={`${id}-${field.key}`}
              type="number"
              min={1}
              max={MAX_RESIZE_DIMENSION}
              step={1}
              required
              value={field.value}
              disabled={isProcessing}
              onChange={(event) => field.change(event.target.value)}
              aria-invalid={!valid}
              aria-describedby={`${id}-limits`}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={keepAspectRatio} disabled={isProcessing} onChange={(event) => setKeepAspectRatio(event.target.checked)} className="h-4 w-4 accent-blue-500" />
        {t.keepAspectRatio}
      </label>
      <p className="text-sm text-gray-600 dark:text-gray-300">{keepAspectRatio ? t.resizeFitHint : t.resizeExactHint}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{t.resizeFormatHint}</p>
      <p id={`${id}-limits`} className="text-xs text-gray-500 dark:text-gray-400">{t.resizeLimits.replace("{max}", String(MAX_RESIZE_DIMENSION)).replace("{megapixels}", String(MAX_RESIZE_PIXELS / 1_000_000))}</p>
      {!valid && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{t.invalidResizeDimensions}</p>}
      <button type="submit" disabled={!valid || isProcessing} className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
        <Play className="h-5 w-5" />
        {isProcessing ? t.resizing : t.startResize}
      </button>
    </form>
  );
}
