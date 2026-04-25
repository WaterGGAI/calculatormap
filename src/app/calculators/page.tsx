import type { Metadata } from "next";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { PublicFrame } from "@/components/site/public-frame";
import { calculators } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

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

export function renderCalculatorsPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">{messages.calculatorsPage.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">
          {messages.calculatorsPage.description}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {calculators.map((calculator) => (
            <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}

export default function CalculatorsPage() {
  return renderCalculatorsPage();
}
