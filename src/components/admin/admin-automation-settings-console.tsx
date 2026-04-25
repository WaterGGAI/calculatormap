"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldHint, FieldLabel, Input, Select } from "@/components/ui/field";
import type { AiSeoTaskType } from "@/lib/ai-seo-core";
import type { SeoAutomationRun, SeoAutomationSettings } from "@/lib/site-settings";

type ModelOption = {
  id: number;
  name: string;
  modelKey: string;
  temperature: number;
};

type RunResponse = {
  success: boolean;
  error?: string;
  data?: {
    runId: number | null;
    triggerSource: string;
    status: string;
    startedAt: string;
    finishedAt: string;
    selectedCount: number;
    processedCount: number;
    successCount: number;
    failureCount: number;
    appliedSlugs: string[];
    failures: Array<{ slug: string; error: string }>;
  };
};

type SaveResponse = {
  success: boolean;
  error?: string;
  data?: {
    settings: SeoAutomationSettings;
    recentRuns: SeoAutomationRun[];
  };
};

function formatDateTime(value: string | null) {
  if (!value) {
    return "尚未執行";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("zh-TW");
}

export function AdminAutomationSettingsConsole({
  initialSettings,
  initialRuns,
  models
}: {
  initialSettings: SeoAutomationSettings;
  initialRuns: SeoAutomationRun[];
  models: ModelOption[];
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [runs, setRuns] = useState(initialRuns);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [runMessage, setRunMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);

  const selectedModel = useMemo(
    () => models.find((model) => model.modelKey === settings.defaultModelKey) ?? models[0],
    [models, settings.defaultModelKey]
  );

  function updateSetting<Key extends keyof SeoAutomationSettings>(key: Key, value: SeoAutomationSettings[Key]) {
    setSettings((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaveMessage(null);

    try {
      const response = await fetch("/api/admin/settings/automation", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(settings)
      });
      const payload = (await response.json()) as SaveResponse;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error ?? "儲存失敗。");
      }

      setSettings(payload.data.settings);
      setRuns(payload.data.recentRuns);
      setSaveMessage("設定已儲存，cron worker 之後會照這組規則自動跑。");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "儲存失敗。");
    } finally {
      setSaving(false);
    }
  }

  async function handleRunNow() {
    setRunning(true);
    setError(null);
    setRunMessage(null);

    try {
      const response = await fetch("/api/admin/automation/run", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          force: true
        })
      });
      const payload = (await response.json()) as RunResponse;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error ?? "執行失敗。");
      }

      const runData = payload.data;

      setRunMessage(
        `本次狀態：${runData.status}。處理 ${runData.processedCount} 個，成功 ${runData.successCount} 個，失敗 ${runData.failureCount} 個。`
      );
      setRuns((current) => [
        {
          id: runData.runId ?? 0,
          triggerSource: runData.triggerSource,
          status: runData.status,
          selectedCount: runData.selectedCount,
          processedCount: runData.processedCount,
          successCount: runData.successCount,
          failureCount: runData.failureCount,
          startedAt: runData.startedAt,
          finishedAt: runData.finishedAt,
          summaryJson: JSON.stringify(runData),
          errorMessage:
            runData.failures.length > 0
              ? runData.failures.map((failure) => `${failure.slug}: ${failure.error}`).join(" | ")
              : null
        },
        ...current
      ].slice(0, 8));
      setSettings((current) => ({
        ...current,
        lastRunAt: runData.finishedAt ?? current.lastRunAt,
        lastStatus: runData.status ?? current.lastStatus,
        lastSummaryJson: JSON.stringify(runData)
      }));
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "執行失敗。");
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">AI SEO 無人值守</h2>
        <p className="text-sm leading-6 text-[var(--ink-muted)]">
          Cloudflare cron 會每小時喚醒一次 worker。啟用後，系統會自動挑選需要補內容或已過刷新間隔的 calculator，生成後直接寫回 D1 override。
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="flex items-start gap-3 rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-3 text-sm font-medium text-[var(--ink)] md:col-span-2 xl:col-span-3">
          <input
            checked={settings.enabled}
            className="mt-1 size-4"
            onChange={(event) => updateSetting("enabled", event.target.checked)}
            type="checkbox"
          />
          <span>
            啟用無人值守模式
            <FieldHint className="mt-1">關閉後 cron 還是會喚醒 worker，但只會記錄為 disabled，不會真的生成內容。</FieldHint>
          </span>
        </label>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="batchSize">每次批次數</FieldLabel>
          <Input
            id="batchSize"
            onChange={(event) => updateSetting("batchSize", Number(event.target.value) || 1)}
            value={String(settings.batchSize)}
          />
          <FieldHint>建議 1 到 3，先穩穩跑。</FieldHint>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="minDaysBetweenRefresh">最短刷新間隔（天）</FieldLabel>
          <Input
            id="minDaysBetweenRefresh"
            onChange={(event) => updateSetting("minDaysBetweenRefresh", Number(event.target.value) || 30)}
            value={String(settings.minDaysBetweenRefresh)}
          />
          <FieldHint>避免同一頁太頻繁重寫。</FieldHint>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="defaultTaskType">預設任務</FieldLabel>
          <Select
            id="defaultTaskType"
            onChange={(event) => updateSetting("defaultTaskType", event.target.value as AiSeoTaskType)}
            value={settings.defaultTaskType}
          >
            <option value="full_refresh">完整 SEO 更新</option>
            <option value="seo_title">只更新 SEO title</option>
            <option value="meta_description">只更新 meta description</option>
            <option value="intro_generation">只更新 intro</option>
            <option value="formula_explanation">只更新公式說明</option>
            <option value="faq_generation">只更新 FAQ</option>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="defaultModelKey">預設模型</FieldLabel>
          <Select
            id="defaultModelKey"
            onChange={(event) => {
              const nextModel = models.find((model) => model.modelKey === event.target.value);
              updateSetting("defaultModelKey", event.target.value);
              if (nextModel) {
                updateSetting("temperature", nextModel.temperature);
              }
            }}
            value={settings.defaultModelKey}
          >
            {models.map((model) => (
              <option key={model.modelKey} value={model.modelKey}>
                {model.name}
              </option>
            ))}
          </Select>
          {selectedModel ? <FieldHint>目前模型預設 temperature：{selectedModel.temperature}</FieldHint> : null}
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="tone">Tone</FieldLabel>
          <Select id="tone" onChange={(event) => updateSetting("tone", event.target.value)} value={settings.tone}>
            <option value="professional">professional</option>
            <option value="friendly">friendly</option>
            <option value="concise">concise</option>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="length">Length</FieldLabel>
          <Select id="length" onChange={(event) => updateSetting("length", event.target.value)} value={settings.length}>
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor="temperature">Temperature</FieldLabel>
          <Input
            id="temperature"
            onChange={(event) => updateSetting("temperature", Number(event.target.value) || 0.2)}
            value={String(settings.temperature)}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button disabled={saving} onClick={handleSave} type="button">
          {saving ? "儲存中..." : "儲存自動化設定"}
        </Button>
        <Button disabled={running} onClick={handleRunNow} type="button" variant="secondary">
          {running ? "執行中..." : "現在跑一輪"}
        </Button>
      </div>

      {saveMessage ? (
        <div className="mt-4 rounded-md border border-[#b9d7ca] bg-[#eef8f1] px-4 py-3 text-sm font-medium text-[#16543d]">{saveMessage}</div>
      ) : null}
      {runMessage ? (
        <div className="mt-4 rounded-md border border-[#b9d7ca] bg-[#eef8f1] px-4 py-3 text-sm font-medium text-[#16543d]">{runMessage}</div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-md border border-[#d8b2ae] bg-[#fff1ef] px-4 py-3 text-sm font-medium text-[#8f1b12]">{error}</div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Last Run</p>
          <p className="mt-2 text-sm font-semibold">{formatDateTime(settings.lastRunAt)}</p>
        </div>
        <div className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Last Status</p>
          <p className="mt-2 text-sm font-semibold">{settings.lastStatus ?? "尚未執行"}</p>
        </div>
        <div className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Cadence</p>
          <p className="mt-2 text-sm font-semibold">每小時一次 cron 喚醒</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-bold">最近執行紀錄</h3>
        <div className="mt-3 grid gap-3">
          {runs.length > 0 ? (
            runs.map((run) => (
              <div className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3" key={`${run.id}-${run.startedAt}`}>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <strong>#{run.id}</strong>
                  <span>{run.triggerSource}</span>
                  <span>{run.status}</span>
                  <span>
                    success {run.successCount} / failure {run.failureCount}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  {formatDateTime(run.startedAt)} 到 {formatDateTime(run.finishedAt)}
                </p>
                {run.errorMessage ? <p className="mt-2 text-sm text-[#8f1b12]">{run.errorMessage}</p> : null}
              </div>
            ))
          ) : (
            <div className="rounded-md border border-dashed border-[var(--line)] px-4 py-5 text-sm leading-6 text-[var(--ink-muted)]">
              還沒有任何自動化執行紀錄。打開自動化後，cron 或手動執行都會在這裡留下摘要。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
