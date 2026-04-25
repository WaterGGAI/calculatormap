import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { calculators, categories } from "@/lib/data";

export default function AdminCategoriesPage() {
  return (
    <AdminSectionPage
      title="分類管理"
      description="維護分類名稱、slug、介紹內容、SEO title、SEO description 與排序。"
      actionLabel="新增分類"
      actionHref="/admin/categories"
    >
      <AdminTable
        columns={["分類名稱", "Slug", "狀態", "計算器數量", "SEO 狀態", "最後更新", "操作"]}
        rows={categories.map((category) => [
          category.name,
          category.slug,
          <Badge tone="success" key="status">{category.status}</Badge>,
          calculators.filter((calculator) => calculator.categoryId === category.id).length,
          <Badge tone="success" key="seo">healthy</Badge>,
          "2026-04-10",
          <InlineAction href={`/category/${category.slug}`} key="action">預覽</InlineAction>
        ])}
      />
    </AdminSectionPage>
  );
}
