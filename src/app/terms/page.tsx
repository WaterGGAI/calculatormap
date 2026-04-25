import type { Metadata } from "next";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export function buildTermsMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/terms";

  return {
    title: messages.nav.terms,
    description: messages.staticPages.termsDescription,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildTermsMetadata();

export function renderTermsPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">{messages.staticPages.termsTitle}</h1>
        <p className="mt-5 leading-7 text-[var(--ink-muted)]">{messages.staticPages.termsDescription}</p>
      </section>
    </PublicFrame>
  );
}

export default function TermsPage() {
  return renderTermsPage();
}
