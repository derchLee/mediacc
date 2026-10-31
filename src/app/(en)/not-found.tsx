"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiT } from "@/lib/translations";

/**
 * 404 页面
 */
export default function NotFound() {
  const pathname = usePathname();
  const t = getUiT(getLocaleFromPathname(pathname));
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t.pageNotFound}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t.pageNotFoundDesc}
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}

