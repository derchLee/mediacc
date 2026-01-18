import React from "react";

interface DownloadCardProps {
  fileName: string;
  fileSize: number;
  downloadUrl: string;
  onDownload?: () => void;
}

/**
 * 下载卡片组件
 * 显示处理结果并提供下载功能
 */
export function DownloadCard({
  fileName,
  fileSize,
  downloadUrl,
  onDownload,
}: DownloadCardProps) {
  // TODO: 实现下载卡片逻辑
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-600">下载卡片组件: {fileName}</p>
    </div>
  );
}

