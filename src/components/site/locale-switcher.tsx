"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, localeConfig, publicLocales, switchLocalePath, type AppLocale } from "@/lib/i18n";

export function LocaleSwitcher({
  currentLocale,
  label
}: {
  currentLocale?: AppLocale;
  label: string;
}) {
  const pathname = usePathname() || "/";
  const activeLocale = currentLocale ?? defaultLocale;

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] sm:block">{label}</span>
      <div className="flex items-center rounded-md border border-[var(--line)] bg-[var(--surface)] p-1">
        {publicLocales.map((locale) => {
          const isActive = locale === activeLocale;
          const href = switchLocalePath(pathname, locale);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                isActive ? "bg-[var(--accent)] text-white" : "text-[var(--ink-muted)] hover:bg-[var(--surface-muted)]"
              }`}
              href={href}
              key={locale}
            >
              {localeConfig[locale].label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
