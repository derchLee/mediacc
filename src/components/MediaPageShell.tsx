"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/translations";
import { CompetitorSidebar } from "@/components/CompetitorSidebar";

interface MediaPageShellProps {
  pageType: "image" | "video";
  locale: Locale;
  children: ReactNode;
}

/**
 * Two-column layout: competitor sidebar (left) + main content (right).
 * Sidebar collapses above content on mobile.
 */
export function MediaPageShell({ pageType, locale, children }: MediaPageShellProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 sm:p-6">
      <div className="w-full lg:w-56 xl:w-64 shrink-0 order-2 lg:order-1">
        <CompetitorSidebar pageType={pageType} locale={locale} />
      </div>
      <div className="flex-1 min-w-0 order-1 lg:order-2">{children}</div>
    </div>
  );
}
