"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileType } from "@/types";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * 主布局组件
 * 包含 Tab 切换和通用布局
 */
export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // 根据路径确定当前活跃的 Tab
  const getActiveTab = useCallback((): FileType => {
    if (pathname?.includes("/video")) {
      return "video";
    }
    return "image";
  }, [pathname]);

  const [activeTab, setActiveTab] = useState<FileType>(getActiveTab());

  // 当路径改变时，同步更新 Tab
  useEffect(() => {
    const newTab = getActiveTab();
    setActiveTab(newTab);
  }, [pathname, getActiveTab]);

  const handleTabChange = (tab: FileType) => {
    setActiveTab(tab);
    if (tab === "image") {
      router.push("/image");
    } else {
      router.push("/video");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            MediaCC
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Local Media Conversion & Compression Tool
          </p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            100% Local Processing
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleTabChange("image")}
              className={cn(
                "flex-1 flex items-center justify-center px-6 py-4 font-medium text-sm transition-colors",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                activeTab === "image"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              <ImageIcon className="w-5 h-5 mr-2" aria-hidden="true" />
              Image Processing
            </button>
            <button
              onClick={() => handleTabChange("video")}
              className={cn(
                "flex-1 flex items-center justify-center px-6 py-4 font-medium text-sm transition-colors",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                activeTab === "video"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              <Video className="w-5 h-5 mr-2" aria-hidden="true" />
              Video Processing
            </button>
          </div>

          {/* Tab 内容区域 */}
          <div className="bg-white dark:bg-gray-800">
            {children}
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Follow us at:</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://discord.gg/MTZ5n96p9D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord
            </a>
            <a
              href="https://www.facebook.com/share/g/1CyxULwcHZ/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span>•</span>
            <Link
              href="/cookies"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
            © {new Date().getFullYear()} MediaCC. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
