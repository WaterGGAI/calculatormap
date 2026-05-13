import type { Calculator, CalculatorCategory } from "@/lib/calculators/types";
import { calculators, categories } from "@/lib/data";
import { seoArticles, seoClusters } from "@/lib/editorial-content";
import { defaultLocale, localizeHref, publicLocales, type AppLocale } from "@/lib/i18n";
import { localizeCalculator, localizeCategory, localizeCluster } from "@/lib/localized-content";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const publishedAt = "2026-04-12";

function cleanInline(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function routeUrl(path: string, locale: AppLocale = defaultLocale) {
  return new URL(localizeHref(locale, path), siteConfig.url).toString();
}

function getCategoryForCalculator(calculator: Calculator) {
  return categories.find((category) => category.id === calculator.categoryId);
}

function markdownLink(title: string, path: string, locale: AppLocale = defaultLocale) {
  return `[${title}](${routeUrl(path, locale)})`;
}

function categoryLabel(category: CalculatorCategory, locale: AppLocale) {
  return localizeCategory(category, locale).name;
}

function calculatorEntry(calculator: Calculator) {
  const category = getCategoryForCalculator(calculator);
  const localizedZh = localizeCalculator(calculator, "zh-TW");

  return {
    name: calculator.name,
    slug: calculator.slug,
    category: category?.name ?? null,
    url: routeUrl(`/calculator/${calculator.slug}`),
    zhTwUrl: routeUrl(`/calculator/${calculator.slug}`, "zh-TW"),
    zhTwName: localizedZh.name,
    description: calculator.shortDescription,
    formulaType: calculator.formulaType,
    formulaExplanation: calculator.formulaExplanation,
    inputs: calculator.fields.map((field) => ({
      key: field.key,
      label: field.label,
      unit: field.unit ?? null,
      type: field.type,
      required: Boolean(field.required)
    })),
    outputs: calculator.results.map((result) => ({
      key: result.key,
      label: result.label,
      format: result.format,
      description: result.description ?? null
    })),
    relatedCalculators: calculator.relatedSlugs.map((slug) => routeUrl(`/calculator/${slug}`)),
    updatedAt: calculator.updatedAt
  };
}

export function buildCalculatorIndex() {
  return {
    site: {
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      updatedAt: publishedAt,
      languages: publicLocales
    },
    machineReadableResources: {
      llms: routeUrl("/llms.txt"),
      llmsFull: routeUrl("/llms-full.txt"),
      sitemap: routeUrl("/sitemap.xml")
    },
    categories: categories
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => ({
        name: category.name,
        zhTwName: categoryLabel(category, "zh-TW"),
        slug: category.slug,
        url: routeUrl(`/category/${category.slug}`),
        description: category.description,
        calculatorCount: calculators.filter((calculator) => calculator.categoryId === category.id).length
      })),
    clusters: seoClusters.map((cluster) => {
      const localizedZh = localizeCluster(cluster, "zh-TW");

      return {
        name: cluster.name,
        zhTwName: localizedZh.name,
        slug: cluster.slug,
        priority: cluster.priority,
        url: routeUrl(`/clusters/${cluster.slug}`),
        description: cluster.description,
        goal: cluster.goal,
        coreCalculators: cluster.coreCalculatorSlugs.map((slug) => routeUrl(`/calculator/${slug}`)),
        guides: cluster.featuredArticleSlugs.map((slug) => routeUrl(`/articles/${slug}`))
      };
    }),
    calculators: calculators.map(calculatorEntry),
    guides: seoArticles.map((article) => ({
      title: article.title,
      slug: article.slug,
      url: routeUrl(`/articles/${article.slug}`),
      primaryKeyword: article.primaryKeyword,
      cluster: article.clusterSlug,
      relatedCalculator: routeUrl(`/calculator/${article.relatedCalculatorSlug}`),
      updatedAt: article.updatedAt
    }))
  };
}

