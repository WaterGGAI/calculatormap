import Link from "next/link";
import type { Calculator } from "@/lib/calculators/types";
import { categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { defaultLocale, getLocaleMessages, localizeHref, type AppLocale } from "@/lib/i18n";
import { localizeCalculator, localizeCategory } from "@/lib/localized-content";

export function CalculatorCard({
  calculator,
  locale = defaultLocale
}: {
  calculator: Calculator;
  locale?: AppLocale;
}) {
  const localizedCalculator = localizeCalculator(calculator, locale);
  const category = categories.find((item) => item.id === calculator.categoryId);
  const localizedCategory = category ? localizeCategory(category, locale) : null;
  const messages = getLocaleMessages(locale);
  const initials = localizedCalculator.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      className="group flex min-h-40 flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_16px_50px_-42px_rgba(20,38,33,0.45)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[#fbfdfb]"
      href={localizeHref(locale, `/calculator/${calculator.slug}`)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[#b7d8cf] bg-[#e3f4ee] text-xs font-bold text-[#0a5f54]" aria-hidden>
              {initials}
            </span>
            <Badge className="min-w-0 truncate" tone="neutral">{localizedCategory?.name ?? messages.common.category}</Badge>
          </div>
          <span className="text-xs font-semibold text-[var(--ink-muted)]">{localizedCalculator.updatedAt}</span>
        </div>
        <h2 className="text-lg font-bold leading-snug group-hover:text-[var(--accent-strong)]">{localizedCalculator.name}</h2>
        <p className="text-clamp-2 text-sm leading-6 text-[var(--ink-muted)]">{localizedCalculator.shortDescription}</p>
      </div>
      <span className="mt-4 inline-flex text-sm font-bold text-[var(--accent)]">{messages.actions.openCalculator}</span>
    </Link>
  );
}
