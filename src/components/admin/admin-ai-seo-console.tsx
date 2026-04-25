"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldHint, FieldLabel, Input, Select, Textarea } from "@/components/ui/field";

type CalculatorOption = {
  slug: string;
  name: string;
};

type ModelOption = {
  id: number;
  name: string;
  modelKey: string;
  temperature: number;
};

type GenerationResponse = {
  success: boolean;
  error?: string;
  data?: {
    applied: boolean;
    logId: number;
    latencyMs: number;
    model: {
      id: number;
      name: string;
      modelKey: string;
    };
    taskType: string;
    bundle: {
      seoTitle: string;
      metaDescription: string;
      h1: string;
      intro: string;
      formulaExplanation: string;
      faqs: Array<{ question: string; answer: string }>;
    };
    appliedPreview: {
      seoTitle: string;
      metaDescription: string;
      h1: string;
      intro: string;
      formulaExplanation: string;
      faqs: Array<{ question: string; answer: string }>;
    };
  };
};

export function AdminAiSeoConsole({
  calculators,
  models,
  initialCalculatorSlug
}: {
  calculators: CalculatorOption[];
  models: ModelOption[];
  initialCalculatorSlug: string;
}) {
  const [calculatorSlug, setCalculatorSlug] = useState(initialCalculatorSlug);
  const [taskType, setTaskType] = useState("full_refresh");
  const [modelKey, setModelKey] = useState(models[0]?.modelKey ?? "");
  const [keyword, setKeyword] = useState(initialCalculatorSlug.replaceAll("-", " "));
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [temperature, setTemperature] = useState(String(models[0]?.temperature ?? 0.2));
  const [autoApply, setAutoApply] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResponse["data"] | null>(null);

  const selectedCalculator = useMemo(
    () => calculators.find((item) => item.slug === calculatorSlug) ?? calculators[0],
    [calculatorSlug, calculators]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/ai/generate", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          calculatorSlug,
          taskType,
          modelKey,
          keyword,
          tone,
          length,
          temperature: Number(temperature),
          autoApply
        })
      });

      const payload = (await response.json()) as GenerationResponse;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error ?? "Generation failed.");
      }

      setResult(payload.data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="text-lg font-bold">任務設定</h2>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="calculatorSlug">Calculator</FieldLabel>
            <Select
              id="calculatorSlug"
              onChange={(event) => {
                const slug = event.target.value;
                setCalculatorSlug(slug);
                setKeyword(slug.replaceAll("-", " "));
              }}
              value={calculatorSlug}
            >
              {calculators.map((calculator) => (
                <option key={calculator.slug} value={calculator.slug}>
                  {calculator.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="taskType">任務類型</FieldLabel>
            <Select id="taskType" onChange={(event) => setTaskType(event.target.value)} value={taskType}>
              <option value="full_refresh">完整 SEO 更新</option>
              <option value="seo_title">只更新 SEO title</option>
              <option value="meta_description">只更新 meta description</option>
              <option value="intro_generation">只更新 intro</option>
              <option value="formula_explanation">只更新公式說明</option>
              <option value="faq_generation">只更新 FAQ</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="modelKey">模型</FieldLabel>
            <Select
              id="modelKey"
              onChange={(event) => {
                const nextModel = models.find((item) => item.modelKey === event.target.value);
                setModelKey(event.target.value);
                if (nextModel) {
                  setTemperature(String(nextModel.temperature));
                }
              }}
              value={modelKey}
            >
              {models.map((model) => (
                <option key={model.modelKey} value={model.modelKey}>
                  {model.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="tone">Tone</FieldLabel>
              <Select id="tone" onChange={(event) => setTone(event.target.value)} value={tone}>
                <option value="professional">professional</option>
                <option value="friendly">friendly</option>
                <option value="concise">concise</option>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="length">Length</FieldLabel>
              <Select id="length" onChange={(event) => setLength(event.target.value)} value={length}>
                <option value="short">short</option>
                <option value="medium">medium</option>
                <option value="long">long</option>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="temperature">Temperature</FieldLabel>
              <Input id="temperature" onChange={(event) => setTemperature(event.target.value)} value={temperature} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="keyword">主關鍵字</FieldLabel>
            <Input id="keyword" onChange={(event) => setKeyword(event.target.value)} value={keyword} />
            <FieldHint>預設會用 calculator slug 組成關鍵字，可直接改成你想打的搜尋詞。</FieldHint>
          </div>
          <label className="flex items-start gap-3 rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-3 text-sm font-medium text-[var(--ink)]">
            <input checked={autoApply} className="mt-1 size-4" onChange={(event) => setAutoApply(event.target.checked)} type="checkbox" />
            <span>
              自動套用到目前 calculator
              <FieldHint className="mt-1">打開後，生成完成會直接寫入 D1 override，公開頁面會立刻讀到新內容。</FieldHint>
            </span>
          </label>
          <Button type="submit">{loading ? "Generating..." : autoApply ? "Generate and apply" : "Generate content"}</Button>
          {selectedCalculator ? (
            <FieldHint>
              目標頁面：<a className="font-semibold text-[var(--accent)]" href={`/calculator/${selectedCalculator.slug}`}>/calculator/{selectedCalculator.slug}</a>
            </FieldHint>
          ) : null}
        </form>
      </section>

      <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="text-lg font-bold">生成結果</h2>
        {error ? (
          <div className="mt-4 rounded-md border border-[#d8b2ae] bg-[#fff1ef] px-4 py-3 text-sm font-medium text-[#8f1b12]">{error}</div>
        ) : null}
        {result ? (
          <div className="mt-4 flex flex-col gap-4">
            <div className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm">
              <p className="font-semibold">{result.applied ? "已完成生成並套用" : "已完成生成"}</p>
              <p className="mt-1 text-[var(--ink-muted)]">
                model: {result.model.name} | task: {result.taskType} | latency: {result.latencyMs} ms | log #{result.logId}
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <FieldLabel>SEO Title</FieldLabel>
                <Textarea readOnly value={result.appliedPreview.seoTitle} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Meta Description</FieldLabel>
                <Textarea readOnly value={result.appliedPreview.metaDescription} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>H1</FieldLabel>
                <Textarea readOnly value={result.appliedPreview.h1} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Intro</FieldLabel>
                <Textarea readOnly value={result.appliedPreview.intro} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Formula Explanation</FieldLabel>
                <Textarea readOnly value={result.appliedPreview.formulaExplanation} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>FAQ</FieldLabel>
                <Textarea
                  readOnly
                  value={result.appliedPreview.faqs.map((faq, index) => `${index + 1}. ${faq.question}\n${faq.answer}`).join("\n\n")}
                />
              </div>
            </div>
            {selectedCalculator ? (
              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-transparent bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)]"
                  href={`/calculator/${selectedCalculator.slug}`}
                >
                  打開公開頁
                </a>
                <a
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface-muted)]"
                  href={`/admin/calculators/${selectedCalculator.slug}`}
                >
                  打開編輯頁
                </a>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-4 rounded-md border border-dashed border-[var(--line)] px-4 py-6 text-sm leading-6 text-[var(--ink-muted)]">
            送出後會顯示生成內容、模型、耗時，以及是否已經寫回到公開 calculator 頁。
          </div>
        )}
      </section>
    </div>
  );
}
