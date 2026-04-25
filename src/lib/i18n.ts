import { siteConfig } from "@/lib/site-config";

export const localeConfig = {
  en: {
    label: "EN",
    nativeLabel: "English",
    htmlLang: "en",
    ogLocale: "en_US"
  },
  "zh-TW": {
    label: "繁中",
    nativeLabel: "繁體中文",
    htmlLang: "zh-Hant-TW",
    ogLocale: "zh_TW"
  }
} as const;

export type AppLocale = keyof typeof localeConfig;

export const defaultLocale: AppLocale = "en";
export const secondaryLocales: AppLocale[] = ["zh-TW"];
export const publicLocales: AppLocale[] = [defaultLocale, ...secondaryLocales];

type HomeLane = {
  short: string;
  title: string;
  detail: string;
  href: string;
  tone: "light" | "dark" | "mint" | "gold";
};

type HomeStamp = {
  short: string;
  label: string;
  detail: string;
  href: string;
  tone: "light" | "dark" | "mint" | "gold";
};

type HomeSignal = {
  short: string;
  label: string;
  detail: string;
};

type HomeAction = {
  short: string;
  label: string;
  href: string;
  tone: "light" | "dark" | "mint" | "gold";
};

type MessageBundle = {
  language: {
    switchLabel: string;
  };
  nav: {
    calculators: string;
    guides: string;
    clusters: string;
    about: string;
    contact: string;
    privacyPolicy: string;
    terms: string;
    menu: string;
  };
  actions: {
    open: string;
    openCalculator: string;
    openCluster: string;
    readGuide: string;
    browseCalculators: string;
    seeAllCalculators: string;
    viewAllClusters: string;
    browseAllGuides: string;
  };
  footer: {
    description: string;
  };
  common: {
    updated: string;
    inputs: string;
    outputs: string;
    model: string;
    related: string;
    category: string;
    relatedGuides: string;
    relatedCalculators: string;
    connectedRelated: string;
    standaloneUtility: string;
  };
  calculatorsPage: {
    title: string;
    description: string;
  };
  articlesPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  clustersPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  categoryPage: {
    titleSuffix: string;
    relatedGuidesDescription: string;
  };
  calculatorPage: {
    result: string;
    calculate: string;
    reset: string;
    formulaExplanationTitle: string;
    formulaExplanationDetail: string;
    howToUseTitle: string;
    howToUseDetail: string;
    examplesTitle: string;
    examplesDetail: string;
    faqTitle: string;
    faqDetail: string;
    relatedGuidesDetail: string;
    relatedCalculatorsDetail: string;
  };
  articlePage: {
    primaryCalculator: string;
    primaryCalculatorDescription: string;
    onThisPage: string;
    faq: string;
  };
  clusterPage: {
    bestUseCases: string;
    coreCalculators: string;
    supportingGuides: string;
    otherClusters: string;
  };
  staticPages: {
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
  };
  home: {
    heroBadge: string;
    heroDescription: string;
    tryButtonPrefix: string;
    browseCalculators: string;
    readGuides: string;
    liveLaneEyebrow: string;
    lanes: HomeLane[];
    signals: HomeSignal[];
    operatingModesEyebrow: string;
    operatingModesTitle: string;
    operatingModesDescription: string;
    categoryStamps: HomeStamp[];
    quickWinsEyebrow: string;
    quickWinsTitle: string;
    quickWinsDescription: string;
    seoClustersEyebrow: string;
    seoClustersTitle: string;
    seoClustersDescription: string;
    guidesEyebrow: string;
    guidesTitle: string;
    guidesDescription: string;
    finalEyebrow: string;
    finalTitle: string;
    finalDescription: string;
    finalActions: HomeAction[];
  };
};

