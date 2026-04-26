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

test("Compound interest calculator matches the documented monthly compounding example", () => {
  const calculator = getRequiredCalculator("compound-interest-calculator");
  const output = calculate(calculator, {
    principal: "10000",
    annualRate: "5",
    years: "10",
    compoundsPerYear: "12"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.futureValue, 16470.0949769028);
  assertClose(output.values.interestEarned, 6470.094976902801);
});

test("Mortgage calculator matches the documented fixed-rate housing example", () => {
  const calculator = getRequiredCalculator("mortgage-calculator");
  const output = calculate(calculator, {
    homePrice: "400000",
    downPayment: "80000",
    annualRate: "6.75",
    years: "30",
    propertyTaxMonthly: "350",
    insuranceMonthly: "125"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.loanAmount, 320000);
  assertClose(output.values.principalAndInterest, 2075.51390901829);
  assertClose(output.values.monthlyTotal, 2550.51390901829);
  assertClose(output.values.totalInterest, 427185.0072465845);
});

test("Mortgage calculator rejects a down payment that is equal to or greater than the home price", () => {
  const calculator = getRequiredCalculator("mortgage-calculator");
  const output = calculate(calculator, {
    homePrice: "400000",
    downPayment: "400000",
    annualRate: "6.75",
    years: "30",
    propertyTaxMonthly: "350",
    insuranceMonthly: "125"
  });

  assert.deepEqual(output.values, {});
  assert.deepEqual(output.errors, ["Enter a home price, down payment, rate, term, and monthly costs."]);
});

test("Pace calculator matches the documented 6.2 miles in 50 minutes example", () => {
  const calculator = getRequiredCalculator("pace-calculator");
  const output = calculate(calculator, {
    distance: "6.2",
    hours: "0",
    minutes: "50",
    seconds: "0"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.totalMinutes, 50);
  assertClose(output.values.paceMinutesPerMile, 8.064516129032258);
  assertClose(output.values.speedMph, 7.4399999999999995);
});

test("Pace calculator requires a total time greater than zero", () => {
  const calculator = getRequiredCalculator("pace-calculator");
  const output = calculate(calculator, {
    distance: "6.2",
    hours: "0",
    minutes: "0",
    seconds: "0"
  });

  assert.deepEqual(output.values, {});
  assert.deepEqual(output.errors, ["Total time must be greater than zero."]);
});

test("Age calculator matches the documented 1990-01-15 to 2026-04-12 example", () => {
  const calculator = getRequiredCalculator("age-calculator");
  const output = calculate(calculator, {
    birthYear: "1990",
    birthMonth: "1",
    birthDay: "15",
    asOfYear: "2026",
    asOfMonth: "4",
    asOfDay: "12"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.ageYears, 36);
  assertClose(output.values.ageMonthsRemainder, 2);
  assertClose(output.values.totalMonths, 434);
});

test("Time duration calculator handles overnight spans and break subtraction", () => {
  const calculator = getRequiredCalculator("time-duration-calculator");
  const output = calculate(calculator, {
    startHour: "22",
    startMinute: "15",
    endHour: "6",
    endMinute: "45",
    breakMinutes: "30"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.durationMinutes, 480);
  assertClose(output.values.durationHours, 8);
});

test("Date add/subtract calculator clamps month-end additions to the last valid day of the target month", () => {
  const calculator = getRequiredCalculator("date-add-subtract-calculator");
  const output = calculate(calculator, {
    startDate: "2026-01-31",
    days: "0",
    months: "1"
  });

  assert.deepEqual(output.errors, []);
  assert.equal(output.values.resultDate, "2026-02-28");
  assertClose(output.values.daysChanged, 28);
});

test("Length converter matches the documented 10 kilometer to mile example", () => {
  const calculator = getRequiredCalculator("length-converter");
  const output = calculate(calculator, {
    value: "10",
    fromUnit: "kilometer",
    toUnit: "mile"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.convertedValue, 6.2137119223733395);
});

test("Temperature converter matches the documented 68 Fahrenheit to Celsius example", () => {
  const calculator = getRequiredCalculator("temperature-converter");
  const output = calculate(calculator, {
    value: "68",
    fromUnit: "fahrenheit",
    toUnit: "celsius"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.convertedValue, 20);
});

test("Workday calculator counts calendar days, weekdays, and holiday-adjusted workdays", () => {
  const calculator = getRequiredCalculator("workday-calculator");
  const output = calculate(calculator, {
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    holidayCount: "2"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.calendarDays, 30);
  assertClose(output.values.weekdays, 22);
  assertClose(output.values.workdays, 20);
});

test("Number base converter turns 255 into FF in base 16", () => {
  const calculator = getRequiredCalculator("number-base-converter");
  const output = calculate(calculator, {
    decimalValue: "255",
    targetBase: "16"
  });

  assert.deepEqual(output.errors, []);
  assert.equal(output.values.convertedValue, "FF");
  assertClose(output.values.decimalValue, 255);
});

test("Calculation notebook summarizes pasted numbers", () => {
  const calculator = getRequiredCalculator("calculation-notebook");
  const output = calculate(calculator, {
    numbers: "12\n18\n21\n34"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.itemCount, 4);
  assertClose(output.values.sum, 85);
  assertClose(output.values.average, 21.25);
  assertClose(output.values.minimum, 12);
  assertClose(output.values.maximum, 34);
});

test("Word count tool reports characters, non-space characters, words, and lines", () => {
  const calculator = getRequiredCalculator("word-count-tool");
  const output = calculate(calculator, {
    text: "Alpha beta\nGamma"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.characters, 16);
  assertClose(output.values.charactersNoSpaces, 14);
  assertClose(output.values.words, 3);
  assertClose(output.values.lines, 2);
});

test("Tax-inclusive price calculator returns tax amount and gross total", () => {
  const calculator = getRequiredCalculator("tax-inclusive-price-calculator");
  const output = calculate(calculator, {
    netPrice: "100",
    taxRate: "8"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.taxAmount, 8);
  assertClose(output.values.grossPrice, 108);
});

test("Basic calculator gives exponent precedence over unary negation", () => {
  const calculator = getRequiredCalculator("basic-calculator");
  const output = calculate(calculator, {
    expression: "-2^2"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.value, -4);
});

test("Engineering calculator evaluates nested functions and powers", () => {
  const calculator = getRequiredCalculator("engineering-calculator");
  const output = calculate(calculator, {
    expression: "sqrt(144) + pow(2, 8)"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.value, 268);
});

test("Scientific calculator supports constants and log functions", () => {
  const calculator = getRequiredCalculator("scientific-calculator-with-history");
  const output = calculate(calculator, {
    expression: "sin(pi / 2) + log10(1000)"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.value, 4);
});

test("Kids timer adds work blocks and rest breaks across rounds", () => {
  const calculator = getRequiredCalculator("kids-timer");
  const output = calculate(calculator, {
    workMinutes: "10",
    restMinutes: "2",
    rounds: "3"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.totalWorkMinutes, 30);
  assertClose(output.values.totalRestMinutes, 4);
  assertClose(output.values.totalMinutes, 34);
  assertClose(output.values.totalHours, 34 / 60);
});

test("Random draw tool returns a deterministic seeded pick list", () => {
  const calculator = getRequiredCalculator("random-draw-tool");
  const output = calculate(calculator, {
    items: "Alice\nBob\nCharlie\nDana",
    pickCount: "2",
    seed: "today"
  });

  assert.deepEqual(output.errors, []);
  assertClose(output.values.itemCount, 4);
  assertClose(output.values.pickedCount, 2);
  assert.equal(output.values.pickedItems, "Bob, Charlie");
});
