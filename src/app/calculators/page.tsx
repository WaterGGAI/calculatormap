import type { Metadata } from "next";
import { CalculatorDirectory } from "@/components/calculators/calculator-directory";
import { PublicFrame } from "@/components/site/public-frame";
import { calculators } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { localizeCalculator } from "@/lib/localized-content";
import { absoluteUrl, itemListSchema } from "@/lib/seo";

export type CalculatorDirectorySearchParams = {
  query?: string | string[];
  q?: string | string[];
};

export function getCalculatorDirectoryQuery(searchParams?: CalculatorDirectorySearchParams) {
  const rawQuery = searchParams?.query ?? searchParams?.q ?? "";
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;

  return typeof query === "string" ? query.trim().slice(0, 80) : "";
}

export function buildCalculatorsMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/calculators";

  return {
    title: messages.calculatorsPage.title,
    description: messages.calculatorsPage.description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildCalculatorsMetadata();

export function renderCalculatorsPage(locale: AppLocale = defaultLocale, initialQuery = "") {
  const messages = getLocaleMessages(locale);
  const eyebrow = locale === "zh-TW" ? "工具地圖" : "Tool map";
  const prompt =
    locale === "zh-TW"
      ? "先搜尋，再選分類。少讀一點，快一點找到能用的工具。"
      : "Search first, filter second. Less scanning, faster calculating.";
  const jsonLd = itemListSchema(
    messages.calculatorsPage.title,
    messages.calculatorsPage.description,
    calculators.map((calculator) => {
      const localizedCalculator = localizeCalculator(calculator, locale);

      return {
        name: localizedCalculator.name,
        description: localizedCalculator.shortDescription,
        url: absoluteUrl(`/calculator/${calculator.slug}`, locale)
      };
    }),
    locale
  );

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 border-b border-[var(--line)] pb-7 lg:grid-cols-[minmax(0,0.84fr)_minmax(16rem,0.34fr)] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{messages.calculatorsPage.title}</h1>
          </div>
          <p className="text-sm leading-6 text-[var(--ink-muted)]">{prompt}</p>
        </div>
        <CalculatorDirectory calculators={calculators} initialQuery={initialQuery} locale={locale} />
      </section>
    </PublicFrame>
  );
}

export default async function CalculatorsPage({
  searchParams
}: {
  searchParams?: Promise<CalculatorDirectorySearchParams>;
}) {
  return renderCalculatorsPage(defaultLocale, getCalculatorDirectoryQuery(await searchParams));
}
