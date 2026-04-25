CREATE TABLE IF NOT EXISTS calculator_content_overrides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculator_slug TEXT NOT NULL UNIQUE,
  h1 TEXT,
  intro TEXT,
  formula_explanation TEXT,
  seo_title TEXT,
  seo_description TEXT,
  faq_json TEXT,
  last_ai_task_type TEXT,
  last_ai_model_key TEXT,
  updated_by TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_calculator_content_overrides_slug
  ON calculator_content_overrides(calculator_slug);
