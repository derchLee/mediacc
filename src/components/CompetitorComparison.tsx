"use client";

import { CheckCircle2, Info } from "lucide-react";
import type { Locale } from "@/lib/translations";
import { getCompetitorT } from "@/lib/translations/competitor";

interface CompetitorComparisonProps {
  pageType: "image" | "video";
  locale: Locale;
}

export function CompetitorComparison({ pageType, locale }: CompetitorComparisonProps) {
  const t = getCompetitorT(locale);
  const rows = pageType === "image" ? t.imageComparisonRows : t.videoComparisonRows;

  return (
    <section
      className="mt-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
      aria-labelledby="comparison-heading"
    >
      <div className="px-5 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10">
        <h2
          id="comparison-heading"
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100"
        >
          {t.comparisonTitle}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          {t.comparisonSubtitle}
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <th scope="col" className="px-5 py-3 font-semibold w-[18%]">
                {t.tableFeature}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-semibold w-[26%] text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/30"
              >
                {t.tableMediaCC}
              </th>
              <th scope="col" className="px-5 py-3 font-semibold w-[26%]">
                {t.tableCloudTools}
              </th>
              <th scope="col" className="px-5 py-3 font-semibold w-[30%]">
                {t.tableRecommendation}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/50 dark:bg-gray-900/20"}
              >
                <th
                  scope="row"
                  className="px-5 py-3.5 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {row.feature}
                </th>
                <td className="px-5 py-3.5 text-gray-800 dark:text-gray-200 bg-blue-50/30 dark:bg-blue-950/10 border-l-2 border-blue-400 dark:border-blue-600">
                  {row.mediaCC}
                </td>
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400">{row.cloudTools}</td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300">{row.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {rows.map((row) => (
          <div key={row.feature} className="p-4 space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{row.feature}</h3>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 px-3 py-2 border-l-2 border-blue-400">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                {t.tableMediaCC}
              </span>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{row.mediaCC}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t.tableCloudTools}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{row.cloudTools}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t.tableRecommendation}
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{row.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* When to use summary */}
      <div className="grid sm:grid-cols-2 gap-4 p-5 sm:p-6 bg-gray-50/80 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-700">
        <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-green-800 dark:text-green-300 mb-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            {t.useMediaCCTitle}
          </h3>
          <ul className="space-y-1.5 text-sm text-green-900/90 dark:text-green-200/90">
            {t.useMediaCCList.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-500 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300 mb-3">
            <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
            {t.useOthersTitle}
          </h3>
          <ul className="space-y-1.5 text-sm text-amber-900/90 dark:text-amber-200/90">
            {t.useOthersList.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
