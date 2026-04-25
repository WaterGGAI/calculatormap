import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { calculators, categories } from "@/lib/data";

export default function AdminCalculatorsPage() {
  return (
    <AdminSectionPage
      title="計算器管理"
      description="管理 calculator 基本資料、欄位、結果、公式、FAQ、SEO 與發布狀態。"
      actionLabel="新增計算器"
      actionHref="/admin/calculators/new"
      metrics={[
        { label: "總計算器", value: String(calculators.length), tone: "neutral" },
        { label: "已發布", value: String(calculators.filter((item) => item.status === "published").length), tone: "success" },
        { label: "需要 SEO 檢查", value: "5", tone: "warning" },
        { label: "本週更新", value: "5", tone: "success" }
      ]}
    >
      <div className="grid gap-3 rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-4">
        <input className="rounded-md border border-[var(--line)] px-3 py-2 text-sm" placeholder="搜尋計算器" />
        <select className="rounded-md border border-[var(--line)] px-3 py-2 text-sm">
          <option>所有分類</option>
          {categories.map((category) => (
            <option key={category.slug}>{category.name}</option>
          ))}
        </select>
        <select className="rounded-md border border-[var(--line)] px-3 py-2 text-sm">
          <option>所有狀態</option>
          <option>published</option>
          <option>draft</option>
        </select>
        <select className="rounded-md border border-[var(--line)] px-3 py-2 text-sm">
          <option>最後更新排序</option>
          <option>名稱排序</option>
        </select>
      </div>
      <AdminTable
        columns={["名稱", "Slug", "分類", "狀態", "SEO 狀態", "AI 狀態", "最後更新", "操作"]}
        rows={calculators.map((calculator) => [
          calculator.name,
          calculator.slug,
          categories.find((category) => category.id === calculator.categoryId)?.name,
          <Badge tone="success" key="status">{calculator.status}</Badge>,
          <Badge tone="success" key="seo">healthy</Badge>,
          <Badge tone="neutral" key="ai">ready</Badge>,
          calculator.updatedAt,
          <div className="flex gap-3" key="actions">
            <InlineAction href={`/admin/calculators/${calculator.slug}`}>編輯</InlineAction>
            <InlineAction href={`/calculator/${calculator.slug}`}>預覽</InlineAction>
          </div>
        ])}
      />
    </AdminSectionPage>
  );
}
