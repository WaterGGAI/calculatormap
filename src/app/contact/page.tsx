import type { Metadata } from "next";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export function buildContactMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/contact";

  return {
    title: messages.nav.contact,
    description: messages.staticPages.contactDescription,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildContactMetadata();

export function renderContactPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">{messages.staticPages.contactTitle}</h1>
        <p className="mt-5 leading-7 text-[var(--ink-muted)]">{messages.staticPages.contactDescription}</p>
      </section>
    </PublicFrame>
  );
}

export default function ContactPage() {
  return renderContactPage();
}
