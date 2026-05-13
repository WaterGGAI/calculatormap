"use client";

import { useEffect, useMemo, useState } from "react";
import type { Calculator, CalculatorValues } from "@/lib/calculators/types";
import { calculate, formatResult } from "@/lib/calculators/formula-engine";
import { Button } from "@/components/ui/button";
import { FieldHint, FieldLabel, Input, Select, Textarea } from "@/components/ui/field";
import { getCalculatorPresets, type CalculatorPreset } from "@/lib/calculator-presets";
import { defaultLocale, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { translateCalculatorError } from "@/lib/localized-content";

type CalculatorRendererProps = {
  calculator: Calculator;
  locale?: AppLocale;
};

type ScenarioSlot = "A" | "B";

type ScenarioSnapshot = {
  label: string;
  values: CalculatorValues;
  resultLabel: string;
  resultValue: string;
  rawValue: number | string | undefined;
  hasErrors: boolean;
  errorText: string;
};

function initialValues(calculator: Calculator): CalculatorValues {
  return Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue ?? ""]));
}

function getInputMode(field: Calculator["fields"][number]) {
  if (field.type !== "number") {
    return undefined;
  }

  const step = field.step ?? null;

  if (typeof step === "number" && Number.isInteger(step)) {
    return "numeric";
  }

  return "decimal";
}

