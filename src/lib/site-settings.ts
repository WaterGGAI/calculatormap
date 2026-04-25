import type { AiSeoTaskType } from "@/lib/ai-seo-core";
import { aiModels } from "@/lib/data";

export type SeoAutomationSettings = {
  enabled: boolean;
  batchSize: number;
  minDaysBetweenRefresh: number;
  defaultTaskType: AiSeoTaskType;
  defaultModelKey: string;
  tone: string;
  length: string;
  temperature: number;
  lastRunAt: string | null;
  lastStatus: string | null;
  lastSummaryJson: string | null;
};

export type SeoAutomationRun = {
  id: number;
  triggerSource: string;
  status: string;
  selectedCount: number;
  processedCount: number;
  successCount: number;
  failureCount: number;
  startedAt: string;
  finishedAt: string | null;
  summaryJson: string | null;
  errorMessage: string | null;
};

type SiteSettingsAutomationRow = {
  id: number;
  aiSeoAutomationEnabled: number | null;
  aiSeoBatchSize: number | null;
  aiSeoMinDaysBetweenRefresh: number | null;
  aiSeoDefaultTaskType: string | null;
  aiSeoDefaultModelKey: string | null;
  aiSeoPromptTone: string | null;
  aiSeoPromptLength: string | null;
  aiSeoTemperature: number | null;
  aiSeoLastRunAt: string | null;
  aiSeoLastStatus: string | null;
  aiSeoLastSummaryJson: string | null;
};

const defaultModelKey = aiModels[0]?.modelKey ?? "@cf/meta/llama-3.1-8b-instruct-fp8";

export const defaultSeoAutomationSettings: SeoAutomationSettings = {
  enabled: true,
  batchSize: 1,
  minDaysBetweenRefresh: 30,
  defaultTaskType: "full_refresh",
  defaultModelKey,
  tone: "professional",
  length: "medium",
  temperature: 0.2,
  lastRunAt: null,
  lastStatus: null,
  lastSummaryJson: null
};

function clampInteger(value: number | null | undefined, fallback: number, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(Math.round(value), min), max);
}

function clampFloat(value: number | null | undefined, fallback: number, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, min), max);
}

function normalizeTaskType(value: string | null | undefined): AiSeoTaskType {
  const supportedTaskTypes: AiSeoTaskType[] = [
    "full_refresh",
    "seo_title",
    "meta_description",
    "faq_generation",
    "intro_generation",
    "formula_explanation"
  ];

  return supportedTaskTypes.includes(value as AiSeoTaskType) ? (value as AiSeoTaskType) : defaultSeoAutomationSettings.defaultTaskType;
}

function normalizeString(value: string | null | undefined, fallback: string) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed.length > 0 ? trimmed : fallback;
}

function normalizeSettings(row: SiteSettingsAutomationRow | null): SeoAutomationSettings {
  if (!row) {
    return defaultSeoAutomationSettings;
  }

  const modelExists = aiModels.some((model) => model.modelKey === row.aiSeoDefaultModelKey);

  return {
    enabled: row.aiSeoAutomationEnabled === null ? defaultSeoAutomationSettings.enabled : row.aiSeoAutomationEnabled === 1,
    batchSize: clampInteger(row.aiSeoBatchSize, defaultSeoAutomationSettings.batchSize, 1, 10),
    minDaysBetweenRefresh: clampInteger(
      row.aiSeoMinDaysBetweenRefresh,
      defaultSeoAutomationSettings.minDaysBetweenRefresh,
      1,
      365
    ),
    defaultTaskType: normalizeTaskType(row.aiSeoDefaultTaskType),
    defaultModelKey: modelExists ? (row.aiSeoDefaultModelKey as string) : defaultSeoAutomationSettings.defaultModelKey,
    tone: normalizeString(row.aiSeoPromptTone, defaultSeoAutomationSettings.tone),
    length: normalizeString(row.aiSeoPromptLength, defaultSeoAutomationSettings.length),
    temperature: clampFloat(row.aiSeoTemperature, defaultSeoAutomationSettings.temperature, 0, 1.2),
    lastRunAt: row.aiSeoLastRunAt ?? null,
    lastStatus: row.aiSeoLastStatus ?? null,
    lastSummaryJson: row.aiSeoLastSummaryJson ?? null
  };
}

async function getSiteSettingsId(db: D1Database) {
  const row = await db.prepare("SELECT id FROM site_settings ORDER BY id ASC LIMIT 1").first<{ id: number }>();
  return row?.id ?? 1;
}

export async function getAutomationSettingsFromDb(db: D1Database) {
  const row = await db
    .prepare(
      `SELECT
        id,
        ai_seo_automation_enabled AS aiSeoAutomationEnabled,
        ai_seo_batch_size AS aiSeoBatchSize,
        ai_seo_min_days_between_refresh AS aiSeoMinDaysBetweenRefresh,
        ai_seo_default_task_type AS aiSeoDefaultTaskType,
        ai_seo_default_model_key AS aiSeoDefaultModelKey,
        ai_seo_prompt_tone AS aiSeoPromptTone,
        ai_seo_prompt_length AS aiSeoPromptLength,
        ai_seo_temperature AS aiSeoTemperature,
        ai_seo_last_run_at AS aiSeoLastRunAt,
        ai_seo_last_status AS aiSeoLastStatus,
        ai_seo_last_summary_json AS aiSeoLastSummaryJson
      FROM site_settings
      ORDER BY id ASC
      LIMIT 1`
    )
    .first<SiteSettingsAutomationRow>();

  return normalizeSettings(row ?? null);
}

