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
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{heading}</h2>
      <div className="flex flex-wrap gap-3">
        {conversions.map((conversion) => (
          <Link
            key={conversion.slug}
            href={getConversionPath(locale, kind, conversion.slug)}
            className="rounded-full border border-[#b8d9e8] bg-[#edf7fb] px-4 py-2 text-sm font-bold text-[#176b9a] transition-all hover:-translate-y-0.5 hover:border-[#1976a8] hover:bg-white hover:shadow-sm dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
          >
            {getConversionTitle(locale, conversion)}
          </Link>
        ))}
      </div>
    </section>
  );
}
