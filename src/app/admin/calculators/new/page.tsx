import { AdminSectionPage } from "@/components/admin/admin-section-page";
import { ButtonLink } from "@/components/ui/button";
import { FieldLabel, Input, Select, Textarea } from "@/components/ui/field";
import { categories } from "@/lib/data";

export default function AdminCalculatorNewPage() {
  return (
    <AdminSectionPage
      title="新增計算器"
      description="建立新的 calculator 草稿；下一步可補欄位、結果、公式、FAQ 與 SEO 設定。"
    >
      <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel>計算器名稱</FieldLabel>
            <Input placeholder="Mortgage Calculator" />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>Slug</FieldLabel>
            <Input placeholder="mortgage-calculator" />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>分類</FieldLabel>
            <Select defaultValue={String(categories[0].id)}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>狀態</FieldLabel>
            <Select defaultValue="draft">
              <option value="draft">草稿</option>
              <option value="published">已發布</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <FieldLabel>短描述</FieldLabel>
            <Textarea placeholder="Describe what this calculator does." />
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <ButtonLink href="/admin/calculators">建立草稿</ButtonLink>
          <ButtonLink href="/admin/calculators" variant="secondary">取消</ButtonLink>
        </div>
      </section>
    </AdminSectionPage>
  );
}
