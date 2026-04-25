import type { Metadata } from "next";
import { buildTermsMetadata, renderTermsPage } from "@/app/terms/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildTermsMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderTermsPage(getSecondaryRouteLocale(locale));
}