export async function upsertAutomationSettingsInDb(
  db: D1Database,
  input: Partial<SeoAutomationSettings>
): Promise<SeoAutomationSettings> {
  const siteSettingsId = await getSiteSettingsId(db);
  const current = await getAutomationSettingsFromDb(db);
  const next = normalizeSettings({
    id: siteSettingsId,
    aiSeoAutomationEnabled: (input.enabled ?? current.enabled) ? 1 : 0,
    aiSeoBatchSize: input.batchSize ?? current.batchSize,
    aiSeoMinDaysBetweenRefresh: input.minDaysBetweenRefresh ?? current.minDaysBetweenRefresh,
    aiSeoDefaultTaskType: input.defaultTaskType ?? current.defaultTaskType,
    aiSeoDefaultModelKey: input.defaultModelKey ?? current.defaultModelKey,
    aiSeoPromptTone: input.tone ?? current.tone,
    aiSeoPromptLength: input.length ?? current.length,
    aiSeoTemperature: input.temperature ?? current.temperature,
    aiSeoLastRunAt: input.lastRunAt ?? current.lastRunAt,
    aiSeoLastStatus: input.lastStatus ?? current.lastStatus,
    aiSeoLastSummaryJson: input.lastSummaryJson ?? current.lastSummaryJson
  });

  await db
    .prepare(
      `INSERT INTO site_settings (
        id,
        ai_seo_automation_enabled,
        ai_seo_batch_size,
        ai_seo_min_days_between_refresh,
        ai_seo_default_task_type,
        ai_seo_default_model_key,
        ai_seo_prompt_tone,
        ai_seo_prompt_length,
        ai_seo_temperature,
        ai_seo_last_run_at,
        ai_seo_last_status,
        ai_seo_last_summary_json,
        updated_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        ai_seo_automation_enabled = excluded.ai_seo_automation_enabled,
        ai_seo_batch_size = excluded.ai_seo_batch_size,
        ai_seo_min_days_between_refresh = excluded.ai_seo_min_days_between_refresh,
        ai_seo_default_task_type = excluded.ai_seo_default_task_type,
        ai_seo_default_model_key = excluded.ai_seo_default_model_key,
        ai_seo_prompt_tone = excluded.ai_seo_prompt_tone,
        ai_seo_prompt_length = excluded.ai_seo_prompt_length,
        ai_seo_temperature = excluded.ai_seo_temperature,
        ai_seo_last_run_at = excluded.ai_seo_last_run_at,
        ai_seo_last_status = excluded.ai_seo_last_status,
        ai_seo_last_summary_json = excluded.ai_seo_last_summary_json,
        updated_at = CURRENT_TIMESTAMP`
    )
    .bind(
      siteSettingsId,
      next.enabled ? 1 : 0,
      next.batchSize,
      next.minDaysBetweenRefresh,
      next.defaultTaskType,
      next.defaultModelKey,
      next.tone,
      next.length,
      next.temperature,
      next.lastRunAt,
      next.lastStatus,
      next.lastSummaryJson
    )
    .run();

  return next;
}

export async function listRecentAutomationRunsFromDb(db: D1Database, limit = 8) {
  const rows = await db
    .prepare(
      `SELECT
        id,
        trigger_source AS triggerSource,
        status,
        selected_count AS selectedCount,
        processed_count AS processedCount,
        success_count AS successCount,
        failure_count AS failureCount,
        started_at AS startedAt,
        finished_at AS finishedAt,
        summary_json AS summaryJson,
        error_message AS errorMessage
      FROM seo_automation_runs
      ORDER BY id DESC
      LIMIT ?1`
    )
    .bind(limit)
    .all<SeoAutomationRun>();

  return rows.results ?? [];
}

export async function createAutomationRunInDb(
  db: D1Database,
  input: {
    triggerSource: string;
    status: string;
    selectedCount: number;
  }
) {
  const result = await db
    .prepare(
      `INSERT INTO seo_automation_runs (
        trigger_source,
        status,
        selected_count,
        processed_count,
        success_count,
        failure_count,
        started_at
      ) VALUES (?1, ?2, ?3, 0, 0, 0, CURRENT_TIMESTAMP)`
    )
    .bind(input.triggerSource, input.status, input.selectedCount)
    .run();

  return Number(result.meta.last_row_id ?? 0);
}

export async function finishAutomationRunInDb(
  db: D1Database,
  runId: number,
  input: {
    status: string;
    processedCount: number;
    successCount: number;
    failureCount: number;
    summaryJson: string;
    errorMessage?: string | null;
  }
) {
  await db
    .prepare(
      `UPDATE seo_automation_runs
      SET
        status = ?2,
        processed_count = ?3,
        success_count = ?4,
        failure_count = ?5,
        summary_json = ?6,
        error_message = ?7,
        finished_at = CURRENT_TIMESTAMP
      WHERE id = ?1`
    )
    .bind(runId, input.status, input.processedCount, input.successCount, input.failureCount, input.summaryJson, input.errorMessage ?? null)
    .run();
}
