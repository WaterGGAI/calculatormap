CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  seo_title TEXT,
  seo_description TEXT,
  intro_content TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS calculators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  long_description TEXT,
  h1_title TEXT,
  intro_content TEXT,
  how_to_use TEXT,
  formula_explanation TEXT,
  examples_content TEXT,
  notes_content TEXT,
  formula_type TEXT,
  formula_config_json TEXT,
  status TEXT DEFAULT 'draft',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS calculator_fields (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculator_id INTEGER NOT NULL,
  field_key TEXT NOT NULL,
  label TEXT NOT NULL,
  input_type TEXT NOT NULL,
  unit_type TEXT,
  placeholder TEXT,
  default_value TEXT,
  is_required INTEGER DEFAULT 0,
  validation_rules_json TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (calculator_id) REFERENCES calculators(id)
);

CREATE TABLE IF NOT EXISTS calculator_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculator_id INTEGER NOT NULL,
  result_key TEXT NOT NULL,
  label TEXT NOT NULL,
  format_type TEXT,
  decimal_places INTEGER DEFAULT 2,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (calculator_id) REFERENCES calculators(id)
);

CREATE TABLE IF NOT EXISTS calculator_faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculator_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (calculator_id) REFERENCES calculators(id)
);

CREATE TABLE IF NOT EXISTS seo_meta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_type TEXT NOT NULL,
  ref_id INTEGER NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  robots TEXT DEFAULT 'index,follow',
  schema_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ad_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slot_key TEXT NOT NULL UNIQUE,
  description TEXT,
  position_type TEXT NOT NULL,
  supported_sizes_json TEXT,
  device_targets_json TEXT,
  page_targets_json TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ad_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slot_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  advertiser_name TEXT,
  ad_type TEXT NOT NULL,
  media_asset_id INTEGER,
  html_code TEXT,
  script_code TEXT,
  target_url TEXT,
  open_in_new_tab INTEGER DEFAULT 1,
  start_at TEXT,
  end_at TEXT,
  weight INTEGER DEFAULT 1,
  priority INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  impressions_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES ad_slots(id),
  FOREIGN KEY (media_asset_id) REFERENCES media_assets(id)
);

CREATE TABLE IF NOT EXISTS ad_target_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL,
  page_type TEXT,
  page_ref_id INTEGER,
  category_id INTEGER,
  country_code TEXT,
  device_type TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES ad_campaigns(id)
);

CREATE TABLE IF NOT EXISTS ad_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL,
  slot_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  page_type TEXT,
  page_ref_id INTEGER,
  device_type TEXT,
  referrer TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES ad_campaigns(id),
  FOREIGN KEY (slot_id) REFERENCES ad_slots(id)
);

CREATE TABLE IF NOT EXISTS related_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type TEXT NOT NULL,
  source_id INTEGER NOT NULL,
  target_type TEXT NOT NULL,
  target_id INTEGER NOT NULL,
  anchor_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  model_key TEXT NOT NULL,
  task_types_json TEXT,
  is_active INTEGER DEFAULT 1,
  priority INTEGER DEFAULT 0,
  temperature_default REAL DEFAULT 0.2,
  max_output_tokens INTEGER DEFAULT 1200,
  fallback_priority INTEGER DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_prompt_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_type TEXT NOT NULL,
  name TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  user_prompt_template TEXT NOT NULL,
  output_format TEXT,
  model_id INTEGER,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (model_id) REFERENCES ai_models(id)
);

CREATE TABLE IF NOT EXISTS ai_generation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_type TEXT,
  ref_id INTEGER,
  task_type TEXT NOT NULL,
  model_id INTEGER,
  input_payload_json TEXT,
  output_payload_json TEXT,
  status TEXT,
  latency_ms INTEGER,
  cost_info_json TEXT,
  created_by INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (model_id) REFERENCES ai_models(id)
);

CREATE TABLE IF NOT EXISTS seo_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_type TEXT NOT NULL,
  ref_id INTEGER NOT NULL,
  audit_type TEXT NOT NULL,
  score INTEGER,
  issues_json TEXT,
  suggestions_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_name TEXT,
  site_domain TEXT,
  default_title_template TEXT,
  default_description_template TEXT,
  robots_txt TEXT,
  sitemap_enabled INTEGER DEFAULT 1,
  default_og_image_url TEXT,
  analytics_code TEXT,
  search_console_verification TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id INTEGER,
  details_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admin_users(id)
);

CREATE INDEX IF NOT EXISTS idx_calculators_category_id ON calculators(category_id);
CREATE INDEX IF NOT EXISTS idx_calculators_status ON calculators(status);
CREATE INDEX IF NOT EXISTS idx_seo_meta_ref ON seo_meta(ref_type, ref_id);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_slot_status ON ad_campaigns(slot_id, status);
CREATE INDEX IF NOT EXISTS idx_related_links_source ON related_links(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_related_links_target ON related_links(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_ref ON ai_generation_logs(ref_type, ref_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_target ON activity_logs(target_type, target_id);
