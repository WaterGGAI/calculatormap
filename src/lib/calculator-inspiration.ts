export type CalculatorInspirationStage = "live" | "formula-ready" | "needs-rules" | "interactive-tool";

export type CalculatorInspirationCandidate = {
  name: string;
  category: string;
  stage: CalculatorInspirationStage;
  sourceUrl: string;
  liveSlug?: string;
};

export const calculatorInspirationSource = {
  name: "Calculator Pro public list",
  url: "https://calculator.0123456789.tw/",
  sourceSiteUrl: "https://0123456789.tw/#gsc.tab=0",
  claimedCount: 120,
  extractedCount: 120,
  usageNote:
    "Use these as topic and formula research only. Rebuild labels, copy, formulas, UI, and code in our own implementation."
};

export const calculatorInspirationCandidates: CalculatorInspirationCandidate[] = [
  {
    name: "Taiwan Taxi Fare Calculator",
    category: "Transit & Mobility",
    stage: "needs-rules",
    sourceUrl: "https://taxi.0123456789.tw/"
  },
  {
    name: "Hong Kong Taxi Fare Calculator",
    category: "Transit & Mobility",
    stage: "needs-rules",
    sourceUrl: "https://taxi.0123456789.tw/hk/"
  },
  {
    name: "Basic Calculator",
    category: "Core Tools",
    stage: "interactive-tool",
    sourceUrl: "https://simple.0123456789.tw"
  },
  {
    name: "One-Line Expression Calculator",
    category: "Core Tools",
    stage: "interactive-tool",
    sourceUrl: "https://calculator.0123456789.tw/one/"
  },
  {
    name: "Calculation Notebook",
    category: "Core Tools",
    stage: "interactive-tool",
    sourceUrl: "https://record.0123456789.tw"
  },
  {
    name: "Engineering Calculator",
    category: "Core Tools",
    stage: "interactive-tool",
    sourceUrl: "https://science.0123456789.tw"
  },
  {
    name: "Scientific Calculator With History",
    category: "Core Tools",
    stage: "interactive-tool",
    sourceUrl: "https://s.0123456789.tw"
  },
  {
    name: "Tax-Inclusive Price Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://tax.0123456789.tw"
  },
  {
    name: "Number Base Converter",
    category: "Conversion",
    stage: "formula-ready",
    sourceUrl: "https://dec.0123456789.tw"
  },
  {
    name: "Profit Margin Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://profit.0123456789.tw/"
  },
  {
    name: "Cycle Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://mc.0123456789.tw"
  },
  {
    name: "Cycle-Based Fitness Planner",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://mc.0123456789.tw/body28.php"
  },
  {
    name: "Cycle-Based Wellness Planner",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://mc.0123456789.tw/cup28.php"
  },
  {
    name: "Mood Check Tool",
    category: "Lifestyle",
    stage: "interactive-tool",
    sourceUrl: "https://mc.0123456789.tw/mchappy.php"
  },
  {
    name: "Pregnancy Date Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://266.0123456789.tw"
  },
  {
    name: "Pregnancy Weight Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://266wg.0123456789.tw"
  },
  {
    name: "Conception Date Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://born.0123456789.tw/"
  },
  {
    name: "Baby Age In Days Calculator",
    category: "Date & Time",
    stage: "formula-ready",
    sourceUrl: "https://ymd.0123456789.tw/"
  },
  {
    name: "Premature Baby Corrected Age Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://0123456789.tw/preemie/"
  },
  {
    name: "28-Day Cycle Care Planner",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://mc28.0123456789.tw"
  },
  {
    name: "Body Shape Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://girl.0123456789.tw/"
  },
  {
    name: "Baby Formula Temperature Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://milk.0123456789.tw/"
  },
  {
    name: "Public Holiday Calendar",
    category: "Date & Time",
    stage: "needs-rules",
    sourceUrl: "https://net.0123456789.tw"
  },
  {
    name: "Insurance Age Calculator",
    category: "Date & Time",
    stage: "needs-rules",
    sourceUrl: "https://0123456789.tw/iage/"
  },
  {
    name: "Date Add/Subtract Calculator",
    category: "Date & Time",
    stage: "formula-ready",
    sourceUrl: "https://dayplus.0123456789.tw/"
  },
  {
    name: "Days Between Dates Calculator",
    category: "Date & Time",
    stage: "live",
    sourceUrl: "https://daybetween.0123456789.tw/",
    liveSlug: "date-difference-calculator"
  },
  {
    name: "Time Difference Calculator",
    category: "Date & Time",
    stage: "live",
    sourceUrl: "https://timediff.0123456789.tw/",
    liveSlug: "time-duration-calculator"
  },
  {
    name: "Workday Calculator",
    category: "Date & Time",
    stage: "needs-rules",
    sourceUrl: "https://workday.0123456789.tw/"
  },
  {
    name: "Day Counter",
    category: "Date & Time",
    stage: "formula-ready",
    sourceUrl: "https://days.0123456789.tw/"
  },
  {
    name: "Kids Timer",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://0123456789.tw/kidsclock/"
  },
  {
    name: "Height Match Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://cm.0123456789.tw"
  },
  {
    name: "BMI And Adjusted Body Weight Calculator",
    category: "Health",
    stage: "live",
    sourceUrl: "https://bmi.0123456789.tw",
    liveSlug: "bmi-calculator"
  },
  {
    name: "BMI Category Calculator",
    category: "Health",
    stage: "live",
    sourceUrl: "https://newbmi.0123456789.tw",
    liveSlug: "bmi-calculator"
  },
  {
    name: "Weight Loss Planning Calculator",
    category: "Health",
    stage: "live",
    sourceUrl: "https://bmibmr.0123456789.tw",
    liveSlug: "calorie-calculator"
  },
  {
    name: "Target Heart Rate Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://heartbeat.0123456789.tw"
  },
  {
    name: "Exercise Calories Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://met.0123456789.tw"
  },
  {
    name: "Unit Converter",
    category: "Conversion",
    stage: "live",
    sourceUrl: "https://unit.0123456789.tw",
    liveSlug: "length-converter"
  },
  {
    name: "Shoe Size Converter",
    category: "Conversion",
    stage: "formula-ready",
    sourceUrl: "https://shoes.0123456789.tw/"
  },
  {
    name: "Currency Converter",
    category: "Finance & Shopping",
    stage: "needs-rules",
    sourceUrl: "https://money.0123456789.tw/"
  },
  {
    name: "Travel Exchange Rate Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/JP/"
  },
  {
    name: "TV Viewing Distance Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://tv.0123456789.tw/"
  },
  {
    name: "Color Count Tool",
    category: "Media Tools",
    stage: "interactive-tool",
    sourceUrl: "https://color.0123456789.tw/"
  },
  {
    name: "Screen PPI Calculator",
    category: "Tech",
    stage: "formula-ready",
    sourceUrl: "https://ppi.0123456789.tw/"
  },
  {
    name: "Daily Calorie Needs Calculator",
    category: "Health",
    stage: "live",
    sourceUrl: "https://daycal.0123456789.tw",
    liveSlug: "calorie-calculator"
  },
  {
    name: "PPM Concentration Converter",
    category: "Conversion",
    stage: "formula-ready",
    sourceUrl: "https://calculator.0123456789.tw/ppm/"
  },
  {
    name: "Traditional/Simplified Chinese Converter",
    category: "Text Tools",
    stage: "interactive-tool",
    sourceUrl: "https://calculator.0123456789.tw/cntw/"
  },
  {
    name: "Celsius/Fahrenheit Converter",
    category: "Conversion",
    stage: "live",
    sourceUrl: "https://fc.0123456789.tw/",
    liveSlug: "temperature-converter"
  },
  {
    name: "Fuel Economy Calculator",
    category: "Transit & Mobility",
    stage: "live",
    sourceUrl: "https://oil.0123456789.tw",
    liveSlug: "fuel-cost-calculator"
  },
  {
    name: "Time Speed Distance Calculator",
    category: "Transit & Mobility",
    stage: "formula-ready",
    sourceUrl: "https://timespeed.0123456789.tw"
  },
  {
    name: "Car Loan Calculator",
    category: "Finance & Shopping",
    stage: "live",
    sourceUrl: "https://carloan.0123456789.tw",
    liveSlug: "loan-payment-calculator"
  },
  {
    name: "Gear Ratio RPM Calculator",
    category: "Transit & Mobility",
    stage: "formula-ready",
    sourceUrl: "https://carturn.0123456789.tw"
  },
  {
    name: "Tire Size Upgrade Calculator",
    category: "Transit & Mobility",
    stage: "formula-ready",
    sourceUrl: "https://tire.0123456789.tw"
  },
  {
    name: "Fuel Price Change Calculator",
    category: "Transit & Mobility",
    stage: "formula-ready",
    sourceUrl: "https://oilup.0123456789.tw"
  },
  {
    name: "Age Calculator",
    category: "Date & Time",
    stage: "live",
    sourceUrl: "https://age.0123456789.tw",
    liveSlug: "age-calculator"
  },
  {
    name: "Electricity Bill Calculator",
    category: "Home & Family",
    stage: "needs-rules",
    sourceUrl: "https://elec.0123456789.tw"
  },
  {
    name: "Word Count Tool",
    category: "Text Tools",
    stage: "interactive-tool",
    sourceUrl: "https://word.0123456789.tw/"
  },
  {
    name: "Air Conditioner BTU Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://btu.0123456789.tw/"
  },
  {
    name: "Air Conditioner Electricity Cost Calculator",
    category: "Home & Family",
    stage: "needs-rules",
    sourceUrl: "https://airelec.0123456789.tw/"
  },
  {
    name: "Golden Ratio Calculator",
    category: "Math",
    stage: "formula-ready",
    sourceUrl: "https://169.0123456789.tw"
  },
  {
    name: "Credit Card Debt Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://card.0123456789.tw"
  },
  {
    name: "Car Purchase Budget Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://carbuy.0123456789.tw"
  },
  {
    name: "Savings Calculator",
    category: "Finance & Shopping",
    stage: "live",
    sourceUrl: "https://save.0123456789.tw",
    liveSlug: "savings-goal-calculator"
  },
  {
    name: "Weekly Savings Challenge Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://weekmoney.0123456789.tw/"
  },
  {
    name: "Bicycle Gear Calculator",
    category: "Transit & Mobility",
    stage: "formula-ready",
    sourceUrl: "https://bicycle.0123456789.tw"
  },
  {
    name: "Random Draw Tool",
    category: "Lifestyle",
    stage: "interactive-tool",
    sourceUrl: "https://lotto.0123456789.tw"
  },
  {
    name: "Map Distance Calculator",
    category: "Transit & Mobility",
    stage: "needs-rules",
    sourceUrl: "https://maps.0123456789.tw/"
  },
  {
    name: "Aquarium Volume Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://fish.0123456789.tw/"
  },
  {
    name: "Water Intake Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://water.0123456789.tw/"
  },
  {
    name: "Cup Volume Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://calculator.0123456789.tw/cup.php"
  },
  {
    name: "Waist-To-Hip Ratio Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://hip.0123456789.tw/"
  },
  {
    name: "Mortgage Payment Calculator",
    category: "Finance & Shopping",
    stage: "live",
    sourceUrl: "https://loan3year.0123456789.tw/",
    liveSlug: "mortgage-calculator"
  },
  {
    name: "Total Mortgage Cost Calculator",
    category: "Finance & Shopping",
    stage: "live",
    sourceUrl: "https://loan.0123456789.tw/",
    liveSlug: "mortgage-calculator"
  },
  {
    name: "Mortgage Refinance Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://loanfw.0123456789.tw/"
  },
  {
    name: "Mortgage Grace Period Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://loanback.0123456789.tw/"
  },
  {
    name: "Simple And Compound Interest Calculator",
    category: "Finance & Shopping",
    stage: "live",
    sourceUrl: "https://rate.0123456789.tw/",
    liveSlug: "compound-interest-calculator"
  },
  {
    name: "Rotating Savings Bid Calculator",
    category: "Finance & Shopping",
    stage: "needs-rules",
    sourceUrl: "https://bidmoney.0123456789.tw/"
  },
  {
    name: "Stock Limit-Up/Limit-Down Calculator",
    category: "Finance & Shopping",
    stage: "needs-rules",
    sourceUrl: "https://stock7.0123456789.tw/"
  },
  {
    name: "Stock Profit/Loss Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://stocksell.0123456789.tw/"
  },
  {
    name: "Stock Ex-Dividend Calculator",
    category: "Finance & Shopping",
    stage: "needs-rules",
    sourceUrl: "https://stockshare.0123456789.tw/"
  },
  {
    name: "Baseball ERA Calculator",
    category: "Sports",
    stage: "formula-ready",
    sourceUrl: "https://era.0123456789.tw/"
  },
  {
    name: "Baseball Batting Average Calculator",
    category: "Sports",
    stage: "formula-ready",
    sourceUrl: "https://ba.0123456789.tw/"
  },
  {
    name: "Running Distance Calculator",
    category: "Health",
    stage: "live",
    sourceUrl: "https://run.0123456789.tw",
    liveSlug: "pace-calculator"
  },
  {
    name: "Running Calories Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://runkcal.0123456789.tw"
  },
  {
    name: "Blood Alcohol Calculator",
    category: "Health",
    stage: "needs-rules",
    sourceUrl: "https://bloodac.0123456789.tw/"
  },
  {
    name: "Buy Vs. Rent Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://rent.0123456789.tw/"
  },
  {
    name: "Interval Timer",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://clock.0123456789.tw/"
  },
  {
    name: "Stopwatch",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://min.0123456789.tw/"
  },
  {
    name: "Millisecond Stopwatch",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://sec.0123456789.tw"
  },
  {
    name: "Dog Age Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://dog.0123456789.tw"
  },
  {
    name: "Dog Pregnancy Due Date Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://dogbaby.0123456789.tw"
  },
  {
    name: "Cat Age Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://cat.0123456789.tw/"
  },
  {
    name: "Cat Pregnancy Due Date Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://catbaby.0123456789.tw/"
  },
  {
    name: "Ratio Calculator",
    category: "Math",
    stage: "formula-ready",
    sourceUrl: "https://scale.0123456789.tw/"
  },
  {
    name: "Tally Counter",
    category: "Core Tools",
    stage: "interactive-tool",
    sourceUrl: "https://count.0123456789.tw/"
  },
  {
    name: "Smoking Cost Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://smoke.0123456789.tw/"
  },
  {
    name: "Alcohol Spending Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://wine.0123456789.tw/"
  },
  {
    name: "Countdown Alarm",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://alarm.0123456789.tw/"
  },
  {
    name: "Visual Countdown Alarm",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://alarm.0123456789.tw/index2.php"
  },
  {
    name: "Cuckoo Clock",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://clock.0123456789.tw/cuckoo/"
  },
  {
    name: "Pomodoro Timer",
    category: "Time Tools",
    stage: "interactive-tool",
    sourceUrl: "https://0123456789.tw/tomato/"
  },
  {
    name: "YouTube Alarm",
    category: "Media Tools",
    stage: "interactive-tool",
    sourceUrl: "https://youtubealarm.0123456789.tw/"
  },
  {
    name: "Multi-YouTube Player",
    category: "Media Tools",
    stage: "interactive-tool",
    sourceUrl: "https://youtube.0123456789.tw/"
  },
  {
    name: "Perpetual Calendar With Notes",
    category: "Date & Time",
    stage: "interactive-tool",
    sourceUrl: "https://calendar.0123456789.tw/"
  },
  {
    name: "Tile Area Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://m2.0123456789.tw/"
  },
  {
    name: "Sleep Cycle Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://sleep.0123456789.tw/"
  },
  {
    name: "Sunrise/Sunset Calculator",
    category: "Date & Time",
    stage: "needs-rules",
    sourceUrl: "https://time.0123456789.tw/"
  },
  {
    name: "Timecard Calculator",
    category: "Date & Time",
    stage: "live",
    sourceUrl: "https://timecard.0123456789.tw/",
    liveSlug: "time-duration-calculator"
  },
  {
    name: "Real Promotion Discount Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/如何計算促銷折扣的真實折數（買二送一，滿百送/"
  },
  {
    name: "365 Savings Plan Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/365存錢計畫計算機/"
  },
  {
    name: "Child Height Prediction Calculator",
    category: "Health",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/小孩身高預測計算器/"
  },
  {
    name: "Parking Fee Calculator",
    category: "Transit & Mobility",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/停車計時計算機/"
  },
  {
    name: "Hidden Cash Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/私房錢計算器-多少錢藏在哪裡/"
  },
  {
    name: "Electric Vehicle Charging Cost Calculator",
    category: "Tech",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/電動汽車電耗充電計算機/"
  },
  {
    name: "Camera Distance Calculator",
    category: "Media Tools",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/攝影計算工具鏡頭焦段跟被攝者高度來算出需距離/"
  },
  {
    name: "Depth Of Field Calculator",
    category: "Media Tools",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/攝影工具景深與視角計算器/"
  },
  {
    name: "Reaction Test Score Calculator",
    category: "Lifestyle",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/反應測試-10秒挑戰/"
  },
  {
    name: "Effective Annual Rate Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/以金額跟利息反推實際年利率計算機-借錢計算機/"
  },
  {
    name: "Microwave Heating Time Calculator",
    category: "Home & Family",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/微波加熱時間計算機/"
  },
  {
    name: "Power Bank Wh Calculator",
    category: "Tech",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/多少容量的行動電源可以帶上飛機？mah轉換為wh計算/"
  },
  {
    name: "Shipping Cost Comparison Calculator",
    category: "Finance & Shopping",
    stage: "formula-ready",
    sourceUrl: "https://0123456789.tw/運費算一算怎麼寄最省錢郵局-宅配-快遞-便利箱袋/"
  }
];
