import assert from "node:assert/strict";
import test from "node:test";
import { calculate } from "./formula-engine";
import { getCalculator } from "../data";

function getRequiredCalculator(slug: string) {
  const calculator = getCalculator(slug);
  assert.ok(calculator, `Expected calculator ${slug} to exist`);
  return calculator;
}

function assertClose(actual: number | string | undefined, expected: number, precision = 1e-9) {
  assert.equal(typeof actual, "number");
  const numericActual = actual as number;
  assert.ok(Math.abs(numericActual - expected) <= precision, `Expected ${numericActual} to be within ${precision} of ${expected}`);
}

test("BMI calculator matches the documented 70 kg / 175 cm example", () => {
  const calculator = getRequiredCalculator("bmi-calculator");
  const output = calculate(calculator, {
    weightKg: "70",
    heightCm: "175"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.bmi, 22.857142857142858);
  assertClose(output.values.healthyWeightLow, 56.65625);
  assertClose(output.values.healthyWeightHigh, 76.25625);
});

test("Loan payment calculator matches the documented fixed-rate example", () => {
  const calculator = getRequiredCalculator("loan-payment-calculator");
  const output = calculate(calculator, {
    principal: "25000",
    annualRate: "6.5",
    years: "5"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.monthlyPayment, 489.15370546821663);
  assertClose(output.values.totalPayment, 29349.222328092997);
  assertClose(output.values.totalInterest, 4349.2223280929975);
});

test("Loan payment calculator divides principal evenly when the interest rate is zero", () => {
  const calculator = getRequiredCalculator("loan-payment-calculator");
  const output = calculate(calculator, {
    principal: "12000",
    annualRate: "0",
    years: "2"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.monthlyPayment, 500);
  assertClose(output.values.totalPayment, 12000);
  assertClose(output.values.totalInterest, 0);
});

test("ROAS calculator returns both ROAS and revenue after ad spend", () => {
  const calculator = getRequiredCalculator("roas-calculator");
  const output = calculate(calculator, {
    revenue: "6500",
    adSpend: "1200"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.roas, 6500 / 1200);
  assertClose(output.values.revenueAfterAds, 5300);
});

test("Loan payment calculator returns a clear validation error for invalid inputs", () => {
  const calculator = getRequiredCalculator("loan-payment-calculator");
  const output = calculate(calculator, {
    principal: "0",
    annualRate: "-2",
    years: ""
  });

  assert.deepEqual(output.values, {});
  assert.deepEqual(output.errors, ["Loan term is required."]);
});
