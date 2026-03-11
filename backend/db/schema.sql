CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  confirmation_token TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  race TEXT,
  character_class TEXT,
  level INTEGER,
  experience INTEGER DEFAULT 0,
  regalia_points INTEGER,
  image TEXT,
  gender TEXT,
  age INTEGER,
  description TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attribute_definitions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_attributes (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  attribute_id INTEGER NOT NULL REFERENCES attribute_definitions(id) ON DELETE CASCADE,
  current_value INTEGER,
  max_value INTEGER,
  CONSTRAINT uq_character_attribute UNIQUE (character_id, attribute_id)
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_inventory (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  equipped BOOLEAN NOT NULL DEFAULT FALSE,
  slot TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_skills (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE SET NULL,
  level INTEGER,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS conditions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_conditions (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  condition_id INTEGER REFERENCES conditions(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS proficiencies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_proficiencies (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  proficiency_id INTEGER REFERENCES proficiencies(id) ON DELETE SET NULL,
  level INTEGER,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS regalias (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_regalias (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  regalia_id INTEGER REFERENCES regalias(id) ON DELETE SET NULL,
  source_type TEXT,
  extra_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS character_sections (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT uq_character_section UNIQUE (character_id, section_key)
);

CREATE TABLE IF NOT EXISTS character_effects (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  effect_type TEXT NOT NULL,          -- 'pocao', 'veneno', 'regalia', 'condicao', 'kit', 'material', 'outro'
  source TEXT,                         -- nome/id da origem (ex: 'Poção de Vida', 'Veneno de Aranha')
  data JSONB DEFAULT '{}'::jsonb,      -- dados mecânicos (curaHP, bonusDefesa, condicaoAplicada, etc.)
  remaining_rounds INTEGER,            -- rodadas restantes (NULL = sem duração por rodada)
  remaining_uses INTEGER,              -- usos restantes (NULL = sem limite de uso)
  expires_on_rest TEXT,                -- 'curto', 'longo', 'ambos', NULL = não expira em descanso
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trilha de auditoria para mutações de personagem (TODO-BE-006)
CREATE TABLE IF NOT EXISTS character_audit_log (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,                 -- 'create', 'update', 'delete', 'rest', 'condition_add', 'condition_remove', 'regalia_buy', etc.
  before_state JSONB,                   -- snapshot parcial ou total antes da ação
  after_state JSONB,                    -- snapshot parcial ou total depois da ação
  metadata JSONB DEFAULT '{}'::jsonb,   -- dados extras (IP, campo alterado, etc.)
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para consultas comuns no audit log
CREATE INDEX IF NOT EXISTS idx_audit_character_id ON character_audit_log(character_id);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON character_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON character_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON character_audit_log(created_at);
