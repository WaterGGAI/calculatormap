import type { Metadata } from "next";
import { ClusterCard } from "@/components/content/cluster-card";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { seoClusters } from "@/lib/editorial-content";
import { absoluteUrl } from "@/lib/seo";

export function buildClustersMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/clusters";

  return {
    title: messages.clustersPage.title,
    description: messages.clustersPage.description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildClustersMetadata();

export function renderClustersPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">{messages.clustersPage.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold">{messages.clustersPage.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ink-muted)]">
          {messages.clustersPage.description}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {seoClusters.map((cluster) => (
            <ClusterCard cluster={cluster} key={cluster.slug} locale={locale} />
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}

export default function ClustersPage() {
  return renderClustersPage();
}
