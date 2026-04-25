import type { Metadata } from "next";
import { buildClusterMetadata, renderClusterPage } from "@/app/clusters/[slug]/page";
import { seoClusters } from "@/lib/editorial-content";
import { secondaryLocales } from "@/lib/i18n";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export function generateStaticParams() {
  return secondaryLocales.flatMap((locale) => seoClusters.map((cluster) => ({ locale, slug: cluster.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return buildClusterMetadata(slug, getSecondaryRouteLocale(locale));
}

export default async function LocalizedClusterPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return renderClusterPage(slug, getSecondaryRouteLocale(locale));
}
