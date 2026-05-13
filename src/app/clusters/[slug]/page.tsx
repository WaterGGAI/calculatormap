import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/content/article-card";
import { ClusterCard } from "@/components/content/cluster-card";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { PublicFrame } from "@/components/site/public-frame";
import { ButtonLink } from "@/components/ui/button";
import { getArticlesForCluster, getSeoCluster, seoClusters } from "@/lib/editorial-content";
import { getCalculator } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
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
  const firstCalculator = calculators[0];
  const articles = getArticlesForCluster(rawCluster.slug);
  const jsonLd = collectionPageSchema(`${cluster.name} ${messages.categoryPage.titleSuffix}`, cluster.description, `/clusters/${cluster.slug}`, locale);
  const labels =
    locale === "zh-TW"
      ? {
          start: "先開核心工具",
          tools: "工具",
          guides: "指南",
          usePath: "使用路徑",
          next: "下一步",
          supporting: "背景指南",
          other: "其他路徑"
        }
      : {
          start: "Open the core tool",
          tools: "tools",
          guides: "guides",
          usePath: "Use path",
          next: "Next step",
          supporting: "Background guides",
          other: "Other routes"
        };

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-[#cfd8d2] bg-[#f4f8f5] p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(17rem,0.34fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{cluster.priority}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{cluster.name}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">{cluster.description}</p>
              {firstCalculator ? (
                <div className="mt-6">
                  <ButtonLink href={localizeHref(locale, `/calculator/${firstCalculator.slug}`)}>
                    {labels.start}: {firstCalculator.name}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
            <div className="rounded-md border border-[#d8dfda] bg-white/78 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-3xl font-bold tracking-tight">{calculators.length}</p>
                  <p className="text-sm text-[var(--ink-muted)]">{labels.tools}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight">{articles.length}</p>
                  <p className="text-sm text-[var(--ink-muted)]">{labels.guides}</p>
                </div>
              </div>
              <div className="mt-4 border-t border-[var(--line)] pt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">{labels.usePath}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink)]">{rawCluster.goal}</p>
              </div>
            </div>
          </div>
        </div>

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
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
              <h2 className="text-2xl font-bold tracking-tight">{messages.clusterPage.coreCalculators}</h2>
              <p className="text-sm text-[var(--ink-muted)]">{labels.next}</p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {calculators.map((calculator) => (
                <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
              ))}
            </div>
          </div>
        ) : null}

        {articles.length > 0 ? (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
              <h2 className="text-2xl font-bold tracking-tight">{messages.clusterPage.supportingGuides}</h2>
              <p className="text-sm text-[var(--ink-muted)]">{labels.supporting}</p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard article={article} key={article.slug} locale={locale} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
            <h2 className="text-2xl font-bold tracking-tight">{messages.clusterPage.otherClusters}</h2>
            <p className="text-sm text-[var(--ink-muted)]">{labels.other}</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
