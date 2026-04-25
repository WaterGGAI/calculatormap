import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { defaultLocale, type AppLocale } from "@/lib/i18n";

export function PublicFrame({ children, locale = defaultLocale }: { children: ReactNode; locale?: AppLocale }) {
  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
