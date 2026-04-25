import Link from "next/link";
import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import {
  calculatorInspirationCandidates,
  calculatorInspirationSource,
  type CalculatorInspirationStage
} from "@/lib/calculator-inspiration";
import { calculators } from "@/lib/data";

const stageLabels: Record<CalculatorInspirationStage, string> = {
  live: "已上線",
  "formula-ready": "公式可重寫",
  "needs-rules": "需查規則",
  "interactive-tool": "需互動 UI"
};

const stageTones: Record<CalculatorInspirationStage, "neutral" | "success" | "warning" | "danger"> = {
  live: "success",
  "formula-ready": "neutral",
  "needs-rules": "warning",
  "interactive-tool": "neutral"
};

const stageNextSteps: Record<CalculatorInspirationStage, string> = {
  live: "已對應到現有前台頁面。",
  "formula-ready": "可用公開公式與自寫文案轉成新計算器。",
  "needs-rules": "先確認費率、法規、日曆或資料來源，再上線。",
  "interactive-tool": "需要做專用互動元件，不能只靠一般公式表單。"
};

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CalculatorBacklogPage() {
  const formulaReadyCount = calculatorInspirationCandidates.filter((item) => item.stage === "formula-ready").length;
  const needsRulesCount = calculatorInspirationCandidates.filter((item) => item.stage === "needs-rules").length;
  const interactiveCount = calculatorInspirationCandidates.filter((item) => item.stage === "interactive-tool").length;
  const implementedCount = calculatorInspirationCandidates.filter((candidate) =>
    calculators.some((calculator) => calculator.slug === (candidate.liveSlug ?? slugFromName(candidate.name)) || calculator.name === candidate.name)
  ).length;

  return (
    <AdminSectionPage
      title="計算器候選清單"
      description="把外部站點當成題目研究來源，只借鑑計算器概念與公開公式方向；文案、UI、程式碼與資料規則都重新整理成我們自己的版本。"
      metrics={[
        { label: "來源宣稱數", value: String(calculatorInspirationSource.claimedCount), tone: "neutral" },
        { label: "已抓到候選", value: String(calculatorInspirationCandidates.length), tone: "success" },
        { label: "本站可用", value: String(implementedCount), tone: "success" },
        { label: "公式可重寫", value: String(formulaReadyCount), tone: "neutral" }
      ]}
    >
      <section className="grid gap-4 rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--ink-muted)] md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-lg font-bold text-[var(--ink)]">來源使用邊界</h2>
          <p className="mt-2">{calculatorInspirationSource.usageNote}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              className="rounded-md border border-[var(--line)] px-3 py-2 font-semibold text-[var(--accent)] hover:border-[var(--accent)]"
              href={calculatorInspirationSource.sourceSiteUrl}
              rel="noreferrer"
              target="_blank"
            >
              主站列表
            </Link>
            <Link
              className="rounded-md border border-[var(--line)] px-3 py-2 font-semibold text-[var(--accent)] hover:border-[var(--accent)]"
              href={calculatorInspirationSource.url}
              rel="noreferrer"
              target="_blank"
            >
              計算器列表
            </Link>
          </div>
        </div>
        <div className="grid gap-2 rounded-md bg-[var(--surface-muted)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span>需查規則</span>
            <Badge tone="warning">{needsRulesCount}</Badge>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>需互動 UI</span>
            <Badge tone="neutral">{interactiveCount}</Badge>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>來源未列出的缺口</span>
            <Badge tone="neutral">
              {Math.max(calculatorInspirationSource.claimedCount - calculatorInspirationCandidates.length, 0)}
            </Badge>
          </div>
        </div>
      </section>

      <AdminTable
        columns={["候選題目", "分類", "狀態", "下一步", "來源", "本站"]}
        rows={calculatorInspirationCandidates.map((candidate) => {
          const localCalculator = calculators.find(
            (calculator) => calculator.slug === (candidate.liveSlug ?? slugFromName(candidate.name)) || calculator.name === candidate.name
          );

          return [
            candidate.name,
            candidate.category,
            <Badge key="stage" tone={stageTones[candidate.stage]}>
              {stageLabels[candidate.stage]}
            </Badge>,
            localCalculator ? "已建立本站頁面；可依後續資料再細化規則與專屬互動。" : stageNextSteps[candidate.stage],
            <Link
              className="font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]"
              href={candidate.sourceUrl}
              key="source"
              rel="noreferrer"
              target="_blank"
            >
              參考
            </Link>,
            localCalculator ? (
              <InlineAction href={`/calculator/${localCalculator.slug}`} key="live">
                檢視
              </InlineAction>
            ) : (
              <span className="text-[var(--ink-muted)]" key="planned">
                待建
              </span>
            )
          ];
        })}
      />
    </AdminSectionPage>
  );
}
