import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdSlot, hasActiveAdSlot } from "@/components/calculators/ad-slot";
import { CalculatorRenderer } from "@/components/calculators/calculator-renderer";
import { ArticleCard } from "@/components/content/article-card";
import { PublicFrame } from "@/components/site/public-frame";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getMergedCalculatorBySlug } from "@/lib/calculator-content";
import { getCalculatorVisualTheme, type CalculatorVisualTheme } from "@/lib/calculator-visuals";
import { getArticlesForCalculator } from "@/lib/editorial-content";
import { categories, getCalculator, getRelatedCalculators } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCalculator, localizeCategory, localizeVisualTheme } from "@/lib/localized-content";
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

function WorkflowStep({ code, title, detail }: { code: string; title: string; detail: string }) {
  return (
    <div className="min-w-0 rounded-md border border-[#d8dfda] bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#b7d8cf] bg-[#e3f4ee] text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#0a5f54]">
          {code}
        </span>
        <p className="min-w-0 break-words text-sm font-bold text-[var(--ink)]">{title}</p>
      </div>
      <p className="mt-3 break-words text-sm leading-6 text-[var(--ink-muted)]">{detail}</p>
    </div>
  );
}

function HeroVisualPanel({
  visual,
  categoryName,
  inputCount,
  outputCount,
  relatedCount,
  locale
}: {
  visual: CalculatorVisualTheme;
  categoryName: string;
  inputCount: number;
  outputCount: number;
  relatedCount: number;
  locale: AppLocale;
}) {
  const labels =
    locale === "zh-TW"
      ? { inputs: "輸入", outputs: "輸出", related: "相關", map: "工作台" }
      : { inputs: "inputs", outputs: "outputs", related: "related", map: "workbench" };
  const stats = [
    { label: labels.inputs, value: inputCount },
    { label: labels.outputs, value: outputCount },
    { label: labels.related, value: relatedCount }
  ];

  return (
    <aside className={cn("relative hidden min-h-[24rem] overflow-hidden rounded-md border text-white lg:block", visual.panelClass)}>
      <Image
        alt={visual.imageAlt}
        className={cn("absolute inset-0 size-full object-cover", visual.imagePositionClass)}
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        src={visual.imageUrl}
      />
      <div className={cn("absolute inset-0", visual.overlayClass)} />
      <div className="noise absolute inset-0 opacity-25" />
      <div className="absolute right-5 top-5 rounded-md border border-white/12 bg-black/14 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/72">
        {labels.map}
      </div>
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center gap-3">
          <span className={cn("relative flex size-12 shrink-0 items-center justify-center rounded-full border", visual.sealClass)}>
            <span className={cn("absolute inset-[4px] rounded-full border", visual.sealInnerClass)} />
            <span className={cn("relative text-[0.58rem] font-semibold uppercase tracking-[0.18em]", visual.sealLabelClass)}>{visual.code}</span>
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/78">{visual.eyebrow}</p>
            <p className={cn("mt-1 text-sm font-bold", visual.accentTextClass)}>{categoryName}</p>
          </div>
        </div>

        <div className="max-w-md">
          <p className="text-2xl font-bold leading-tight text-white">{visual.statement}</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {stats.map((item) => (
              <div className="rounded-md border border-white/12 bg-white/10 p-3" key={item.label}>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/62">{item.label}</p>
                <p className="mt-2 text-2xl font-bold tabular-nums text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {visual.tags.map((tag) => (
            <span className={cn("rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]", visual.chipClass)} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
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
  const visual = localizeVisualTheme(getCalculatorVisualTheme(rawCategory), rawCategory?.slug, locale);
  const referenceTitle = locale === "zh-TW" ? "需要更多細節？" : "Need more detail?";
  const referenceDescription =
    locale === "zh-TW"
      ? "公式、範例與 FAQ 先收起來，需要時再打開。"
      : "Formula, examples, and FAQ stay tucked away until you need them.";
  const fieldPreview = calculator.fields.slice(0, 4).map((field) => field.label);
  const heroLabels =
    locale === "zh-TW"
      ? {
          start: "開始使用",
          reference: "公式與範例",
          routeLabel: "操作路徑",
          inputTitle: "輸入假設",
          inputDetail: "先填入會影響結果的核心數值。",
          resultTitle: "檢查結果",
          resultDetail: "右側會即時更新主要結果與延伸數值。",
          contextTitle: "需要時再展開",
          contextDetail: "公式、FAQ 與相關指南收在下方。"
        }
      : {
          start: "Start using it",
          reference: "Formula and examples",
          routeLabel: "Work path",
          inputTitle: "Enter assumptions",
          inputDetail: "Start with the inputs that actually change the result.",
          resultTitle: "Check the result",
          resultDetail: "The live panel updates the main number and supporting outputs.",
          contextTitle: "Open context only when needed",
          contextDetail: "Formula notes, FAQ, and related guides stay below the tool."
        };
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
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(22rem,0.72fr)]">
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
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink className="w-full active:scale-[0.98] sm:w-auto" href="#calculator-tool">
                    {heroLabels.start}
                  </ButtonLink>
                  <ButtonLink className="w-full sm:w-auto" href="#calculator-reference" variant="secondary">
                    {heroLabels.reference}
                  </ButtonLink>
                </div>
              </div>
              <HeroVisualPanel
                categoryName={category?.name ?? messages.common.category}
                inputCount={calculator.fields.length}
                locale={locale}
                outputCount={calculator.results.length}
                relatedCount={calculator.relatedSlugs.length}
                visual={visual}
              />
            </div>
          </section>

          <section aria-label={heroLabels.routeLabel} className="mt-4 hidden gap-3 md:grid md:grid-cols-3">
            <WorkflowStep code="IN" detail={heroLabels.inputDetail} title={heroLabels.inputTitle} />
            <WorkflowStep code="OUT" detail={heroLabels.resultDetail} title={heroLabels.resultTitle} />
            <WorkflowStep code="FX" detail={heroLabels.contextDetail} title={heroLabels.contextTitle} />
          </section>

          <div className="mt-6 scroll-mt-24" id="calculator-tool">
            <CalculatorRenderer calculator={calculator} locale={locale} />
          </div>

          <section className="mt-10 scroll-mt-24" id="calculator-reference">
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
