const publishedAt = "2026-04-12";

export type ClusterPriority = "P1" | "P2";

export type SeoCluster = {
  name: string;
  slug: string;
  priority: ClusterPriority;
  goal: string;
  description: string;
  useCases: string[];
  coreCalculatorSlugs: string[];
  featuredArticleSlugs: string[];
};

export type SeoArticleSection = {
  heading: string;
  body: string[];
};

export type SeoArticleFaq = {
  question: string;
  answer: string;
};

export type SeoArticle = {
  title: string;
  slug: string;
  primaryKeyword: string;
  clusterSlug: string;
  priority: ClusterPriority;
  contentType: string;
  relatedCalculatorSlug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  outline: string[];
  sections: SeoArticleSection[];
  faqs: SeoArticleFaq[];
  relatedCalculatorSlugs: string[];
  publishedAt: string;
  updatedAt: string;
};

function makeSections(articleTitle: string, primaryKeyword: string, outline: string[], relatedCalculatorSlug: string): SeoArticleSection[] {
  return outline.map((heading, index) => ({
    heading,
    body: [
      `${heading} is one of the key ideas behind ${primaryKeyword}. This section of ${articleTitle} explains what to check before you rely on the final number.`,
      index === 0
        ? `Start with the related calculator, test one realistic scenario, and then use the rest of the guide to understand where the formula helps and where your assumptions matter most.`
        : `Once the concept is clear, use the ${relatedCalculatorSlug.replace(/-/g, " ")} page on CalculatorMap to compare different inputs and pressure-test your estimate.`
    ]
  }));
}

function makeArticle(input: {
  title: string;
  slug: string;
  primaryKeyword: string;
  clusterSlug: string;
  priority: ClusterPriority;
  contentType: string;
  relatedCalculatorSlug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  outline: string[];
  relatedCalculatorSlugs: string[];
}): SeoArticle {
  return {
    ...input,
    sections: makeSections(input.title, input.primaryKeyword, input.outline, input.relatedCalculatorSlug),
    faqs: [
      {
        question: `What is the easiest way to work through ${input.primaryKeyword}?`,
        answer: `The fastest way is to open the related calculator, enter your numbers, and then use this guide to validate the formula, units, and decision points behind the result.`
      },
      {
        question: `What mistakes should I avoid with ${input.primaryKeyword}?`,
        answer: "The most common mistakes are mixing units, leaving out fees or overhead, and assuming one example applies to every scenario. Recheck your assumptions before using the number in a real decision."
      },
      {
        question: `Which other calculators should I compare with ${input.primaryKeyword}?`,
        answer: "Use the related calculators on this page to compare supporting variables, margins, costs, taxes, or scenario-based tradeoffs before making a decision."
      }
    ],
    publishedAt,
    updatedAt: publishedAt
  };
}

