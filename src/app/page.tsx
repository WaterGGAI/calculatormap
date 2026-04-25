import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/content/article-card";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { ClusterCard } from "@/components/content/cluster-card";
import { PublicFrame } from "@/components/site/public-frame";
import { ButtonLink } from "@/components/ui/button";
import { calculators } from "@/lib/data";
import { seoArticles, seoClusters } from "@/lib/editorial-content";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCalculator } from "@/lib/localized-content";
import { absoluteUrl, organizationSchema, websiteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function buildHomeMetadata(locale: AppLocale = defaultLocale): Metadata {
  const path = "/";
  const messages = getLocaleMessages(locale);
  const title =
    locale === defaultLocale
      ? siteConfig.homepageTitle
      : `${siteConfig.name} | 線上計算器、成本工具與指南`;
  const description = locale === defaultLocale ? siteConfig.homepageDescription : messages.footer.description;

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildHomeMetadata();

type SealTone = "light" | "dark" | "mint" | "gold";

type LaneLink = {
  short: string;
  title: string;
  detail: string;
  href: string;
  tone: SealTone;
};

type SectionStampLink = {
  short: string;
  label: string;
  detail: string;
  href: string;
  tone: SealTone;
};

const sealToneStyles: Record<SealTone, { shell: string; inner: string; label: string }> = {
  light: {
    shell: "border-white/18 bg-white/[0.08] text-white",
    inner: "border-white/12",
    label: "text-white"
  },
  dark: {
    shell: "border-[#d8dfda] bg-[var(--surface)] text-[var(--ink)]",
    inner: "border-[#ebefec]",
    label: "text-[var(--ink)]"
  },
  mint: {
    shell: "border-[#a5d1c7] bg-[#e8f6f1] text-[#0e5c55]",
    inner: "border-[#cde7e0]",
    label: "text-[#0e5c55]"
  },
  gold: {
    shell: "border-[#d5c082] bg-[#f8efcf] text-[#6a5118]",
    inner: "border-[#e8ddb6]",
    label: "text-[#6a5118]"
  }
};

function SealIcon({
  short,
  tone = "dark",
  size = "md"
}: {
  short: string;
  tone?: SealTone;
  size?: "sm" | "md" | "lg";
}) {
  const toneStyle = sealToneStyles[tone];
  const sizeClass =
    size === "sm"
      ? "size-9"
      : size === "lg"
        ? "size-14"
        : "size-11";

  return (
    <span className={cn("relative flex shrink-0 items-center justify-center rounded-full border", sizeClass, toneStyle.shell)} aria-hidden>
      <span className={cn("absolute inset-[4px] rounded-full border", toneStyle.inner)} />
      <span
        className={cn(
          "relative font-semibold uppercase",
          short.length > 3 ? "text-[0.46rem] tracking-[0.14em]" : "text-[0.6rem] tracking-[0.2em]",
          toneStyle.label
        )}
      >
        {short}
      </span>
    </span>
  );
}

function SealCluster({ items, tone = "dark" }: { items: string[]; tone?: SealTone }) {
  return (
    <div className="flex -space-x-3" aria-hidden>
      {items.map((item) => (
        <SealIcon key={item} short={item} size="sm" tone={tone} />
      ))}
    </div>
  );
}

function HeroLaneLink({ lane, locale, actionLabel }: { lane: LaneLink; locale: AppLocale; actionLabel: string }) {
  return (
    <Link
      className="group flex items-center gap-3 rounded-md border border-white/12 bg-black/15 px-4 py-3 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.08] lg:rounded-none lg:border-x-0 lg:border-t-0 lg:bg-transparent lg:px-0"
      href={localizeHref(locale, lane.href)}
    >
      <SealIcon short={lane.short} tone={lane.tone} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white">{lane.title}</span>
        <span className="mt-1 block text-sm leading-6 text-[#c1d4cf]">{lane.detail}</span>
      </span>
      <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#dcc07a] sm:block">{actionLabel}</span>
    </Link>
  );
}

function CategoryStampLink({ item, locale }: { item: SectionStampLink; locale: AppLocale }) {
  return (
    <Link
      className="group flex min-h-20 items-center gap-3 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-3 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#98c1b7]"
      href={localizeHref(locale, item.href)}
    >
      <SealIcon short={item.short} tone={item.tone} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-[var(--ink)]">{item.label}</span>
        <span className="mt-1 block text-sm leading-6 text-[var(--ink-muted)]">{item.detail}</span>
      </span>
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  seals
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
  seals: string[];
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="flex items-center gap-3">
          <SealCluster items={seals} tone="gold" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#876820]">{eyebrow}</p>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">{description}</p>
      </div>
      <ButtonLink href={actionHref} variant="secondary">
        {actionLabel}
      </ButtonLink>
    </div>
  );
}

export function renderHomePage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);
  const home = messages.home;
  const featured = localizeCalculator(calculators[0], locale);
  const quickWinSlugs = new Set([
    "profit-margin-calculator",
    "markup-calculator",
    "break-even-calculator",
    "freelance-rate-calculator",
    "commission-calculator",
    "roas-calculator",
    "etsy-fee-calculator",
    "shopify-profit-calculator",
    "concrete-cost-calculator",
    "gravel-calculator",
    "paint-calculator",
    "hourly-to-salary-calculator"
  ]);
  const quickWins = calculators.filter((calculator) => quickWinSlugs.has(calculator.slug));
  const homepageSchema = [organizationSchema(), websiteSchema()];

  return (
    <PublicFrame locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />

      <section className="relative isolate overflow-hidden bg-[#0c1816] text-white">
        <Image
          alt="CalculatorMap planning desk with laptop, calculator, notes, and charts"
          className="absolute inset-0 size-full object-cover object-center opacity-42"
          fill
          priority
          sizes="100vw"
          src="https://images.pexels.com/photos/20552572/pexels-photo-20552572.jpeg?auto=compress&cs=tinysrgb&w=1800"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,14,0.9),rgba(7,16,14,0.6),rgba(7,16,14,0.8))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(93,180,167,0.32),transparent_32%),radial-gradient(circle_at_78%_16%,rgba(230,197,108,0.24),transparent_28%)]" />
        <div className="noise absolute inset-0 opacity-35" />

        <div className="pointer-events-none absolute left-[5%] top-[18%] hidden seal-drift lg:block">
          <div className="rounded-full border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
            <SealIcon short="CM" size="lg" tone="light" />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[16%] right-[9%] hidden seal-drift-delay lg:block">
          <div className="rounded-full border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm">
            <SealIcon short="MAP" tone="gold" />
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[calc(82svh-4.25rem)] max-w-7xl flex-col justify-end px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pb-12 lg:pt-14">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(19rem,0.72fr)]">
            <div className="brand-rise max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#d8c27c] backdrop-blur-sm">
                {home.heroBadge}
              </p>
              <h1 className="mt-6 max-w-[8ch] text-5xl font-semibold leading-[0.92] sm:text-7xl lg:text-[5.6rem]">{siteConfig.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-7 text-[#d2e2dd]">
                {home.heroDescription}
              </p>
              <div className="mt-8 grid max-w-md gap-3 sm:flex sm:flex-wrap">
                <ButtonLink className="border-transparent bg-[#f1c96c] text-[#102420] hover:bg-[#ffd989]" href={localizeHref(locale, `/calculator/${featured.slug}`)}>
                  {home.tryButtonPrefix} {featured.name}
                </ButtonLink>
                <ButtonLink className="border-white/18 bg-white/[0.08] text-white hover:bg-white/[0.14]" href={localizeHref(locale, "/calculators")} variant="secondary">
                  {home.browseCalculators}
                </ButtonLink>
                <ButtonLink className="border-white/18 bg-transparent text-white hover:bg-white/[0.1]" href={localizeHref(locale, "/articles")} variant="secondary">
                  {home.readGuides}
                </ButtonLink>
              </div>
            </div>

            <div className="brand-rise-delay">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a8d6cf]">{home.liveLaneEyebrow}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {home.lanes.map((lane) => (
                  <HeroLaneLink actionLabel={messages.actions.open} key={lane.href} lane={lane} locale={locale} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/12 pt-5 sm:grid-cols-3">
            {home.signals.map((signal, index) => (
              <div className="flex items-start gap-3" key={signal.short}>
                <SealIcon short={signal.short} tone={index === 1 ? "mint" : index === 2 ? "gold" : "light"} />
                <div>
                  <p className="text-sm font-semibold text-white">{signal.label}</p>
                  <p className="mt-1 text-sm leading-6 text-[#bdd0cb]">{signal.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <SealCluster items={["CM", "GO", "NOW"]} tone="mint" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#876820]">{home.operatingModesEyebrow}</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{home.operatingModesTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-muted)]">
              {home.operatingModesDescription}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {home.categoryStamps.map((item) => (
              <CategoryStampLink item={item} key={item.href} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            actionHref={localizeHref(locale, "/calculators")}
            actionLabel={messages.actions.seeAllCalculators}
            description={home.quickWinsDescription}
            eyebrow={home.quickWinsEyebrow}
            seals={["ROI", "PAY", "ADS"]}
            title={home.quickWinsTitle}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {quickWins.map((calculator) => (
              <CalculatorCard calculator={calculator} key={calculator.slug} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[#eef3ef]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            actionHref={localizeHref(locale, "/clusters")}
            actionLabel={messages.actions.viewAllClusters}
            description={home.seoClustersDescription}
            eyebrow={home.seoClustersEyebrow}
            seals={["MAP", "SERP", "PATH"]}
            title={home.seoClustersTitle}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {seoClusters.map((cluster) => (
              <ClusterCard cluster={cluster} key={cluster.slug} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            actionHref={localizeHref(locale, "/articles")}
            actionLabel={messages.actions.browseAllGuides}
            description={home.guidesDescription}
            eyebrow={home.guidesEyebrow}
            seals={["READ", "WHY", "USE"]}
            title={home.guidesTitle}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {seoArticles.slice(0, 6).map((article) => (
              <ArticleCard article={article} key={article.slug} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#102420] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(91,174,161,0.22),transparent_28%),radial-gradient(circle_at_76%_12%,rgba(241,201,108,0.18),transparent_24%)]" />
        <div className="noise absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <SealCluster items={["CM", "CAL", "GO"]} tone="light" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d7c37e]">{home.finalEyebrow}</p>
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
              {home.finalTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#cedfda]">
              {home.finalDescription}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {home.finalActions.map((action) => (
              <Link
                className="group flex min-h-24 items-center gap-3 rounded-md border border-white/12 bg-white/[0.05] px-4 py-4 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.08]"
                href={localizeHref(locale, action.href)}
                key={action.href}
              >
                <SealIcon short={action.short} tone={action.tone} />
                <span className="text-sm font-semibold text-white">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicFrame>
  );
}

export default function HomePage() {
  return renderHomePage();
}
