import type { Metadata } from "next";
import { buildPrivacyMetadata, renderPrivacyPolicyPage } from "@/app/privacy-policy/page";
import { getSecondaryRouteLocale } from "@/lib/locale-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return buildPrivacyMetadata(getSecondaryRouteLocale(locale));
}

export default async function LocalizedPrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return renderPrivacyPolicyPage(getSecondaryRouteLocale(locale));
}
