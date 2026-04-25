import { AdminAutomationSettingsConsole } from "@/components/admin/admin-automation-settings-console";
import { AdminSectionPage } from "@/components/admin/admin-section-page";
import { FieldLabel, Input, Textarea } from "@/components/ui/field";
import { getCloudflareEnv } from "@/lib/cloudflare";
import { aiModels } from "@/lib/data";
import { defaultSeoAutomationSettings, listRecentAutomationRunsFromDb, getAutomationSettingsFromDb } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const env = await getCloudflareEnv();
  const db = env?.DB;
  const automationSettings = db ? await getAutomationSettingsFromDb(db) : defaultSeoAutomationSettings;
  const recentRuns = db ? await listRecentAutomationRunsFromDb(db) : [];

  return (
    <AdminSectionPage
      title="網站設定"
      description="設定網站品牌基礎資料，並控制 AI SEO 無人值守排程、批次大小、模型與最近執行紀錄。"
    >
      <div className="grid gap-6">
        <section className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel>網站名稱</FieldLabel>
              <Input defaultValue="CalculatorMap" />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>網域</FieldLabel>
              <Input defaultValue="https://calculatormap.com" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <FieldLabel>預設 SEO title 模板</FieldLabel>
              <Input defaultValue="{{page_title}} | CalculatorMap" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <FieldLabel>robots.txt</FieldLabel>
              <Textarea defaultValue={"User-agent: *\nAllow: /\nSitemap: https://calculatormap.com/sitemap.xml"} />
            </div>
          </div>
        </section>

        <AdminAutomationSettingsConsole
          initialRuns={recentRuns}
          initialSettings={automationSettings}
          models={aiModels.map((model) => ({
            id: model.id,
            name: model.name,
            modelKey: model.modelKey,
            temperature: model.temperature
          }))}
        />
      </div>
    </AdminSectionPage>
  );
}
