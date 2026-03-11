#!/usr/bin/env python3
"""
Seed de Catálogos — Lâmina do Oculto v0.5
============================================
Popula as tabelas de catálogo do banco (skills, proficiencies, conditions,
regalias, items, attribute_definitions) com os dados extraídos do frontend.

TODO-DAT-002: Criar script de seed para popular tabelas de catálogo do banco.

Uso:
    cd backend/app
    python ../scripts/seed_catalogs.py

Ou dentro do container Docker:
    docker exec -it backendLDO python scripts/seed_catalogs.py
"""

import os
import sys
import json
import psycopg2
from psycopg2.extras import Json


def get_conn():
    """Cria conexão com o PostgreSQL usando variáveis de ambiente."""
    return psycopg2.connect(
        host=os.getenv("POSTGRES_HOST", "localhost"),
        port=os.getenv("POSTGRES_PORT", "5433"),
        dbname=os.getenv("POSTGRES_DB", "your_database"),
        user=os.getenv("POSTGRES_USER", "your_user"),
        password=os.getenv("POSTGRES_PASSWORD", "your_password"),
    )


# ============================================================================
# DADOS DE CATÁLOGO (espelhados do frontend)
# ============================================================================

HABILIDADES = [
    {"nome": "Força", "slug": "forca", "categoria": "fisica"},
    {"nome": "Destreza", "slug": "destreza", "categoria": "fisica"},
    {"nome": "Fortitude", "slug": "fortitude", "categoria": "fisica"},
    {"nome": "Agilidade", "slug": "agilidade", "categoria": "fisica"},
    {"nome": "Furtividade", "slug": "furtividade", "categoria": "fisica"},
    {"nome": "Combate Corpo-a-Corpo", "slug": "combateCorpoACorpo", "categoria": "combate"},
    {"nome": "Combate à Distância", "slug": "combateADistancia", "categoria": "combate"},
    {"nome": "Habilidade de Combate", "slug": "habilidadeCombate", "categoria": "combate"},
    {"nome": "Magia", "slug": "magia", "categoria": "magica"},
    {"nome": "Inteligência", "slug": "inteligencia", "categoria": "mental"},
    {"nome": "Sabedoria", "slug": "sabedoria", "categoria": "mental"},
    {"nome": "Carisma", "slug": "carisma", "categoria": "social"},
    {"nome": "Percepção", "slug": "percepcao", "categoria": "mental"},
    {"nome": "Sobrevivência", "slug": "sobrevivencia", "categoria": "mental"},
]

PROFICIENCIAS = [
    {"id": "armas_simples", "nome": "Armas Simples"},
    {"id": "armas_marciais", "nome": "Armas Marciais"},
    {"id": "armas_exoticas", "nome": "Armas Exóticas"},
    {"id": "armadura_leve", "nome": "Armadura Leve"},
    {"id": "armadura_media", "nome": "Armadura Média"},
    {"id": "armadura_pesada", "nome": "Armadura Pesada"},
    {"id": "escudos", "nome": "Escudos"},
    {"id": "ferramentas_ladrao", "nome": "Ferramentas de Ladrão"},
    {"id": "kit_herbalismo", "nome": "Kit de Herbalismo"},
    {"id": "kit_medico", "nome": "Kit Médico"},
    {"id": "instrumentos_musicais", "nome": "Instrumentos Musicais"},
    {"id": "ferramentas_artesao", "nome": "Ferramentas de Artesão"},
    {"id": "kit_venenos", "nome": "Kit de Venenos"},
    {"id": "navegacao", "nome": "Navegação"},
    {"id": "caligrafia", "nome": "Caligrafia"},
]

