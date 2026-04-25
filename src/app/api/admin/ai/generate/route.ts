import { NextResponse } from "next/server";
import { generateAiSeoBundle } from "@/lib/ai-seo";
import { buildAppliedOverride, type AiSeoTaskType } from "@/lib/ai-seo-core";
import { getCalculator } from "@/lib/data";
import { getCalculatorOverrideBySlug, insertAiGenerationLog, mergeCalculatorOverride, upsertCalculatorContentOverride } from "@/lib/calculator-content";

type GenerateAiSeoRequest = {
  calculatorSlug?: string;
  taskType?: AiSeoTaskType;
  modelKey?: string;
  keyword?: string;
  tone?: string;
  length?: string;
  temperature?: number;
  autoApply?: boolean;
};

const supportedTaskTypes: AiSeoTaskType[] = ["full_refresh", "seo_title", "meta_description", "faq_generation", "intro_generation", "formula_explanation"];

function toTaskType(taskType: string | undefined): AiSeoTaskType {
  return supportedTaskTypes.includes(taskType as AiSeoTaskType) ? (taskType as AiSeoTaskType) : "full_refresh";
}

function toTemperature(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(Math.max(value, 0), 1.2) : 0.2;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as GenerateAiSeoRequest;
  const calculatorSlug = typeof body.calculatorSlug === "string" ? body.calculatorSlug : "";
  const taskType = toTaskType(body.taskType);
  const keyword = typeof body.keyword === "string" && body.keyword.trim().length > 0 ? body.keyword.trim() : calculatorSlug.replaceAll("-", " ");
  const tone = typeof body.tone === "string" && body.tone.trim().length > 0 ? body.tone.trim() : "professional";
  const length = typeof body.length === "string" && body.length.trim().length > 0 ? body.length.trim() : "medium";
  const modelKey = typeof body.modelKey === "string" ? body.modelKey : "";
  const autoApply = body.autoApply !== false;

  const calculator = getCalculator(calculatorSlug);

  if (!calculator) {
    return NextResponse.json({ success: false, error: "Calculator not found." }, { status: 404 });
  }

  const currentOverride = await getCalculatorOverrideBySlug(calculatorSlug);
  const effectiveCalculator = mergeCalculatorOverride(calculator, currentOverride);

  try {
    const generated = await generateAiSeoBundle({
      calculator: effectiveCalculator,
      taskType,
      modelKey,
      keyword,
      tone,
      length,
      temperature: toTemperature(body.temperature)
    });

    if (autoApply) {
      const appliedOverride = buildAppliedOverride(taskType, generated.bundle);

      await upsertCalculatorContentOverride({
        calculatorSlug,
        ...appliedOverride,
        lastAiTaskType: taskType,
        lastAiModelKey: generated.model.modelKey,
        updatedBy: "admin-ai-seo"
      });
    }

    const logId = await insertAiGenerationLog({
      calculatorId: calculator.id,
      taskType,
      modelId: generated.model.id,
      status: autoApply ? "applied" : "generated",
      inputPayloadJson: JSON.stringify({
        calculatorSlug,
        taskType,
        keyword,
        tone,
        length,
        temperature: toTemperature(body.temperature),
        modelKey: generated.model.modelKey,
        autoApply
      }),
      outputPayloadJson: JSON.stringify({
        bundle: generated.bundle,
        applied: autoApply
      }),
      latencyMs: generated.latencyMs
    });

    const appliedPreview = autoApply
      ? mergeCalculatorOverride(effectiveCalculator, {
          calculatorSlug,
          h1: taskType === "full_refresh" ? generated.bundle.h1 : null,
          intro: taskType === "full_refresh" || taskType === "intro_generation" ? generated.bundle.intro : null,
          formulaExplanation:
            taskType === "full_refresh" || taskType === "formula_explanation" ? generated.bundle.formulaExplanation : null,
          seoTitle: taskType === "full_refresh" || taskType === "seo_title" ? generated.bundle.seoTitle : null,
          seoDescription:
            taskType === "full_refresh" || taskType === "meta_description" ? generated.bundle.metaDescription : null,
          faqJson:
            taskType === "full_refresh" || taskType === "faq_generation" ? JSON.stringify(generated.bundle.faqs) : null,
          lastAiTaskType: taskType,
          lastAiModelKey: generated.model.modelKey,
          updatedBy: "admin-ai-seo",
          updatedAt: new Date().toISOString()
        })
      : effectiveCalculator;

    return NextResponse.json({
      success: true,
      data: {
        applied: autoApply,
        logId,
        latencyMs: generated.latencyMs,
        model: {
          id: generated.model.id,
          name: generated.model.name,
          modelKey: generated.model.modelKey
        },
        taskType,
        bundle: generated.bundle,
        appliedPreview: {
          seoTitle: appliedPreview.seo.title,
          metaDescription: appliedPreview.seo.description,
          h1: appliedPreview.h1,
          intro: appliedPreview.intro,
          formulaExplanation: appliedPreview.formulaExplanation,
          faqs: appliedPreview.faqs
        }
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI SEO generation failed.";

    return NextResponse.json(
      {
        success: false,
        error: message
      },
      { status: 500 }
    );
  }
}
