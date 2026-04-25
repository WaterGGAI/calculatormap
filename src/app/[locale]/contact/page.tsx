import type { Metadata } from "next";
import { buildContactMetadata, renderContactPage } from "@/app/contact/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildContactMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderContactPage(getSecondaryRouteLocale(locale));
}
