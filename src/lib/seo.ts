import type { Calculator, CalculatorCategory } from "@/lib/calculators/types";
import type { SeoArticle } from "@/lib/editorial-content";
import { defaultLocale, localeConfig, localizeHref, type AppLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export function absoluteUrl(path: string, locale: AppLocale = defaultLocale) {
  return new URL(localizeHref(locale, path), siteUrl).toString();
}

function breadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizationName,
    url: siteConfig.url,
    sameAs: siteConfig.sameAs
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: localeConfig[defaultLocale].htmlLang,
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      url: siteConfig.url
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/calculators?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function collectionPageSchema(name: string, description: string, path: string, locale: AppLocale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path, locale),
    inLanguage: localeConfig[locale].htmlLang,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`
    }
  };
}

export function calculatorSchema(calculator: Calculator, category?: CalculatorCategory, locale: AppLocale = defaultLocale) {
  const canonicalUrl = absoluteUrl(`/calculator/${calculator.slug}`, locale);
  const categoryName = category?.name ?? "Calculator";
  const inputLabels = calculator.fields.map((field) => field.label);
  const resultLabels = calculator.results.map((result) => result.label);
  const featureList = [
    `Inputs: ${inputLabels.join(", ")}`,
    `Outputs: ${resultLabels.join(", ")}`,
    `Formula: ${calculator.formulaExplanation}`
  ];
  const labels =
    locale === "zh-TW"
      ? {
          home: "首頁",
          calculators: "計算器"
        }
      : {
          home: "Home",
          calculators: "Calculators"
        };

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    name: calculator.name,
    url: canonicalUrl,
    description: calculator.shortDescription,
    inLanguage: localeConfig[locale].htmlLang,
    datePublished: calculator.updatedAt,
    dateModified: calculator.updatedAt,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`
    },
    breadcrumb: breadcrumbSchema([
      { name: labels.home, item: absoluteUrl("/", locale) },
      { name: labels.calculators, item: absoluteUrl("/calculators", locale) },
      ...(category ? [{ name: category.name, item: absoluteUrl(`/category/${category.slug}`, locale) }] : []),
      { name: calculator.name, item: canonicalUrl }
    ]),
    mainEntity: {
      "@type": "SoftwareApplication",
      "@id": `${canonicalUrl}#calculator`,
      name: calculator.name,
      url: canonicalUrl,
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: `${categoryName} calculator`,
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript in a modern web browser.",
      description: calculator.shortDescription,
      featureList,
      keywords: buildCalculatorKeywords(calculator, category).join(", "),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      potentialAction: {
        "@type": "UseAction",
        target: canonicalUrl
      }
    }
  };
}

export function howToSchema(calculator: Calculator, locale: AppLocale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${calculator.name}`,
    description: calculator.shortDescription,
    inLanguage: localeConfig[locale].htmlLang,
    step: calculator.howToUse.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step,
      text: step
    }))
  };
}

export function itemListSchema(
  name: string,
  description: string,
  items: Array<{ name: string; url: string; description?: string }>,
  locale: AppLocale = defaultLocale
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    inLanguage: localeConfig[locale].htmlLang,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description
    }))
  };
}

export function buildCalculatorKeywords(calculator: Calculator, category?: CalculatorCategory) {
  return [
    calculator.name,
    calculator.h1,
    category?.name,
    `${calculator.name} formula`,
    `${calculator.name} examples`,
    `${calculator.name} FAQ`,
    ...calculator.fields.map((field) => field.label),
    ...calculator.results.map((result) => result.label)
  ].filter((value): value is string => Boolean(value));
}

export function faqSchemaFromItems(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function faqSchema(calculator: Calculator) {
  return faqSchemaFromItems(calculator.faqs);
}

export function articleSchema(article: SeoArticle, locale: AppLocale = defaultLocale) {
  const articleUrl = absoluteUrl(`/articles/${article.slug}`, locale);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: articleUrl,
    inLanguage: localeConfig[locale].htmlLang,
    keywords: [article.primaryKeyword, article.contentType, article.clusterSlug].join(", "),
    articleSection: article.clusterSlug,
    author: {
      "@type": "Organization",
      name: siteConfig.organizationName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      url: siteConfig.url
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: articleUrl,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`
    },
    breadcrumb: breadcrumbSchema([
      { name: locale === "zh-TW" ? "首頁" : "Home", item: absoluteUrl("/", locale) },
      { name: locale === "zh-TW" ? "指南" : "Guides", item: absoluteUrl("/articles", locale) },
      { name: article.title, item: articleUrl }
    ])
  };
}
