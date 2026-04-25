import type { Calculator } from "@/lib/calculators/types";
import type { CalculatorFaqItem } from "@/lib/calculator-content";
import { aiModels, categories } from "@/lib/data";

export type AiSeoTaskType =
  | "full_refresh"
  | "seo_title"
  | "meta_description"
  | "faq_generation"
  | "intro_generation"
  | "formula_explanation";

export type AiSeoBundle = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  formulaExplanation: string;
  faqs: CalculatorFaqItem[];
};

export type AiSeoPromptInput = {
  calculator: Calculator;
  taskType: AiSeoTaskType;
  keyword: string;
  tone: string;
  length: string;
};

export type AiSeoAppliedOverride = {
  h1?: string;
  intro?: string;
  formulaExplanation?: string;
  seoTitle?: string;
  seoDescription?: string;
  faqs?: CalculatorFaqItem[];
};

export type AiSeoModel = (typeof aiModels)[number];

export function getAiSeoModel(modelKey: string) {
  return aiModels.find((item) => item.modelKey === modelKey) ?? aiModels[0];
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseFaqs(value: unknown, fallbackFaqs: CalculatorFaqItem[]) {
  if (!Array.isArray(value)) {
    return fallbackFaqs;
  }

  const faqs = value
    .filter((item): item is { question?: unknown; answer?: unknown } => typeof item === "object" && item !== null)
    .map((item) => ({
      question: cleanText(item.question),
      answer: cleanText(item.answer)
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0)
    .slice(0, 5);

  return faqs.length > 0 ? faqs : fallbackFaqs;
}

export function extractTextResponse(output: unknown) {
  if (typeof output === "string") {
    return output;
  }

  if (typeof output !== "object" || output === null) {
    return "";
  }

  const response = "response" in output ? output.response : undefined;
  return typeof response === "string" ? response : "";
}

export function buildAiSeoPrompt(input: AiSeoPromptInput) {
  const category = categories.find((item) => item.id === input.calculator.categoryId);

  return [
    "You write SEO content for CalculatorMap calculator pages.",
    "Return only a valid JSON object.",
    "Do not wrap the JSON in markdown fences.",
    "Keep the content practical, specific, and non-promotional.",
    "Use natural English for a calculator page.",
    "JSON shape:",
    JSON.stringify(
      {
        seoTitle: "string",
        metaDescription: "string",
        h1: "string",
        intro: "string",
        formulaExplanation: "string",
        faqs: [{ question: "string", answer: "string" }]
      },
      null,
      2
    ),
    "",
    "Constraints:",
    "- seoTitle: 45 to 65 characters when possible.",
    "- metaDescription: 140 to 160 characters when possible.",
    "- h1: clear and close to the keyword intent.",
    "- intro: 2 short paragraphs or 2 concise sentences.",
    "- formulaExplanation: 2 to 4 sentences, plain language.",
    "- faqs: 3 to 5 helpful items, short and specific.",
    "- Avoid unverifiable health, legal, or financial claims.",
    "",
    "Task:",
    input.taskType,
    "",
    "Context:",
    JSON.stringify(
      {
        keyword: input.keyword,
        tone: input.tone,
        length: input.length,
        calculator: {
          id: input.calculator.id,
          name: input.calculator.name,
          slug: input.calculator.slug,
          category: category?.name ?? null,
          shortDescription: input.calculator.shortDescription,
          intro: input.calculator.intro,
          formulaExplanation: input.calculator.formulaExplanation,
          howToUse: input.calculator.howToUse,
          examples: input.calculator.examples,
          notes: input.calculator.notes,
          currentSeoTitle: input.calculator.seo.title,
          currentMetaDescription: input.calculator.seo.description,
          faqs: input.calculator.faqs
        }
      },
      null,
      2
    )
  ].join("\n");
}

export function parseAiSeoBundle(rawText: string, fallback: Calculator) {
  const parsed = JSON.parse(rawText) as Partial<AiSeoBundle>;

  return {
    seoTitle: cleanText(parsed.seoTitle) || fallback.seo.title,
    metaDescription: cleanText(parsed.metaDescription) || fallback.seo.description,
    h1: cleanText(parsed.h1) || fallback.h1,
    intro: cleanText(parsed.intro) || fallback.intro,
    formulaExplanation: cleanText(parsed.formulaExplanation) || fallback.formulaExplanation,
    faqs: parseFaqs(parsed.faqs, fallback.faqs)
  } satisfies AiSeoBundle;
}

export function buildAppliedOverride(taskType: AiSeoTaskType, bundle: AiSeoBundle): AiSeoAppliedOverride {
  switch (taskType) {
    case "seo_title":
      return { seoTitle: bundle.seoTitle };
    case "meta_description":
      return { seoDescription: bundle.metaDescription };
    case "faq_generation":
      return { faqs: bundle.faqs };
    case "intro_generation":
      return { intro: bundle.intro };
    case "formula_explanation":
      return { formulaExplanation: bundle.formulaExplanation };
    case "full_refresh":
    default:
      return {
        h1: bundle.h1,
        intro: bundle.intro,
        formulaExplanation: bundle.formulaExplanation,
        seoTitle: bundle.seoTitle,
        seoDescription: bundle.metaDescription,
        faqs: bundle.faqs
      };
  }
}
