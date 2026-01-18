"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 全局错误边界组件
 * 捕获并显示应用错误
 */
export default function Error({ error, reset }: ErrorProps) {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">出现了错误</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || "发生了未知错误"}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    </div>
  );
}

