import type { Metadata } from "next";
import { ArticleCard } from "@/components/content/article-card";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { seoArticles } from "@/lib/editorial-content";
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

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">{messages.articlesPage.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold">{messages.articlesPage.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ink-muted)]">
          {messages.articlesPage.description}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {seoArticles.map((article) => (
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
