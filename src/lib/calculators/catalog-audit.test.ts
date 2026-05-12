import assert from "node:assert/strict";
import test from "node:test";
import { calculators, categories } from "../data";
import { calculate } from "./formula-engine";

function buildDefaultValues(calculator: (typeof calculators)[number]) {
  return Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue ?? ""]));
}

function getNonFiniteResults(values: Record<string, number | string>) {
  return Object.entries(values).filter(([, value]) => typeof value === "number" && !Number.isFinite(value));
}

function getDuplicateValues(values: Array<number | string>) {
  const seen = new Set<number | string>();
  const duplicates = new Set<number | string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return Array.from(duplicates);
}

test("calculator catalog schema references stay internally consistent", () => {
  const categoryIds = new Set(categories.map((category) => category.id));
  const calculatorSlugs = new Set(calculators.map((calculator) => calculator.slug));
  const failures = [
    ...getDuplicateValues(categories.map((category) => category.id)).map((id) => `category id ${id}: duplicated`),
    ...getDuplicateValues(categories.map((category) => category.slug)).map((slug) => `category slug ${slug}: duplicated`),
    ...getDuplicateValues(calculators.map((calculator) => calculator.id)).map((id) => `calculator id ${id}: duplicated`),
    ...getDuplicateValues(calculators.map((calculator) => calculator.slug)).map((slug) => `calculator slug ${slug}: duplicated`)
  ];

  for (const calculator of calculators) {
    const fieldKeys = new Set(calculator.fields.map((field) => field.key));
    const resultKeys = new Set(calculator.results.map((result) => result.key));

    if (!categoryIds.has(calculator.categoryId)) {
      failures.push(`${calculator.slug}: unknown category id ${calculator.categoryId}`);
    }

    for (const fieldKey of getDuplicateValues(calculator.fields.map((field) => field.key))) {
      failures.push(`${calculator.slug}: duplicate field key ${fieldKey}`);
    }

    for (const resultKey of getDuplicateValues(calculator.results.map((result) => result.key))) {
      failures.push(`${calculator.slug}: duplicate result key ${resultKey}`);
    }

    for (const relatedSlug of calculator.relatedSlugs) {
      if (!calculatorSlugs.has(relatedSlug)) {
        failures.push(`${calculator.slug}: unknown related calculator ${relatedSlug}`);
      }
    }

    if (calculator.formulaType === "expression") {
      const expressionKeys = new Set(Object.keys(calculator.formulaConfig?.expressions ?? {}));

      for (const result of calculator.results) {
        if (!expressionKeys.has(result.key)) {
          failures.push(`${calculator.slug}: missing expression for result ${result.key}`);
        }
      }

      for (const expressionKey of expressionKeys) {
        if (!resultKeys.has(expressionKey)) {
          failures.push(`${calculator.slug}: expression ${expressionKey} has no matching result`);
        }
      }
    }

    if (calculator.formulaType === "math_expression") {
      const expressionField = calculator.formulaConfig?.expressionField ?? "expression";
      if (!fieldKeys.has(expressionField)) {
        failures.push(`${calculator.slug}: missing expression field ${expressionField}`);
      }
    }

    if (calculator.formulaType === "text_stats" || calculator.formulaType === "number_list_stats") {
      const textField = calculator.formulaConfig?.textField ?? (calculator.formulaType === "text_stats" ? "text" : "numbers");
      if (!fieldKeys.has(textField)) {
        failures.push(`${calculator.slug}: missing text field ${textField}`);
      }
    }

    if (calculator.formulaType === "list_picker") {
      const listField = calculator.formulaConfig?.listField ?? "items";
      if (!fieldKeys.has(listField)) {
        failures.push(`${calculator.slug}: missing list field ${listField}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});

test("all calculators return finite values or explicit errors for their default inputs", () => {
  const failures = calculators.flatMap((calculator) => {
    const output = calculate(calculator, buildDefaultValues(calculator));
    const nonFinite = getNonFiniteResults(output.values);
    const missingResults = calculator.results
      .filter((result) => !(result.key in output.values))
      .map((result) => result.key);

    if (output.errors.length === 0 && nonFinite.length > 0) {
      return [`${calculator.slug}: produced non-finite defaults ${JSON.stringify(nonFinite)}`];
    }

    if (output.errors.length === 0 && missingResults.length > 0) {
      return [`${calculator.slug}: missing default results ${JSON.stringify(missingResults)}`];
    }

    if (output.errors.length > 0) {
      return [`${calculator.slug}: default inputs returned errors ${JSON.stringify(output.errors)}`];
    }

    return [];
  });

  assert.deepEqual(failures, []);
});

test("zero-value mutations never leak NaN or Infinity results without an explicit validation error", () => {
  const failures = calculators.flatMap((calculator) => {
    const defaults = buildDefaultValues(calculator);

    return calculator.fields.flatMap((field) => {
      if (field.type !== "number") {
        return [];
      }

      const min = field.min ?? null;
      if (min !== null && min > 0) {
        return [];
      }

      const output = calculate(calculator, { ...defaults, [field.key]: "0" });
      const nonFinite = getNonFiniteResults(output.values);

      if (output.errors.length === 0 && nonFinite.length > 0) {
        return [`${calculator.slug}:${field.key}: leaked non-finite results ${JSON.stringify(nonFinite)}`];
      }

      return [];
    });
  });

  assert.deepEqual(failures, []);
});
