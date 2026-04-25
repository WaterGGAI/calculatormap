export type CalculatorStatus = "draft" | "published";

export type CalculatorFieldType = "number" | "select" | "radio" | "text" | "textarea";

export type CalculatorResultFormat = "number" | "currency" | "percent" | "text";

export type CalculatorFieldOption = {
  label: string;
  value: string;
};

export type CalculatorField = {
  key: string;
  label: string;
  type: CalculatorFieldType;
  placeholder?: string;
  defaultValue?: string;
  unit?: string;
  required?: boolean;
  options?: CalculatorFieldOption[];
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
};

export type CalculatorResult = {
  key: string;
  label: string;
  format: CalculatorResultFormat;
  decimalPlaces?: number;
  description?: string;
};

export type CalculatorFormulaType =
  | "bmi"
  | "loan_payment"
  | "percentage"
  | "unit_price"
  | "compound_interest"
  | "mortgage_payment"
  | "tip"
  | "discount"
  | "sales_tax"
  | "savings_goal"
  | "calorie"
  | "body_fat"
  | "pace"
  | "age"
  | "date_difference"
  | "time_duration"
  | "length_conversion"
  | "weight_conversion"
  | "temperature_conversion"
  | "fuel_cost"
  | "expression"
  | "math_expression"
  | "text_stats"
  | "number_list_stats"
  | "list_picker"
  | "base_conversion"
  | "date_add"
  | "workday_count"
  | "time_cycle";

export type CalculatorFormulaConfig = {
  expressions?: Record<string, string>;
  expressionField?: string;
  textField?: string;
  listField?: string;
};

export type CalculatorCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  status: CalculatorStatus;
  sortOrder: number;
};

export type Calculator = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  h1: string;
  shortDescription: string;
  longDescription: string;
  intro: string;
  howToUse: string[];
  formulaExplanation: string;
  examples: string[];
  notes: string[];
  formulaType: CalculatorFormulaType;
  formulaConfig?: CalculatorFormulaConfig;
  fields: CalculatorField[];
  results: CalculatorResult[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs: string[];
  status: CalculatorStatus;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    robots: string;
  };
};

export type CalculatorValues = Record<string, string>;

export type CalculationOutput = {
  values: Record<string, number | string>;
  errors: string[];
};
