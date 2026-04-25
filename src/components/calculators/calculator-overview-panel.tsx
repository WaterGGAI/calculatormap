import type { Calculator, CalculatorCategory } from "@/lib/calculators/types";
import { defaultLocale, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { getCalculatorVisualTheme, type CalculatorVisualMotif, type CalculatorVisualTheme } from "@/lib/calculator-visuals";
import { localizeVisualTheme } from "@/lib/localized-content";
import { cn } from "@/lib/utils";

function humanizeFormulaType(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function VisualSeal({
  code,
  shellClass,
  innerClass,
  labelClass
}: {
  code: string;
  shellClass: string;
  innerClass: string;
  labelClass: string;
}) {
  return (
    <span className={cn("relative flex size-12 shrink-0 items-center justify-center rounded-full border", shellClass)} aria-hidden>
      <span className={cn("absolute inset-[4px] rounded-full border", innerClass)} />
      <span className={cn("relative text-[0.58rem] font-semibold uppercase tracking-[0.18em]", labelClass)}>{code}</span>
    </span>
  );
}

function SummaryTile({
  code,
  label,
  value,
  detail,
  visual
}: {
  code: string;
  label: string;
  value: string;
  detail: string;
  visual: CalculatorVisualTheme;
}) {
  return (
    <div className={cn("min-w-0 rounded-md border p-4 transition-transform duration-200 hover:-translate-y-0.5", visual.tileClass)}>
      <div className="flex items-center gap-3">
        <span className={cn("inline-flex size-9 items-center justify-center rounded-full border text-[0.58rem] font-semibold uppercase tracking-[0.18em]", visual.tileSealClass)}>
          {code}
        </span>
        <p className="min-w-0 break-words text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">{label}</p>
      </div>
      <p className="mt-4 break-words text-2xl font-bold tracking-tight text-[var(--ink)]">{value}</p>
      <p className="mt-2 break-words text-sm leading-6 text-[var(--ink-muted)]">{detail}</p>
    </div>
  );
}

function CategoryMotif({ motif, locale }: { motif: CalculatorVisualMotif; locale: AppLocale }) {
  const motifShell = "pointer-events-none absolute bottom-5 right-5 hidden w-48 text-white/70 sm:block";
  const labels =
    locale === "zh-TW"
      ? { steady: "穩定", from: "起始", to: "目標", sum: "總和" }
      : { steady: "steady", from: "from", to: "to", sum: "sum" };

  if (motif === "finance") {
    return (
      <div className={motifShell} aria-hidden>
        <div className="grid gap-2 rounded-md border border-white/12 bg-black/12 p-3 backdrop-blur-[1px]">
          {[32, 58, 45, 72].map((width, index) => (
            <div className="flex items-center gap-2" key={width}>
              <span className="size-2 rounded-full bg-white/55" />
              <span className="h-px flex-1 bg-white/18" />
              <span className="h-2 rounded-full bg-white/50" style={{ width: `${width}%` }} />
              <span className="text-[0.55rem] font-semibold tabular-nums text-white/55">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (motif === "health") {
    return (
      <div className={cn(motifShell, "w-56")} aria-hidden>
        <div className="relative h-24">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/24" />
          <div className="absolute left-3 top-[2.85rem] h-7 w-7 rounded-full border border-white/28" />
          <div className="absolute left-10 top-[2.75rem] h-px w-10 -rotate-[18deg] bg-white/65" />
          <div className="absolute left-[4.7rem] top-[1.35rem] h-14 w-px rotate-[18deg] bg-white/65" />
          <div className="absolute left-[5.65rem] top-[2.82rem] h-px w-10 -rotate-[22deg] bg-white/65" />
          <div className="absolute left-[8.2rem] top-[2.15rem] size-3 rounded-full bg-white/60" />
          <div className="absolute bottom-0 right-0 rounded-md border border-white/14 bg-white/10 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em]">
            {labels.steady}
          </div>
        </div>
      </div>
    );
  }

  if (motif === "home") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="grid gap-2 rounded-md border border-white/12 bg-black/12 p-3">
          <div className="flex h-5 items-end gap-1">
            {Array.from({ length: 18 }).map((_, index) => (
              <span className="w-px bg-white/45" key={index} style={{ height: index % 5 === 0 ? "100%" : index % 2 === 0 ? "70%" : "45%" }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="h-10 rounded-sm border border-white/18 bg-white/8" />
            <span className="h-10 rounded-sm border border-white/18 bg-white/14" />
            <span className="h-10 rounded-sm border border-white/18 bg-white/8" />
          </div>
        </div>
      </div>
    );
  }

  if (motif === "route") {
    return (
      <div className={cn(motifShell, "w-56")} aria-hidden>
        <div className="relative h-28">
          <div className="absolute left-3 top-5 h-20 w-40 rounded-[2rem] border border-white/28" />
          <div className="absolute left-9 top-10 h-12 w-32 rounded-[2rem] border border-white/40 border-r-transparent" />
          {[
            ["left-2", "top-4"],
            ["left-24", "top-8"],
            ["left-36", "top-20"],
            ["left-48", "top-12"]
          ].map(([left, top]) => (
            <span className={cn("absolute size-3 rounded-full border border-white/60 bg-white/35", left, top)} key={`${left}-${top}`} />
          ))}
        </div>
      </div>
    );
  }

  if (motif === "calendar" || motif === "timer") {
    return (
      <div className={cn(motifShell, "w-48")} aria-hidden>
        <div className="relative ml-auto size-36 rounded-full border border-white/20">
          <div className="absolute inset-5 rounded-full border border-white/28" />
          <div className="absolute inset-12 rounded-full bg-white/14" />
          <span className="absolute left-1/2 top-2 h-4 w-px -translate-x-1/2 bg-white/50" />
          <span className="absolute bottom-2 left-1/2 h-4 w-px -translate-x-1/2 bg-white/50" />
          <span className="absolute left-2 top-1/2 h-px w-4 -translate-y-1/2 bg-white/50" />
          <span className="absolute right-2 top-1/2 h-px w-4 -translate-y-1/2 bg-white/50" />
          <span className="absolute left-1/2 top-1/2 h-px w-12 origin-left -translate-y-1/2 rotate-[-35deg] bg-white/60" />
        </div>
      </div>
    );
  }

  if (motif === "writing") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="grid gap-3 rounded-md border border-white/12 bg-black/12 p-3">
          {[82, 54, 92, 38].map((width) => (
            <span className="h-2 rounded-full bg-white/35" style={{ width: `${width}%` }} key={width} />
          ))}
          <span className="h-8 rounded-sm border border-white/14 bg-white/8" />
        </div>
      </div>
    );
  }

  if (motif === "circuit") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="grid grid-cols-4 gap-3 rounded-md border border-white/12 bg-black/12 p-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <span className={cn("relative size-7 rounded-full border border-white/18", index % 3 === 0 ? "bg-white/18" : "bg-white/8")} key={index}>
              <span className="absolute left-full top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (motif === "scoreboard") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="grid grid-cols-2 gap-3 rounded-md border border-white/12 bg-black/12 p-3">
          {["AVG", "ERA", "RUN", "OUT"].map((label, index) => (
            <div className="rounded-sm border border-white/14 bg-white/8 p-3" key={label}>
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-white">{index + 2}.{index + 4}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (motif === "focus") {
    return (
      <div className={cn(motifShell, "w-48")} aria-hidden>
        <div className="relative ml-auto size-36">
          <span className="absolute left-0 top-0 size-10 border-l border-t border-white/55" />
          <span className="absolute right-0 top-0 size-10 border-r border-t border-white/55" />
          <span className="absolute bottom-0 left-0 size-10 border-b border-l border-white/55" />
          <span className="absolute bottom-0 right-0 size-10 border-b border-r border-white/55" />
          <span className="absolute inset-10 rounded-full border border-white/22" />
        </div>
      </div>
    );
  }

  if (motif === "converter") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="grid gap-2 rounded-md border border-white/12 bg-black/12 p-3">
          <div className="flex items-center justify-between rounded-sm border border-white/14 bg-white/8 px-3 py-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em]">{labels.from}</span>
            <span className="text-lg font-bold">kg</span>
          </div>
          <div className="mx-auto h-5 w-px bg-white/35" />
          <div className="flex items-center justify-between rounded-sm border border-white/14 bg-white/14 px-3 py-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em]">{labels.to}</span>
            <span className="text-lg font-bold">lb</span>
          </div>
        </div>
      </div>
    );
  }

  if (motif === "equation") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="flex flex-wrap justify-end gap-2">
          {["%", "x", "=", "+", "1.25", labels.sum].map((token) => (
            <span className="rounded-md border border-white/14 bg-white/10 px-3 py-2 text-sm font-bold text-white/80" key={token}>
              {token}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (motif === "choice") {
    return (
      <div className={cn(motifShell, "w-52")} aria-hidden>
        <div className="grid gap-3 rounded-md border border-white/12 bg-black/12 p-3">
          {[72, 46, 88].map((width, index) => (
            <div className="flex items-center gap-3" key={width}>
              <span className="size-4 rounded-full border border-white/32 bg-white/12" />
              <span className="h-2 flex-1 rounded-full bg-white/18">
                <span className="block h-2 rounded-full bg-white/50" style={{ width: `${width}%` }} />
              </span>
              <span className="text-[0.58rem] font-semibold tabular-nums text-white/55">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(motifShell, "w-52")} aria-hidden>
      <div className="grid grid-cols-5 gap-2 rounded-md border border-white/12 bg-black/12 p-3">
        {Array.from({ length: 15 }).map((_, index) => (
          <span className={cn("h-8 rounded-sm border border-white/12", index % 4 === 0 ? "bg-white/18" : "bg-white/8")} key={index} />
        ))}
      </div>
    </div>
  );
}

export function CalculatorOverviewPanel({
  calculator,
  category,
  locale = defaultLocale
}: {
  calculator: Calculator;
  category: CalculatorCategory | null | undefined;
  locale?: AppLocale;
}) {
  const messages = getLocaleMessages(locale);
  const visual = localizeVisualTheme(getCalculatorVisualTheme(category), category?.slug, locale);
  const fieldLabels = calculator.fields.slice(0, 2).map((field) => field.label).join(" · ");
  const resultLabels = calculator.results.slice(0, 2).map((result) => result.label).join(" · ");
  const modelValue = locale === defaultLocale ? humanizeFormulaType(calculator.formulaType) : calculator.name.replace(/計算器$/, "");
  const summaryItems = [
    {
      code: "IN",
      label: messages.common.inputs,
      value: `${calculator.fields.length}`,
      detail: fieldLabels || messages.common.inputs
    },
    {
      code: "OUT",
      label: messages.common.outputs,
      value: `${calculator.results.length}`,
      detail: resultLabels || messages.common.outputs
    },
    {
      code: "MOD",
      label: messages.common.model,
      value: modelValue,
      detail: category?.description ?? messages.common.standaloneUtility
    },
    {
      code: "REL",
      label: messages.common.related,
      value: `${calculator.relatedSlugs.length}`,
      detail: calculator.relatedSlugs.length > 0 ? messages.common.connectedRelated : messages.common.standaloneUtility
    }
  ];

  return (
    <section className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
      <div className={cn("relative min-h-[18rem] overflow-hidden rounded-md border", visual.panelClass)}>
        <img alt={visual.imageAlt} className={cn("absolute inset-0 size-full object-cover", visual.imagePositionClass)} src={visual.imageUrl} />
        <div className={cn("absolute inset-0", visual.overlayClass)} />
        <div className="noise absolute inset-0 opacity-20" />
        <CategoryMotif locale={locale} motif={visual.motif} />
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <VisualSeal
              code={visual.code}
              innerClass={visual.sealInnerClass}
              labelClass={visual.sealLabelClass}
              shellClass={visual.sealClass}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/78">{visual.eyebrow}</p>
          </div>

          <div className="max-w-lg">
            <p className={cn("text-sm font-semibold uppercase tracking-[0.18em]", visual.accentTextClass)}>{category?.name ?? (locale === "zh-TW" ? "計算器" : "Calculator")}</p>
            <p className="mt-3 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">{visual.statement}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {visual.tags.map((tag) => (
              <span className={cn("rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]", visual.chipClass)} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 grid gap-3 sm:grid-cols-2">
        {summaryItems.map((item) => (
          <SummaryTile code={item.code} detail={item.detail} key={item.label} label={item.label} value={item.value} visual={visual} />
        ))}
      </div>
    </section>
  );
}

export function CalculatorSectionHeading({
  code,
  title,
  detail,
  category,
  locale = defaultLocale
}: {
  code: string;
  title: string;
  detail?: string;
  category?: CalculatorCategory | null;
  locale?: AppLocale;
}) {
  const visual = localizeVisualTheme(getCalculatorVisualTheme(category), category?.slug, locale);

  return (
    <div className="flex items-start gap-3">
      <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full border text-[0.58rem] font-semibold uppercase tracking-[0.18em]", visual.sectionSealClass)}>
        {code}
      </span>
      <div className="min-w-0">
        <h2 className="break-words text-2xl font-bold">{title}</h2>
        {detail ? <p className="mt-2 break-words text-sm leading-6 text-[var(--ink-muted)]">{detail}</p> : null}
      </div>
    </div>
  );
}
