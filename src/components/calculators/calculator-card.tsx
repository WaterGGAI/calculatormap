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

  return (
    <Link
      className="group flex min-h-48 flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition-transform hover:-translate-y-1 hover:border-[var(--accent)]"
      href={localizeHref(locale, `/calculator/${calculator.slug}`)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Badge tone="neutral">{localizedCategory?.name ?? messages.common.category}</Badge>
          <span className="text-xs font-semibold text-[var(--ink-muted)]">{localizedCalculator.updatedAt}</span>
        </div>
        <h2 className="text-xl font-bold group-hover:text-[var(--accent-strong)]">{localizedCalculator.name}</h2>
        <p className="text-sm leading-6 text-[var(--ink-muted)]">{localizedCalculator.shortDescription}</p>
      </div>
      <span className="mt-5 text-sm font-bold text-[var(--accent)]">{messages.actions.openCalculator}</span>
    </Link>
  );
}
