import { AdminSectionPage } from "@/components/admin/admin-section-page";
import { ButtonLink } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/field";

export default function AdminMediaPage() {
  return (
    <AdminSectionPage
      title="媒體素材"
      description="管理 OG 圖、廣告圖片素材、HTML 片段與未來 R2 上傳流程。"
    >
      <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="text-lg font-bold">上傳素材</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel>檔案名稱</FieldLabel>
            <Input defaultValue="default-og-image.jpg" />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>素材 URL</FieldLabel>
            <Input defaultValue="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" />
          </div>
        </div>
        <div className="mt-5">
          <ButtonLink href="/admin/media">儲存素材</ButtonLink>
        </div>
      </section>
    </AdminSectionPage>
  );
}
