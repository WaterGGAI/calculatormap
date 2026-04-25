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
  const [submittedValues, setSubmittedValues] = useState<CalculatorValues>(() => initialValues(calculator));
  const [submitted, setSubmitted] = useState(false);
  const messages = getLocaleMessages(locale);

  const output = useMemo(() => calculate(calculator, submitted ? submittedValues : values), [calculator, submitted, submittedValues, values]);

  return (
    <section className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]" aria-label={`${calculator.name} form`}>
      <form
        className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmittedValues(values);
          setSubmitted(true);
        }}
      >
        <div className="flex flex-col gap-5">
          {calculator.fields.map((field, index) => (
            <div className="flex flex-col gap-2" key={field.key}>
              <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
              <div className="flex min-h-11 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)] focus-within:border-[var(--accent)]">
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
        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <Button className="w-full sm:w-auto" type="submit">{messages.calculatorPage.calculate}</Button>
          <Button
            className="w-full sm:w-auto"
            type="button"
            variant="secondary"
            onClick={() => {
              const resetValues = initialValues(calculator);
              setValues(resetValues);
              setSubmittedValues(resetValues);
              setSubmitted(false);
            }}
          >
            {messages.calculatorPage.reset}
          </Button>
        </div>
      </form>

      <div className="rounded-md border border-[var(--line)] bg-[#102420] p-4 text-white shadow-sm sm:p-6">
        <p className="text-sm font-semibold text-[#a8ddd4]">{messages.calculatorPage.result}</p>
        {submitted && output.errors.length > 0 ? (
          <div className="mt-4 rounded-md border border-[#e9b6ad] bg-[#3b1611] p-3 text-sm text-[#ffe2dd]">
            {output.errors.map((error) => (
              <p key={error}>{translateCalculatorError(error, locale)}</p>
            ))}
          </div>
        ) : null}
        <div className="mt-5 grid gap-3">
          {calculator.results.map((result) => (
            <div key={result.key} className="rounded-md border border-white/14 bg-white/8 p-4">
              <p className="text-sm text-[#bfcec9]">{result.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{formatResult(result, output.values[result.key])}</p>
              {result.description ? <p className="mt-2 text-sm leading-6 text-[#bfcec9]">{result.description}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
