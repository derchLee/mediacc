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
    <div className="flex flex-col gap-8 p-5 sm:p-8 lg:flex-row lg:p-10">
      <div className="order-2 w-full shrink-0 lg:w-56 xl:w-64">
        <CompetitorSidebar pageType={pageType} locale={locale} />
      </div>
      <div className="order-1 min-w-0 flex-1">{children}</div>
    </div>
  );
}
