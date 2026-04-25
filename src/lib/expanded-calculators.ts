import type { Calculator, CalculatorField, CalculatorFormulaConfig, CalculatorFormulaType, CalculatorResult } from "@/lib/calculators/types";

const publishedAt = "2026-04-12";

const cat = {
  health: 1,
  finance: 2,
  math: 3,
  conversion: 4,
  dateTime: 5,
  core: 6,
  transit: 7,
  home: 8,
  lifestyle: 9,
  text: 10,
  tech: 11,
  sports: 12,
  time: 13,
  media: 14
};

type ExpandedCalculatorSeed = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  shortDescription: string;
  formulaType: CalculatorFormulaType;
  fields: CalculatorField[];
  results: CalculatorResult[];
  formulaConfig?: CalculatorFormulaConfig;
  formulaExplanation?: string;
  examples?: string[];
  notes?: string[];
  relatedSlugs?: string[];
};

function titleFromKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) => character.toUpperCase())
    .trim();
}

function numberField(key: string, label: string, defaultValue: string, unit?: string, min?: number, step = 0.01): CalculatorField {
  return {
    key,
    label,
    type: "number",
    defaultValue,
    placeholder: defaultValue,
    unit,
    required: true,
    min,
    step
  };
}

function textField(key: string, label: string, defaultValue: string, helpText?: string): CalculatorField {
  return {
    key,
    label,
    type: "text",
    defaultValue,
    placeholder: defaultValue,
    required: true,
    helpText
  };
}

function textareaField(key: string, label: string, defaultValue: string, helpText?: string): CalculatorField {
  return {
    key,
    label,
    type: "textarea",
    defaultValue,
    placeholder: defaultValue,
    required: true,
    helpText
  };
}

function selectField(key: string, label: string, defaultValue: string, options: Array<[string, string]>): CalculatorField {
  return {
    key,
    label,
    type: "select",
    defaultValue,
    required: true,
    options: options.map(([value, labelText]) => ({ label: labelText, value }))
  };
}

function result(key: string, label = titleFromKey(key), format: CalculatorResult["format"] = "number", decimalPlaces = 2): CalculatorResult {
  return { key, label, format, decimalPlaces };
}

function expandedCalculator(seed: ExpandedCalculatorSeed): Calculator {
  const formulaExplanation =
    seed.formulaExplanation ??
    (seed.formulaType === "expression"
      ? "This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary."
      : "This tool uses the inputs above to produce a practical estimate.");

  return {
    id: seed.id,
    categoryId: seed.categoryId,
    name: seed.name,
    slug: seed.slug,
    h1: seed.name,
    shortDescription: seed.shortDescription,
    longDescription: `${seed.shortDescription} The implementation is original and keeps variable rates editable where local rules may change.`,
    intro: seed.shortDescription,
    howToUse: ["Enter the requested inputs.", "Keep any editable rule or rate fields aligned with your situation.", "Review the result and notes before using the estimate."],
    formulaExplanation,
    examples: seed.examples ?? ["Adjust the defaults to match your scenario, then calculate the estimate."],
    notes: seed.notes ?? ["This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved."],
    formulaType: seed.formulaType,
    formulaConfig: seed.formulaConfig,
    fields: seed.fields,
    results: seed.results,
    faqs: [
      { question: "Can I change the assumptions?", answer: "Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date." },
      { question: "Is this copied from another site?", answer: "No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy." }
    ],
    relatedSlugs: seed.relatedSlugs ?? [],
    status: "published",
    updatedAt: publishedAt,
    seo: {
      title: `${seed.name} - Free Online Tool`,
      description: seed.shortDescription,
      canonical: `/calculator/${seed.slug}`,
      robots: "index,follow"
    }
  };
}

function expressionCalculator(
  seed: Omit<ExpandedCalculatorSeed, "formulaType" | "formulaConfig" | "results"> & {
    expressions: Record<string, string>;
    results?: CalculatorResult[];
  }
) {
  return expandedCalculator({
    ...seed,
    formulaType: "expression",
    formulaConfig: { expressions: seed.expressions },
    results: seed.results ?? Object.keys(seed.expressions).map((key) => result(key))
  });
}

function mathExpressionCalculator(id: number, name: string, slug: string, shortDescription: string, defaultExpression: string) {
  return expandedCalculator({
    id,
    categoryId: cat.core,
    name,
    slug,
    shortDescription,
    formulaType: "math_expression",
    formulaConfig: { expressionField: "expression" },
    fields: [textField("expression", "Expression", defaultExpression, "Supports +, -, *, /, ^, parentheses, pi, e, and functions like sqrt(), sin(), cos(), min(), max().")],
    results: [result("value", "Value")],
    formulaExplanation: "The expression is parsed with a small allow-list of arithmetic operators and math functions."
  });
}

function textStatsCalculator(id: number, categoryId: number, name: string, slug: string, shortDescription: string, defaultText: string) {
  return expandedCalculator({
    id,
    categoryId,
    name,
    slug,
    shortDescription,
    formulaType: "text_stats",
    formulaConfig: { textField: "text" },
    fields: [textareaField("text", "Text", defaultText)],
    results: [result("characters", "Characters", "number", 0), result("charactersNoSpaces", "Characters without spaces", "number", 0), result("words", "Words", "number", 0), result("lines", "Lines", "number", 0)]
  });
}

function numberListCalculator(id: number, categoryId: number, name: string, slug: string, shortDescription: string, defaultText: string) {
  return expandedCalculator({
    id,
    categoryId,
    name,
    slug,
    shortDescription,
    formulaType: "number_list_stats",
    formulaConfig: { textField: "numbers" },
    fields: [textareaField("numbers", "Numbers", defaultText, "Paste numbers separated by commas, spaces, or new lines.")],
    results: [result("itemCount", "Count", "number", 0), result("sum", "Sum"), result("average", "Average"), result("minimum", "Minimum"), result("maximum", "Maximum")]
  });
}

function dateAddCalculator(id: number, categoryId: number, name: string, slug: string, shortDescription: string, startLabel: string, days: string, months = "0") {
  return expandedCalculator({
    id,
    categoryId,
    name,
    slug,
    shortDescription,
    formulaType: "date_add",
    fields: [textField("startDate", startLabel, "2026-04-12", "Use YYYY-MM-DD."), numberField("days", "Days to add", days, "days", undefined, 1), numberField("months", "Months to add", months, "months", undefined, 1)],
    results: [result("resultDate", "Result date", "text", 0), result("daysChanged", "Total days changed", "number", 0)],
    formulaExplanation: "The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift."
  });
}

function workdayCalculator(id: number, categoryId: number, name: string, slug: string, shortDescription: string) {
  return expandedCalculator({
    id,
    categoryId,
    name,
    slug,
    shortDescription,
    formulaType: "workday_count",
    fields: [textField("startDate", "Start date", "2026-04-01", "Use YYYY-MM-DD."), textField("endDate", "End date", "2026-04-30", "Use YYYY-MM-DD."), numberField("holidayCount", "Extra holidays to subtract", "0", "days", 0, 1)],
    results: [result("calendarDays", "Calendar days", "number", 0), result("weekdays", "Weekdays before holiday adjustment", "number", 0), result("workdays", "Estimated workdays", "number", 0)]
  });
}

function timeCycleCalculator(id: number, name: string, slug: string, shortDescription: string, work = "25", rest = "5", rounds = "4") {
  return expandedCalculator({
    id,
    categoryId: cat.time,
    name,
    slug,
    shortDescription,
    formulaType: "time_cycle",
    fields: [numberField("workMinutes", "Active minutes", work, "min", 0.01, 0.5), numberField("restMinutes", "Rest minutes", rest, "min", 0, 0.5), numberField("rounds", "Rounds", rounds, undefined, 1, 1)],
    results: [result("totalWorkMinutes", "Active minutes"), result("totalRestMinutes", "Rest minutes"), result("totalMinutes", "Total minutes"), result("totalHours", "Total hours")]
  });
}

function listPickerCalculator(id: number, categoryId: number, name: string, slug: string, shortDescription: string, defaultItems: string) {
  return expandedCalculator({
    id,
    categoryId,
    name,
    slug,
    shortDescription,
    formulaType: "list_picker",
    formulaConfig: { listField: "items" },
    fields: [textareaField("items", "Items", defaultItems, "Use one item per line or separate items with commas."), numberField("pickCount", "Number to pick", "1", undefined, 1, 1), textField("seed", "Seed", "today", "Change the seed for a different deterministic pick.")],
    results: [result("itemCount", "Items entered", "number", 0), result("pickedCount", "Items picked", "number", 0), result("pickedItems", "Picked items", "text", 0)]
  });
}

