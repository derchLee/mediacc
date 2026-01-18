/**
 * FFmpeg iframe 管理器
 * 使用 iframe 隔离 Webpack 的影响，避免模块解析问题
 */

"use client";

import type { VideoFormat, CompressionMode } from "@/types";

type MessageHandler = (data: any) => void;

class FFmpegIframeManager {
  private iframe: HTMLIFrameElement | null = null;
  private messageHandlers: Map<string, MessageHandler> = new Map();
  private messageIdCounter = 0;
  private ready = false;
  private readyPromise: Promise<void> | null = null;
  private boundHandleMessage: ((event: MessageEvent) => void) | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    // 确保 document.body 存在
    if (!document.body) {
      console.error("[FFmpeg Iframe Manager] document.body 不存在，延迟初始化");
      // 等待 DOM 加载完成
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.init());
        return;
      }
      throw new Error("无法创建 iframe：document.body 不存在");
    }

    // 创建 iframe
    this.iframe = document.createElement("iframe");
    this.iframe.src = "/ffmpeg-worker.html";
    this.iframe.style.display = "none";
    this.iframe.setAttribute("sandbox", "allow-scripts allow-same-origin"); // 添加安全限制
    document.body.appendChild(this.iframe);

    // 绑定消息处理器（保存引用以便后续移除）
    this.boundHandleMessage = this.handleMessage.bind(this);
    window.addEventListener("message", this.boundHandleMessage);

    // 等待 iframe 准备就绪
    this.readyPromise = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        window.removeEventListener("message", checkReady);
        reject(new Error("iframe 初始化超时（10秒）"));
      }, 10000); // 10秒超时

      const checkReady = (event: MessageEvent) => {
        // 验证消息来源（确保来自我们的 iframe）
        if (
          event.source !== this.iframe?.contentWindow ||
          !event.data?.type ||
          event.data.type !== "READY"
        ) {
          return;
        }

        clearTimeout(timeoutId);
        resolve();
        this.ready = true;
        window.removeEventListener("message", checkReady);
      };
      window.addEventListener("message", checkReady);
    });
  }

  private handleMessage(event: MessageEvent): void {
    // 验证消息来源（确保来自我们的 iframe）
    if (event.source !== this.iframe?.contentWindow) {
      return;
    }

    const { id, type, payload } = event.data;

    // 验证消息格式
    if (!id || !type) {
      return;
    }

    if (type === "READY") {
      return; // READY 消息由 readyPromise 处理
    }

    const handler = this.messageHandlers.get(id);
    if (handler) {
      handler({ type, payload });
      // 只有成功或错误消息才删除 handler，进度更新消息不删除
      if (type.endsWith("_SUCCESS") || type === "ERROR") {
        this.messageHandlers.delete(id);
      }
    }
  }

  private async ensureReady(): Promise<void> {
    if (!this.ready && this.readyPromise) {
      await this.readyPromise;
    }
  }

  private sendMessage(
    type: string,
    payload: any,
    handler: MessageHandler
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.ensureReady();

      const id = `msg_${this.messageIdCounter++}`;

      this.messageHandlers.set(id, (data) => {
        if (data.type.endsWith("_SUCCESS")) {
          handler(data);
          resolve(data.payload);
        } else if (data.type === "ERROR") {
          reject(new Error(data.payload.message));
        } else {
          handler(data);
        }
      });

      if (!this.iframe?.contentWindow) {
        reject(new Error("iframe 未准备就绪"));
        return;
      }

      // 根据文件大小动态设置超时时间
      // 如果payload包含fileData，根据文件大小计算超时
      let timeoutMs = 900000; // 默认15分钟
      if (payload?.fileData && Array.isArray(payload.fileData)) {
        const fileSizeMB = payload.fileData.length / 1024 / 1024;
        if (fileSizeMB > 100) {
          // 大于100MB：45分钟超时
          timeoutMs = 2700000;
          console.log(`[FFmpeg Manager] 超大文件（${fileSizeMB.toFixed(2)}MB），设置超时为45分钟`);
        } else if (fileSizeMB > 50) {
          // 大于50MB：30分钟超时
          timeoutMs = 1800000;
          console.log(`[FFmpeg Manager] 大文件（${fileSizeMB.toFixed(2)}MB），设置超时为30分钟`);
        } else if (fileSizeMB > 20) {
          // 大于20MB：20分钟超时
          timeoutMs = 1200000;
          console.log(`[FFmpeg Manager] 中等文件（${fileSizeMB.toFixed(2)}MB），设置超时为20分钟`);
        }
      }

      this.iframe.contentWindow.postMessage({ id, type, payload }, "*");

      // 设置动态超时
      setTimeout(() => {
        if (this.messageHandlers.has(id)) {
          this.messageHandlers.delete(id);
          const timeoutMinutes = timeoutMs / 60000;
          reject(new Error(`Operation timeout (${timeoutMinutes} minutes)`));
        }
      }, timeoutMs);
    });
  }

  async initFFmpeg(): Promise<void> {
    await this.sendMessage("INIT", {}, () => {});
  }

  async convertVideoFormat(
    file: File,
    targetFormat: VideoFormat,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    // 读取文件数据
    const arrayBuffer = await file.arrayBuffer();
    const fileData = Array.from(new Uint8Array(arrayBuffer));

    // 创建进度监听器（如果提供）
    let progressHandler: MessageHandler | undefined;
    if (onProgress) {
      progressHandler = (data: any) => {
        if (data.type === "PROGRESS_UPDATE") {
          onProgress(data.payload.progress);
        }
      };
    }

    // 执行转换（进度监听整合在转换消息中）
    const result = await this.sendMessage(
      "CONVERT_FORMAT",
      {
        fileData,
        fileName: file.name,
        targetFormat,
      },
      progressHandler || (() => {})
    );

    // 转换为 Blob
    const uint8Array = new Uint8Array(result);
    const mimeType = `video/${targetFormat === "mov" ? "quicktime" : targetFormat}`;
    return new Blob([uint8Array], { type: mimeType });
  }

  async compressVideo(
    file: File,
    mode: CompressionMode,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    // 读取文件数据
    const arrayBuffer = await file.arrayBuffer();
    const fileData = Array.from(new Uint8Array(arrayBuffer));

    // 设置进度监听（在压缩消息中处理）
    let progressHandler: MessageHandler | undefined;
    if (onProgress) {
      progressHandler = (data: any) => {
        if (data.type === "PROGRESS_UPDATE") {
          onProgress(data.payload.progress);
        }
      };
    }

    // 执行压缩
    const result = await this.sendMessage(
      "COMPRESS",
      {
        fileData,
        fileName: file.name,
        mode,
      },
      progressHandler || (() => {})
    );

    // 转换为 Blob
    const uint8Array = new Uint8Array(result);
    const originalFormat = file.name.split(".").pop() || "mp4";
    const mimeType =
      originalFormat === "mov" ? "video/quicktime" : `video/${originalFormat}`;
    return new Blob([uint8Array], { type: mimeType });
  }

  destroy(): void {
    // 移除消息监听器
    if (this.boundHandleMessage) {
      window.removeEventListener("message", this.boundHandleMessage);
      this.boundHandleMessage = null;
    }

    // 移除 iframe
    if (this.iframe && this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe);
      this.iframe = null;
    }

    this.messageHandlers.clear();
    this.ready = false;
    this.readyPromise = null;
  }
}

// 单例实例
let iframeManagerInstance: FFmpegIframeManager | null = null;

export function getFFmpegIframeManager(): FFmpegIframeManager {
  if (!iframeManagerInstance) {
    iframeManagerInstance = new FFmpegIframeManager();
  }
  return iframeManagerInstance;
}

