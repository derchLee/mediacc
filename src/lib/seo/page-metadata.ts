import { LOCALES } from "@/lib/translations/types";

// Content dates are editorial dates, never deployment dates.
export function getContentDate(path: string): string {
  if (path === "/") return "2026-10-31";
  const page = path.replace(/^\/(ja|es|pt)(?=\/)/, "");
  if (page === "/image") return "2026-10-31";
  if (page === "/video") return "2026-10-17";
  return "2026-10-17";
}

export function getLanguageAlternates(baseUrl: string, path: string): Record<string, string> {
  return Object.fromEntries([
    ["x-default", `${baseUrl}${path}`],
    ...LOCALES.map(locale => [locale, `${baseUrl}${locale === "en" ? "" : `/${locale}`}${path}`]),
  ]);
}