export const expandedCalculators: Calculator[] = [
  mathExpressionCalculator(201, "Basic Calculator", "basic-calculator", "Evaluate a quick arithmetic expression.", "2 + 2 * 5"),
  mathExpressionCalculator(202, "One-Line Expression Calculator", "one-line-expression-calculator", "Run a single-line calculation with parentheses and functions.", "(18 + 24) / 3"),
  numberListCalculator(203, cat.core, "Calculation Notebook", "calculation-notebook", "Paste a list of numbers and summarize the count, total, average, minimum, and maximum.", "12\n18\n21\n34"),
  mathExpressionCalculator(204, "Engineering Calculator", "engineering-calculator", "Evaluate engineering-style expressions with square root, power, and trigonometric functions.", "sqrt(144) + pow(2, 8)"),
  mathExpressionCalculator(205, "Scientific Calculator With History", "scientific-calculator-with-history", "Run a scientific expression for quick constants and function checks.", "sin(pi / 2) + log10(1000)"),
  expressionCalculator({
    id: 206,
    categoryId: cat.finance,
    name: "Tax-Inclusive Price Calculator",
    slug: "tax-inclusive-price-calculator",
    shortDescription: "Calculate tax amount and tax-inclusive total from a pre-tax price.",
    fields: [numberField("netPrice", "Pre-tax price", "100", "USD", 0), numberField("taxRate", "Tax rate", "8", "%", 0)],
    expressions: { taxAmount: "netPrice * taxRate / 100", grossPrice: "netPrice * (1 + taxRate / 100)" },
    results: [result("taxAmount", "Tax amount", "currency"), result("grossPrice", "Tax-inclusive total", "currency")]
  }),
  expandedCalculator({
    id: 207,
    categoryId: cat.conversion,
    name: "Number Base Converter",
    slug: "number-base-converter",
    shortDescription: "Convert a whole decimal number to another base from 2 to 36.",
    formulaType: "base_conversion",
    fields: [numberField("decimalValue", "Decimal number", "255", undefined, undefined, 1), selectField("targetBase", "Target base", "16", [["2", "Base 2"], ["8", "Base 8"], ["10", "Base 10"], ["16", "Base 16"], ["36", "Base 36"]])],
    results: [result("convertedValue", "Converted value", "text", 0), result("decimalValue", "Decimal value", "number", 0)]
  }),
  expressionCalculator({
    id: 208,
    categoryId: cat.finance,
    name: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    shortDescription: "Calculate gross profit, margin, and markup.",
    fields: [numberField("revenue", "Revenue", "150", "USD", 0.01), numberField("cost", "Cost", "90", "USD", 0)],
    expressions: { grossProfit: "revenue - cost", marginPercent: "(revenue - cost) / revenue * 100", markupPercent: "(revenue - cost) / cost * 100" },
    results: [result("grossProfit", "Gross profit", "currency"), result("marginPercent", "Margin", "percent"), result("markupPercent", "Markup", "percent")]
  }),
  dateAddCalculator(209, cat.health, "Cycle Calculator", "cycle-calculator", "Estimate the next cycle date from a start date and cycle length.", "Last cycle start date", "28"),
  dateAddCalculator(210, cat.health, "Cycle-Based Fitness Planner", "cycle-based-fitness-planner", "Estimate a planning date from a cycle start and an editable day offset.", "Cycle start date", "14"),
  dateAddCalculator(211, cat.health, "Cycle-Based Wellness Planner", "cycle-based-wellness-planner", "Estimate a wellness planning date from a cycle start and an editable day offset.", "Cycle start date", "21"),
  numberListCalculator(212, cat.lifestyle, "Mood Check Tool", "mood-check-tool", "Summarize simple 1-10 mood scores from a day or week.", "7, 6, 8, 5, 7"),
  dateAddCalculator(213, cat.health, "Pregnancy Date Calculator", "pregnancy-date-calculator", "Estimate a due date from a last-period date using an editable day offset.", "Start date", "280"),
  expressionCalculator({
    id: 214,
    categoryId: cat.health,
    name: "Pregnancy Weight Calculator",
    slug: "pregnancy-weight-calculator",
    shortDescription: "Compare current pregnancy weight gain with an editable target range.",
    fields: [numberField("prePregnancyWeight", "Pre-pregnancy weight", "60", "kg", 1), numberField("currentWeight", "Current weight", "68", "kg", 1), numberField("targetGainLow", "Target gain low", "11.5", "kg", 0), numberField("targetGainHigh", "Target gain high", "16", "kg", 0)],
    expressions: { currentGain: "currentWeight - prePregnancyWeight", remainingToLow: "max(targetGainLow - (currentWeight - prePregnancyWeight), 0)", remainingToHigh: "max(targetGainHigh - (currentWeight - prePregnancyWeight), 0)" },
    results: [result("currentGain", "Current gain"), result("remainingToLow", "Remaining to low target"), result("remainingToHigh", "Remaining to high target")]
  }),
  dateAddCalculator(215, cat.health, "Conception Date Calculator", "conception-date-calculator", "Estimate a conception date from a due date with an editable offset.", "Due date", "-266"),
  workdayCalculator(216, cat.dateTime, "Baby Age In Days Calculator", "baby-age-in-days-calculator", "Count calendar days and weekdays between birth date and another date."),
  expressionCalculator({
    id: 217,
    categoryId: cat.health,
    name: "Premature Baby Corrected Age Calculator",
    slug: "premature-baby-corrected-age-calculator",
    shortDescription: "Estimate corrected age in weeks from chronological age and weeks early.",
    fields: [numberField("chronologicalWeeks", "Chronological age", "24", "weeks", 0), numberField("weeksEarly", "Weeks early", "8", "weeks", 0)],
    expressions: { correctedWeeks: "max(chronologicalWeeks - weeksEarly, 0)", correctedMonthsApprox: "max(chronologicalWeeks - weeksEarly, 0) / 4.345" },
    results: [result("correctedWeeks", "Corrected age"), result("correctedMonthsApprox", "Corrected months")]
  }),
  dateAddCalculator(218, cat.health, "28-Day Cycle Care Planner", "28-day-cycle-care-planner", "Plan a 28-day cycle milestone from a start date and editable offset.", "Cycle start date", "28"),
  expressionCalculator({
    id: 219,
    categoryId: cat.health,
    name: "Body Shape Calculator",
    slug: "body-shape-calculator",
    shortDescription: "Estimate waist-to-hip and waist-to-height ratios.",
    fields: [numberField("waistCm", "Waist", "72", "cm", 1), numberField("hipCm", "Hip", "96", "cm", 1), numberField("heightCm", "Height", "165", "cm", 1)],
    expressions: { waistHipRatio: "waistCm / hipCm", waistHeightRatio: "waistCm / heightCm" },
    results: [result("waistHipRatio", "Waist-to-hip ratio"), result("waistHeightRatio", "Waist-to-height ratio")]
  }),
  expressionCalculator({
    id: 220,
    categoryId: cat.home,
    name: "Baby Formula Temperature Calculator",
    slug: "baby-formula-temperature-calculator",
    shortDescription: "Estimate mixed-water temperature from hot and cool water amounts.",
    fields: [numberField("hotMl", "Hot water", "120", "ml", 0), numberField("hotTemp", "Hot water temperature", "70", "C", 0), numberField("coolMl", "Cool water", "60", "ml", 0), numberField("coolTemp", "Cool water temperature", "25", "C", 0)],
    expressions: { mixedTemperature: "(hotMl * hotTemp + coolMl * coolTemp) / (hotMl + coolMl)", totalVolume: "hotMl + coolMl" },
    results: [result("mixedTemperature", "Estimated mixed temperature"), result("totalVolume", "Total volume")]
  }),
  workdayCalculator(221, cat.dateTime, "Public Holiday Calendar Helper", "public-holiday-calendar-helper", "Count weekdays across a date range and subtract known holidays."),
  expressionCalculator({
    id: 222,
    categoryId: cat.dateTime,
    name: "Insurance Age Calculator",
    slug: "insurance-age-calculator",
    shortDescription: "Estimate insurance age by adding an editable rounding adjustment to actual age.",
    fields: [numberField("actualAge", "Actual age", "35", "years", 0, 1), numberField("roundingAdjustment", "Rounding adjustment", "1", "years", 0, 1)],
    expressions: { insuranceAge: "actualAge + roundingAdjustment" },
    results: [result("insuranceAge", "Insurance age", "number", 0)]
  }),
  dateAddCalculator(223, cat.dateTime, "Date Add/Subtract Calculator", "date-add-subtract-calculator", "Add or subtract days and months from a date.", "Start date", "30"),
  workdayCalculator(224, cat.dateTime, "Workday Calculator", "workday-calculator", "Estimate workdays between two dates with an editable holiday count."),
  workdayCalculator(225, cat.dateTime, "Day Counter", "day-counter", "Count calendar days and weekdays across a date range."),
  timeCycleCalculator(226, "Kids Timer", "kids-timer", "Plan a simple child-friendly timer cycle.", "10", "2", "3"),
  expressionCalculator({
    id: 227,
    categoryId: cat.lifestyle,
    name: "Height Match Calculator",
    slug: "height-match-calculator",
    shortDescription: "Compare two heights and calculate their difference and ratio.",
    fields: [numberField("heightA", "Height A", "175", "cm", 1), numberField("heightB", "Height B", "162", "cm", 1)],
    expressions: { heightDifference: "abs(heightA - heightB)", heightRatio: "heightA / heightB" },
    results: [result("heightDifference", "Height difference"), result("heightRatio", "Height ratio")]
  }),
  expressionCalculator({
    id: 228,
    categoryId: cat.health,
    name: "Target Heart Rate Calculator",
    slug: "target-heart-rate-calculator",
    shortDescription: "Estimate maximum heart rate and training zone from age and intensity.",
    fields: [numberField("age", "Age", "35", "years", 1, 1), numberField("intensityLow", "Low intensity", "60", "%", 0), numberField("intensityHigh", "High intensity", "80", "%", 0)],
    expressions: { maxHeartRate: "220 - age", lowTarget: "(220 - age) * intensityLow / 100", highTarget: "(220 - age) * intensityHigh / 100" },
    results: [result("maxHeartRate", "Estimated max heart rate", "number", 0), result("lowTarget", "Low target bpm", "number", 0), result("highTarget", "High target bpm", "number", 0)]
  }),
  expressionCalculator({
    id: 229,
    categoryId: cat.health,
    name: "Exercise Calories Calculator",
    slug: "exercise-calories-calculator",
    shortDescription: "Estimate calories burned from MET, weight, and duration.",
    fields: [numberField("met", "MET value", "7", undefined, 0), numberField("weightKg", "Weight", "70", "kg", 1), numberField("minutes", "Duration", "45", "min", 0)],
    expressions: { caloriesBurned: "met * 3.5 * weightKg / 200 * minutes" },
    results: [result("caloriesBurned", "Calories burned", "number", 0)]
  }),
  expressionCalculator({
    id: 230,
    categoryId: cat.conversion,
    name: "Shoe Size Converter",
    slug: "shoe-size-converter",
    shortDescription: "Estimate common shoe size conversions from foot length.",
    fields: [numberField("footLengthCm", "Foot length", "26", "cm", 1)],
    expressions: { euSizeApprox: "footLengthCm * 1.5 + 2", usMenApprox: "footLengthCm * 3 - 22", usWomenApprox: "footLengthCm * 3 - 21" },
    results: [result("euSizeApprox", "EU size estimate"), result("usMenApprox", "US men estimate"), result("usWomenApprox", "US women estimate")]
  }),
  expressionCalculator({
    id: 231,
    categoryId: cat.finance,
    name: "Currency Converter",
    slug: "currency-converter",
    shortDescription: "Convert an amount using an editable exchange rate and fee.",
    fields: [numberField("amount", "Amount", "100", undefined, 0), numberField("exchangeRate", "Exchange rate", "31.5", undefined, 0), numberField("feePercent", "Fee", "1.5", "%", 0)],
    expressions: { convertedAmount: "amount * exchangeRate * (1 - feePercent / 100)", feeAmount: "amount * exchangeRate * feePercent / 100" },
    results: [result("convertedAmount", "Converted amount", "currency"), result("feeAmount", "Fee amount", "currency")]
  }),
  expressionCalculator({
    id: 232,
    categoryId: cat.finance,
    name: "Travel Exchange Rate Calculator",
    slug: "travel-exchange-rate-calculator",
    shortDescription: "Estimate travel money after exchange spread and card fee.",
    fields: [numberField("homeAmount", "Home currency amount", "500", undefined, 0), numberField("travelRate", "Travel exchange rate", "4.75", undefined, 0), numberField("cardFeePercent", "Card or exchange fee", "2", "%", 0)],
    expressions: { destinationAmount: "homeAmount * travelRate * (1 - cardFeePercent / 100)", feeValue: "homeAmount * travelRate * cardFeePercent / 100" },
    results: [result("destinationAmount", "Destination amount"), result("feeValue", "Fee value")]
  }),
  expressionCalculator({
    id: 233,
    categoryId: cat.home,
    name: "TV Viewing Distance Calculator",
    slug: "tv-viewing-distance-calculator",
    shortDescription: "Estimate viewing distance from screen size.",
    fields: [numberField("screenInches", "Screen size", "55", "in", 1), numberField("multiplier", "Distance multiplier", "1.6", undefined, 0)],
    expressions: { viewingDistanceInches: "screenInches * multiplier", viewingDistanceFeet: "screenInches * multiplier / 12" },
    results: [result("viewingDistanceInches", "Viewing distance"), result("viewingDistanceFeet", "Viewing distance feet")]
  }),
  textStatsCalculator(234, cat.media, "Color Count Tool", "color-count-tool", "Paste color values or labels and count entries, words, and lines.", "#102420\n#a8ddd4\n#ffffff"),
  expressionCalculator({
    id: 235,
    categoryId: cat.tech,
    name: "Screen PPI Calculator",
    slug: "screen-ppi-calculator",
    shortDescription: "Calculate pixels per inch from resolution and diagonal size.",
    fields: [numberField("widthPixels", "Width", "1920", "px", 1, 1), numberField("heightPixels", "Height", "1080", "px", 1, 1), numberField("diagonalInches", "Diagonal", "24", "in", 1)],
    expressions: { ppi: "sqrt(widthPixels ^ 2 + heightPixels ^ 2) / diagonalInches" },
    results: [result("ppi", "PPI")]
  }),
  expressionCalculator({
    id: 236,
    categoryId: cat.conversion,
    name: "PPM Concentration Converter",
    slug: "ppm-concentration-converter",
    shortDescription: "Convert ppm to percent and decimal concentration.",
    fields: [numberField("ppm", "PPM", "5000", "ppm", 0)],
    expressions: { percent: "ppm / 10000", decimal: "ppm / 1000000" },
    results: [result("percent", "Percent", "percent", 4), result("decimal", "Decimal", "number", 6)]
  }),
  textStatsCalculator(237, cat.text, "Chinese Text Utility", "chinese-text-utility", "Paste Chinese text and count characters, non-space characters, words, and lines.", "繁體中文文字測試\nSimplified text sample"),
  expressionCalculator({
    id: 238,
    categoryId: cat.transit,
    name: "Taiwan Taxi Fare Calculator",
    slug: "taiwan-taxi-fare-calculator",
    shortDescription: "Estimate a taxi fare from editable local fare assumptions.",
    fields: [numberField("distanceKm", "Trip distance", "8", "km", 0), numberField("baseFare", "Base fare", "85", "TWD", 0), numberField("includedKm", "Included distance", "1.25", "km", 0), numberField("perKmRate", "Extra rate", "25", "TWD/km", 0), numberField("waitingFee", "Waiting or surcharge", "0", "TWD", 0)],
    expressions: { estimatedFare: "baseFare + max(distanceKm - includedKm, 0) * perKmRate + waitingFee" },
    results: [result("estimatedFare", "Estimated fare", "number", 0)]
  }),
  expressionCalculator({
    id: 239,
    categoryId: cat.transit,
    name: "Hong Kong Taxi Fare Calculator",
    slug: "hong-kong-taxi-fare-calculator",
    shortDescription: "Estimate a taxi fare from editable Hong Kong fare assumptions.",
    fields: [numberField("distanceKm", "Trip distance", "8", "km", 0), numberField("baseFare", "Base fare", "27", "HKD", 0), numberField("includedKm", "Included distance", "2", "km", 0), numberField("perKmRate", "Extra rate", "9.5", "HKD/km", 0), numberField("surcharge", "Surcharge", "0", "HKD", 0)],
    expressions: { estimatedFare: "baseFare + max(distanceKm - includedKm, 0) * perKmRate + surcharge" },
    results: [result("estimatedFare", "Estimated fare", "number", 0)]
  }),
  expressionCalculator({
    id: 240,
    categoryId: cat.transit,
    name: "Time Speed Distance Calculator",
    slug: "time-speed-distance-calculator",
    shortDescription: "Calculate speed and pace from distance and time.",
    fields: [numberField("distance", "Distance", "100", "km", 0), numberField("hours", "Time", "2", "hr", 0.01)],
    expressions: { speed: "distance / hours", minutesPerKm: "hours * 60 / distance" },
    results: [result("speed", "Speed km/h"), result("minutesPerKm", "Minutes per km")]
  }),
  expressionCalculator({
    id: 241,
    categoryId: cat.transit,
    name: "Gear Ratio RPM Calculator",
    slug: "gear-ratio-rpm-calculator",
    shortDescription: "Estimate wheel RPM from engine RPM and gear ratio.",
    fields: [numberField("engineRpm", "Engine RPM", "2500", "rpm", 0), numberField("gearRatio", "Gear ratio", "3.5", undefined, 0), numberField("finalDrive", "Final drive", "4.1", undefined, 0)],
    expressions: { wheelRpm: "engineRpm / (gearRatio * finalDrive)" },
    results: [result("wheelRpm", "Wheel RPM")]
  }),
  expressionCalculator({
    id: 242,
    categoryId: cat.transit,
    name: "Tire Size Upgrade Calculator",
    slug: "tire-size-upgrade-calculator",
    shortDescription: "Compare tire diameter from width, aspect ratio, and rim size.",
    fields: [numberField("widthMm", "Width", "225", "mm", 1), numberField("aspectPercent", "Aspect ratio", "45", "%", 1), numberField("rimInches", "Rim", "17", "in", 1)],
    expressions: { sidewallMm: "widthMm * aspectPercent / 100", diameterMm: "rimInches * 25.4 + 2 * widthMm * aspectPercent / 100" },
    results: [result("sidewallMm", "Sidewall"), result("diameterMm", "Diameter")]
  }),
  expressionCalculator({
    id: 243,
    categoryId: cat.transit,
    name: "Fuel Price Change Calculator",
    slug: "fuel-price-change-calculator",
    shortDescription: "Estimate how a fuel price change affects a refill.",
    fields: [numberField("liters", "Fuel volume", "45", "L", 0), numberField("oldPrice", "Old price", "30", "per L", 0), numberField("newPrice", "New price", "31.5", "per L", 0)],
    expressions: { oldCost: "liters * oldPrice", newCost: "liters * newPrice", costChange: "liters * (newPrice - oldPrice)" },
    results: [result("oldCost", "Old cost", "currency"), result("newCost", "New cost", "currency"), result("costChange", "Change", "currency")]
  }),
  expressionCalculator({
    id: 244,
    categoryId: cat.home,
    name: "Electricity Bill Calculator",
    slug: "electricity-bill-calculator",
    shortDescription: "Estimate electricity cost from kWh and an editable rate.",
    fields: [numberField("kwh", "Usage", "300", "kWh", 0), numberField("rate", "Rate", "0.15", "USD/kWh", 0), numberField("fixedFee", "Fixed fee", "10", "USD", 0)],
    expressions: { energyCost: "kwh * rate", totalCost: "kwh * rate + fixedFee" },
    results: [result("energyCost", "Energy cost", "currency"), result("totalCost", "Total cost", "currency")]
  }),
  textStatsCalculator(245, cat.text, "Word Count Tool", "word-count-tool", "Count words, characters, non-space characters, and lines.", "Paste your article here."),
  expressionCalculator({
    id: 246,
    categoryId: cat.home,
    name: "Air Conditioner BTU Calculator",
    slug: "air-conditioner-btu-calculator",
    shortDescription: "Estimate cooling capacity from room area and BTU per square foot.",
    fields: [numberField("areaSqFt", "Room area", "250", "sq ft", 1), numberField("btuPerSqFt", "BTU per sq ft", "25", undefined, 1)],
    expressions: { requiredBtu: "areaSqFt * btuPerSqFt", tonsApprox: "areaSqFt * btuPerSqFt / 12000" },
    results: [result("requiredBtu", "Required BTU", "number", 0), result("tonsApprox", "Cooling tons")]
  }),
  expressionCalculator({
    id: 247,
    categoryId: cat.home,
    name: "Air Conditioner Electricity Cost Calculator",
    slug: "air-conditioner-electricity-cost-calculator",
    shortDescription: "Estimate air conditioner electricity use and cost.",
    fields: [numberField("watts", "Power", "1200", "W", 0), numberField("hoursPerDay", "Hours per day", "8", "hr", 0), numberField("days", "Days", "30", undefined, 0), numberField("rate", "Electricity rate", "0.15", "USD/kWh", 0)],
    expressions: { kwh: "watts / 1000 * hoursPerDay * days", cost: "watts / 1000 * hoursPerDay * days * rate" },
    results: [result("kwh", "Energy use"), result("cost", "Cost", "currency")]
  }),
  expressionCalculator({
    id: 248,
    categoryId: cat.math,
    name: "Golden Ratio Calculator",
    slug: "golden-ratio-calculator",
    shortDescription: "Scale a value by the golden ratio and its reciprocal.",
    fields: [numberField("value", "Value", "100", undefined, 0)],
    expressions: { largerPart: "value * 1.61803398875", smallerPart: "value * 0.61803398875" },
    results: [result("largerPart", "Value x phi"), result("smallerPart", "Value x 0.618")]
  }),
  expressionCalculator({
    id: 249,
    categoryId: cat.finance,
    name: "Credit Card Debt Calculator",
    slug: "credit-card-debt-calculator",
    shortDescription: "Estimate months to pay off credit card debt with fixed monthly payments.",
    fields: [numberField("balance", "Balance", "3000", "USD", 0), numberField("monthlyPayment", "Monthly payment", "200", "USD", 0.01)],
    expressions: { monthsNoInterest: "balance / monthlyPayment", totalPaidNoInterest: "ceil(balance / monthlyPayment) * monthlyPayment" },
    results: [result("monthsNoInterest", "Months before interest", "number", 1), result("totalPaidNoInterest", "Total scheduled payments", "currency")]
  }),
  expressionCalculator({
    id: 250,
    categoryId: cat.finance,
    name: "Car Purchase Budget Calculator",
    slug: "car-purchase-budget-calculator",
    shortDescription: "Estimate an out-the-door car budget with taxes and fees.",
    fields: [numberField("vehiclePrice", "Vehicle price", "25000", "USD", 0), numberField("taxPercent", "Tax", "8", "%", 0), numberField("fees", "Fees", "1200", "USD", 0)],
    expressions: { taxAmount: "vehiclePrice * taxPercent / 100", outTheDoor: "vehiclePrice * (1 + taxPercent / 100) + fees" },
    results: [result("taxAmount", "Tax", "currency"), result("outTheDoor", "Out-the-door total", "currency")]
  }),
  expressionCalculator({
    id: 251,
    categoryId: cat.finance,
    name: "Weekly Savings Challenge Calculator",
    slug: "weekly-savings-challenge-calculator",
    shortDescription: "Estimate savings from a weekly increasing challenge.",
    fields: [numberField("firstWeek", "First week saving", "10", "USD", 0), numberField("weeklyIncrease", "Weekly increase", "10", "USD", 0), numberField("weeks", "Weeks", "52", undefined, 1, 1)],
    expressions: { totalSaved: "weeks / 2 * (2 * firstWeek + (weeks - 1) * weeklyIncrease)", finalWeekAmount: "firstWeek + (weeks - 1) * weeklyIncrease" },
    results: [result("totalSaved", "Total saved", "currency"), result("finalWeekAmount", "Final week amount", "currency")]
  }),
  expressionCalculator({
    id: 252,
    categoryId: cat.transit,
    name: "Bicycle Gear Calculator",
    slug: "bicycle-gear-calculator",
    shortDescription: "Estimate bicycle gear ratio and gear inches.",
    fields: [numberField("frontTeeth", "Front teeth", "50", undefined, 1, 1), numberField("rearTeeth", "Rear teeth", "17", undefined, 1, 1), numberField("wheelInches", "Wheel diameter", "27", "in", 1)],
    expressions: { gearRatio: "frontTeeth / rearTeeth", gearInches: "frontTeeth / rearTeeth * wheelInches" },
    results: [result("gearRatio", "Gear ratio"), result("gearInches", "Gear inches")]
  }),
  listPickerCalculator(253, cat.lifestyle, "Random Draw Tool", "random-draw-tool", "Pick one or more entries from a list using a deterministic seed.", "Alice\nBob\nCharlie\nDana"),
  expressionCalculator({
    id: 254,
    categoryId: cat.transit,
    name: "Map Distance Calculator",
    slug: "map-distance-calculator",
    shortDescription: "Estimate travel time from distance and average speed.",
    fields: [numberField("distanceKm", "Distance", "25", "km", 0), numberField("averageSpeedKph", "Average speed", "40", "km/h", 0.01)],
    expressions: { travelHours: "distanceKm / averageSpeedKph", travelMinutes: "distanceKm / averageSpeedKph * 60" },
    results: [result("travelHours", "Travel hours"), result("travelMinutes", "Travel minutes")]
  }),
  expressionCalculator({
    id: 255,
    categoryId: cat.home,
    name: "Aquarium Volume Calculator",
    slug: "aquarium-volume-calculator",
    shortDescription: "Calculate aquarium volume from length, width, and height.",
    fields: [numberField("lengthCm", "Length", "60", "cm", 0), numberField("widthCm", "Width", "30", "cm", 0), numberField("heightCm", "Height", "36", "cm", 0)],
    expressions: { liters: "lengthCm * widthCm * heightCm / 1000", gallons: "lengthCm * widthCm * heightCm / 1000 / 3.78541" },
    results: [result("liters", "Liters"), result("gallons", "US gallons")]
  }),
  expressionCalculator({
    id: 256,
    categoryId: cat.health,
    name: "Water Intake Calculator",
    slug: "water-intake-calculator",
    shortDescription: "Estimate daily water intake from body weight.",
    fields: [numberField("weightKg", "Weight", "70", "kg", 1), numberField("mlPerKg", "Milliliters per kg", "35", "ml/kg", 0)],
    expressions: { dailyMl: "weightKg * mlPerKg", dailyLiters: "weightKg * mlPerKg / 1000" },
    results: [result("dailyMl", "Daily ml", "number", 0), result("dailyLiters", "Daily liters")]
  }),
  expressionCalculator({
    id: 257,
    categoryId: cat.home,
    name: "Cup Volume Calculator",
    slug: "cup-volume-calculator",
    shortDescription: "Estimate cylindrical cup volume.",
    fields: [numberField("diameterCm", "Diameter", "8", "cm", 0), numberField("heightCm", "Height", "10", "cm", 0)],
    expressions: { volumeMl: "pi * (diameterCm / 2) ^ 2 * heightCm", volumeOz: "pi * (diameterCm / 2) ^ 2 * heightCm / 29.5735" },
    results: [result("volumeMl", "Volume ml"), result("volumeOz", "Fluid ounces")]
  }),
  expressionCalculator({
    id: 258,
    categoryId: cat.health,
    name: "Waist-To-Hip Ratio Calculator",
    slug: "waist-to-hip-ratio-calculator",
    shortDescription: "Calculate waist-to-hip ratio from body measurements.",
    fields: [numberField("waist", "Waist", "72", "cm", 1), numberField("hip", "Hip", "96", "cm", 1)],
    expressions: { waistHipRatio: "waist / hip" },
    results: [result("waistHipRatio", "Waist-to-hip ratio")]
  }),
  expressionCalculator({
    id: 259,
    categoryId: cat.finance,
    name: "Mortgage Refinance Calculator",
    slug: "mortgage-refinance-calculator",
    shortDescription: "Estimate simple monthly savings and break-even months for refinancing.",
    fields: [numberField("oldPayment", "Old monthly payment", "2200", "USD", 0), numberField("newPayment", "New monthly payment", "1900", "USD", 0), numberField("closingCosts", "Closing costs", "4500", "USD", 0)],
    expressions: { monthlySavings: "oldPayment - newPayment", breakEvenMonths: "closingCosts / max(oldPayment - newPayment, 0.01)" },
    results: [result("monthlySavings", "Monthly savings", "currency"), result("breakEvenMonths", "Break-even months")]
  }),
  expressionCalculator({
    id: 260,
    categoryId: cat.finance,
    name: "Mortgage Grace Period Calculator",
    slug: "mortgage-grace-period-calculator",
    shortDescription: "Estimate interest accrued during a grace period.",
    fields: [numberField("loanAmount", "Loan amount", "300000", "USD", 0), numberField("annualRate", "Annual rate", "6", "%", 0), numberField("graceMonths", "Grace period", "12", "months", 0, 1)],
    expressions: { interestDuringGrace: "loanAmount * annualRate / 100 / 12 * graceMonths" },
    results: [result("interestDuringGrace", "Interest during grace", "currency")]
  }),
  expressionCalculator({
    id: 261,
    categoryId: cat.finance,
    name: "Rotating Savings Bid Calculator",
    slug: "rotating-savings-bid-calculator",
    shortDescription: "Estimate simple bid interest from group savings assumptions.",
    fields: [numberField("monthlyContribution", "Monthly contribution", "1000", "USD", 0), numberField("members", "Members", "12", undefined, 1, 1), numberField("bidDiscount", "Bid discount", "120", "USD", 0)],
    expressions: { potBeforeDiscount: "monthlyContribution * members", receivedAmount: "monthlyContribution * members - bidDiscount", discountPercent: "bidDiscount / (monthlyContribution * members) * 100" },
    results: [result("potBeforeDiscount", "Pot before discount", "currency"), result("receivedAmount", "Received amount", "currency"), result("discountPercent", "Discount percent", "percent")]
  }),
  expressionCalculator({
    id: 262,
    categoryId: cat.finance,
    name: "Stock Limit-Up/Limit-Down Calculator",
    slug: "stock-limit-up-limit-down-calculator",
    shortDescription: "Estimate upper and lower price limits from an editable percentage rule.",
    fields: [numberField("previousClose", "Previous close", "100", "USD", 0), numberField("limitPercent", "Limit", "10", "%", 0)],
    expressions: { limitUp: "previousClose * (1 + limitPercent / 100)", limitDown: "previousClose * (1 - limitPercent / 100)" },
    results: [result("limitUp", "Limit up", "currency"), result("limitDown", "Limit down", "currency")]
  }),
  expressionCalculator({
    id: 263,
    categoryId: cat.finance,
    name: "Stock Profit/Loss Calculator",
    slug: "stock-profit-loss-calculator",
    shortDescription: "Calculate stock trade profit or loss before detailed broker rules.",
    fields: [numberField("buyPrice", "Buy price", "50", "USD", 0), numberField("sellPrice", "Sell price", "58", "USD", 0), numberField("shares", "Shares", "100", undefined, 1, 1), numberField("fees", "Fees", "10", "USD", 0)],
    expressions: { profitLoss: "(sellPrice - buyPrice) * shares - fees", returnPercent: "((sellPrice - buyPrice) * shares - fees) / (buyPrice * shares) * 100" },
    results: [result("profitLoss", "Profit / loss", "currency"), result("returnPercent", "Return", "percent")]
  }),
  expressionCalculator({
    id: 264,
    categoryId: cat.finance,
    name: "Stock Ex-Dividend Calculator",
    slug: "stock-ex-dividend-calculator",
    shortDescription: "Estimate adjusted price after cash and stock dividends.",
    fields: [numberField("price", "Price", "100", "USD", 0), numberField("cashDividend", "Cash dividend", "2", "USD", 0), numberField("stockDividendPercent", "Stock dividend", "5", "%", 0)],
    expressions: { adjustedPrice: "(price - cashDividend) / (1 + stockDividendPercent / 100)" },
    results: [result("adjustedPrice", "Adjusted price", "currency")]
  }),
  expressionCalculator({
    id: 265,
    categoryId: cat.sports,
    name: "Baseball ERA Calculator",
    slug: "baseball-era-calculator",
    shortDescription: "Calculate earned run average.",
    fields: [numberField("earnedRuns", "Earned runs", "12", undefined, 0, 1), numberField("inningsPitched", "Innings pitched", "45", undefined, 0.01)],
    expressions: { era: "earnedRuns * 9 / inningsPitched" },
    results: [result("era", "ERA")]
  }),
  expressionCalculator({
    id: 266,
    categoryId: cat.sports,
    name: "Baseball Batting Average Calculator",
    slug: "baseball-batting-average-calculator",
    shortDescription: "Calculate batting average from hits and at-bats.",
    fields: [numberField("hits", "Hits", "42", undefined, 0, 1), numberField("atBats", "At-bats", "130", undefined, 1, 1)],
    expressions: { battingAverage: "hits / atBats" },
    results: [result("battingAverage", "Batting average", "number", 3)]
  }),
  expressionCalculator({
    id: 267,
    categoryId: cat.health,
    name: "Running Calories Calculator",
    slug: "running-calories-calculator",
    shortDescription: "Estimate running calories from weight and distance.",
    fields: [numberField("weightKg", "Weight", "70", "kg", 1), numberField("distanceKm", "Distance", "10", "km", 0)],
    expressions: { calories: "weightKg * distanceKm * 1.036" },
    results: [result("calories", "Calories", "number", 0)]
  }),
  expressionCalculator({
    id: 268,
    categoryId: cat.health,
    name: "Blood Alcohol Calculator",
    slug: "blood-alcohol-calculator",
    shortDescription: "Estimate BAC with editable drink, body-water, and metabolism assumptions.",
    fields: [numberField("standardDrinks", "Standard drinks", "2", undefined, 0), numberField("alcoholGramsPerDrink", "Alcohol per drink", "14", "g", 0), numberField("weightKg", "Weight", "70", "kg", 1), numberField("bodyWaterRatio", "Body water ratio", "0.68", undefined, 0), numberField("hours", "Hours since first drink", "2", "hr", 0), numberField("metabolismPerHour", "Metabolism per hour", "0.015", "%", 0)],
    expressions: { bacPercent: "max((standardDrinks * alcoholGramsPerDrink / (weightKg * 1000 * bodyWaterRatio)) * 100 - hours * metabolismPerHour, 0)" },
    results: [result("bacPercent", "Estimated BAC", "percent", 3)]
  }),
  expressionCalculator({
    id: 269,
    categoryId: cat.finance,
    name: "Buy Vs. Rent Calculator",
    slug: "buy-vs-rent-calculator",
    shortDescription: "Compare simple monthly owning and renting costs.",
    fields: [numberField("monthlyMortgage", "Mortgage", "2200", "USD", 0), numberField("monthlyOwnerCosts", "Other owner costs", "600", "USD", 0), numberField("monthlyRent", "Rent", "2100", "USD", 0), numberField("renterCosts", "Other renter costs", "100", "USD", 0)],
    expressions: { owningCost: "monthlyMortgage + monthlyOwnerCosts", rentingCost: "monthlyRent + renterCosts", monthlyDifference: "monthlyMortgage + monthlyOwnerCosts - monthlyRent - renterCosts" },
    results: [result("owningCost", "Owning cost", "currency"), result("rentingCost", "Renting cost", "currency"), result("monthlyDifference", "Owning minus renting", "currency")]
  }),
  timeCycleCalculator(270, "Interval Timer", "interval-timer", "Plan active/rest interval rounds.", "1", "1", "10"),
  timeCycleCalculator(271, "Stopwatch Session Calculator", "stopwatch-session-calculator", "Plan repeated timed stopwatch attempts.", "5", "1", "3"),
  timeCycleCalculator(272, "Millisecond Stopwatch Planner", "millisecond-stopwatch-planner", "Convert short timed attempts into a total session duration.", "0.5", "0.1", "10"),
  expressionCalculator({
    id: 273,
    categoryId: cat.lifestyle,
    name: "Dog Age Calculator",
    slug: "dog-age-calculator",
    shortDescription: "Estimate dog age in human-year equivalents with editable multipliers.",
    fields: [numberField("dogYears", "Dog age", "5", "years", 0), numberField("firstYearFactor", "First-year factor", "15", undefined, 0), numberField("laterYearFactor", "Later-year factor", "5", undefined, 0)],
    expressions: { humanYearsApprox: "firstYearFactor + max(dogYears - 1, 0) * laterYearFactor" },
    results: [result("humanYearsApprox", "Approximate human years")]
  }),
  dateAddCalculator(274, cat.lifestyle, "Dog Pregnancy Due Date Calculator", "dog-pregnancy-due-date-calculator", "Estimate a dog pregnancy due date from breeding date.", "Breeding date", "63"),
  expressionCalculator({
    id: 275,
    categoryId: cat.lifestyle,
    name: "Cat Age Calculator",
    slug: "cat-age-calculator",
    shortDescription: "Estimate cat age in human-year equivalents with editable factors.",
    fields: [numberField("catYears", "Cat age", "4", "years", 0), numberField("firstYearFactor", "First-year factor", "15", undefined, 0), numberField("laterYearFactor", "Later-year factor", "4", undefined, 0)],
    expressions: { humanYearsApprox: "firstYearFactor + max(catYears - 1, 0) * laterYearFactor" },
    results: [result("humanYearsApprox", "Approximate human years")]
  }),
  dateAddCalculator(276, cat.lifestyle, "Cat Pregnancy Due Date Calculator", "cat-pregnancy-due-date-calculator", "Estimate a cat pregnancy due date from breeding date.", "Breeding date", "64"),
  expressionCalculator({
    id: 277,
    categoryId: cat.math,
    name: "Ratio Calculator",
    slug: "ratio-calculator",
    shortDescription: "Calculate ratio, scaled values, and proportional parts.",
    fields: [numberField("partA", "Part A", "16", undefined, 0), numberField("partB", "Part B", "9", undefined, 0), numberField("scaleTo", "Scale total to", "100", undefined, 0)],
    expressions: { ratio: "partA / partB", scaledA: "scaleTo * partA / (partA + partB)", scaledB: "scaleTo * partB / (partA + partB)" },
    results: [result("ratio", "Ratio A/B"), result("scaledA", "Scaled A"), result("scaledB", "Scaled B")]
  }),
  expressionCalculator({
    id: 278,
    categoryId: cat.core,
    name: "Tally Counter",
    slug: "tally-counter",
    shortDescription: "Calculate the next counter value from a current value and step.",
    fields: [numberField("currentCount", "Current count", "12", undefined, 0, 1), numberField("step", "Step", "1", undefined, 0, 1)],
    expressions: { nextCount: "currentCount + step", previousCount: "currentCount - step" },
    results: [result("nextCount", "Next count", "number", 0), result("previousCount", "Previous count", "number", 0)]
  }),
  expressionCalculator({
    id: 279,
    categoryId: cat.health,
    name: "Smoking Cost Calculator",
    slug: "smoking-cost-calculator",
    shortDescription: "Estimate smoking cost over days, months, and years.",
    fields: [numberField("packsPerDay", "Packs per day", "1", undefined, 0), numberField("pricePerPack", "Price per pack", "8", "USD", 0)],
    expressions: { dailyCost: "packsPerDay * pricePerPack", monthlyCost: "packsPerDay * pricePerPack * 30.4375", yearlyCost: "packsPerDay * pricePerPack * 365" },
    results: [result("dailyCost", "Daily cost", "currency"), result("monthlyCost", "Monthly cost", "currency"), result("yearlyCost", "Yearly cost", "currency")]
  }),
  expressionCalculator({
    id: 280,
    categoryId: cat.lifestyle,
    name: "Alcohol Spending Calculator",
    slug: "alcohol-spending-calculator",
    shortDescription: "Estimate drinking or beverage spending over a month.",
    fields: [numberField("drinksPerWeek", "Drinks per week", "4", undefined, 0), numberField("pricePerDrink", "Price per drink", "9", "USD", 0)],
    expressions: { weeklyCost: "drinksPerWeek * pricePerDrink", monthlyCost: "drinksPerWeek * pricePerDrink * 52 / 12", yearlyCost: "drinksPerWeek * pricePerDrink * 52" },
    results: [result("weeklyCost", "Weekly cost", "currency"), result("monthlyCost", "Monthly cost", "currency"), result("yearlyCost", "Yearly cost", "currency")]
  }),
  timeCycleCalculator(281, "Countdown Alarm Planner", "countdown-alarm-planner", "Plan a countdown alarm length.", "30", "0", "1"),
  timeCycleCalculator(282, "Visual Countdown Alarm Planner", "visual-countdown-alarm-planner", "Plan a visual countdown alarm sequence.", "10", "2", "3"),
  timeCycleCalculator(283, "Cuckoo Clock Planner", "cuckoo-clock-planner", "Estimate a repeated chime schedule length.", "1", "59", "4"),
  timeCycleCalculator(284, "Pomodoro Timer", "pomodoro-timer", "Plan Pomodoro work and break rounds.", "25", "5", "4"),
  textStatsCalculator(285, cat.media, "YouTube Alarm Planner", "youtube-alarm-planner", "Paste video links or alarm notes and count entries for a playlist alarm.", "https://youtu.be/example\nAlarm at 07:30"),
  textStatsCalculator(286, cat.media, "Multi-YouTube Player Planner", "multi-youtube-player-planner", "Paste multiple video links and count lines for a multi-video setup.", "https://youtu.be/one\nhttps://youtu.be/two"),
  textStatsCalculator(287, cat.dateTime, "Perpetual Calendar With Notes", "perpetual-calendar-with-notes", "Draft calendar notes and count words, characters, and lines.", "2026-04-12 Project note"),
  expressionCalculator({
    id: 288,
    categoryId: cat.home,
    name: "Tile Area Calculator",
    slug: "tile-area-calculator",
    shortDescription: "Estimate tile count from room area, tile size, and waste percentage.",
    fields: [numberField("areaSqM", "Area", "12", "m2", 0), numberField("tileWidthCm", "Tile width", "30", "cm", 0), numberField("tileHeightCm", "Tile height", "30", "cm", 0), numberField("wastePercent", "Waste", "10", "%", 0)],
    expressions: { tileCount: "ceil(areaSqM / (tileWidthCm * tileHeightCm / 10000) * (1 + wastePercent / 100))" },
    results: [result("tileCount", "Tiles needed", "number", 0)]
  }),
  expressionCalculator({
    id: 289,
    categoryId: cat.health,
    name: "Sleep Cycle Calculator",
    slug: "sleep-cycle-calculator",
    shortDescription: "Estimate sleep duration from sleep cycles and minutes per cycle.",
    fields: [numberField("cycles", "Sleep cycles", "5", undefined, 1, 1), numberField("minutesPerCycle", "Minutes per cycle", "90", "min", 1), numberField("fallAsleepMinutes", "Time to fall asleep", "15", "min", 0)],
    expressions: { sleepMinutes: "cycles * minutesPerCycle", totalBedMinutes: "cycles * minutesPerCycle + fallAsleepMinutes", totalBedHours: "(cycles * minutesPerCycle + fallAsleepMinutes) / 60" },
    results: [result("sleepMinutes", "Sleep minutes", "number", 0), result("totalBedMinutes", "Total bed minutes", "number", 0), result("totalBedHours", "Total bed hours")]
  }),
  expressionCalculator({
    id: 290,
    categoryId: cat.dateTime,
    name: "Sunrise/Sunset Daylight Calculator",
    slug: "sunrise-sunset-daylight-calculator",
    shortDescription: "Estimate daylight duration from sunrise and sunset times entered as decimal hours.",
    fields: [numberField("sunriseHour", "Sunrise", "6.25", "hour", 0), numberField("sunsetHour", "Sunset", "18.5", "hour", 0)],
    expressions: { daylightHours: "sunsetHour - sunriseHour", daylightMinutes: "(sunsetHour - sunriseHour) * 60" },
    results: [result("daylightHours", "Daylight hours"), result("daylightMinutes", "Daylight minutes")]
  }),
  expressionCalculator({
    id: 291,
    categoryId: cat.finance,
    name: "Real Promotion Discount Calculator",
    slug: "real-promotion-discount-calculator",
    shortDescription: "Estimate the real discount from buy-more-save-more promotions.",
    fields: [numberField("originalTotal", "Original total", "300", "USD", 0), numberField("discountAmount", "Discount amount", "50", "USD", 0)],
    expressions: { finalTotal: "originalTotal - discountAmount", realDiscountPercent: "discountAmount / originalTotal * 100" },
    results: [result("finalTotal", "Final total", "currency"), result("realDiscountPercent", "Real discount", "percent")]
  }),
  expressionCalculator({
    id: 292,
    categoryId: cat.finance,
    name: "365 Savings Plan Calculator",
    slug: "365-savings-plan-calculator",
    shortDescription: "Estimate total savings from a daily increasing savings plan.",
    fields: [numberField("firstDay", "First day saving", "1", "USD", 0), numberField("dailyIncrease", "Daily increase", "1", "USD", 0), numberField("days", "Days", "365", undefined, 1, 1)],
    expressions: { totalSaved: "days / 2 * (2 * firstDay + (days - 1) * dailyIncrease)", finalDaySaving: "firstDay + (days - 1) * dailyIncrease" },
    results: [result("totalSaved", "Total saved", "currency"), result("finalDaySaving", "Final day saving", "currency")]
  }),
  expressionCalculator({
    id: 293,
    categoryId: cat.health,
    name: "Child Height Prediction Calculator",
    slug: "child-height-prediction-calculator",
    shortDescription: "Estimate child adult height from parent heights with an editable offset.",
    fields: [numberField("parentAHeight", "Parent A height", "175", "cm", 1), numberField("parentBHeight", "Parent B height", "162", "cm", 1), numberField("sexOffset", "Sex offset", "6.5", "cm", undefined)],
    expressions: { predictedHeight: "(parentAHeight + parentBHeight + sexOffset) / 2" },
    results: [result("predictedHeight", "Predicted height")]
  }),
  expressionCalculator({
    id: 294,
    categoryId: cat.transit,
    name: "Parking Fee Calculator",
    slug: "parking-fee-calculator",
    shortDescription: "Estimate parking fee from duration, free minutes, hourly rate, and cap.",
    fields: [numberField("minutesParked", "Minutes parked", "135", "min", 0), numberField("freeMinutes", "Free minutes", "30", "min", 0), numberField("hourlyRate", "Hourly rate", "3", "USD/hr", 0), numberField("dailyCap", "Daily cap", "20", "USD", 0)],
    expressions: { rawFee: "ceil(max(minutesParked - freeMinutes, 0) / 60) * hourlyRate", estimatedFee: "min(ceil(max(minutesParked - freeMinutes, 0) / 60) * hourlyRate, dailyCap)" },
    results: [result("rawFee", "Raw fee", "currency"), result("estimatedFee", "Estimated fee", "currency")]
  }),
  expressionCalculator({
    id: 295,
    categoryId: cat.finance,
    name: "Hidden Cash Calculator",
    slug: "hidden-cash-calculator",
    shortDescription: "Add up small hidden cash amounts from multiple places.",
    fields: [numberField("wallet", "Wallet", "20", "USD", 0), numberField("drawer", "Drawer", "35", "USD", 0), numberField("emergencyFund", "Emergency fund", "150", "USD", 0)],
    expressions: { totalCash: "wallet + drawer + emergencyFund" },
    results: [result("totalCash", "Total cash", "currency")]
  }),
  expressionCalculator({
    id: 296,
    categoryId: cat.tech,
    name: "Electric Vehicle Charging Cost Calculator",
    slug: "electric-vehicle-charging-cost-calculator",
    shortDescription: "Estimate EV charging cost and range added.",
    fields: [numberField("batteryKwhAdded", "Energy added", "45", "kWh", 0), numberField("pricePerKwh", "Price", "0.28", "USD/kWh", 0), numberField("kmPerKwh", "Efficiency", "6", "km/kWh", 0)],
    expressions: { chargingCost: "batteryKwhAdded * pricePerKwh", rangeAddedKm: "batteryKwhAdded * kmPerKwh" },
    results: [result("chargingCost", "Charging cost", "currency"), result("rangeAddedKm", "Range added km")]
  }),
  expressionCalculator({
    id: 297,
    categoryId: cat.media,
    name: "Camera Distance Calculator",
    slug: "camera-distance-calculator",
    shortDescription: "Estimate camera distance from subject height, focal length, and sensor height.",
    fields: [numberField("subjectHeightM", "Subject height", "1.7", "m", 0), numberField("focalLengthMm", "Focal length", "50", "mm", 0), numberField("sensorHeightMm", "Sensor height", "24", "mm", 0)],
    expressions: { distanceM: "subjectHeightM * focalLengthMm / sensorHeightMm" },
    results: [result("distanceM", "Estimated distance")]
  }),
  expressionCalculator({
    id: 298,
    categoryId: cat.media,
    name: "Depth Of Field Calculator",
    slug: "depth-of-field-calculator",
    shortDescription: "Estimate hyperfocal distance from focal length, aperture, and circle of confusion.",
    fields: [numberField("focalLengthMm", "Focal length", "50", "mm", 0), numberField("aperture", "Aperture f-number", "8", undefined, 0), numberField("circleOfConfusionMm", "Circle of confusion", "0.03", "mm", 0)],
    expressions: { hyperfocalMm: "(focalLengthMm ^ 2) / (aperture * circleOfConfusionMm) + focalLengthMm", hyperfocalM: "((focalLengthMm ^ 2) / (aperture * circleOfConfusionMm) + focalLengthMm) / 1000" },
    results: [result("hyperfocalMm", "Hyperfocal distance mm"), result("hyperfocalM", "Hyperfocal distance m")]
  }),
  expressionCalculator({
    id: 299,
    categoryId: cat.lifestyle,
    name: "Reaction Test Score Calculator",
    slug: "reaction-test-score-calculator",
    shortDescription: "Summarize reaction test attempts from average milliseconds.",
    fields: [numberField("averageMs", "Average reaction", "250", "ms", 0), numberField("targetMs", "Target reaction", "200", "ms", 0)],
    expressions: { differenceMs: "averageMs - targetMs", score: "max(100 - (averageMs - targetMs) / 5, 0)" },
    results: [result("differenceMs", "Difference ms"), result("score", "Score")]
  }),
  expressionCalculator({
    id: 300,
    categoryId: cat.finance,
    name: "Effective Annual Rate Calculator",
    slug: "effective-annual-rate-calculator",
    shortDescription: "Estimate effective annual rate from interest paid and loan principal.",
    fields: [numberField("interestPaid", "Interest paid", "600", "USD", 0), numberField("principal", "Principal", "10000", "USD", 0), numberField("months", "Months", "12", undefined, 1, 1)],
    expressions: { simpleAnnualRate: "interestPaid / principal * 12 / months * 100" },
    results: [result("simpleAnnualRate", "Simple annual rate", "percent")]
  }),
  expressionCalculator({
    id: 301,
    categoryId: cat.home,
    name: "Microwave Heating Time Calculator",
    slug: "microwave-heating-time-calculator",
    shortDescription: "Scale microwave heating time between wattages.",
    fields: [numberField("originalSeconds", "Original time", "120", "sec", 0), numberField("originalWatts", "Original watts", "1000", "W", 1), numberField("newWatts", "New watts", "700", "W", 1)],
    expressions: { adjustedSeconds: "originalSeconds * originalWatts / newWatts", adjustedMinutes: "originalSeconds * originalWatts / newWatts / 60" },
    results: [result("adjustedSeconds", "Adjusted seconds"), result("adjustedMinutes", "Adjusted minutes")]
  }),
  expressionCalculator({
    id: 302,
    categoryId: cat.tech,
    name: "Power Bank Wh Calculator",
    slug: "power-bank-wh-calculator",
    shortDescription: "Convert battery mAh and voltage to watt-hours.",
    fields: [numberField("mah", "Capacity", "30000", "mAh", 0), numberField("voltage", "Voltage", "3.7", "V", 0)],
    expressions: { wattHours: "mah * voltage / 1000" },
    results: [result("wattHours", "Watt-hours")]
  }),
  expressionCalculator({
    id: 303,
    categoryId: cat.finance,
    name: "Shipping Cost Comparison Calculator",
    slug: "shipping-cost-comparison-calculator",
    shortDescription: "Compare two shipping methods by base fee and weight fee.",
    fields: [numberField("weightKg", "Package weight", "3", "kg", 0), numberField("methodABase", "Method A base", "5", "USD", 0), numberField("methodAPerKg", "Method A per kg", "2", "USD/kg", 0), numberField("methodBBase", "Method B base", "8", "USD", 0), numberField("methodBPerKg", "Method B per kg", "1.2", "USD/kg", 0)],
    expressions: { methodACost: "methodABase + weightKg * methodAPerKg", methodBCost: "methodBBase + weightKg * methodBPerKg", savingsWithB: "methodABase + weightKg * methodAPerKg - methodBBase - weightKg * methodBPerKg" },
    results: [result("methodACost", "Method A cost", "currency"), result("methodBCost", "Method B cost", "currency"), result("savingsWithB", "Savings with B", "currency")]
  }),
  expressionCalculator({
    id: 304,
    categoryId: cat.finance,
    name: "Markup Calculator",
    slug: "markup-calculator",
    shortDescription: "Calculate selling price, markup amount, and margin from cost and target markup.",
    fields: [numberField("cost", "Cost", "40", "USD", 0), numberField("markupPercent", "Markup", "35", "%", 0)],
    expressions: { markupAmount: "cost * markupPercent / 100", sellingPrice: "cost * (1 + markupPercent / 100)", marginPercent: "(cost * markupPercent / 100) / (cost * (1 + markupPercent / 100)) * 100" },
    results: [result("markupAmount", "Markup amount", "currency"), result("sellingPrice", "Selling price", "currency"), result("marginPercent", "Resulting margin", "percent")],
    relatedSlugs: ["profit-margin-calculator", "pricing-calculator", "markup-vs-margin-calculator"]
  }),
  expressionCalculator({
    id: 305,
    categoryId: cat.finance,
    name: "Markup Vs Margin Calculator",
    slug: "markup-vs-margin-calculator",
    shortDescription: "Compare markup and margin from cost and selling price.",
    fields: [numberField("cost", "Cost", "40", "USD", 0), numberField("sellingPrice", "Selling price", "62", "USD", 0)],
    expressions: { grossProfit: "sellingPrice - cost", markupPercent: "(sellingPrice - cost) / cost * 100", marginPercent: "(sellingPrice - cost) / sellingPrice * 100" },
    results: [result("grossProfit", "Gross profit", "currency"), result("markupPercent", "Markup", "percent"), result("marginPercent", "Margin", "percent")],
    relatedSlugs: ["markup-calculator", "profit-margin-calculator", "pricing-calculator"]
  }),
  expressionCalculator({
    id: 306,
    categoryId: cat.finance,
    name: "Break-Even Calculator",
    slug: "break-even-calculator",
    shortDescription: "Estimate break-even units and revenue from fixed cost and unit economics.",
    fields: [numberField("fixedCosts", "Fixed costs", "5000", "USD", 0), numberField("pricePerUnit", "Price per unit", "45", "USD", 0.01), numberField("variableCostPerUnit", "Variable cost per unit", "18", "USD", 0)],
    expressions: { contributionPerUnit: "pricePerUnit - variableCostPerUnit", breakEvenUnits: "fixedCosts / max(pricePerUnit - variableCostPerUnit, 0.01)", breakEvenRevenue: "fixedCosts / max(pricePerUnit - variableCostPerUnit, 0.01) * pricePerUnit" },
    results: [result("contributionPerUnit", "Contribution per unit", "currency"), result("breakEvenUnits", "Break-even units"), result("breakEvenRevenue", "Break-even revenue", "currency")],
    formulaExplanation: "Break-even uses contribution margin per unit. If price per unit is not greater than variable cost per unit, a practical break-even point does not exist."
  }),
  expressionCalculator({
    id: 307,
    categoryId: cat.finance,
    name: "Pricing Calculator",
    slug: "pricing-calculator",
    shortDescription: "Estimate a selling price from cost and target margin.",
    fields: [numberField("costPerUnit", "Cost per unit", "40", "USD", 0), numberField("targetMarginPercent", "Target margin", "35", "%", 0)],
    expressions: { sellingPrice: "costPerUnit / max(1 - targetMarginPercent / 100, 0.01)", grossProfitPerUnit: "costPerUnit / max(1 - targetMarginPercent / 100, 0.01) - costPerUnit" },
    results: [result("sellingPrice", "Recommended price", "currency"), result("grossProfitPerUnit", "Gross profit per unit", "currency")],
    relatedSlugs: ["markup-calculator", "markup-vs-margin-calculator", "break-even-calculator"]
  }),
  expressionCalculator({
    id: 308,
    categoryId: cat.finance,
    name: "Hourly To Salary Calculator",
    slug: "hourly-to-salary-calculator",
    shortDescription: "Convert hourly pay to weekly, monthly, and annual salary.",
    fields: [numberField("hourlyRate", "Hourly rate", "32", "USD", 0), numberField("hoursPerWeek", "Hours per week", "40", "hr", 0), numberField("weeksPerYear", "Weeks per year", "52", "weeks", 1, 1)],
    expressions: { weeklyPay: "hourlyRate * hoursPerWeek", monthlyPay: "hourlyRate * hoursPerWeek * weeksPerYear / 12", annualPay: "hourlyRate * hoursPerWeek * weeksPerYear" },
    results: [result("weeklyPay", "Weekly pay", "currency"), result("monthlyPay", "Monthly pay", "currency"), result("annualPay", "Annual pay", "currency")],
    relatedSlugs: ["overtime-calculator", "take-home-pay-calculator", "commission-calculator"]
  }),
  expressionCalculator({
    id: 309,
    categoryId: cat.finance,
    name: "Overtime Calculator",
    slug: "overtime-calculator",
    shortDescription: "Estimate overtime pay from base rate, extra hours, and overtime multiplier.",
    fields: [numberField("hourlyRate", "Hourly rate", "32", "USD", 0), numberField("regularHours", "Regular hours", "40", "hr", 0), numberField("overtimeHours", "Overtime hours", "8", "hr", 0), numberField("overtimeMultiplier", "Overtime multiplier", "1.5", "x", 1)],
    expressions: { regularPay: "hourlyRate * regularHours", overtimePay: "hourlyRate * overtimeHours * overtimeMultiplier", totalPay: "hourlyRate * regularHours + hourlyRate * overtimeHours * overtimeMultiplier" },
    results: [result("regularPay", "Regular pay", "currency"), result("overtimePay", "Overtime pay", "currency"), result("totalPay", "Total pay", "currency")],
    relatedSlugs: ["hourly-to-salary-calculator", "take-home-pay-calculator"]
  }),
  expressionCalculator({
    id: 310,
    categoryId: cat.finance,
    name: "Commission Calculator",
    slug: "commission-calculator",
    shortDescription: "Estimate commission payout from sales, rate, and optional base pay.",
    fields: [numberField("salesAmount", "Sales amount", "12500", "USD", 0), numberField("commissionRate", "Commission rate", "8", "%", 0), numberField("basePay", "Base pay", "0", "USD", 0)],
    expressions: { commissionAmount: "salesAmount * commissionRate / 100", totalPay: "basePay + salesAmount * commissionRate / 100" },
    results: [result("commissionAmount", "Commission", "currency"), result("totalPay", "Total pay", "currency")],
    relatedSlugs: ["hourly-to-salary-calculator", "take-home-pay-calculator", "profit-margin-calculator"]
  }),
  expressionCalculator({
    id: 311,
    categoryId: cat.finance,
    name: "Freelance Rate Calculator",
    slug: "freelance-rate-calculator",
    shortDescription: "Estimate an hourly and project rate from income goals, costs, taxes, and billable hours.",
    fields: [numberField("targetIncome", "Target income", "90000", "USD", 0), numberField("businessCosts", "Annual business costs", "12000", "USD", 0), numberField("taxRate", "Tax rate", "25", "%", 0), numberField("billableHours", "Billable hours per year", "1200", "hr", 1, 1), numberField("projectHours", "Example project hours", "20", "hr", 1, 1)],
    expressions: { requiredRevenue: "(targetIncome + businessCosts) / max(1 - taxRate / 100, 0.01)", hourlyRate: "((targetIncome + businessCosts) / max(1 - taxRate / 100, 0.01)) / billableHours", projectRate: "((targetIncome + businessCosts) / max(1 - taxRate / 100, 0.01)) / billableHours * projectHours" },
    results: [result("requiredRevenue", "Required annual revenue", "currency"), result("hourlyRate", "Target hourly rate", "currency"), result("projectRate", "Example project rate", "currency")],
    relatedSlugs: ["take-home-pay-calculator", "hourly-to-salary-calculator", "commission-calculator"]
  }),
  expressionCalculator({
    id: 312,
    categoryId: cat.finance,
    name: "Take-Home Pay Calculator",
    slug: "take-home-pay-calculator",
    shortDescription: "Estimate take-home pay after tax and other deductions.",
    fields: [numberField("grossPay", "Gross pay", "5500", "USD", 0), numberField("taxRate", "Tax rate", "22", "%", 0), numberField("otherDeductions", "Other deductions", "250", "USD", 0)],
    expressions: { taxAmount: "grossPay * taxRate / 100", netPay: "grossPay - grossPay * taxRate / 100 - otherDeductions", effectiveNetPercent: "(grossPay - grossPay * taxRate / 100 - otherDeductions) / grossPay * 100" },
    results: [result("taxAmount", "Tax amount", "currency"), result("netPay", "Take-home pay", "currency"), result("effectiveNetPercent", "Net pay rate", "percent")],
    relatedSlugs: ["hourly-to-salary-calculator", "overtime-calculator", "freelance-rate-calculator"]
  }),
  expressionCalculator({
    id: 313,
    categoryId: cat.finance,
    name: "ROAS Calculator",
    slug: "roas-calculator",
    shortDescription: "Measure return on ad spend and revenue left after ad cost.",
    fields: [numberField("revenue", "Revenue", "6500", "USD", 0), numberField("adSpend", "Ad spend", "1200", "USD", 0)],
    expressions: { roas: "revenue / adSpend", revenueAfterAds: "revenue - adSpend" },
    results: [result("roas", "ROAS"), result("revenueAfterAds", "Revenue after ads", "currency")],
    relatedSlugs: ["roi-calculator", "cpm-calculator", "cpc-calculator", "shopify-profit-calculator"]
  }),
  expressionCalculator({
    id: 314,
    categoryId: cat.finance,
    name: "ROI Calculator",
    slug: "roi-calculator",
    shortDescription: "Calculate return on investment from gain and cost.",
    fields: [numberField("returnValue", "Return value", "6500", "USD", 0), numberField("cost", "Cost", "4200", "USD", 0)],
    expressions: { profit: "returnValue - cost", roiPercent: "(returnValue - cost) / cost * 100" },
    results: [result("profit", "Profit", "currency"), result("roiPercent", "ROI", "percent")],
    relatedSlugs: ["roas-calculator", "cpm-calculator", "cpc-calculator"]
  }),
  expressionCalculator({
    id: 315,
    categoryId: cat.finance,
    name: "CPM Calculator",
    slug: "cpm-calculator",
    shortDescription: "Estimate cost per thousand impressions from spend and impressions.",
    fields: [numberField("spend", "Spend", "450", "USD", 0), numberField("impressions", "Impressions", "85000", "impr", 1, 1)],
    expressions: { cpm: "spend / impressions * 1000" },
    results: [result("cpm", "CPM", "currency")],
    relatedSlugs: ["cpc-calculator", "roas-calculator", "roi-calculator"]
  }),
  expressionCalculator({
    id: 316,
    categoryId: cat.finance,
    name: "CPC Calculator",
    slug: "cpc-calculator",
    shortDescription: "Estimate cost per click from total spend and click volume.",
    fields: [numberField("spend", "Spend", "450", "USD", 0), numberField("clicks", "Clicks", "1800", "clicks", 1, 1)],
    expressions: { cpc: "spend / clicks" },
    results: [result("cpc", "CPC", "currency")],
    relatedSlugs: ["cpm-calculator", "roas-calculator", "roi-calculator"]
  }),
  expressionCalculator({
    id: 317,
    categoryId: cat.finance,
    name: "Etsy Fee Calculator",
    slug: "etsy-fee-calculator",
    shortDescription: "Estimate marketplace fees, net proceeds, and profit for an Etsy-style order.",
    fields: [numberField("itemPrice", "Item price", "42", "USD", 0), numberField("shippingCharged", "Shipping charged", "6", "USD", 0), numberField("productCost", "Product cost", "14", "USD", 0), numberField("shippingCost", "Shipping cost", "5", "USD", 0), numberField("transactionFeeRate", "Transaction fee", "6.5", "%", 0), numberField("paymentFeeRate", "Payment fee", "3", "%", 0), numberField("listingFee", "Listing fee", "0.2", "USD", 0), numberField("adSpend", "Ads or offsite fee", "2", "USD", 0)],
    expressions: { grossRevenue: "itemPrice + shippingCharged", platformFees: "(itemPrice + shippingCharged) * transactionFeeRate / 100 + (itemPrice + shippingCharged) * paymentFeeRate / 100 + listingFee", netProfit: "itemPrice + shippingCharged - productCost - shippingCost - adSpend - ((itemPrice + shippingCharged) * transactionFeeRate / 100 + (itemPrice + shippingCharged) * paymentFeeRate / 100 + listingFee)" },
    results: [result("grossRevenue", "Gross revenue", "currency"), result("platformFees", "Platform fees", "currency"), result("netProfit", "Net profit", "currency")],
    relatedSlugs: ["shopify-profit-calculator", "roas-calculator", "shipping-cost-comparison-calculator"]
  }),
  expressionCalculator({
    id: 318,
    categoryId: cat.finance,
    name: "Shopify Profit Calculator",
    slug: "shopify-profit-calculator",
    shortDescription: "Estimate ecommerce order profit after product cost, shipping, fees, and ad spend.",
    fields: [numberField("productPrice", "Product price", "58", "USD", 0), numberField("shippingCharged", "Shipping charged", "7", "USD", 0), numberField("productCost", "Product cost", "18", "USD", 0), numberField("shippingCost", "Shipping cost", "6", "USD", 0), numberField("paymentFeeRate", "Payment fee", "2.9", "%", 0), numberField("adSpend", "Ad spend", "8", "USD", 0)],
    expressions: { grossRevenue: "productPrice + shippingCharged", paymentFees: "(productPrice + shippingCharged) * paymentFeeRate / 100", netProfit: "productPrice + shippingCharged - productCost - shippingCost - adSpend - ((productPrice + shippingCharged) * paymentFeeRate / 100)" },
    results: [result("grossRevenue", "Gross revenue", "currency"), result("paymentFees", "Payment fees", "currency"), result("netProfit", "Net profit", "currency")],
    relatedSlugs: ["etsy-fee-calculator", "roas-calculator", "profit-margin-calculator"]
  }),
  expressionCalculator({
    id: 319,
    categoryId: cat.home,
    name: "Concrete Cost Calculator",
    slug: "concrete-cost-calculator",
    shortDescription: "Estimate concrete volume, bag count, and cost from slab dimensions.",
    fields: [numberField("lengthFt", "Length", "18", "ft", 0), numberField("widthFt", "Width", "12", "ft", 0), numberField("depthIn", "Depth", "4", "in", 0), numberField("costPerCubicYard", "Cost per cubic yard", "165", "USD", 0), numberField("bagYieldCubicFt", "Bag yield", "0.45", "ft3", 0.01)],
    expressions: { cubicFeet: "lengthFt * widthFt * depthIn / 12", cubicYards: "lengthFt * widthFt * depthIn / 12 / 27", bagCount: "ceil((lengthFt * widthFt * depthIn / 12) / bagYieldCubicFt)", estimatedCost: "lengthFt * widthFt * depthIn / 12 / 27 * costPerCubicYard" },
    results: [result("cubicFeet", "Cubic feet"), result("cubicYards", "Cubic yards"), result("bagCount", "Estimated bags", "number", 0), result("estimatedCost", "Estimated cost", "currency")],
    relatedSlugs: ["gravel-calculator", "square-footage-calculator", "flooring-calculator"]
  }),
  expressionCalculator({
    id: 320,
    categoryId: cat.home,
    name: "Gravel Calculator",
    slug: "gravel-calculator",
    shortDescription: "Estimate gravel volume, tonnage, and material cost.",
    fields: [numberField("lengthFt", "Length", "30", "ft", 0), numberField("widthFt", "Width", "12", "ft", 0), numberField("depthIn", "Depth", "3", "in", 0), numberField("densityTonPerYard", "Density", "1.4", "ton/yd3", 0.1), numberField("costPerTon", "Cost per ton", "52", "USD", 0)],
    expressions: { cubicYards: "lengthFt * widthFt * depthIn / 12 / 27", tonsNeeded: "lengthFt * widthFt * depthIn / 12 / 27 * densityTonPerYard", estimatedCost: "lengthFt * widthFt * depthIn / 12 / 27 * densityTonPerYard * costPerTon" },
    results: [result("cubicYards", "Cubic yards"), result("tonsNeeded", "Tons needed"), result("estimatedCost", "Estimated cost", "currency")],
    relatedSlugs: ["concrete-cost-calculator", "square-footage-calculator", "flooring-calculator"]
  }),
  expressionCalculator({
    id: 321,
    categoryId: cat.home,
    name: "Paint Calculator",
    slug: "paint-calculator",
    shortDescription: "Estimate gallons to buy and total paint cost from wall area, coats, and waste.",
    fields: [numberField("wallAreaSqFt", "Wall area", "540", "ft2", 0), numberField("coats", "Coats", "2", undefined, 1, 1), numberField("coverageSqFtPerGallon", "Coverage per gallon", "350", "ft2", 1), numberField("wastePercent", "Waste", "10", "%", 0), numberField("costPerGallon", "Cost per gallon", "42", "USD", 0)],
    expressions: { gallonsNeeded: "wallAreaSqFt * coats * (1 + wastePercent / 100) / coverageSqFtPerGallon", gallonsToBuy: "ceil(wallAreaSqFt * coats * (1 + wastePercent / 100) / coverageSqFtPerGallon)", estimatedCost: "ceil(wallAreaSqFt * coats * (1 + wastePercent / 100) / coverageSqFtPerGallon) * costPerGallon" },
    results: [result("gallonsNeeded", "Gallons needed"), result("gallonsToBuy", "Gallons to buy", "number", 0), result("estimatedCost", "Estimated cost", "currency")],
    relatedSlugs: ["square-footage-calculator", "flooring-calculator", "tile-area-calculator"]
  }),
  expressionCalculator({
    id: 322,
    categoryId: cat.home,
    name: "Square Footage Calculator",
    slug: "square-footage-calculator",
    shortDescription: "Calculate area in square feet and square meters from length and width.",
    fields: [numberField("lengthFt", "Length", "18", "ft", 0), numberField("widthFt", "Width", "12", "ft", 0)],
    expressions: { areaSqFt: "lengthFt * widthFt", areaSqM: "lengthFt * widthFt / 10.7639" },
    results: [result("areaSqFt", "Area square feet"), result("areaSqM", "Area square meters")],
    relatedSlugs: ["paint-calculator", "concrete-cost-calculator", "gravel-calculator", "flooring-calculator"]
  }),
  expressionCalculator({
    id: 323,
    categoryId: cat.home,
    name: "Flooring Calculator",
    slug: "flooring-calculator",
    shortDescription: "Estimate flooring boxes and project cost from room area, box coverage, and waste factor.",
    fields: [numberField("roomAreaSqFt", "Room area", "540", "ft2", 0), numberField("coveragePerBox", "Coverage per box", "22", "ft2", 0.01), numberField("wastePercent", "Waste", "10", "%", 0), numberField("costPerBox", "Cost per box", "58", "USD", 0)],
    expressions: { boxesNeeded: "ceil(roomAreaSqFt * (1 + wastePercent / 100) / coveragePerBox)", projectCost: "ceil(roomAreaSqFt * (1 + wastePercent / 100) / coveragePerBox) * costPerBox" },
    results: [result("boxesNeeded", "Boxes needed", "number", 0), result("projectCost", "Project cost", "currency")],
    relatedSlugs: ["square-footage-calculator", "paint-calculator", "tile-area-calculator"]
  })
];
