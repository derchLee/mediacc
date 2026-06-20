import Link from "next/link";
import type { Locale } from "@/lib/translations";
import {
  getConversionCopy,
  getConversionPath,
  getConversionTitle,
  getPopularConversions,
  type MediaKind,
} from "@/lib/seo/conversions";

interface PopularConversionsProps {
  kind: MediaKind;
  locale: Locale;
}

export function PopularConversions({ kind, locale }: PopularConversionsProps) {
  const copy = getConversionCopy(locale);
  const conversions = getPopularConversions(kind);
  const heading = kind === "image" ? copy.popularImageHeading : copy.popularVideoHeading;

  return (
    <section className="mb-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{heading}</h2>
      <div className="flex flex-wrap gap-3">
        {conversions.map((conversion) => (
          <Link
            key={conversion.slug}
            href={getConversionPath(locale, kind, conversion.slug)}
            className="rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
          >
            {getConversionTitle(locale, conversion)}
          </Link>
        ))}
      </div>
    </section>
  );
}
