ALTER TABLE site_settings ADD COLUMN ai_seo_automation_enabled INTEGER DEFAULT 1;
ALTER TABLE site_settings ADD COLUMN ai_seo_batch_size INTEGER DEFAULT 1;
ALTER TABLE site_settings ADD COLUMN ai_seo_min_days_between_refresh INTEGER DEFAULT 30;
ALTER TABLE site_settings ADD COLUMN ai_seo_default_task_type TEXT DEFAULT 'full_refresh';
ALTER TABLE site_settings ADD COLUMN ai_seo_default_model_key TEXT DEFAULT '@cf/meta/llama-3.1-8b-instruct-fp8';
ALTER TABLE site_settings ADD COLUMN ai_seo_prompt_tone TEXT DEFAULT 'professional';
ALTER TABLE site_settings ADD COLUMN ai_seo_prompt_length TEXT DEFAULT 'medium';
ALTER TABLE site_settings ADD COLUMN ai_seo_temperature REAL DEFAULT 0.2;
ALTER TABLE site_settings ADD COLUMN ai_seo_last_run_at TEXT;
ALTER TABLE site_settings ADD COLUMN ai_seo_last_status TEXT;
ALTER TABLE site_settings ADD COLUMN ai_seo_last_summary_json TEXT;

CREATE TABLE IF NOT EXISTS seo_automation_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trigger_source TEXT NOT NULL,
  status TEXT NOT NULL,
  selected_count INTEGER DEFAULT 0,
  processed_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  summary_json TEXT,
  error_message TEXT,
  started_at TEXT DEFAULT CURRENT_TIMESTAMP,
  finished_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_seo_automation_runs_started_at
  ON seo_automation_runs(started_at DESC);

UPDATE site_settings
SET
  ai_seo_automation_enabled = COALESCE(ai_seo_automation_enabled, 1),
  ai_seo_batch_size = COALESCE(ai_seo_batch_size, 1),
  ai_seo_min_days_between_refresh = COALESCE(ai_seo_min_days_between_refresh, 30),
  ai_seo_default_task_type = COALESCE(ai_seo_default_task_type, 'full_refresh'),
  ai_seo_default_model_key = COALESCE(ai_seo_default_model_key, '@cf/meta/llama-3.1-8b-instruct-fp8'),
  ai_seo_prompt_tone = COALESCE(ai_seo_prompt_tone, 'professional'),
  ai_seo_prompt_length = COALESCE(ai_seo_prompt_length, 'medium'),
  ai_seo_temperature = COALESCE(ai_seo_temperature, 0.2),
  updated_at = CURRENT_TIMESTAMP;
