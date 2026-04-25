import { AdminSectionPage } from "@/components/admin/admin-section-page";
import { AdminAiSeoConsole } from "@/components/admin/admin-ai-seo-console";
import { aiModels, calculators } from "@/lib/data";

export default async function AdminAiSeoPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const calculatorParam = resolvedSearchParams.calculator;
  const initialCalculatorSlug =
    typeof calculatorParam === "string" && calculators.some((calculator) => calculator.slug === calculatorParam)
      ? calculatorParam
      : calculators[0]?.slug ?? "";

  return (
    <AdminSectionPage
      title="AI SEO 助理"
      description="選 calculator 後直接生成並套用 SEO title、meta description、H1、intro、FAQ、formula explanation。"
    >
      <AdminAiSeoConsole
        calculators={calculators.map((calculator) => ({ slug: calculator.slug, name: calculator.name }))}
        initialCalculatorSlug={initialCalculatorSlug}
        models={aiModels.map((model) => ({
          id: model.id,
          name: model.name,
          modelKey: model.modelKey,
          temperature: model.temperature
        }))}
      />
    </AdminSectionPage>
  );
}
