import type { Metadata } from "next";
import {
  buildCalculatorsMetadata,
  getCalculatorDirectoryQuery,
  renderCalculatorsPage,
  type CalculatorDirectorySearchParams
} from "@/app/calculators/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildCalculatorsMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedCalculatorsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<CalculatorDirectorySearchParams>;
}) {
  const { locale } = await params;

  return renderCalculatorsPage(getSecondaryRouteLocale(locale), getCalculatorDirectoryQuery(await searchParams));
}
