import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { calculators, getRelatedCalculators } from "@/lib/data";

export default function AdminInternalLinksPage() {
  const rows = calculators.flatMap((calculator) =>
    getRelatedCalculators(calculator).map((target) => [
      calculator.name,
      target.name,
      target.name.replace(" Calculator", " calculator"),
      "1",
      <InlineAction href={`/admin/calculators/${calculator.slug}`} key={`${calculator.slug}-${target.slug}`}>編輯</InlineAction>
    ])
  );

  return (
    <AdminSectionPage
      title="內部連結"
      description="指定 related calculators、anchor text，並檢查孤兒頁與內鏈不足頁面。"
    >
      <AdminTable columns={["來源頁面", "目標頁面", "錨文字", "排序", "操作"]} rows={rows} />
    </AdminSectionPage>
  );
}
