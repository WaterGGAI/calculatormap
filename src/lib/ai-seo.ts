import { generateAiSeoBundleWithAi } from "@/lib/ai-seo-engine";
import type { AiSeoTaskType } from "@/lib/ai-seo-core";
import type { Calculator } from "@/lib/calculators/types";
import { getCloudflareEnv } from "@/lib/cloudflare";

type GenerateAiSeoInput = {
  calculator: Calculator;
  taskType: AiSeoTaskType;
  modelKey: string;
  keyword: string;
  tone: string;
  length: string;
  temperature: number;
};

export async function generateAiSeoBundle(input: GenerateAiSeoInput) {
  const env = await getCloudflareEnv();
  const ai = env?.AI;

  if (!ai) {
    throw new Error("Workers AI binding is not configured.");
  }

  return generateAiSeoBundleWithAi(ai, input);
}