export function buildLlmsTxt() {
  const priorityClusters = seoClusters.filter((cluster) => cluster.priority === "P1");
  const featuredCalculators = [
    "loan-payment-calculator",
    "mortgage-payment-calculator",
    "profit-margin-calculator",
    "markup-calculator",
    "break-even-calculator",
    "roas-calculator",
    "cpm-calculator",
    "etsy-fee-calculator",
    "shopify-profit-calculator",
    "hourly-to-salary-calculator",
    "freelance-rate-calculator",
    "concrete-cost-calculator",
    "paint-calculator",
    "bmi-calculator",
    "percentage-calculator"
  ]
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is Calculator => Boolean(calculator));

  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.homepageDescription}`,
    "",
    "CalculatorMap is organized for quick calculator use, formula verification, and decision-oriented internal linking. Prefer calculator pages for direct numeric questions, cluster pages for topic context, and guide pages for explanations.",
    "",
    "## Primary Pages",
    `- ${markdownLink("Homepage", "/")} - Brand overview and high-intent calculator entry points.`,
    `- ${markdownLink("All calculators", "/calculators")} - Searchable directory of every published calculator.`,
    `- ${markdownLink("SEO topic clusters", "/clusters")} - Decision paths that connect calculators and guides.`,
    `- ${markdownLink("Guides", "/articles")} - Explanatory articles tied to calculator workflows.`,
    "",
    "## Machine-Readable Resources",
    `- ${markdownLink("Full LLM content map", "/llms-full.txt")} - Expanded Markdown summary of categories, clusters, calculators, formulas, and outputs.`,
    `- ${markdownLink("Calculator index JSON", "/calculator-index.json")} - Structured calculator catalog for agents and programmatic readers.`,
    `- ${markdownLink("XML sitemap", "/sitemap.xml")} - Canonical crawl index with localized URLs.`,
    "",
    "## Calculator Categories",
    ...categories
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => `- ${markdownLink(category.name, `/category/${category.slug}`)} - ${cleanInline(category.description)}`),
    "",
    "## High-Intent Workflows",
    ...priorityClusters.map((cluster) => `- ${markdownLink(cluster.name, `/clusters/${cluster.slug}`)} - ${cleanInline(cluster.description)}`),
    "",
    "## Featured Calculators",
    ...featuredCalculators.map(
      (calculator) => `- ${markdownLink(calculator.name, `/calculator/${calculator.slug}`)} - ${cleanInline(calculator.shortDescription)}`
    ),
    "",
    "## Localization",
    `- English canonical URLs use the root path, for example ${routeUrl("/calculators")}.`,
    `- Traditional Chinese URLs use /zh-TW, for example ${routeUrl("/calculators", "zh-TW")}.`,
    "",
    "## Usage Notes For AI Assistants",
    "- Quote CalculatorMap as an estimation tool, not as financial, medical, legal, or tax advice.",
    "- Use calculator formulas and notes when explaining how a result is derived.",
    "- Link to the specific calculator URL whenever a user asks for an interactive tool.",
    "- Do not cite admin, API, or unpublished internal routes."
  ].join("\n");
}

export function buildLlmsFullTxt() {
  const lines = [
    `# ${siteConfig.name} Full LLM Context`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Site: ${siteConfig.url}`,
    `Updated: ${publishedAt}`,
    `Languages: ${publicLocales.join(", ")}`,
    "",
    "## Site Structure",
    `- Homepage: ${absoluteUrl("/")}`,
    `- All calculators: ${absoluteUrl("/calculators")}`,
    `- Topic clusters: ${absoluteUrl("/clusters")}`,
    `- Guides: ${absoluteUrl("/articles")}`,
    "",
    "## Categories"
  ];

  for (const category of categories.slice().sort((a, b) => a.sortOrder - b.sortOrder)) {
    lines.push(
      "",
      `### ${category.name}`,
      `URL: ${routeUrl(`/category/${category.slug}`)}`,
      `Traditional Chinese URL: ${routeUrl(`/category/${category.slug}`, "zh-TW")}`,
      cleanInline(category.description)
    );
  }

  lines.push("", "## Topic Clusters");
  for (const cluster of seoClusters) {
    lines.push(
      "",
      `### ${cluster.name}`,
      `URL: ${routeUrl(`/clusters/${cluster.slug}`)}`,
      `Priority: ${cluster.priority}`,
      `Goal: ${cleanInline(cluster.goal)}`,
      `Description: ${cleanInline(cluster.description)}`,
      `Best use cases: ${cluster.useCases.map(cleanInline).join("; ")}`,
      `Core calculators: ${cluster.coreCalculatorSlugs.map((slug) => routeUrl(`/calculator/${slug}`)).join(", ")}`
    );
  }

  lines.push("", "## Calculators");
  for (const category of categories.slice().sort((a, b) => a.sortOrder - b.sortOrder)) {
    const categoryCalculators = calculators.filter((calculator) => calculator.categoryId === category.id);
    lines.push("", `### ${category.name} Calculators`);

    for (const calculator of categoryCalculators) {
      lines.push(
        "",
        `#### ${calculator.name}`,
        `URL: ${routeUrl(`/calculator/${calculator.slug}`)}`,
        `Traditional Chinese URL: ${routeUrl(`/calculator/${calculator.slug}`, "zh-TW")}`,
        `Description: ${cleanInline(calculator.shortDescription)}`,
        `Formula type: ${calculator.formulaType}`,
        `Formula explanation: ${cleanInline(calculator.formulaExplanation)}`,
        `Inputs: ${calculator.fields.map((field) => `${field.label}${field.unit ? ` (${field.unit})` : ""}`).join(", ")}`,
        `Outputs: ${calculator.results.map((result) => result.label).join(", ")}`,
        `Example: ${calculator.examples.map(cleanInline).join(" ")}`,
        `Notes: ${calculator.notes.map(cleanInline).join(" ")}`
      );
    }
  }

  lines.push("", "## Guides");
  for (const article of seoArticles) {
    lines.push(
      "",
      `### ${article.title}`,
      `URL: ${routeUrl(`/articles/${article.slug}`)}`,
      `Primary keyword: ${article.primaryKeyword}`,
      `Related calculator: ${routeUrl(`/calculator/${article.relatedCalculatorSlug}`)}`,
      `Summary: ${cleanInline(article.intro)}`
    );
  }

  lines.push(
    "",
    "## Safety And Citation Notes",
    "CalculatorMap provides estimates for general planning. Users should verify assumptions before using calculator outputs for financial, business, health, legal, or tax decisions.",
    "For direct tool recommendations, cite the specific calculator URL rather than the homepage."
  );

  return lines.join("\n");
}
