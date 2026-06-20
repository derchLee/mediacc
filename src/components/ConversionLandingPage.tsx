import Link from "next/link";
import { MainLayout } from "@/components/MainLayout";
import { MediaPageShell } from "@/components/MediaPageShell";
import type { Locale } from "@/lib/translations";
import {
  buildConversionJsonLd,
  getConversionCopy,
  getConversionFaq,
  getConversionHowTo,
  getConversionPath,
  getConversionTitle,
  getKindLabel,
  getRelatedConversions,
  getToolPath,
  interpolate,
  type ConversionDefinition,
} from "@/lib/seo/conversions";

interface ConversionLandingPageProps {
  locale: Locale;
  conversion: ConversionDefinition;
}

function JsonLdScript({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ConversionLandingPage({ locale, conversion }: ConversionLandingPageProps) {
  const copy = getConversionCopy(locale);
  const kindLabel = getKindLabel(locale, conversion.kind);
  const title = getConversionTitle(locale, conversion);
  const intro = interpolate(copy.intro, conversion, kindLabel);
  const howTo = getConversionHowTo(locale, conversion);
  const faq = getConversionFaq(locale, conversion);
  const related = getRelatedConversions(conversion);
  const jsonLd = buildConversionJsonLd(locale, conversion);
  const toolPath = getToolPath(locale, conversion.kind);

  return (
    <>
      <JsonLdScript id="conversion-breadcrumb-schema" data={jsonLd.breadcrumb} />
      <JsonLdScript id="conversion-software-schema" data={jsonLd.software} />
      <JsonLdScript id="conversion-howto-schema" data={jsonLd.howTo} />
      <JsonLdScript id="conversion-faq-schema" data={jsonLd.faq} />

      <MainLayout>
        <MediaPageShell pageType={conversion.kind} locale={locale}>
          <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={toolPath} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {conversion.kind === "image" ? copy.backToImage : copy.backToVideo}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 dark:text-gray-100" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
              MediaCC {copy.privateBrowserTool}
            </p>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">{intro}</p>
            <div className="mt-6">
              <Link
                href={toolPath}
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {interpolate(copy.cta, conversion, kindLabel)}
              </Link>
            </div>
          </header>

          <section className="mb-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{howTo.name}</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
              {howTo.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{copy.capabilityHeading}</h2>
              <p className="text-gray-700 dark:text-gray-300">{copy.capability}</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{copy.limitsHeading}</h2>
              <p className="text-gray-700 dark:text-gray-300">{copy.limits}</p>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mb-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{copy.relatedHeading}</h2>
              <div className="flex flex-wrap gap-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={getConversionPath(locale, item.kind, item.slug)}
                    className="rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    {getConversionTitle(locale, item)}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{copy.faqHeading}</h2>
            <div className="space-y-5">
              {faq.map((item) => (
                <div key={item.name}>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        </MediaPageShell>
      </MainLayout>
    </>
  );
}
