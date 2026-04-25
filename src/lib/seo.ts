import type { Calculator, CalculatorCategory } from "@/lib/calculators/types";
import type { SeoArticle } from "@/lib/editorial-content";
import { defaultLocale, localizeHref, type AppLocale } from "@/lib/i18n";
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
    url: siteConfig.url
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  };
}

export function collectionPageSchema(name: string, description: string, path: string, locale: AppLocale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path, locale)
  };
}

export function calculatorSchema(calculator: Calculator, category?: CalculatorCategory, locale: AppLocale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: calculator.name,
    url: absoluteUrl(`/calculator/${calculator.slug}`, locale),
    description: calculator.shortDescription,
    breadcrumb: breadcrumbSchema([
      { name: "Home", item: absoluteUrl("/", locale) },
      ...(category ? [{ name: category.name, item: absoluteUrl(`/category/${category.slug}`, locale) }] : []),
      { name: calculator.name, item: absoluteUrl(`/calculator/${calculator.slug}`, locale) }
    ]),
    mainEntity: {
      "@type": "SoftwareApplication",
      name: calculator.name,
      applicationCategory: "CalculatorApplication",
      operatingSystem: "Any",
      description: calculator.shortDescription,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    }
  };
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: {
      "@type": "Organization",
      name: siteConfig.organizationName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`, locale)
  };
}
