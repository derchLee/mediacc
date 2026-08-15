/**
 * 视频处理工具
 * 使用 ffmpeg.wasm 进行视频格式转换和压缩
 * 注意：此文件仅在客户端使用
 * 
 * 使用 iframe 隔离环境，避免 Next.js 的模块解析干扰
 * 这是唯一在当前环境下稳定工作的方案
 */

"use client";

import type { VideoFormat, CompressionMode } from "@/types";
import { getFFmpegIframeManager } from "./ffmpeg-iframe-manager";

/** 在用户选择视频后后台加载 FFmpeg，减少点击处理后的等待时间。 */
export function preloadVideoProcessor(): Promise<void> {
  return getFFmpegIframeManager().initFFmpeg();
}

/**
 * 转换视频格式
 */
export async function convertVideoFormat(
  file: File,
  targetFormat: VideoFormat,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  console.log("[视频转换] 🎬 开始视频格式转换:", { fileName: file.name, targetFormat });
  try {
    const manager = getFFmpegIframeManager();
    
    // 确保 FFmpeg 已初始化
    await manager.initFFmpeg();
    
    // 使用 iframe 管理器进行转换
    const resultBlob = await manager.convertVideoFormat(file, targetFormat, onProgress);
    
    console.log(`[视频转换] ✅ 视频格式转换完成，输出大小: ${resultBlob.size} 字节`);
    return resultBlob;
  } catch (error) {
    console.error("[视频转换] ❌ 视频格式转换失败:", error);
    throw new Error(`Video format conversion failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 压缩视频
 */
export async function compressVideo(
  file: File,
  mode: CompressionMode,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  console.log("[视频压缩] 🗜️  开始视频压缩:", { fileName: file.name, mode });
  try {
    const manager = getFFmpegIframeManager();
    
    // 确保 FFmpeg 已初始化
    await manager.initFFmpeg();
    
    // 使用 iframe 管理器进行压缩
    const resultBlob = await manager.compressVideo(file, mode, onProgress);
    
    console.log(`[视频压缩] ✅ 视频压缩完成，输出大小: ${resultBlob.size} 字节`);
    return resultBlob;
  } catch (error) {
    console.error("[视频压缩] ❌ 视频压缩失败:", error);
    throw new Error(`Video compression failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 生成处理后的视频文件名
 */
export function generateProcessedVideoFileName(
  originalName: string,
  targetFormat?: VideoFormat,
  operationType: "convert" | "compress" = "convert"
): string {
  // 移除原始扩展名
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");

  if (operationType === "convert" && targetFormat) {
    // 格式转换：原名称 + 新格式
    return `${nameWithoutExt}.${targetFormat}`;
  } else if (operationType === "compress") {
    // 压缩：原名称 + compressed + 原格式
    const originalExt = originalName.split(".").pop() || "mp4";
    return `${nameWithoutExt}_compressed.${originalExt}`;
  }

  return originalName;
}
