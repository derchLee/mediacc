/**
 * 图片处理工具
 * 使用 browser-image-compression 进行图片格式转换和压缩
 * HEIC 格式通过 heic2any 在客户端解码（浏览器无法原生加载）
 * 其他不支持的格式（AVIF, TIFF, BMP 等）会给出提示
 */

import imageCompression from "browser-image-compression";
import type { ImageFormat, CompressionMode } from "@/types";

/**
 * 获取格式对应的 MIME 类型
 */
function getMimeType(format: ImageFormat): string {
  const mimeMap: Record<ImageFormat, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    avif: "image/avif",
    heic: "image/heic", // 注意：浏览器可能不支持，会降级
    bmp: "image/bmp",
    tiff: "image/tiff", // 注意：浏览器可能不支持，会降级
  };
  return mimeMap[format] || "image/png";
}

/**
 * 检查浏览器是否支持格式
 */
function isFormatSupported(format: ImageFormat): boolean {
  // 浏览器原生支持的基本格式
  const supportedFormats: ImageFormat[] = ["jpg", "jpeg", "png", "webp"];
  return supportedFormats.includes(format);
}

/**
 * 检测文件格式（从文件名或 MIME 类型推断）
 */
function detectImageFormat(file: File): ImageFormat {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const mimeType = file.type.toLowerCase();

  // 从 MIME 类型推断
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return "jpg";
  if (mimeType.includes("png")) return "png";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("gif")) return "gif";
  if (mimeType.includes("avif")) return "avif";
  if (mimeType.includes("heic") || mimeType.includes("heif")) return "heic";
  if (mimeType.includes("bmp")) return "bmp";
  if (mimeType.includes("tiff")) return "tiff";

  // 从扩展名推断
  const formatMap: Record<string, ImageFormat> = {
    jpg: "jpg",
    jpeg: "jpeg",
    png: "png",
    webp: "webp",
    gif: "gif",
    avif: "avif",
    heic: "heic",
    heif: "heic",
    bmp: "bmp",
    tiff: "tiff",
    tif: "tiff",
  };

  return formatMap[ext] || "png";
}

/**
 * 使用 heic2any 将 HEIC/HEIF 转换为浏览器可处理的格式
 * 动态导入避免 SSR 时 window 未定义（heic2any 需浏览器环境）
 * heic2any 支持输出 JPEG、PNG、GIF，不支持 WebP
 * @returns 转换后的 Blob（单张 HEIC 取第一帧）
 */
async function convertHeicToBlob(
  file: File,
  toType: "image/jpeg" | "image/png" | "image/gif" = "image/jpeg",
  quality = 0.92
): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({
    blob: file,
    toType,
    quality,
  });
  const blob = Array.isArray(result) ? result[0] : result;
  if (!blob) {
    throw new Error("HEIC conversion failed: no output");
  }
  return blob;
}

/**
 * 通过 Canvas 重新编码去除 EXIF/元数据
 * Canvas 绘制后导出不会包含原始元数据
 */
async function stripMetadataFromBlob(blob: Blob): Promise<Blob> {
  const img = await loadImage(blob as unknown as File);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to get Canvas context");
  ctx.drawImage(img, 0, 0);
  const mime = blob.type || "image/jpeg";
  return canvasToBlob(canvas, mime, mime === "image/jpeg" || mime === "image/webp" ? 0.95 : undefined);
}

/**
 * 将 Blob 转为 File（保留文件名基础，替换扩展名）
 */
function blobToFile(blob: Blob, baseName: string, ext: string): File {
  const name = baseName.replace(/\.[^/.]+$/, "") + "." + ext;
  return new File([blob], name, { type: blob.type });
}

/**
 * 检测图片是否能通过浏览器原生方式加载（用于判断是否支持）
 */
async function canLoadImageWithBrowser(file: File): Promise<boolean> {
  try {
    const img = new Image();
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve(false);
      }, 3000); // 3秒超时

      img.onload = () => {
        clearTimeout(timeout);
        URL.revokeObjectURL(url);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        URL.revokeObjectURL(url);
        resolve(false);
      };

      img.src = url;
    });
  } catch (error) {
    return false;
  }
}

/**
 * 加载图片（支持 File 或 Blob）
 */
function loadImage(source: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(source);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to load image"));
    };

    img.src = url;
  });
}

/**
 * Canvas 转换为 Blob
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("无法创建 Blob"));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * 转换图片格式
 * 使用浏览器原生方式（Canvas API）
 * HEIC 源通过 heic2any 先解码，再按目标格式输出
 * @param stripMetadata 为 true 时移除 EXIF 等元数据（通过 Canvas 重编码）
 */
