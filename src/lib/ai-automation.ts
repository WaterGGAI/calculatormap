import { buildAppliedOverride, type AiSeoTaskType } from "@/lib/ai-seo-core";
import { generateAiSeoBundleWithAi } from "@/lib/ai-seo-engine";
import {
  getCalculatorOverrideBySlugFromDb,
  insertAiGenerationLogInDb,
  mergeCalculatorOverride,
  upsertCalculatorContentOverrideInDb
} from "@/lib/calculator-content";
import type { Calculator } from "@/lib/calculators/types";
import { calculators } from "@/lib/data";
import {
  createAutomationRunInDb,
  defaultSeoAutomationSettings,
  finishAutomationRunInDb,
  getAutomationSettingsFromDb,
  type SeoAutomationSettings,
  upsertAutomationSettingsInDb
} from "@/lib/site-settings";

type AutomationBindings = {
  DB: D1Database;
  AI: Ai;
};

type AutomationTriggerSource = "manual" | "cron";

export type AutomationRunSummary = {
  runId: number | null;
  triggerSource: AutomationTriggerSource;
  status: "completed" | "partial_failure" | "failed" | "idle" | "disabled";
  startedAt: string;
  finishedAt: string;
  selectedCount: number;
  processedCount: number;
  successCount: number;
  failureCount: number;
  appliedSlugs: string[];
  failures: Array<{ slug: string; error: string }>;
  settings: SeoAutomationSettings;
};

type RunSeoAutomationOptions = {
  triggerSource: AutomationTriggerSource;
  force?: boolean;
  batchSizeOverride?: number;
};

type LastAppliedRow = {
  calculatorId: number;
  lastAppliedAt: string | null;
};

function nowIsoString() {
  return new Date().toISOString();
}