CONDICOES = [
    {"id": "atordoado", "nome": "Atordoado", "categoria": "Debilitação Física", "cor": "#B22222"},
    {"id": "derrubado", "nome": "Derrubado", "categoria": "Debilitação Física", "cor": "#8B4513"},
    {"id": "incapacitado", "nome": "Incapacitado", "categoria": "Debilitação Física", "cor": "#8B0000"},
    {"id": "paralisado", "nome": "Paralisado", "categoria": "Debilitação Física", "cor": "#4B0082"},
    {"id": "beira_morte", "nome": "Beira da Morte", "categoria": "Debilitação Física", "cor": "#1A1A1A"},
    {"id": "agarrado", "nome": "Agarrado", "categoria": "Debilitação Física", "cor": "#A0522D"},
    {"id": "contido", "nome": "Contido", "categoria": "Debilitação Física", "cor": "#6B3A2A"},
    {"id": "enfeiticado", "nome": "Enfeitiçado", "categoria": "Controle & Incapacitação", "cor": "#DA70D6"},
    {"id": "dominado", "nome": "Dominado", "categoria": "Controle & Incapacitação", "cor": "#9400D3"},
    {"id": "petrificado", "nome": "Petrificado", "categoria": "Controle & Incapacitação", "cor": "#708090"},
    {"id": "envenenado", "nome": "Envenenado", "categoria": "Dano Contínuo", "cor": "#228B22"},
    {"id": "queimando_1", "nome": "Queimando 1", "categoria": "Dano Contínuo", "cor": "#FF4500"},
    {"id": "queimando_2", "nome": "Queimando 2", "categoria": "Dano Contínuo", "cor": "#FF6600"},
    {"id": "queimando_3", "nome": "Queimando 3", "categoria": "Dano Contínuo", "cor": "#FF8800"},
    {"id": "sangrando", "nome": "Sangrando", "categoria": "Dano Contínuo", "cor": "#DC143C"},
    {"id": "congelando_1", "nome": "Congelando 1", "categoria": "Dano Contínuo", "cor": "#4682B4"},
    {"id": "congelando_2", "nome": "Congelando 2", "categoria": "Dano Contínuo", "cor": "#3A6FA5"},
    {"id": "congelando_3", "nome": "Congelando 3", "categoria": "Dano Contínuo", "cor": "#2E5C96"},
    {"id": "amedrontado", "nome": "Amedrontado", "categoria": "Mental & Sensorial", "cor": "#8A2BE2"},
    {"id": "cego", "nome": "Cego", "categoria": "Mental & Sensorial", "cor": "#2F4F4F"},
    {"id": "surdo", "nome": "Surdo", "categoria": "Mental & Sensorial", "cor": "#556B2F"},
    {"id": "confuso", "nome": "Confuso", "categoria": "Mental & Sensorial", "cor": "#9932CC"},
    {"id": "sufocando", "nome": "Sufocando", "categoria": "Ambiental", "cor": "#483D8B"},
    {"id": "abencoado", "nome": "Abençoado", "categoria": "Proteção & Bônus", "cor": "#DAA520"},
    {"id": "inspirado", "nome": "Inspirado", "categoria": "Proteção & Bônus", "cor": "#FFD700"},
    {"id": "cansado_1", "nome": "Cansado 1", "categoria": "Debilitação Física", "cor": "#9E9E75"},
    {"id": "cansado_2", "nome": "Cansado 2", "categoria": "Debilitação Física", "cor": "#8E8E65"},
    {"id": "cansado_3", "nome": "Cansado 3", "categoria": "Debilitação Física", "cor": "#7E7E55"},
    {"id": "cansado_4", "nome": "Cansado 4", "categoria": "Debilitação Física", "cor": "#6E6E45"},
    {"id": "cansado_5", "nome": "Cansado 5", "categoria": "Debilitação Física", "cor": "#5E5E35"},
    {"id": "cansado_6", "nome": "Cansado 6", "categoria": "Debilitação Física", "cor": "#4E4E25"},
    {"id": "cansado_7", "nome": "Cansado 7", "categoria": "Debilitação Física", "cor": "#1A1A1A"},
]

REGALIAS_TIPOS = [
    ("Combatente Aprendiz", "aprendiz", "Classe base de combate.", {"id": "combatente"}),
    ("Noviço Aprendiz", "aprendiz", "Classe base de magia divina.", {"id": "novico"}),
    ("Arcanista Aprendiz", "aprendiz", "Classe base de magia arcana.", {"id": "arcanista"}),
    ("Patrulheiro Aprendiz", "aprendiz", "Classe base de exploração.", {"id": "patrulheiro"}),
    ("Furtivo Aprendiz", "aprendiz", "Classe base de furtividade.", {"id": "furtivo"}),
    ("Socialista Aprendiz", "aprendiz", "Classe base de carisma.", {"id": "socialista"}),
    ("Psíquico", "opcional", "Poderes psíquicos.", {"custo": 2}),
    ("Vampiro / Wight / Draugr", "opcional", "Não-morto.", {"custo": 2}),
    ("Mutante", "opcional", "Mutações.", {"custo": 2}),
    ("Combatente", "classe_primaria", "Classe primária de combate.", {"id": "combatente_primario"}),
    ("Noviço", "classe_primaria", "Classe primária divina.", {"id": "novico_primario"}),
    ("Arcanista", "classe_primaria", "Classe primária arcana.", {"id": "arcanista_primario"}),
    ("Patrulheiro", "classe_primaria", "Classe primária de exploração.", {"id": "patrulheiro_primario"}),
    ("Furtivo", "classe_primaria", "Classe primária furtiva.", {"id": "furtivo_primario"}),
    ("Socialista", "classe_primaria", "Classe primária social.", {"id": "socialista_primario"}),
    ("Regalia de Espécie", "especie", "Regalias de traço racial.", {}),
    ("Regalia de Especialização", "especializacao", "Regalias de especialização.", {}),
    ("Regalia de Profissão", "profissao", "Regalias de profissão.", {}),
]

