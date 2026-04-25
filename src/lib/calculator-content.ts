import { cache } from "react";
import type { Calculator } from "@/lib/calculators/types";
import { getCalculator } from "@/lib/data";
import { getCloudflareEnv } from "@/lib/cloudflare";

export type CalculatorFaqItem = {
  question: string;
  answer: string;
};

export type CalculatorContentOverride = {
  calculatorSlug: string;
  h1: string | null;
  intro: string | null;
  formulaExplanation: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  faqJson: string | null;
  lastAiTaskType: string | null;
  lastAiModelKey: string | null;
  updatedBy: string | null;
  updatedAt: string | null;
};

export type CalculatorContentOverrideInput = {
  calculatorSlug: string;
  h1?: string | null;
  intro?: string | null;
  formulaExplanation?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  faqs?: CalculatorFaqItem[] | null;
  lastAiTaskType?: string | null;
  lastAiModelKey?: string | null;
  updatedBy?: string | null;
};

export type AiGenerationLogRecord = {
  id: number;
  taskType: string;
  status: string | null;
  modelId: number | null;
  inputPayloadJson: string | null;
  outputPayloadJson: string | null;
  latencyMs: number | null;
  createdAt: string;
};

function normalizeText(value: string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseFaqJson(faqJson: string | null) {
  if (!faqJson) {
    return null;
  }

  try {
    const parsed = JSON.parse(faqJson);

    if (!Array.isArray(parsed)) {
      return null;
    }

    const faqs = parsed
      .filter((item): item is { question?: unknown; answer?: unknown } => typeof item === "object" && item !== null)
      .map((item) => ({
        question: typeof item.question === "string" ? item.question.trim() : "",
        answer: typeof item.answer === "string" ? item.answer.trim() : ""
      }))
      .filter((item) => item.question.length > 0 && item.answer.length > 0);

    return faqs.length > 0 ? faqs : null;
  } catch {
    return null;
  }
}

export function mergeCalculatorOverride(calculator: Calculator, override: CalculatorContentOverride | null): Calculator {
  if (!override) {
    return calculator;
  }

  const faqs = parseFaqJson(override.faqJson);

  return {
    ...calculator,
    h1: override.h1 ?? calculator.h1,
    intro: override.intro ?? calculator.intro,
    formulaExplanation: override.formulaExplanation ?? calculator.formulaExplanation,
    faqs: faqs ?? calculator.faqs,
    updatedAt: override.updatedAt ? override.updatedAt.slice(0, 10) : calculator.updatedAt,
    seo: {
      ...calculator.seo,
      title: override.seoTitle ?? calculator.seo.title,
      description: override.seoDescription ?? calculator.seo.description
    }
  };
}

export async function getCalculatorOverrideBySlugFromDb(db: D1Database, slug: string): Promise<CalculatorContentOverride | null> {
  let row: CalculatorContentOverride | null;

  try {
    row = await db
      .prepare(
        `SELECT
          calculator_slug AS calculatorSlug,
          h1,
          intro,
          formula_explanation AS formulaExplanation,
          seo_title AS seoTitle,
          seo_description AS seoDescription,
          faq_json AS faqJson,
          last_ai_task_type AS lastAiTaskType,
          last_ai_model_key AS lastAiModelKey,
          updated_by AS updatedBy,
          updated_at AS updatedAt
        FROM calculator_content_overrides
        WHERE calculator_slug = ?1`
      )
      .bind(slug)
      .first<CalculatorContentOverride>();
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table: calculator_content_overrides")) {
      return null;
    }

    throw error;
  }

  return row ?? null;
}

export const getCalculatorOverrideBySlug = cache(async (slug: string): Promise<CalculatorContentOverride | null> => {
  const env = await getCloudflareEnv();
  const db = env?.DB;

  if (!db) {
    return null;
  }

  return getCalculatorOverrideBySlugFromDb(db, slug);
});

export async function getMergedCalculatorBySlug(slug: string) {
  const calculator = getCalculator(slug);

  if (!calculator) {
    return null;
  }

  const override = await getCalculatorOverrideBySlug(slug);
  return mergeCalculatorOverride(calculator, override);
}

export async function upsertCalculatorContentOverrideInDb(db: D1Database, input: CalculatorContentOverrideInput) {
  const faqJson = input.faqs && input.faqs.length > 0 ? JSON.stringify(input.faqs) : null;

  const result = await db
    .prepare(
      `INSERT INTO calculator_content_overrides (
        calculator_slug,
        h1,
        intro,
        formula_explanation,
        seo_title,
        seo_description,
        faq_json,
        last_ai_task_type,
        last_ai_model_key,
        updated_by,
        updated_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, CURRENT_TIMESTAMP)
      ON CONFLICT(calculator_slug) DO UPDATE SET
        h1 = excluded.h1,
        intro = excluded.intro,
        formula_explanation = excluded.formula_explanation,
        seo_title = excluded.seo_title,
        seo_description = excluded.seo_description,
        faq_json = excluded.faq_json,
        last_ai_task_type = excluded.last_ai_task_type,
        last_ai_model_key = excluded.last_ai_model_key,
        updated_by = excluded.updated_by,
        updated_at = CURRENT_TIMESTAMP`
    )
    .bind(
      input.calculatorSlug,
      normalizeText(input.h1),
      normalizeText(input.intro),
      normalizeText(input.formulaExplanation),
      normalizeText(input.seoTitle),
      normalizeText(input.seoDescription),
      faqJson,
      normalizeText(input.lastAiTaskType),
      normalizeText(input.lastAiModelKey),
      normalizeText(input.updatedBy)
    )
    .run();

  return result.success;
}

export async function upsertCalculatorContentOverride(input: CalculatorContentOverrideInput) {
  const env = await getCloudflareEnv();
  const db = env?.DB;

  if (!db) {
    throw new Error("D1 binding is not configured.");
  }

  return upsertCalculatorContentOverrideInDb(db, input);
}

export async function insertAiGenerationLogInDb(
  db: D1Database,
  input: {
  calculatorId: number;
  taskType: string;
  modelId: number | null;
  status: string;
  inputPayloadJson: string;
  outputPayloadJson: string;
  latencyMs: number;
  createdBy?: string | null;
}
) {
  const result = await db
    .prepare(
      `INSERT INTO ai_generation_logs (
        ref_type,
        ref_id,
        task_type,
        model_id,
        input_payload_json,
        output_payload_json,
        status,
        latency_ms,
        cost_info_json,
        created_at
      ) VALUES ('calculator', ?1, ?2, ?3, ?4, ?5, ?6, ?7, NULL, CURRENT_TIMESTAMP)`
    )
    .bind(input.calculatorId, input.taskType, input.modelId, input.inputPayloadJson, input.outputPayloadJson, input.status, input.latencyMs)
    .run();

  return Number(result.meta.last_row_id ?? 0);
}

export async function insertAiGenerationLog(input: {
  calculatorId: number;
  taskType: string;
  modelId: number | null;
  status: string;
  inputPayloadJson: string;
  outputPayloadJson: string;
  latencyMs: number;
  createdBy?: string | null;
}) {
  const env = await getCloudflareEnv();
  const db = env?.DB;

  if (!db) {
    throw new Error("D1 binding is not configured.");
  }

  return insertAiGenerationLogInDb(db, input);
}
