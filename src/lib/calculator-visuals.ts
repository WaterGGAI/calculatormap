import type { CalculatorCategory } from "@/lib/calculators/types";

export type CalculatorVisualMotif =
  | "calendar"
  | "circuit"
  | "converter"
  | "counter"
  | "equation"
  | "finance"
  | "focus"
  | "health"
  | "home"
  | "route"
  | "scoreboard"
  | "timer"
  | "writing"
  | "choice";

export type CalculatorVisualTheme = {
  code: string;
  eyebrow: string;
  statement: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  imagePositionClass: string;
  motif: CalculatorVisualMotif;
  panelClass: string;
  overlayClass: string;
  accentTextClass: string;
  chipClass: string;
  sealClass: string;
  sealInnerClass: string;
  sealLabelClass: string;
  tileClass: string;
  tileSealClass: string;
  sectionSealClass: string;
};

const workspacePhoto = "https://images.pexels.com/photos/14508540/pexels-photo-14508540.jpeg?cs=srgb&dl=pexels-micklejandro-14508540.jpg&fm=jpg";
const fitnessPhoto = "https://images.pexels.com/photos/8155156/pexels-photo-8155156.jpeg?cs=srgb&dl=pexels-alesiakozik-8155156.jpg&fm=jpg";
const homePhoto = "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?cs=srgb&dl=pexels-jeshoots-com-147458-834892.jpg&fm=jpg";
const calculatorPhoto = "https://images.pexels.com/photos/8250947/pexels-photo-8250947.jpeg?cs=srgb&dl=pexels-pnw-prod-8250947.jpg&fm=jpg";

const neutralTone = {
  chipClass: "border-white/12 bg-white/10 text-white",
  sealClass: "border-white/18 bg-white/12 text-white",
  sealInnerClass: "border-white/10",
  sealLabelClass: "text-white",
  tileClass: "border-[#d8dfda] bg-white",
  tileSealClass: "border-[#cfe2db] bg-[#eef7f3] text-[#0d6359]",
  sectionSealClass: "border-[#cfe2db] bg-[#eef7f3] text-[#0d6359]"
};

const defaultVisualTheme: CalculatorVisualTheme = {
  code: "CM",
  eyebrow: "CalculatorMap workspace",
  statement: "Clean inputs, clear outputs, and enough context to act on the result.",
  tags: ["fast input", "clear output", "practical use"],
  imageUrl: workspacePhoto,
  imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
  imagePositionClass: "object-center",
  motif: "counter",
  panelClass: "border-[#cfddd7] bg-[#eef5f2]",
  overlayClass: "bg-[linear-gradient(90deg,rgba(8,19,16,0.74),rgba(8,19,16,0.38),rgba(8,19,16,0.12))]",
  accentTextClass: "text-[#e4d08c]",
  ...neutralTone
};