export const seoClusters: SeoCluster[] = [
  {
    name: "Business & Pricing",
    slug: "business-pricing-calculators",
    priority: "P1",
    goal: "Capture high-intent pricing, margin, and profitability searches.",
    description: "Pricing, margin, break-even, and revenue tools for businesses that need clearer numbers before they quote, launch, or adjust prices.",
    useCases: ["Pricing products or services", "Checking break-even targets", "Comparing margin, markup, and revenue tradeoffs"],
    coreCalculatorSlugs: ["profit-margin-calculator", "markup-calculator", "markup-vs-margin-calculator", "break-even-calculator", "pricing-calculator"],
    featuredArticleSlugs: [
      "how-to-calculate-profit-margin",
      "markup-vs-margin-formula-examples",
      "break-even-point-explained"
    ]
  },
  {
    name: "Marketing & Ecommerce",
    slug: "marketing-ecommerce-calculators",
    priority: "P1",
    goal: "Capture seller and marketing searches around ad efficiency, fees, and channel profitability.",
    description: "ROAS, ROI, fee, and ad metric calculators for marketers, ecommerce operators, and sellers comparing acquisition and margin.",
    useCases: ["Checking ad profitability", "Understanding marketplace fees", "Comparing campaign efficiency metrics"],
    coreCalculatorSlugs: ["roas-calculator", "roi-calculator", "cpm-calculator", "cpc-calculator", "etsy-fee-calculator", "shopify-profit-calculator"],
    featuredArticleSlugs: [
      "roas-calculator-guide",
      "cpm-vs-cpc-vs-cpa",
      "etsy-fee-calculator-real-profit",
      "shopify-profit-calculator-product-cost-shipping-ad-spend"
    ]
  },
  {
    name: "Salary & Work",
    slug: "salary-work-calculators",
    priority: "P1",
    goal: "Capture recurring searches around compensation, consulting rates, overtime, and take-home pay.",
    description: "Work and income calculators for salaried teams, contractors, and freelancers estimating revenue, tax drag, and rate targets.",
    useCases: ["Converting hourly pay to salary", "Calculating overtime and commission", "Setting freelance pricing and take-home targets"],
    coreCalculatorSlugs: [
      "hourly-to-salary-calculator",
      "overtime-calculator",
      "commission-calculator",
      "freelance-rate-calculator",
      "take-home-pay-calculator"
    ],
    featuredArticleSlugs: [
      "freelance-pricing-calculator-how-much-should-you-charge",
      "hourly-to-salary-convert-your-pay",
      "commission-structures-explained"
    ]
  },
  {
    name: "Home Improvement & Cost",
    slug: "home-improvement-cost-calculators",
    priority: "P1",
    goal: "Capture measurement and project-cost searches with strong commercial intent.",
    description: "Project planning calculators for rooms, material quantities, waste factors, and job cost estimates before you buy supplies.",
    useCases: ["Estimating paint, gravel, and concrete", "Comparing cost per area", "Planning room and flooring coverage"],
    coreCalculatorSlugs: [
      "concrete-cost-calculator",
      "gravel-calculator",
      "paint-calculator",
      "square-footage-calculator",
      "flooring-calculator"
    ],
    featuredArticleSlugs: [
      "concrete-cost-calculator-bags-or-yards",
      "paint-calculator-by-room-size",
      "gravel-calculator-with-cost-estimate"
    ]
  },
  {
    name: "Personal Finance",
    slug: "personal-finance-calculators",
    priority: "P2",
    goal: "Build authority around evergreen finance searches and next-step comparison tools.",
    description: "Loan, mortgage, savings, and interest tools for everyday personal finance decisions and scenario planning.",
    useCases: ["Comparing borrowing costs", "Modeling savings growth", "Checking affordability and future value"],
    coreCalculatorSlugs: [
      "loan-payment-calculator",
      "mortgage-payment-calculator",
      "compound-interest-calculator",
      "savings-goal-calculator",
      "effective-annual-rate-calculator"
    ],
    featuredArticleSlugs: []
  }
];

