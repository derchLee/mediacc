"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Image as ImageIcon, Video, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileType } from "@/types";
import {
  getLocaleFromPathname,
  getCommonT,
  getImagePath,
  getVideoPath,
  LOCALES,
  localeLabels,
  type Locale,
} from "@/lib/translations";
import { getConversionFromPathname, getConversionPath } from "@/lib/seo/conversions";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout: tabs, language switcher, footer.
 * Locale and labels derived from pathname (static multi-directory i18n).
 */
export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const commonT = getCommonT(locale);

  const activeTab: FileType = pathname?.includes("/video") ? "video" : "image";

  const isVideoPage = pathname?.includes("/video");
  const currentConversion = getConversionFromPathname(pathname);
  const currentPagePathForLocale = (l: Locale) => {
    if (currentConversion) {
      return getConversionPath(l, currentConversion.kind, currentConversion.slug);
    }
    return isVideoPage ? getVideoPath(l) : getImagePath(l);
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef]/90 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
        {/* Header: logo + language switcher */}
        <div className="mb-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href={locale === "en" ? "/" : `/${locale}`}
            className="group flex items-center gap-3 text-3xl font-black tracking-tight text-[#17324d] transition-colors hover:text-[#1976a8] dark:text-white"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1976a8] text-lg font-black text-white shadow-[0_8px_20px_rgba(25,118,168,.25)] transition-transform group-hover:-rotate-3">M</span>
            <span>MediaCC</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1.5 text-sm shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
            <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={currentPagePathForLocale(l)}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  l === locale
                    ? "bg-[#1976a8] font-semibold text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#1976a8] dark:text-slate-300 dark:hover:bg-slate-800"
                )}
                aria-current={l === locale ? "true" : undefined}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_12px_35px_rgba(23,50,77,.08)] dark:border-slate-700 dark:bg-slate-900/90">
          <div className="flex bg-slate-50/80 p-1.5 dark:bg-slate-900">
            <Link
              href={getImagePath(locale)}
              prefetch
              className={cn(
                "flex flex-1 items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold transition-all",
                "hover:bg-white dark:hover:bg-slate-800",
                activeTab === "image"
                  ? "bg-white text-[#1976a8] shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <ImageIcon className="w-5 h-5 mr-2" aria-hidden="true" />
              {commonT.tabImage}
            </Link>
            <Link
              href={getVideoPath(locale)}
              prefetch
              className={cn(
                "flex-1 flex items-center justify-center px-6 py-4 font-medium text-sm transition-colors",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                activeTab === "video"
                  ? "bg-white text-[#1976a8] shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <Video className="w-5 h-5 mr-2" aria-hidden="true" />
              {commonT.tabVideo}
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900">
            {children}
          </div>
        </div>

        {/* Follow Us */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{commonT.followUs}</h3>
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
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {commonT.privacyPolicy}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {commonT.termsOfService}
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {commonT.cookiePolicy}
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {commonT.disclaimer}
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
            © {new Date().getFullYear()} MediaCC. {commonT.allRightsReserved}
          </p>
        </footer>
      </div>
    </main>
  );
}
