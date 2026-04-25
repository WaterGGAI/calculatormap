import { AdminSectionPage, AdminTable } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { adSlots } from "@/lib/data";

export default function AdminAdsPage() {
  return (
    <AdminSectionPage
      title="廣告管理"
      description="管理廣告版位、活動、素材、排程、裝置顯示規則與曝光點擊成效。前台無廣告時會自動隱藏版位。"
      metrics={[
        { label: "廣告版位", value: String(adSlots.length), tone: "neutral" },
        { label: "啟用活動", value: "0", tone: "warning" },
        { label: "今日曝光", value: "0", tone: "neutral" },
        { label: "今日點擊", value: "0", tone: "neutral" }
      ]}
    >
      <AdminTable
        columns={["版位名稱", "版位 key", "尺寸建議", "顯示裝置", "狀態"]}
        rows={adSlots.map((slot) => [
          slot.name,
          slot.key,
          slot.size,
          slot.key.includes("sidebar") ? "desktop" : "desktop / tablet / mobile",
          <Badge tone="warning" key="status">empty</Badge>
        ])}
      />
    </AdminSectionPage>
  );
}
