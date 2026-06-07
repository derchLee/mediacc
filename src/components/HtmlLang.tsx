"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/translations/types";

/**
 * Set <html lang> on the client to match the current locale.
 *
 * Root layout statically renders <html lang="en"> (App Router requires <html> to live
 * in the root layout — child layouts cannot override it). For non-en routes that means
 * the rendered tag mismatches the page language, which Lighthouse flags and search
 * engines may use as a hreflang signal. This component patches the attribute after
 * mount so per-locale layouts can opt in with one line.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document !== "undefined" && document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
