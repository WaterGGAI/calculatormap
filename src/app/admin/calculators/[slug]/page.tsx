import { notFound } from "next/navigation";
import { AdminSectionPage } from "@/components/admin/admin-section-page";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { FieldLabel, Input, Select, Textarea } from "@/components/ui/field";
import { getMergedCalculatorBySlug } from "@/lib/calculator-content";
import { categories, getCalculator } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminCalculatorEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calculator = await getMergedCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return (
    <AdminSectionPage
      title={`編輯：${calculator.name}`}
      description="主編輯區維護 calculator 內容、欄位、結果、公式與 FAQ；右側輔助區提供發布、SEO 快覽與 AI SEO 任務。"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-5">
          <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-bold">基本資料</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <FieldLabel>計算器名稱</FieldLabel>
                <Input defaultValue={calculator.name} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Slug</FieldLabel>
                <Input defaultValue={calculator.slug} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>分類</FieldLabel>
                <Select defaultValue={String(calculator.categoryId)}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>狀態</FieldLabel>
                <Select defaultValue={calculator.status}>
                  <option value="draft">草稿</option>
                  <option value="published">已發布</option>
                </Select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <FieldLabel>短描述</FieldLabel>
                <Textarea defaultValue={calculator.shortDescription} />
              </div>
            </div>
          </section>
          <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-bold">輸入欄位設定</h2>
            <div className="mt-4 grid gap-3">
              {calculator.fields.map((field) => (
                <div className="grid gap-3 rounded-md border border-[var(--line)] p-3 md:grid-cols-4" key={field.key}>
                  <Input defaultValue={field.label} aria-label={`${field.label} label`} />
                  <Input defaultValue={field.key} aria-label={`${field.label} key`} />
                  <Input defaultValue={field.type} aria-label={`${field.label} type`} />
                  <Input defaultValue={field.unit ?? ""} aria-label={`${field.label} unit`} />
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-bold">頁面內容與 SEO</h2>
            <div className="mt-4 grid gap-4">
              <div className="flex flex-col gap-2">
                <FieldLabel>H1</FieldLabel>
                <Input defaultValue={calculator.h1} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Formula Explanation</FieldLabel>
                <Textarea defaultValue={calculator.formulaExplanation} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>SEO Title</FieldLabel>
                <Input defaultValue={calculator.seo.title} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Meta Description</FieldLabel>
                <Textarea defaultValue={calculator.seo.description} />
              </div>
            </div>
          </section>
        </div>
        <aside className="flex flex-col gap-5">
          <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-bold">發布</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <p>狀態：<Badge tone="success">{calculator.status}</Badge></p>
              <p>建立時間：2026-04-01</p>
              <p>更新時間：{calculator.updatedAt}</p>
              <ButtonLink href={`/calculator/${calculator.slug}`}>預覽公開頁</ButtonLink>
              <ButtonLink href="/admin/calculators" variant="secondary">儲存草稿</ButtonLink>
            </div>
          </section>
          <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-bold">SEO 快覽</h2>
            <div className="mt-4 grid gap-2 text-sm">
              <Badge tone="success">title 已填</Badge>
              <Badge tone="success">description 已填</Badge>
              <Badge tone="warning">FAQ 可增加</Badge>
              <Badge tone="success">內部連結已設定</Badge>
            </div>
          </section>
          <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-bold">AI SEO</h2>
            <div className="mt-4 grid gap-3">
              <Select defaultValue="seo_title">
                <option value="seo_title">生成 SEO title</option>
                <option value="meta_description">生成 meta description</option>
                <option value="faq_generation">生成 FAQ</option>
              </Select>
              <Select defaultValue="professional">
                <option value="professional">professional</option>
                <option value="friendly">friendly</option>
              </Select>
              <Input defaultValue="0.2" aria-label="temperature" />
              <ButtonLink href={`/admin/ai-seo?calculator=${calculator.slug}`}>產生內容</ButtonLink>
            </div>
          </section>
        </aside>
      </div>
    </AdminSectionPage>
  );
}
