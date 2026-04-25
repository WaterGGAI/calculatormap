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

  return (
    <Link
      className="group flex min-h-52 flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition-transform hover:-translate-y-1 hover:border-[var(--accent)]"
      href={localizeHref(locale, `/clusters/${cluster.slug}`)}
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">{localizedCluster.priority}</p>
        <h2 className="text-xl font-bold group-hover:text-[var(--accent-strong)]">{localizedCluster.name}</h2>
        <p className="text-sm leading-6 text-[var(--ink-muted)]">{localizedCluster.description}</p>
      </div>
      <span className="mt-5 text-sm font-bold text-[var(--accent)]">{messages.actions.openCluster}</span>
    </Link>
  );
}
