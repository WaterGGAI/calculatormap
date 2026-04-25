import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

type AdminSectionPageProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  metrics?: Array<{ label: string; value: string; tone?: "neutral" | "success" | "warning" | "danger" }>;
  children?: ReactNode;
};

export function AdminSectionPage({
  title,
  description,
  actionLabel,
  actionHref,
  metrics = [],
  children
}: AdminSectionPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-end">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-tight text-[var(--ink)] sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--ink-muted)]">{description}</p>
        </div>
        {actionLabel && actionHref ? <ButtonLink className="w-full sm:w-auto" href={actionHref}>{actionLabel}</ButtonLink> : null}
      </div>
      {metrics.length > 0 ? (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-4" key={metric.label}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--ink-muted)]">{metric.label}</p>
                <Badge tone={metric.tone}>{metric.tone ?? "neutral"}</Badge>
              </div>
              <p className="mt-3 text-2xl font-bold">{metric.value}</p>
            </div>
          ))}
        </section>
      ) : null}
      {children}
    </div>
  );
}

export function AdminTable({
  columns,
  rows
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-[var(--surface)]">
      <p className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-4 py-2 text-xs font-semibold text-[var(--ink-muted)] sm:hidden">
        左右滑動查看完整表格
      </p>
      <div className="overflow-x-auto">
      <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
        <thead className="bg-[var(--surface-muted)] text-xs uppercase text-[var(--ink-muted)]">
          <tr>
            {columns.map((column) => (
              <th className="border-b border-[var(--line)] px-4 py-3 font-bold" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className="border-b border-[var(--line)] last:border-b-0" key={index}>
              {row.map((cell, cellIndex) => (
                <td className="px-4 py-4 align-top" key={cellIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export function InlineAction({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]" href={href}>
      {children}
    </Link>
  );
}
