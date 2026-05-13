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
  const initials = localizedArticle.contentType
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <Link
      className="group flex min-h-40 flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_16px_50px_-42px_rgba(20,38,33,0.45)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[#fbfdfb]"
      href={localizeHref(locale, `/articles/${article.slug}`)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[#d7c47e] bg-[#fff4d4] text-[0.62rem] font-bold text-[#6d5318]" aria-hidden>
            {initials}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">{localizedArticle.contentType}</p>
        </div>
        <h2 className="text-lg font-bold leading-snug group-hover:text-[var(--accent-strong)]">{localizedArticle.title}</h2>
        <p className="text-clamp-2 text-sm leading-6 text-[var(--ink-muted)]">{localizedArticle.metaDescription}</p>
      </div>
      <span className="mt-4 text-sm font-bold text-[var(--accent)]">{messages.actions.readGuide}</span>
    </Link>
  );
}
