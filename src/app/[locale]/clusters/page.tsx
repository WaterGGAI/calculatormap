import type { Metadata } from "next";
import { buildClustersMetadata, renderClustersPage } from "@/app/clusters/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildClustersMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedClustersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderClustersPage(getSecondaryRouteLocale(locale));
}
