INSERT INTO categories (id, name, slug, description, seo_title, seo_description, status, sort_order)
VALUES
  (1, 'Health', 'health', 'Everyday health estimators with clear formulas and plain-language notes.', 'Health Calculators | Free Online Tools', 'Use free health calculators for BMI and other quick estimates.', 'published', 1),
  (2, 'Finance', 'finance', 'Personal finance calculators for loans, interest, unit price, and planning.', 'Finance Calculators | Loan and Interest Tools', 'Run quick finance calculations with transparent formulas and examples.', 'published', 2),
  (3, 'Math', 'math', 'Simple math helpers for percentages and day-to-day comparisons.', 'Math Calculators | Percentage and Practical Tools', 'Solve common percentage and practical math problems online.', 'published', 3);

INSERT INTO calculators (id, category_id, name, slug, short_description, long_description, h1_title, intro_content, how_to_use, formula_explanation, examples_content, notes_content, formula_type, formula_config_json, status, sort_order)
VALUES
  (101, 1, 'BMI Calculator', 'bmi-calculator', 'Calculate body mass index from height and weight.', 'This BMI calculator estimates body mass index using the standard metric formula.', 'BMI Calculator', 'Enter your height and weight to estimate BMI and a general healthy-weight range.', 'Enter weight; Enter height; Review result', 'BMI = weight in kilograms / height in meters squared.', '70 kg and 175 cm gives a BMI of 22.86.', 'BMI is a screening metric, not a diagnosis.', 'bmi', '{"unitModes":["metric"]}', 'published', 1),
  (102, 2, 'Loan Payment Calculator', 'loan-payment-calculator', 'Estimate monthly loan payments, total payment, and total interest.', 'Use this loan payment calculator to estimate the monthly payment for a fixed-rate loan.', 'Loan Payment Calculator', 'Enter a loan amount, annual interest rate, and term to estimate your monthly payment.', 'Enter principal; Add annual rate; Enter years', 'Monthly payment = principal x monthly rate / (1 - (1 + monthly rate)^(-number of months)).', '$25,000 at 6.5% over 5 years is about $489.15 per month.', 'Excludes taxes, fees, insurance, and variable-rate changes.', 'loan_payment', '{"currency":"USD"}', 'published', 2),
  (103, 3, 'Percentage Calculator', 'percentage-calculator', 'Find a percentage of a number and compare increase or decrease.', 'This percentage calculator helps you find a percent of a base value.', 'Percentage Calculator', 'Enter a base value and a percentage to calculate the percentage amount.', 'Enter base; Enter percentage; Compare totals', 'Percentage value = base value x percentage / 100.', '15% of 80 is 12.', 'Use negative values intentionally.', 'percentage', '{}', 'published', 3);

INSERT INTO calculator_fields (calculator_id, field_key, label, input_type, unit_type, placeholder, default_value, is_required, validation_rules_json, sort_order)
VALUES
  (101, 'weightKg', 'Weight', 'number', 'kg', '70', '70', 1, '{"min":1}', 1),
  (101, 'heightCm', 'Height', 'number', 'cm', '175', '175', 1, '{"min":1}', 2),
  (102, 'principal', 'Loan amount', 'number', 'USD', '25000', '25000', 1, '{"min":1}', 1),
  (102, 'annualRate', 'Annual rate', 'number', '%', '6.5', '6.5', 1, '{"min":0}', 2),
  (102, 'years', 'Loan term', 'number', 'years', '5', '5', 1, '{"min":0.1}', 3),
  (103, 'baseValue', 'Base value', 'number', NULL, '80', '80', 1, '{}', 1),
  (103, 'percent', 'Percentage', 'number', '%', '15', '15', 1, '{}', 2);

