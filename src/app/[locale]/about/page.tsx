import type { Metadata } from "next";
import { buildAboutMetadata, renderAboutPage } from "@/app/about/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildAboutMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderAboutPage(getSecondaryRouteLocale(locale));
}
