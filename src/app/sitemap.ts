import type { MetadataRoute } from "next";
import { seoArticles, seoClusters } from "@/lib/editorial-content";
import { calculators, categories } from "@/lib/data";
import { defaultLocale, secondaryLocales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/calculators", "/articles", "/clusters", "/about", "/contact", "/privacy-policy", "/terms"];
  const categoryRoutes = categories.map((category) => `/category/${category.slug}`);
  const calculatorRoutes = calculators.map((calculator) => `/calculator/${calculator.slug}`);
  const articleRoutes = seoArticles.map((article) => `/articles/${article.slug}`);
  const clusterRoutes = seoClusters.map((cluster) => `/clusters/${cluster.slug}`);

  const routes = [...staticRoutes, ...categoryRoutes, ...calculatorRoutes, ...articleRoutes, ...clusterRoutes].map((route) => route || "/");
  const localizedRoutes = secondaryLocales.flatMap((locale) => routes.map((route) => ({ route, locale })));

  return [
    ...routes.map((route) => ({ route, locale: defaultLocale })),
    ...localizedRoutes
  ].map(({ route, locale }) => ({
    url: absoluteUrl(route, locale),
    lastModified: new Date("2026-04-12")
  }));
}
