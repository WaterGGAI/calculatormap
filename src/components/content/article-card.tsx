import Link from "next/link";
import type { SeoArticle } from "@/lib/editorial-content";
import { defaultLocale, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeArticle } from "@/lib/localized-content";

export function ArticleCard({
  article,
  locale = defaultLocale
}: {
  article: SeoArticle;
  locale?: AppLocale;
}) {
  const localizedArticle = localizeArticle(article, locale);
  const messages = getLocaleMessages(locale);

  return (
    <Link
      className="group flex min-h-48 flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition-transform hover:-translate-y-1 hover:border-[var(--accent)]"
      href={localizeHref(locale, `/articles/${article.slug}`)}
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">{localizedArticle.contentType}</p>
        <h2 className="text-xl font-bold group-hover:text-[var(--accent-strong)]">{localizedArticle.title}</h2>
        <p className="text-sm leading-6 text-[var(--ink-muted)]">{localizedArticle.metaDescription}</p>
      </div>
      <span className="mt-5 text-sm font-bold text-[var(--accent)]">{messages.actions.readGuide}</span>
    </Link>
  );
}
