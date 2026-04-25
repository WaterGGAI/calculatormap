import type { Metadata } from "next";
import { buildArticlesMetadata, renderArticlesPage } from "@/app/articles/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildArticlesMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderArticlesPage(getSecondaryRouteLocale(locale));
}
