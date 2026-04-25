import type { Metadata } from "next";
import { buildCalculatorMetadata, renderCalculatorPage } from "@/app/calculator/[slug]/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return buildCalculatorMetadata(slug, getSecondaryRouteLocale(locale));
}

export default async function LocalizedCalculatorPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return renderCalculatorPage(slug, getSecondaryRouteLocale(locale));
}
