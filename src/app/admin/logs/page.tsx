import { AdminSectionPage, AdminTable } from "@/components/admin/admin-section-page";

export default function AdminLogsPage() {
  return (
    <AdminSectionPage
      title="操作紀錄"
      description="追蹤 SEO、AI、calculator、分類與廣告設定的管理操作。"
    >
      <AdminTable
        columns={["時間", "使用者", "動作", "目標", "摘要"]}
        rows={[
          ["2026-04-12 10:00", "Admin Demo", "seed", "calculators", "建立示範 calculator 內容"],
          ["2026-04-12 10:05", "Admin Demo", "audit", "seo", "檢查 FAQ 與內部連結狀態"]
        ]}
      />
    </AdminSectionPage>
  );
}