const visualThemesByCategory: Record<string, CalculatorVisualTheme> = {
  health: {
    code: "HLT",
    eyebrow: "Health and wellness",
    statement: "Built for quick health checks, training estimates, and everyday progress tracking.",
    tags: ["fitness", "wellness", "daily tracking"],
    imageUrl: fitnessPhoto,
    imageAlt: "Fitness clipboard with dumbbells, apples, and a water bottle on a soft peach surface.",
    imagePositionClass: "object-center",
    motif: "health",
    panelClass: "border-[#e8d5ca] bg-[#fff3ec]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(57,23,18,0.72),rgba(57,23,18,0.35),rgba(57,23,18,0.08))]",
    accentTextClass: "text-[#ffd2ad]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#ffd5bf] bg-[#fff4eb] text-[#6d3d19]",
    sealInnerClass: "border-[#f3decf]",
    sealLabelClass: "text-[#6d3d19]",
    tileClass: "border-[#eadbd4] bg-[#fffaf6]",
    tileSealClass: "border-[#ffd5bf] bg-[#fff1e8] text-[#8a4c1e]",
    sectionSealClass: "border-[#ffd5bf] bg-[#fff1e8] text-[#8a4c1e]"
  },
  sports: {
    code: "SPT",
    eyebrow: "Sports and training",
    statement: "Fast checks for performance, pace, and training-day numbers that need to stay legible at a glance.",
    tags: ["pace", "stats", "training"],
    imageUrl: fitnessPhoto,
    imageAlt: "Fitness clipboard with dumbbells, apples, and a water bottle on a soft peach surface.",
    imagePositionClass: "object-center",
    motif: "scoreboard",
    panelClass: "border-[#d5e4d4] bg-[#f0f8ef]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(17,47,30,0.76),rgba(17,47,30,0.38),rgba(17,47,30,0.08))]",
    accentTextClass: "text-[#bde7a7]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#c7e8b8] bg-[#f1ffec] text-[#2f6f24]",
    sealInnerClass: "border-[#e0f1d9]",
    sealLabelClass: "text-[#2f6f24]",
    tileClass: "border-[#d6e8d2] bg-[#f8fff6]",
    tileSealClass: "border-[#c7e8b8] bg-[#f1ffec] text-[#2f6f24]",
    sectionSealClass: "border-[#c7e8b8] bg-[#f1ffec] text-[#2f6f24]"
  },
  lifestyle: {
    code: "LFE",
    eyebrow: "Lifestyle planning",
    statement: "Lightweight tools for habits, routines, and personal planning that should feel quick, visual, and easy to revisit.",
    tags: ["habits", "choices", "personal planning"],
    imageUrl: fitnessPhoto,
    imageAlt: "Fitness clipboard with dumbbells, apples, and a water bottle on a soft peach surface.",
    imagePositionClass: "object-center",
    motif: "choice",
    panelClass: "border-[#e7d9cd] bg-[#fbf2ea]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(47,31,20,0.74),rgba(47,31,20,0.36),rgba(47,31,20,0.08))]",
    accentTextClass: "text-[#f1d19f]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#f0dbc6] bg-[#fff6ef] text-[#714921]",
    sealInnerClass: "border-[#f2e3d5]",
    sealLabelClass: "text-[#714921]",
    tileClass: "border-[#e8ddd2] bg-[#fffaf5]",
    tileSealClass: "border-[#f0dbc6] bg-[#fff6ef] text-[#714921]",
    sectionSealClass: "border-[#f0dbc6] bg-[#fff6ef] text-[#714921]"
  },
  "home-family": {
    code: "HOM",
    eyebrow: "Home and project planning",
    statement: "Estimate material, room, and household numbers with a page that feels more like a work surface than a text wall.",
    tags: ["household", "project cost", "planning"],
    imageUrl: homePhoto,
    imageAlt: "Blueprint, drill, and measuring tape arranged on a wooden table.",
    imagePositionClass: "object-center",
    motif: "home",
    panelClass: "border-[#ded8cf] bg-[#f6f1ea]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(39,27,17,0.76),rgba(39,27,17,0.38),rgba(39,27,17,0.08))]",
    accentTextClass: "text-[#efd69e]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#f0dbc6] bg-[#fff6ef] text-[#714921]",
    sealInnerClass: "border-[#f2e3d5]",
    sealLabelClass: "text-[#714921]",
    tileClass: "border-[#e1dad0] bg-[#fffdf9]",
    tileSealClass: "border-[#ead7bf] bg-[#fff6ec] text-[#76532c]",
    sectionSealClass: "border-[#ead7bf] bg-[#fff6ec] text-[#76532c]"
  },
  "transit-mobility": {
    code: "TRV",
    eyebrow: "Transit and mobility",
    statement: "Distance, fuel, and route planning tools should feel fast and directional, not buried under prose.",
    tags: ["route math", "fuel", "travel"],
    imageUrl: workspacePhoto,
    imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
    imagePositionClass: "object-[50%_58%]",
    motif: "route",
    panelClass: "border-[#cfe0da] bg-[#eef7f4]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(9,34,31,0.78),rgba(9,34,31,0.4),rgba(9,34,31,0.1))]",
    accentTextClass: "text-[#97e2d7]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#bce8df] bg-[#edfffb] text-[#0a665f]",
    sealInnerClass: "border-[#d9f6f1]",
    sealLabelClass: "text-[#0a665f]",
    tileClass: "border-[#d1e2dd] bg-[#f7fffc]",
    tileSealClass: "border-[#bce8df] bg-[#edfffb] text-[#0a665f]",
    sectionSealClass: "border-[#bce8df] bg-[#edfffb] text-[#0a665f]"
  },
  finance: {
    code: "FIN",
    eyebrow: "Finance and pricing",
    statement: "Use these calculators to move from rough assumptions to usable payment, savings, and pricing decisions.",
    tags: ["payments", "savings", "pricing"],
    imageUrl: workspacePhoto,
    imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
    imagePositionClass: "object-center",
    motif: "finance",
    panelClass: "border-[#cfddd7] bg-[#eef5f2]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(8,19,16,0.76),rgba(8,19,16,0.39),rgba(8,19,16,0.12))]",
    accentTextClass: "text-[#e4d08c]",
    ...neutralTone
  },
  "date-time": {
    code: "DTE",
    eyebrow: "Date and time planning",
    statement: "Elapsed time, schedules, and planning tools should feel tidy and immediate, with less copy and better scanning.",
    tags: ["dates", "duration", "planning"],
    imageUrl: workspacePhoto,
    imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
    imagePositionClass: "object-[45%_50%]",
    motif: "calendar",
    panelClass: "border-[#d9dcdf] bg-[#f3f6f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(22,30,36,0.78),rgba(22,30,36,0.4),rgba(22,30,36,0.1))]",
    accentTextClass: "text-[#b9d4e3]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#d7e8ef] bg-[#f4fbff] text-[#315b6a]",
    sealInnerClass: "border-[#e6f0f4]",
    sealLabelClass: "text-[#315b6a]",
    tileClass: "border-[#d9e2e7] bg-[#fbfdff]",
    tileSealClass: "border-[#d7e8ef] bg-[#f4fbff] text-[#315b6a]",
    sectionSealClass: "border-[#d7e8ef] bg-[#f4fbff] text-[#315b6a]"
  },
  "time-tools": {
    code: "TIM",
    eyebrow: "Time tools",
    statement: "Timers and cycle tools need fast interaction, clean state, and visual hierarchy that does the orienting work for you.",
    tags: ["timers", "cycles", "schedules"],
    imageUrl: workspacePhoto,
    imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
    imagePositionClass: "object-[45%_50%]",
    motif: "timer",
    panelClass: "border-[#d9dcdf] bg-[#f3f6f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(22,30,36,0.78),rgba(22,30,36,0.4),rgba(22,30,36,0.1))]",
    accentTextClass: "text-[#b9d4e3]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#d7e8ef] bg-[#f4fbff] text-[#315b6a]",
    sealInnerClass: "border-[#e6f0f4]",
    sealLabelClass: "text-[#315b6a]",
    tileClass: "border-[#d9e2e7] bg-[#fbfdff]",
    tileSealClass: "border-[#d7e8ef] bg-[#f4fbff] text-[#315b6a]",
    sectionSealClass: "border-[#d7e8ef] bg-[#f4fbff] text-[#315b6a]"
  },
  "text-tools": {
    code: "TXT",
    eyebrow: "Text utilities",
    statement: "Writers and editors should get a compact working surface with faster scanning and less visual dead air.",
    tags: ["text counts", "cleanup", "editing"],
    imageUrl: calculatorPhoto,
    imageAlt: "Calculator next to a spiral notebook and pen.",
    imagePositionClass: "object-center",
    motif: "writing",
    panelClass: "border-[#d8d8df] bg-[#f3f4f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(16,23,35,0.78),rgba(16,23,35,0.42),rgba(16,23,35,0.12))]",
    accentTextClass: "text-[#d7ddf0]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#d9dce6] bg-[#fdfdff] text-[#2c3242]",
    sealInnerClass: "border-[#edf0f6]",
    sealLabelClass: "text-[#2c3242]",
    tileClass: "border-[#dedee6] bg-[#fdfdff]",
    tileSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]",
    sectionSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]"
  },
  tech: {
    code: "TEC",
    eyebrow: "Tech setup",
    statement: "Device and screen tools work better when the page feels like a compact control surface, not a generic article.",
    tags: ["devices", "screen math", "power"],
    imageUrl: workspacePhoto,
    imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
    imagePositionClass: "object-center",
    motif: "circuit",
    panelClass: "border-[#cfe0da] bg-[#eef7f4]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(8,27,29,0.78),rgba(8,27,29,0.4),rgba(8,27,29,0.12))]",
    accentTextClass: "text-[#9ed8f0]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#bfdee8] bg-[#f1fbff] text-[#1f596b]",
    sealInnerClass: "border-[#dff1f6]",
    sealLabelClass: "text-[#1f596b]",
    tileClass: "border-[#d3e2e4] bg-[#f8feff]",
    tileSealClass: "border-[#bfdee8] bg-[#f1fbff] text-[#1f596b]",
    sectionSealClass: "border-[#bfdee8] bg-[#f1fbff] text-[#1f596b]"
  },
  "media-tools": {
    code: "MED",
    eyebrow: "Media workflows",
    statement: "Creator tools need a little atmosphere, but the hierarchy still has to stay operational and quick to scan.",
    tags: ["creator tools", "production", "media math"],
    imageUrl: workspacePhoto,
    imageAlt: "Laptop and notebook on a desk with sunlight and soft shadows.",
    imagePositionClass: "object-center",
    motif: "focus",
    panelClass: "border-[#d8d8df] bg-[#f3f4f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(24,24,32,0.78),rgba(24,24,32,0.42),rgba(24,24,32,0.12))]",
    accentTextClass: "text-[#ddd6ff]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#dad6ee] bg-[#fbf9ff] text-[#51486f]",
    sealInnerClass: "border-[#ece9f6]",
    sealLabelClass: "text-[#51486f]",
    tileClass: "border-[#dfddea] bg-[#fffefe]",
    tileSealClass: "border-[#dad6ee] bg-[#fbf9ff] text-[#51486f]",
    sectionSealClass: "border-[#dad6ee] bg-[#fbf9ff] text-[#51486f]"
  },
  math: {
    code: "MAT",
    eyebrow: "Calculation and comparison",
    statement: "Math tools should feel precise and visual, with the important parts broken into quick, readable pieces.",
    tags: ["equations", "comparison", "daily math"],
    imageUrl: calculatorPhoto,
    imageAlt: "Calculator next to a spiral notebook and pen.",
    imagePositionClass: "object-center",
    motif: "equation",
    panelClass: "border-[#d8d8df] bg-[#f3f4f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(16,23,35,0.78),rgba(16,23,35,0.42),rgba(16,23,35,0.12))]",
    accentTextClass: "text-[#d7ddf0]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#d9dce6] bg-[#fdfdff] text-[#2c3242]",
    sealInnerClass: "border-[#edf0f6]",
    sealLabelClass: "text-[#2c3242]",
    tileClass: "border-[#dedee6] bg-[#fdfdff]",
    tileSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]",
    sectionSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]"
  },
  conversion: {
    code: "CVT",
    eyebrow: "Units and conversion",
    statement: "Conversion tools should be visual and immediate, so users can move from one unit to the next without hunting through copy.",
    tags: ["units", "precision", "quick lookup"],
    imageUrl: calculatorPhoto,
    imageAlt: "Calculator next to a spiral notebook and pen.",
    imagePositionClass: "object-center",
    motif: "converter",
    panelClass: "border-[#d8d8df] bg-[#f3f4f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(16,23,35,0.78),rgba(16,23,35,0.42),rgba(16,23,35,0.12))]",
    accentTextClass: "text-[#d7ddf0]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#d9dce6] bg-[#fdfdff] text-[#2c3242]",
    sealInnerClass: "border-[#edf0f6]",
    sealLabelClass: "text-[#2c3242]",
    tileClass: "border-[#dedee6] bg-[#fdfdff]",
    tileSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]",
    sectionSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]"
  },
  "core-tools": {
    code: "TOL",
    eyebrow: "Core tools",
    statement: "General utility pages need just enough structure and visual rhythm to feel purposeful instead of generic.",
    tags: ["utility", "speed", "repeat use"],
    imageUrl: calculatorPhoto,
    imageAlt: "Calculator next to a spiral notebook and pen.",
    imagePositionClass: "object-center",
    motif: "counter",
    panelClass: "border-[#d8d8df] bg-[#f3f4f8]",
    overlayClass: "bg-[linear-gradient(90deg,rgba(16,23,35,0.78),rgba(16,23,35,0.42),rgba(16,23,35,0.12))]",
    accentTextClass: "text-[#d7ddf0]",
    chipClass: "border-white/14 bg-white/12 text-white",
    sealClass: "border-[#d9dce6] bg-[#fdfdff] text-[#2c3242]",
    sealInnerClass: "border-[#edf0f6]",
    sealLabelClass: "text-[#2c3242]",
    tileClass: "border-[#dedee6] bg-[#fdfdff]",
    tileSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]",
    sectionSealClass: "border-[#d9dce6] bg-[#f7f8fd] text-[#2c3242]"
  }
};

export function getCalculatorVisualTheme(category: CalculatorCategory | null | undefined) {
  if (!category) {
    return defaultVisualTheme;
  }

  return visualThemesByCategory[category.slug] ?? defaultVisualTheme;
}
