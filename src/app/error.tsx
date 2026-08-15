"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiT } from "@/lib/translations";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 全局错误边界组件
 * 捕获并显示应用错误
 */
export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();
  const t = getUiT(getLocaleFromPathname(pathname));
  console.error("[Application error]", error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t.unexpectedError}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.unexpectedError}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t.retry}
        </button>
      </div>
    </div>
  );
}

