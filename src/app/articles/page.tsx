import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/content/article-card";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { getSeoCluster, seoArticles } from "@/lib/editorial-content";
import { localizeArticle, localizeCluster } from "@/lib/localized-content";
import { absoluteUrl } from "@/lib/seo";

export function buildArticlesMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/articles";

  return {
    title: messages.articlesPage.title,
    description: messages.articlesPage.description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildArticlesMetadata();

export function renderArticlesPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);
  const featured = seoArticles[0];
  const featuredArticle = featured ? localizeArticle(featured, locale) : null;
  const featuredCluster = featured ? getSeoCluster(featured.clusterSlug) : null;
  const localizedFeaturedCluster = featuredCluster ? localizeCluster(featuredCluster, locale) : null;
  const labels =
    locale === "zh-TW"
      ? {
          count: "指南",
          featured: "先讀這篇",
          library: "指南庫",
          cluster: "所屬路徑",
          action: "開啟指南"
        }
      : {
          count: "guides",
          featured: "Start with this",
          library: "Guide library",
          cluster: "Route",
          action: "Open guide"
        };

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-[var(--line)] pb-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(15rem,0.26fr)] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{messages.articlesPage.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{messages.articlesPage.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">
              {messages.articlesPage.description}
            </p>
          </div>
          <div className="rounded-md border border-[#cfd8d2] bg-[#f4f8f5] p-4">
            <p className="text-4xl font-bold tracking-tight">{seoArticles.length}</p>
            <p className="text-sm text-[var(--ink-muted)]">{labels.count}</p>
          </div>
        </div>

        {featured && featuredArticle ? (
          <Link
            className="mt-8 grid gap-5 rounded-md border border-[#cfd8d2] bg-[#f4f8f5] p-5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-[var(--accent)] md:grid-cols-[minmax(0,0.72fr)_minmax(14rem,0.28fr)] md:p-6"
            href={localizeHref(locale, `/articles/${featured.slug}`)}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{labels.featured}</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight">{featuredArticle.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">{featuredArticle.metaDescription}</p>
            </div>
            <div className="rounded-md border border-[#d8dfda] bg-white/78 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">{labels.cluster}</p>
              <p className="mt-2 text-lg font-bold">{localizedFeaturedCluster?.name ?? featuredArticle.contentType}</p>
              <p className="mt-4 text-sm font-bold text-[var(--accent)]">{labels.action}</p>
            </div>
          </Link>
        ) : null}

        <div className="mt-10 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
          <h2 className="text-2xl font-bold tracking-tight">{labels.library}</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {seoArticles.slice(1).map((article) => (
            <ArticleCard article={article} key={article.slug} locale={locale} />
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}

export default function ArticlesPage() {
  return renderArticlesPage();
}