ITENS = [
    ("Adaga", "arma_simples", "Lâmina leve.", {"dano": "1d4", "tipoDano": "perfurante", "propriedades": ["leve", "acuidade", "arremesso"]}),
    ("Cajado", "arma_simples", "Bastão longo.", {"dano": "1d6", "tipoDano": "contundente", "propriedades": ["versatil"]}),
    ("Clava", "arma_simples", "Arma contundente.", {"dano": "1d4", "tipoDano": "contundente", "propriedades": ["leve"]}),
    ("Lança", "arma_simples", "Arma de haste.", {"dano": "1d6", "tipoDano": "perfurante", "propriedades": ["arremesso", "versatil"]}),
    ("Funda", "arma_simples", "Arma de arremesso.", {"dano": "1d4", "tipoDano": "contundente", "propriedades": ["distancia"]}),
    ("Espada Longa", "arma_marcial", "Espada versátil.", {"dano": "1d8", "tipoDano": "cortante", "propriedades": ["versatil"]}),
    ("Machado de Batalha", "arma_marcial", "Machado pesado.", {"dano": "1d8", "tipoDano": "cortante", "propriedades": ["versatil"]}),
    ("Arco Longo", "arma_marcial", "Arco de longo alcance.", {"dano": "1d8", "tipoDano": "perfurante", "propriedades": ["distancia", "duas_maos"]}),
    ("Espada Grande", "arma_marcial", "Espada de duas mãos.", {"dano": "2d6", "tipoDano": "cortante", "propriedades": ["pesada", "duas_maos"]}),
    ("Alabarda", "arma_marcial", "Arma de haste.", {"dano": "1d10", "tipoDano": "cortante", "propriedades": ["pesada", "alcance", "duas_maos"]}),
    ("Armadura de Couro", "armadura_leve", "Armadura leve de couro.", {"defesa": 1, "pesoTipo": "leve"}),
    ("Armadura de Couro Batido", "armadura_leve", "Couro reforçado.", {"defesa": 2, "pesoTipo": "leve"}),
    ("Cota de Malha", "armadura_media", "Anéis de metal.", {"defesa": 4, "pesoTipo": "media"}),
    ("Armadura de Placas", "armadura_pesada", "Placas de metal.", {"defesa": 8, "pesoTipo": "pesada"}),
    ("Escudo Leve", "escudo", "Escudo pequeno.", {"defesa": 1}),
    ("Escudo Médio", "escudo", "Escudo padrão.", {"defesa": 2}),
    ("Escudo Pesado", "escudo", "Escudo grande.", {"defesa": 3}),
]

ATTR_DEFINITIONS = [
    ("pv_max", "pv_max", "recurso"),
    ("pv_atual", "pv_atual", "recurso"),
    ("pm_max", "pm_max", "recurso"),
    ("pm_atual", "pm_atual", "recurso"),
    ("estamina_max", "estamina_max", "recurso"),
    ("estamina_atual", "estamina_atual", "recurso"),
    ("defesa_total", "defesa_total", "defesa"),
    ("velocidade_total", "velocidade_total", "velocidade"),
    ("iniciativa_total", "iniciativa_total", "combate"),
    ("carga_max", "carga_max", "carga"),
]


# ============================================================================
# FUNÇÕES DE SEED
# ============================================================================

def ensure_unique_index(cur, table, column='name'):
    """Garante que existe um índice UNIQUE para ON CONFLICT funcionar."""
    idx_name = f"uq_{table}_{column}_seed"
    cur.execute(f"""
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_indexes WHERE indexname = '{idx_name}'
            ) THEN
                CREATE UNIQUE INDEX {idx_name} ON {table} ({column});
            END IF;
        END $$;
    """)


