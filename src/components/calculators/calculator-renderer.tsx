"use client";

import { useMemo, useState } from "react";
import type { Calculator, CalculatorValues } from "@/lib/calculators/types";
import { calculate, formatResult } from "@/lib/calculators/formula-engine";
import { Button } from "@/components/ui/button";
import { FieldHint, FieldLabel, Input, Select, Textarea } from "@/components/ui/field";
import { defaultLocale, getLocaleMessages, type AppLocale } from "@/lib/i18n";
import { translateCalculatorError } from "@/lib/localized-content";

type CalculatorRendererProps = {
  calculator: Calculator;
  locale?: AppLocale;
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
  const messages = getLocaleMessages(locale);
  const primaryResult = calculator.results[0];
  const secondaryResults = calculator.results.slice(1);
  const liveLabel = locale === "zh-TW" ? "即時計算" : "Live result";
  const inputLabel = locale === "zh-TW" ? "輸入數值" : "Inputs";
  const helperLabel = locale === "zh-TW" ? "結果會隨輸入更新。" : "Results update as you type.";

  const output = useMemo(() => calculate(calculator, values), [calculator, values]);

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
                    onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
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
                    onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
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
                    onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
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
            }}
          >
            {messages.calculatorPage.reset}
          </Button>
        </div>
      </form>

        <div className="border-t border-[#233b36] bg-[#102420] p-4 text-white sm:p-6 lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a8ddd4]">{liveLabel}</p>
          <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-[#c8d8d4]">{messages.calculatorPage.result}</span>
        </div>
        {output.errors.length > 0 ? (
          <div className="mt-4 rounded-md border border-[#e9b6ad] bg-[#3b1611] p-3 text-sm text-[#ffe2dd]">
            {output.errors.map((error) => (
              <p key={error}>{translateCalculatorError(error, locale)}</p>
            ))}
          </div>
        ) : null}

        {primaryResult ? (
          <div className="mt-5 rounded-md border border-white/12 bg-white/[0.08] p-4">
            <p className="text-sm text-[#bfcec9]">{primaryResult.label}</p>
            <p className="mt-2 break-words text-4xl font-bold tracking-tight text-white">{formatResult(primaryResult, output.values[primaryResult.key])}</p>
            {primaryResult.description ? <p className="mt-2 text-sm leading-6 text-[#bfcec9]">{primaryResult.description}</p> : null}
          </div>
        ) : null}

        {secondaryResults.length > 0 ? (
          <div className="mt-3 grid gap-3">
            {secondaryResults.map((result) => (
              <div key={result.key} className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.045] p-3">
                <p className="min-w-0 text-sm leading-6 text-[#bfcec9]">{result.label}</p>
                <p className="shrink-0 text-right text-lg font-bold text-white">{formatResult(result, output.values[result.key])}</p>
              </div>
            ))}
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}
