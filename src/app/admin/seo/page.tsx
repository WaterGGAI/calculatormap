import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { calculators } from "@/lib/data";

export default function AdminSeoPage() {
  return (
    <AdminSectionPage
      title="SEO 管理"
      description="集中查看缺 title、缺 description、noindex、內容太薄、FAQ 不足與內部連結不足等問題。"
      metrics={[
        { label: "健康頁面", value: String(calculators.length), tone: "success" },
        { label: "FAQ 可補強", value: String(calculators.length), tone: "warning" },
        { label: "noindex", value: "0", tone: "success" },
        { label: "重複 metadata", value: "0", tone: "success" }
      ]}
    >
      <div className="grid gap-3 rounded-md border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-4">
        {["缺 title", "缺 description", "noindex", "FAQ 不足"].map((filter) => (
          <button className="rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold" key={filter}>
            {filter}
          </button>
        ))}
      </div>
      <AdminTable
        columns={["頁面名稱", "URL", "類型", "SEO Title", "Index 狀態", "健康分數", "操作"]}
        rows={calculators.map((calculator) => [
          calculator.name,
          `/calculator/${calculator.slug}`,
          "calculator",
          calculator.seo.title,
          <Badge tone="success" key="index">{calculator.seo.robots}</Badge>,
          <Badge tone="success" key="score">88</Badge>,
          <InlineAction href={`/admin/calculators/${calculator.slug}`} key="action">修正</InlineAction>
        ])}
      />
    </AdminSectionPage>
  );
}
