import type { Metadata } from "next";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export function buildPrivacyMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/privacy-policy";

  return {
    title: messages.nav.privacyPolicy,
    description: messages.staticPages.privacyDescription,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildPrivacyMetadata();

export function renderPrivacyPolicyPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">{messages.staticPages.privacyTitle}</h1>
        <p className="mt-5 leading-7 text-[var(--ink-muted)]">{messages.staticPages.privacyDescription}</p>
      </section>
    </PublicFrame>
  );
}

export default function PrivacyPolicyPage() {
  return renderPrivacyPolicyPage();
}
