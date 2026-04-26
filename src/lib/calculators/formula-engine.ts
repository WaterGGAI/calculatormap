import type { CalculationOutput, Calculator, CalculatorResult } from "@/lib/calculators/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

function readNumber(values: Record<string, string>, key: string) {
  const value = Number(values[key]);
  return Number.isFinite(value) ? value : NaN;
}

function positive(value: number) {
  return Number.isFinite(value) && value > 0;
}

function nonNegative(value: number) {
  return Number.isFinite(value) && value >= 0;
}

function dateFromParts(year: number, month: number, day: number) {
  if (!positive(year) || !positive(month) || !positive(day)) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null;
  }

  return date;
}

function convertLength(value: number, fromUnit: string, toUnit: string) {
  const meters: Record<string, number> = {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344
  };

  if (!meters[fromUnit] || !meters[toUnit]) {
    return NaN;
  }

  return (value * meters[fromUnit]) / meters[toUnit];
}

function convertWeight(value: number, fromUnit: string, toUnit: string) {
  const kilograms: Record<string, number> = {
    gram: 0.001,
    kilogram: 1,
    ounce: 0.028349523125,
    pound: 0.45359237,
    ton: 907.18474
  };

  if (!kilograms[fromUnit] || !kilograms[toUnit]) {
    return NaN;
  }

  return (value * kilograms[fromUnit]) / kilograms[toUnit];
}

function toCelsius(value: number, unit: string) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return (value - 32) * (5 / 9);
  if (unit === "kelvin") return value - 273.15;
  return NaN;
}

function fromCelsius(value: number, unit: string) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return value * (9 / 5) + 32;
  if (unit === "kelvin") return value + 273.15;
  return NaN;
}

function parseDateInput(value: string) {
  const match = value.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) {
    return null;
  }

  return dateFromParts(Number(match[1]), Number(match[2]), Number(match[3]));
}

function formatDateInput(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addUtcMonthsClamped(date: Date, months: number) {
  const targetMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  targetMonth.setUTCMonth(targetMonth.getUTCMonth() + months);

  const year = targetMonth.getUTCFullYear();
  const month = targetMonth.getUTCMonth();
  const lastDayOfTargetMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  return new Date(Date.UTC(year, month, Math.min(date.getUTCDate(), lastDayOfTargetMonth)));
}

function tokenizeExpression(source: string) {
  const tokens: string[] = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }
    if (/[0-9.]/.test(char)) {
      let next = index + 1;
      while (next < source.length && /[0-9.eE+-]/.test(source[next])) {
        const previous = source[next - 1];
        const current = source[next];
        if ((current === "+" || current === "-") && previous !== "e" && previous !== "E") break;
        next += 1;
      }
      tokens.push(source.slice(index, next));
      index = next;
      continue;
    }
    if (/[A-Za-z_]/.test(char)) {
      let next = index + 1;
      while (next < source.length && /[A-Za-z0-9_]/.test(source[next])) {
        next += 1;
      }
      tokens.push(source.slice(index, next));
      index = next;
      continue;
    }
    if ("+-*/^(),".includes(char)) {
      tokens.push(char);
      index += 1;
      continue;
    }
    throw new Error(`Unsupported character "${char}".`);
  }

  return tokens;
}

