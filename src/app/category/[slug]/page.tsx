import type { Metadata } from "next";
import { ArticleCard } from "@/components/content/article-card";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { PublicFrame } from "@/components/site/public-frame";
import { seoArticles } from "@/lib/editorial-content";
import { categories, getCalculatorsByCategory, getCategory } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { localizeCategory } from "@/lib/localized-content";
import { absoluteUrl, collectionPageSchema } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function buildCategoryMetadata(slug: string, locale: AppLocale = defaultLocale): Metadata {
  const rawCategory = getCategory(slug);
  if (!rawCategory) {
    return {};
  }

  const category = localizeCategory(rawCategory, locale);
  const path = `/category/${category.slug}`;

  return {
    title: category.seoTitle,
    description: category.seoDescription,
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

  return buildCategoryMetadata(slug);
}

export function renderCategoryPage(slug: string, locale: AppLocale = defaultLocale) {
  const rawCategory = getCategory(slug);

  if (!rawCategory) {
    notFound();
  }

  const messages = getLocaleMessages(locale);
  const category = localizeCategory(rawCategory, locale);
  const categoryCalculators = getCalculatorsByCategory(rawCategory.id);
  const categoryArticles = seoArticles.filter((article) =>
    categoryCalculators.some(
      (calculator) =>
        article.relatedCalculatorSlug === calculator.slug || article.relatedCalculatorSlugs.includes(calculator.slug)
    )
  );
  const jsonLd = collectionPageSchema(`${category.name} ${messages.categoryPage.titleSuffix}`, category.seoDescription, `/category/${category.slug}`, locale);

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">{messages.common.category}</p>
        <h1 className="mt-3 text-4xl font-bold">{category.name} {messages.categoryPage.titleSuffix}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ink-muted)]">{category.description}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categoryCalculators.map((calculator) => (
            <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
          ))}
        </div>
        {categoryArticles.length > 0 ? (
          <div className="mt-12">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">{messages.common.relatedGuides}</h2>
              <p className="max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">
                {messages.categoryPage.relatedGuidesDescription}
              </p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categoryArticles.slice(0, 6).map((article) => (
                <ArticleCard article={article} key={article.slug} locale={locale} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </PublicFrame>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return renderCategoryPage(slug);
}
