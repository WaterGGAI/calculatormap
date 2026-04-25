import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/content/article-card";
import { ClusterCard } from "@/components/content/cluster-card";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { PublicFrame } from "@/components/site/public-frame";
import { getArticlesForCluster, getSeoCluster, seoClusters } from "@/lib/editorial-content";
import { getCalculator } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { localizeCluster } from "@/lib/localized-content";
import { absoluteUrl, collectionPageSchema } from "@/lib/seo";

export function generateStaticParams() {
  return seoClusters.map((cluster) => ({ slug: cluster.slug }));
}

export function buildClusterMetadata(slug: string, locale: AppLocale = defaultLocale): Metadata {
  const rawCluster = getSeoCluster(slug);
  if (!rawCluster) {
    return {};
  }

  const messages = getLocaleMessages(locale);
  const cluster = localizeCluster(rawCluster, locale);
  const path = `/clusters/${cluster.slug}`;

  return {
    title: `${cluster.name} ${messages.categoryPage.titleSuffix}`,
    description: cluster.description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  return buildClusterMetadata(slug);
}

export function renderClusterPage(slug: string, locale: AppLocale = defaultLocale) {
  const rawCluster = getSeoCluster(slug);
  if (!rawCluster) {
    notFound();
  }

  const messages = getLocaleMessages(locale);
  const cluster = localizeCluster(rawCluster, locale);
  const calculators = rawCluster.coreCalculatorSlugs
    .map((calculatorSlug) => getCalculator(calculatorSlug))
    .filter((calculator): calculator is NonNullable<typeof calculator> => Boolean(calculator));
  const articles = getArticlesForCluster(rawCluster.slug);
  const jsonLd = collectionPageSchema(`${cluster.name} ${messages.categoryPage.titleSuffix}`, cluster.description, `/clusters/${cluster.slug}`, locale);

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">{cluster.priority}</p>
        <h1 className="mt-3 text-4xl font-bold">{cluster.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ink-muted)]">{cluster.description}</p>

        <div className="mt-8 rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-bold">{messages.clusterPage.bestUseCases}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {cluster.useCases.map((useCase) => (
              <div className="rounded-md bg-[var(--surface-muted)] p-4 text-sm leading-6 text-[var(--ink-muted)]" key={useCase}>
                {useCase}
              </div>
            ))}
          </div>
        </div>

        {calculators.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl font-bold">{messages.clusterPage.coreCalculators}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {calculators.map((calculator) => (
                <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
              ))}
            </div>
          </div>
        ) : null}

        {articles.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl font-bold">{messages.clusterPage.supportingGuides}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard article={article} key={article.slug} locale={locale} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12">
          <h2 className="text-2xl font-bold">{messages.clusterPage.otherClusters}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {seoClusters.filter((item) => item.slug !== cluster.slug).slice(0, 3).map((otherCluster) => (
              <ClusterCard cluster={otherCluster} key={otherCluster.slug} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </PublicFrame>
  );
}

export default async function ClusterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return renderClusterPage(slug);
}
