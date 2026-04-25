import { AdminSectionPage, AdminTable } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { aiModels } from "@/lib/data";

export default function AdminModelsPage() {
  return (
    <AdminSectionPage
      title="模型管理"
      description="管理 Workers AI 模型、適用任務、temperature、max tokens 與 fallback priority。"
      actionLabel="新增模型"
      actionHref="/admin/models"
    >
      <AdminTable
        columns={["模型名稱", "model key", "provider", "適用任務", "temperature", "max tokens", "狀態"]}
        rows={aiModels.map((model) => [
          model.name,
          model.modelKey,
          model.provider,
          model.tasks.join(", "),
          model.temperature,
          model.maxTokens,
          <Badge tone={model.status === "active" ? "success" : "warning"} key="status">{model.status}</Badge>
        ])}
      />
    </AdminSectionPage>
  );
}
