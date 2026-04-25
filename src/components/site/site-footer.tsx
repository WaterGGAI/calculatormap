import Link from "next/link";
import { defaultLocale, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter({ locale = defaultLocale }: { locale?: AppLocale }) {
  const messages = getLocaleMessages(locale);
  const links = [
    { href: "/calculators", label: messages.nav.calculators },
    { href: "/articles", label: messages.nav.guides },
    { href: "/clusters", label: messages.nav.clusters },
    { href: "/about", label: messages.nav.about },
    { href: "/contact", label: messages.nav.contact },
    { href: "/privacy-policy", label: messages.nav.privacyPolicy },
    { href: "/terms", label: messages.nav.terms }
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-[var(--ink-muted)] sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-semibold text-[var(--ink)]">{siteConfig.name}</p>
            <p className="mt-2 max-w-2xl">{messages.footer.description}</p>
          </div>
          <nav className="flex flex-wrap gap-4">
            {links.map((link) => (
              <Link key={link.href} href={localizeHref(locale, link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
