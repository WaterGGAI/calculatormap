import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdSlot, hasActiveAdSlot } from "@/components/calculators/ad-slot";
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

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#d8dfda] py-3 first:border-t-0">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">{label}</p>
      <p className="mt-1 break-words text-lg font-bold text-[var(--ink)]">{value}</p>
    </div>
  );
}

function InfoDisclosure({
  code,
  title,
  detail,
  children
}: {
  code: string;
  title: string;
  detail?: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-md border border-[var(--line)] bg-[var(--surface)]">
      <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 marker:hidden sm:px-5">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#b7d8cf] bg-[#e3f4ee] text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#0a5f54]">
          {code}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold text-[var(--ink)]">{title}</span>
          {detail ? <span className="mt-1 block text-sm leading-6 text-[var(--ink-muted)]">{detail}</span> : null}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-lg font-semibold text-[var(--ink-muted)] transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-[var(--line)] px-4 py-4 sm:px-5">
        {children}
      </div>
    </details>
  );
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
  const referenceTitle = locale === "zh-TW" ? "需要更多細節？" : "Need more detail?";
  const referenceDescription =
    locale === "zh-TW"
      ? "公式、範例與 FAQ 先收起來，需要時再打開。"
      : "Formula, examples, and FAQ stay tucked away until you need them.";
  const fieldPreview = calculator.fields.slice(0, 4).map((field) => field.label);
  const resultPreview = calculator.results.slice(0, 3).map((result) => result.label);
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
          <section className="rounded-md border border-[#cfd8d2] bg-[#f4f8f5] p-5 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.38fr)]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  {category ? <Badge>{category.name}</Badge> : null}
                  <span className="text-sm text-[var(--ink-muted)]">{messages.common.updated} {calculator.updatedAt}</span>
                </div>
                <h1 className="mt-5 max-w-3xl break-words text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{calculator.h1}</h1>
                <p className="mt-4 max-w-2xl break-words text-base leading-7 text-[var(--ink-muted)]">{calculator.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {fieldPreview.map((label) => (
                    <span className="rounded-full border border-[#cfd8d2] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-muted)]" key={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <aside className="hidden rounded-md border border-[#d8dfda] bg-white/72 px-4 py-2 lg:block">
                <MiniMetric label={messages.common.inputs} value={`${calculator.fields.length}`} />
                <MiniMetric label={messages.common.outputs} value={resultPreview.join(" · ")} />
                <MiniMetric label={messages.common.related} value={`${calculator.relatedSlugs.length}`} />
              </aside>
            </div>
          </section>

          <div className="mt-6">
            <CalculatorRenderer calculator={calculator} locale={locale} />
          </div>

          <section className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold tracking-tight">{referenceTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{referenceDescription}</p>
            </div>
            <div className="grid gap-3">
            <InfoDisclosure code="FX" detail={messages.calculatorPage.formulaExplanationDetail} title={messages.calculatorPage.formulaExplanationTitle}>
              <p className="leading-7 text-[var(--ink-muted)]">{calculator.formulaExplanation}</p>
            </InfoDisclosure>
            <InfoDisclosure code="USE" detail={messages.calculatorPage.howToUseDetail} title={messages.calculatorPage.howToUseTitle}>
              <ol className="grid gap-2 leading-7 text-[var(--ink-muted)]">
                {calculator.howToUse.map((step) => (
                  <li className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-3" key={step}>
                    {step}
                  </li>
                ))}
              </ol>
            </InfoDisclosure>
            <AdSlot slotKey="in_content_1" />
            <InfoDisclosure code="EX" detail={messages.calculatorPage.examplesDetail} title={messages.calculatorPage.examplesTitle}>
              <div className="grid gap-3">
                {calculator.examples.map((example) => (
                  <p className="rounded-md bg-[var(--surface-muted)] p-4 leading-7" key={example}>
                    {example}
                  </p>
                ))}
              </div>
            </InfoDisclosure>
            <InfoDisclosure code="FAQ" detail={messages.calculatorPage.faqDetail} title={messages.calculatorPage.faqTitle}>
              <div className="grid gap-3">
                {calculator.faqs.map((faq) => (
                  <details className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-4" key={faq.question}>
                    <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                    <p className="mt-3 leading-7 text-[var(--ink-muted)]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </InfoDisclosure>
            {relatedArticles.length > 0 ? (
              <InfoDisclosure code="RD" detail={messages.calculatorPage.relatedGuidesDetail} title={messages.common.relatedGuides}>
                <div className="grid gap-5 md:grid-cols-2">
                  {relatedArticles.slice(0, 4).map((article) => (
                    <ArticleCard article={article} key={article.slug} locale={locale} />
                  ))}
                </div>
              </InfoDisclosure>
            ) : null}
            <InfoDisclosure code="MAP" detail={messages.calculatorPage.relatedCalculatorsDetail} title={messages.common.relatedCalculators}>
              <div className="flex flex-wrap gap-3">
                {related.map((item) => (
                  <Link className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold hover:border-[var(--accent)]" href={localizeHref(locale, `/calculator/${item.slug}`)} key={item.slug}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </InfoDisclosure>
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