export function CalculatorRenderer({ calculator, locale = defaultLocale }: CalculatorRendererProps) {
  const [values, setValues] = useState<CalculatorValues>(() => initialValues(calculator));
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [linkCopyState, setLinkCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [scenarios, setScenarios] = useState<Partial<Record<ScenarioSlot, ScenarioSnapshot>>>({});
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const messages = getLocaleMessages(locale);
  const liveLabel = locale === "zh-TW" ? "即時計算" : "Live result";
  const inputLabel = locale === "zh-TW" ? "輸入數值" : "Inputs";
  const helperLabel = locale === "zh-TW" ? "結果會隨輸入更新。" : "Results update as you type.";
  const inputStatusLabel = locale === "zh-TW" ? "輸入進度" : "Input status";
  const copyLabel = locale === "zh-TW" ? "複製結果" : "Copy result";
  const copiedLabel = locale === "zh-TW" ? "已複製" : "Copied";
  const copyErrorLabel = locale === "zh-TW" ? "複製失敗" : "Copy failed";
  const copyLinkLabel = locale === "zh-TW" ? "複製設定連結" : "Copy setup link";
  const linkCopiedLabel = locale === "zh-TW" ? "連結已複製" : "Link copied";
  const insightTitle = locale === "zh-TW" ? "快速檢查" : "Quick check";
  const insightText =
    locale === "zh-TW"
      ? "改一兩個輸入值比較第二個情境，再把結果拿去做決策。"
      : "Change one or two inputs to compare a second scenario before using the number.";
  const compareLabels =
    locale === "zh-TW"
      ? {
          title: "情境比較",
          detail: "先存情境 A，改幾個輸入後再存情境 B。",
          saveA: "存為 A",
          saveB: "存為 B",
          load: "載入",
          empty: "尚未儲存",
          current: "目前輸入",
          fixErrors: "修正錯誤後才能儲存情境。",
          delta: "B - A 差異",
          ready: "已可比較",
          scenario: "情境"
        }
      : {
          title: "Scenario compare",
          detail: "Save scenario A, change a few inputs, then save scenario B.",
          saveA: "Save as A",
          saveB: "Save as B",
          load: "Load",
          empty: "Not saved yet",
          current: "Current inputs",
          fixErrors: "Fix errors before saving a scenario.",
          delta: "B - A difference",
          ready: "Ready to compare",
          scenario: "Scenario"
        };
  const presetLabels =
    locale === "zh-TW"
      ? {
          title: "快速情境",
          detail: "點一個常見情境，表單會直接套用數值。",
          apply: "套用",
          active: "已套用"
        }
      : {
          title: "Quick scenarios",
          detail: "Pick a common setup and the inputs fill in instantly.",
          apply: "Apply",
          active: "Applied"
        };

  const output = useMemo(() => calculate(calculator, values), [calculator, values]);
  const presets = useMemo(() => getCalculatorPresets(calculator.slug, locale), [calculator.slug, locale]);
  const requiredFields = calculator.fields.filter((field) => field.required !== false);
  const completedFields = requiredFields.filter((field) => String(values[field.key] ?? "").trim().length > 0);
  const inputProgress = requiredFields.length > 0 ? Math.round((completedFields.length / requiredFields.length) * 100) : 100;
  const formattedResults = calculator.results.map((result) => ({
    ...result,
    formattedValue: formatResult(result, output.values[result.key])
  }));
  const formattedPrimary = formattedResults[0];
  const formattedSecondary = formattedResults.slice(1);
  const canSaveScenario = Boolean(formattedPrimary) && output.errors.length === 0;
  const scenarioA = scenarios.A;
  const scenarioB = scenarios.B;
  const scenarioDelta =
    scenarioA && scenarioB && typeof scenarioA.rawValue === "number" && typeof scenarioB.rawValue === "number" && formattedPrimary
      ? formatResult(formattedPrimary, scenarioB.rawValue - scenarioA.rawValue)
      : null;
  const summaryText = [
    calculator.name,
    output.errors.length > 0
      ? output.errors.map((error) => translateCalculatorError(error, locale)).join("\n")
      : formattedResults.map((result) => `${result.label}: ${result.formattedValue}`).join("\n")
  ]
    .filter(Boolean)
    .join("\n");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hydratedValues = initialValues(calculator);
    let hasSharedValue = false;
    let cancelled = false;

    for (const field of calculator.fields) {
      if (params.has(field.key)) {
        hydratedValues[field.key] = params.get(field.key) ?? "";
        hasSharedValue = true;
      }
    }

    if (hasSharedValue) {
      queueMicrotask(() => {
        if (!cancelled) {
          setValues(hydratedValues);
          setActivePresetId(null);
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [calculator]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 1600);
    }
  }

  function buildSetupUrl() {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";

    for (const field of calculator.fields) {
      const value = values[field.key];
      if (String(value ?? "").trim().length > 0) {
        url.searchParams.set(field.key, value);
      }
    }

    return url.toString();
  }

  async function copySetupLink() {
    try {
      await navigator.clipboard.writeText(buildSetupUrl());
      setLinkCopyState("copied");
      window.setTimeout(() => setLinkCopyState("idle"), 1600);
    } catch {
      setLinkCopyState("error");
      window.setTimeout(() => setLinkCopyState("idle"), 1600);
    }
  }

  function saveScenario(slot: ScenarioSlot) {
    if (!formattedPrimary || !canSaveScenario) {
      return;
    }

    setScenarios((current) => ({
      ...current,
      [slot]: {
        label: `${compareLabels.current} ${slot}`,
        values: { ...values },
        resultLabel: formattedPrimary.label,
        resultValue: formattedPrimary.formattedValue,
        rawValue: output.values[formattedPrimary.key],
        hasErrors: output.errors.length > 0,
        errorText: output.errors.map((error) => translateCalculatorError(error, locale)).join(" ")
      }
    }));
  }

  function loadScenario(snapshot: ScenarioSnapshot) {
    setValues({ ...snapshot.values });
    setActivePresetId(null);
  }

  function applyPreset(preset: CalculatorPreset) {
    setValues((current) => ({ ...current, ...preset.values }));
    setActivePresetId(preset.id);
  }

  function updateFieldValue(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setActivePresetId(null);
  }

  return (
    <section
      className="overflow-hidden rounded-md border border-[#cfd8d2] bg-[var(--surface)] shadow-[0_24px_70px_-42px_rgba(20,38,33,0.42)]"
      aria-label={`${calculator.name} form`}
    >
      <div className="flex flex-col justify-between gap-2 border-b border-[var(--line)] bg-[#f4f8f5] px-4 py-4 sm:flex-row sm:items-end sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{inputLabel}</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--ink)]">{calculator.name}</h2>
        </div>
        <p className="text-sm leading-6 text-[var(--ink-muted)]">{helperLabel}</p>
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.66fr)]">
        <form
          className="p-4 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="mb-5 rounded-md border border-[var(--line)] bg-[#f8faf8] p-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">{inputStatusLabel}</p>
              <p className="text-xs font-bold tabular-nums text-[var(--accent-strong)]">
                {completedFields.length}/{requiredFields.length || calculator.fields.length}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#dfe8e3]">
              <span
                className="block h-full rounded-full bg-[var(--accent)] transition-[width] duration-300"
                style={{ width: `${inputProgress}%` }}
              />
            </div>
          </div>
          {presets.length > 0 ? (
            <div className="mb-5 rounded-md border border-[var(--line)] bg-[#f8faf8] p-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{presetLabels.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">{presetLabels.detail}</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 xl:grid-cols-3">
                {presets.map((preset) => {
                  const isActive = activePresetId === preset.id;

                  return (
                    <button
                      className="rounded-md border border-[var(--line)] bg-white p-3 text-left transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] disabled:opacity-60 active:scale-[0.98]"
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                    >
                      <span className="block text-sm font-bold text-[var(--ink)]">{preset.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-[var(--ink-muted)]">{preset.detail}</span>
                      <span className="mt-3 inline-flex rounded-full border border-[#cfe2db] bg-[#eef7f3] px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#0d6359]">
                        {isActive ? presetLabels.active : presetLabels.apply}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            {calculator.fields.map((field, index) => (
              <div className={field.type === "textarea" ? "flex flex-col gap-2 sm:col-span-2" : "flex flex-col gap-2"} key={field.key}>
                <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
                <div className="flex min-h-12 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)] transition-colors focus-within:border-[var(--accent)]">
                  {field.type === "select" ? (
                    <Select
                      className="min-w-0 flex-1 border-0 text-base sm:text-sm focus:border-0"
                      id={field.key}
                      name={field.key}
                      required={field.required}
                      value={values[field.key] ?? ""}
                      onChange={(event) => updateFieldValue(field.key, event.target.value)}
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  ) : field.type === "textarea" ? (
                    <Textarea
                      className="min-w-0 flex-1 border-0 text-base sm:text-sm focus:border-0"
                      enterKeyHint={index === calculator.fields.length - 1 ? "done" : "next"}
                      id={field.key}
                      name={field.key}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={values[field.key] ?? ""}
                      onChange={(event) => updateFieldValue(field.key, event.target.value)}
                    />
                  ) : (
                    <Input
                      autoComplete="off"
                      className="min-w-0 flex-1 border-0 text-base sm:text-sm focus:border-0"
                      enterKeyHint={index === calculator.fields.length - 1 ? "done" : "next"}
                      id={field.key}
                      inputMode={getInputMode(field)}
                      name={field.key}
                      type={field.type === "text" ? "text" : "number"}
                      placeholder={field.placeholder}
                      required={field.required}
                      min={field.min}
                      max={field.max}
                      step={field.step ?? "any"}
                      value={values[field.key] ?? ""}
                      onChange={(event) => updateFieldValue(field.key, event.target.value)}
                    />
                  )}
                  {field.unit ? (
                    <span className="flex min-w-14 shrink-0 items-center justify-center border-l border-[var(--line)] bg-[var(--surface-muted)] px-3 text-sm font-semibold text-[var(--ink-muted)] sm:min-w-16">
                      {field.unit}
                    </span>
                  ) : null}
                </div>
                {field.helpText ? <FieldHint>{field.helpText}</FieldHint> : null}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button className="w-full active:scale-[0.98] sm:w-auto" type="submit">{messages.calculatorPage.calculate}</Button>
            <Button
              className="w-full sm:w-auto"
              type="button"
              variant="secondary"
              onClick={() => {
                const resetValues = initialValues(calculator);
                setValues(resetValues);
                setActivePresetId(null);
              }}
            >
              {messages.calculatorPage.reset}
            </Button>
          </div>
        </form>

        <div className="border-t border-[#233b36] bg-[#102420] p-4 text-white sm:p-6 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-t-0">
          <div className="flex flex-wrap items-center justify-between gap-3" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a8ddd4]">{liveLabel}</p>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-[#c8d8d4] transition-colors hover:border-[#a8ddd4] hover:text-white active:scale-[0.98]"
                type="button"
                onClick={copySetupLink}
              >
                {linkCopyState === "copied" ? linkCopiedLabel : linkCopyState === "error" ? copyErrorLabel : copyLinkLabel}
              </button>
              <button
                className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-[#c8d8d4] transition-colors hover:border-[#a8ddd4] hover:text-white active:scale-[0.98]"
                type="button"
                onClick={copySummary}
              >
                {copyState === "copied" ? copiedLabel : copyState === "error" ? copyErrorLabel : copyLabel}
              </button>
            </div>
          </div>
        {output.errors.length > 0 ? (
          <div className="mt-4 rounded-md border border-[#e9b6ad] bg-[#3b1611] p-3 text-sm text-[#ffe2dd]">
            {output.errors.map((error) => (
              <p key={error}>{translateCalculatorError(error, locale)}</p>
            ))}
          </div>
        ) : null}

        {formattedPrimary ? (
          <div className="mt-5 rounded-md border border-white/12 bg-white/[0.08] p-4">
            <p className="text-sm text-[#bfcec9]">{formattedPrimary.label}</p>
            <p className="mt-2 break-words text-4xl font-bold tracking-tight text-white">{formattedPrimary.formattedValue}</p>
            {formattedPrimary.description ? <p className="mt-2 text-sm leading-6 text-[#bfcec9]">{formattedPrimary.description}</p> : null}
          </div>
        ) : null}

        {formattedSecondary.length > 0 ? (
          <div className="mt-3 grid gap-3">
            {formattedSecondary.map((result) => (
              <div key={result.key} className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.045] p-3">
                <p className="min-w-0 text-sm leading-6 text-[#bfcec9]">{result.label}</p>
                <p className="shrink-0 text-right text-lg font-bold text-white">{result.formattedValue}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-4 rounded-md border border-white/10 bg-white/[0.045] p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8ddd4]">{compareLabels.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#bfcec9]">{compareLabels.detail}</p>
            </div>
            {scenarioDelta ? (
              <span className="shrink-0 rounded-full border border-[#a8ddd4]/35 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#d8fff8]">
                {compareLabels.ready}
              </span>
            ) : null}
          </div>
          {!canSaveScenario ? <p className="mt-3 rounded-md border border-[#e9b6ad]/35 bg-[#3b1611]/50 p-2 text-xs text-[#ffe2dd]">{compareLabels.fixErrors}</p> : null}
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              className="min-h-10 rounded-md border border-white/12 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-[#a8ddd4] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98]"
              disabled={!canSaveScenario}
              type="button"
              onClick={() => saveScenario("A")}
            >
              {compareLabels.saveA}
            </button>
            <button
              className="min-h-10 rounded-md border border-white/12 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-[#a8ddd4] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98]"
              disabled={!canSaveScenario}
              type="button"
              onClick={() => saveScenario("B")}
            >
              {compareLabels.saveB}
            </button>
          </div>
          <div className="mt-3 grid gap-2">
            {(["A", "B"] as const).map((slot) => {
              const snapshot = scenarios[slot];

              return (
                <div className="rounded-md border border-white/10 bg-[#0c1d1a] p-3" key={slot}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#a8ddd4]">{compareLabels.scenario} {slot}</p>
                      {snapshot ? (
                        <>
                          <p className="mt-2 text-sm text-[#bfcec9]">{snapshot.resultLabel}</p>
                          <p className="mt-1 break-words text-xl font-bold text-white">{snapshot.hasErrors ? snapshot.errorText : snapshot.resultValue}</p>
                        </>
                      ) : (
                        <p className="mt-2 text-sm text-[#bfcec9]">{compareLabels.empty}</p>
                      )}
                    </div>
                    {snapshot ? (
                      <button
                        className="shrink-0 rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-[#c8d8d4] transition-colors hover:border-[#a8ddd4] hover:text-white active:scale-[0.98]"
                        type="button"
                        onClick={() => loadScenario(snapshot)}
                      >
                        {compareLabels.load}
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          {scenarioDelta ? (
            <div className="mt-3 rounded-md border border-[#a8ddd4]/25 bg-[#12312b] p-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#a8ddd4]">{compareLabels.delta}</p>
              <p className="mt-1 break-words text-xl font-bold text-white">{scenarioDelta}</p>
            </div>
          ) : null}
        </div>
        <div className="mt-4 rounded-md border border-white/10 bg-white/[0.045] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8ddd4]">{insightTitle}</p>
          <p className="mt-2 text-sm leading-6 text-[#bfcec9]">{insightText}</p>
        </div>
        </div>
      </div>
    </section>
  );
}
