import type { Metadata } from "next";
import { ArticleCard } from "@/components/content/article-card";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { PublicFrame } from "@/components/site/public-frame";
import { ButtonLink } from "@/components/ui/button";
import { seoArticles } from "@/lib/editorial-content";
import { categories, getCalculatorsByCategory, getCategory } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCalculator, localizeCategory } from "@/lib/localized-content";
import { absoluteUrl, collectionPageSchema, itemListSchema } from "@/lib/seo";

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
  const firstCalculator = categoryCalculators[0];
  const categoryArticles = seoArticles.filter((article) =>
    categoryCalculators.some(
      (calculator) =>
        article.relatedCalculatorSlug === calculator.slug || article.relatedCalculatorSlugs.includes(calculator.slug)
    )
  );
  const jsonLd = [
    collectionPageSchema(`${category.name} ${messages.categoryPage.titleSuffix}`, category.seoDescription, `/category/${category.slug}`, locale),
    itemListSchema(
      `${category.name} ${messages.categoryPage.titleSuffix}`,
      category.description,
      categoryCalculators.map((calculator) => {
        const localizedCalculator = localizeCalculator(calculator, locale);

        return {
          name: localizedCalculator.name,
          description: localizedCalculator.shortDescription,
          url: absoluteUrl(`/calculator/${calculator.slug}`, locale)
        };
      }),
      locale
    )
  ];
  const labels =
    locale === "zh-TW"
      ? {
          tools: "工具",
          guides: "指南",
          start: "先用這個",
          path: "建議路徑",
          pathItems: ["先開一個計算器", "代入真實數字", "需要背景時再讀指南"],
          calculatorRail: "此分類工具",
          guideRail: "延伸閱讀"
        }
      : {
          tools: "Tools",
          guides: "Guides",
          start: "Start here",
          path: "Suggested path",
          pathItems: ["Open one calculator", "Use realistic numbers", "Read a guide only when context matters"],
          calculatorRail: "Category tools",
          guideRail: "Guide rail"
        };

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-[#cfd8d2] bg-[#f4f8f5] p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(17rem,0.32fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{messages.common.category}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {category.name} {messages.categoryPage.titleSuffix}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">{category.description}</p>
              {firstCalculator ? (
                <div className="mt-6">
                  <ButtonLink href={localizeHref(locale, `/calculator/${firstCalculator.slug}`)}>
                    {labels.start}: {firstCalculator.name}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
            <div className="grid gap-3 rounded-md border border-[#d8dfda] bg-white/78 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-3xl font-bold tracking-tight">{categoryCalculators.length}</p>
                  <p className="text-sm text-[var(--ink-muted)]">{labels.tools}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight">{categoryArticles.length}</p>
                  <p className="text-sm text-[var(--ink-muted)]">{labels.guides}</p>
                </div>
              </div>
              <div className="border-t border-[var(--line)] pt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">{labels.path}</p>
                <div className="mt-2 grid gap-2">
                  {labels.pathItems.map((item, index) => (
                    <p className="text-sm leading-6 text-[var(--ink)]" key={item}>
                      <span className="mr-2 font-bold text-[var(--accent)]">0{index + 1}</span>{item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
          <h2 className="text-2xl font-bold tracking-tight">{labels.calculatorRail}</h2>
          <p className="text-sm text-[var(--ink-muted)]">{categoryCalculators.length} {labels.tools}</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categoryCalculators.map((calculator) => (
            <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
          ))}
        </div>
        {categoryArticles.length > 0 ? (
          <div className="mt-12">
            <div className="flex flex-col justify-between gap-3 border-b border-[var(--line)] pb-3 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{labels.guideRail}</p>
                <h2 className="mt-2 text-2xl font-bold">{messages.common.relatedGuides}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">
                {messages.categoryPage.relatedGuidesDescription}
              </p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categoryArticles.slice(0, 3).map((article) => (
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
