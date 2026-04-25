import { AdminSectionPage, AdminTable, InlineAction } from "@/components/admin/admin-section-page";
import { calculators } from "@/lib/data";

export default function AdminFaqsPage() {
  return (
    <AdminSectionPage
      title="常見問題"
      description="集中管理 FAQ，依 calculator 篩選、檢查重複問題，並交由 AI 補 FAQ 草稿。"
    >
      <AdminTable
        columns={["Calculator", "問題", "答案", "排序", "操作"]}
        rows={calculators.flatMap((calculator) =>
          calculator.faqs.map((faq, index) => [
            calculator.name,
            faq.question,
            faq.answer,
            String(index + 1),
            <InlineAction href={`/admin/calculators/${calculator.slug}`} key={`${calculator.slug}-${index}`}>編輯</InlineAction>
          ])
        )}
      />
    </AdminSectionPage>
  );
}
