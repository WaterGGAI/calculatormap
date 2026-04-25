import type { ReactNode } from "react";
import { getSecondaryLocaleStaticParams, getSecondaryRouteLocale } from "@/lib/locale-routing";
import { localeConfig } from "@/lib/i18n";

export function generateStaticParams() {
  return getSecondaryLocaleStaticParams();
}

export default async function LocalizedLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const routeLocale = getSecondaryRouteLocale(locale);

  return <div lang={localeConfig[routeLocale].htmlLang}>{children}</div>;
}