function evaluateMathExpression(source: string, variables: Record<string, number> = {}) {
  const tokens = tokenizeExpression(source);
  let position = 0;
  const functions: Record<string, (...args: number[]) => number> = {
    abs: Math.abs,
    ceil: Math.ceil,
    cos: Math.cos,
    exp: Math.exp,
    floor: Math.floor,
    log: Math.log,
    log10: Math.log10,
    max: Math.max,
    min: Math.min,
    pow: Math.pow,
    round: Math.round,
    sin: Math.sin,
    sqrt: Math.sqrt,
    tan: Math.tan
  };

  const parseExpression = (): number => parseAdditive();

  const parseAdditive = () => {
    let value = parseMultiplicative();
    while (tokens[position] === "+" || tokens[position] === "-") {
      const operator = tokens[position++];
      const right = parseMultiplicative();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  };

  const parseMultiplicative = () => {
    let value = parseUnary();
    while (tokens[position] === "*" || tokens[position] === "/") {
      const operator = tokens[position++];
      const right = parseUnary();
      value = operator === "*" ? value * right : value / right;
    }
    return value;
  };

  const parseUnary = (): number => {
    if (tokens[position] === "+") {
      position += 1;
      return parseUnary();
    }
    if (tokens[position] === "-") {
      position += 1;
      return -parseUnary();
    }
    return parsePower();
  };

  const parsePower = () => {
    let value = parsePrimary();
    if (tokens[position] === "^") {
      position += 1;
      value = Math.pow(value, parseUnary());
    }
    return value;
  };

  const parsePrimary = () => {
    const token = tokens[position++];
    if (!token) {
      throw new Error("Expression ended early.");
    }
    if (token === "(") {
      const value = parseExpression();
      if (tokens[position] !== ")") {
        throw new Error("Missing closing parenthesis.");
      }
      position += 1;
      return value;
    }
    if (/^[0-9.]/.test(token)) {
      const value = Number(token);
      if (!Number.isFinite(value)) {
        throw new Error(`Invalid number "${token}".`);
      }
      return value;
    }
    if (/^[A-Za-z_]/.test(token)) {
      const lowerToken = token.toLowerCase();
      if (tokens[position] === "(") {
        position += 1;
        const args: number[] = [];
        if (tokens[position] !== ")") {
          while (true) {
            args.push(parseExpression());
            if (tokens[position] !== ",") break;
            position += 1;
          }
        }
        if (tokens[position] !== ")") {
          throw new Error("Missing function closing parenthesis.");
        }
        position += 1;
        const fn = functions[lowerToken];
        if (!fn) {
          throw new Error(`Unsupported function "${token}".`);
        }
        return fn(...args);
      }
      if (lowerToken === "pi") return Math.PI;
      if (lowerToken === "e") return Math.E;
      if (!(token in variables) || !Number.isFinite(variables[token])) {
        throw new Error(`Missing numeric input "${token}".`);
      }
      return variables[token];
    }
    throw new Error(`Unexpected token "${token}".`);
  };

  if (tokens.length === 0) {
    throw new Error("Enter an expression.");
  }

  const value = parseExpression();
  if (position !== tokens.length) {
    throw new Error(`Unexpected token "${tokens[position]}".`);
  }
  return value;
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function getExpressionDomainError(calculator: Calculator, variables: Record<string, number>, resultValues: Record<string, number | string>) {
  switch (calculator.slug) {
    case "break-even-calculator": {
      const contributionPerUnit = variables.pricePerUnit - variables.variableCostPerUnit;
      resultValues.contributionPerUnit = contributionPerUnit;

      if (!Number.isFinite(contributionPerUnit) || contributionPerUnit <= 0) {
        return "Break-even is not possible when price per unit is less than or equal to variable cost per unit.";
      }
      return null;
    }
    case "mortgage-refinance-calculator": {
      const monthlySavings = variables.oldPayment - variables.newPayment;
      resultValues.monthlySavings = monthlySavings;

      if (!Number.isFinite(monthlySavings) || monthlySavings <= 0) {
        return "Break-even is not possible when the new payment is greater than or equal to the old payment.";
      }
      return null;
    }
    case "pricing-calculator":
      return variables.targetMarginPercent >= 100 ? "Target margin must be less than 100 percent." : null;
    case "freelance-rate-calculator":
      return variables.taxRate >= 100 ? "Tax rate must be less than 100 percent to calculate required revenue." : null;
    default:
      return null;
  }
}

function getExpressionNonFiniteError() {
  return "One or more inputs must be greater than zero for this calculation.";
}

export function calculate(calculator: Calculator, values: Record<string, string>): CalculationOutput {
  const errors: string[] = [];
  const resultValues: Record<string, number | string> = {};

  for (const field of calculator.fields) {
    if (field.required && !String(values[field.key] ?? "").trim()) {
      errors.push(`${field.label} is required.`);
    }
  }

  if (errors.length > 0) {
    return { values: resultValues, errors };
  }

  switch (calculator.formulaType) {
    case "bmi": {
      const weightKg = readNumber(values, "weightKg");
      const heightCm = readNumber(values, "heightCm");
      if (!positive(weightKg) || !positive(heightCm)) {
        return { values: resultValues, errors: ["Enter a positive height and weight."] };
      }
      const heightM = heightCm / 100;
      resultValues.bmi = weightKg / (heightM * heightM);
      resultValues.healthyWeightLow = 18.5 * heightM * heightM;
      resultValues.healthyWeightHigh = 24.9 * heightM * heightM;
      break;
    }
    case "loan_payment": {
      const principal = readNumber(values, "principal");
      const annualRate = readNumber(values, "annualRate");
      const years = readNumber(values, "years");
      if (!positive(principal) || !nonNegative(annualRate) || !positive(years)) {
        return { values: resultValues, errors: ["Enter a loan amount, rate, and term."] };
      }
      const months = years * 12;
      const monthlyRate = annualRate / 100 / 12;
      const monthlyPayment =
        monthlyRate === 0 ? principal / months : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      resultValues.monthlyPayment = monthlyPayment;
      resultValues.totalPayment = monthlyPayment * months;
      resultValues.totalInterest = monthlyPayment * months - principal;
      break;
    }
    case "percentage": {
      const baseValue = readNumber(values, "baseValue");
      const percent = readNumber(values, "percent");
      if (!Number.isFinite(baseValue) || !Number.isFinite(percent)) {
        return { values: resultValues, errors: ["Enter a value and a percentage."] };
      }
      resultValues.percentageValue = (baseValue * percent) / 100;
      resultValues.totalAfterIncrease = baseValue + resultValues.percentageValue;
      resultValues.totalAfterDecrease = baseValue - resultValues.percentageValue;
      break;
    }
    case "unit_price": {
      const totalPrice = readNumber(values, "totalPrice");
      const quantity = readNumber(values, "quantity");
      if (!positive(totalPrice) || !positive(quantity)) {
        return { values: resultValues, errors: ["Enter a positive total price and quantity."] };
      }
      resultValues.unitPrice = totalPrice / quantity;
      break;
    }
    case "compound_interest": {
      const principal = readNumber(values, "principal");
      const annualRate = readNumber(values, "annualRate");
      const years = readNumber(values, "years");
      const compoundsPerYear = readNumber(values, "compoundsPerYear");
      if (!positive(principal) || !nonNegative(annualRate) || !positive(years) || !positive(compoundsPerYear)) {
        return { values: resultValues, errors: ["Enter principal, rate, years, and compounding frequency."] };
      }
      const futureValue = principal * Math.pow(1 + annualRate / 100 / compoundsPerYear, compoundsPerYear * years);
      resultValues.futureValue = futureValue;
      resultValues.interestEarned = futureValue - principal;
      break;
    }
    case "mortgage_payment": {
      const homePrice = readNumber(values, "homePrice");
      const downPayment = readNumber(values, "downPayment");
      const annualRate = readNumber(values, "annualRate");
      const years = readNumber(values, "years");
      const propertyTaxMonthly = readNumber(values, "propertyTaxMonthly");
      const insuranceMonthly = readNumber(values, "insuranceMonthly");
      if (
        !positive(homePrice) ||
        !nonNegative(downPayment) ||
        downPayment >= homePrice ||
        !nonNegative(annualRate) ||
        !positive(years) ||
        !nonNegative(propertyTaxMonthly) ||
        !nonNegative(insuranceMonthly)
      ) {
        return { values: resultValues, errors: ["Enter a home price, down payment, rate, term, and monthly costs."] };
      }
      const loanAmount = homePrice - downPayment;
      const months = years * 12;
      const monthlyRate = annualRate / 100 / 12;
      const principalAndInterest =
        monthlyRate === 0 ? loanAmount / months : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      resultValues.loanAmount = loanAmount;
      resultValues.principalAndInterest = principalAndInterest;
      resultValues.monthlyTotal = principalAndInterest + propertyTaxMonthly + insuranceMonthly;
      resultValues.totalInterest = principalAndInterest * months - loanAmount;
      break;
    }
    case "tip": {
      const billAmount = readNumber(values, "billAmount");
      const tipPercent = readNumber(values, "tipPercent");
      const people = readNumber(values, "people");
      if (!positive(billAmount) || !nonNegative(tipPercent) || !positive(people)) {
        return { values: resultValues, errors: ["Enter a bill amount, tip percentage, and number of people."] };
      }
      resultValues.tipAmount = (billAmount * tipPercent) / 100;
      resultValues.totalAmount = billAmount + resultValues.tipAmount;
      resultValues.perPerson = resultValues.totalAmount / people;
      break;
    }
    case "discount": {
      const originalPrice = readNumber(values, "originalPrice");
      const discountPercent = readNumber(values, "discountPercent");
      const taxPercent = readNumber(values, "taxPercent");
      if (!positive(originalPrice) || !nonNegative(discountPercent) || discountPercent > 100 || !nonNegative(taxPercent)) {
        return { values: resultValues, errors: ["Enter a price, discount from 0 to 100, and tax rate."] };
      }
      resultValues.discountAmount = (originalPrice * discountPercent) / 100;
      resultValues.salePrice = originalPrice - resultValues.discountAmount;
      resultValues.totalAfterTax = resultValues.salePrice * (1 + taxPercent / 100);
      break;
    }
    case "sales_tax": {
      const price = readNumber(values, "price");
      const taxRate = readNumber(values, "taxRate");
      if (!positive(price) || !nonNegative(taxRate)) {
        return { values: resultValues, errors: ["Enter a price and tax rate."] };
      }
      resultValues.taxAmount = (price * taxRate) / 100;
      resultValues.totalPrice = price + resultValues.taxAmount;
      break;
    }
    case "savings_goal": {
      const goalAmount = readNumber(values, "goalAmount");
      const currentSavings = readNumber(values, "currentSavings");
      const monthlyContribution = readNumber(values, "monthlyContribution");
      if (!positive(goalAmount) || !nonNegative(currentSavings) || !positive(monthlyContribution)) {
        return { values: resultValues, errors: ["Enter a goal amount, current savings, and monthly contribution."] };
      }
      resultValues.remainingAmount = Math.max(goalAmount - currentSavings, 0);
      resultValues.monthsToGoal = resultValues.remainingAmount / monthlyContribution;
      resultValues.yearsToGoal = resultValues.monthsToGoal / 12;
      break;
    }
    case "calorie": {
      const weightKg = readNumber(values, "weightKg");
      const heightCm = readNumber(values, "heightCm");
      const age = readNumber(values, "age");
      const activityFactor = readNumber(values, "activityFactor");
      const gender = values.gender;
      if (!positive(weightKg) || !positive(heightCm) || !positive(age) || !positive(activityFactor) || !gender) {
        return { values: resultValues, errors: ["Enter weight, height, age, gender, and activity level."] };
      }
      const genderOffset = gender === "male" ? 5 : -161;
      resultValues.bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + genderOffset;
      resultValues.maintenanceCalories = resultValues.bmr * activityFactor;
      resultValues.weightLossCalories = resultValues.maintenanceCalories - 500;
      break;
    }
    case "body_fat": {
      const waistCm = readNumber(values, "waistCm");
      const neckCm = readNumber(values, "neckCm");
      const heightCm = readNumber(values, "heightCm");
      const hipCm = readNumber(values, "hipCm");
      const gender = values.gender;
      if (!positive(waistCm) || !positive(neckCm) || !positive(heightCm) || !gender) {
        return { values: resultValues, errors: ["Enter waist, neck, height, and gender."] };
      }
      if (gender === "female" && !positive(hipCm)) {
        return { values: resultValues, errors: ["Enter hip circumference for the female body fat estimate."] };
      }
      const heightIn = heightCm / 2.54;
      const waistIn = waistCm / 2.54;
      const neckIn = neckCm / 2.54;
      const hipIn = hipCm / 2.54;
      resultValues.bodyFatPercent =
        gender === "male"
          ? 495 / (1.0324 - 0.19077 * Math.log10(waistIn - neckIn) + 0.15456 * Math.log10(heightIn)) - 450
          : 495 / (1.29579 - 0.35004 * Math.log10(waistIn + hipIn - neckIn) + 0.221 * Math.log10(heightIn)) - 450;
      if (!Number.isFinite(resultValues.bodyFatPercent)) {
        return { values: {}, errors: ["Check circumference values; waist and hip measurements must be larger than neck."] };
      }
      break;
    }
    case "pace": {
      const distance = readNumber(values, "distance");
      const hours = readNumber(values, "hours");
      const minutes = readNumber(values, "minutes");
      const seconds = readNumber(values, "seconds");
      if (!positive(distance) || !nonNegative(hours) || !nonNegative(minutes) || !nonNegative(seconds)) {
        return { values: resultValues, errors: ["Enter a distance and a valid time."] };
      }
      const totalMinutes = hours * 60 + minutes + seconds / 60;
      if (!positive(totalMinutes)) {
        return { values: resultValues, errors: ["Total time must be greater than zero."] };
      }
      resultValues.totalMinutes = totalMinutes;
      resultValues.paceMinutesPerMile = totalMinutes / distance;
      resultValues.speedMph = distance / (totalMinutes / 60);
      break;
    }
    case "age": {
      const birthDate = dateFromParts(readNumber(values, "birthYear"), readNumber(values, "birthMonth"), readNumber(values, "birthDay"));
      const asOfDate = dateFromParts(readNumber(values, "asOfYear"), readNumber(values, "asOfMonth"), readNumber(values, "asOfDay"));
      if (!birthDate || !asOfDate || asOfDate < birthDate) {
        return { values: resultValues, errors: ["Enter a valid birth date and as-of date."] };
      }
      let years = asOfDate.getUTCFullYear() - birthDate.getUTCFullYear();
      let months = asOfDate.getUTCMonth() - birthDate.getUTCMonth();
      if (asOfDate.getUTCDate() < birthDate.getUTCDate()) {
        months -= 1;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      resultValues.ageYears = years;
      resultValues.ageMonthsRemainder = months;
      resultValues.totalMonths = years * 12 + months;
      break;
    }
    case "date_difference": {
      const startDate = dateFromParts(readNumber(values, "startYear"), readNumber(values, "startMonth"), readNumber(values, "startDay"));
      const endDate = dateFromParts(readNumber(values, "endYear"), readNumber(values, "endMonth"), readNumber(values, "endDay"));
      if (!startDate || !endDate || endDate < startDate) {
        return { values: resultValues, errors: ["Enter a valid start date and end date."] };
      }
      const days = (endDate.getTime() - startDate.getTime()) / 86400000;
      resultValues.days = days;
      resultValues.weeks = days / 7;
      resultValues.monthsApprox = days / 30.4375;
      break;
    }
    case "time_duration": {
      const startHour = readNumber(values, "startHour");
      const startMinute = readNumber(values, "startMinute");
      const endHour = readNumber(values, "endHour");
      const endMinute = readNumber(values, "endMinute");
      const breakMinutes = readNumber(values, "breakMinutes");
      if (
        startHour < 0 ||
        startHour > 23 ||
        startMinute < 0 ||
        startMinute > 59 ||
        endHour < 0 ||
        endHour > 23 ||
        endMinute < 0 ||
        endMinute > 59 ||
        !nonNegative(breakMinutes)
      ) {
        return { values: resultValues, errors: ["Enter valid 24-hour times and break minutes."] };
      }
      const startTotal = startHour * 60 + startMinute;
      let endTotal = endHour * 60 + endMinute;
      if (endTotal < startTotal) {
        endTotal += 24 * 60;
      }
      const durationMinutes = Math.max(endTotal - startTotal - breakMinutes, 0);
      resultValues.durationMinutes = durationMinutes;
      resultValues.durationHours = durationMinutes / 60;
      break;
    }
    case "length_conversion": {
      const value = readNumber(values, "value");
      const convertedValue = convertLength(value, values.fromUnit, values.toUnit);
      if (!Number.isFinite(value) || !Number.isFinite(convertedValue)) {
        return { values: resultValues, errors: ["Enter a value and select valid length units."] };
      }
      resultValues.convertedValue = convertedValue;
      break;
    }
    case "weight_conversion": {
      const value = readNumber(values, "value");
      const convertedValue = convertWeight(value, values.fromUnit, values.toUnit);
      if (!Number.isFinite(value) || !Number.isFinite(convertedValue)) {
        return { values: resultValues, errors: ["Enter a value and select valid weight units."] };
      }
      resultValues.convertedValue = convertedValue;
      break;
    }
    case "temperature_conversion": {
      const value = readNumber(values, "value");
      const convertedValue = fromCelsius(toCelsius(value, values.fromUnit), values.toUnit);
      if (!Number.isFinite(value) || !Number.isFinite(convertedValue)) {
        return { values: resultValues, errors: ["Enter a value and select valid temperature units."] };
      }
      resultValues.convertedValue = convertedValue;
      break;
    }
    case "fuel_cost": {
      const distance = readNumber(values, "distance");
      const mpg = readNumber(values, "mpg");
      const pricePerGallon = readNumber(values, "pricePerGallon");
      if (!positive(distance) || !positive(mpg) || !positive(pricePerGallon)) {
        return { values: resultValues, errors: ["Enter trip distance, fuel economy, and fuel price."] };
      }
      resultValues.gallonsNeeded = distance / mpg;
      resultValues.totalFuelCost = resultValues.gallonsNeeded * pricePerGallon;
      resultValues.costPerMile = resultValues.totalFuelCost / distance;
      break;
    }
    case "expression": {
      const variables = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
      const expressions = calculator.formulaConfig?.expressions ?? {};
      try {
        const domainError = getExpressionDomainError(calculator, variables, resultValues);
        if (domainError) {
          return {
            values: resultValues,
            errors: [domainError]
          };
        }

        const nonFiniteResults: string[] = [];
        for (const result of calculator.results) {
          const expression = expressions[result.key];
          if (!expression) {
            continue;
          }
          const nextValue = evaluateMathExpression(expression, variables);
          if (!Number.isFinite(nextValue)) {
            nonFiniteResults.push(result.key);
            continue;
          }
          resultValues[result.key] = nextValue;
        }

        if (nonFiniteResults.length > 0) {
          return {
            values: resultValues,
            errors: [getExpressionNonFiniteError()]
          };
        }
      } catch (error) {
        return { values: resultValues, errors: [error instanceof Error ? error.message : "Check the formula inputs."] };
      }
      break;
    }
    case "math_expression": {
      const expressionField = calculator.formulaConfig?.expressionField ?? "expression";
      try {
        resultValues.value = evaluateMathExpression(values[expressionField] ?? "");
      } catch (error) {
        return { values: resultValues, errors: [error instanceof Error ? error.message : "Enter a valid expression."] };
      }
      break;
    }
    case "text_stats": {
      const text = values[calculator.formulaConfig?.textField ?? "text"] ?? "";
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      resultValues.characters = text.length;
      resultValues.charactersNoSpaces = text.replace(/\s/g, "").length;
      resultValues.words = words;
      resultValues.lines = text ? text.split(/\r\n|\r|\n/).length : 0;
      break;
    }
    case "number_list_stats": {
      const text = values[calculator.formulaConfig?.textField ?? "numbers"] ?? "";
      const numbers = Array.from(text.matchAll(/-?\d+(?:\.\d+)?/g), (match) => Number(match[0])).filter(Number.isFinite);
      if (numbers.length === 0) {
        return { values: resultValues, errors: ["Enter at least one number."] };
      }
      const sum = numbers.reduce((total, value) => total + value, 0);
      resultValues.itemCount = numbers.length;
      resultValues.sum = sum;
      resultValues.average = sum / numbers.length;
      resultValues.minimum = Math.min(...numbers);
      resultValues.maximum = Math.max(...numbers);
      break;
    }
    case "list_picker": {
      const list = values[calculator.formulaConfig?.listField ?? "items"] ?? "";
      const seed = values.seed ?? "";
      const pickCount = Math.max(Math.floor(readNumber(values, "pickCount") || 1), 1);
      const items = list
        .split(/\r\n|\r|\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);

      if (items.length === 0) {
        return { values: resultValues, errors: ["Enter at least one list item."] };
      }

      const scored = items
        .map((item, index) => ({ item, score: hashString(`${seed}:${index}:${item}`) }))
        .sort((left, right) => left.score - right.score);
      const picked = scored.slice(0, Math.min(pickCount, scored.length)).map((item) => item.item);
      resultValues.itemCount = items.length;
      resultValues.pickedCount = picked.length;
      resultValues.pickedItems = picked.join(", ");
      break;
    }
    case "base_conversion": {
      const decimalValue = Math.trunc(readNumber(values, "decimalValue"));
      const targetBase = Math.trunc(readNumber(values, "targetBase"));
      if (!Number.isFinite(decimalValue) || targetBase < 2 || targetBase > 36) {
        return { values: resultValues, errors: ["Enter a whole number and a target base from 2 to 36."] };
      }
      resultValues.convertedValue = decimalValue.toString(targetBase).toUpperCase();
      resultValues.decimalValue = decimalValue;
      break;
    }
    case "date_add": {
      const startDate = parseDateInput(values.startDate ?? "");
      const days = readNumber(values, "days");
      const months = readNumber(values, "months");
      if (!startDate || !Number.isFinite(days) || !Number.isFinite(months)) {
        return { values: resultValues, errors: ["Enter a start date, days, and months."] };
      }
      const resultDate = addUtcMonthsClamped(startDate, months);
      resultDate.setUTCDate(resultDate.getUTCDate() + days);
      const differenceDays = (resultDate.getTime() - startDate.getTime()) / 86400000;
      resultValues.resultDate = formatDateInput(resultDate);
      resultValues.daysChanged = differenceDays;
      break;
    }
    case "workday_count": {
      const startDate = parseDateInput(values.startDate ?? "");
      const endDate = parseDateInput(values.endDate ?? "");
      const holidayCount = readNumber(values, "holidayCount");
      if (!startDate || !endDate || endDate < startDate || !nonNegative(holidayCount)) {
        return { values: resultValues, errors: ["Enter valid start and end dates plus a holiday count."] };
      }
      let cursor = new Date(startDate);
      let weekdays = 0;
      while (cursor <= endDate) {
        const day = cursor.getUTCDay();
        if (day !== 0 && day !== 6) {
          weekdays += 1;
        }
        cursor = new Date(cursor.getTime() + 86400000);
      }
      resultValues.calendarDays = (endDate.getTime() - startDate.getTime()) / 86400000 + 1;
      resultValues.weekdays = weekdays;
      resultValues.workdays = Math.max(weekdays - holidayCount, 0);
      break;
    }
    case "time_cycle": {
      const workMinutes = readNumber(values, "workMinutes");
      const restMinutes = readNumber(values, "restMinutes");
      const rounds = readNumber(values, "rounds");
      if (!positive(workMinutes) || !nonNegative(restMinutes) || !positive(rounds)) {
        return { values: resultValues, errors: ["Enter work minutes, rest minutes, and rounds."] };
      }
      resultValues.totalWorkMinutes = workMinutes * rounds;
      resultValues.totalRestMinutes = restMinutes * Math.max(rounds - 1, 0);
      resultValues.totalMinutes = resultValues.totalWorkMinutes + resultValues.totalRestMinutes;
      resultValues.totalHours = resultValues.totalMinutes / 60;
      break;
    }
  }

  return { values: resultValues, errors };
}

export function formatResult(result: CalculatorResult, value: number | string | undefined) {
  if (value === undefined || (typeof value === "number" && Number.isNaN(value))) {
    return "Not calculated";
  }

  if (typeof value === "string" || result.format === "text") {
    return String(value);
  }

  if (result.format === "currency") {
    return formatCurrency(value, result.decimalPlaces ?? 2);
  }

  if (result.format === "percent") {
    return `${formatNumber(value, result.decimalPlaces ?? 2)}%`;
  }

  return formatNumber(value, result.decimalPlaces ?? 2);
}
