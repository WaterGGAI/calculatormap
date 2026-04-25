import type { Metadata } from "next";
import { buildArticleMetadata, renderArticlePage } from "@/app/articles/[slug]/page";
import { seoArticles } from "@/lib/editorial-content";
import { secondaryLocales } from "@/lib/i18n";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export function generateStaticParams() {
  return secondaryLocales.flatMap((locale) => seoArticles.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return buildArticleMetadata(slug, getSecondaryRouteLocale(locale));
}

export default async function LocalizedArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return renderArticlePage(slug, getSecondaryRouteLocale(locale));
}
