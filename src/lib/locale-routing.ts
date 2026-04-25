import { notFound } from "next/navigation";
import { defaultLocale, isLocale, secondaryLocales, type AppLocale } from "@/lib/i18n";

export function getSecondaryRouteLocale(value: string): AppLocale {
  if (!isLocale(value) || value === defaultLocale) {
    notFound();
  }

  return value;
}

export function getSecondaryLocaleStaticParams() {
  return secondaryLocales.map((locale) => ({ locale }));
}
