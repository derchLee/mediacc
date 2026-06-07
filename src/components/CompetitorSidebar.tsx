"use client";

import { ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/translations";
import { getCompetitorT, getCategoryLabel } from "@/lib/translations/competitor";
import {
  getImagePageCategories,
  getVideoPageCategories,
  type CompetitorCategory,
} from "@/lib/competitor-tools";

interface CompetitorSidebarProps {
  pageType: "image" | "video";
  locale: Locale;
}

export function CompetitorSidebar({ pageType, locale }: CompetitorSidebarProps) {
  const t = getCompetitorT(locale);
  const categories: CompetitorCategory[] =
    pageType === "image" ? getImagePageCategories() : getVideoPageCategories();

  return (
    <aside
      className="lg:sticky lg:top-4 space-y-4"
      aria-label={t.sidebarTitle}
    >
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/30 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {t.sidebarTitle}
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.sidebarNote}
          </p>
        </div>

        <nav className="p-3 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2 px-1">
                {getCategoryLabel(t, category.id)}
              </h3>
              <ul className="space-y-0.5">
                {category.tools.map((tool) => (
                  <li key={`${category.id}-${tool.name}`}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      title={t.externalLink}
                    >
                      <span className="truncate font-medium">{tool.name}</span>
                      <ExternalLink
                        className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
