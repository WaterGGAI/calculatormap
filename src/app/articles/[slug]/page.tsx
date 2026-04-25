import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/content/article-card";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { PublicFrame } from "@/components/site/public-frame";
import { ButtonLink } from "@/components/ui/button";
import { getSeoArticle, getSeoCluster, getArticlesForCluster, seoArticles } from "@/lib/editorial-content";
import { getCalculator } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeArticle, localizeCalculator, localizeCluster } from "@/lib/localized-content";
import { absoluteUrl, articleSchema, faqSchemaFromItems } from "@/lib/seo";

export function generateStaticParams() {
  return seoArticles.map((article) => ({ slug: article.slug }));
}

export function buildArticleMetadata(slug: string, locale: AppLocale = defaultLocale): Metadata {
  const rawArticle = getSeoArticle(slug);
  if (!rawArticle) {
    return {};
  }

  const article = localizeArticle(rawArticle, locale);
  const path = `/articles/${article.slug}`;

  return {
    title: {
      absolute: article.metaTitle
    },
    description: article.metaDescription,
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

  return buildArticleMetadata(slug);
}

export function renderArticlePage(slug: string, locale: AppLocale = defaultLocale) {
  const rawArticle = getSeoArticle(slug);
  if (!rawArticle) {
    notFound();
  }

  const messages = getLocaleMessages(locale);
  const article = localizeArticle(rawArticle, locale);
  const rawCluster = getSeoCluster(rawArticle.clusterSlug);
  const cluster = rawCluster ? localizeCluster(rawCluster, locale) : undefined;
  const rawPrimaryCalculator = getCalculator(rawArticle.relatedCalculatorSlug);
  const primaryCalculator = rawPrimaryCalculator ? localizeCalculator(rawPrimaryCalculator, locale) : undefined;
  const relatedCalculators = rawArticle.relatedCalculatorSlugs
    .map((calculatorSlug) => getCalculator(calculatorSlug))
    .filter((calculator): calculator is NonNullable<typeof calculator> => Boolean(calculator));
  const relatedArticles = getArticlesForCluster(rawArticle.clusterSlug).filter((item) => item.slug !== rawArticle.slug).slice(0, 3);
  const jsonLd = [articleSchema(article, locale), faqSchemaFromItems(article.faqs)];

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {cluster ? (
            <Link className="rounded-md bg-[var(--surface-muted)] px-3 py-2 text-sm font-semibold text-[var(--accent)]" href={localizeHref(locale, `/clusters/${cluster.slug}`)}>
              {cluster.name}
            </Link>
          ) : null}
          <span className="text-sm text-[var(--ink-muted)]">{messages.common.updated} {article.updatedAt}</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-tight">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ink-muted)]">{article.intro}</p>

        <section className="mt-8 rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--accent)]">{messages.articlePage.primaryCalculator}</p>
              <h2 className="mt-2 text-2xl font-bold">{primaryCalculator?.name ?? messages.common.standaloneUtility}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">
                {messages.articlePage.primaryCalculatorDescription}
              </p>
            </div>
            {primaryCalculator ? <ButtonLink href={localizeHref(locale, `/calculator/${primaryCalculator.slug}`)}>{messages.actions.openCalculator}</ButtonLink> : null}
          </div>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="grid gap-8">
            {article.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <h2 className="text-2xl font-bold">{section.heading}</h2>
                <div className="mt-3 grid gap-4 text-[var(--ink-muted)]">
                  {section.body.map((paragraph) => (
                    <p className="leading-7" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <aside className="h-fit rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold text-[var(--accent)]">{messages.articlePage.onThisPage}</p>
            <div className="mt-4 grid gap-3">
              {article.outline.map((heading, index) => (
                <Link className="text-sm font-semibold text-[var(--ink-muted)] hover:text-[var(--accent)]" href={`#section-${index + 1}`} key={heading}>
                  {heading}
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">{messages.articlePage.faq}</h2>
          <div className="mt-4 grid gap-3">
            {article.faqs.map((faq) => (
              <details className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-4" key={faq.question}>
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-3 leading-7 text-[var(--ink-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedCalculators.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold">{messages.common.relatedCalculators}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedCalculators.slice(0, 6).map((calculator) => (
                <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}

        {relatedArticles.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold">{messages.common.relatedGuides}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard article={relatedArticle} key={relatedArticle.slug} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </PublicFrame>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return renderArticlePage(slug);
}
