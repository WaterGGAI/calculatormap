import type { Metadata } from "next";
import { buildCategoryMetadata, renderCategoryPage } from "@/app/category/[slug]/page";
import { categories } from "@/lib/data";
import { secondaryLocales } from "@/lib/i18n";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export function generateStaticParams() {
  return secondaryLocales.flatMap((locale) => categories.map((category) => ({ locale, slug: category.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return buildCategoryMetadata(slug, getSecondaryRouteLocale(locale));
}

export default async function LocalizedCategoryPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return renderCategoryPage(slug, getSecondaryRouteLocale(locale));
}
