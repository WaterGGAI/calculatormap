import Link from "next/link";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { categories } from "@/lib/data";
import { defaultLocale, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCategory } from "@/lib/localized-content";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader({ locale = defaultLocale }: { locale?: AppLocale }) {
  const messages = getLocaleMessages(locale);
  const primaryLinks = [
    { href: "/calculators", label: messages.nav.calculators },
    { href: "/articles", label: messages.nav.guides },
    { href: "/clusters", label: messages.nav.clusters }
  ];
  const localizedCategories = categories.map((category) => localizeCategory(category, locale));
  const mobileLinks = [
    ...primaryLinks,
    ...localizedCategories.map((category) => ({
      href: `/category/${category.slug}`,
      label: category.name
    }))
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex min-w-0 items-center gap-3 font-bold" href={localizeHref(locale, "/")}>
          <span className="flex size-9 items-center justify-center rounded-md bg-[var(--accent)] text-white">CM</span>
          <span className="truncate">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--ink-muted)] md:flex">
          {primaryLinks.map((link) => (
            <Link href={localizeHref(locale, link.href)} key={link.href}>
              {link.label}
            </Link>
          ))}
          {localizedCategories.slice(0, 3).map((category) => (
            <Link key={category.slug} href={localizeHref(locale, `/category/${category.slug}`)}>
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex md:items-center md:gap-3">
          <LocaleSwitcher currentLocale={locale} label={messages.language.switchLabel} />
        </div>
        <details className="group relative md:hidden">
          <summary className="flex min-h-10 cursor-pointer list-none items-center rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 text-sm font-bold text-[var(--ink)] marker:hidden">
            {messages.nav.menu}
          </summary>
          <div className="absolute right-0 top-12 grid w-[min(88vw,20rem)] gap-2 rounded-md border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl">
            <div className="pb-2">
              <LocaleSwitcher currentLocale={locale} label={messages.language.switchLabel} />
            </div>
            {mobileLinks.map((link) => (
              <Link className="rounded-md px-3 py-3 text-sm font-semibold text-[var(--ink-muted)] hover:bg-[var(--surface-muted)]" href={localizeHref(locale, link.href)} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
