export const siteConfig = {
  name: "CalculatorMap",
  shortName: "CalculatorMap",
  domain: "calculatormap.com",
  url: "https://calculatormap.com",
  description: "Use CalculatorMap for fast online calculators, formulas, examples, and practical guides.",
  homepageTitle: "CalculatorMap | Online Calculators, Cost Tools, and Guides",
  homepageDescription:
    "CalculatorMap helps you calculate costs, pricing, finance, salary, home projects, and more with fast online calculators and clear guides.",
  defaultTitleTemplate: "%s | CalculatorMap",
  organizationName: "CalculatorMap",
  locale: "en_US",
  contactEmail: "hello@calculatormap.com"
} as const;

export function withSiteSuffix(title: string) {
  return `${title} | ${siteConfig.name}`;
}
