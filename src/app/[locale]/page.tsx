import type { Metadata } from "next";
import { buildHomeMetadata, renderHomePage } from "@/app/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildHomeMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderHomePage(getSecondaryRouteLocale(locale));
}
