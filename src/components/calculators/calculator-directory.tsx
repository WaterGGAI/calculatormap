"use client";

import { useMemo, useState } from "react";
import type { Calculator } from "@/lib/calculators/types";
import { categories } from "@/lib/data";
import { defaultLocale, type AppLocale } from "@/lib/i18n";
import { localizeCalculator, localizeCategory } from "@/lib/localized-content";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { cn } from "@/lib/utils";

export function CalculatorDirectory({
  calculators,
  locale = defaultLocale
}: {
  calculators: Calculator[];
  locale?: AppLocale;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const labels =
    locale === "zh-TW"
      ? {
          all: "全部",
          search: "搜尋計算器",
          placeholder: "搜尋 ROI、薪資、油耗、BMI...",
          result: "個工具",
          emptyTitle: "沒有符合的計算器",
          emptyDetail: "換一個關鍵字或切回全部分類。"
        }
      : {
          all: "All",
          search: "Search calculators",
          placeholder: "Search ROI, salary, fuel, BMI...",
          result: "tools",
          emptyTitle: "No matching calculators",
          emptyDetail: "Try another keyword or switch back to all categories."
        };

  const localizedCategories = categories.map((category) => localizeCategory(category, locale));
  const directoryItems = useMemo(
    () =>
      calculators.map((calculator) => {
        const localizedCalculator = localizeCalculator(calculator, locale);
        const category = categories.find((item) => item.id === calculator.categoryId);
        const localizedCategory = category ? localizeCategory(category, locale) : null;

        return {
          calculator,
          localizedCalculator,
          categorySlug: category?.slug ?? "uncategorized",
          categoryName: localizedCategory?.name ?? "",
          searchText: [
            localizedCalculator.name,
            localizedCalculator.shortDescription,
            localizedCalculator.h1,
            localizedCategory?.name,
            calculator.slug
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
        };
      }),
    [calculators, locale]
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = directoryItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.categorySlug === activeCategory;
    const matchesQuery = normalizedQuery === "" || item.searchText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <section className="mt-8">
      <div className="rounded-md border border-[#cfd8d2] bg-[var(--surface)] p-4 shadow-[0_18px_60px_-42px_rgba(20,38,33,0.4)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(10rem,0.2fr)] lg:items-end">
          <label className="block">
            <span className="text-sm font-semibold text-[var(--ink)]">{labels.search}</span>
            <input
              className="mt-2 min-h-12 w-full rounded-md border border-[var(--line)] bg-[#f8faf8] px-4 text-base text-[var(--ink)] outline-offset-2 placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)]"
              placeholder={labels.placeholder}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="rounded-md border border-[var(--line)] bg-[#f8faf8] px-4 py-3">
            <p className="text-3xl font-bold tracking-tight text-[var(--ink)]">{filteredItems.length}</p>
            <p className="text-sm text-[var(--ink-muted)]">{labels.result}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            className={cn(
              "min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors",
              activeCategory === "all"
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--line)] bg-white text-[var(--ink-muted)] hover:border-[var(--accent)]"
            )}
            type="button"
            onClick={() => setActiveCategory("all")}
          >
            {labels.all}
          </button>
          {localizedCategories.map((category) => (
            <button
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors",
                activeCategory === category.slug
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--line)] bg-white text-[var(--ink-muted)] hover:border-[var(--accent)]"
              )}
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <CalculatorCard calculator={item.calculator} key={item.calculator.slug} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-md border border-dashed border-[var(--line)] bg-[var(--surface)] p-8 text-center">
          <p className="text-xl font-bold text-[var(--ink)]">{labels.emptyTitle}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{labels.emptyDetail}</p>
        </div>
      )}
    </section>
  );
}
