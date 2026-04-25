import type { Calculator, CalculatorCategory } from "@/lib/calculators/types";
import { expandedCalculators } from "@/lib/expanded-calculators";

type CalculatorSeed = Omit<Calculator, "status" | "updatedAt" | "seo"> & {
  updatedAt?: string;
  seoTitle: string;
  seoDescription: string;
};

const publishedAt = "2026-04-12";

function calculator(seed: CalculatorSeed): Calculator {
  const { seoTitle, seoDescription, updatedAt, ...rest } = seed;

  return {
    ...rest,
    status: "published",
    updatedAt: updatedAt ?? publishedAt,
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonical: `/calculator/${seed.slug}`,
      robots: "index,follow"
    }
  };
}

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" }
];

const activityOptions = [
  { label: "Sedentary", value: "1.2" },
  { label: "Lightly active", value: "1.375" },
  { label: "Moderately active", value: "1.55" },
  { label: "Very active", value: "1.725" }
];

const compoundOptions = [
  { label: "Annually", value: "1" },
  { label: "Quarterly", value: "4" },
  { label: "Monthly", value: "12" },
  { label: "Daily", value: "365" }
];

const lengthUnitOptions = [
  { label: "Millimeters", value: "millimeter" },
  { label: "Centimeters", value: "centimeter" },
  { label: "Meters", value: "meter" },
  { label: "Kilometers", value: "kilometer" },
  { label: "Inches", value: "inch" },
  { label: "Feet", value: "foot" },
  { label: "Yards", value: "yard" },
  { label: "Miles", value: "mile" }
];

const weightUnitOptions = [
  { label: "Grams", value: "gram" },
  { label: "Kilograms", value: "kilogram" },
  { label: "Ounces", value: "ounce" },
  { label: "Pounds", value: "pound" },
  { label: "US tons", value: "ton" }
];

const temperatureUnitOptions = [
  { label: "Celsius", value: "celsius" },
  { label: "Fahrenheit", value: "fahrenheit" },
  { label: "Kelvin", value: "kelvin" }
];

export const categories: CalculatorCategory[] = [
  {
    id: 1,
    name: "Health",
    slug: "health",
    description: "Everyday health and fitness estimators with clear formulas and plain-language notes.",
    seoTitle: "Health Calculators | BMI, Calories and Fitness Tools",
    seoDescription: "Use free health calculators for BMI, calories, body fat, and running pace estimates.",
    status: "published",
    sortOrder: 1
  },
  {
    id: 2,
    name: "Finance",
    slug: "finance",
    description: "Personal finance calculators for loans, mortgages, interest, savings goals, and trip costs.",
    seoTitle: "Finance Calculators | Loan, Mortgage and Savings Tools",
    seoDescription: "Run quick finance calculations with transparent formulas and examples.",
    status: "published",
    sortOrder: 2
  },
  {
    id: 3,
    name: "Math",
    slug: "math",
    description: "Simple math helpers for percentages, discounts, taxes, tips, and everyday comparisons.",
    seoTitle: "Math Calculators | Percentage, Discount and Tax Tools",
    seoDescription: "Solve common percentage, discount, tax, and tip problems online.",
    status: "published",
    sortOrder: 3
  },
  {
    id: 4,
    name: "Conversion",
    slug: "conversion",
    description: "Unit conversion calculators for length, weight, and temperature.",
    seoTitle: "Conversion Calculators | Length, Weight and Temperature",
    seoDescription: "Convert common units online with simple conversion calculators.",
    status: "published",
    sortOrder: 4
  },
  {
    id: 5,
    name: "Date & Time",
    slug: "date-time",
    description: "Date and time calculators for ages, date differences, and work duration estimates.",
    seoTitle: "Date and Time Calculators | Age, Duration and Date Difference",
    seoDescription: "Calculate ages, date differences, and time durations with free online tools.",
    status: "published",
    sortOrder: 5
  },
  {
    id: 6,
    name: "Core Tools",
    slug: "core-tools",
    description: "General-purpose calculators and utility tools for quick everyday work.",
    seoTitle: "Core Online Tools | Calculators and Utility Helpers",
    seoDescription: "Use practical online tools for expressions, lists, counters, and quick utility tasks.",
    status: "published",
    sortOrder: 6
  },
  {
    id: 7,
    name: "Transit & Mobility",
    slug: "transit-mobility",
    description: "Travel, car, fuel, cycling, distance, and mobility calculators with editable assumptions.",
    seoTitle: "Transit and Mobility Calculators | Fuel, Taxi, Car and Bike Tools",
    seoDescription: "Estimate transit, driving, cycling, distance, fuel, and vehicle costs with flexible calculators.",
    status: "published",
    sortOrder: 7
  },
  {
    id: 8,
    name: "Home & Family",
    slug: "home-family",
    description: "Home, appliance, parenting, pet, aquarium, and household calculators.",
    seoTitle: "Home and Family Calculators | Household Planning Tools",
    seoDescription: "Plan household costs, appliance use, room needs, family dates, and pet care estimates.",
    status: "published",
    sortOrder: 8
  },
  {
    id: 9,
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Lightweight lifestyle estimators for habits, spending, random picks, and personal planning.",
    seoTitle: "Lifestyle Calculators | Habit, Random Pick and Personal Planning Tools",
    seoDescription: "Use simple lifestyle calculators for habits, lists, pets, decisions, and spending estimates.",
    status: "published",
    sortOrder: 9
  },
  {
    id: 10,
    name: "Text Tools",
    slug: "text-tools",
    description: "Text utilities for counting, transforming, and checking written content.",
    seoTitle: "Text Tools | Word Count and Writing Helpers",
    seoDescription: "Count words, characters, lines, and text values with simple online text utilities.",
    status: "published",
    sortOrder: 10
  },
  {
    id: 11,
    name: "Tech",
    slug: "tech",
    description: "Technology calculators for screens, power, charging, media, and device planning.",
    seoTitle: "Tech Calculators | PPI, Power, Charging and Device Tools",
    seoDescription: "Estimate screen density, battery power, charging costs, and other technology measurements.",
    status: "published",
    sortOrder: 11
  },
  {
    id: 12,
    name: "Sports",
    slug: "sports",
    description: "Sports statistics and training calculators for quick performance estimates.",
    seoTitle: "Sports Calculators | Baseball and Running Tools",
    seoDescription: "Calculate sports stats and training estimates with quick online tools.",
    status: "published",
    sortOrder: 12
  },
  {
    id: 13,
    name: "Time Tools",
    slug: "time-tools",
    description: "Timers, cycles, alarms, and schedule planning tools.",
    seoTitle: "Time Tools | Timers, Alarms and Schedule Calculators",
    seoDescription: "Plan timers, alarms, work cycles, and elapsed time with online time tools.",
    status: "published",
    sortOrder: 13
  },
  {
    id: 14,
    name: "Media Tools",
    slug: "media-tools",
    description: "Media, video, color, and creator utilities for quick planning tasks.",
    seoTitle: "Media Tools | Video, Color and Creator Calculators",
    seoDescription: "Use media utilities for creator workflows, color counts, video lists, and production planning.",
    status: "published",
    sortOrder: 14
  }
];