def seed_skills(cur):
    """Popula tabela skills."""
    print(f"  📋 skills ({len(HABILIDADES)} habilidades)...")
    ensure_unique_index(cur, 'skills')
    for hab in HABILIDADES:
        extra = json.dumps({"slug": hab["slug"], "categoria": hab["categoria"]})
        cur.execute("""
            INSERT INTO skills (name, type, description, extra_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET
                type = EXCLUDED.type,
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (hab["nome"], hab["categoria"], hab["slug"], extra))
    print(f"     ✅ skills seeded")


def seed_proficiencies(cur):
    """Popula tabela proficiencies."""
    print(f"  📋 proficiencies ({len(PROFICIENCIAS)} proficiências)...")
    ensure_unique_index(cur, 'proficiencies')
    for prof in PROFICIENCIAS:
        extra = json.dumps({"id": prof["id"]})
        cur.execute("""
            INSERT INTO proficiencies (name, description, extra_data)
            VALUES (%s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (prof["nome"], prof["id"], extra))
    print(f"     ✅ proficiencies seeded")


def seed_conditions(cur):
    """Popula tabela conditions."""
    print(f"  📋 conditions ({len(CONDICOES)} condições)...")
    ensure_unique_index(cur, 'conditions')
    for cond in CONDICOES:
        extra = json.dumps({"id": cond["id"], "categoria": cond["categoria"], "cor": cond["cor"]})
        cur.execute("""
            INSERT INTO conditions (name, description, extra_data)
            VALUES (%s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (cond["nome"], cond["id"], extra))
    print(f"     ✅ conditions seeded")


def seed_regalias(cur):
    """Popula tabela regalias."""
    print(f"  📋 regalias ({len(REGALIAS_TIPOS)} entradas)...")
    ensure_unique_index(cur, 'regalias')
    for nome, tipo, desc, extra in REGALIAS_TIPOS:
        cur.execute("""
            INSERT INTO regalias (name, type, description, extra_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET
                type = EXCLUDED.type,
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (nome, tipo, desc, json.dumps(extra)))
    print(f"     ✅ regalias seeded")


def seed_items(cur):
    """Popula tabela items com armas, armaduras e escudos."""
    print(f"  📋 items ({len(ITENS)} itens)...")
    ensure_unique_index(cur, 'items')
    for nome, cat, desc, extra in ITENS:
        cur.execute("""
            INSERT INTO items (name, category, description, extra_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET
                category = EXCLUDED.category,
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (nome, cat, desc, json.dumps(extra)))
    print(f"     ✅ items seeded")


def seed_attribute_definitions(cur):
    """Popula attribute_definitions com atributos derivados."""
    print(f"  📋 attribute_definitions ({len(ATTR_DEFINITIONS)} atributos)...")
    for name, slug, attr_type in ATTR_DEFINITIONS:
        cur.execute("""
            INSERT INTO attribute_definitions (name, slug, type, extra_data)
            VALUES (%s, %s, %s, '{}'::jsonb)
            ON CONFLICT (slug) DO NOTHING
        """, (name, slug, attr_type))
    print(f"     ✅ attribute_definitions seeded")


def seed_audit_log_table(cur):
    """Garante que a tabela character_audit_log existe (TODO-BE-006)."""
    print("  📋 character_audit_log (verificando existência)...")
    cur.execute("""
        CREATE TABLE IF NOT EXISTS character_audit_log (
            id SERIAL PRIMARY KEY,
            character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            action TEXT NOT NULL,
            before_state JSONB,
            after_state JSONB,
            metadata JSONB DEFAULT '{}'::jsonb,
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_audit_character_id ON character_audit_log(character_id)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_audit_action ON character_audit_log(action)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_audit_created_at ON character_audit_log(created_at)")
    print(f"     ✅ audit_log ensured")


# ============================================================================
# MAIN
# ============================================================================

def main():
    print("=" * 60)
    print("  Seed de Catálogos — Lâmina do Oculto v0.5")
    print("  TODO-DAT-002")
    print("=" * 60)

    conn = get_conn()
    cur = conn.cursor()

    try:
        seed_skills(cur)
        seed_proficiencies(cur)
        seed_conditions(cur)
        seed_regalias(cur)
        seed_items(cur)
        seed_attribute_definitions(cur)
        seed_audit_log_table(cur)

        conn.commit()
        print(f"\n{'=' * 60}")
        print("  ✅ Todos os catálogos foram populados com sucesso!")
        print(f"{'=' * 60}\n")

    except Exception as e:
        conn.rollback()
        print(f"\n❌ Erro ao popular catálogos: {e}")
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()
