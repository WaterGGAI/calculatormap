import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { aiModels, calculators, categories } from "@/lib/data";

export default function AdminDashboardPage() {
  const published = calculators.filter((calculator) => calculator.status === "published").length;
  const drafts = calculators.length - published;

  return (
    <AdminSectionPage
      title="儀表板"
      description="查看計算器發布狀態、SEO 待辦、AI 任務與近期內容變更。"
      metrics={[
        { label: "已發布計算器", value: String(published), tone: "success" },
        { label: "草稿計算器", value: String(drafts), tone: drafts > 0 ? "warning" : "neutral" },
        { label: "分類數量", value: String(categories.length), tone: "neutral" },
        { label: "啟用 AI 模型", value: String(aiModels.length), tone: "success" }
      ]}
    >
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="text-lg font-bold">熱門 calculators</h2>
          <div className="mt-4 grid gap-3">
            {calculators.slice(0, 4).map((calculator) => (
              <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0" key={calculator.slug}>
                <div>
                  <p className="font-semibold">{calculator.name}</p>
                  <p className="text-sm text-[var(--ink-muted)]">/{calculator.slug}</p>
                </div>
                <Badge tone="success">published</Badge>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="text-lg font-bold">SEO 警示清單</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <p className="rounded-md bg-[var(--surface-muted)] p-3">FAQ 數量低於 3：所有示範頁目前仍可增加 FAQ。</p>
            <p className="rounded-md bg-[var(--surface-muted)] p-3">內部連結需要排程審核：5 個 calculator 已有 related links。</p>
            <p className="rounded-md bg-[var(--surface-muted)] p-3">Schema 已在公開 calculator 頁輸出。</p>
          </div>
        </section>
      </div>
      <AdminTable
        columns={["項目", "類型", "狀態", "最後更新", "操作"]}
        rows={calculators.map((calculator) => [
          calculator.name,
          "calculator",
          <Badge tone="success" key="status">{calculator.status}</Badge>,
          calculator.updatedAt,
          <InlineAction href={`/admin/calculators/${calculator.slug}`} key="action">編輯</InlineAction>
        ])}
      />
    </AdminSectionPage>
  );
}
