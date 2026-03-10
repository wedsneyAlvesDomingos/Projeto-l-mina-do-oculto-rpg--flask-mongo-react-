#!/usr/bin/env python3
"""
Seed de Catálogos — Lâmina do Oculto v0.5
============================================
Popula as tabelas de catálogo do banco (skills, proficiencies, conditions)
com os dados extraídos do frontend.

TODO-BE-003: Sincronizar catálogos do frontend com tabelas do banco.

Uso:
    cd backend/app
    python ../scripts/seed_catalogs.py

Ou dentro do container Docker:
    docker exec -it ldo-backend python scripts/seed_catalogs.py
"""

import os
import sys
import json
import psycopg2
from psycopg2.extras import execute_values

# Adicionar diretório do app ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'app'))

from catalogs import HABILIDADES, PROFICIENCIAS, CONDICOES, ESPECIES


def get_conn():
    """Cria conexão com o PostgreSQL usando variáveis de ambiente."""
    return psycopg2.connect(
        host=os.getenv("POSTGRES_HOST", "localhost"),
        port=os.getenv("POSTGRES_PORT", "5433"),
        dbname=os.getenv("POSTGRES_DB", "your_database"),
        user=os.getenv("POSTGRES_USER", "your_user"),
        password=os.getenv("POSTGRES_PASSWORD", "your_password"),
    )


def seed_skills(cur):
    """Popula tabela `skills` com as 35 habilidades."""
    print(f"  Seeding skills ({len(HABILIDADES)} habilidades)...")

    for hab in HABILIDADES:
        extra = json.dumps({"slug": hab["slug"], "categoria": hab["categoria"]})
        cur.execute(
            """
            INSERT INTO skills (name, type, description, extra_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            (hab["nome"], hab["categoria"], hab["slug"], extra),
        )

    print(f"  ✓ skills seeded")


def seed_proficiencies(cur):
    """Popula tabela `proficiencies` com as 15 proficiências."""
    print(f"  Seeding proficiencies ({len(PROFICIENCIAS)} proficiências)...")

    for prof in PROFICIENCIAS:
        extra = json.dumps({"id": prof["id"]})
        cur.execute(
            """
            INSERT INTO proficiencies (name, description, extra_data)
            VALUES (%s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            (prof["nome"], prof["id"], extra),
        )

    print(f"  ✓ proficiencies seeded")


def seed_conditions(cur):
    """Popula tabela `conditions` com as 32 condições."""
    print(f"  Seeding conditions ({len(CONDICOES)} condições)...")

    for cond in CONDICOES:
        extra = json.dumps({"id": cond["id"], "categoria": cond["categoria"]})
        cur.execute(
            """
            INSERT INTO conditions (name, description, extra_data)
            VALUES (%s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            (cond["nome"], cond["id"], extra),
        )

    print(f"  ✓ conditions seeded")


def seed_attribute_definitions(cur):
    """
    Popula tabela `attribute_definitions` com as definições de atributos
    derivados (PV, PM, Estamina, Defesa, Velocidade, Iniciativa, etc.)
    """
    attrs = [
        ("pv_max",          "pv_max",          "recurso",    {}),
        ("pv_atual",        "pv_atual",        "recurso",    {}),
        ("pm_max",          "pm_max",          "recurso",    {}),
        ("pm_atual",        "pm_atual",        "recurso",    {}),
        ("estamina_max",    "estamina_max",    "recurso",    {}),
        ("estamina_atual",  "estamina_atual",  "recurso",    {}),
        ("defesa_total",    "defesa_total",    "defesa",     {}),
        ("velocidade_total","velocidade_total", "velocidade", {}),
        ("iniciativa_total","iniciativa_total", "combate",    {}),
        ("carga_max",       "carga_max",       "carga",      {}),
    ]

    print(f"  Seeding attribute_definitions ({len(attrs)} atributos)...")

    for name, slug, attr_type, extra in attrs:
        cur.execute(
            """
            INSERT INTO attribute_definitions (name, slug, type, extra_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (slug) DO NOTHING
            """,
            (name, slug, attr_type, json.dumps(extra)),
        )

    print(f"  ✓ attribute_definitions seeded")


def seed_regalias(cur):
    """
    Popula tabela `regalias` com entradas de placeholder para os tipos de regalia.
    (Dados completos de regalias são muito extensos — seeded por tipo/categoria.)
    """
    tipos = [
        ("Regalia de Espécie",       "especie",       "Regalias de traço racial"),
        ("Regalia de Aprendiz",      "aprendiz",      "Regalias da classe de aprendiz"),
        ("Regalia de Classe",        "classe",        "Regalias da classe primária"),
        ("Regalia de Especialização","especializacao", "Regalias da especialização"),
        ("Regalia de Profissão",     "profissao",     "Regalias de profissão"),
        ("Regalia Opcional",         "opcional",      "Regalias opcionais / variantes de espécie"),
    ]

    print(f"  Seeding regalias ({len(tipos)} tipos)...")

    for nome, tipo, desc in tipos:
        extra = json.dumps({"tipo": tipo})
        cur.execute(
            """
            INSERT INTO regalias (name, type, description, extra_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            (nome, tipo, desc, extra),
        )

    print(f"  ✓ regalias seeded")


def main():
    print("=" * 60)
    print("Seed de Catálogos — Lâmina do Oculto v0.5")
    print("=" * 60)

    conn = get_conn()
    cur = conn.cursor()

    try:
        seed_skills(cur)
        seed_proficiencies(cur)
        seed_conditions(cur)
        seed_attribute_definitions(cur)
        seed_regalias(cur)

        conn.commit()
        print("\n✅ Todos os catálogos foram populados com sucesso!")

    except Exception as e:
        conn.rollback()
        print(f"\n❌ Erro ao popular catálogos: {e}")
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()
