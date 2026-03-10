import os
import sys
import json
import psycopg2
from psycopg2.extras import RealDictCursor

SECTION_FIELDS = {
    "dinheiro": "dinheiro",
    "antecedente": "antecedente",
    "habilidades": "habilidades",
    "condicoes": "condicoes",
    "proficiencias": "proficiencias",
    "regalias_de_especie": "regalias_de_especie",
    "regalias_de_aprendiz": "regalias_de_aprendiz",
    "regalias_de_classe": "regalias_de_classe",
    "regalias_de_especialization": "regalias_de_especialization",
    "regalias_de_profissao": "regalias_de_profissao",
    "equipamentos": "equipamentos",
    "moedas": "moedas",
    "armas_equipadas": "armas_equipadas",
    "armadura_equipada": "armadura_equipada",
    "escudo_equipado": "escudo_equipado",
    "historico_rolagens": "historico_rolagens",
}

BASE_FIELDS = {
    "nome_personagem": "name",
    "especie": "race",
    "classe": "character_class",
    "nivel": "level",
    "pontos_de_regalia": "regalia_points",
    "image": "image",
    "genero": "gender",
    "idade": "age",
    "descricao": "description",
}


def get_env(name, default=None):
    value = os.getenv(name, default)
    if value is None:
        raise RuntimeError(f"Missing env var: {name}")
    return value


def connect():
    return psycopg2.connect(
        host=get_env("POSTGRES_HOST", "localhost"),
        port=int(get_env("POSTGRES_PORT", "5433")),
        user=get_env("POSTGRES_USER"),
        password=get_env("POSTGRES_PASSWORD"),
        dbname=get_env("POSTGRES_DB"),
    )


def table_exists(cur, table_name):
    cur.execute(
        """
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = %s
        );
        """,
        (table_name,),
    )
    return cur.fetchone()[0]


def upsert_section(cur, character_id, section_key, data):
    cur.execute(
        """
        INSERT INTO character_sections (character_id, section_key, data)
        VALUES (%s, %s, %s)
        ON CONFLICT (character_id, section_key)
        DO UPDATE SET data = EXCLUDED.data;
        """,
        (character_id, section_key, json.dumps(data)),
    )


def main():
    try:
        conn = connect()
    except Exception as exc:
        print(f"Erro ao conectar no banco: {exc}", file=sys.stderr)
        sys.exit(1)

    with conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if not table_exists(cur, "personagens"):
                print("Tabela 'personagens' não encontrada. Nada para migrar.")
                return

            if not table_exists(cur, "characters"):
                print("Tabela 'characters' não encontrada. Crie o novo schema primeiro.")
                return

            cur.execute("SELECT * FROM personagens ORDER BY id;")
            rows = cur.fetchall()
            if not rows:
                print("Nenhum registro encontrado em 'personagens'.")
                return

            for row in rows:
                base_payload = {BASE_FIELDS[k]: row.get(k) for k in BASE_FIELDS}
                cur.execute(
                    """
                    INSERT INTO characters (user_id, name, race, character_class, level,
                                            regalia_points, image, gender, age, description,
                                            created_at, updated_at)
                    VALUES (%(user_id)s, %(name)s, %(race)s, %(character_class)s, %(level)s,
                            %(regalia_points)s, %(image)s, %(gender)s, %(age)s, %(description)s,
                            COALESCE(%(criado_em)s, NOW()), COALESCE(%(atualizado_em)s, NOW()))
                    RETURNING id;
                    """,
                    {
                        "user_id": row.get("user_id"),
                        **base_payload,
                        "criado_em": row.get("criado_em"),
                        "atualizado_em": row.get("atualizado_em"),
                    },
                )
                new_id = cur.fetchone()["id"]

                for legacy_key, section_key in SECTION_FIELDS.items():
                    if legacy_key in row and row[legacy_key] is not None:
                        upsert_section(cur, new_id, section_key, row[legacy_key])

            print(f"Migrados {len(rows)} personagens.")


if __name__ == "__main__":
    main()
