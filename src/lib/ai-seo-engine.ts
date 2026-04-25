import type { Calculator } from "@/lib/calculators/types";
import { buildAiSeoPrompt, extractTextResponse, getAiSeoModel, parseAiSeoBundle, type AiSeoTaskType } from "@/lib/ai-seo-core";

type GenerateAiSeoInput = {
  calculator: Calculator;
  taskType: AiSeoTaskType;
  modelKey: string;
  keyword: string;
  tone: string;
  length: string;
  temperature: number;
};

export async function generateAiSeoBundleWithAi(ai: Ai, input: GenerateAiSeoInput) {
  const model = getAiSeoModel(input.modelKey);
  const startedAt = Date.now();
  const prompt = buildAiSeoPrompt({
    calculator: input.calculator,
    taskType: input.taskType,
    keyword: input.keyword,
    tone: input.tone,
    length: input.length
  });

  const output = await ai.run(model.modelKey as keyof AiModels, {
    prompt,
    temperature: input.temperature,
    max_tokens: model.maxTokens,
    response_format: {
      type: "json_object"
    }
  });

  const rawText = extractTextResponse(output);

  if (!rawText) {
    throw new Error("Workers AI returned an empty response.");
  }

  return {
    bundle: parseAiSeoBundle(rawText, input.calculator),
    rawText,
    latencyMs: Date.now() - startedAt,
    model
  };
}