INSERT INTO calculator_results (calculator_id, result_key, label, format_type, decimal_places, description, sort_order)
VALUES
  (101, 'bmi', 'BMI', 'number', 2, 'Estimated body mass index.', 1),
  (102, 'monthlyPayment', 'Monthly payment', 'currency', 2, 'Estimated monthly principal and interest payment.', 1),
  (102, 'totalInterest', 'Total interest', 'currency', 2, 'Estimated total interest across the term.', 2),
  (103, 'percentageValue', 'Percentage value', 'number', 2, 'Raw percentage amount.', 1);

INSERT INTO calculator_faqs (calculator_id, question, answer, sort_order)
VALUES
  (101, 'Is BMI accurate for everyone?', 'BMI is a quick screening metric and can be less useful for some populations.', 1),
  (101, 'What formula does this calculator use?', 'It uses weight in kilograms divided by height in meters squared.', 2),
  (102, 'Does this include taxes or fees?', 'No. It estimates principal and interest only.', 1),
  (103, 'How do I calculate 20% of a number?', 'Multiply the number by 20, then divide by 100.', 1);

INSERT INTO seo_meta (ref_type, ref_id, meta_title, meta_description, canonical_url, robots)
VALUES
  ('calculator', 101, 'BMI Calculator - Check Your Body Mass Index', 'Use this free BMI calculator to estimate your body mass index from height and weight.', '/calculator/bmi-calculator', 'index,follow'),
  ('calculator', 102, 'Loan Payment Calculator - Monthly Payment Estimate', 'Estimate monthly loan payments, total repayment, and total interest with a clear formula.', '/calculator/loan-payment-calculator', 'index,follow'),
  ('calculator', 103, 'Percentage Calculator - Find Percent of a Number', 'Calculate percentages, increases, and decreases with a simple online percentage calculator.', '/calculator/percentage-calculator', 'index,follow');

INSERT INTO ad_slots (name, slot_key, description, position_type, supported_sizes_json, device_targets_json, page_targets_json, status)
VALUES
  ('Site top banner', 'site_top_banner', 'Global top banner', 'top_banner', '["728x90","970x90","970x250"]', '["desktop","tablet","mobile"]', '["all"]', 'active'),
  ('Site bottom banner', 'site_bottom_banner', 'Global bottom banner', 'bottom_banner', '["728x90","970x90"]', '["desktop","tablet","mobile"]', '["all"]', 'active'),
  ('Page left sidebar', 'page_left_sidebar', 'Desktop left sidebar', 'left_sidebar', '["160x600","300x600"]', '["desktop"]', '["calculator"]', 'active'),
  ('Page right sidebar', 'page_right_sidebar', 'Desktop right sidebar', 'right_sidebar', '["160x600","300x600"]', '["desktop"]', '["calculator"]', 'active'),
  ('In content 1', 'in_content_1', 'Mid-content ad slot', 'in_content', '["300x250","336x280"]', '["desktop","tablet","mobile"]', '["calculator","category"]', 'active');

INSERT INTO ai_models (name, provider, model_key, task_types_json, is_active, priority, temperature_default, max_output_tokens, fallback_priority, notes)
VALUES
  ('Llama 3.1 8B Instruct', 'Cloudflare Workers AI', '@cf/meta/llama-3.1-8b-instruct', '["seo_title","meta_description","faq_generation"]', 1, 1, 0.2, 1200, 1, 'Default content generation model'),
  ('Mistral 7B Instruct', 'Cloudflare Workers AI', '@cf/mistral/mistral-7b-instruct-v0.2', '["content_expansion","seo_audit"]', 1, 2, 0.3, 1600, 2, 'Fallback and audit model');

INSERT INTO admin_users (name, email, password_hash, role, status)
VALUES ('Admin Demo', 'admin@example.com', NULL, 'owner', 'active');

INSERT INTO site_settings (site_name, site_domain, default_title_template, default_description_template, robots_txt, sitemap_enabled, default_og_image_url)
VALUES ('SEO Calculators', 'https://example.com', '{{calculator_name}} | Free Online Calculator', 'Use this free {{calculator_name}} with formulas, examples, and FAQ.', 'User-agent: *\nAllow: /', 1, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40');
