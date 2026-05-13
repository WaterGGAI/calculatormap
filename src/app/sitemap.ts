import type { MetadataRoute } from "next";
import { seoArticles, seoClusters } from "@/lib/editorial-content";
import { calculators, categories } from "@/lib/data";
import { defaultLocale, getAlternateLanguagePaths, secondaryLocales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

type SitemapEntry = {
  route: string;
  lastModified: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const defaultUpdatedAt = "2026-04-12";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: SitemapEntry[] = [
    { route: "/", lastModified: defaultUpdatedAt, changeFrequency: "weekly", priority: 1 },
    { route: "/calculators", lastModified: defaultUpdatedAt, changeFrequency: "weekly", priority: 0.95 },
    { route: "/articles", lastModified: defaultUpdatedAt, changeFrequency: "weekly", priority: 0.75 },
    { route: "/clusters", lastModified: defaultUpdatedAt, changeFrequency: "weekly", priority: 0.85 },
    { route: "/about", lastModified: defaultUpdatedAt, changeFrequency: "yearly", priority: 0.35 },
    { route: "/contact", lastModified: defaultUpdatedAt, changeFrequency: "yearly", priority: 0.25 },
    { route: "/privacy-policy", lastModified: defaultUpdatedAt, changeFrequency: "yearly", priority: 0.15 },
    { route: "/terms", lastModified: defaultUpdatedAt, changeFrequency: "yearly", priority: 0.15 }
  ];
  const categoryRoutes: SitemapEntry[] = categories.map((category) => ({
    route: `/category/${category.slug}`,
    lastModified: defaultUpdatedAt,
    changeFrequency: "weekly",
    priority: 0.72
  }));
  const calculatorRoutes: SitemapEntry[] = calculators.map((calculator) => ({
    route: `/calculator/${calculator.slug}`,
    lastModified: calculator.updatedAt,
    changeFrequency: "monthly",
    priority: 0.82
  }));
  const articleRoutes: SitemapEntry[] = seoArticles.map((article) => ({
    route: `/articles/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: article.priority === "P1" ? 0.78 : 0.62
  }));
  const clusterRoutes: SitemapEntry[] = seoClusters.map((cluster) => ({
    route: `/clusters/${cluster.slug}`,
    lastModified: defaultUpdatedAt,
    changeFrequency: "weekly",
    priority: cluster.priority === "P1" ? 0.86 : 0.68
  }));

  const routes = [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...articleRoutes, ...clusterRoutes];
  const localizedRoutes = secondaryLocales.flatMap((locale) => routes.map((entry) => ({ ...entry, locale })));

  return [
    ...routes.map((entry) => ({ ...entry, locale: defaultLocale })),
    ...localizedRoutes
  ].map(({ route, locale, lastModified, changeFrequency, priority }) => ({
    url: absoluteUrl(route, locale),
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    alternates: {
      languages: getAlternateLanguagePaths(route)
    }
  }));
}