const messageBundles: Record<AppLocale, MessageBundle> = {
  en: {
    language: {
      switchLabel: "Language"
    },
    nav: {
      calculators: "Calculators",
      guides: "Guides",
      clusters: "Clusters",
      about: "About",
      contact: "Contact",
      privacyPolicy: "Privacy Policy",
      terms: "Terms",
      menu: "Menu"
    },
    actions: {
      open: "Open",
      openCalculator: "Open calculator",
      openCluster: "Open cluster",
      readGuide: "Read guide",
      browseCalculators: "Browse calculators",
      seeAllCalculators: "See every calculator",
      viewAllClusters: "View all clusters",
      browseAllGuides: "Browse all guides"
    },
    footer: {
      description: "Fast online calculators, cost tools, and practical guides for pricing, marketing, work, finance, and home projects."
    },
    common: {
      updated: "Updated",
      inputs: "Inputs",
      outputs: "Outputs",
      model: "Model",
      related: "Related",
      category: "Category",
      relatedGuides: "Related Guides",
      relatedCalculators: "Related Calculators",
      connectedRelated: "Connected calculators in the same workflow.",
      standaloneUtility: "Standalone quick utility."
    },
    calculatorsPage: {
      title: "All Calculators",
      description: `Browse ${siteConfig.name} calculators with formulas, examples, and FAQ.`
    },
    articlesPage: {
      eyebrow: "Guides",
      title: "CalculatorMap Guides",
      description: "Read how-to articles, comparison pages, and scenario guides that connect each search topic to the right calculator."
    },
    clustersPage: {
      eyebrow: "Clusters",
      title: "SEO Topic Clusters",
      description: "Explore calculator hubs grouped around pricing, marketing, salary, finance, and home-improvement decisions."
    },
    categoryPage: {
      titleSuffix: "Calculators",
      relatedGuidesDescription: "Start with a calculator, then read the supporting guide to compare formulas, assumptions, and common mistakes."
    },
    calculatorPage: {
      result: "Result",
      calculate: "Calculate",
      reset: "Reset",
      formulaExplanationTitle: "Formula Explanation",
      formulaExplanationDetail: "The core logic behind the numbers on this page.",
      howToUseTitle: "How to Use",
      howToUseDetail: "A short path from input to result.",
      examplesTitle: "Examples",
      examplesDetail: "Reference scenarios to sanity-check your inputs.",
      faqTitle: "FAQ",
      faqDetail: "Common edge cases and quick clarifications.",
      relatedGuidesDetail: "Supporting explainers that go deeper than the calculator alone.",
      relatedCalculatorsDetail: "Neighboring tools in the same decision flow."
    },
    articlePage: {
      primaryCalculator: "Primary Calculator",
      primaryCalculatorDescription: "Open the calculator first, test one realistic scenario, and then use the guide below to check formulas, benchmarks, and assumptions.",
      onThisPage: "On this page",
      faq: "FAQ"
    },
    clusterPage: {
      bestUseCases: "Best use cases",
      coreCalculators: "Core Calculators",
      supportingGuides: "Supporting Guides",
      otherClusters: "Other Clusters"
    },
    staticPages: {
      aboutTitle: `About ${siteConfig.name}`,
      aboutDescription: `${siteConfig.name} is an English calculator content site built around fast tools, clear formulas, structured data, practical guides, and internal-linking paths that help users move from one decision to the next.`,
      contactTitle: "Contact",
      contactDescription: `For calculator corrections, editorial requests, partnerships, or advertising questions, contact ${siteConfig.contactEmail}.`,
      privacyTitle: "Privacy Policy",
      privacyDescription: `${siteConfig.name} does not ask users to create accounts to run calculators. If analytics, advertising, or form-based contact features are expanded later, this page should be updated before those changes go live.`,
      termsTitle: "Terms",
      termsDescription: `Calculators and guides on ${siteConfig.name} are provided for general information. Results are estimates and should be checked before financial, business, medical, or legal decisions.`
    },
    home: {
      heroBadge: "Operational calculators for real decisions",
      heroDescription: "Price cleanly, estimate faster, and move from a rough number to a confident next step.",
      tryButtonPrefix: "Try",
      browseCalculators: "Browse calculators",
      readGuides: "Read guides",
      liveLaneEyebrow: "Start with a live lane",
      lanes: [
        { short: "ROI", title: "Business & Pricing", detail: "Margins, break-even, markup, and seller fees.", href: "/clusters/business-pricing-calculators", tone: "gold" },
        { short: "ADS", title: "Marketing & Ecommerce", detail: "ROAS, CPM, CPA, fees, and profit checks.", href: "/clusters/marketing-ecommerce-calculators", tone: "light" },
        { short: "PAY", title: "Salary & Work", detail: "Rate, commission, payroll, and offer math.", href: "/clusters/salary-work-calculators", tone: "mint" },
        { short: "YRD", title: "Home Improvement & Cost", detail: "Concrete, paint, gravel, and room planning.", href: "/clusters/home-improvement-cost-calculators", tone: "gold" }
      ],
      signals: [
        { short: "MAP", label: "Intent-led structure", detail: "Calculators, clusters, and guides stay connected around the same decision." },
        { short: "FST", label: "Fast working surface", detail: "Most tools get to a usable number in seconds, not a long setup flow." },
        { short: "USE", label: "Practical follow-through", detail: "Formula notes and guides stay beside the result when context matters." }
      ],
      operatingModesEyebrow: "Operating modes",
      operatingModesTitle: "Choose a lane, then go straight to the number that matters.",
      operatingModesDescription: "CalculatorMap is organized around the decisions people actually make, from pricing and pay to ads, home projects, and day-to-day planning.",
      categoryStamps: [
        { short: "FIN", label: "Finance", detail: "Loans, savings, travel, and mortgage math.", href: "/category/finance", tone: "mint" },
        { short: "MAT", label: "Math", detail: "Discounts, tax, percentages, and tips.", href: "/category/math", tone: "gold" },
        { short: "HOM", label: "Home & Family", detail: "Household planning, rooms, and recurring costs.", href: "/category/home-family", tone: "dark" },
        { short: "TEC", label: "Tech", detail: "Screens, charging, power, and device planning.", href: "/category/tech", tone: "light" },
        { short: "TXT", label: "Text Tools", detail: "Counts, cleanup, and quick writing utilities.", href: "/category/text-tools", tone: "mint" },
        { short: "HLT", label: "Health", detail: "BMI, calories, body metrics, and pace.", href: "/category/health", tone: "gold" }
      ],
      quickWinsEyebrow: "High-intent workflows",
      quickWinsTitle: "Quick-Win Calculators",
      quickWinsDescription: "High-intent calculators built around pricing, salary, ads, seller profit, and home project planning.",
      seoClustersEyebrow: "Search pathways",
      seoClustersTitle: "SEO Clusters",
      seoClustersDescription: "Each cluster groups calculators and guides around a commercial search theme so users can move from lookup to decision.",
      guidesEyebrow: "Decision support",
      guidesTitle: "Guides",
      guidesDescription: "Intro guides, comparison pages, and scenario explainers that point directly into the right calculator.",
      finalEyebrow: "Keep moving",
      finalTitle: "Open a calculator, test a real scenario, and leave with a usable number.",
      finalDescription: "Fast inputs, clear formulas, and enough surrounding context to make the result actionable.",
      finalActions: [
        { short: "ALL", label: "All calculators", href: "/calculators", tone: "light" },
        { short: "SEO", label: "Search clusters", href: "/clusters", tone: "gold" },
        { short: "READ", label: "Guides", href: "/articles", tone: "mint" }
      ]
    }
  },
  "zh-TW": {
    language: {
      switchLabel: "語言"
    },
    nav: {
      calculators: "計算器",
      guides: "指南",
      clusters: "主題群集",
      about: "關於我們",
      contact: "聯絡我們",
      privacyPolicy: "隱私權政策",
      terms: "使用條款",
      menu: "選單"
    },
    actions: {
      open: "開啟",
      openCalculator: "開啟計算器",
      openCluster: "開啟群集",
      readGuide: "閱讀指南",
      browseCalculators: "瀏覽計算器",
      seeAllCalculators: "查看全部計算器",
      viewAllClusters: "查看全部群集",
      browseAllGuides: "瀏覽全部指南"
    },
    footer: {
      description: "提供價格、行銷、工作、財務與居家規劃的快速線上計算器、成本工具與實用指南。"
    },
    common: {
      updated: "更新於",
      inputs: "輸入",
      outputs: "輸出",
      model: "模型",
      related: "相關",
      category: "分類",
      relatedGuides: "相關指南",
      relatedCalculators: "相關計算器",
      connectedRelated: "同一工作流程中的相關計算器。",
      standaloneUtility: "獨立使用的小工具。"
    },
    calculatorsPage: {
      title: "全部計算器",
      description: `瀏覽 ${siteConfig.name} 的計算器、公式、範例與 FAQ。`
    },
    articlesPage: {
      eyebrow: "指南",
      title: `${siteConfig.name} 指南`,
      description: "閱讀教學、比較頁與情境指南，快速連到對應的計算器。"
    },
    clustersPage: {
      eyebrow: "群集",
      title: "SEO 主題群集",
      description: "探索依價格、行銷、薪資、財務與居家決策整理的計算器主題頁。"
    },
    categoryPage: {
      titleSuffix: "計算器",
      relatedGuidesDescription: "先用計算器，再透過指南比較公式、假設與常見錯誤。"
    },
    calculatorPage: {
      result: "結果",
      calculate: "開始計算",
      reset: "重設",
      formulaExplanationTitle: "公式說明",
      formulaExplanationDetail: "這一頁數字背後的核心邏輯。",
      howToUseTitle: "使用方式",
      howToUseDetail: "從輸入到結果的最短路徑。",
      examplesTitle: "範例",
      examplesDetail: "用參考情境快速檢查你的輸入。",
      faqTitle: "常見問題",
      faqDetail: "常見邊界情況與快速說明。",
      relatedGuidesDetail: "更深入說明背景與判斷方式的延伸內容。",
      relatedCalculatorsDetail: "同一決策流程中的相鄰工具。"
    },
    articlePage: {
      primaryCalculator: "主要計算器",
      primaryCalculatorDescription: "先開啟計算器，代入一個真實情境，再用下方指南核對公式、基準與假設。",
      onThisPage: "本頁內容",
      faq: "常見問題"
    },
    clusterPage: {
      bestUseCases: "最佳使用情境",
      coreCalculators: "核心計算器",
      supportingGuides: "延伸指南",
      otherClusters: "其他群集"
    },
    staticPages: {
      aboutTitle: `關於 ${siteConfig.name}`,
      aboutDescription: `${siteConfig.name} 是以快速工具、清楚公式、結構化資料、實用指南與內部連結路徑為核心的計算器網站，幫助使用者從單一數字走到下一步決策。`,
      contactTitle: "聯絡我們",
      contactDescription: `若有計算器修正、內容合作、商務合作或廣告相關問題，請來信 ${siteConfig.contactEmail}。`,
      privacyTitle: "隱私權政策",
      privacyDescription: `${siteConfig.name} 目前不要求使用者註冊帳號即可使用計算器。若未來擴充分析、廣告或表單聯絡功能，會在功能上線前同步更新本頁。`,
      termsTitle: "使用條款",
      termsDescription: `${siteConfig.name} 上的計算器與指南僅供一般資訊參考。所有結果皆屬估算，在財務、商務、醫療或法律決策前請再次確認。`
    },
    home: {
      heroBadge: "為真實決策打造的操作型計算器",
      heroDescription: "更快估算、更清楚定價，從模糊數字走到可執行的下一步。",
      tryButtonPrefix: "試用",
      browseCalculators: "瀏覽計算器",
      readGuides: "閱讀指南",
      liveLaneEyebrow: "從一條路徑開始",
      lanes: [
        { short: "ROI", title: "商業與定價", detail: "毛利、損益兩平、加價率與平台費用。", href: "/clusters/business-pricing-calculators", tone: "gold" },
        { short: "ADS", title: "行銷與電商", detail: "ROAS、CPM、CPA、費用與利潤檢查。", href: "/clusters/marketing-ecommerce-calculators", tone: "light" },
        { short: "PAY", title: "薪資與工作", detail: "費率、抽成、薪資與報價計算。", href: "/clusters/salary-work-calculators", tone: "mint" },
        { short: "YRD", title: "居家工程與成本", detail: "混凝土、油漆、碎石與空間規劃。", href: "/clusters/home-improvement-cost-calculators", tone: "gold" }
      ],
      signals: [
        { short: "MAP", label: "以意圖為核心的結構", detail: "計算器、群集與指南會圍繞同一個決策彼此連動。" },
        { short: "FST", label: "快速工作介面", detail: "多數工具幾秒內就能得到可用數字，不需要冗長設定。" },
        { short: "USE", label: "從結果走到下一步", detail: "當背景脈絡重要時，公式與指南會跟著結果一起出現。" }
      ],
      operatingModesEyebrow: "操作模式",
      operatingModesTitle: "先選一條路，再直接走到最重要的數字。",
      operatingModesDescription: "CalculatorMap 依照真實決策場景來整理內容，從定價、薪資、廣告到居家工程與日常規劃都有對應路徑。",
      categoryStamps: [
        { short: "FIN", label: "財務", detail: "貸款、儲蓄、旅遊與房貸計算。", href: "/category/finance", tone: "mint" },
        { short: "MAT", label: "數學", detail: "折扣、稅額、百分比與小費。", href: "/category/math", tone: "gold" },
        { short: "HOM", label: "居家與家庭", detail: "家庭規劃、空間與固定支出。", href: "/category/home-family", tone: "dark" },
        { short: "TEC", label: "科技", detail: "螢幕、充電、耗電與裝置規劃。", href: "/category/tech", tone: "light" },
        { short: "TXT", label: "文字工具", detail: "字數、清理與寫作小工具。", href: "/category/text-tools", tone: "mint" },
        { short: "HLT", label: "健康", detail: "BMI、熱量、身體指標與配速。", href: "/category/health", tone: "gold" }
      ],
      quickWinsEyebrow: "高意圖工作流",
      quickWinsTitle: "高轉換計算器",
      quickWinsDescription: "聚焦定價、薪資、廣告、賣家利潤與居家工程規劃的高意圖工具。",
      seoClustersEyebrow: "搜尋路徑",
      seoClustersTitle: "SEO 主題群集",
      seoClustersDescription: "每個群集都把計算器與指南圍繞同一個商業搜尋主題整理在一起，讓使用者從查詢走到決策。",
      guidesEyebrow: "決策輔助",
      guidesTitle: "指南",
      guidesDescription: "教學、比較頁與情境說明，會直接帶你進到正確的計算器。",
      finalEyebrow: "繼續往前",
      finalTitle: "打開計算器，測一個真實情境，帶著可用數字離開。",
      finalDescription: "快速輸入、清楚公式，再加上足夠的背景脈絡，讓結果能真正拿來用。",
      finalActions: [
        { short: "ALL", label: "全部計算器", href: "/calculators", tone: "light" },
        { short: "SEO", label: "搜尋群集", href: "/clusters", tone: "gold" },
        { short: "READ", label: "指南", href: "/articles", tone: "mint" }
      ]
    }
  }
};

export function isLocale(value: string): value is AppLocale {
  return value in localeConfig;
}

export function getLocaleMessages(locale: AppLocale) {
  return messageBundles[locale];
}

export function getLocalePrefix(locale: AppLocale) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function localizeHref(locale: AppLocale, href: string) {
  if (!href.startsWith("/")) {
    return href;
  }

  if (href === "/") {
    return getLocalePrefix(locale) || "/";
  }

  return `${getLocalePrefix(locale)}${href}`;
}

export function stripLocaleFromPath(pathname: string) {
  for (const locale of secondaryLocales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }

  return pathname;
}

export function switchLocalePath(pathname: string, targetLocale: AppLocale) {
  return localizeHref(targetLocale, stripLocaleFromPath(pathname));
}

export function getAlternateLanguagePaths(path: string) {
  const normalizedPath = path === "" ? "/" : path;

  return {
    "x-default": new URL(localizeHref(defaultLocale, normalizedPath), siteConfig.url).toString(),
    en: new URL(localizeHref("en", normalizedPath), siteConfig.url).toString(),
    "zh-TW": new URL(localizeHref("zh-TW", normalizedPath), siteConfig.url).toString()
  };
}
