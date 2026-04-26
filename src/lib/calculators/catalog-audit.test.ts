import assert from "node:assert/strict";
import test from "node:test";
import { calculators } from "../data";
import { calculate } from "./formula-engine";

function buildDefaultValues(calculator: (typeof calculators)[number]) {
  return Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue ?? ""]));
}

function getNonFiniteResults(values: Record<string, number | string>) {
  return Object.entries(values).filter(([, value]) => typeof value === "number" && !Number.isFinite(value));
}

test("all calculators return finite values or explicit errors for their default inputs", () => {
  const failures = calculators.flatMap((calculator) => {
    const output = calculate(calculator, buildDefaultValues(calculator));
    const nonFinite = getNonFiniteResults(output.values);

    if (output.errors.length === 0 && nonFinite.length > 0) {
      return [`${calculator.slug}: produced non-finite defaults ${JSON.stringify(nonFinite)}`];
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