export const seoArticles: SeoArticle[] = [
  makeArticle({
    title: "How to Calculate Profit Margin for Products and Services",
    slug: "how-to-calculate-profit-margin",
    primaryKeyword: "profit margin calculator",
    clusterSlug: "business-pricing-calculators",
    priority: "P1",
    contentType: "how-to article",
    relatedCalculatorSlug: "profit-margin-calculator",
    metaTitle: "How to Calculate Profit Margin + Free Margin Calculator | CalculatorMap",
    metaDescription: "Learn how to calculate profit margin with examples, formulas, and a free calculator for products and services.",
    intro: "Use this guide to understand profit margin, compare it with markup, and test pricing decisions against realistic revenue and cost assumptions.",
    outline: [
      "What profit margin means",
      "Gross vs operating vs net margin",
      "Profit margin formula",
      "Worked examples for products and services",
      "Common pricing mistakes",
      "When to use markup instead",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["profit-margin-calculator", "markup-calculator", "markup-vs-margin-calculator", "break-even-calculator", "pricing-calculator"]
  }),
  makeArticle({
    title: "Markup vs Margin: Formula, Examples, and Common Mistakes",
    slug: "markup-vs-margin-formula-examples",
    primaryKeyword: "markup vs margin calculator",
    clusterSlug: "business-pricing-calculators",
    priority: "P1",
    contentType: "comparison article",
    relatedCalculatorSlug: "markup-vs-margin-calculator",
    metaTitle: "Markup vs Margin: Formula, Differences, and Calculator | CalculatorMap",
    metaDescription: "Compare markup vs margin with simple formulas, examples, and a free calculator to avoid common pricing mistakes.",
    intro: "Markup and margin are close cousins that often get mixed up. This page shows how each one behaves and when using the wrong formula quietly damages pricing decisions.",
    outline: [
      "Definition of markup",
      "Definition of margin",
      "Key differences",
      "Formula comparison table",
      "Real business examples",
      "Common mistakes",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["markup-vs-margin-calculator", "markup-calculator", "profit-margin-calculator", "pricing-calculator"]
  }),
  makeArticle({
    title: "Break-Even Point Explained for New Businesses",
    slug: "break-even-point-explained",
    primaryKeyword: "break even calculator",
    clusterSlug: "business-pricing-calculators",
    priority: "P1",
    contentType: "explainer article",
    relatedCalculatorSlug: "break-even-calculator",
    metaTitle: "Break-Even Point Explained + Free Break-Even Calculator | CalculatorMap",
    metaDescription: "Learn the break-even point formula, how to calculate units and sales targets, and use a free break-even calculator.",
    intro: "Break-even is the checkpoint where pricing, fixed cost, and contribution margin finally line up. Use this guide to see why it matters before you commit to a launch or quote.",
    outline: [
      "What break-even means",
      "Fixed cost vs variable cost",
      "Break-even formula",
      "Units vs revenue break-even",
      "Example scenarios",
      "How profit targets change the math",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["break-even-calculator", "profit-margin-calculator", "pricing-calculator", "revenue-calculator"]
  }),
  makeArticle({
    title: "Freelance Pricing Calculator: How Much Should You Charge?",
    slug: "freelance-pricing-calculator-how-much-should-you-charge",
    primaryKeyword: "freelance rate calculator",
    clusterSlug: "salary-work-calculators",
    priority: "P1",
    contentType: "scenario article",
    relatedCalculatorSlug: "freelance-rate-calculator",
    metaTitle: "Freelance Rate Calculator: Set Your Hourly or Project Price | CalculatorMap",
    metaDescription: "Use this freelance rate calculator to estimate hourly and project pricing based on income goals, costs, and billable hours.",
    intro: "Freelance pricing gets easier when you stop guessing and start from income goals, business costs, taxes, and real billable hours.",
    outline: [
      "Why freelance pricing is hard",
      "Hourly vs project pricing",
      "Income goal method",
      "Billable hours method",
      "Expense and tax adjustments",
      "Example pricing scenarios",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["freelance-rate-calculator", "hourly-to-salary-calculator", "take-home-pay-calculator", "commission-calculator"]
  }),
  makeArticle({
    title: "Hourly to Salary: Convert Your Pay by Week, Month, and Year",
    slug: "hourly-to-salary-convert-your-pay",
    primaryKeyword: "hourly to salary calculator",
    clusterSlug: "salary-work-calculators",
    priority: "P1",
    contentType: "how-to article",
    relatedCalculatorSlug: "hourly-to-salary-calculator",
    metaTitle: "Hourly to Salary Calculator: Weekly, Monthly, and Annual Pay | CalculatorMap",
    metaDescription: "Convert hourly pay to weekly, monthly, and annual salary with formulas, examples, and a free calculator.",
    intro: "This guide shows the standard hourly-to-salary conversion and the places where overtime, schedule changes, and unpaid time can distort the headline number.",
    outline: [
      "Basic hourly to salary formula",
      "Weekly, monthly, yearly conversions",
      "Full-time vs part-time examples",
      "Including overtime",
      "Before-tax vs after-tax pay",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["hourly-to-salary-calculator", "overtime-calculator", "take-home-pay-calculator", "commission-calculator"]
  }),
  makeArticle({
    title: "Commission Structures Explained: Flat, Tiered, and Revenue-Based",
    slug: "commission-structures-explained",
    primaryKeyword: "commission calculator",
    clusterSlug: "salary-work-calculators",
    priority: "P1",
    contentType: "comparison article",
    relatedCalculatorSlug: "commission-calculator",
    metaTitle: "Commission Calculator Guide: Flat, Tiered, and Revenue-Based | CalculatorMap",
    metaDescription: "Compare commission structures with formulas, examples, and a free calculator for flat, tiered, and revenue-based plans.",
    intro: "Commission plans look simple until you compare flat, blended, and threshold-based payouts. This guide helps you spot how the structure changes incentive and total pay.",
    outline: [
      "What commission is",
      "Flat commission model",
      "Tiered commission model",
      "Revenue-based commission model",
      "Example payout scenarios",
      "Which model fits which sales team",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["commission-calculator", "hourly-to-salary-calculator", "take-home-pay-calculator", "profit-margin-calculator"]
  }),
  makeArticle({
    title: "ROAS Calculator Guide: What Is a Good Return on Ad Spend?",
    slug: "roas-calculator-guide",
    primaryKeyword: "roas calculator",
    clusterSlug: "marketing-ecommerce-calculators",
    priority: "P1",
    contentType: "how-to article",
    relatedCalculatorSlug: "roas-calculator",
    metaTitle: "ROAS Calculator: Formula, Benchmarks, and Examples | CalculatorMap",
    metaDescription: "Use this ROAS calculator to measure return on ad spend, compare campaigns, and understand what counts as good ROAS.",
    intro: "ROAS becomes more useful when you tie the ratio back to margin, fixed cost, and channel differences instead of reading it as a standalone score.",
    outline: [
      "What ROAS means",
      "ROAS formula",
      "ROAS vs ROI",
      "What is a good ROAS",
      "Example campaign calculations",
      "How to improve ROAS",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["roas-calculator", "roi-calculator", "cpc-calculator", "cpm-calculator", "shopify-profit-calculator"]
  }),
  makeArticle({
    title: "CPM vs CPC vs CPA: Which Metric Matters Most?",
    slug: "cpm-vs-cpc-vs-cpa",
    primaryKeyword: "cpm vs cpc",
    clusterSlug: "marketing-ecommerce-calculators",
    priority: "P1",
    contentType: "comparison article",
    relatedCalculatorSlug: "cpm-calculator",
    metaTitle: "CPM vs CPC vs CPA: Differences, Formulas, and Calculator | CalculatorMap",
    metaDescription: "Compare CPM, CPC, and CPA with formulas, examples, and calculators to choose the right ad metric for your campaigns.",
    intro: "CPM, CPC, and CPA each answer a different performance question. This guide helps you pick the one that actually matches the stage of your campaign.",
    outline: [
      "What CPM means",
      "What CPC means",
      "What CPA means",
      "When each metric matters",
      "Formula examples",
      "Common reporting mistakes",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["cpm-calculator", "cpc-calculator", "roi-calculator", "roas-calculator"]
  }),
  makeArticle({
    title: "Etsy Fee Calculator: Estimate Real Profit After Marketplace Costs",
    slug: "etsy-fee-calculator-real-profit",
    primaryKeyword: "etsy fee calculator",
    clusterSlug: "marketing-ecommerce-calculators",
    priority: "P1",
    contentType: "scenario article",
    relatedCalculatorSlug: "etsy-fee-calculator",
    metaTitle: "Etsy Fee Calculator: Estimate Fees, Shipping, and Profit | CalculatorMap",
    metaDescription: "Calculate Etsy fees, shipping costs, and real profit with this Etsy fee calculator and seller-friendly breakdown.",
    intro: "Marketplace profit disappears fast when fees, shipping, and ads stack together. This guide breaks down what to count before you decide a product is profitable.",
    outline: [
      "Main Etsy fees explained",
      "How shipping changes profit",
      "How ads change margin",
      "Worked example for one product",
      "Break-even price planning",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["etsy-fee-calculator", "shopify-profit-calculator", "shipping-cost-comparison-calculator", "profit-margin-calculator"]
  }),
  makeArticle({
    title: "Shopify Profit Calculator: Product Cost, Shipping, and Ad Spend",
    slug: "shopify-profit-calculator-product-cost-shipping-ad-spend",
    primaryKeyword: "shopify profit calculator",
    clusterSlug: "marketing-ecommerce-calculators",
    priority: "P1",
    contentType: "scenario article",
    relatedCalculatorSlug: "shopify-profit-calculator",
    metaTitle: "Shopify Profit Calculator: Fees, Shipping, Ads, and Margin | CalculatorMap",
    metaDescription: "Use this Shopify profit calculator to estimate margin after product cost, payment fees, shipping, and ad spend.",
    intro: "Shopify profit is usually a chain of small costs rather than one big fee. This page helps you model the stack clearly and see which levers matter most.",
    outline: [
      "Shopify cost components",
      "Payment processing fees",
      "Shipping and fulfillment",
      "Ad spend impact on profit",
      "Example store scenario",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["shopify-profit-calculator", "roas-calculator", "profit-margin-calculator", "etsy-fee-calculator"]
  }),
  makeArticle({
    title: "Concrete Cost Calculator: How Many Bags or Yards Do You Need?",
    slug: "concrete-cost-calculator-bags-or-yards",
    primaryKeyword: "concrete cost calculator",
    clusterSlug: "home-improvement-cost-calculators",
    priority: "P1",
    contentType: "how-to article",
    relatedCalculatorSlug: "concrete-cost-calculator",
    metaTitle: "Concrete Cost Calculator: Bags, Yards, and Project Estimate | CalculatorMap",
    metaDescription: "Estimate concrete quantity and project cost by bags or cubic yards with waste factor examples and a free calculator.",
    intro: "Concrete planning gets easier when you convert area and depth into volume before you compare bag counts, yards, and supplier pricing.",
    outline: [
      "Bag vs yard measurement",
      "Concrete volume formula",
      "Waste factor basics",
      "Cost estimate examples",
      "Driveway and slab scenarios",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["concrete-cost-calculator", "square-footage-calculator", "flooring-calculator", "tile-area-calculator"]
  }),
  makeArticle({
    title: "Paint Calculator by Room Size: Walls, Ceiling, and Waste Factor",
    slug: "paint-calculator-by-room-size",
    primaryKeyword: "paint calculator",
    clusterSlug: "home-improvement-cost-calculators",
    priority: "P1",
    contentType: "how-to article",
    relatedCalculatorSlug: "paint-calculator",
    metaTitle: "Paint Calculator by Room Size: Coverage, Coats, and Waste | CalculatorMap",
    metaDescription: "Find out how much paint you need by room size, wall area, coats, and waste factor with a free calculator.",
    intro: "Paint estimates go wrong when room area, coats, and waste are handled separately. This guide shows how to combine them into one coverage check.",
    outline: [
      "How paint coverage works",
      "Room size to wall area",
      "Doors and windows adjustment",
      "Single coat vs multiple coats",
      "Example room calculations",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["paint-calculator", "square-footage-calculator", "flooring-calculator", "tile-area-calculator"]
  }),
  makeArticle({
    title: "Gravel Calculator With Cost Estimate for Driveways and Landscaping",
    slug: "gravel-calculator-with-cost-estimate",
    primaryKeyword: "gravel calculator",
    clusterSlug: "home-improvement-cost-calculators",
    priority: "P1",
    contentType: "scenario article",
    relatedCalculatorSlug: "gravel-calculator",
    metaTitle: "Gravel Calculator With Cost Estimate for Driveways and Yards | CalculatorMap",
    metaDescription: "Estimate gravel volume and project cost for driveways, paths, and landscaping with a free calculator and examples.",
    intro: "Gravel jobs usually fail on depth assumptions, density, or overbuying. This guide helps you convert measurements into tonnage and cost with fewer surprises.",
    outline: [
      "Gravel area and depth basics",
      "Volume calculation",
      "Weight and tonnage estimate",
      "Cost estimate examples",
      "Driveway vs landscaping differences",
      "FAQ"
    ],
    relatedCalculatorSlugs: ["gravel-calculator", "square-footage-calculator", "concrete-cost-calculator", "flooring-calculator"]
  })
];

export function getSeoCluster(slug: string) {
  return seoClusters.find((cluster) => cluster.slug === slug);
}

export function getSeoArticle(slug: string) {
  return seoArticles.find((article) => article.slug === slug);
}

export function getArticlesForCluster(clusterSlug: string) {
  return seoArticles.filter((article) => article.clusterSlug === clusterSlug);
}

export function getArticlesForCalculator(calculatorSlug: string) {
  return seoArticles.filter(
    (article) =>
      article.relatedCalculatorSlug === calculatorSlug || article.relatedCalculatorSlugs.includes(calculatorSlug)
  );
}
