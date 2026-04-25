import { AdminSectionPage, AdminTable } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersPage() {
  return (
    <AdminSectionPage
      title="帳號權限"
      description="管理管理員、角色、啟用狀態與未來權限 middleware。"
      actionLabel="新增使用者"
      actionHref="/admin/users"
    >
      <AdminTable
        columns={["姓名", "Email", "角色", "狀態", "最後登入"]}
        rows={[["Admin Demo", "admin@example.com", "owner", <Badge tone="success" key="status">active</Badge>, "2026-04-12"]]}
      />
    </AdminSectionPage>
  );
}
