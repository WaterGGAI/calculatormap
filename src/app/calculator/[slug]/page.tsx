import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, hasActiveAdSlot } from "@/components/calculators/ad-slot";
import { CalculatorOverviewPanel, CalculatorSectionHeading } from "@/components/calculators/calculator-overview-panel";
import { CalculatorRenderer } from "@/components/calculators/calculator-renderer";
import { ArticleCard } from "@/components/content/article-card";
import { PublicFrame } from "@/components/site/public-frame";
import { Badge } from "@/components/ui/badge";
import { getMergedCalculatorBySlug } from "@/lib/calculator-content";
import { getArticlesForCalculator } from "@/lib/editorial-content";
import { categories, getCalculator, getRelatedCalculators } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCalculator, localizeCategory } from "@/lib/localized-content";
import { absoluteUrl, calculatorSchema, faqSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getCalculatorForLocale(slug: string, locale: AppLocale) {
  if (locale === defaultLocale) {
    return getMergedCalculatorBySlug(slug);
  }

  return getCalculator(slug);
}

export async function buildCalculatorMetadata(slug: string, locale: AppLocale = defaultLocale): Promise<Metadata> {
  const rawCalculator = await getCalculatorForLocale(slug, locale);

  if (!rawCalculator) {
    return {};
  }

  const calculator = localizeCalculator(rawCalculator, locale);
  const path = rawCalculator.seo.canonical;

  return {
    title: calculator.seo.title,
    description: calculator.seo.description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    },
    robots: calculator.seo.robots
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  return buildCalculatorMetadata(slug);
}

export async function renderCalculatorPage(slug: string, locale: AppLocale = defaultLocale) {
  const rawCalculator = await getCalculatorForLocale(slug, locale);

  if (!rawCalculator) {
    notFound();
  }

  const messages = getLocaleMessages(locale);
  const calculator = localizeCalculator(rawCalculator, locale);
  const rawCategory = categories.find((item) => item.id === rawCalculator.categoryId);
  const category = rawCategory ? localizeCategory(rawCategory, locale) : undefined;
  const related = getRelatedCalculators(rawCalculator).map((item) => localizeCalculator(item, locale));
  const relatedArticles = getArticlesForCalculator(rawCalculator.slug);
  const jsonLd = [calculatorSchema(calculator, category, locale), faqSchema(calculator)];
  const hasLeftSidebar = hasActiveAdSlot("page_left_sidebar");
  const hasRightSidebar = hasActiveAdSlot("page_right_sidebar");
  const articleLayoutClass =
    hasLeftSidebar && hasRightSidebar
      ? "lg:grid lg:grid-cols-[10rem_minmax(0,1fr)_10rem]"
      : hasLeftSidebar || hasRightSidebar
        ? "lg:grid lg:grid-cols-[10rem_minmax(0,1fr)]"
        : "";
  const mainContentClass =
    hasLeftSidebar && hasRightSidebar
      ? "lg:col-start-2"
      : hasLeftSidebar
        ? "lg:col-start-2"
        : "";

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AdSlot slotKey="site_top_banner" />
      <article className={cn("mx-auto max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8", articleLayoutClass)}>
        {hasLeftSidebar ? <AdSlot className="hidden lg:block" slotKey="page_left_sidebar" /> : null}
        <div className={cn("min-w-0", mainContentClass)}>
          <div className="flex flex-wrap items-center gap-3">
            {category ? <Badge>{category.name}</Badge> : null}
            <span className="text-sm text-[var(--ink-muted)]">{messages.common.updated} {calculator.updatedAt}</span>
          </div>
          <h1 className="mt-5 max-w-4xl break-words text-4xl font-bold leading-tight">{calculator.h1}</h1>
          <p className="mt-4 max-w-3xl break-words text-base leading-7 text-[var(--ink-muted)]">{calculator.intro}</p>
          <CalculatorOverviewPanel calculator={calculator} category={category} locale={locale} />

          <div className="mt-8">
            <CalculatorRenderer calculator={calculator} locale={locale} />
          </div>

          <section className="mt-12 grid gap-10">
            <div>
              <CalculatorSectionHeading category={category} code="FX" detail={messages.calculatorPage.formulaExplanationDetail} locale={locale} title={messages.calculatorPage.formulaExplanationTitle} />
              <p className="mt-3 leading-7 text-[var(--ink-muted)]">{calculator.formulaExplanation}</p>
            </div>
            <div>
              <CalculatorSectionHeading category={category} code="USE" detail={messages.calculatorPage.howToUseDetail} locale={locale} title={messages.calculatorPage.howToUseTitle} />
              <ol className="mt-3 grid gap-2 leading-7 text-[var(--ink-muted)]">
                {calculator.howToUse.map((step) => (
                  <li className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-3" key={step}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <AdSlot slotKey="in_content_1" />
            <div>
              <CalculatorSectionHeading category={category} code="EX" detail={messages.calculatorPage.examplesDetail} locale={locale} title={messages.calculatorPage.examplesTitle} />
              <div className="mt-3 grid gap-3">
                {calculator.examples.map((example) => (
                  <p className="rounded-md bg-[var(--surface-muted)] p-4 leading-7" key={example}>
                    {example}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <CalculatorSectionHeading category={category} code="FAQ" detail={messages.calculatorPage.faqDetail} locale={locale} title={messages.calculatorPage.faqTitle} />
              <div className="mt-3 grid gap-3">
                {calculator.faqs.map((faq) => (
                  <details className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-4" key={faq.question}>
                    <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                    <p className="mt-3 leading-7 text-[var(--ink-muted)]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
            {relatedArticles.length > 0 ? (
              <div>
                <CalculatorSectionHeading category={category} code="RD" detail={messages.calculatorPage.relatedGuidesDetail} locale={locale} title={messages.common.relatedGuides} />
                <div className="mt-3 grid gap-5 md:grid-cols-2">
                  {relatedArticles.slice(0, 4).map((article) => (
                    <ArticleCard article={article} key={article.slug} locale={locale} />
                  ))}
                </div>
              </div>
            ) : null}
            <div>
              <CalculatorSectionHeading category={category} code="MAP" detail={messages.calculatorPage.relatedCalculatorsDetail} locale={locale} title={messages.common.relatedCalculators} />
              <div className="mt-3 flex flex-wrap gap-3">
                {related.map((item) => (
                  <Link className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold hover:border-[var(--accent)]" href={localizeHref(locale, `/calculator/${item.slug}`)} key={item.slug}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
        {hasRightSidebar ? <AdSlot className="hidden lg:block" slotKey="page_right_sidebar" /> : null}
      </article>
      <AdSlot slotKey="site_bottom_banner" />
    </PublicFrame>
  );
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return renderCalculatorPage(slug);
}
