/**
 * 图片处理工具
 * 使用 browser-image-compression 进行图片格式转换和压缩
 * 对于浏览器不支持的格式（HEIC, AVIF, TIFF, BMP 等），会尝试转换为 PNG 或给出提示
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
 * 加载图片文件
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("无法加载图片"));
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
 * 对于浏览器不支持的格式（HEIC, AVIF, TIFF, BMP 等），会尝试转换为 PNG
 */
export async function convertImageFormat(
  file: File,
  targetFormat: ImageFormat
): Promise<Blob> {
  try {
    // 检测源文件格式
    const sourceFormat = detectImageFormat(file);
    
    // 检查浏览器是否能加载该图片
    const canLoad = await canLoadImageWithBrowser(file);
    
    if (!canLoad) {
      // 如果浏览器无法加载图片（不支持的格式），抛出错误提示
      const unsupportedFormats = ["heic", "avif", "tiff", "bmp"];
      if (unsupportedFormats.includes(sourceFormat)) {
        throw new Error(
          `Browser does not support ${sourceFormat.toUpperCase()} format. Please convert the image to JPG, PNG, or WebP format first.`
        );
      }
      throw new Error("Browser cannot load this image format");
    }

    // 使用浏览器原生方式处理
    // 加载图片
    const img = await loadImage(file);

    // 创建 Canvas
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // 绘制图片到 Canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get Canvas context");
    }

    ctx.drawImage(img, 0, 0);

    // 获取 MIME 类型
    const mimeType = getMimeType(targetFormat);

    // 检查格式支持
    if (!isFormatSupported(targetFormat)) {
      // 对于不支持的格式，降级为 PNG
      console.warn(
        `[图片转换] 目标格式 ${targetFormat} 不支持，降级为 PNG`
      );
      return canvasToBlob(canvas, "image/png");
    }

    // 转换为目标格式
    // 对于 JPEG 和 WebP，可以设置质量
    if (targetFormat === "jpg" || targetFormat === "jpeg" || targetFormat === "webp") {
      return canvasToBlob(canvas, mimeType, 0.92);
    }

    // 其他格式
    return canvasToBlob(canvas, mimeType);
  } catch (error) {
      throw new Error(
        `Image format conversion failed: ${error instanceof Error ? error.message : String(error)}`
      );
  }
}

/**
 * 压缩图片
 * 使用 browser-image-compression 库进行压缩
 * 对于浏览器不支持的格式（HEIC, AVIF, TIFF, BMP 等），会抛出错误提示
 */
export async function compressImage(
  file: File,
  mode: CompressionMode
): Promise<Blob> {
  try {
    // 检测源文件格式
    const sourceFormat = detectImageFormat(file);
    
    // 检查浏览器是否能加载该图片
    const canLoad = await canLoadImageWithBrowser(file);
    
    if (!canLoad) {
      // 如果浏览器无法加载图片（不支持的格式），抛出错误提示
      const unsupportedFormats = ["heic", "avif", "tiff", "bmp"];
      if (unsupportedFormats.includes(sourceFormat)) {
        throw new Error(
          `浏览器不支持 ${sourceFormat.toUpperCase()} 格式的压缩。请先将图片转换为 JPG、PNG 或 WebP 格式。`
        );
      }
      throw new Error("浏览器无法加载此图片格式");
    }

    const originalFormat = file.name.split(".").pop()?.toLowerCase() || "png";
    const originalSizeMB = file.size / (1024 * 1024);

    if (mode === "lossless") {
      // 无损压缩：保持原始格式和质量，只进行优化压缩
      // 使用较高的质量设置，尝试减小文件大小但不损失质量
      const options = {
        maxSizeMB: originalSizeMB * 0.9, // 尝试减少 10%
        maxWidthOrHeight: undefined, // 不改变尺寸
        useWebWorker: true,
        fileType: `image/${originalFormat === "jpg" ? "jpeg" : originalFormat}`,
        initialQuality: 1.0, // 最高质量
        alwaysKeepResolution: true, // 保持分辨率
      };

      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } else {
      // 有损压缩：使用较低的质量和优化的压缩选项
      const isJpeg = originalFormat === "jpg" || originalFormat === "jpeg";
      
      const options = {
        maxSizeMB: originalSizeMB * 0.5, // 目标减少到原来的 50%
        maxWidthOrHeight: undefined, // 不改变尺寸（如果尺寸不是主要问题）
        useWebWorker: true,
        fileType: isJpeg ? "image/jpeg" : "image/webp", // JPG 保持 JPG，其他用 WebP
        initialQuality: 0.75, // 75% 质量，平衡质量和文件大小
        alwaysKeepResolution: true,
      };

      const compressedFile = await imageCompression(file, options);
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
 */
export function generateProcessedFileName(
  originalName: string,
  targetFormat?: string,
  operationType: "convert" | "compress" = "convert"
): string {
  // 移除原始扩展名
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");

  if (operationType === "convert" && targetFormat) {
    // 格式转换：原名称 + 新格式
    return `${nameWithoutExt}.${targetFormat}`;
  } else if (operationType === "compress") {
    // 压缩：原名称 + compressed + 原格式
    const originalExt = originalName.split(".").pop() || "png";
    return `${nameWithoutExt}_compressed.${originalExt}`;
  }

  return originalName;
}
