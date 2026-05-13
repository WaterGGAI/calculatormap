import type { Metadata } from "next";
import { ClusterCard } from "@/components/content/cluster-card";
import { PublicFrame } from "@/components/site/public-frame";
import { defaultLocale, getAlternateLanguagePaths, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { seoClusters } from "@/lib/editorial-content";
import { absoluteUrl } from "@/lib/seo";

export function buildClustersMetadata(locale: AppLocale = defaultLocale): Metadata {
  const messages = getLocaleMessages(locale);
  const path = "/clusters";

  return {
    title: messages.clustersPage.title,
    description: messages.clustersPage.description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: getAlternateLanguagePaths(path)
    },
    openGraph: {
      url: absoluteUrl(path, locale)
    }
  };
}

export const metadata: Metadata = buildClustersMetadata();

export function renderClustersPage(locale: AppLocale = defaultLocale) {
  const messages = getLocaleMessages(locale);
  const labels =
    locale === "zh-TW"
      ? {
          routes: "決策路徑",
          priority: "高意圖",
          tools: "核心工具",
          start: "選一條路徑開始",
          description: "每個群集都把計算器與指南綁在同一個情境中，先算，再理解。"
        }
      : {
          routes: "Decision routes",
          priority: "High intent",
          tools: "Core tools",
          start: "Pick one route",
          description: "Each cluster keeps calculators and guides around the same job: calculate first, understand when needed."
        };
  const p1Count = seoClusters.filter((cluster) => cluster.priority === "P1").length;
  const coreToolCount = seoClusters.reduce((total, cluster) => total + cluster.coreCalculatorSlugs.length, 0);

  return (
    <PublicFrame locale={locale}>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-[var(--line)] pb-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(17rem,0.34fr)] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{messages.clustersPage.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{messages.clustersPage.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">
              {labels.description}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-md border border-[#cfd8d2] bg-[#f4f8f5] p-4">
            <div>
              <p className="text-3xl font-bold tracking-tight">{seoClusters.length}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">{labels.routes}</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">{p1Count}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">{labels.priority}</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">{coreToolCount}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">{labels.tools}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight">{labels.start}</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {seoClusters.map((cluster) => (
            <ClusterCard cluster={cluster} key={cluster.slug} locale={locale} />
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}

export default function ClustersPage() {
  return renderClustersPage();
}
