-- Generated from src/lib/expanded-calculators.ts on 2026-04-12.
-- Seeds the expanded public calculator catalog and keeps D1 aligned with the static app catalog.

INSERT OR IGNORE INTO categories (id, name, slug, description, seo_title, seo_description, status, sort_order)
VALUES
  (6, 'Core Tools', 'core-tools', 'General-purpose calculators and utility tools for quick everyday work.', 'Core Online Tools | Calculators and Utility Helpers', 'Use practical online tools for expressions, lists, counters, and quick utility tasks.', 'published', 6),
  (7, 'Transit & Mobility', 'transit-mobility', 'Travel, car, fuel, cycling, distance, and mobility calculators with editable assumptions.', 'Transit and Mobility Calculators | Fuel, Taxi, Car and Bike Tools', 'Estimate transit, driving, cycling, distance, fuel, and vehicle costs with flexible calculators.', 'published', 7),
  (8, 'Home & Family', 'home-family', 'Home, appliance, parenting, pet, aquarium, and household calculators.', 'Home and Family Calculators | Household Planning Tools', 'Plan household costs, appliance use, room needs, family dates, and pet care estimates.', 'published', 8),
  (9, 'Lifestyle', 'lifestyle', 'Lightweight lifestyle estimators for habits, spending, random picks, and personal planning.', 'Lifestyle Calculators | Habit, Random Pick and Personal Planning Tools', 'Use simple lifestyle calculators for habits, lists, pets, decisions, and spending estimates.', 'published', 9),
  (10, 'Text Tools', 'text-tools', 'Text utilities for counting, transforming, and checking written content.', 'Text Tools | Word Count and Writing Helpers', 'Count words, characters, lines, and text values with simple online text utilities.', 'published', 10),
  (11, 'Tech', 'tech', 'Technology calculators for screens, power, charging, media, and device planning.', 'Tech Calculators | PPI, Power, Charging and Device Tools', 'Estimate screen density, battery power, charging costs, and other technology measurements.', 'published', 11),
  (12, 'Sports', 'sports', 'Sports statistics and training calculators for quick performance estimates.', 'Sports Calculators | Baseball and Running Tools', 'Calculate sports stats and training estimates with quick online tools.', 'published', 12),
  (13, 'Time Tools', 'time-tools', 'Timers, cycles, alarms, and schedule planning tools.', 'Time Tools | Timers, Alarms and Schedule Calculators', 'Plan timers, alarms, work cycles, and elapsed time with online time tools.', 'published', 13),
  (14, 'Media Tools', 'media-tools', 'Media, video, color, and creator utilities for quick planning tasks.', 'Media Tools | Video, Color and Creator Calculators', 'Use media utilities for creator workflows, color counts, video lists, and production planning.', 'published', 14);


INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (201, 6, 'Basic Calculator', 'basic-calculator', 'Evaluate a quick arithmetic expression.', 'Evaluate a quick arithmetic expression. The implementation is original and keeps variable rates editable where local rules may change.', 'Basic Calculator', 'Evaluate a quick arithmetic expression.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The expression is parsed with a small allow-list of arithmetic operators and math functions.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'math_expression', '{"expressionField":"expression"}', 'published', 1),
  (202, 6, 'One-Line Expression Calculator', 'one-line-expression-calculator', 'Run a single-line calculation with parentheses and functions.', 'Run a single-line calculation with parentheses and functions. The implementation is original and keeps variable rates editable where local rules may change.', 'One-Line Expression Calculator', 'Run a single-line calculation with parentheses and functions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The expression is parsed with a small allow-list of arithmetic operators and math functions.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'math_expression', '{"expressionField":"expression"}', 'published', 2),
  (203, 6, 'Calculation Notebook', 'calculation-notebook', 'Paste a list of numbers and summarize the count, total, average, minimum, and maximum.', 'Paste a list of numbers and summarize the count, total, average, minimum, and maximum. The implementation is original and keeps variable rates editable where local rules may change.', 'Calculation Notebook', 'Paste a list of numbers and summarize the count, total, average, minimum, and maximum.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'number_list_stats', '{"textField":"numbers"}', 'published', 3),
  (204, 6, 'Engineering Calculator', 'engineering-calculator', 'Evaluate engineering-style expressions with square root, power, and trigonometric functions.', 'Evaluate engineering-style expressions with square root, power, and trigonometric functions. The implementation is original and keeps variable rates editable where local rules may change.', 'Engineering Calculator', 'Evaluate engineering-style expressions with square root, power, and trigonometric functions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The expression is parsed with a small allow-list of arithmetic operators and math functions.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'math_expression', '{"expressionField":"expression"}', 'published', 4),
  (205, 6, 'Scientific Calculator With History', 'scientific-calculator-with-history', 'Run a scientific expression for quick constants and function checks.', 'Run a scientific expression for quick constants and function checks. The implementation is original and keeps variable rates editable where local rules may change.', 'Scientific Calculator With History', 'Run a scientific expression for quick constants and function checks.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The expression is parsed with a small allow-list of arithmetic operators and math functions.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'math_expression', '{"expressionField":"expression"}', 'published', 5),
  (206, 2, 'Tax-Inclusive Price Calculator', 'tax-inclusive-price-calculator', 'Calculate tax amount and tax-inclusive total from a pre-tax price.', 'Calculate tax amount and tax-inclusive total from a pre-tax price. The implementation is original and keeps variable rates editable where local rules may change.', 'Tax-Inclusive Price Calculator', 'Calculate tax amount and tax-inclusive total from a pre-tax price.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"taxAmount":"netPrice * taxRate / 100","grossPrice":"netPrice * (1 + taxRate / 100)"}}', 'published', 6),
  (207, 4, 'Number Base Converter', 'number-base-converter', 'Convert a whole decimal number to another base from 2 to 36.', 'Convert a whole decimal number to another base from 2 to 36. The implementation is original and keeps variable rates editable where local rules may change.', 'Number Base Converter', 'Convert a whole decimal number to another base from 2 to 36.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'base_conversion', '{}', 'published', 7),
  (208, 2, 'Profit Margin Calculator', 'profit-margin-calculator', 'Calculate gross profit, margin, and markup.', 'Calculate gross profit, margin, and markup. The implementation is original and keeps variable rates editable where local rules may change.', 'Profit Margin Calculator', 'Calculate gross profit, margin, and markup.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"grossProfit":"revenue - cost","marginPercent":"(revenue - cost) / revenue * 100","markupPercent":"(revenue - cost) / cost * 100"}}', 'published', 8),
  (209, 1, 'Cycle Calculator', 'cycle-calculator', 'Estimate the next cycle date from a start date and cycle length.', 'Estimate the next cycle date from a start date and cycle length. The implementation is original and keeps variable rates editable where local rules may change.', 'Cycle Calculator', 'Estimate the next cycle date from a start date and cycle length.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 9),
  (210, 1, 'Cycle-Based Fitness Planner', 'cycle-based-fitness-planner', 'Estimate a planning date from a cycle start and an editable day offset.', 'Estimate a planning date from a cycle start and an editable day offset. The implementation is original and keeps variable rates editable where local rules may change.', 'Cycle-Based Fitness Planner', 'Estimate a planning date from a cycle start and an editable day offset.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 10);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (211, 1, 'Cycle-Based Wellness Planner', 'cycle-based-wellness-planner', 'Estimate a wellness planning date from a cycle start and an editable day offset.', 'Estimate a wellness planning date from a cycle start and an editable day offset. The implementation is original and keeps variable rates editable where local rules may change.', 'Cycle-Based Wellness Planner', 'Estimate a wellness planning date from a cycle start and an editable day offset.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 11),
  (212, 9, 'Mood Check Tool', 'mood-check-tool', 'Summarize simple 1-10 mood scores from a day or week.', 'Summarize simple 1-10 mood scores from a day or week. The implementation is original and keeps variable rates editable where local rules may change.', 'Mood Check Tool', 'Summarize simple 1-10 mood scores from a day or week.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'number_list_stats', '{"textField":"numbers"}', 'published', 12),
  (213, 1, 'Pregnancy Date Calculator', 'pregnancy-date-calculator', 'Estimate a due date from a last-period date using an editable day offset.', 'Estimate a due date from a last-period date using an editable day offset. The implementation is original and keeps variable rates editable where local rules may change.', 'Pregnancy Date Calculator', 'Estimate a due date from a last-period date using an editable day offset.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 13),
  (214, 1, 'Pregnancy Weight Calculator', 'pregnancy-weight-calculator', 'Compare current pregnancy weight gain with an editable target range.', 'Compare current pregnancy weight gain with an editable target range. The implementation is original and keeps variable rates editable where local rules may change.', 'Pregnancy Weight Calculator', 'Compare current pregnancy weight gain with an editable target range.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"currentGain":"currentWeight - prePregnancyWeight","remainingToLow":"max(targetGainLow - (currentWeight - prePregnancyWeight), 0)","remainingToHigh":"max(targetGainHigh - (currentWeight - prePregnancyWeight), 0)"}}', 'published', 14),
  (215, 1, 'Conception Date Calculator', 'conception-date-calculator', 'Estimate a conception date from a due date with an editable offset.', 'Estimate a conception date from a due date with an editable offset. The implementation is original and keeps variable rates editable where local rules may change.', 'Conception Date Calculator', 'Estimate a conception date from a due date with an editable offset.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 15),
  (216, 5, 'Baby Age In Days Calculator', 'baby-age-in-days-calculator', 'Count calendar days and weekdays between birth date and another date.', 'Count calendar days and weekdays between birth date and another date. The implementation is original and keeps variable rates editable where local rules may change.', 'Baby Age In Days Calculator', 'Count calendar days and weekdays between birth date and another date.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'workday_count', '{}', 'published', 16),
  (217, 1, 'Premature Baby Corrected Age Calculator', 'premature-baby-corrected-age-calculator', 'Estimate corrected age in weeks from chronological age and weeks early.', 'Estimate corrected age in weeks from chronological age and weeks early. The implementation is original and keeps variable rates editable where local rules may change.', 'Premature Baby Corrected Age Calculator', 'Estimate corrected age in weeks from chronological age and weeks early.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"correctedWeeks":"max(chronologicalWeeks - weeksEarly, 0)","correctedMonthsApprox":"max(chronologicalWeeks - weeksEarly, 0) / 4.345"}}', 'published', 17),
  (218, 1, '28-Day Cycle Care Planner', '28-day-cycle-care-planner', 'Plan a 28-day cycle milestone from a start date and editable offset.', 'Plan a 28-day cycle milestone from a start date and editable offset. The implementation is original and keeps variable rates editable where local rules may change.', '28-Day Cycle Care Planner', 'Plan a 28-day cycle milestone from a start date and editable offset.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 18),
  (219, 1, 'Body Shape Calculator', 'body-shape-calculator', 'Estimate waist-to-hip and waist-to-height ratios.', 'Estimate waist-to-hip and waist-to-height ratios. The implementation is original and keeps variable rates editable where local rules may change.', 'Body Shape Calculator', 'Estimate waist-to-hip and waist-to-height ratios.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"waistHipRatio":"waistCm / hipCm","waistHeightRatio":"waistCm / heightCm"}}', 'published', 19),
  (220, 8, 'Baby Formula Temperature Calculator', 'baby-formula-temperature-calculator', 'Estimate mixed-water temperature from hot and cool water amounts.', 'Estimate mixed-water temperature from hot and cool water amounts. The implementation is original and keeps variable rates editable where local rules may change.', 'Baby Formula Temperature Calculator', 'Estimate mixed-water temperature from hot and cool water amounts.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"mixedTemperature":"(hotMl * hotTemp + coolMl * coolTemp) / (hotMl + coolMl)","totalVolume":"hotMl + coolMl"}}', 'published', 20);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (221, 5, 'Public Holiday Calendar Helper', 'public-holiday-calendar-helper', 'Count weekdays across a date range and subtract known holidays.', 'Count weekdays across a date range and subtract known holidays. The implementation is original and keeps variable rates editable where local rules may change.', 'Public Holiday Calendar Helper', 'Count weekdays across a date range and subtract known holidays.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'workday_count', '{}', 'published', 21),
  (222, 5, 'Insurance Age Calculator', 'insurance-age-calculator', 'Estimate insurance age by adding an editable rounding adjustment to actual age.', 'Estimate insurance age by adding an editable rounding adjustment to actual age. The implementation is original and keeps variable rates editable where local rules may change.', 'Insurance Age Calculator', 'Estimate insurance age by adding an editable rounding adjustment to actual age.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"insuranceAge":"actualAge + roundingAdjustment"}}', 'published', 22),
  (223, 5, 'Date Add/Subtract Calculator', 'date-add-subtract-calculator', 'Add or subtract days and months from a date.', 'Add or subtract days and months from a date. The implementation is original and keeps variable rates editable where local rules may change.', 'Date Add/Subtract Calculator', 'Add or subtract days and months from a date.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 23),
  (224, 5, 'Workday Calculator', 'workday-calculator', 'Estimate workdays between two dates with an editable holiday count.', 'Estimate workdays between two dates with an editable holiday count. The implementation is original and keeps variable rates editable where local rules may change.', 'Workday Calculator', 'Estimate workdays between two dates with an editable holiday count.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'workday_count', '{}', 'published', 24),
  (225, 5, 'Day Counter', 'day-counter', 'Count calendar days and weekdays across a date range.', 'Count calendar days and weekdays across a date range. The implementation is original and keeps variable rates editable where local rules may change.', 'Day Counter', 'Count calendar days and weekdays across a date range.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'workday_count', '{}', 'published', 25),
  (226, 13, 'Kids Timer', 'kids-timer', 'Plan a simple child-friendly timer cycle.', 'Plan a simple child-friendly timer cycle. The implementation is original and keeps variable rates editable where local rules may change.', 'Kids Timer', 'Plan a simple child-friendly timer cycle.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 26),
  (227, 9, 'Height Match Calculator', 'height-match-calculator', 'Compare two heights and calculate their difference and ratio.', 'Compare two heights and calculate their difference and ratio. The implementation is original and keeps variable rates editable where local rules may change.', 'Height Match Calculator', 'Compare two heights and calculate their difference and ratio.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"heightDifference":"abs(heightA - heightB)","heightRatio":"heightA / heightB"}}', 'published', 27),
  (228, 1, 'Target Heart Rate Calculator', 'target-heart-rate-calculator', 'Estimate maximum heart rate and training zone from age and intensity.', 'Estimate maximum heart rate and training zone from age and intensity. The implementation is original and keeps variable rates editable where local rules may change.', 'Target Heart Rate Calculator', 'Estimate maximum heart rate and training zone from age and intensity.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"maxHeartRate":"220 - age","lowTarget":"(220 - age) * intensityLow / 100","highTarget":"(220 - age) * intensityHigh / 100"}}', 'published', 28),
  (229, 1, 'Exercise Calories Calculator', 'exercise-calories-calculator', 'Estimate calories burned from MET, weight, and duration.', 'Estimate calories burned from MET, weight, and duration. The implementation is original and keeps variable rates editable where local rules may change.', 'Exercise Calories Calculator', 'Estimate calories burned from MET, weight, and duration.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"caloriesBurned":"met * 3.5 * weightKg / 200 * minutes"}}', 'published', 29),
  (230, 4, 'Shoe Size Converter', 'shoe-size-converter', 'Estimate common shoe size conversions from foot length.', 'Estimate common shoe size conversions from foot length. The implementation is original and keeps variable rates editable where local rules may change.', 'Shoe Size Converter', 'Estimate common shoe size conversions from foot length.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"euSizeApprox":"footLengthCm * 1.5 + 2","usMenApprox":"footLengthCm * 3 - 22","usWomenApprox":"footLengthCm * 3 - 21"}}', 'published', 30);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (231, 2, 'Currency Converter', 'currency-converter', 'Convert an amount using an editable exchange rate and fee.', 'Convert an amount using an editable exchange rate and fee. The implementation is original and keeps variable rates editable where local rules may change.', 'Currency Converter', 'Convert an amount using an editable exchange rate and fee.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"convertedAmount":"amount * exchangeRate * (1 - feePercent / 100)","feeAmount":"amount * exchangeRate * feePercent / 100"}}', 'published', 31),
  (232, 2, 'Travel Exchange Rate Calculator', 'travel-exchange-rate-calculator', 'Estimate travel money after exchange spread and card fee.', 'Estimate travel money after exchange spread and card fee. The implementation is original and keeps variable rates editable where local rules may change.', 'Travel Exchange Rate Calculator', 'Estimate travel money after exchange spread and card fee.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"destinationAmount":"homeAmount * travelRate * (1 - cardFeePercent / 100)","feeValue":"homeAmount * travelRate * cardFeePercent / 100"}}', 'published', 32),
  (233, 8, 'TV Viewing Distance Calculator', 'tv-viewing-distance-calculator', 'Estimate viewing distance from screen size.', 'Estimate viewing distance from screen size. The implementation is original and keeps variable rates editable where local rules may change.', 'TV Viewing Distance Calculator', 'Estimate viewing distance from screen size.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"viewingDistanceInches":"screenInches * multiplier","viewingDistanceFeet":"screenInches * multiplier / 12"}}', 'published', 33),
  (234, 14, 'Color Count Tool', 'color-count-tool', 'Paste color values or labels and count entries, words, and lines.', 'Paste color values or labels and count entries, words, and lines. The implementation is original and keeps variable rates editable where local rules may change.', 'Color Count Tool', 'Paste color values or labels and count entries, words, and lines.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'text_stats', '{"textField":"text"}', 'published', 34),
  (235, 11, 'Screen PPI Calculator', 'screen-ppi-calculator', 'Calculate pixels per inch from resolution and diagonal size.', 'Calculate pixels per inch from resolution and diagonal size. The implementation is original and keeps variable rates editable where local rules may change.', 'Screen PPI Calculator', 'Calculate pixels per inch from resolution and diagonal size.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"ppi":"sqrt(widthPixels ^ 2 + heightPixels ^ 2) / diagonalInches"}}', 'published', 35),
  (236, 4, 'PPM Concentration Converter', 'ppm-concentration-converter', 'Convert ppm to percent and decimal concentration.', 'Convert ppm to percent and decimal concentration. The implementation is original and keeps variable rates editable where local rules may change.', 'PPM Concentration Converter', 'Convert ppm to percent and decimal concentration.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"percent":"ppm / 10000","decimal":"ppm / 1000000"}}', 'published', 36),
  (237, 10, 'Chinese Text Utility', 'chinese-text-utility', 'Paste Chinese text and count characters, non-space characters, words, and lines.', 'Paste Chinese text and count characters, non-space characters, words, and lines. The implementation is original and keeps variable rates editable where local rules may change.', 'Chinese Text Utility', 'Paste Chinese text and count characters, non-space characters, words, and lines.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'text_stats', '{"textField":"text"}', 'published', 37),
  (238, 7, 'Taiwan Taxi Fare Calculator', 'taiwan-taxi-fare-calculator', 'Estimate a taxi fare from editable local fare assumptions.', 'Estimate a taxi fare from editable local fare assumptions. The implementation is original and keeps variable rates editable where local rules may change.', 'Taiwan Taxi Fare Calculator', 'Estimate a taxi fare from editable local fare assumptions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"estimatedFare":"baseFare + max(distanceKm - includedKm, 0) * perKmRate + waitingFee"}}', 'published', 38),
  (239, 7, 'Hong Kong Taxi Fare Calculator', 'hong-kong-taxi-fare-calculator', 'Estimate a taxi fare from editable Hong Kong fare assumptions.', 'Estimate a taxi fare from editable Hong Kong fare assumptions. The implementation is original and keeps variable rates editable where local rules may change.', 'Hong Kong Taxi Fare Calculator', 'Estimate a taxi fare from editable Hong Kong fare assumptions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"estimatedFare":"baseFare + max(distanceKm - includedKm, 0) * perKmRate + surcharge"}}', 'published', 39),
  (240, 7, 'Time Speed Distance Calculator', 'time-speed-distance-calculator', 'Calculate speed and pace from distance and time.', 'Calculate speed and pace from distance and time. The implementation is original and keeps variable rates editable where local rules may change.', 'Time Speed Distance Calculator', 'Calculate speed and pace from distance and time.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"speed":"distance / hours","minutesPerKm":"hours * 60 / distance"}}', 'published', 40);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (241, 7, 'Gear Ratio RPM Calculator', 'gear-ratio-rpm-calculator', 'Estimate wheel RPM from engine RPM and gear ratio.', 'Estimate wheel RPM from engine RPM and gear ratio. The implementation is original and keeps variable rates editable where local rules may change.', 'Gear Ratio RPM Calculator', 'Estimate wheel RPM from engine RPM and gear ratio.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"wheelRpm":"engineRpm / (gearRatio * finalDrive)"}}', 'published', 41),
  (242, 7, 'Tire Size Upgrade Calculator', 'tire-size-upgrade-calculator', 'Compare tire diameter from width, aspect ratio, and rim size.', 'Compare tire diameter from width, aspect ratio, and rim size. The implementation is original and keeps variable rates editable where local rules may change.', 'Tire Size Upgrade Calculator', 'Compare tire diameter from width, aspect ratio, and rim size.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"sidewallMm":"widthMm * aspectPercent / 100","diameterMm":"rimInches * 25.4 + 2 * widthMm * aspectPercent / 100"}}', 'published', 42),
  (243, 7, 'Fuel Price Change Calculator', 'fuel-price-change-calculator', 'Estimate how a fuel price change affects a refill.', 'Estimate how a fuel price change affects a refill. The implementation is original and keeps variable rates editable where local rules may change.', 'Fuel Price Change Calculator', 'Estimate how a fuel price change affects a refill.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"oldCost":"liters * oldPrice","newCost":"liters * newPrice","costChange":"liters * (newPrice - oldPrice)"}}', 'published', 43),
  (244, 8, 'Electricity Bill Calculator', 'electricity-bill-calculator', 'Estimate electricity cost from kWh and an editable rate.', 'Estimate electricity cost from kWh and an editable rate. The implementation is original and keeps variable rates editable where local rules may change.', 'Electricity Bill Calculator', 'Estimate electricity cost from kWh and an editable rate.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"energyCost":"kwh * rate","totalCost":"kwh * rate + fixedFee"}}', 'published', 44),
  (245, 10, 'Word Count Tool', 'word-count-tool', 'Count words, characters, non-space characters, and lines.', 'Count words, characters, non-space characters, and lines. The implementation is original and keeps variable rates editable where local rules may change.', 'Word Count Tool', 'Count words, characters, non-space characters, and lines.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'text_stats', '{"textField":"text"}', 'published', 45),
  (246, 8, 'Air Conditioner BTU Calculator', 'air-conditioner-btu-calculator', 'Estimate cooling capacity from room area and BTU per square foot.', 'Estimate cooling capacity from room area and BTU per square foot. The implementation is original and keeps variable rates editable where local rules may change.', 'Air Conditioner BTU Calculator', 'Estimate cooling capacity from room area and BTU per square foot.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"requiredBtu":"areaSqFt * btuPerSqFt","tonsApprox":"areaSqFt * btuPerSqFt / 12000"}}', 'published', 46),
  (247, 8, 'Air Conditioner Electricity Cost Calculator', 'air-conditioner-electricity-cost-calculator', 'Estimate air conditioner electricity use and cost.', 'Estimate air conditioner electricity use and cost. The implementation is original and keeps variable rates editable where local rules may change.', 'Air Conditioner Electricity Cost Calculator', 'Estimate air conditioner electricity use and cost.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"kwh":"watts / 1000 * hoursPerDay * days","cost":"watts / 1000 * hoursPerDay * days * rate"}}', 'published', 47),
  (248, 3, 'Golden Ratio Calculator', 'golden-ratio-calculator', 'Scale a value by the golden ratio and its reciprocal.', 'Scale a value by the golden ratio and its reciprocal. The implementation is original and keeps variable rates editable where local rules may change.', 'Golden Ratio Calculator', 'Scale a value by the golden ratio and its reciprocal.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"largerPart":"value * 1.61803398875","smallerPart":"value * 0.61803398875"}}', 'published', 48),
  (249, 2, 'Credit Card Debt Calculator', 'credit-card-debt-calculator', 'Estimate months to pay off credit card debt with fixed monthly payments.', 'Estimate months to pay off credit card debt with fixed monthly payments. The implementation is original and keeps variable rates editable where local rules may change.', 'Credit Card Debt Calculator', 'Estimate months to pay off credit card debt with fixed monthly payments.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"monthsNoInterest":"balance / monthlyPayment","totalPaidNoInterest":"ceil(balance / monthlyPayment) * monthlyPayment"}}', 'published', 49),
  (250, 2, 'Car Purchase Budget Calculator', 'car-purchase-budget-calculator', 'Estimate an out-the-door car budget with taxes and fees.', 'Estimate an out-the-door car budget with taxes and fees. The implementation is original and keeps variable rates editable where local rules may change.', 'Car Purchase Budget Calculator', 'Estimate an out-the-door car budget with taxes and fees.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"taxAmount":"vehiclePrice * taxPercent / 100","outTheDoor":"vehiclePrice * (1 + taxPercent / 100) + fees"}}', 'published', 50);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (251, 2, 'Weekly Savings Challenge Calculator', 'weekly-savings-challenge-calculator', 'Estimate savings from a weekly increasing challenge.', 'Estimate savings from a weekly increasing challenge. The implementation is original and keeps variable rates editable where local rules may change.', 'Weekly Savings Challenge Calculator', 'Estimate savings from a weekly increasing challenge.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"totalSaved":"weeks / 2 * (2 * firstWeek + (weeks - 1) * weeklyIncrease)","finalWeekAmount":"firstWeek + (weeks - 1) * weeklyIncrease"}}', 'published', 51),
  (252, 7, 'Bicycle Gear Calculator', 'bicycle-gear-calculator', 'Estimate bicycle gear ratio and gear inches.', 'Estimate bicycle gear ratio and gear inches. The implementation is original and keeps variable rates editable where local rules may change.', 'Bicycle Gear Calculator', 'Estimate bicycle gear ratio and gear inches.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"gearRatio":"frontTeeth / rearTeeth","gearInches":"frontTeeth / rearTeeth * wheelInches"}}', 'published', 52),
  (253, 9, 'Random Draw Tool', 'random-draw-tool', 'Pick one or more entries from a list using a deterministic seed.', 'Pick one or more entries from a list using a deterministic seed. The implementation is original and keeps variable rates editable where local rules may change.', 'Random Draw Tool', 'Pick one or more entries from a list using a deterministic seed.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'list_picker', '{"listField":"items"}', 'published', 53),
  (254, 7, 'Map Distance Calculator', 'map-distance-calculator', 'Estimate travel time from distance and average speed.', 'Estimate travel time from distance and average speed. The implementation is original and keeps variable rates editable where local rules may change.', 'Map Distance Calculator', 'Estimate travel time from distance and average speed.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"travelHours":"distanceKm / averageSpeedKph","travelMinutes":"distanceKm / averageSpeedKph * 60"}}', 'published', 54),
  (255, 8, 'Aquarium Volume Calculator', 'aquarium-volume-calculator', 'Calculate aquarium volume from length, width, and height.', 'Calculate aquarium volume from length, width, and height. The implementation is original and keeps variable rates editable where local rules may change.', 'Aquarium Volume Calculator', 'Calculate aquarium volume from length, width, and height.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"liters":"lengthCm * widthCm * heightCm / 1000","gallons":"lengthCm * widthCm * heightCm / 1000 / 3.78541"}}', 'published', 55),
  (256, 1, 'Water Intake Calculator', 'water-intake-calculator', 'Estimate daily water intake from body weight.', 'Estimate daily water intake from body weight. The implementation is original and keeps variable rates editable where local rules may change.', 'Water Intake Calculator', 'Estimate daily water intake from body weight.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"dailyMl":"weightKg * mlPerKg","dailyLiters":"weightKg * mlPerKg / 1000"}}', 'published', 56),
  (257, 8, 'Cup Volume Calculator', 'cup-volume-calculator', 'Estimate cylindrical cup volume.', 'Estimate cylindrical cup volume. The implementation is original and keeps variable rates editable where local rules may change.', 'Cup Volume Calculator', 'Estimate cylindrical cup volume.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"volumeMl":"pi * (diameterCm / 2) ^ 2 * heightCm","volumeOz":"pi * (diameterCm / 2) ^ 2 * heightCm / 29.5735"}}', 'published', 57),
  (258, 1, 'Waist-To-Hip Ratio Calculator', 'waist-to-hip-ratio-calculator', 'Calculate waist-to-hip ratio from body measurements.', 'Calculate waist-to-hip ratio from body measurements. The implementation is original and keeps variable rates editable where local rules may change.', 'Waist-To-Hip Ratio Calculator', 'Calculate waist-to-hip ratio from body measurements.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"waistHipRatio":"waist / hip"}}', 'published', 58),
  (259, 2, 'Mortgage Refinance Calculator', 'mortgage-refinance-calculator', 'Estimate simple monthly savings and break-even months for refinancing.', 'Estimate simple monthly savings and break-even months for refinancing. The implementation is original and keeps variable rates editable where local rules may change.', 'Mortgage Refinance Calculator', 'Estimate simple monthly savings and break-even months for refinancing.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"monthlySavings":"oldPayment - newPayment","breakEvenMonths":"closingCosts / max(oldPayment - newPayment, 0.01)"}}', 'published', 59),
  (260, 2, 'Mortgage Grace Period Calculator', 'mortgage-grace-period-calculator', 'Estimate interest accrued during a grace period.', 'Estimate interest accrued during a grace period. The implementation is original and keeps variable rates editable where local rules may change.', 'Mortgage Grace Period Calculator', 'Estimate interest accrued during a grace period.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"interestDuringGrace":"loanAmount * annualRate / 100 / 12 * graceMonths"}}', 'published', 60);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (261, 2, 'Rotating Savings Bid Calculator', 'rotating-savings-bid-calculator', 'Estimate simple bid interest from group savings assumptions.', 'Estimate simple bid interest from group savings assumptions. The implementation is original and keeps variable rates editable where local rules may change.', 'Rotating Savings Bid Calculator', 'Estimate simple bid interest from group savings assumptions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"potBeforeDiscount":"monthlyContribution * members","receivedAmount":"monthlyContribution * members - bidDiscount","discountPercent":"bidDiscount / (monthlyContribution * members) * 100"}}', 'published', 61),
  (262, 2, 'Stock Limit-Up/Limit-Down Calculator', 'stock-limit-up-limit-down-calculator', 'Estimate upper and lower price limits from an editable percentage rule.', 'Estimate upper and lower price limits from an editable percentage rule. The implementation is original and keeps variable rates editable where local rules may change.', 'Stock Limit-Up/Limit-Down Calculator', 'Estimate upper and lower price limits from an editable percentage rule.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"limitUp":"previousClose * (1 + limitPercent / 100)","limitDown":"previousClose * (1 - limitPercent / 100)"}}', 'published', 62),
  (263, 2, 'Stock Profit/Loss Calculator', 'stock-profit-loss-calculator', 'Calculate stock trade profit or loss before detailed broker rules.', 'Calculate stock trade profit or loss before detailed broker rules. The implementation is original and keeps variable rates editable where local rules may change.', 'Stock Profit/Loss Calculator', 'Calculate stock trade profit or loss before detailed broker rules.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"profitLoss":"(sellPrice - buyPrice) * shares - fees","returnPercent":"((sellPrice - buyPrice) * shares - fees) / (buyPrice * shares) * 100"}}', 'published', 63),
  (264, 2, 'Stock Ex-Dividend Calculator', 'stock-ex-dividend-calculator', 'Estimate adjusted price after cash and stock dividends.', 'Estimate adjusted price after cash and stock dividends. The implementation is original and keeps variable rates editable where local rules may change.', 'Stock Ex-Dividend Calculator', 'Estimate adjusted price after cash and stock dividends.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"adjustedPrice":"(price - cashDividend) / (1 + stockDividendPercent / 100)"}}', 'published', 64),
  (265, 12, 'Baseball ERA Calculator', 'baseball-era-calculator', 'Calculate earned run average.', 'Calculate earned run average. The implementation is original and keeps variable rates editable where local rules may change.', 'Baseball ERA Calculator', 'Calculate earned run average.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"era":"earnedRuns * 9 / inningsPitched"}}', 'published', 65),
  (266, 12, 'Baseball Batting Average Calculator', 'baseball-batting-average-calculator', 'Calculate batting average from hits and at-bats.', 'Calculate batting average from hits and at-bats. The implementation is original and keeps variable rates editable where local rules may change.', 'Baseball Batting Average Calculator', 'Calculate batting average from hits and at-bats.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"battingAverage":"hits / atBats"}}', 'published', 66),
  (267, 1, 'Running Calories Calculator', 'running-calories-calculator', 'Estimate running calories from weight and distance.', 'Estimate running calories from weight and distance. The implementation is original and keeps variable rates editable where local rules may change.', 'Running Calories Calculator', 'Estimate running calories from weight and distance.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"calories":"weightKg * distanceKm * 1.036"}}', 'published', 67),
  (268, 1, 'Blood Alcohol Calculator', 'blood-alcohol-calculator', 'Estimate BAC with editable drink, body-water, and metabolism assumptions.', 'Estimate BAC with editable drink, body-water, and metabolism assumptions. The implementation is original and keeps variable rates editable where local rules may change.', 'Blood Alcohol Calculator', 'Estimate BAC with editable drink, body-water, and metabolism assumptions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"bacPercent":"max((standardDrinks * alcoholGramsPerDrink / (weightKg * 1000 * bodyWaterRatio)) * 100 - hours * metabolismPerHour, 0)"}}', 'published', 68),
  (269, 2, 'Buy Vs. Rent Calculator', 'buy-vs-rent-calculator', 'Compare simple monthly owning and renting costs.', 'Compare simple monthly owning and renting costs. The implementation is original and keeps variable rates editable where local rules may change.', 'Buy Vs. Rent Calculator', 'Compare simple monthly owning and renting costs.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"owningCost":"monthlyMortgage + monthlyOwnerCosts","rentingCost":"monthlyRent + renterCosts","monthlyDifference":"monthlyMortgage + monthlyOwnerCosts - monthlyRent - renterCosts"}}', 'published', 69),
  (270, 13, 'Interval Timer', 'interval-timer', 'Plan active/rest interval rounds.', 'Plan active/rest interval rounds. The implementation is original and keeps variable rates editable where local rules may change.', 'Interval Timer', 'Plan active/rest interval rounds.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 70);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (271, 13, 'Stopwatch Session Calculator', 'stopwatch-session-calculator', 'Plan repeated timed stopwatch attempts.', 'Plan repeated timed stopwatch attempts. The implementation is original and keeps variable rates editable where local rules may change.', 'Stopwatch Session Calculator', 'Plan repeated timed stopwatch attempts.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 71),
  (272, 13, 'Millisecond Stopwatch Planner', 'millisecond-stopwatch-planner', 'Convert short timed attempts into a total session duration.', 'Convert short timed attempts into a total session duration. The implementation is original and keeps variable rates editable where local rules may change.', 'Millisecond Stopwatch Planner', 'Convert short timed attempts into a total session duration.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 72),
  (273, 9, 'Dog Age Calculator', 'dog-age-calculator', 'Estimate dog age in human-year equivalents with editable multipliers.', 'Estimate dog age in human-year equivalents with editable multipliers. The implementation is original and keeps variable rates editable where local rules may change.', 'Dog Age Calculator', 'Estimate dog age in human-year equivalents with editable multipliers.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"humanYearsApprox":"firstYearFactor + max(dogYears - 1, 0) * laterYearFactor"}}', 'published', 73),
  (274, 9, 'Dog Pregnancy Due Date Calculator', 'dog-pregnancy-due-date-calculator', 'Estimate a dog pregnancy due date from breeding date.', 'Estimate a dog pregnancy due date from breeding date. The implementation is original and keeps variable rates editable where local rules may change.', 'Dog Pregnancy Due Date Calculator', 'Estimate a dog pregnancy due date from breeding date.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 74),
  (275, 9, 'Cat Age Calculator', 'cat-age-calculator', 'Estimate cat age in human-year equivalents with editable factors.', 'Estimate cat age in human-year equivalents with editable factors. The implementation is original and keeps variable rates editable where local rules may change.', 'Cat Age Calculator', 'Estimate cat age in human-year equivalents with editable factors.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"humanYearsApprox":"firstYearFactor + max(catYears - 1, 0) * laterYearFactor"}}', 'published', 75),
  (276, 9, 'Cat Pregnancy Due Date Calculator', 'cat-pregnancy-due-date-calculator', 'Estimate a cat pregnancy due date from breeding date.', 'Estimate a cat pregnancy due date from breeding date. The implementation is original and keeps variable rates editable where local rules may change.', 'Cat Pregnancy Due Date Calculator', 'Estimate a cat pregnancy due date from breeding date.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'The tool adds calendar months first, then days, using a UTC date calculation to avoid time-zone drift.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'date_add', '{}', 'published', 76),
  (277, 3, 'Ratio Calculator', 'ratio-calculator', 'Calculate ratio, scaled values, and proportional parts.', 'Calculate ratio, scaled values, and proportional parts. The implementation is original and keeps variable rates editable where local rules may change.', 'Ratio Calculator', 'Calculate ratio, scaled values, and proportional parts.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"ratio":"partA / partB","scaledA":"scaleTo * partA / (partA + partB)","scaledB":"scaleTo * partB / (partA + partB)"}}', 'published', 77),
  (278, 6, 'Tally Counter', 'tally-counter', 'Calculate the next counter value from a current value and step.', 'Calculate the next counter value from a current value and step. The implementation is original and keeps variable rates editable where local rules may change.', 'Tally Counter', 'Calculate the next counter value from a current value and step.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"nextCount":"currentCount + step","previousCount":"currentCount - step"}}', 'published', 78),
  (279, 1, 'Smoking Cost Calculator', 'smoking-cost-calculator', 'Estimate smoking cost over days, months, and years.', 'Estimate smoking cost over days, months, and years. The implementation is original and keeps variable rates editable where local rules may change.', 'Smoking Cost Calculator', 'Estimate smoking cost over days, months, and years.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"dailyCost":"packsPerDay * pricePerPack","monthlyCost":"packsPerDay * pricePerPack * 30.4375","yearlyCost":"packsPerDay * pricePerPack * 365"}}', 'published', 79),
  (280, 9, 'Alcohol Spending Calculator', 'alcohol-spending-calculator', 'Estimate drinking or beverage spending over a month.', 'Estimate drinking or beverage spending over a month. The implementation is original and keeps variable rates editable where local rules may change.', 'Alcohol Spending Calculator', 'Estimate drinking or beverage spending over a month.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"weeklyCost":"drinksPerWeek * pricePerDrink","monthlyCost":"drinksPerWeek * pricePerDrink * 52 / 12","yearlyCost":"drinksPerWeek * pricePerDrink * 52"}}', 'published', 80);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (281, 13, 'Countdown Alarm Planner', 'countdown-alarm-planner', 'Plan a countdown alarm length.', 'Plan a countdown alarm length. The implementation is original and keeps variable rates editable where local rules may change.', 'Countdown Alarm Planner', 'Plan a countdown alarm length.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 81),
  (282, 13, 'Visual Countdown Alarm Planner', 'visual-countdown-alarm-planner', 'Plan a visual countdown alarm sequence.', 'Plan a visual countdown alarm sequence. The implementation is original and keeps variable rates editable where local rules may change.', 'Visual Countdown Alarm Planner', 'Plan a visual countdown alarm sequence.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 82),
  (283, 13, 'Cuckoo Clock Planner', 'cuckoo-clock-planner', 'Estimate a repeated chime schedule length.', 'Estimate a repeated chime schedule length. The implementation is original and keeps variable rates editable where local rules may change.', 'Cuckoo Clock Planner', 'Estimate a repeated chime schedule length.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 83),
  (284, 13, 'Pomodoro Timer', 'pomodoro-timer', 'Plan Pomodoro work and break rounds.', 'Plan Pomodoro work and break rounds. The implementation is original and keeps variable rates editable where local rules may change.', 'Pomodoro Timer', 'Plan Pomodoro work and break rounds.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'time_cycle', '{}', 'published', 84),
  (285, 14, 'YouTube Alarm Planner', 'youtube-alarm-planner', 'Paste video links or alarm notes and count entries for a playlist alarm.', 'Paste video links or alarm notes and count entries for a playlist alarm. The implementation is original and keeps variable rates editable where local rules may change.', 'YouTube Alarm Planner', 'Paste video links or alarm notes and count entries for a playlist alarm.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'text_stats', '{"textField":"text"}', 'published', 85),
  (286, 14, 'Multi-YouTube Player Planner', 'multi-youtube-player-planner', 'Paste multiple video links and count lines for a multi-video setup.', 'Paste multiple video links and count lines for a multi-video setup. The implementation is original and keeps variable rates editable where local rules may change.', 'Multi-YouTube Player Planner', 'Paste multiple video links and count lines for a multi-video setup.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'text_stats', '{"textField":"text"}', 'published', 86),
  (287, 5, 'Perpetual Calendar With Notes', 'perpetual-calendar-with-notes', 'Draft calendar notes and count words, characters, and lines.', 'Draft calendar notes and count words, characters, and lines. The implementation is original and keeps variable rates editable where local rules may change.', 'Perpetual Calendar With Notes', 'Draft calendar notes and count words, characters, and lines.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This tool uses the inputs above to produce a practical estimate.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'text_stats', '{"textField":"text"}', 'published', 87),
  (288, 8, 'Tile Area Calculator', 'tile-area-calculator', 'Estimate tile count from room area, tile size, and waste percentage.', 'Estimate tile count from room area, tile size, and waste percentage. The implementation is original and keeps variable rates editable where local rules may change.', 'Tile Area Calculator', 'Estimate tile count from room area, tile size, and waste percentage.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"tileCount":"ceil(areaSqM / (tileWidthCm * tileHeightCm / 10000) * (1 + wastePercent / 100))"}}', 'published', 88),
  (289, 1, 'Sleep Cycle Calculator', 'sleep-cycle-calculator', 'Estimate sleep duration from sleep cycles and minutes per cycle.', 'Estimate sleep duration from sleep cycles and minutes per cycle. The implementation is original and keeps variable rates editable where local rules may change.', 'Sleep Cycle Calculator', 'Estimate sleep duration from sleep cycles and minutes per cycle.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"sleepMinutes":"cycles * minutesPerCycle","totalBedMinutes":"cycles * minutesPerCycle + fallAsleepMinutes","totalBedHours":"(cycles * minutesPerCycle + fallAsleepMinutes) / 60"}}', 'published', 89),
  (290, 5, 'Sunrise/Sunset Daylight Calculator', 'sunrise-sunset-daylight-calculator', 'Estimate daylight duration from sunrise and sunset times entered as decimal hours.', 'Estimate daylight duration from sunrise and sunset times entered as decimal hours. The implementation is original and keeps variable rates editable where local rules may change.', 'Sunrise/Sunset Daylight Calculator', 'Estimate daylight duration from sunrise and sunset times entered as decimal hours.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"daylightHours":"sunsetHour - sunriseHour","daylightMinutes":"(sunsetHour - sunriseHour) * 60"}}', 'published', 90);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (291, 2, 'Real Promotion Discount Calculator', 'real-promotion-discount-calculator', 'Estimate the real discount from buy-more-save-more promotions.', 'Estimate the real discount from buy-more-save-more promotions. The implementation is original and keeps variable rates editable where local rules may change.', 'Real Promotion Discount Calculator', 'Estimate the real discount from buy-more-save-more promotions.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"finalTotal":"originalTotal - discountAmount","realDiscountPercent":"discountAmount / originalTotal * 100"}}', 'published', 91),
  (292, 2, '365 Savings Plan Calculator', '365-savings-plan-calculator', 'Estimate total savings from a daily increasing savings plan.', 'Estimate total savings from a daily increasing savings plan. The implementation is original and keeps variable rates editable where local rules may change.', '365 Savings Plan Calculator', 'Estimate total savings from a daily increasing savings plan.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"totalSaved":"days / 2 * (2 * firstDay + (days - 1) * dailyIncrease)","finalDaySaving":"firstDay + (days - 1) * dailyIncrease"}}', 'published', 92),
  (293, 1, 'Child Height Prediction Calculator', 'child-height-prediction-calculator', 'Estimate child adult height from parent heights with an editable offset.', 'Estimate child adult height from parent heights with an editable offset. The implementation is original and keeps variable rates editable where local rules may change.', 'Child Height Prediction Calculator', 'Estimate child adult height from parent heights with an editable offset.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"predictedHeight":"(parentAHeight + parentBHeight + sexOffset) / 2"}}', 'published', 93),
  (294, 7, 'Parking Fee Calculator', 'parking-fee-calculator', 'Estimate parking fee from duration, free minutes, hourly rate, and cap.', 'Estimate parking fee from duration, free minutes, hourly rate, and cap. The implementation is original and keeps variable rates editable where local rules may change.', 'Parking Fee Calculator', 'Estimate parking fee from duration, free minutes, hourly rate, and cap.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"rawFee":"ceil(max(minutesParked - freeMinutes, 0) / 60) * hourlyRate","estimatedFee":"min(ceil(max(minutesParked - freeMinutes, 0) / 60) * hourlyRate, dailyCap)"}}', 'published', 94),
  (295, 2, 'Hidden Cash Calculator', 'hidden-cash-calculator', 'Add up small hidden cash amounts from multiple places.', 'Add up small hidden cash amounts from multiple places. The implementation is original and keeps variable rates editable where local rules may change.', 'Hidden Cash Calculator', 'Add up small hidden cash amounts from multiple places.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"totalCash":"wallet + drawer + emergencyFund"}}', 'published', 95),
  (296, 11, 'Electric Vehicle Charging Cost Calculator', 'electric-vehicle-charging-cost-calculator', 'Estimate EV charging cost and range added.', 'Estimate EV charging cost and range added. The implementation is original and keeps variable rates editable where local rules may change.', 'Electric Vehicle Charging Cost Calculator', 'Estimate EV charging cost and range added.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"chargingCost":"batteryKwhAdded * pricePerKwh","rangeAddedKm":"batteryKwhAdded * kmPerKwh"}}', 'published', 96),
  (297, 14, 'Camera Distance Calculator', 'camera-distance-calculator', 'Estimate camera distance from subject height, focal length, and sensor height.', 'Estimate camera distance from subject height, focal length, and sensor height. The implementation is original and keeps variable rates editable where local rules may change.', 'Camera Distance Calculator', 'Estimate camera distance from subject height, focal length, and sensor height.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"distanceM":"subjectHeightM * focalLengthMm / sensorHeightMm"}}', 'published', 97),
  (298, 14, 'Depth Of Field Calculator', 'depth-of-field-calculator', 'Estimate hyperfocal distance from focal length, aperture, and circle of confusion.', 'Estimate hyperfocal distance from focal length, aperture, and circle of confusion. The implementation is original and keeps variable rates editable where local rules may change.', 'Depth Of Field Calculator', 'Estimate hyperfocal distance from focal length, aperture, and circle of confusion.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"hyperfocalMm":"(focalLengthMm ^ 2) / (aperture * circleOfConfusionMm) + focalLengthMm","hyperfocalM":"((focalLengthMm ^ 2) / (aperture * circleOfConfusionMm) + focalLengthMm) / 1000"}}', 'published', 98),
  (299, 9, 'Reaction Test Score Calculator', 'reaction-test-score-calculator', 'Summarize reaction test attempts from average milliseconds.', 'Summarize reaction test attempts from average milliseconds. The implementation is original and keeps variable rates editable where local rules may change.', 'Reaction Test Score Calculator', 'Summarize reaction test attempts from average milliseconds.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"differenceMs":"averageMs - targetMs","score":"max(100 - (averageMs - targetMs) / 5, 0)"}}', 'published', 99),
  (300, 2, 'Effective Annual Rate Calculator', 'effective-annual-rate-calculator', 'Estimate effective annual rate from interest paid and loan principal.', 'Estimate effective annual rate from interest paid and loan principal. The implementation is original and keeps variable rates editable where local rules may change.', 'Effective Annual Rate Calculator', 'Estimate effective annual rate from interest paid and loan principal.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"simpleAnnualRate":"interestPaid / principal * 12 / months * 100"}}', 'published', 100);

INSERT OR IGNORE INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (301, 8, 'Microwave Heating Time Calculator', 'microwave-heating-time-calculator', 'Scale microwave heating time between wattages.', 'Scale microwave heating time between wattages. The implementation is original and keeps variable rates editable where local rules may change.', 'Microwave Heating Time Calculator', 'Scale microwave heating time between wattages.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"adjustedSeconds":"originalSeconds * originalWatts / newWatts","adjustedMinutes":"originalSeconds * originalWatts / newWatts / 60"}}', 'published', 101),
  (302, 11, 'Power Bank Wh Calculator', 'power-bank-wh-calculator', 'Convert battery mAh and voltage to watt-hours.', 'Convert battery mAh and voltage to watt-hours. The implementation is original and keeps variable rates editable where local rules may change.', 'Power Bank Wh Calculator', 'Convert battery mAh and voltage to watt-hours.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"wattHours":"mah * voltage / 1000"}}', 'published', 102),
  (303, 2, 'Shipping Cost Comparison Calculator', 'shipping-cost-comparison-calculator', 'Compare two shipping methods by base fee and weight fee.', 'Compare two shipping methods by base fee and weight fee. The implementation is original and keeps variable rates editable where local rules may change.', 'Shipping Cost Comparison Calculator', 'Compare two shipping methods by base fee and weight fee.', 'Enter the requested inputs.; Keep any editable rule or rate fields aligned with your situation.; Review the result and notes before using the estimate.', 'This calculator uses the displayed inputs in a transparent arithmetic formula. Editable assumptions are provided where rates or rules can vary.', 'Adjust the defaults to match your scenario, then calculate the estimate.', 'This is an estimate for planning and should be checked against official or current rules when money, health, or legal decisions are involved.', 'expression', '{"expressions":{"methodACost":"methodABase + weightKg * methodAPerKg","methodBCost":"methodBBase + weightKg * methodBPerKg","savingsWithB":"methodABase + weightKg * methodAPerKg - methodBBase - weightKg * methodBPerKg"}}', 'published', 103);


INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (201, 'expression', 'Expression', 'text', NULL, '2 + 2 * 5', '2 + 2 * 5', 1, '{}', 1),
  (202, 'expression', 'Expression', 'text', NULL, '(18 + 24) / 3', '(18 + 24) / 3', 1, '{}', 1),
  (203, 'numbers', 'Numbers', 'textarea', NULL, '12
18
21
34', '12
18
21
34', 1, '{}', 1),
  (204, 'expression', 'Expression', 'text', NULL, 'sqrt(144) + pow(2, 8)', 'sqrt(144) + pow(2, 8)', 1, '{}', 1),
  (205, 'expression', 'Expression', 'text', NULL, 'sin(pi / 2) + log10(1000)', 'sin(pi / 2) + log10(1000)', 1, '{}', 1),
  (206, 'netPrice', 'Pre-tax price', 'number', 'USD', '100', '100', 1, '{"min":0,"step":0.01}', 1),
  (206, 'taxRate', 'Tax rate', 'number', '%', '8', '8', 1, '{"min":0,"step":0.01}', 2),
  (207, 'decimalValue', 'Decimal number', 'number', NULL, '255', '255', 1, '{"step":1}', 1),
  (207, 'targetBase', 'Target base', 'select', NULL, NULL, '16', 1, '{"options":["2","8","10","16","36"]}', 2),
  (208, 'revenue', 'Revenue', 'number', 'USD', '150', '150', 1, '{"min":0.01,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (208, 'cost', 'Cost', 'number', 'USD', '90', '90', 1, '{"min":0,"step":0.01}', 2),
  (209, 'startDate', 'Last cycle start date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (209, 'days', 'Days to add', 'number', 'days', '28', '28', 1, '{"step":1}', 2),
  (209, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (210, 'startDate', 'Cycle start date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (210, 'days', 'Days to add', 'number', 'days', '14', '14', 1, '{"step":1}', 2),
  (210, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (211, 'startDate', 'Cycle start date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (211, 'days', 'Days to add', 'number', 'days', '21', '21', 1, '{"step":1}', 2),
  (211, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (212, 'numbers', 'Numbers', 'textarea', NULL, '7, 6, 8, 5, 7', '7, 6, 8, 5, 7', 1, '{}', 1),
  (213, 'startDate', 'Start date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (213, 'days', 'Days to add', 'number', 'days', '280', '280', 1, '{"step":1}', 2),
  (213, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (214, 'prePregnancyWeight', 'Pre-pregnancy weight', 'number', 'kg', '60', '60', 1, '{"min":1,"step":0.01}', 1),
  (214, 'currentWeight', 'Current weight', 'number', 'kg', '68', '68', 1, '{"min":1,"step":0.01}', 2),
  (214, 'targetGainLow', 'Target gain low', 'number', 'kg', '11.5', '11.5', 1, '{"min":0,"step":0.01}', 3),
  (214, 'targetGainHigh', 'Target gain high', 'number', 'kg', '16', '16', 1, '{"min":0,"step":0.01}', 4),
  (215, 'startDate', 'Due date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (215, 'days', 'Days to add', 'number', 'days', '-266', '-266', 1, '{"step":1}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (215, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (216, 'startDate', 'Start date', 'text', NULL, '2026-04-01', '2026-04-01', 1, '{}', 1),
  (216, 'endDate', 'End date', 'text', NULL, '2026-04-30', '2026-04-30', 1, '{}', 2),
  (216, 'holidayCount', 'Extra holidays to subtract', 'number', 'days', '0', '0', 1, '{"min":0,"step":1}', 3),
  (217, 'chronologicalWeeks', 'Chronological age', 'number', 'weeks', '24', '24', 1, '{"min":0,"step":0.01}', 1),
  (217, 'weeksEarly', 'Weeks early', 'number', 'weeks', '8', '8', 1, '{"min":0,"step":0.01}', 2),
  (218, 'startDate', 'Cycle start date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (218, 'days', 'Days to add', 'number', 'days', '28', '28', 1, '{"step":1}', 2),
  (218, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (219, 'waistCm', 'Waist', 'number', 'cm', '72', '72', 1, '{"min":1,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (219, 'hipCm', 'Hip', 'number', 'cm', '96', '96', 1, '{"min":1,"step":0.01}', 2),
  (219, 'heightCm', 'Height', 'number', 'cm', '165', '165', 1, '{"min":1,"step":0.01}', 3),
  (220, 'hotMl', 'Hot water', 'number', 'ml', '120', '120', 1, '{"min":0,"step":0.01}', 1),
  (220, 'hotTemp', 'Hot water temperature', 'number', 'C', '70', '70', 1, '{"min":0,"step":0.01}', 2),
  (220, 'coolMl', 'Cool water', 'number', 'ml', '60', '60', 1, '{"min":0,"step":0.01}', 3),
  (220, 'coolTemp', 'Cool water temperature', 'number', 'C', '25', '25', 1, '{"min":0,"step":0.01}', 4),
  (221, 'startDate', 'Start date', 'text', NULL, '2026-04-01', '2026-04-01', 1, '{}', 1),
  (221, 'endDate', 'End date', 'text', NULL, '2026-04-30', '2026-04-30', 1, '{}', 2),
  (221, 'holidayCount', 'Extra holidays to subtract', 'number', 'days', '0', '0', 1, '{"min":0,"step":1}', 3),
  (222, 'actualAge', 'Actual age', 'number', 'years', '35', '35', 1, '{"min":0,"step":1}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (222, 'roundingAdjustment', 'Rounding adjustment', 'number', 'years', '1', '1', 1, '{"min":0,"step":1}', 2),
  (223, 'startDate', 'Start date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (223, 'days', 'Days to add', 'number', 'days', '30', '30', 1, '{"step":1}', 2),
  (223, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (224, 'startDate', 'Start date', 'text', NULL, '2026-04-01', '2026-04-01', 1, '{}', 1),
  (224, 'endDate', 'End date', 'text', NULL, '2026-04-30', '2026-04-30', 1, '{}', 2),
  (224, 'holidayCount', 'Extra holidays to subtract', 'number', 'days', '0', '0', 1, '{"min":0,"step":1}', 3),
  (225, 'startDate', 'Start date', 'text', NULL, '2026-04-01', '2026-04-01', 1, '{}', 1),
  (225, 'endDate', 'End date', 'text', NULL, '2026-04-30', '2026-04-30', 1, '{}', 2),
  (225, 'holidayCount', 'Extra holidays to subtract', 'number', 'days', '0', '0', 1, '{"min":0,"step":1}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (226, 'workMinutes', 'Active minutes', 'number', 'min', '10', '10', 1, '{"min":0.01,"step":0.5}', 1),
  (226, 'restMinutes', 'Rest minutes', 'number', 'min', '2', '2', 1, '{"min":0,"step":0.5}', 2),
  (226, 'rounds', 'Rounds', 'number', NULL, '3', '3', 1, '{"min":1,"step":1}', 3),
  (227, 'heightA', 'Height A', 'number', 'cm', '175', '175', 1, '{"min":1,"step":0.01}', 1),
  (227, 'heightB', 'Height B', 'number', 'cm', '162', '162', 1, '{"min":1,"step":0.01}', 2),
  (228, 'age', 'Age', 'number', 'years', '35', '35', 1, '{"min":1,"step":1}', 1),
  (228, 'intensityLow', 'Low intensity', 'number', '%', '60', '60', 1, '{"min":0,"step":0.01}', 2),
  (228, 'intensityHigh', 'High intensity', 'number', '%', '80', '80', 1, '{"min":0,"step":0.01}', 3),
  (229, 'met', 'MET value', 'number', NULL, '7', '7', 1, '{"min":0,"step":0.01}', 1),
  (229, 'weightKg', 'Weight', 'number', 'kg', '70', '70', 1, '{"min":1,"step":0.01}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (229, 'minutes', 'Duration', 'number', 'min', '45', '45', 1, '{"min":0,"step":0.01}', 3),
  (230, 'footLengthCm', 'Foot length', 'number', 'cm', '26', '26', 1, '{"min":1,"step":0.01}', 1),
  (231, 'amount', 'Amount', 'number', NULL, '100', '100', 1, '{"min":0,"step":0.01}', 1),
  (231, 'exchangeRate', 'Exchange rate', 'number', NULL, '31.5', '31.5', 1, '{"min":0,"step":0.01}', 2),
  (231, 'feePercent', 'Fee', 'number', '%', '1.5', '1.5', 1, '{"min":0,"step":0.01}', 3),
  (232, 'homeAmount', 'Home currency amount', 'number', NULL, '500', '500', 1, '{"min":0,"step":0.01}', 1),
  (232, 'travelRate', 'Travel exchange rate', 'number', NULL, '4.75', '4.75', 1, '{"min":0,"step":0.01}', 2),
  (232, 'cardFeePercent', 'Card or exchange fee', 'number', '%', '2', '2', 1, '{"min":0,"step":0.01}', 3),
  (233, 'screenInches', 'Screen size', 'number', 'in', '55', '55', 1, '{"min":1,"step":0.01}', 1),
  (233, 'multiplier', 'Distance multiplier', 'number', NULL, '1.6', '1.6', 1, '{"min":0,"step":0.01}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (234, 'text', 'Text', 'textarea', NULL, '#102420
#a8ddd4
#ffffff', '#102420
#a8ddd4
#ffffff', 1, '{}', 1),
  (235, 'widthPixels', 'Width', 'number', 'px', '1920', '1920', 1, '{"min":1,"step":1}', 1),
  (235, 'heightPixels', 'Height', 'number', 'px', '1080', '1080', 1, '{"min":1,"step":1}', 2),
  (235, 'diagonalInches', 'Diagonal', 'number', 'in', '24', '24', 1, '{"min":1,"step":0.01}', 3),
  (236, 'ppm', 'PPM', 'number', 'ppm', '5000', '5000', 1, '{"min":0,"step":0.01}', 1),
  (237, 'text', 'Text', 'textarea', NULL, '繁體中文文字測試
Simplified text sample', '繁體中文文字測試
Simplified text sample', 1, '{}', 1),
  (238, 'distanceKm', 'Trip distance', 'number', 'km', '8', '8', 1, '{"min":0,"step":0.01}', 1),
  (238, 'baseFare', 'Base fare', 'number', 'TWD', '85', '85', 1, '{"min":0,"step":0.01}', 2),
  (238, 'includedKm', 'Included distance', 'number', 'km', '1.25', '1.25', 1, '{"min":0,"step":0.01}', 3),
  (238, 'perKmRate', 'Extra rate', 'number', 'TWD/km', '25', '25', 1, '{"min":0,"step":0.01}', 4);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (238, 'waitingFee', 'Waiting or surcharge', 'number', 'TWD', '0', '0', 1, '{"min":0,"step":0.01}', 5),
  (239, 'distanceKm', 'Trip distance', 'number', 'km', '8', '8', 1, '{"min":0,"step":0.01}', 1),
  (239, 'baseFare', 'Base fare', 'number', 'HKD', '27', '27', 1, '{"min":0,"step":0.01}', 2),
  (239, 'includedKm', 'Included distance', 'number', 'km', '2', '2', 1, '{"min":0,"step":0.01}', 3),
  (239, 'perKmRate', 'Extra rate', 'number', 'HKD/km', '9.5', '9.5', 1, '{"min":0,"step":0.01}', 4),
  (239, 'surcharge', 'Surcharge', 'number', 'HKD', '0', '0', 1, '{"min":0,"step":0.01}', 5),
  (240, 'distance', 'Distance', 'number', 'km', '100', '100', 1, '{"min":0,"step":0.01}', 1),
  (240, 'hours', 'Time', 'number', 'hr', '2', '2', 1, '{"min":0.01,"step":0.01}', 2),
  (241, 'engineRpm', 'Engine RPM', 'number', 'rpm', '2500', '2500', 1, '{"min":0,"step":0.01}', 1),
  (241, 'gearRatio', 'Gear ratio', 'number', NULL, '3.5', '3.5', 1, '{"min":0,"step":0.01}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (241, 'finalDrive', 'Final drive', 'number', NULL, '4.1', '4.1', 1, '{"min":0,"step":0.01}', 3),
  (242, 'widthMm', 'Width', 'number', 'mm', '225', '225', 1, '{"min":1,"step":0.01}', 1),
  (242, 'aspectPercent', 'Aspect ratio', 'number', '%', '45', '45', 1, '{"min":1,"step":0.01}', 2),
  (242, 'rimInches', 'Rim', 'number', 'in', '17', '17', 1, '{"min":1,"step":0.01}', 3),
  (243, 'liters', 'Fuel volume', 'number', 'L', '45', '45', 1, '{"min":0,"step":0.01}', 1),
  (243, 'oldPrice', 'Old price', 'number', 'per L', '30', '30', 1, '{"min":0,"step":0.01}', 2),
  (243, 'newPrice', 'New price', 'number', 'per L', '31.5', '31.5', 1, '{"min":0,"step":0.01}', 3),
  (244, 'kwh', 'Usage', 'number', 'kWh', '300', '300', 1, '{"min":0,"step":0.01}', 1),
  (244, 'rate', 'Rate', 'number', 'USD/kWh', '0.15', '0.15', 1, '{"min":0,"step":0.01}', 2),
  (244, 'fixedFee', 'Fixed fee', 'number', 'USD', '10', '10', 1, '{"min":0,"step":0.01}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (245, 'text', 'Text', 'textarea', NULL, 'Paste your article here.', 'Paste your article here.', 1, '{}', 1),
  (246, 'areaSqFt', 'Room area', 'number', 'sq ft', '250', '250', 1, '{"min":1,"step":0.01}', 1),
  (246, 'btuPerSqFt', 'BTU per sq ft', 'number', NULL, '25', '25', 1, '{"min":1,"step":0.01}', 2),
  (247, 'watts', 'Power', 'number', 'W', '1200', '1200', 1, '{"min":0,"step":0.01}', 1),
  (247, 'hoursPerDay', 'Hours per day', 'number', 'hr', '8', '8', 1, '{"min":0,"step":0.01}', 2),
  (247, 'days', 'Days', 'number', NULL, '30', '30', 1, '{"min":0,"step":0.01}', 3),
  (247, 'rate', 'Electricity rate', 'number', 'USD/kWh', '0.15', '0.15', 1, '{"min":0,"step":0.01}', 4),
  (248, 'value', 'Value', 'number', NULL, '100', '100', 1, '{"min":0,"step":0.01}', 1),
  (249, 'balance', 'Balance', 'number', 'USD', '3000', '3000', 1, '{"min":0,"step":0.01}', 1),
  (249, 'monthlyPayment', 'Monthly payment', 'number', 'USD', '200', '200', 1, '{"min":0.01,"step":0.01}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (250, 'vehiclePrice', 'Vehicle price', 'number', 'USD', '25000', '25000', 1, '{"min":0,"step":0.01}', 1),
  (250, 'taxPercent', 'Tax', 'number', '%', '8', '8', 1, '{"min":0,"step":0.01}', 2),
  (250, 'fees', 'Fees', 'number', 'USD', '1200', '1200', 1, '{"min":0,"step":0.01}', 3),
  (251, 'firstWeek', 'First week saving', 'number', 'USD', '10', '10', 1, '{"min":0,"step":0.01}', 1),
  (251, 'weeklyIncrease', 'Weekly increase', 'number', 'USD', '10', '10', 1, '{"min":0,"step":0.01}', 2),
  (251, 'weeks', 'Weeks', 'number', NULL, '52', '52', 1, '{"min":1,"step":1}', 3),
  (252, 'frontTeeth', 'Front teeth', 'number', NULL, '50', '50', 1, '{"min":1,"step":1}', 1),
  (252, 'rearTeeth', 'Rear teeth', 'number', NULL, '17', '17', 1, '{"min":1,"step":1}', 2),
  (252, 'wheelInches', 'Wheel diameter', 'number', 'in', '27', '27', 1, '{"min":1,"step":0.01}', 3),
  (253, 'items', 'Items', 'textarea', NULL, 'Alice
Bob
Charlie
Dana', 'Alice
Bob
Charlie
Dana', 1, '{}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (253, 'pickCount', 'Number to pick', 'number', NULL, '1', '1', 1, '{"min":1,"step":1}', 2),
  (253, 'seed', 'Seed', 'text', NULL, 'today', 'today', 1, '{}', 3),
  (254, 'distanceKm', 'Distance', 'number', 'km', '25', '25', 1, '{"min":0,"step":0.01}', 1),
  (254, 'averageSpeedKph', 'Average speed', 'number', 'km/h', '40', '40', 1, '{"min":0.01,"step":0.01}', 2),
  (255, 'lengthCm', 'Length', 'number', 'cm', '60', '60', 1, '{"min":0,"step":0.01}', 1),
  (255, 'widthCm', 'Width', 'number', 'cm', '30', '30', 1, '{"min":0,"step":0.01}', 2),
  (255, 'heightCm', 'Height', 'number', 'cm', '36', '36', 1, '{"min":0,"step":0.01}', 3),
  (256, 'weightKg', 'Weight', 'number', 'kg', '70', '70', 1, '{"min":1,"step":0.01}', 1),
  (256, 'mlPerKg', 'Milliliters per kg', 'number', 'ml/kg', '35', '35', 1, '{"min":0,"step":0.01}', 2),
  (257, 'diameterCm', 'Diameter', 'number', 'cm', '8', '8', 1, '{"min":0,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (257, 'heightCm', 'Height', 'number', 'cm', '10', '10', 1, '{"min":0,"step":0.01}', 2),
  (258, 'waist', 'Waist', 'number', 'cm', '72', '72', 1, '{"min":1,"step":0.01}', 1),
  (258, 'hip', 'Hip', 'number', 'cm', '96', '96', 1, '{"min":1,"step":0.01}', 2),
  (259, 'oldPayment', 'Old monthly payment', 'number', 'USD', '2200', '2200', 1, '{"min":0,"step":0.01}', 1),
  (259, 'newPayment', 'New monthly payment', 'number', 'USD', '1900', '1900', 1, '{"min":0,"step":0.01}', 2),
  (259, 'closingCosts', 'Closing costs', 'number', 'USD', '4500', '4500', 1, '{"min":0,"step":0.01}', 3),
  (260, 'loanAmount', 'Loan amount', 'number', 'USD', '300000', '300000', 1, '{"min":0,"step":0.01}', 1),
  (260, 'annualRate', 'Annual rate', 'number', '%', '6', '6', 1, '{"min":0,"step":0.01}', 2),
  (260, 'graceMonths', 'Grace period', 'number', 'months', '12', '12', 1, '{"min":0,"step":1}', 3),
  (261, 'monthlyContribution', 'Monthly contribution', 'number', 'USD', '1000', '1000', 1, '{"min":0,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (261, 'members', 'Members', 'number', NULL, '12', '12', 1, '{"min":1,"step":1}', 2),
  (261, 'bidDiscount', 'Bid discount', 'number', 'USD', '120', '120', 1, '{"min":0,"step":0.01}', 3),
  (262, 'previousClose', 'Previous close', 'number', 'USD', '100', '100', 1, '{"min":0,"step":0.01}', 1),
  (262, 'limitPercent', 'Limit', 'number', '%', '10', '10', 1, '{"min":0,"step":0.01}', 2),
  (263, 'buyPrice', 'Buy price', 'number', 'USD', '50', '50', 1, '{"min":0,"step":0.01}', 1),
  (263, 'sellPrice', 'Sell price', 'number', 'USD', '58', '58', 1, '{"min":0,"step":0.01}', 2),
  (263, 'shares', 'Shares', 'number', NULL, '100', '100', 1, '{"min":1,"step":1}', 3),
  (263, 'fees', 'Fees', 'number', 'USD', '10', '10', 1, '{"min":0,"step":0.01}', 4),
  (264, 'price', 'Price', 'number', 'USD', '100', '100', 1, '{"min":0,"step":0.01}', 1),
  (264, 'cashDividend', 'Cash dividend', 'number', 'USD', '2', '2', 1, '{"min":0,"step":0.01}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (264, 'stockDividendPercent', 'Stock dividend', 'number', '%', '5', '5', 1, '{"min":0,"step":0.01}', 3),
  (265, 'earnedRuns', 'Earned runs', 'number', NULL, '12', '12', 1, '{"min":0,"step":1}', 1),
  (265, 'inningsPitched', 'Innings pitched', 'number', NULL, '45', '45', 1, '{"min":0.01,"step":0.01}', 2),
  (266, 'hits', 'Hits', 'number', NULL, '42', '42', 1, '{"min":0,"step":1}', 1),
  (266, 'atBats', 'At-bats', 'number', NULL, '130', '130', 1, '{"min":1,"step":1}', 2),
  (267, 'weightKg', 'Weight', 'number', 'kg', '70', '70', 1, '{"min":1,"step":0.01}', 1),
  (267, 'distanceKm', 'Distance', 'number', 'km', '10', '10', 1, '{"min":0,"step":0.01}', 2),
  (268, 'standardDrinks', 'Standard drinks', 'number', NULL, '2', '2', 1, '{"min":0,"step":0.01}', 1),
  (268, 'alcoholGramsPerDrink', 'Alcohol per drink', 'number', 'g', '14', '14', 1, '{"min":0,"step":0.01}', 2),
  (268, 'weightKg', 'Weight', 'number', 'kg', '70', '70', 1, '{"min":1,"step":0.01}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (268, 'bodyWaterRatio', 'Body water ratio', 'number', NULL, '0.68', '0.68', 1, '{"min":0,"step":0.01}', 4),
  (268, 'hours', 'Hours since first drink', 'number', 'hr', '2', '2', 1, '{"min":0,"step":0.01}', 5),
  (268, 'metabolismPerHour', 'Metabolism per hour', 'number', '%', '0.015', '0.015', 1, '{"min":0,"step":0.01}', 6),
  (269, 'monthlyMortgage', 'Mortgage', 'number', 'USD', '2200', '2200', 1, '{"min":0,"step":0.01}', 1),
  (269, 'monthlyOwnerCosts', 'Other owner costs', 'number', 'USD', '600', '600', 1, '{"min":0,"step":0.01}', 2),
  (269, 'monthlyRent', 'Rent', 'number', 'USD', '2100', '2100', 1, '{"min":0,"step":0.01}', 3),
  (269, 'renterCosts', 'Other renter costs', 'number', 'USD', '100', '100', 1, '{"min":0,"step":0.01}', 4),
  (270, 'workMinutes', 'Active minutes', 'number', 'min', '1', '1', 1, '{"min":0.01,"step":0.5}', 1),
  (270, 'restMinutes', 'Rest minutes', 'number', 'min', '1', '1', 1, '{"min":0,"step":0.5}', 2),
  (270, 'rounds', 'Rounds', 'number', NULL, '10', '10', 1, '{"min":1,"step":1}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (271, 'workMinutes', 'Active minutes', 'number', 'min', '5', '5', 1, '{"min":0.01,"step":0.5}', 1),
  (271, 'restMinutes', 'Rest minutes', 'number', 'min', '1', '1', 1, '{"min":0,"step":0.5}', 2),
  (271, 'rounds', 'Rounds', 'number', NULL, '3', '3', 1, '{"min":1,"step":1}', 3),
  (272, 'workMinutes', 'Active minutes', 'number', 'min', '0.5', '0.5', 1, '{"min":0.01,"step":0.5}', 1),
  (272, 'restMinutes', 'Rest minutes', 'number', 'min', '0.1', '0.1', 1, '{"min":0,"step":0.5}', 2),
  (272, 'rounds', 'Rounds', 'number', NULL, '10', '10', 1, '{"min":1,"step":1}', 3),
  (273, 'dogYears', 'Dog age', 'number', 'years', '5', '5', 1, '{"min":0,"step":0.01}', 1),
  (273, 'firstYearFactor', 'First-year factor', 'number', NULL, '15', '15', 1, '{"min":0,"step":0.01}', 2),
  (273, 'laterYearFactor', 'Later-year factor', 'number', NULL, '5', '5', 1, '{"min":0,"step":0.01}', 3),
  (274, 'startDate', 'Breeding date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (274, 'days', 'Days to add', 'number', 'days', '63', '63', 1, '{"step":1}', 2),
  (274, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (275, 'catYears', 'Cat age', 'number', 'years', '4', '4', 1, '{"min":0,"step":0.01}', 1),
  (275, 'firstYearFactor', 'First-year factor', 'number', NULL, '15', '15', 1, '{"min":0,"step":0.01}', 2),
  (275, 'laterYearFactor', 'Later-year factor', 'number', NULL, '4', '4', 1, '{"min":0,"step":0.01}', 3),
  (276, 'startDate', 'Breeding date', 'text', NULL, '2026-04-12', '2026-04-12', 1, '{}', 1),
  (276, 'days', 'Days to add', 'number', 'days', '64', '64', 1, '{"step":1}', 2),
  (276, 'months', 'Months to add', 'number', 'months', '0', '0', 1, '{"step":1}', 3),
  (277, 'partA', 'Part A', 'number', NULL, '16', '16', 1, '{"min":0,"step":0.01}', 1),
  (277, 'partB', 'Part B', 'number', NULL, '9', '9', 1, '{"min":0,"step":0.01}', 2);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (277, 'scaleTo', 'Scale total to', 'number', NULL, '100', '100', 1, '{"min":0,"step":0.01}', 3),
  (278, 'currentCount', 'Current count', 'number', NULL, '12', '12', 1, '{"min":0,"step":1}', 1),
  (278, 'step', 'Step', 'number', NULL, '1', '1', 1, '{"min":0,"step":1}', 2),
  (279, 'packsPerDay', 'Packs per day', 'number', NULL, '1', '1', 1, '{"min":0,"step":0.01}', 1),
  (279, 'pricePerPack', 'Price per pack', 'number', 'USD', '8', '8', 1, '{"min":0,"step":0.01}', 2),
  (280, 'drinksPerWeek', 'Drinks per week', 'number', NULL, '4', '4', 1, '{"min":0,"step":0.01}', 1),
  (280, 'pricePerDrink', 'Price per drink', 'number', 'USD', '9', '9', 1, '{"min":0,"step":0.01}', 2),
  (281, 'workMinutes', 'Active minutes', 'number', 'min', '30', '30', 1, '{"min":0.01,"step":0.5}', 1),
  (281, 'restMinutes', 'Rest minutes', 'number', 'min', '0', '0', 1, '{"min":0,"step":0.5}', 2),
  (281, 'rounds', 'Rounds', 'number', NULL, '1', '1', 1, '{"min":1,"step":1}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (282, 'workMinutes', 'Active minutes', 'number', 'min', '10', '10', 1, '{"min":0.01,"step":0.5}', 1),
  (282, 'restMinutes', 'Rest minutes', 'number', 'min', '2', '2', 1, '{"min":0,"step":0.5}', 2),
  (282, 'rounds', 'Rounds', 'number', NULL, '3', '3', 1, '{"min":1,"step":1}', 3),
  (283, 'workMinutes', 'Active minutes', 'number', 'min', '1', '1', 1, '{"min":0.01,"step":0.5}', 1),
  (283, 'restMinutes', 'Rest minutes', 'number', 'min', '59', '59', 1, '{"min":0,"step":0.5}', 2),
  (283, 'rounds', 'Rounds', 'number', NULL, '4', '4', 1, '{"min":1,"step":1}', 3),
  (284, 'workMinutes', 'Active minutes', 'number', 'min', '25', '25', 1, '{"min":0.01,"step":0.5}', 1),
  (284, 'restMinutes', 'Rest minutes', 'number', 'min', '5', '5', 1, '{"min":0,"step":0.5}', 2),
  (284, 'rounds', 'Rounds', 'number', NULL, '4', '4', 1, '{"min":1,"step":1}', 3),
  (285, 'text', 'Text', 'textarea', NULL, 'https://youtu.be/example
Alarm at 07:30', 'https://youtu.be/example
Alarm at 07:30', 1, '{}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (286, 'text', 'Text', 'textarea', NULL, 'https://youtu.be/one
https://youtu.be/two', 'https://youtu.be/one
https://youtu.be/two', 1, '{}', 1),
  (287, 'text', 'Text', 'textarea', NULL, '2026-04-12 Project note', '2026-04-12 Project note', 1, '{}', 1),
  (288, 'areaSqM', 'Area', 'number', 'm2', '12', '12', 1, '{"min":0,"step":0.01}', 1),
  (288, 'tileWidthCm', 'Tile width', 'number', 'cm', '30', '30', 1, '{"min":0,"step":0.01}', 2),
  (288, 'tileHeightCm', 'Tile height', 'number', 'cm', '30', '30', 1, '{"min":0,"step":0.01}', 3),
  (288, 'wastePercent', 'Waste', 'number', '%', '10', '10', 1, '{"min":0,"step":0.01}', 4),
  (289, 'cycles', 'Sleep cycles', 'number', NULL, '5', '5', 1, '{"min":1,"step":1}', 1),
  (289, 'minutesPerCycle', 'Minutes per cycle', 'number', 'min', '90', '90', 1, '{"min":1,"step":0.01}', 2),
  (289, 'fallAsleepMinutes', 'Time to fall asleep', 'number', 'min', '15', '15', 1, '{"min":0,"step":0.01}', 3),
  (290, 'sunriseHour', 'Sunrise', 'number', 'hour', '6.25', '6.25', 1, '{"min":0,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (290, 'sunsetHour', 'Sunset', 'number', 'hour', '18.5', '18.5', 1, '{"min":0,"step":0.01}', 2),
  (291, 'originalTotal', 'Original total', 'number', 'USD', '300', '300', 1, '{"min":0,"step":0.01}', 1),
  (291, 'discountAmount', 'Discount amount', 'number', 'USD', '50', '50', 1, '{"min":0,"step":0.01}', 2),
  (292, 'firstDay', 'First day saving', 'number', 'USD', '1', '1', 1, '{"min":0,"step":0.01}', 1),
  (292, 'dailyIncrease', 'Daily increase', 'number', 'USD', '1', '1', 1, '{"min":0,"step":0.01}', 2),
  (292, 'days', 'Days', 'number', NULL, '365', '365', 1, '{"min":1,"step":1}', 3),
  (293, 'parentAHeight', 'Parent A height', 'number', 'cm', '175', '175', 1, '{"min":1,"step":0.01}', 1),
  (293, 'parentBHeight', 'Parent B height', 'number', 'cm', '162', '162', 1, '{"min":1,"step":0.01}', 2),
  (293, 'sexOffset', 'Sex offset', 'number', 'cm', '6.5', '6.5', 1, '{"step":0.01}', 3),
  (294, 'minutesParked', 'Minutes parked', 'number', 'min', '135', '135', 1, '{"min":0,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (294, 'freeMinutes', 'Free minutes', 'number', 'min', '30', '30', 1, '{"min":0,"step":0.01}', 2),
  (294, 'hourlyRate', 'Hourly rate', 'number', 'USD/hr', '3', '3', 1, '{"min":0,"step":0.01}', 3),
  (294, 'dailyCap', 'Daily cap', 'number', 'USD', '20', '20', 1, '{"min":0,"step":0.01}', 4),
  (295, 'wallet', 'Wallet', 'number', 'USD', '20', '20', 1, '{"min":0,"step":0.01}', 1),
  (295, 'drawer', 'Drawer', 'number', 'USD', '35', '35', 1, '{"min":0,"step":0.01}', 2),
  (295, 'emergencyFund', 'Emergency fund', 'number', 'USD', '150', '150', 1, '{"min":0,"step":0.01}', 3),
  (296, 'batteryKwhAdded', 'Energy added', 'number', 'kWh', '45', '45', 1, '{"min":0,"step":0.01}', 1),
  (296, 'pricePerKwh', 'Price', 'number', 'USD/kWh', '0.28', '0.28', 1, '{"min":0,"step":0.01}', 2),
  (296, 'kmPerKwh', 'Efficiency', 'number', 'km/kWh', '6', '6', 1, '{"min":0,"step":0.01}', 3),
  (297, 'subjectHeightM', 'Subject height', 'number', 'm', '1.7', '1.7', 1, '{"min":0,"step":0.01}', 1);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (297, 'focalLengthMm', 'Focal length', 'number', 'mm', '50', '50', 1, '{"min":0,"step":0.01}', 2),
  (297, 'sensorHeightMm', 'Sensor height', 'number', 'mm', '24', '24', 1, '{"min":0,"step":0.01}', 3),
  (298, 'focalLengthMm', 'Focal length', 'number', 'mm', '50', '50', 1, '{"min":0,"step":0.01}', 1),
  (298, 'aperture', 'Aperture f-number', 'number', NULL, '8', '8', 1, '{"min":0,"step":0.01}', 2),
  (298, 'circleOfConfusionMm', 'Circle of confusion', 'number', 'mm', '0.03', '0.03', 1, '{"min":0,"step":0.01}', 3),
  (299, 'averageMs', 'Average reaction', 'number', 'ms', '250', '250', 1, '{"min":0,"step":0.01}', 1),
  (299, 'targetMs', 'Target reaction', 'number', 'ms', '200', '200', 1, '{"min":0,"step":0.01}', 2),
  (300, 'interestPaid', 'Interest paid', 'number', 'USD', '600', '600', 1, '{"min":0,"step":0.01}', 1),
  (300, 'principal', 'Principal', 'number', 'USD', '10000', '10000', 1, '{"min":0,"step":0.01}', 2),
  (300, 'months', 'Months', 'number', NULL, '12', '12', 1, '{"min":1,"step":1}', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (301, 'originalSeconds', 'Original time', 'number', 'sec', '120', '120', 1, '{"min":0,"step":0.01}', 1),
  (301, 'originalWatts', 'Original watts', 'number', 'W', '1000', '1000', 1, '{"min":1,"step":0.01}', 2),
  (301, 'newWatts', 'New watts', 'number', 'W', '700', '700', 1, '{"min":1,"step":0.01}', 3),
  (302, 'mah', 'Capacity', 'number', 'mAh', '30000', '30000', 1, '{"min":0,"step":0.01}', 1),
  (302, 'voltage', 'Voltage', 'number', 'V', '3.7', '3.7', 1, '{"min":0,"step":0.01}', 2),
  (303, 'weightKg', 'Package weight', 'number', 'kg', '3', '3', 1, '{"min":0,"step":0.01}', 1),
  (303, 'methodABase', 'Method A base', 'number', 'USD', '5', '5', 1, '{"min":0,"step":0.01}', 2),
  (303, 'methodAPerKg', 'Method A per kg', 'number', 'USD/kg', '2', '2', 1, '{"min":0,"step":0.01}', 3),
  (303, 'methodBBase', 'Method B base', 'number', 'USD', '8', '8', 1, '{"min":0,"step":0.01}', 4),
  (303, 'methodBPerKg', 'Method B per kg', 'number', 'USD/kg', '1.2', '1.2', 1, '{"min":0,"step":0.01}', 5);


INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (201, 'value', 'Value', 'number', 2, NULL, 1),
  (202, 'value', 'Value', 'number', 2, NULL, 1),
  (203, 'itemCount', 'Count', 'number', 0, NULL, 1),
  (203, 'sum', 'Sum', 'number', 2, NULL, 2),
  (203, 'average', 'Average', 'number', 2, NULL, 3),
  (203, 'minimum', 'Minimum', 'number', 2, NULL, 4),
  (203, 'maximum', 'Maximum', 'number', 2, NULL, 5),
  (204, 'value', 'Value', 'number', 2, NULL, 1),
  (205, 'value', 'Value', 'number', 2, NULL, 1),
  (206, 'taxAmount', 'Tax amount', 'currency', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (206, 'grossPrice', 'Tax-inclusive total', 'currency', 2, NULL, 2),
  (207, 'convertedValue', 'Converted value', 'text', 0, NULL, 1),
  (207, 'decimalValue', 'Decimal value', 'number', 0, NULL, 2),
  (208, 'grossProfit', 'Gross profit', 'currency', 2, NULL, 1),
  (208, 'marginPercent', 'Margin', 'percent', 2, NULL, 2),
  (208, 'markupPercent', 'Markup', 'percent', 2, NULL, 3),
  (209, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (209, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (210, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (210, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (211, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (211, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (212, 'itemCount', 'Count', 'number', 0, NULL, 1),
  (212, 'sum', 'Sum', 'number', 2, NULL, 2),
  (212, 'average', 'Average', 'number', 2, NULL, 3),
  (212, 'minimum', 'Minimum', 'number', 2, NULL, 4),
  (212, 'maximum', 'Maximum', 'number', 2, NULL, 5),
  (213, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (213, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (214, 'currentGain', 'Current gain', 'number', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (214, 'remainingToLow', 'Remaining to low target', 'number', 2, NULL, 2),
  (214, 'remainingToHigh', 'Remaining to high target', 'number', 2, NULL, 3),
  (215, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (215, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (216, 'calendarDays', 'Calendar days', 'number', 0, NULL, 1),
  (216, 'weekdays', 'Weekdays before holiday adjustment', 'number', 0, NULL, 2),
  (216, 'workdays', 'Estimated workdays', 'number', 0, NULL, 3),
  (217, 'correctedWeeks', 'Corrected age', 'number', 2, NULL, 1),
  (217, 'correctedMonthsApprox', 'Corrected months', 'number', 2, NULL, 2),
  (218, 'resultDate', 'Result date', 'text', 0, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (218, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (219, 'waistHipRatio', 'Waist-to-hip ratio', 'number', 2, NULL, 1),
  (219, 'waistHeightRatio', 'Waist-to-height ratio', 'number', 2, NULL, 2),
  (220, 'mixedTemperature', 'Estimated mixed temperature', 'number', 2, NULL, 1),
  (220, 'totalVolume', 'Total volume', 'number', 2, NULL, 2),
  (221, 'calendarDays', 'Calendar days', 'number', 0, NULL, 1),
  (221, 'weekdays', 'Weekdays before holiday adjustment', 'number', 0, NULL, 2),
  (221, 'workdays', 'Estimated workdays', 'number', 0, NULL, 3),
  (222, 'insuranceAge', 'Insurance age', 'number', 0, NULL, 1),
  (223, 'resultDate', 'Result date', 'text', 0, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (223, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (224, 'calendarDays', 'Calendar days', 'number', 0, NULL, 1),
  (224, 'weekdays', 'Weekdays before holiday adjustment', 'number', 0, NULL, 2),
  (224, 'workdays', 'Estimated workdays', 'number', 0, NULL, 3),
  (225, 'calendarDays', 'Calendar days', 'number', 0, NULL, 1),
  (225, 'weekdays', 'Weekdays before holiday adjustment', 'number', 0, NULL, 2),
  (225, 'workdays', 'Estimated workdays', 'number', 0, NULL, 3),
  (226, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (226, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (226, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (226, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (227, 'heightDifference', 'Height difference', 'number', 2, NULL, 1),
  (227, 'heightRatio', 'Height ratio', 'number', 2, NULL, 2),
  (228, 'maxHeartRate', 'Estimated max heart rate', 'number', 0, NULL, 1),
  (228, 'lowTarget', 'Low target bpm', 'number', 0, NULL, 2),
  (228, 'highTarget', 'High target bpm', 'number', 0, NULL, 3),
  (229, 'caloriesBurned', 'Calories burned', 'number', 0, NULL, 1),
  (230, 'euSizeApprox', 'EU size estimate', 'number', 2, NULL, 1),
  (230, 'usMenApprox', 'US men estimate', 'number', 2, NULL, 2),
  (230, 'usWomenApprox', 'US women estimate', 'number', 2, NULL, 3);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (231, 'convertedAmount', 'Converted amount', 'currency', 2, NULL, 1),
  (231, 'feeAmount', 'Fee amount', 'currency', 2, NULL, 2),
  (232, 'destinationAmount', 'Destination amount', 'number', 2, NULL, 1),
  (232, 'feeValue', 'Fee value', 'number', 2, NULL, 2),
  (233, 'viewingDistanceInches', 'Viewing distance', 'number', 2, NULL, 1),
  (233, 'viewingDistanceFeet', 'Viewing distance feet', 'number', 2, NULL, 2),
  (234, 'characters', 'Characters', 'number', 0, NULL, 1),
  (234, 'charactersNoSpaces', 'Characters without spaces', 'number', 0, NULL, 2),
  (234, 'words', 'Words', 'number', 0, NULL, 3),
  (234, 'lines', 'Lines', 'number', 0, NULL, 4);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (235, 'ppi', 'PPI', 'number', 2, NULL, 1),
  (236, 'percent', 'Percent', 'percent', 4, NULL, 1),
  (236, 'decimal', 'Decimal', 'number', 6, NULL, 2),
  (237, 'characters', 'Characters', 'number', 0, NULL, 1),
  (237, 'charactersNoSpaces', 'Characters without spaces', 'number', 0, NULL, 2),
  (237, 'words', 'Words', 'number', 0, NULL, 3),
  (237, 'lines', 'Lines', 'number', 0, NULL, 4),
  (238, 'estimatedFare', 'Estimated fare', 'number', 0, NULL, 1),
  (239, 'estimatedFare', 'Estimated fare', 'number', 0, NULL, 1),
  (240, 'speed', 'Speed km/h', 'number', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (240, 'minutesPerKm', 'Minutes per km', 'number', 2, NULL, 2),
  (241, 'wheelRpm', 'Wheel RPM', 'number', 2, NULL, 1),
  (242, 'sidewallMm', 'Sidewall', 'number', 2, NULL, 1),
  (242, 'diameterMm', 'Diameter', 'number', 2, NULL, 2),
  (243, 'oldCost', 'Old cost', 'currency', 2, NULL, 1),
  (243, 'newCost', 'New cost', 'currency', 2, NULL, 2),
  (243, 'costChange', 'Change', 'currency', 2, NULL, 3),
  (244, 'energyCost', 'Energy cost', 'currency', 2, NULL, 1),
  (244, 'totalCost', 'Total cost', 'currency', 2, NULL, 2),
  (245, 'characters', 'Characters', 'number', 0, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (245, 'charactersNoSpaces', 'Characters without spaces', 'number', 0, NULL, 2),
  (245, 'words', 'Words', 'number', 0, NULL, 3),
  (245, 'lines', 'Lines', 'number', 0, NULL, 4),
  (246, 'requiredBtu', 'Required BTU', 'number', 0, NULL, 1),
  (246, 'tonsApprox', 'Cooling tons', 'number', 2, NULL, 2),
  (247, 'kwh', 'Energy use', 'number', 2, NULL, 1),
  (247, 'cost', 'Cost', 'currency', 2, NULL, 2),
  (248, 'largerPart', 'Value x phi', 'number', 2, NULL, 1),
  (248, 'smallerPart', 'Value x 0.618', 'number', 2, NULL, 2),
  (249, 'monthsNoInterest', 'Months before interest', 'number', 1, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (249, 'totalPaidNoInterest', 'Total scheduled payments', 'currency', 2, NULL, 2),
  (250, 'taxAmount', 'Tax', 'currency', 2, NULL, 1),
  (250, 'outTheDoor', 'Out-the-door total', 'currency', 2, NULL, 2),
  (251, 'totalSaved', 'Total saved', 'currency', 2, NULL, 1),
  (251, 'finalWeekAmount', 'Final week amount', 'currency', 2, NULL, 2),
  (252, 'gearRatio', 'Gear ratio', 'number', 2, NULL, 1),
  (252, 'gearInches', 'Gear inches', 'number', 2, NULL, 2),
  (253, 'itemCount', 'Items entered', 'number', 0, NULL, 1),
  (253, 'pickedCount', 'Items picked', 'number', 0, NULL, 2),
  (253, 'pickedItems', 'Picked items', 'text', 0, NULL, 3);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (254, 'travelHours', 'Travel hours', 'number', 2, NULL, 1),
  (254, 'travelMinutes', 'Travel minutes', 'number', 2, NULL, 2),
  (255, 'liters', 'Liters', 'number', 2, NULL, 1),
  (255, 'gallons', 'US gallons', 'number', 2, NULL, 2),
  (256, 'dailyMl', 'Daily ml', 'number', 0, NULL, 1),
  (256, 'dailyLiters', 'Daily liters', 'number', 2, NULL, 2),
  (257, 'volumeMl', 'Volume ml', 'number', 2, NULL, 1),
  (257, 'volumeOz', 'Fluid ounces', 'number', 2, NULL, 2),
  (258, 'waistHipRatio', 'Waist-to-hip ratio', 'number', 2, NULL, 1),
  (259, 'monthlySavings', 'Monthly savings', 'currency', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (259, 'breakEvenMonths', 'Break-even months', 'number', 2, NULL, 2),
  (260, 'interestDuringGrace', 'Interest during grace', 'currency', 2, NULL, 1),
  (261, 'potBeforeDiscount', 'Pot before discount', 'currency', 2, NULL, 1),
  (261, 'receivedAmount', 'Received amount', 'currency', 2, NULL, 2),
  (261, 'discountPercent', 'Discount percent', 'percent', 2, NULL, 3),
  (262, 'limitUp', 'Limit up', 'currency', 2, NULL, 1),
  (262, 'limitDown', 'Limit down', 'currency', 2, NULL, 2),
  (263, 'profitLoss', 'Profit / loss', 'currency', 2, NULL, 1),
  (263, 'returnPercent', 'Return', 'percent', 2, NULL, 2),
  (264, 'adjustedPrice', 'Adjusted price', 'currency', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (265, 'era', 'ERA', 'number', 2, NULL, 1),
  (266, 'battingAverage', 'Batting average', 'number', 3, NULL, 1),
  (267, 'calories', 'Calories', 'number', 0, NULL, 1),
  (268, 'bacPercent', 'Estimated BAC', 'percent', 3, NULL, 1),
  (269, 'owningCost', 'Owning cost', 'currency', 2, NULL, 1),
  (269, 'rentingCost', 'Renting cost', 'currency', 2, NULL, 2),
  (269, 'monthlyDifference', 'Owning minus renting', 'currency', 2, NULL, 3),
  (270, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (270, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (270, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (270, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (271, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (271, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (271, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3),
  (271, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (272, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (272, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (272, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3),
  (272, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (273, 'humanYearsApprox', 'Approximate human years', 'number', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (274, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (274, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (275, 'humanYearsApprox', 'Approximate human years', 'number', 2, NULL, 1),
  (276, 'resultDate', 'Result date', 'text', 0, NULL, 1),
  (276, 'daysChanged', 'Total days changed', 'number', 0, NULL, 2),
  (277, 'ratio', 'Ratio A/B', 'number', 2, NULL, 1),
  (277, 'scaledA', 'Scaled A', 'number', 2, NULL, 2),
  (277, 'scaledB', 'Scaled B', 'number', 2, NULL, 3),
  (278, 'nextCount', 'Next count', 'number', 0, NULL, 1),
  (278, 'previousCount', 'Previous count', 'number', 0, NULL, 2);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (279, 'dailyCost', 'Daily cost', 'currency', 2, NULL, 1),
  (279, 'monthlyCost', 'Monthly cost', 'currency', 2, NULL, 2),
  (279, 'yearlyCost', 'Yearly cost', 'currency', 2, NULL, 3),
  (280, 'weeklyCost', 'Weekly cost', 'currency', 2, NULL, 1),
  (280, 'monthlyCost', 'Monthly cost', 'currency', 2, NULL, 2),
  (280, 'yearlyCost', 'Yearly cost', 'currency', 2, NULL, 3),
  (281, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (281, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (281, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3),
  (281, 'totalHours', 'Total hours', 'number', 2, NULL, 4);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (282, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (282, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (282, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3),
  (282, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (283, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (283, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2),
  (283, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3),
  (283, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (284, 'totalWorkMinutes', 'Active minutes', 'number', 2, NULL, 1),
  (284, 'totalRestMinutes', 'Rest minutes', 'number', 2, NULL, 2);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (284, 'totalMinutes', 'Total minutes', 'number', 2, NULL, 3),
  (284, 'totalHours', 'Total hours', 'number', 2, NULL, 4),
  (285, 'characters', 'Characters', 'number', 0, NULL, 1),
  (285, 'charactersNoSpaces', 'Characters without spaces', 'number', 0, NULL, 2),
  (285, 'words', 'Words', 'number', 0, NULL, 3),
  (285, 'lines', 'Lines', 'number', 0, NULL, 4),
  (286, 'characters', 'Characters', 'number', 0, NULL, 1),
  (286, 'charactersNoSpaces', 'Characters without spaces', 'number', 0, NULL, 2),
  (286, 'words', 'Words', 'number', 0, NULL, 3),
  (286, 'lines', 'Lines', 'number', 0, NULL, 4);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (287, 'characters', 'Characters', 'number', 0, NULL, 1),
  (287, 'charactersNoSpaces', 'Characters without spaces', 'number', 0, NULL, 2),
  (287, 'words', 'Words', 'number', 0, NULL, 3),
  (287, 'lines', 'Lines', 'number', 0, NULL, 4),
  (288, 'tileCount', 'Tiles needed', 'number', 0, NULL, 1),
  (289, 'sleepMinutes', 'Sleep minutes', 'number', 0, NULL, 1),
  (289, 'totalBedMinutes', 'Total bed minutes', 'number', 0, NULL, 2),
  (289, 'totalBedHours', 'Total bed hours', 'number', 2, NULL, 3),
  (290, 'daylightHours', 'Daylight hours', 'number', 2, NULL, 1),
  (290, 'daylightMinutes', 'Daylight minutes', 'number', 2, NULL, 2);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (291, 'finalTotal', 'Final total', 'currency', 2, NULL, 1),
  (291, 'realDiscountPercent', 'Real discount', 'percent', 2, NULL, 2),
  (292, 'totalSaved', 'Total saved', 'currency', 2, NULL, 1),
  (292, 'finalDaySaving', 'Final day saving', 'currency', 2, NULL, 2),
  (293, 'predictedHeight', 'Predicted height', 'number', 2, NULL, 1),
  (294, 'rawFee', 'Raw fee', 'currency', 2, NULL, 1),
  (294, 'estimatedFee', 'Estimated fee', 'currency', 2, NULL, 2),
  (295, 'totalCash', 'Total cash', 'currency', 2, NULL, 1),
  (296, 'chargingCost', 'Charging cost', 'currency', 2, NULL, 1),
  (296, 'rangeAddedKm', 'Range added km', 'number', 2, NULL, 2);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (297, 'distanceM', 'Estimated distance', 'number', 2, NULL, 1),
  (298, 'hyperfocalMm', 'Hyperfocal distance mm', 'number', 2, NULL, 1),
  (298, 'hyperfocalM', 'Hyperfocal distance m', 'number', 2, NULL, 2),
  (299, 'differenceMs', 'Difference ms', 'number', 2, NULL, 1),
  (299, 'score', 'Score', 'number', 2, NULL, 2),
  (300, 'simpleAnnualRate', 'Simple annual rate', 'percent', 2, NULL, 1),
  (301, 'adjustedSeconds', 'Adjusted seconds', 'number', 2, NULL, 1),
  (301, 'adjustedMinutes', 'Adjusted minutes', 'number', 2, NULL, 2),
  (302, 'wattHours', 'Watt-hours', 'number', 2, NULL, 1),
  (303, 'methodACost', 'Method A cost', 'currency', 2, NULL, 1);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (303, 'methodBCost', 'Method B cost', 'currency', 2, NULL, 2),
  (303, 'savingsWithB', 'Savings with B', 'currency', 2, NULL, 3);


INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (201, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (201, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (202, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (202, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (203, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (203, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (204, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (204, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (205, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (205, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (206, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (206, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (207, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (207, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (208, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (208, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (209, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (209, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (210, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (210, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (211, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (211, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (212, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (212, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (213, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (213, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (214, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (214, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (215, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (215, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (216, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (216, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (217, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (217, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (218, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (218, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (219, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (219, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (220, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (220, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (221, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (221, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (222, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (222, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (223, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (223, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (224, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (224, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (225, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (225, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (226, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (226, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (227, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (227, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (228, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (228, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (229, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (229, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (230, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (230, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (231, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (231, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (232, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (232, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (233, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (233, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (234, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (234, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (235, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (235, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (236, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (236, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (237, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (237, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (238, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (238, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (239, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (239, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (240, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (240, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (241, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (241, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (242, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (242, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (243, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (243, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (244, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (244, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (245, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (245, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (246, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (246, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (247, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (247, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (248, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (248, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (249, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (249, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (250, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (250, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (251, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (251, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (252, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (252, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (253, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (253, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (254, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (254, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (255, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (255, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (256, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (256, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (257, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (257, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (258, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (258, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (259, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (259, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (260, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (260, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (261, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (261, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (262, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (262, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (263, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (263, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (264, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (264, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (265, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (265, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (266, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (266, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (267, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (267, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (268, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (268, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (269, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (269, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (270, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (270, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (271, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (271, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (272, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (272, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (273, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (273, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (274, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (274, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (275, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (275, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (276, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (276, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (277, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (277, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (278, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (278, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (279, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (279, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (280, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (280, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (281, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (281, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (282, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (282, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (283, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (283, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (284, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (284, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (285, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (285, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (286, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (286, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (287, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (287, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (288, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (288, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (289, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (289, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (290, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (290, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (291, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (291, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (292, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (292, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (293, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (293, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (294, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (294, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (295, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (295, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (296, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (296, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (297, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (297, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (298, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (298, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (299, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (299, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (300, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (300, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (301, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (301, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (302, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (302, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2),
  (303, 'Can I change the assumptions?', 'Yes. Editable rate and rule fields are included when the exact rule can vary by place, provider, or date.', 1),
  (303, 'Is this copied from another site?', 'No. This page uses an original implementation and rewrites the calculator structure, labels, formulas, and copy.', 2);


INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 201, 'Basic Calculator - Free Online Tool', 'Evaluate a quick arithmetic expression.', '/calculator/basic-calculator', 'index,follow'),
  ('calculator', 202, 'One-Line Expression Calculator - Free Online Tool', 'Run a single-line calculation with parentheses and functions.', '/calculator/one-line-expression-calculator', 'index,follow'),
  ('calculator', 203, 'Calculation Notebook - Free Online Tool', 'Paste a list of numbers and summarize the count, total, average, minimum, and maximum.', '/calculator/calculation-notebook', 'index,follow'),
  ('calculator', 204, 'Engineering Calculator - Free Online Tool', 'Evaluate engineering-style expressions with square root, power, and trigonometric functions.', '/calculator/engineering-calculator', 'index,follow'),
  ('calculator', 205, 'Scientific Calculator With History - Free Online Tool', 'Run a scientific expression for quick constants and function checks.', '/calculator/scientific-calculator-with-history', 'index,follow'),
  ('calculator', 206, 'Tax-Inclusive Price Calculator - Free Online Tool', 'Calculate tax amount and tax-inclusive total from a pre-tax price.', '/calculator/tax-inclusive-price-calculator', 'index,follow'),
  ('calculator', 207, 'Number Base Converter - Free Online Tool', 'Convert a whole decimal number to another base from 2 to 36.', '/calculator/number-base-converter', 'index,follow'),
  ('calculator', 208, 'Profit Margin Calculator - Free Online Tool', 'Calculate gross profit, margin, and markup.', '/calculator/profit-margin-calculator', 'index,follow'),
  ('calculator', 209, 'Cycle Calculator - Free Online Tool', 'Estimate the next cycle date from a start date and cycle length.', '/calculator/cycle-calculator', 'index,follow'),
  ('calculator', 210, 'Cycle-Based Fitness Planner - Free Online Tool', 'Estimate a planning date from a cycle start and an editable day offset.', '/calculator/cycle-based-fitness-planner', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 211, 'Cycle-Based Wellness Planner - Free Online Tool', 'Estimate a wellness planning date from a cycle start and an editable day offset.', '/calculator/cycle-based-wellness-planner', 'index,follow'),
  ('calculator', 212, 'Mood Check Tool - Free Online Tool', 'Summarize simple 1-10 mood scores from a day or week.', '/calculator/mood-check-tool', 'index,follow'),
  ('calculator', 213, 'Pregnancy Date Calculator - Free Online Tool', 'Estimate a due date from a last-period date using an editable day offset.', '/calculator/pregnancy-date-calculator', 'index,follow'),
  ('calculator', 214, 'Pregnancy Weight Calculator - Free Online Tool', 'Compare current pregnancy weight gain with an editable target range.', '/calculator/pregnancy-weight-calculator', 'index,follow'),
  ('calculator', 215, 'Conception Date Calculator - Free Online Tool', 'Estimate a conception date from a due date with an editable offset.', '/calculator/conception-date-calculator', 'index,follow'),
  ('calculator', 216, 'Baby Age In Days Calculator - Free Online Tool', 'Count calendar days and weekdays between birth date and another date.', '/calculator/baby-age-in-days-calculator', 'index,follow'),
  ('calculator', 217, 'Premature Baby Corrected Age Calculator - Free Online Tool', 'Estimate corrected age in weeks from chronological age and weeks early.', '/calculator/premature-baby-corrected-age-calculator', 'index,follow'),
  ('calculator', 218, '28-Day Cycle Care Planner - Free Online Tool', 'Plan a 28-day cycle milestone from a start date and editable offset.', '/calculator/28-day-cycle-care-planner', 'index,follow'),
  ('calculator', 219, 'Body Shape Calculator - Free Online Tool', 'Estimate waist-to-hip and waist-to-height ratios.', '/calculator/body-shape-calculator', 'index,follow'),
  ('calculator', 220, 'Baby Formula Temperature Calculator - Free Online Tool', 'Estimate mixed-water temperature from hot and cool water amounts.', '/calculator/baby-formula-temperature-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 221, 'Public Holiday Calendar Helper - Free Online Tool', 'Count weekdays across a date range and subtract known holidays.', '/calculator/public-holiday-calendar-helper', 'index,follow'),
  ('calculator', 222, 'Insurance Age Calculator - Free Online Tool', 'Estimate insurance age by adding an editable rounding adjustment to actual age.', '/calculator/insurance-age-calculator', 'index,follow'),
  ('calculator', 223, 'Date Add/Subtract Calculator - Free Online Tool', 'Add or subtract days and months from a date.', '/calculator/date-add-subtract-calculator', 'index,follow'),
  ('calculator', 224, 'Workday Calculator - Free Online Tool', 'Estimate workdays between two dates with an editable holiday count.', '/calculator/workday-calculator', 'index,follow'),
  ('calculator', 225, 'Day Counter - Free Online Tool', 'Count calendar days and weekdays across a date range.', '/calculator/day-counter', 'index,follow'),
  ('calculator', 226, 'Kids Timer - Free Online Tool', 'Plan a simple child-friendly timer cycle.', '/calculator/kids-timer', 'index,follow'),
  ('calculator', 227, 'Height Match Calculator - Free Online Tool', 'Compare two heights and calculate their difference and ratio.', '/calculator/height-match-calculator', 'index,follow'),
  ('calculator', 228, 'Target Heart Rate Calculator - Free Online Tool', 'Estimate maximum heart rate and training zone from age and intensity.', '/calculator/target-heart-rate-calculator', 'index,follow'),
  ('calculator', 229, 'Exercise Calories Calculator - Free Online Tool', 'Estimate calories burned from MET, weight, and duration.', '/calculator/exercise-calories-calculator', 'index,follow'),
  ('calculator', 230, 'Shoe Size Converter - Free Online Tool', 'Estimate common shoe size conversions from foot length.', '/calculator/shoe-size-converter', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 231, 'Currency Converter - Free Online Tool', 'Convert an amount using an editable exchange rate and fee.', '/calculator/currency-converter', 'index,follow'),
  ('calculator', 232, 'Travel Exchange Rate Calculator - Free Online Tool', 'Estimate travel money after exchange spread and card fee.', '/calculator/travel-exchange-rate-calculator', 'index,follow'),
  ('calculator', 233, 'TV Viewing Distance Calculator - Free Online Tool', 'Estimate viewing distance from screen size.', '/calculator/tv-viewing-distance-calculator', 'index,follow'),
  ('calculator', 234, 'Color Count Tool - Free Online Tool', 'Paste color values or labels and count entries, words, and lines.', '/calculator/color-count-tool', 'index,follow'),
  ('calculator', 235, 'Screen PPI Calculator - Free Online Tool', 'Calculate pixels per inch from resolution and diagonal size.', '/calculator/screen-ppi-calculator', 'index,follow'),
  ('calculator', 236, 'PPM Concentration Converter - Free Online Tool', 'Convert ppm to percent and decimal concentration.', '/calculator/ppm-concentration-converter', 'index,follow'),
  ('calculator', 237, 'Chinese Text Utility - Free Online Tool', 'Paste Chinese text and count characters, non-space characters, words, and lines.', '/calculator/chinese-text-utility', 'index,follow'),
  ('calculator', 238, 'Taiwan Taxi Fare Calculator - Free Online Tool', 'Estimate a taxi fare from editable local fare assumptions.', '/calculator/taiwan-taxi-fare-calculator', 'index,follow'),
  ('calculator', 239, 'Hong Kong Taxi Fare Calculator - Free Online Tool', 'Estimate a taxi fare from editable Hong Kong fare assumptions.', '/calculator/hong-kong-taxi-fare-calculator', 'index,follow'),
  ('calculator', 240, 'Time Speed Distance Calculator - Free Online Tool', 'Calculate speed and pace from distance and time.', '/calculator/time-speed-distance-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 241, 'Gear Ratio RPM Calculator - Free Online Tool', 'Estimate wheel RPM from engine RPM and gear ratio.', '/calculator/gear-ratio-rpm-calculator', 'index,follow'),
  ('calculator', 242, 'Tire Size Upgrade Calculator - Free Online Tool', 'Compare tire diameter from width, aspect ratio, and rim size.', '/calculator/tire-size-upgrade-calculator', 'index,follow'),
  ('calculator', 243, 'Fuel Price Change Calculator - Free Online Tool', 'Estimate how a fuel price change affects a refill.', '/calculator/fuel-price-change-calculator', 'index,follow'),
  ('calculator', 244, 'Electricity Bill Calculator - Free Online Tool', 'Estimate electricity cost from kWh and an editable rate.', '/calculator/electricity-bill-calculator', 'index,follow'),
  ('calculator', 245, 'Word Count Tool - Free Online Tool', 'Count words, characters, non-space characters, and lines.', '/calculator/word-count-tool', 'index,follow'),
  ('calculator', 246, 'Air Conditioner BTU Calculator - Free Online Tool', 'Estimate cooling capacity from room area and BTU per square foot.', '/calculator/air-conditioner-btu-calculator', 'index,follow'),
  ('calculator', 247, 'Air Conditioner Electricity Cost Calculator - Free Online Tool', 'Estimate air conditioner electricity use and cost.', '/calculator/air-conditioner-electricity-cost-calculator', 'index,follow'),
  ('calculator', 248, 'Golden Ratio Calculator - Free Online Tool', 'Scale a value by the golden ratio and its reciprocal.', '/calculator/golden-ratio-calculator', 'index,follow'),
  ('calculator', 249, 'Credit Card Debt Calculator - Free Online Tool', 'Estimate months to pay off credit card debt with fixed monthly payments.', '/calculator/credit-card-debt-calculator', 'index,follow'),
  ('calculator', 250, 'Car Purchase Budget Calculator - Free Online Tool', 'Estimate an out-the-door car budget with taxes and fees.', '/calculator/car-purchase-budget-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 251, 'Weekly Savings Challenge Calculator - Free Online Tool', 'Estimate savings from a weekly increasing challenge.', '/calculator/weekly-savings-challenge-calculator', 'index,follow'),
  ('calculator', 252, 'Bicycle Gear Calculator - Free Online Tool', 'Estimate bicycle gear ratio and gear inches.', '/calculator/bicycle-gear-calculator', 'index,follow'),
  ('calculator', 253, 'Random Draw Tool - Free Online Tool', 'Pick one or more entries from a list using a deterministic seed.', '/calculator/random-draw-tool', 'index,follow'),
  ('calculator', 254, 'Map Distance Calculator - Free Online Tool', 'Estimate travel time from distance and average speed.', '/calculator/map-distance-calculator', 'index,follow'),
  ('calculator', 255, 'Aquarium Volume Calculator - Free Online Tool', 'Calculate aquarium volume from length, width, and height.', '/calculator/aquarium-volume-calculator', 'index,follow'),
  ('calculator', 256, 'Water Intake Calculator - Free Online Tool', 'Estimate daily water intake from body weight.', '/calculator/water-intake-calculator', 'index,follow'),
  ('calculator', 257, 'Cup Volume Calculator - Free Online Tool', 'Estimate cylindrical cup volume.', '/calculator/cup-volume-calculator', 'index,follow'),
  ('calculator', 258, 'Waist-To-Hip Ratio Calculator - Free Online Tool', 'Calculate waist-to-hip ratio from body measurements.', '/calculator/waist-to-hip-ratio-calculator', 'index,follow'),
  ('calculator', 259, 'Mortgage Refinance Calculator - Free Online Tool', 'Estimate simple monthly savings and break-even months for refinancing.', '/calculator/mortgage-refinance-calculator', 'index,follow'),
  ('calculator', 260, 'Mortgage Grace Period Calculator - Free Online Tool', 'Estimate interest accrued during a grace period.', '/calculator/mortgage-grace-period-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 261, 'Rotating Savings Bid Calculator - Free Online Tool', 'Estimate simple bid interest from group savings assumptions.', '/calculator/rotating-savings-bid-calculator', 'index,follow'),
  ('calculator', 262, 'Stock Limit-Up/Limit-Down Calculator - Free Online Tool', 'Estimate upper and lower price limits from an editable percentage rule.', '/calculator/stock-limit-up-limit-down-calculator', 'index,follow'),
  ('calculator', 263, 'Stock Profit/Loss Calculator - Free Online Tool', 'Calculate stock trade profit or loss before detailed broker rules.', '/calculator/stock-profit-loss-calculator', 'index,follow'),
  ('calculator', 264, 'Stock Ex-Dividend Calculator - Free Online Tool', 'Estimate adjusted price after cash and stock dividends.', '/calculator/stock-ex-dividend-calculator', 'index,follow'),
  ('calculator', 265, 'Baseball ERA Calculator - Free Online Tool', 'Calculate earned run average.', '/calculator/baseball-era-calculator', 'index,follow'),
  ('calculator', 266, 'Baseball Batting Average Calculator - Free Online Tool', 'Calculate batting average from hits and at-bats.', '/calculator/baseball-batting-average-calculator', 'index,follow'),
  ('calculator', 267, 'Running Calories Calculator - Free Online Tool', 'Estimate running calories from weight and distance.', '/calculator/running-calories-calculator', 'index,follow'),
  ('calculator', 268, 'Blood Alcohol Calculator - Free Online Tool', 'Estimate BAC with editable drink, body-water, and metabolism assumptions.', '/calculator/blood-alcohol-calculator', 'index,follow'),
  ('calculator', 269, 'Buy Vs. Rent Calculator - Free Online Tool', 'Compare simple monthly owning and renting costs.', '/calculator/buy-vs-rent-calculator', 'index,follow'),
  ('calculator', 270, 'Interval Timer - Free Online Tool', 'Plan active/rest interval rounds.', '/calculator/interval-timer', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 271, 'Stopwatch Session Calculator - Free Online Tool', 'Plan repeated timed stopwatch attempts.', '/calculator/stopwatch-session-calculator', 'index,follow'),
  ('calculator', 272, 'Millisecond Stopwatch Planner - Free Online Tool', 'Convert short timed attempts into a total session duration.', '/calculator/millisecond-stopwatch-planner', 'index,follow'),
  ('calculator', 273, 'Dog Age Calculator - Free Online Tool', 'Estimate dog age in human-year equivalents with editable multipliers.', '/calculator/dog-age-calculator', 'index,follow'),
  ('calculator', 274, 'Dog Pregnancy Due Date Calculator - Free Online Tool', 'Estimate a dog pregnancy due date from breeding date.', '/calculator/dog-pregnancy-due-date-calculator', 'index,follow'),
  ('calculator', 275, 'Cat Age Calculator - Free Online Tool', 'Estimate cat age in human-year equivalents with editable factors.', '/calculator/cat-age-calculator', 'index,follow'),
  ('calculator', 276, 'Cat Pregnancy Due Date Calculator - Free Online Tool', 'Estimate a cat pregnancy due date from breeding date.', '/calculator/cat-pregnancy-due-date-calculator', 'index,follow'),
  ('calculator', 277, 'Ratio Calculator - Free Online Tool', 'Calculate ratio, scaled values, and proportional parts.', '/calculator/ratio-calculator', 'index,follow'),
  ('calculator', 278, 'Tally Counter - Free Online Tool', 'Calculate the next counter value from a current value and step.', '/calculator/tally-counter', 'index,follow'),
  ('calculator', 279, 'Smoking Cost Calculator - Free Online Tool', 'Estimate smoking cost over days, months, and years.', '/calculator/smoking-cost-calculator', 'index,follow'),
  ('calculator', 280, 'Alcohol Spending Calculator - Free Online Tool', 'Estimate drinking or beverage spending over a month.', '/calculator/alcohol-spending-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 281, 'Countdown Alarm Planner - Free Online Tool', 'Plan a countdown alarm length.', '/calculator/countdown-alarm-planner', 'index,follow'),
  ('calculator', 282, 'Visual Countdown Alarm Planner - Free Online Tool', 'Plan a visual countdown alarm sequence.', '/calculator/visual-countdown-alarm-planner', 'index,follow'),
  ('calculator', 283, 'Cuckoo Clock Planner - Free Online Tool', 'Estimate a repeated chime schedule length.', '/calculator/cuckoo-clock-planner', 'index,follow'),
  ('calculator', 284, 'Pomodoro Timer - Free Online Tool', 'Plan Pomodoro work and break rounds.', '/calculator/pomodoro-timer', 'index,follow'),
  ('calculator', 285, 'YouTube Alarm Planner - Free Online Tool', 'Paste video links or alarm notes and count entries for a playlist alarm.', '/calculator/youtube-alarm-planner', 'index,follow'),
  ('calculator', 286, 'Multi-YouTube Player Planner - Free Online Tool', 'Paste multiple video links and count lines for a multi-video setup.', '/calculator/multi-youtube-player-planner', 'index,follow'),
  ('calculator', 287, 'Perpetual Calendar With Notes - Free Online Tool', 'Draft calendar notes and count words, characters, and lines.', '/calculator/perpetual-calendar-with-notes', 'index,follow'),
  ('calculator', 288, 'Tile Area Calculator - Free Online Tool', 'Estimate tile count from room area, tile size, and waste percentage.', '/calculator/tile-area-calculator', 'index,follow'),
  ('calculator', 289, 'Sleep Cycle Calculator - Free Online Tool', 'Estimate sleep duration from sleep cycles and minutes per cycle.', '/calculator/sleep-cycle-calculator', 'index,follow'),
  ('calculator', 290, 'Sunrise/Sunset Daylight Calculator - Free Online Tool', 'Estimate daylight duration from sunrise and sunset times entered as decimal hours.', '/calculator/sunrise-sunset-daylight-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 291, 'Real Promotion Discount Calculator - Free Online Tool', 'Estimate the real discount from buy-more-save-more promotions.', '/calculator/real-promotion-discount-calculator', 'index,follow'),
  ('calculator', 292, '365 Savings Plan Calculator - Free Online Tool', 'Estimate total savings from a daily increasing savings plan.', '/calculator/365-savings-plan-calculator', 'index,follow'),
  ('calculator', 293, 'Child Height Prediction Calculator - Free Online Tool', 'Estimate child adult height from parent heights with an editable offset.', '/calculator/child-height-prediction-calculator', 'index,follow'),
  ('calculator', 294, 'Parking Fee Calculator - Free Online Tool', 'Estimate parking fee from duration, free minutes, hourly rate, and cap.', '/calculator/parking-fee-calculator', 'index,follow'),
  ('calculator', 295, 'Hidden Cash Calculator - Free Online Tool', 'Add up small hidden cash amounts from multiple places.', '/calculator/hidden-cash-calculator', 'index,follow'),
  ('calculator', 296, 'Electric Vehicle Charging Cost Calculator - Free Online Tool', 'Estimate EV charging cost and range added.', '/calculator/electric-vehicle-charging-cost-calculator', 'index,follow'),
  ('calculator', 297, 'Camera Distance Calculator - Free Online Tool', 'Estimate camera distance from subject height, focal length, and sensor height.', '/calculator/camera-distance-calculator', 'index,follow'),
  ('calculator', 298, 'Depth Of Field Calculator - Free Online Tool', 'Estimate hyperfocal distance from focal length, aperture, and circle of confusion.', '/calculator/depth-of-field-calculator', 'index,follow'),
  ('calculator', 299, 'Reaction Test Score Calculator - Free Online Tool', 'Summarize reaction test attempts from average milliseconds.', '/calculator/reaction-test-score-calculator', 'index,follow'),
  ('calculator', 300, 'Effective Annual Rate Calculator - Free Online Tool', 'Estimate effective annual rate from interest paid and loan principal.', '/calculator/effective-annual-rate-calculator', 'index,follow');

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 301, 'Microwave Heating Time Calculator - Free Online Tool', 'Scale microwave heating time between wattages.', '/calculator/microwave-heating-time-calculator', 'index,follow'),
  ('calculator', 302, 'Power Bank Wh Calculator - Free Online Tool', 'Convert battery mAh and voltage to watt-hours.', '/calculator/power-bank-wh-calculator', 'index,follow'),
  ('calculator', 303, 'Shipping Cost Comparison Calculator - Free Online Tool', 'Compare two shipping methods by base fee and weight fee.', '/calculator/shipping-cost-comparison-calculator', 'index,follow');

