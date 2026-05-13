import type { CalculatorValues } from "@/lib/calculators/types";
import { defaultLocale, type AppLocale } from "@/lib/i18n";

export type CalculatorPreset = {
  id: string;
  label: string;
  detail: string;
  values: CalculatorValues;
};

type PresetSeed = {
  id: string;
  en: {
    label: string;
    detail: string;
  };
  zh: {
    label: string;
    detail: string;
  };
  values: CalculatorValues;
};

const presetSeedsBySlug: Record<string, PresetSeed[]> = {
  "loan-payment-calculator": [
    {
      id: "small-personal",
      en: { label: "Personal loan", detail: "$8,000 over 3 years at 8.9%." },
      zh: { label: "個人小額貸款", detail: "8,000 美元，3 年，年利率 8.9%。" },
      values: { principal: "8000", annualRate: "8.9", years: "3" }
    },
    {
      id: "auto-loan",
      en: { label: "Auto loan", detail: "$32,000 over 6 years at 6.4%." },
      zh: { label: "車貸情境", detail: "32,000 美元，6 年，年利率 6.4%。" },
      values: { principal: "32000", annualRate: "6.4", years: "6" }
    },
    {
      id: "long-term",
      en: { label: "Long term", detail: "$50,000 over 10 years at 7.2%." },
      zh: { label: "長期貸款", detail: "50,000 美元，10 年，年利率 7.2%。" },
      values: { principal: "50000", annualRate: "7.2", years: "10" }
    }
  ],
  "mortgage-calculator": [
    {
      id: "starter-home",
      en: { label: "Starter home", detail: "$320k price with 15% down." },
      zh: { label: "首購小宅", detail: "房價 32 萬美元，頭期款 15%。" },
      values: { homePrice: "320000", downPayment: "48000", annualRate: "6.65", years: "30", propertyTaxMonthly: "290", insuranceMonthly: "110" }
    },
    {
      id: "family-home",
      en: { label: "Family home", detail: "$525k price with 20% down." },
      zh: { label: "家庭住宅", detail: "房價 52.5 萬美元，頭期款 20%。" },
      values: { homePrice: "525000", downPayment: "105000", annualRate: "6.9", years: "30", propertyTaxMonthly: "460", insuranceMonthly: "155" }
    },
    {
      id: "short-term",
      en: { label: "15-year payoff", detail: "$400k price, shorter term." },
      zh: { label: "15 年還清", detail: "房價 40 萬美元，較短貸款年限。" },
      values: { homePrice: "400000", downPayment: "80000", annualRate: "6.25", years: "15", propertyTaxMonthly: "350", insuranceMonthly: "125" }
    }
  ],
  "compound-interest-calculator": [
    {
      id: "starter-savings",
      en: { label: "Starter savings", detail: "$5,000 for 5 years at 4.5%." },
      zh: { label: "入門儲蓄", detail: "5,000 美元，5 年，年化 4.5%。" },
      values: { principal: "5000", annualRate: "4.5", years: "5", compoundsPerYear: "12" }
    },
    {
      id: "long-horizon",
      en: { label: "Long horizon", detail: "$15,000 for 15 years at 6%." },
      zh: { label: "長期累積", detail: "15,000 美元，15 年，年化 6%。" },
      values: { principal: "15000", annualRate: "6", years: "15", compoundsPerYear: "12" }
    },
    {
      id: "daily-compound",
      en: { label: "Daily compound", detail: "$10,000 at 5.2%, compounded daily." },
      zh: { label: "每日複利", detail: "10,000 美元，年化 5.2%，每日複利。" },
      values: { principal: "10000", annualRate: "5.2", years: "10", compoundsPerYear: "365" }
    }
  ],
  "savings-goal-calculator": [
    {
      id: "emergency-fund",
      en: { label: "Emergency fund", detail: "Build $15,000 from $2,500." },
      zh: { label: "緊急預備金", detail: "從 2,500 美元存到 15,000 美元。" },
      values: { goalAmount: "15000", currentSavings: "2500", monthlyContribution: "600" }
    },
    {
      id: "travel-fund",
      en: { label: "Travel fund", detail: "Save $4,200 with steady monthly deposits." },
      zh: { label: "旅行基金", detail: "固定每月存款，累積 4,200 美元。" },
      values: { goalAmount: "4200", currentSavings: "650", monthlyContribution: "350" }
    },
    {
      id: "down-payment",
      en: { label: "Down payment", detail: "Reach $40,000 with larger deposits." },
      zh: { label: "頭期款", detail: "用較高月存款累積到 40,000 美元。" },
      values: { goalAmount: "40000", currentSavings: "9000", monthlyContribution: "1250" }
    }
  ],
  "profit-margin-calculator": [
    {
      id: "small-product",
      en: { label: "Small product", detail: "$150 revenue with $90 cost." },
      zh: { label: "小商品", detail: "營收 150 美元，成本 90 美元。" },
      values: { revenue: "150", cost: "90" }
    },
    {
      id: "service-job",
      en: { label: "Service job", detail: "$1,250 revenue with $520 cost." },
      zh: { label: "服務專案", detail: "營收 1,250 美元，成本 520 美元。" },
      values: { revenue: "1250", cost: "520" }
    },
    {
      id: "wholesale-batch",
      en: { label: "Wholesale batch", detail: "$6,800 revenue with $4,350 cost." },
      zh: { label: "批發批次", detail: "營收 6,800 美元，成本 4,350 美元。" },
      values: { revenue: "6800", cost: "4350" }
    }
  ],
  "break-even-calculator": [
    {
      id: "pop-up-shop",
      en: { label: "Pop-up shop", detail: "$2,800 fixed cost, $38 price." },
      zh: { label: "快閃店", detail: "固定成本 2,800 美元，售價 38 美元。" },
      values: { fixedCosts: "2800", pricePerUnit: "38", variableCostPerUnit: "14" }
    },
    {
      id: "online-product",
      en: { label: "Online product", detail: "$7,500 fixed cost, $64 price." },
      zh: { label: "線上商品", detail: "固定成本 7,500 美元，售價 64 美元。" },
      values: { fixedCosts: "7500", pricePerUnit: "64", variableCostPerUnit: "26" }
    },
    {
      id: "course-launch",
      en: { label: "Course launch", detail: "$18,000 fixed cost, $240 price." },
      zh: { label: "課程上線", detail: "固定成本 18,000 美元，售價 240 美元。" },
      values: { fixedCosts: "18000", pricePerUnit: "240", variableCostPerUnit: "22" }
    }
  ],
  "pricing-calculator": [
    {
      id: "lean-margin",
      en: { label: "Lean margin", detail: "$28 cost, 25% target margin." },
      zh: { label: "薄利定價", detail: "成本 28 美元，目標毛利率 25%。" },
      values: { costPerUnit: "28", targetMarginPercent: "25" }
    },
    {
      id: "standard-margin",
      en: { label: "Standard margin", detail: "$40 cost, 35% target margin." },
      zh: { label: "標準定價", detail: "成本 40 美元，目標毛利率 35%。" },
      values: { costPerUnit: "40", targetMarginPercent: "35" }
    },
    {
      id: "premium-margin",
      en: { label: "Premium margin", detail: "$52 cost, 48% target margin." },
      zh: { label: "高毛利定價", detail: "成本 52 美元，目標毛利率 48%。" },
      values: { costPerUnit: "52", targetMarginPercent: "48" }
    }
  ],
  "hourly-to-salary-calculator": [
    {
      id: "part-time",
      en: { label: "Part-time", detail: "$24/hour, 25 hours each week." },
      zh: { label: "兼職", detail: "時薪 24 美元，每週 25 小時。" },
      values: { hourlyRate: "24", hoursPerWeek: "25", weeksPerYear: "50" }
    },
    {
      id: "full-time",
      en: { label: "Full-time", detail: "$32/hour, standard 40-hour week." },
      zh: { label: "全職", detail: "時薪 32 美元，每週 40 小時。" },
      values: { hourlyRate: "32", hoursPerWeek: "40", weeksPerYear: "52" }
    },
    {
      id: "consultant",
      en: { label: "Consultant", detail: "$85/hour, 30 billable hours weekly." },
      zh: { label: "顧問", detail: "時薪 85 美元，每週 30 計費小時。" },
      values: { hourlyRate: "85", hoursPerWeek: "30", weeksPerYear: "48" }
    }
  ],
  "take-home-pay-calculator": [
    {
      id: "monthly-paycheck",
      en: { label: "Monthly paycheck", detail: "$5,500 gross, 22% tax." },
      zh: { label: "月薪", detail: "稅前 5,500 美元，稅率 22%。" },
      values: { grossPay: "5500", taxRate: "22", otherDeductions: "250" }
    },
    {
      id: "higher-tax",
      en: { label: "Higher tax", detail: "$8,200 gross with more deductions." },
      zh: { label: "較高稅率", detail: "稅前 8,200 美元，扣除項較高。" },
      values: { grossPay: "8200", taxRate: "28", otherDeductions: "620" }
    },
    {
      id: "lighter-deductions",
      en: { label: "Light deductions", detail: "$4,200 gross with light deductions." },
      zh: { label: "低扣除", detail: "稅前 4,200 美元，扣除較少。" },
      values: { grossPay: "4200", taxRate: "18", otherDeductions: "120" }
    }
  ],
  "roas-calculator": [
    {
      id: "test-campaign",
      en: { label: "Test campaign", detail: "$2,400 revenue from $650 spend." },
      zh: { label: "測試投放", detail: "650 美元廣告費帶來 2,400 美元營收。" },
      values: { revenue: "2400", adSpend: "650" }
    },
    {
      id: "target-campaign",
      en: { label: "Target campaign", detail: "$6,500 revenue from $1,200 spend." },
      zh: { label: "目標投放", detail: "1,200 美元廣告費帶來 6,500 美元營收。" },
      values: { revenue: "6500", adSpend: "1200" }
    },
    {
      id: "scale-campaign",
      en: { label: "Scale campaign", detail: "$24,000 revenue from $5,800 spend." },
      zh: { label: "放量投放", detail: "5,800 美元廣告費帶來 24,000 美元營收。" },
      values: { revenue: "24000", adSpend: "5800" }
    }
  ],
  "roi-calculator": [
    {
      id: "small-project",
      en: { label: "Small project", detail: "$3,200 return on $2,100 cost." },
      zh: { label: "小專案", detail: "成本 2,100 美元，回收 3,200 美元。" },
      values: { returnValue: "3200", cost: "2100" }
    },
    {
      id: "growth-project",
      en: { label: "Growth project", detail: "$18,500 return on $11,200 cost." },
      zh: { label: "成長專案", detail: "成本 11,200 美元，回收 18,500 美元。" },
      values: { returnValue: "18500", cost: "11200" }
    },
    {
      id: "thin-return",
      en: { label: "Thin return", detail: "$9,400 return on $8,700 cost." },
      zh: { label: "低回報", detail: "成本 8,700 美元，回收 9,400 美元。" },
      values: { returnValue: "9400", cost: "8700" }
    }
  ],
  "cpm-calculator": [
    {
      id: "social-test",
      en: { label: "Social test", detail: "$320 spend, 72,000 impressions." },
      zh: { label: "社群測試", detail: "花費 320 美元，72,000 次曝光。" },
      values: { spend: "320", impressions: "72000" }
    },
    {
      id: "display-buy",
      en: { label: "Display buy", detail: "$1,850 spend, 410,000 impressions." },
      zh: { label: "展示廣告", detail: "花費 1,850 美元，410,000 次曝光。" },
      values: { spend: "1850", impressions: "410000" }
    },
    {
      id: "premium-video",
      en: { label: "Premium video", detail: "$4,200 spend, 250,000 impressions." },
      zh: { label: "高價影片", detail: "花費 4,200 美元，250,000 次曝光。" },
      values: { spend: "4200", impressions: "250000" }
    }
  ],
  "cpc-calculator": [
    {
      id: "search-test",
      en: { label: "Search test", detail: "$450 spend, 1,800 clicks." },
      zh: { label: "搜尋測試", detail: "花費 450 美元，1,800 次點擊。" },
      values: { spend: "450", clicks: "1800" }
    },
    {
      id: "competitive-keyword",
      en: { label: "Competitive", detail: "$2,400 spend, 960 clicks." },
      zh: { label: "競爭字詞", detail: "花費 2,400 美元，960 次點擊。" },
      values: { spend: "2400", clicks: "960" }
    },
    {
      id: "efficient-retargeting",
      en: { label: "Retargeting", detail: "$780 spend, 3,250 clicks." },
      zh: { label: "再行銷", detail: "花費 780 美元，3,250 次點擊。" },
      values: { spend: "780", clicks: "3250" }
    }
  ],
  "etsy-fee-calculator": [
    {
      id: "small-handmade",
      en: { label: "Small handmade", detail: "$28 item with light ads." },
      zh: { label: "小型手作", detail: "28 美元商品，少量廣告費。" },
      values: { itemPrice: "28", shippingCharged: "5", productCost: "8", shippingCost: "4", transactionFeeRate: "6.5", paymentFeeRate: "3", listingFee: "0.2", adSpend: "1.5" }
    },
    {
      id: "gift-order",
      en: { label: "Gift order", detail: "$64 item with higher packaging cost." },
      zh: { label: "禮品訂單", detail: "64 美元商品，包材成本較高。" },
      values: { itemPrice: "64", shippingCharged: "7", productCost: "21", shippingCost: "6", transactionFeeRate: "6.5", paymentFeeRate: "3", listingFee: "0.2", adSpend: "4" }
    },
    {
      id: "offsite-ad",
      en: { label: "Offsite ad", detail: "$120 order with heavier ad cost." },
      zh: { label: "站外廣告", detail: "120 美元訂單，廣告成本較高。" },
      values: { itemPrice: "120", shippingCharged: "10", productCost: "38", shippingCost: "9", transactionFeeRate: "6.5", paymentFeeRate: "3", listingFee: "0.2", adSpend: "15" }
    }
  ],
  "shopify-profit-calculator": [
    {
      id: "single-item",
      en: { label: "Single item", detail: "$58 product with $8 ad spend." },
      zh: { label: "單件商品", detail: "58 美元商品，8 美元廣告費。" },
      values: { productPrice: "58", shippingCharged: "7", productCost: "18", shippingCost: "6", paymentFeeRate: "2.9", adSpend: "8" }
    },
    {
      id: "bundle",
      en: { label: "Bundle order", detail: "$132 bundle with higher shipping." },
      zh: { label: "組合訂單", detail: "132 美元組合商品，運費較高。" },
      values: { productPrice: "132", shippingCharged: "9", productCost: "48", shippingCost: "11", paymentFeeRate: "2.9", adSpend: "18" }
    },
    {
      id: "low-ad",
      en: { label: "Low-ad repeat", detail: "$76 repeat order with low ads." },
      zh: { label: "低廣告回購", detail: "76 美元回購訂單，廣告費低。" },
      values: { productPrice: "76", shippingCharged: "0", productCost: "24", shippingCost: "7", paymentFeeRate: "2.9", adSpend: "2" }
    }
  ],
  "concrete-cost-calculator": [
    {
      id: "small-slab",
      en: { label: "Small slab", detail: "10 x 8 ft, 4 in depth." },
      zh: { label: "小型地坪", detail: "10 x 8 英尺，厚度 4 英寸。" },
      values: { lengthFt: "10", widthFt: "8", depthIn: "4", costPerCubicYard: "165", bagYieldCubicFt: "0.45" }
    },
    {
      id: "patio",
      en: { label: "Patio", detail: "18 x 12 ft, 4 in depth." },
      zh: { label: "露台", detail: "18 x 12 英尺，厚度 4 英寸。" },
      values: { lengthFt: "18", widthFt: "12", depthIn: "4", costPerCubicYard: "165", bagYieldCubicFt: "0.45" }
    },
    {
      id: "driveway",
      en: { label: "Driveway", detail: "32 x 14 ft, 5 in depth." },
      zh: { label: "車道", detail: "32 x 14 英尺，厚度 5 英寸。" },
      values: { lengthFt: "32", widthFt: "14", depthIn: "5", costPerCubicYard: "175", bagYieldCubicFt: "0.45" }
    }
  ],
  "gravel-calculator": [
    {
      id: "garden-path",
      en: { label: "Garden path", detail: "24 x 3 ft, 2 in depth." },
      zh: { label: "花園步道", detail: "24 x 3 英尺，深度 2 英寸。" },
      values: { lengthFt: "24", widthFt: "3", depthIn: "2", densityTonPerYard: "1.4", costPerTon: "52" }
    },
    {
      id: "driveway-top",
      en: { label: "Driveway top", detail: "30 x 12 ft, 3 in depth." },
      zh: { label: "車道鋪面", detail: "30 x 12 英尺，深度 3 英寸。" },
      values: { lengthFt: "30", widthFt: "12", depthIn: "3", densityTonPerYard: "1.4", costPerTon: "52" }
    },
    {
      id: "deep-base",
      en: { label: "Deep base", detail: "40 x 10 ft, 6 in depth." },
      zh: { label: "較深底層", detail: "40 x 10 英尺，深度 6 英寸。" },
      values: { lengthFt: "40", widthFt: "10", depthIn: "6", densityTonPerYard: "1.5", costPerTon: "58" }
    }
  ],
  "paint-calculator": [
    {
      id: "bedroom",
      en: { label: "Bedroom", detail: "360 sq ft, 2 coats." },
      zh: { label: "臥室", detail: "360 平方英尺，2 道漆。" },
      values: { wallAreaSqFt: "360", coats: "2", coverageSqFtPerGallon: "350", wastePercent: "10", costPerGallon: "42" }
    },
    {
      id: "living-room",
      en: { label: "Living room", detail: "620 sq ft, 2 coats." },
      zh: { label: "客廳", detail: "620 平方英尺，2 道漆。" },
      values: { wallAreaSqFt: "620", coats: "2", coverageSqFtPerGallon: "350", wastePercent: "12", costPerGallon: "48" }
    },
    {
      id: "whole-floor",
      en: { label: "Whole floor", detail: "1,450 sq ft, 2 coats." },
      zh: { label: "整層空間", detail: "1,450 平方英尺，2 道漆。" },
      values: { wallAreaSqFt: "1450", coats: "2", coverageSqFtPerGallon: "350", wastePercent: "15", costPerGallon: "46" }
    }
  ]
};

export function getCalculatorPresets(slug: string, locale: AppLocale = defaultLocale): CalculatorPreset[] {
  const seeds = presetSeedsBySlug[slug] ?? [];
  const useZh = locale === "zh-TW";

  return seeds.map((preset) => ({
    id: preset.id,
    label: useZh ? preset.zh.label : preset.en.label,
    detail: useZh ? preset.zh.detail : preset.en.detail,
    values: preset.values
  }));
}