export async function convertImageFormat(
  file: File,
  targetFormat: ImageFormat,
  stripMetadata?: boolean
): Promise<Blob> {
  try {
    const sourceFormat = detectImageFormat(file);

    // HEIC 源：使用 heic2any 转换（浏览器无法原生加载 HEIC）
    if (sourceFormat === "heic") {
      if (targetFormat === "jpg" || targetFormat === "jpeg") {
        return convertHeicToBlob(file, "image/jpeg", 0.92);
      }
      if (targetFormat === "png") {
        return convertHeicToBlob(file, "image/png");
      }
      if (targetFormat === "gif") {
        return convertHeicToBlob(file, "image/gif");
      }
      // 目标为 webp：heic2any 不支持 webp，先转 PNG 再经 Canvas 转 WebP
      if (targetFormat === "webp") {
        const pngBlob = await convertHeicToBlob(file, "image/png");
        const pngFile = blobToFile(pngBlob, file.name, "png");
        const img = await loadImage(pngFile);
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Unable to get Canvas context");
        ctx.drawImage(img, 0, 0);
        return canvasToBlob(canvas, "image/webp", 0.92);
      }
      // 其他目标格式（heic/avif/bmp/tiff）降级为 PNG
      return convertHeicToBlob(file, "image/png");
    }

    // 非 HEIC：检查浏览器是否能加载
    const canLoad = await canLoadImageWithBrowser(file);
    if (!canLoad) {
      const unsupportedFormats = ["avif", "tiff", "bmp"];
      if (unsupportedFormats.includes(sourceFormat)) {
        throw new Error(
          `Browser does not support ${sourceFormat.toUpperCase()} format. Please convert the image to JPG, PNG, or WebP format first.`
        );
      }
      throw new Error("Browser cannot load this image format");
    }

    // 使用 Canvas 处理
    const img = await loadImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get Canvas context");
    ctx.drawImage(img, 0, 0);

    const mimeType = getMimeType(targetFormat);
    if (!isFormatSupported(targetFormat)) {
      console.warn(
        `[图片转换] 目标格式 ${targetFormat} 不支持，降级为 PNG`
      );
      return canvasToBlob(canvas, "image/png");
    }

    let result: Blob;
    if (targetFormat === "jpg" || targetFormat === "jpeg" || targetFormat === "webp") {
      result = await canvasToBlob(canvas, mimeType, 0.92);
    } else {
      result = await canvasToBlob(canvas, mimeType);
    }
    if (stripMetadata) {
      result = await stripMetadataFromBlob(result);
    }
    return result;
  } catch (error) {
    throw new Error(
      `Image format conversion failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * 压缩图片
 * 使用 browser-image-compression 库进行压缩
 * HEIC 源先通过 heic2any 转为 JPG/PNG，再压缩
 */
export async function compressImage(
  file: File,
  mode: CompressionMode
): Promise<Blob> {
  try {
    const sourceFormat = detectImageFormat(file);
    let fileToCompress = file;

    // HEIC 源：先用 heic2any 转为浏览器可处理格式
    if (sourceFormat === "heic") {
      const convertedBlob =
        mode === "lossless"
          ? await convertHeicToBlob(file, "image/png")
          : await convertHeicToBlob(file, "image/jpeg", 0.95);
      const ext = mode === "lossless" ? "png" : "jpg";
      fileToCompress = blobToFile(convertedBlob, file.name, ext);
    } else {
      const canLoad = await canLoadImageWithBrowser(file);
      if (!canLoad) {
        const unsupportedFormats = ["avif", "tiff", "bmp"];
        if (unsupportedFormats.includes(sourceFormat)) {
          throw new Error(
            `浏览器不支持 ${sourceFormat.toUpperCase()} 格式的压缩。请先将图片转换为 JPG、PNG 或 WebP 格式。`
          );
        }
        throw new Error("浏览器无法加载此图片格式");
      }
    }

    const originalFormat = fileToCompress.name.split(".").pop()?.toLowerCase() || "png";
    const originalSizeMB = fileToCompress.size / (1024 * 1024);

    if (mode === "lossless") {
      const options = {
        maxSizeMB: originalSizeMB * 0.9,
        maxWidthOrHeight: undefined,
        useWebWorker: true,
        fileType: `image/${originalFormat === "jpg" ? "jpeg" : originalFormat}`,
        initialQuality: 1.0,
        alwaysKeepResolution: true,
      };
      const compressedFile = await imageCompression(fileToCompress, options);
      return compressedFile;
    } else {
      const isJpeg = originalFormat === "jpg" || originalFormat === "jpeg";
      const options = {
        maxSizeMB: originalSizeMB * 0.5,
        maxWidthOrHeight: undefined,
        useWebWorker: true,
        fileType: isJpeg ? "image/jpeg" : "image/webp",
        initialQuality: 0.75,
        alwaysKeepResolution: true,
      };
      const compressedFile = await imageCompression(fileToCompress, options);
      return compressedFile;
    }
  } catch (error) {
    throw new Error(
      `Image compression failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * 生成处理后的文件名
 * @param outputFormat 压缩时的实际输出格式（HEIC 压缩后为 jpg/png，需传入）
 */
export function generateProcessedFileName(
  originalName: string,
  targetFormat?: string,
  operationType: "convert" | "compress" = "convert",
  outputFormat?: string
): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");

  if (operationType === "convert" && targetFormat) {
    return `${nameWithoutExt}.${targetFormat}`;
  }
  if (operationType === "compress") {
    const ext = outputFormat ?? originalName.split(".").pop() ?? "png";
    return `${nameWithoutExt}_compressed.${ext}`;
  }
  return originalName;
}
