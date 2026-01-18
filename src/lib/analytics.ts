/**
 * Google Analytics 4 (GA4) 工具函数
 * 用于追踪页面访问和用户行为事件
 */

// 声明 gtag 类型
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NR6F75G20E";

/**
 * 检查 GA4 是否已加载
 */
export function isGA4Loaded(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * 追踪页面访问（由 Next.js 自动处理，这里保留以备需要手动调用）
 */
export function trackPageView(url: string): void {
  if (!isGA4Loaded()) return;

  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * 追踪"开始转换"事件
 */
export function trackConversionStart(fileType: "image" | "video", targetFormat: string): void {
  if (!isGA4Loaded()) return;

  window.gtag("event", "conversion_start", {
    event_category: "operation",
    event_label: "convert",
    file_type: fileType,
    target_format: targetFormat,
    value: 1,
  });
}

/**
 * 追踪"开始压缩"事件
 */
export function trackCompressionStart(
  fileType: "image" | "video",
  compressionMode: "lossless" | "lossy"
): void {
  if (!isGA4Loaded()) return;

  window.gtag("event", "compression_start", {
    event_category: "operation",
    event_label: "compress",
    file_type: fileType,
    compression_mode: compressionMode,
    value: 1,
  });
}

/**
 * 追踪文件上传事件（可选）
 */
export function trackFileUpload(fileType: "image" | "video", fileCount: number): void {
  if (!isGA4Loaded()) return;

  window.gtag("event", "file_upload", {
    event_category: "user_action",
    event_label: "upload",
    file_type: fileType,
    file_count: fileCount,
    value: fileCount,
  });
}