function subtractDays(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

function clampBatchSize(batchSizeOverride: number | undefined, fallback: number) {
  if (typeof batchSizeOverride !== "number" || !Number.isFinite(batchSizeOverride)) {
    return fallback;
  }

  return Math.min(Math.max(Math.round(batchSizeOverride), 1), 10);
}

async function getPublishedAutomationCandidates(
  db: D1Database,
  settings: SeoAutomationSettings,
  force: boolean,
  batchSize: number
) {
  const lastAppliedResult = await db
    .prepare(
      `SELECT
        ref_id AS calculatorId,
        MAX(created_at) AS lastAppliedAt
      FROM ai_generation_logs
      WHERE ref_type = 'calculator'
        AND status IN ('applied', 'auto_applied')
      GROUP BY ref_id`
    )
    .all<LastAppliedRow>();

  const lastAppliedMap = new Map<number, string | null>(
    (lastAppliedResult.results ?? []).map((row) => [row.calculatorId, row.lastAppliedAt ?? null])
  );
  const cutoffTime = subtractDays(settings.minDaysBetweenRefresh);

  return calculators
    .filter((calculator) => calculator.status === "published")
    .map((calculator, index) => ({
      calculator,
      index,
      lastAppliedAt: lastAppliedMap.get(calculator.id) ?? null
    }))
    .filter((candidate) => {
      if (force || !candidate.lastAppliedAt) {
        return true;
      }

      const lastAppliedTime = Date.parse(candidate.lastAppliedAt);
      return Number.isFinite(lastAppliedTime) ? lastAppliedTime <= cutoffTime : true;
    })
    .sort((left, right) => {
      if (!left.lastAppliedAt && right.lastAppliedAt) {
        return -1;
      }

      if (left.lastAppliedAt && !right.lastAppliedAt) {
        return 1;
      }

      if (left.lastAppliedAt && right.lastAppliedAt) {
        const timeDelta = Date.parse(left.lastAppliedAt) - Date.parse(right.lastAppliedAt);

        if (timeDelta !== 0) {
          return timeDelta;
        }
      }

      return left.index - right.index;
    })
    .slice(0, batchSize);
}

export async function runSeoAutomation(bindings: AutomationBindings, options: RunSeoAutomationOptions): Promise<AutomationRunSummary> {
  const startedAt = nowIsoString();
  const settings = await getAutomationSettingsFromDb(bindings.DB);
  const batchSize = clampBatchSize(options.batchSizeOverride, settings.batchSize);

  if (!settings.enabled && !options.force) {
    return {
      runId: null,
      triggerSource: options.triggerSource,
      status: "disabled",
      startedAt,
      finishedAt: nowIsoString(),
      selectedCount: 0,
      processedCount: 0,
      successCount: 0,
      failureCount: 0,
      appliedSlugs: [],
      failures: [],
      settings
    };
  }

  const candidates = await getPublishedAutomationCandidates(bindings.DB, settings, options.force === true, batchSize);

  if (candidates.length === 0) {
    const idleSummary: AutomationRunSummary = {
      runId: null,
      triggerSource: options.triggerSource,
      status: "idle",
      startedAt,
      finishedAt: nowIsoString(),
      selectedCount: 0,
      processedCount: 0,
      successCount: 0,
      failureCount: 0,
      appliedSlugs: [],
      failures: [],
      settings
    };

    await upsertAutomationSettingsInDb(bindings.DB, {
      ...settings,
      lastRunAt: idleSummary.finishedAt,
      lastStatus: idleSummary.status,
      lastSummaryJson: JSON.stringify(idleSummary)
    });

    return idleSummary;
  }

  const runId = await createAutomationRunInDb(bindings.DB, {
    triggerSource: options.triggerSource,
    status: "running",
    selectedCount: candidates.length
  });
  const appliedSlugs: string[] = [];
  const failures: Array<{ slug: string; error: string }> = [];
  let processedCount = 0;
  let successCount = 0;
  let failureCount = 0;

  for (const candidate of candidates) {
    try {
      const override = await getCalculatorOverrideBySlugFromDb(bindings.DB, candidate.calculator.slug);
      const effectiveCalculator = mergeCalculatorOverride(candidate.calculator, override);
      const generated = await generateAiSeoBundleWithAi(bindings.AI, {
        calculator: effectiveCalculator,
        taskType: settings.defaultTaskType,
        modelKey: settings.defaultModelKey,
        keyword: effectiveCalculator.name,
        tone: settings.tone,
        length: settings.length,
        temperature: settings.temperature
      });
      const appliedOverride = buildAppliedOverride(settings.defaultTaskType, generated.bundle);

      await upsertCalculatorContentOverrideInDb(bindings.DB, {
        calculatorSlug: candidate.calculator.slug,
        ...appliedOverride,
        lastAiTaskType: settings.defaultTaskType,
        lastAiModelKey: generated.model.modelKey,
        updatedBy: `automation:${options.triggerSource}`
      });

      await insertAiGenerationLogInDb(bindings.DB, {
        calculatorId: candidate.calculator.id,
        taskType: settings.defaultTaskType,
        modelId: generated.model.id,
        status: "auto_applied",
        inputPayloadJson: JSON.stringify({
          calculatorSlug: candidate.calculator.slug,
          taskType: settings.defaultTaskType,
          modelKey: generated.model.modelKey,
          tone: settings.tone,
          length: settings.length,
          temperature: settings.temperature,
          triggerSource: options.triggerSource
        }),
        outputPayloadJson: JSON.stringify({
          bundle: generated.bundle,
          applied: true
        }),
        latencyMs: generated.latencyMs
      });

      processedCount += 1;
      successCount += 1;
      appliedSlugs.push(candidate.calculator.slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Automation failed.";

      processedCount += 1;
      failureCount += 1;
      failures.push({ slug: candidate.calculator.slug, error: message });

      await insertAiGenerationLogInDb(bindings.DB, {
        calculatorId: candidate.calculator.id,
        taskType: settings.defaultTaskType,
        modelId: null,
        status: "auto_failed",
        inputPayloadJson: JSON.stringify({
          calculatorSlug: candidate.calculator.slug,
          taskType: settings.defaultTaskType,
          triggerSource: options.triggerSource
        }),
        outputPayloadJson: JSON.stringify({
          error: message
        }),
        latencyMs: 0
      });
    }
  }

  const status: AutomationRunSummary["status"] =
    failureCount === 0 ? "completed" : successCount > 0 ? "partial_failure" : "failed";
  const finishedAt = nowIsoString();
  const summary: AutomationRunSummary = {
    runId,
    triggerSource: options.triggerSource,
    status,
    startedAt,
    finishedAt,
    selectedCount: candidates.length,
    processedCount,
    successCount,
    failureCount,
    appliedSlugs,
    failures,
    settings
  };

  await finishAutomationRunInDb(bindings.DB, runId, {
    status,
    processedCount,
    successCount,
    failureCount,
    summaryJson: JSON.stringify(summary),
    errorMessage: failures.length > 0 ? failures.map((failure) => `${failure.slug}: ${failure.error}`).join(" | ") : null
  });

  await upsertAutomationSettingsInDb(bindings.DB, {
    ...settings,
    lastRunAt: finishedAt,
    lastStatus: status,
    lastSummaryJson: JSON.stringify(summary)
  });

  return summary;
}
