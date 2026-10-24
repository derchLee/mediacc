import type { ImageResizeOptions } from "@/types";

export const MAX_RESIZE_DIMENSION = 8192;
export const MAX_RESIZE_PIXELS = 32_000_000;

export function isValidResizeSize(width: number, height: number): boolean {
  return Number.isInteger(width) && Number.isInteger(height) &&
    width > 0 && height > 0 &&
    width <= MAX_RESIZE_DIMENSION && height <= MAX_RESIZE_DIMENSION &&
    width * height <= MAX_RESIZE_PIXELS;
}

/** Exact output by default; optionally fit inside the target box without cropping. */
export function getResizeDimensions(
  sourceWidth: number,
  sourceHeight: number,
  options: ImageResizeOptions,
): { width: number; height: number } {
  if (!isValidResizeSize(options.width, options.height)) {
    throw new Error("Invalid resize dimensions");
  }
  if (!Number.isInteger(sourceWidth) || !Number.isInteger(sourceHeight) || sourceWidth < 1 || sourceHeight < 1) {
    throw new Error("Invalid source image dimensions");
  }
  if (!options.keepAspectRatio) return { width: options.width, height: options.height };

  const scale = Math.min(options.width / sourceWidth, options.height / sourceHeight);
  return {
    width: Math.max(1, Math.round(sourceWidth * scale)),
    height: Math.max(1, Math.round(sourceHeight * scale)),
  };
}