export const calculators: Calculator[] = [
  calculator({
    id: 101,
    categoryId: 1,
    name: "BMI Calculator",
    slug: "bmi-calculator",
    h1: "BMI Calculator",
    shortDescription: "Calculate body mass index from height and weight.",
    longDescription:
      "This BMI calculator estimates body mass index using the standard metric formula. It is intended for quick screening and should not replace medical advice.",
    intro: "Enter your height and weight to estimate BMI and a general healthy-weight range.",
    howToUse: ["Enter your weight in kilograms.", "Enter your height in centimeters.", "Review the BMI result and healthy-weight range."],
    formulaExplanation: "BMI = weight in kilograms / height in meters squared.",
    examples: ["Example: 70 kg and 175 cm gives a BMI of 22.86."],
    notes: ["BMI is a screening metric and does not account for body composition, age, or pregnancy."],
    formulaType: "bmi",
    fields: [
      { key: "weightKg", label: "Weight", type: "number", placeholder: "70", defaultValue: "70", unit: "kg", required: true, min: 1, step: 0.1 },
      { key: "heightCm", label: "Height", type: "number", placeholder: "175", defaultValue: "175", unit: "cm", required: true, min: 1, step: 0.1 }
    ],
    results: [
      { key: "bmi", label: "BMI", format: "number", decimalPlaces: 2, description: "Estimated body mass index." },
      { key: "healthyWeightLow", label: "Healthy range low", format: "number", decimalPlaces: 1, description: "Lower end of the BMI 18.5-24.9 range in kg." },
      { key: "healthyWeightHigh", label: "Healthy range high", format: "number", decimalPlaces: 1, description: "Upper end of the BMI 18.5-24.9 range in kg." }
    ],
    faqs: [
      { question: "Is BMI accurate for everyone?", answer: "BMI is a quick screening metric. It can be less useful for athletes, older adults, children, and pregnant people." },
      { question: "What formula does this calculator use?", answer: "It uses weight in kilograms divided by height in meters squared." }
    ],
    relatedSlugs: ["calorie-calculator", "body-fat-calculator", "pace-calculator"],
    seoTitle: "BMI Calculator - Check Your Body Mass Index",
    seoDescription: "Use this free BMI calculator to estimate your body mass index from height and weight."
  }),
  calculator({
    id: 102,
    categoryId: 2,
    name: "Loan Payment Calculator",
    slug: "loan-payment-calculator",
    h1: "Loan Payment Calculator",
    shortDescription: "Estimate monthly loan payments, total payment, and total interest.",
    longDescription:
      "Use this loan payment calculator to estimate the monthly payment for a fixed-rate loan and see how interest changes the total repayment amount.",
    intro: "Enter a loan amount, annual interest rate, and term to estimate your monthly payment.",
    howToUse: ["Enter the amount borrowed.", "Add the annual interest rate.", "Enter the repayment term in years."],
    formulaExplanation: "Monthly payment = principal x monthly rate / (1 - (1 + monthly rate)^(-number of months)).",
    examples: ["Example: A $25,000 loan at 6.5% over 5 years is about $489.15 per month."],
    notes: ["This estimate excludes taxes, fees, insurance, and variable-rate changes."],
    formulaType: "loan_payment",
    fields: [
      { key: "principal", label: "Loan amount", type: "number", placeholder: "25000", defaultValue: "25000", unit: "USD", required: true, min: 1, step: 100 },
      { key: "annualRate", label: "Annual rate", type: "number", placeholder: "6.5", defaultValue: "6.5", unit: "%", required: true, min: 0, step: 0.1 },
      { key: "years", label: "Loan term", type: "number", placeholder: "5", defaultValue: "5", unit: "years", required: true, min: 0.1, step: 0.5 }
    ],
    results: [
      { key: "monthlyPayment", label: "Monthly payment", format: "currency", decimalPlaces: 2 },
      { key: "totalPayment", label: "Total payment", format: "currency", decimalPlaces: 2 },
      { key: "totalInterest", label: "Total interest", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does this calculator include taxes or fees?", answer: "No. It estimates principal and interest only unless those costs are included in the loan amount." },
      { question: "Can the interest rate be zero?", answer: "Yes. If the rate is zero, the calculator divides the principal evenly across the term." }
    ],
    relatedSlugs: ["mortgage-calculator", "compound-interest-calculator", "savings-goal-calculator"],
    seoTitle: "Loan Payment Calculator - Monthly Payment Estimate",
    seoDescription: "Estimate monthly loan payments, total repayment, and total interest with a clear formula."
  }),
  calculator({
    id: 103,
    categoryId: 3,
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    h1: "Percentage Calculator",
    shortDescription: "Find a percentage of a number and compare increase or decrease.",
    longDescription: "This percentage calculator helps you find a percent of a base value and quickly see the amount after an increase or decrease.",
    intro: "Enter a base value and a percentage to calculate the percentage amount.",
    howToUse: ["Enter the base number.", "Enter the percentage.", "Compare the raw percentage value and adjusted totals."],
    formulaExplanation: "Percentage value = base value x percentage / 100.",
    examples: ["Example: 15% of 80 is 12. Increasing 80 by 15% gives 92."],
    notes: ["Use negative values only when you intentionally want to model a negative base."],
    formulaType: "percentage",
    fields: [
      { key: "baseValue", label: "Base value", type: "number", placeholder: "80", defaultValue: "80", required: true, step: 0.01 },
      { key: "percent", label: "Percentage", type: "number", placeholder: "15", defaultValue: "15", unit: "%", required: true, step: 0.01 }
    ],
    results: [
      { key: "percentageValue", label: "Percentage value", format: "number", decimalPlaces: 2 },
      { key: "totalAfterIncrease", label: "After increase", format: "number", decimalPlaces: 2 },
      { key: "totalAfterDecrease", label: "After decrease", format: "number", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "How do I calculate 20% of a number?", answer: "Multiply the number by 20, then divide by 100." },
      { question: "Can this calculator show percentage decrease?", answer: "Yes. It displays the total after subtracting the percentage value from the base value." }
    ],
    relatedSlugs: ["discount-calculator", "sales-tax-calculator", "tip-calculator"],
    seoTitle: "Percentage Calculator - Find Percent of a Number",
    seoDescription: "Calculate percentages, increases, and decreases with a simple online percentage calculator."
  }),
  calculator({
    id: 104,
    categoryId: 2,
    name: "Unit Price Calculator",
    slug: "unit-price-calculator",
    h1: "Unit Price Calculator",
    shortDescription: "Compare prices by calculating cost per unit.",
    longDescription: "Use this unit price calculator to compare packages, grocery items, and bulk purchases with a common cost-per-unit value.",
    intro: "Enter the total price and quantity to find the price per unit.",
    howToUse: ["Enter the total package price.", "Enter the number of units.", "Use the unit price to compare alternatives."],
    formulaExplanation: "Unit price = total price / quantity.",
    examples: ["Example: $18 for 12 items equals $1.50 per item."],
    notes: ["Use the same unit type when comparing products."],
    formulaType: "unit_price",
    fields: [
      { key: "totalPrice", label: "Total price", type: "number", placeholder: "18", defaultValue: "18", unit: "USD", required: true, min: 0.01, step: 0.01 },
      { key: "quantity", label: "Quantity", type: "number", placeholder: "12", defaultValue: "12", required: true, min: 0.01, step: 0.01 }
    ],
    results: [{ key: "unitPrice", label: "Unit price", format: "currency", decimalPlaces: 2 }],
    faqs: [
      { question: "What is unit price?", answer: "Unit price is the cost for one unit of a product, such as one item, ounce, pound, or liter." },
      { question: "Why compare unit prices?", answer: "It makes packages with different sizes easier to compare." }
    ],
    relatedSlugs: ["discount-calculator", "sales-tax-calculator", "percentage-calculator"],
    seoTitle: "Unit Price Calculator - Compare Cost Per Unit",
    seoDescription: "Find cost per unit for groceries, bulk purchases, and everyday price comparisons."
  }),
  calculator({
    id: 105,
    categoryId: 2,
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    h1: "Compound Interest Calculator",
    shortDescription: "Estimate future value and interest earned over time.",
    longDescription: "This compound interest calculator estimates how an initial principal can grow with repeated compounding over a selected time period.",
    intro: "Enter principal, annual rate, years, and compounding frequency to estimate future value.",
    howToUse: ["Enter your starting amount.", "Enter the expected annual rate.", "Choose the number of years and compounding periods per year."],
    formulaExplanation: "Future value = principal x (1 + annual rate / compounding periods)^(periods x years).",
    examples: ["Example: $10,000 at 5% compounded monthly for 10 years grows to about $16,470.09."],
    notes: ["This estimate does not include taxes, fees, inflation, or added contributions."],
    formulaType: "compound_interest",
    fields: [
      { key: "principal", label: "Principal", type: "number", placeholder: "10000", defaultValue: "10000", unit: "USD", required: true, min: 0.01, step: 100 },
      { key: "annualRate", label: "Annual rate", type: "number", placeholder: "5", defaultValue: "5", unit: "%", required: true, min: 0, step: 0.1 },
      { key: "years", label: "Years", type: "number", placeholder: "10", defaultValue: "10", unit: "years", required: true, min: 0.1, step: 0.5 },
      { key: "compoundsPerYear", label: "Compounds per year", type: "select", defaultValue: "12", required: true, options: compoundOptions }
    ],
    results: [
      { key: "futureValue", label: "Future value", format: "currency", decimalPlaces: 2 },
      { key: "interestEarned", label: "Interest earned", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "What does compounding mean?", answer: "Compounding means interest is added to the balance, and future interest is calculated on that larger balance." },
      { question: "Does this include monthly contributions?", answer: "No. This estimate uses a single starting principal." }
    ],
    relatedSlugs: ["savings-goal-calculator", "loan-payment-calculator", "mortgage-calculator"],
    seoTitle: "Compound Interest Calculator - Future Value Estimate",
    seoDescription: "Estimate compound interest, future value, and interest earned over time."
  }),
  calculator({
    id: 106,
    categoryId: 2,
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    h1: "Mortgage Calculator",
    shortDescription: "Estimate mortgage principal, interest, and monthly housing costs.",
    longDescription: "This mortgage calculator estimates the loan amount, principal and interest payment, total monthly cost, and interest over the loan term.",
    intro: "Enter home price, down payment, rate, term, and monthly costs to estimate mortgage payments.",
    howToUse: ["Enter the home price and down payment.", "Add the interest rate and term.", "Include monthly property tax and insurance estimates."],
    formulaExplanation: "Mortgage payment uses the fixed-rate amortization formula and adds optional monthly tax and insurance costs.",
    examples: ["Example: A $400,000 home with $80,000 down at 6.75% over 30 years has about $2,075 principal and interest."],
    notes: ["This estimate does not include HOA fees, PMI, closing costs, or rate changes."],
    formulaType: "mortgage_payment",
    fields: [
      { key: "homePrice", label: "Home price", type: "number", placeholder: "400000", defaultValue: "400000", unit: "USD", required: true, min: 1, step: 1000 },
      { key: "downPayment", label: "Down payment", type: "number", placeholder: "80000", defaultValue: "80000", unit: "USD", required: true, min: 0, step: 1000 },
      { key: "annualRate", label: "Annual rate", type: "number", placeholder: "6.75", defaultValue: "6.75", unit: "%", required: true, min: 0, step: 0.01 },
      { key: "years", label: "Loan term", type: "number", placeholder: "30", defaultValue: "30", unit: "years", required: true, min: 1, step: 1 },
      { key: "propertyTaxMonthly", label: "Monthly property tax", type: "number", placeholder: "350", defaultValue: "350", unit: "USD", required: true, min: 0, step: 10 },
      { key: "insuranceMonthly", label: "Monthly insurance", type: "number", placeholder: "125", defaultValue: "125", unit: "USD", required: true, min: 0, step: 10 }
    ],
    results: [
      { key: "loanAmount", label: "Loan amount", format: "currency", decimalPlaces: 2 },
      { key: "principalAndInterest", label: "Principal and interest", format: "currency", decimalPlaces: 2 },
      { key: "monthlyTotal", label: "Estimated monthly total", format: "currency", decimalPlaces: 2 },
      { key: "totalInterest", label: "Total interest", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does this include PMI?", answer: "No. Add PMI separately if it applies to your loan." },
      { question: "Why include tax and insurance?", answer: "They are common monthly housing costs and help estimate a more realistic monthly total." }
    ],
    relatedSlugs: ["loan-payment-calculator", "compound-interest-calculator", "savings-goal-calculator"],
    seoTitle: "Mortgage Calculator - Estimate Monthly House Payment",
    seoDescription: "Estimate mortgage payment, loan amount, monthly housing cost, and total interest."
  }),
  calculator({
    id: 107,
    categoryId: 3,
    name: "Tip Calculator",
    slug: "tip-calculator",
    h1: "Tip Calculator",
    shortDescription: "Calculate tip amount, total bill, and split cost per person.",
    longDescription: "Use this tip calculator to estimate gratuity, total cost, and how much each person pays when splitting a bill.",
    intro: "Enter bill amount, tip percentage, and number of people to split the total.",
    howToUse: ["Enter the bill before tip.", "Choose a tip percentage.", "Enter the number of people sharing the bill."],
    formulaExplanation: "Tip = bill amount x tip percentage / 100. Per person = total amount / people.",
    examples: ["Example: $80 with an 18% tip is $14.40 tip and $94.40 total."],
    notes: ["Local tipping customs and service charges can vary."],
    formulaType: "tip",
    fields: [
      { key: "billAmount", label: "Bill amount", type: "number", placeholder: "80", defaultValue: "80", unit: "USD", required: true, min: 0.01, step: 0.01 },
      { key: "tipPercent", label: "Tip", type: "number", placeholder: "18", defaultValue: "18", unit: "%", required: true, min: 0, step: 0.5 },
      { key: "people", label: "People", type: "number", placeholder: "2", defaultValue: "2", required: true, min: 1, step: 1 }
    ],
    results: [
      { key: "tipAmount", label: "Tip amount", format: "currency", decimalPlaces: 2 },
      { key: "totalAmount", label: "Total amount", format: "currency", decimalPlaces: 2 },
      { key: "perPerson", label: "Per person", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does this include tax?", answer: "It uses the bill amount you enter. Include tax in the bill amount if you want to tip on the taxed total." },
      { question: "Can I split the bill?", answer: "Yes. Enter the number of people and the calculator divides the total evenly." }
    ],
    relatedSlugs: ["percentage-calculator", "discount-calculator", "sales-tax-calculator"],
    seoTitle: "Tip Calculator - Split Bill and Tip Amount",
    seoDescription: "Calculate tip amount, total bill, and per-person split with a free tip calculator."
  }),
  calculator({
    id: 108,
    categoryId: 3,
    name: "Discount Calculator",
    slug: "discount-calculator",
    h1: "Discount Calculator",
    shortDescription: "Calculate sale price, discount amount, and optional tax.",
    longDescription: "This discount calculator finds the savings from a percentage discount and estimates the final price after optional sales tax.",
    intro: "Enter original price, discount percentage, and tax rate to estimate the final price.",
    howToUse: ["Enter the original price.", "Enter the discount percentage.", "Add tax rate if you want an after-tax total."],
    formulaExplanation: "Discount amount = original price x discount percentage / 100. Sale price = original price - discount amount.",
    examples: ["Example: 25% off $120 saves $30 and gives a $90 sale price before tax."],
    notes: ["Some stores apply coupons and taxes in different orders."],
    formulaType: "discount",
    fields: [
      { key: "originalPrice", label: "Original price", type: "number", placeholder: "120", defaultValue: "120", unit: "USD", required: true, min: 0.01, step: 0.01 },
      { key: "discountPercent", label: "Discount", type: "number", placeholder: "25", defaultValue: "25", unit: "%", required: true, min: 0, max: 100, step: 0.1 },
      { key: "taxPercent", label: "Tax", type: "number", placeholder: "8", defaultValue: "8", unit: "%", required: true, min: 0, step: 0.1 }
    ],
    results: [
      { key: "discountAmount", label: "Discount amount", format: "currency", decimalPlaces: 2 },
      { key: "salePrice", label: "Sale price", format: "currency", decimalPlaces: 2 },
      { key: "totalAfterTax", label: "After-tax total", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Can I enter zero tax?", answer: "Yes. Enter 0 if tax does not apply or if you only need the pre-tax sale price." },
      { question: "What is the sale price formula?", answer: "Sale price is original price minus the discount amount." }
    ],
    relatedSlugs: ["percentage-calculator", "sales-tax-calculator", "unit-price-calculator"],
    seoTitle: "Discount Calculator - Sale Price and Savings",
    seoDescription: "Find discount amount, sale price, and after-tax total from an original price and discount percent."
  }),
  calculator({
    id: 109,
    categoryId: 3,
    name: "Sales Tax Calculator",
    slug: "sales-tax-calculator",
    h1: "Sales Tax Calculator",
    shortDescription: "Calculate tax amount and total price after tax.",
    longDescription: "Use this sales tax calculator to estimate tax amount and final price from a purchase amount and sales tax rate.",
    intro: "Enter a price and tax rate to estimate sales tax and the total after tax.",
    howToUse: ["Enter the pre-tax price.", "Enter the sales tax rate.", "Review the tax amount and final total."],
    formulaExplanation: "Tax amount = price x tax rate / 100. Total = price + tax amount.",
    examples: ["Example: $50 at 8.25% tax adds $4.13, for a total of $54.13."],
    notes: ["Actual tax rules can vary by location, product, and exemption."],
    formulaType: "sales_tax",
    fields: [
      { key: "price", label: "Price", type: "number", placeholder: "50", defaultValue: "50", unit: "USD", required: true, min: 0.01, step: 0.01 },
      { key: "taxRate", label: "Tax rate", type: "number", placeholder: "8.25", defaultValue: "8.25", unit: "%", required: true, min: 0, step: 0.01 }
    ],
    results: [
      { key: "taxAmount", label: "Tax amount", format: "currency", decimalPlaces: 2 },
      { key: "totalPrice", label: "Total price", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does this support tax-inclusive pricing?", answer: "No. This version assumes the entered price is before tax." },
      { question: "Can I use any tax rate?", answer: "Yes. Enter the rate that applies to your location or purchase." }
    ],
    relatedSlugs: ["discount-calculator", "tip-calculator", "percentage-calculator"],
    seoTitle: "Sales Tax Calculator - Tax Amount and Total Price",
    seoDescription: "Calculate sales tax amount and final price after tax from a price and tax rate."
  }),
  calculator({
    id: 110,
    categoryId: 2,
    name: "Savings Goal Calculator",
    slug: "savings-goal-calculator",
    h1: "Savings Goal Calculator",
    shortDescription: "Estimate how long it takes to reach a savings goal.",
    longDescription: "This savings goal calculator estimates remaining amount, months to goal, and years to goal based on monthly contributions.",
    intro: "Enter goal amount, current savings, and monthly contribution to estimate your timeline.",
    howToUse: ["Enter your savings goal.", "Enter how much you have already saved.", "Enter your planned monthly contribution."],
    formulaExplanation: "Months to goal = (goal amount - current savings) / monthly contribution.",
    examples: ["Example: Saving $500 per month toward a $12,000 goal from $2,000 saved takes 20 months."],
    notes: ["This simple estimate does not include interest, fees, or market returns."],
    formulaType: "savings_goal",
    fields: [
      { key: "goalAmount", label: "Goal amount", type: "number", placeholder: "12000", defaultValue: "12000", unit: "USD", required: true, min: 0.01, step: 100 },
      { key: "currentSavings", label: "Current savings", type: "number", placeholder: "2000", defaultValue: "2000", unit: "USD", required: true, min: 0, step: 100 },
      { key: "monthlyContribution", label: "Monthly contribution", type: "number", placeholder: "500", defaultValue: "500", unit: "USD", required: true, min: 0.01, step: 25 }
    ],
    results: [
      { key: "remainingAmount", label: "Remaining amount", format: "currency", decimalPlaces: 2 },
      { key: "monthsToGoal", label: "Months to goal", format: "number", decimalPlaces: 1 },
      { key: "yearsToGoal", label: "Years to goal", format: "number", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does this include interest?", answer: "No. It estimates a straight-line timeline from monthly contributions only." },
      { question: "What if I already reached the goal?", answer: "The remaining amount becomes zero, and the timeline shows zero months." }
    ],
    relatedSlugs: ["compound-interest-calculator", "loan-payment-calculator", "mortgage-calculator"],
    seoTitle: "Savings Goal Calculator - Months to Reach a Goal",
    seoDescription: "Estimate how many months and years it takes to reach a savings goal."
  }),
  calculator({
    id: 111,
    categoryId: 1,
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    h1: "Calorie Calculator",
    shortDescription: "Estimate BMR, maintenance calories, and a simple weight-loss target.",
    longDescription: "This calorie calculator uses the Mifflin-St Jeor equation to estimate basal metabolic rate and daily maintenance calories.",
    intro: "Enter body details and activity level to estimate daily calorie needs.",
    howToUse: ["Enter weight, height, and age.", "Choose gender and activity level.", "Review BMR and maintenance calories."],
    formulaExplanation: "BMR uses Mifflin-St Jeor: 10 x weight + 6.25 x height - 5 x age, plus a gender adjustment.",
    examples: ["Example: A 70 kg, 175 cm, 30-year-old moderately active male has an estimated TDEE near 2,600 calories."],
    notes: ["Calorie estimates are rough planning tools and do not replace medical or nutrition advice."],
    formulaType: "calorie",
    fields: [
      { key: "weightKg", label: "Weight", type: "number", placeholder: "70", defaultValue: "70", unit: "kg", required: true, min: 1, step: 0.1 },
      { key: "heightCm", label: "Height", type: "number", placeholder: "175", defaultValue: "175", unit: "cm", required: true, min: 1, step: 0.1 },
      { key: "age", label: "Age", type: "number", placeholder: "30", defaultValue: "30", unit: "years", required: true, min: 1, step: 1 },
      { key: "gender", label: "Gender", type: "select", defaultValue: "male", required: true, options: genderOptions },
      { key: "activityFactor", label: "Activity level", type: "select", defaultValue: "1.55", required: true, options: activityOptions }
    ],
    results: [
      { key: "bmr", label: "BMR", format: "number", decimalPlaces: 0, description: "Estimated calories burned at rest." },
      { key: "maintenanceCalories", label: "Maintenance calories", format: "number", decimalPlaces: 0 },
      { key: "weightLossCalories", label: "500-calorie deficit target", format: "number", decimalPlaces: 0 }
    ],
    faqs: [
      { question: "What is BMR?", answer: "BMR is an estimate of calories your body uses at rest." },
      { question: "Is the weight-loss target safe for everyone?", answer: "No. Calorie targets should be personalized, especially for medical conditions, pregnancy, or intense training." }
    ],
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "pace-calculator"],
    seoTitle: "Calorie Calculator - Estimate Daily Calorie Needs",
    seoDescription: "Estimate BMR, maintenance calories, and a simple calorie deficit target."
  }),
  calculator({
    id: 112,
    categoryId: 1,
    name: "Body Fat Calculator",
    slug: "body-fat-calculator",
    h1: "Body Fat Calculator",
    shortDescription: "Estimate body fat percentage using circumference measurements.",
    longDescription: "This body fat calculator uses the US Navy circumference method as a quick estimate from waist, neck, height, and optional hip measurement.",
    intro: "Enter circumference measurements in centimeters to estimate body fat percentage.",
    howToUse: ["Choose gender.", "Enter waist, neck, and height.", "Enter hip measurement for the female estimate."],
    formulaExplanation: "The calculator applies the US Navy circumference equations after converting centimeters to inches.",
    examples: ["Example: A male with 86 cm waist, 39 cm neck, and 178 cm height estimates near 18% body fat."],
    notes: ["This is an estimate and can differ from DEXA, calipers, or other measurement methods."],
    formulaType: "body_fat",
    fields: [
      { key: "gender", label: "Gender", type: "select", defaultValue: "male", required: true, options: genderOptions },
      { key: "waistCm", label: "Waist", type: "number", placeholder: "86", defaultValue: "86", unit: "cm", required: true, min: 1, step: 0.1 },
      { key: "neckCm", label: "Neck", type: "number", placeholder: "39", defaultValue: "39", unit: "cm", required: true, min: 1, step: 0.1 },
      { key: "heightCm", label: "Height", type: "number", placeholder: "178", defaultValue: "178", unit: "cm", required: true, min: 1, step: 0.1 },
      { key: "hipCm", label: "Hip", type: "number", placeholder: "96", defaultValue: "96", unit: "cm", required: false, min: 0, step: 0.1, helpText: "Required for female estimate." }
    ],
    results: [{ key: "bodyFatPercent", label: "Body fat", format: "percent", decimalPlaces: 1 }],
    faqs: [
      { question: "Is hip measurement always required?", answer: "It is required for the female US Navy estimate and ignored for the male estimate." },
      { question: "How accurate is this method?", answer: "It is a convenient estimate, but precision depends on measurement consistency and body type." }
    ],
    relatedSlugs: ["bmi-calculator", "calorie-calculator", "pace-calculator"],
    seoTitle: "Body Fat Calculator - Estimate Body Fat Percentage",
    seoDescription: "Estimate body fat percentage from waist, neck, height, and hip measurements."
  }),
  calculator({
    id: 113,
    categoryId: 1,
    name: "Pace Calculator",
    slug: "pace-calculator",
    h1: "Pace Calculator",
    shortDescription: "Calculate running pace, total minutes, and speed.",
    longDescription: "Use this pace calculator to estimate minutes per mile and miles per hour from distance and finish time.",
    intro: "Enter distance and time to calculate pace and speed.",
    howToUse: ["Enter distance in miles.", "Enter hours, minutes, and seconds.", "Review pace per mile and speed."],
    formulaExplanation: "Pace = total minutes / distance. Speed = distance / hours.",
    examples: ["Example: 6.2 miles in 50 minutes is about 8.06 minutes per mile."],
    notes: ["This version uses miles. Use the length converter if you need to convert kilometers first."],
    formulaType: "pace",
    fields: [
      { key: "distance", label: "Distance", type: "number", placeholder: "6.2", defaultValue: "6.2", unit: "mi", required: true, min: 0.01, step: 0.01 },
      { key: "hours", label: "Hours", type: "number", placeholder: "0", defaultValue: "0", required: true, min: 0, step: 1 },
      { key: "minutes", label: "Minutes", type: "number", placeholder: "50", defaultValue: "50", required: true, min: 0, step: 1 },
      { key: "seconds", label: "Seconds", type: "number", placeholder: "0", defaultValue: "0", required: true, min: 0, step: 1 }
    ],
    results: [
      { key: "totalMinutes", label: "Total minutes", format: "number", decimalPlaces: 2 },
      { key: "paceMinutesPerMile", label: "Pace minutes per mile", format: "number", decimalPlaces: 2 },
      { key: "speedMph", label: "Speed mph", format: "number", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Can I use kilometers?", answer: "This version labels the distance as miles. Convert kilometers to miles first for pace per mile." },
      { question: "What does pace mean?", answer: "Pace is the time it takes to cover one distance unit." }
    ],
    relatedSlugs: ["length-converter", "calorie-calculator", "bmi-calculator"],
    seoTitle: "Pace Calculator - Running Pace and Speed",
    seoDescription: "Calculate running pace, total minutes, and speed from distance and finish time."
  }),
  calculator({
    id: 114,
    categoryId: 5,
    name: "Age Calculator",
    slug: "age-calculator",
    h1: "Age Calculator",
    shortDescription: "Calculate age in years, months, and total months.",
    longDescription: "This age calculator estimates age from a birth date to a selected as-of date using calendar year and month logic.",
    intro: "Enter a birth date and as-of date to calculate age.",
    howToUse: ["Enter the birth year, month, and day.", "Enter the as-of year, month, and day.", "Review age in years and months."],
    formulaExplanation: "Age is calculated by comparing full calendar years and months between the two dates.",
    examples: ["Example: From 1990-01-15 to 2026-04-12 is 36 years and 2 months."],
    notes: ["This page uses UTC date construction to avoid local time zone drift in the calculation."],
    formulaType: "age",
    fields: [
      { key: "birthYear", label: "Birth year", type: "number", placeholder: "1990", defaultValue: "1990", required: true, min: 1, step: 1 },
      { key: "birthMonth", label: "Birth month", type: "number", placeholder: "1", defaultValue: "1", required: true, min: 1, max: 12, step: 1 },
      { key: "birthDay", label: "Birth day", type: "number", placeholder: "15", defaultValue: "15", required: true, min: 1, max: 31, step: 1 },
      { key: "asOfYear", label: "As-of year", type: "number", placeholder: "2026", defaultValue: "2026", required: true, min: 1, step: 1 },
      { key: "asOfMonth", label: "As-of month", type: "number", placeholder: "4", defaultValue: "4", required: true, min: 1, max: 12, step: 1 },
      { key: "asOfDay", label: "As-of day", type: "number", placeholder: "12", defaultValue: "12", required: true, min: 1, max: 31, step: 1 }
    ],
    results: [
      { key: "ageYears", label: "Age years", format: "number", decimalPlaces: 0 },
      { key: "ageMonthsRemainder", label: "Extra months", format: "number", decimalPlaces: 0 },
      { key: "totalMonths", label: "Total months", format: "number", decimalPlaces: 0 }
    ],
    faqs: [
      { question: "Does this use today's date automatically?", answer: "This demo uses an editable as-of date so the result is predictable and easy to test." },
      { question: "Why are days not shown?", answer: "The current result focuses on years and months. A day-level result can be added with the same schema." }
    ],
    relatedSlugs: ["date-difference-calculator", "time-duration-calculator", "percentage-calculator"],
    seoTitle: "Age Calculator - Calculate Age in Years and Months",
    seoDescription: "Calculate age from birth date to a selected date in years, months, and total months."
  }),
  calculator({
    id: 115,
    categoryId: 5,
    name: "Date Difference Calculator",
    slug: "date-difference-calculator",
    h1: "Date Difference Calculator",
    shortDescription: "Calculate days, weeks, and approximate months between two dates.",
    longDescription: "Use this date difference calculator to count the number of days between a start date and an end date.",
    intro: "Enter two dates to calculate days, weeks, and approximate months between them.",
    howToUse: ["Enter the start date.", "Enter the end date.", "Review the difference in days, weeks, and approximate months."],
    formulaExplanation: "Days are calculated from UTC date timestamps. Weeks are days / 7, and months use the average Gregorian month length.",
    examples: ["Example: From 2026-01-01 to 2026-04-12 is 101 days."],
    notes: ["Approximate months use 30.4375 days and are not the same as whole calendar months."],
    formulaType: "date_difference",
    fields: [
      { key: "startYear", label: "Start year", type: "number", placeholder: "2026", defaultValue: "2026", required: true, min: 1, step: 1 },
      { key: "startMonth", label: "Start month", type: "number", placeholder: "1", defaultValue: "1", required: true, min: 1, max: 12, step: 1 },
      { key: "startDay", label: "Start day", type: "number", placeholder: "1", defaultValue: "1", required: true, min: 1, max: 31, step: 1 },
      { key: "endYear", label: "End year", type: "number", placeholder: "2026", defaultValue: "2026", required: true, min: 1, step: 1 },
      { key: "endMonth", label: "End month", type: "number", placeholder: "4", defaultValue: "4", required: true, min: 1, max: 12, step: 1 },
      { key: "endDay", label: "End day", type: "number", placeholder: "12", defaultValue: "12", required: true, min: 1, max: 31, step: 1 }
    ],
    results: [
      { key: "days", label: "Days", format: "number", decimalPlaces: 0 },
      { key: "weeks", label: "Weeks", format: "number", decimalPlaces: 2 },
      { key: "monthsApprox", label: "Approximate months", format: "number", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Are the start and end dates inclusive?", answer: "The result is the elapsed difference between timestamps, not an inclusive count of calendar dates." },
      { question: "Why are months approximate?", answer: "Months have different lengths, so this calculator uses the average month length for a simple estimate." }
    ],
    relatedSlugs: ["age-calculator", "time-duration-calculator", "percentage-calculator"],
    seoTitle: "Date Difference Calculator - Days Between Dates",
    seoDescription: "Calculate days, weeks, and approximate months between two dates."
  }),
  calculator({
    id: 116,
    categoryId: 5,
    name: "Time Duration Calculator",
    slug: "time-duration-calculator",
    h1: "Time Duration Calculator",
    shortDescription: "Calculate elapsed time between two 24-hour times.",
    longDescription: "This time duration calculator estimates minutes and decimal hours between a start time and end time, with optional break minutes.",
    intro: "Enter start time, end time, and break minutes to calculate a time duration.",
    howToUse: ["Enter start hour and minute in 24-hour time.", "Enter end hour and minute.", "Subtract optional break minutes."],
    formulaExplanation: "Duration minutes = end time - start time - break minutes. If end time is earlier, the calculator assumes an overnight span.",
    examples: ["Example: 9:00 to 17:30 with a 30-minute break is 8.0 hours."],
    notes: ["Use 24-hour time, such as 13 for 1 PM."],
    formulaType: "time_duration",
    fields: [
      { key: "startHour", label: "Start hour", type: "number", placeholder: "9", defaultValue: "9", required: true, min: 0, max: 23, step: 1 },
      { key: "startMinute", label: "Start minute", type: "number", placeholder: "0", defaultValue: "0", required: true, min: 0, max: 59, step: 1 },
      { key: "endHour", label: "End hour", type: "number", placeholder: "17", defaultValue: "17", required: true, min: 0, max: 23, step: 1 },
      { key: "endMinute", label: "End minute", type: "number", placeholder: "30", defaultValue: "30", required: true, min: 0, max: 59, step: 1 },
      { key: "breakMinutes", label: "Break", type: "number", placeholder: "30", defaultValue: "30", unit: "min", required: true, min: 0, step: 1 }
    ],
    results: [
      { key: "durationMinutes", label: "Duration minutes", format: "number", decimalPlaces: 0 },
      { key: "durationHours", label: "Duration hours", format: "number", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does it support overnight shifts?", answer: "Yes. If the end time is earlier than the start time, it treats the end time as the next day." },
      { question: "Can break time be zero?", answer: "Yes. Enter 0 if no break should be subtracted." }
    ],
    relatedSlugs: ["date-difference-calculator", "age-calculator", "pace-calculator"],
    seoTitle: "Time Duration Calculator - Hours Between Times",
    seoDescription: "Calculate elapsed minutes and hours between two 24-hour times with optional break time."
  }),
  calculator({
    id: 117,
    categoryId: 4,
    name: "Length Converter",
    slug: "length-converter",
    h1: "Length Converter",
    shortDescription: "Convert between common length and distance units.",
    longDescription: "Use this length converter for millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
    intro: "Enter a value and choose units to convert length or distance.",
    howToUse: ["Enter the value to convert.", "Choose the from unit.", "Choose the to unit and review the converted value."],
    formulaExplanation: "The calculator converts the source value to meters, then converts meters to the selected target unit.",
    examples: ["Example: 10 kilometers equals about 6.21 miles."],
    notes: ["This converter uses standard international conversion factors."],
    formulaType: "length_conversion",
    fields: [
      { key: "value", label: "Value", type: "number", placeholder: "10", defaultValue: "10", required: true, step: 0.0001 },
      { key: "fromUnit", label: "From", type: "select", defaultValue: "kilometer", required: true, options: lengthUnitOptions },
      { key: "toUnit", label: "To", type: "select", defaultValue: "mile", required: true, options: lengthUnitOptions }
    ],
    results: [{ key: "convertedValue", label: "Converted value", format: "number", decimalPlaces: 4 }],
    faqs: [
      { question: "Which length units are supported?", answer: "Millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles are supported." },
      { question: "Can I convert negative values?", answer: "Yes, if you intentionally need a signed length value." }
    ],
    relatedSlugs: ["weight-converter", "temperature-converter", "pace-calculator"],
    seoTitle: "Length Converter - Convert Distance Units",
    seoDescription: "Convert length and distance units including meters, kilometers, inches, feet, yards, and miles."
  }),
  calculator({
    id: 118,
    categoryId: 4,
    name: "Weight Converter",
    slug: "weight-converter",
    h1: "Weight Converter",
    shortDescription: "Convert between grams, kilograms, ounces, pounds, and tons.",
    longDescription: "This weight converter supports common metric and US customary weight units for everyday conversions.",
    intro: "Enter a value and select units to convert weight.",
    howToUse: ["Enter the weight value.", "Choose the source unit.", "Choose the target unit."],
    formulaExplanation: "The calculator converts the source value to kilograms, then converts kilograms to the target unit.",
    examples: ["Example: 10 kilograms equals about 22.05 pounds."],
    notes: ["The ton option uses the US short ton."],
    formulaType: "weight_conversion",
    fields: [
      { key: "value", label: "Value", type: "number", placeholder: "10", defaultValue: "10", required: true, step: 0.0001 },
      { key: "fromUnit", label: "From", type: "select", defaultValue: "kilogram", required: true, options: weightUnitOptions },
      { key: "toUnit", label: "To", type: "select", defaultValue: "pound", required: true, options: weightUnitOptions }
    ],
    results: [{ key: "convertedValue", label: "Converted value", format: "number", decimalPlaces: 4 }],
    faqs: [
      { question: "Does this use pounds or pound-force?", answer: "This is a mass/weight unit converter for everyday pounds, not a force converter." },
      { question: "What ton does this use?", answer: "It uses the US short ton of 2,000 pounds." }
    ],
    relatedSlugs: ["length-converter", "temperature-converter", "bmi-calculator"],
    seoTitle: "Weight Converter - Convert kg, lb, oz and More",
    seoDescription: "Convert grams, kilograms, ounces, pounds, and US tons with a free weight converter."
  }),
  calculator({
    id: 119,
    categoryId: 4,
    name: "Temperature Converter",
    slug: "temperature-converter",
    h1: "Temperature Converter",
    shortDescription: "Convert Celsius, Fahrenheit, and Kelvin.",
    longDescription: "Use this temperature converter to convert values between Celsius, Fahrenheit, and Kelvin.",
    intro: "Enter a temperature and choose source and target units.",
    howToUse: ["Enter the temperature value.", "Choose the source unit.", "Choose the target unit."],
    formulaExplanation: "The calculator converts the source temperature to Celsius, then converts Celsius to the selected target unit.",
    examples: ["Example: 68 degrees Fahrenheit equals 20 degrees Celsius."],
    notes: ["Kelvin values below absolute zero are not physically meaningful, but the calculator performs direct unit conversion."],
    formulaType: "temperature_conversion",
    fields: [
      { key: "value", label: "Value", type: "number", placeholder: "68", defaultValue: "68", required: true, step: 0.01 },
      { key: "fromUnit", label: "From", type: "select", defaultValue: "fahrenheit", required: true, options: temperatureUnitOptions },
      { key: "toUnit", label: "To", type: "select", defaultValue: "celsius", required: true, options: temperatureUnitOptions }
    ],
    results: [{ key: "convertedValue", label: "Converted value", format: "number", decimalPlaces: 2 }],
    faqs: [
      { question: "What is 68 degrees Fahrenheit in Celsius?", answer: "68 degrees Fahrenheit is 20 degrees Celsius." },
      { question: "Does this support Kelvin?", answer: "Yes. You can convert to and from Kelvin." }
    ],
    relatedSlugs: ["length-converter", "weight-converter", "calorie-calculator"],
    seoTitle: "Temperature Converter - Celsius, Fahrenheit and Kelvin",
    seoDescription: "Convert temperatures between Celsius, Fahrenheit, and Kelvin online."
  }),
  calculator({
    id: 120,
    categoryId: 2,
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    h1: "Fuel Cost Calculator",
    shortDescription: "Estimate fuel needed, trip cost, and cost per mile.",
    longDescription: "This fuel cost calculator estimates gallons needed, total fuel cost, and cost per mile from trip distance, MPG, and fuel price.",
    intro: "Enter distance, fuel economy, and price per gallon to estimate fuel cost.",
    howToUse: ["Enter trip distance in miles.", "Enter fuel economy in MPG.", "Enter fuel price per gallon."],
    formulaExplanation: "Gallons needed = distance / MPG. Total fuel cost = gallons needed x price per gallon.",
    examples: ["Example: A 300-mile trip at 30 MPG and $3.50 per gallon costs about $35 in fuel."],
    notes: ["Actual fuel cost can vary with traffic, terrain, driving style, and fuel price changes."],
    formulaType: "fuel_cost",
    fields: [
      { key: "distance", label: "Distance", type: "number", placeholder: "300", defaultValue: "300", unit: "mi", required: true, min: 0.01, step: 1 },
      { key: "mpg", label: "Fuel economy", type: "number", placeholder: "30", defaultValue: "30", unit: "MPG", required: true, min: 0.01, step: 0.1 },
      { key: "pricePerGallon", label: "Fuel price", type: "number", placeholder: "3.50", defaultValue: "3.50", unit: "USD/gal", required: true, min: 0.01, step: 0.01 }
    ],
    results: [
      { key: "gallonsNeeded", label: "Gallons needed", format: "number", decimalPlaces: 2 },
      { key: "totalFuelCost", label: "Total fuel cost", format: "currency", decimalPlaces: 2 },
      { key: "costPerMile", label: "Cost per mile", format: "currency", decimalPlaces: 2 }
    ],
    faqs: [
      { question: "Does this work for electric vehicles?", answer: "No. This version is for gasoline-style MPG and price per gallon." },
      { question: "Should I use highway or city MPG?", answer: "Use the MPG that best matches your expected driving conditions." }
    ],
    relatedSlugs: ["unit-price-calculator", "loan-payment-calculator", "length-converter"],
    seoTitle: "Fuel Cost Calculator - Trip Gas Cost Estimate",
    seoDescription: "Estimate gallons needed, total fuel cost, and cost per mile for a trip."
  }),
  ...expandedCalculators
];

export const adSlots = [
  {
    key: "site_top_banner",
    name: "Site top banner",
    size: "970x90",
    status: "empty"
  },
  {
    key: "page_left_sidebar",
    name: "Left sidebar",
    size: "160x600",
    status: "empty"
  },
  {
    key: "page_right_sidebar",
    name: "Right sidebar",
    size: "160x600",
    status: "empty"
  },
  {
    key: "in_content_1",
    name: "In-content slot",
    size: "336x280",
    status: "empty"
  },
  {
    key: "site_bottom_banner",
    name: "Site bottom banner",
    size: "970x90",
    status: "empty"
  }
];

export const aiModels = [
  {
    id: 1,
    name: "Llama 3.1 8B Instruct FP8",
    provider: "Cloudflare Workers AI",
    modelKey: "@cf/meta/llama-3.1-8b-instruct-fp8",
    tasks: ["full_refresh", "seo_title", "meta_description", "faq_generation", "intro_generation", "formula_explanation"],
    temperature: 0.2,
    maxTokens: 1200,
    status: "active"
  },
  {
    id: 2,
    name: "Mistral Small 3.1 24B Instruct",
    provider: "Cloudflare Workers AI",
    modelKey: "@cf/mistralai/mistral-small-3.1-24b-instruct",
    tasks: ["full_refresh", "content_expansion", "faq_generation"],
    temperature: 0.3,
    maxTokens: 1600,
    status: "fallback"
  }
];

export const adminModules = [
  { href: "/admin", label: "儀表板" },
  { href: "/admin/calculators", label: "計算器管理" },
  { href: "/admin/calculator-backlog", label: "計算器候選" },
  { href: "/admin/categories", label: "分類管理" },
  { href: "/admin/seo", label: "SEO 管理" },
  { href: "/admin/ai-seo", label: "AI SEO 助理" },
  { href: "/admin/models", label: "模型管理" },
  { href: "/admin/ads", label: "廣告管理" },
  { href: "/admin/internal-links", label: "內部連結" },
  { href: "/admin/faqs", label: "常見問題" },
  { href: "/admin/media", label: "媒體素材" },
  { href: "/admin/settings", label: "網站設定" },
  { href: "/admin/users", label: "帳號權限" },
  { href: "/admin/logs", label: "操作紀錄" }
];

export function getCalculator(slug: string) {
  return calculators.find((calculatorItem) => calculatorItem.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCalculatorsByCategory(categoryId: number) {
  return calculators.filter((calculatorItem) => calculatorItem.categoryId === categoryId);
}

export function getRelatedCalculators(calculatorItem: Calculator) {
  return calculatorItem.relatedSlugs
    .map((slug) => getCalculator(slug))
    .filter((item): item is Calculator => Boolean(item));
}
