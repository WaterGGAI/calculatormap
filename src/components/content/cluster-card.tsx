import Link from "next/link";
import type { SeoCluster } from "@/lib/editorial-content";
import { defaultLocale, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCluster } from "@/lib/localized-content";

export function ClusterCard({
  cluster,
  locale = defaultLocale
}: {
  cluster: SeoCluster;
  locale?: AppLocale;
}) {
  const localizedCluster = localizeCluster(cluster, locale);
  const messages = getLocaleMessages(locale);
  const initials = localizedCluster.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      className="group flex min-h-44 flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_16px_50px_-42px_rgba(20,38,33,0.45)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[#fbfdfb]"
      href={localizeHref(locale, `/clusters/${cluster.slug}`)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[#b7d8cf] bg-[#e3f4ee] text-xs font-bold text-[#0a5f54]" aria-hidden>
            {initials}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">{localizedCluster.priority}</p>
        </div>
        <h2 className="text-lg font-bold leading-snug group-hover:text-[var(--accent-strong)]">{localizedCluster.name}</h2>
        <p className="text-clamp-2 text-sm leading-6 text-[var(--ink-muted)]">{localizedCluster.description}</p>
      </div>
      <span className="mt-4 text-sm font-bold text-[var(--accent)]">{messages.actions.openCluster}</span>
    </Link>
  );
}
