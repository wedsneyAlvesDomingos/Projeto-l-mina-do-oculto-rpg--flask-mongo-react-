# Backend — Lâmina do Oculto

## Stack

- **Flask** + Flask-SQLAlchemy + Flask-CORS + Flask-Mail
- **PostgreSQL 15** (psycopg2) — porta 5433 no container `postgresLDO`
- Backend expõe na porta **5055**

## Configuração

Variáveis de ambiente (ver `env-exemple`):

| Variável | Descrição |
|---|---|
| `FLASK_ENV` | `development` ou `production` |
| `SECRET_KEY` | Chave para JWT e tokens de e-mail |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Credenciais do banco |
| `POSTGRES_HOST` / `POSTGRES_PORT` | Endereço e porta do PostgreSQL |
| `MAIL_SERVER` / `MAIL_PORT` / `MAIL_USERNAME` / `MAIL_PASSWORD` | Configuração SMTP |
| `FRONTEND_URL` | URL do frontend, usada nos links de e-mail |

## Execução (Docker)

```bash
docker compose up -d --build
# Backend disponível em http://localhost:5055
```

## Estrutura de serviços

| Arquivo | Responsabilidade |
|---|---|
| `app/main.py` | Entrypoint Flask · registro de todas as rotas v1 e v2 |
| `app/catalogs.py` | Funções DB-backed para consulta às tabelas `catalog_*` |
| `app/models/models.py` | Modelos SQLAlchemy (934 linhas) · definição de todas as tabelas |
| `app/services/rule_engine.py` | Motor de regras (~1200 linhas) · `calcular_ficha_completa`, `validar_regalias`, `simular_acao` |
| `app/services/personagem_service.py` | CRUD de personagens · cálculo de ficha · descanso · condições · regalias |
| `app/services/user_service.py` | Criação/login/perfil de usuário · reset de senha por e-mail |

## Seed de catálogos

Popula as 12 tabelas `catalog_*` com dados do livro de regras LDO 0.5:

```bash
docker compose exec backend python scripts/seed_catalogs.py
```

---

## Endpoints

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/users` | Cria usuário · envia e-mail de confirmação |
| `GET` | `/users/<user_id>` | Retorna dados do usuário (sem senha) |
| `PUT` | `/users/<user_id>` | Atualiza nome e/ou avatar |
| `PUT` | `/users/<user_id>/password` | Atualiza senha (exige senha atual) |
| `POST` | `/confirm_email` | Confirma e-mail com token |
| `POST` | `/login` | Autentica e retorna dados do usuário |
| `POST` | `/forgot-password` | Solicita link de redefinição de senha |
| `POST` | `/reset-password` | Aplica nova senha com token |

### Personagens

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/users/<user_id>/personagens` | Cria personagem · retorna `id` e `personagem_id` |
| `GET` | `/personagens/<user_id>` | Lista personagens do usuário |
| `PUT` | `/personagens/<personagem_id>` | Atualiza personagem |
| `DELETE` | `/personagens/<personagem_id>` | Remove personagem |
| `GET` | `/personagens/<personagem_id>/calcular` | Retorna ficha com stats derivados (motor v1) |
| `GET` | `/personagens/<personagem_id>/validar-regalias` | Valida as regalias do personagem |
| `POST` | `/api/personagem/<personagem_id>/simular-acao` | Simula ação (teste / ataque / descanso) |

**Body para `/simular-acao`:**
```json
// Teste de habilidade
{ "tipo": "teste", "habilidade": "forca", "cd": 15, "bonus": 0 }
// Ataque
{ "tipo": "ataque", "habilidade_acerto": "combate_corpo_a_corpo", "habilidade_dano": "forca", "arma_dano": "1d8", "alvo_defesa": 14 }
// Descanso
{ "tipo": "descanso_curto" }
{ "tipo": "descanso_longo" }
```

### Catálogos (legado)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/catalogos` | Retorna habilidades, proficiências, condições e espécies (fallback estático) |

---

## API v2

### Catálogos DB-backed

Todos os catálogos servem dados diretamente do banco de dados (tabelas `catalog_*`).

| Método | Rota | Query params opcionais | Descrição |
|---|---|---|---|
| `GET` | `/api/v2/catalogs` | — | Todos os catálogos em uma única chamada |
| `GET` | `/api/v2/catalogs/skills` | `?categoria=` | Habilidades (35 do sistema) |
| `GET` | `/api/v2/catalogs/proficiencias` | — | Proficiências |
| `GET` | `/api/v2/catalogs/species` | `?subespecies=false` | Espécies (com subespécies por padrão) |
| `GET` | `/api/v2/catalogs/conditions` | `?categoria=` | Condições e estados |
| `GET` | `/api/v2/catalogs/items` | `?categoria=` `?subcategoria=` | Equipamentos e itens |
| `GET` | `/api/v2/catalogs/abilities` | `?tipo=` | Habilidades especiais/abilities |
| `GET` | `/api/v2/catalogs/classes` | `?tipo=` | Classes (aprendiz, primária, especialização) |
| `GET` | `/api/v2/catalogs/regalias` | `?tipo=` `?classe=` | Regalias |
| `GET` | `/api/v2/catalogs/arvores` | `?classe=` | Árvores de regalias por classe |
| `GET` | `/api/v2/catalogs/profissoes` | — | Profissões |

### Personagem v2 (ficha calculada)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/v2/personagens/<id>/ficha` | Ficha completa com todos os derivados calculados pelo backend |
| `POST` | `/api/v2/personagens/<id>/regalias` | Compra uma regalia ou nível de árvore |
| `POST` | `/api/v2/personagens/<id>/abilities/<slug>/usar` | Usa uma ability |
| `POST` | `/api/v2/personagens/<id>/descanso` | Realiza descanso (`curto`, `longo`, `pleno`) |
| `POST` | `/api/v2/personagens/<id>/condicoes` | Aplica uma condição ao personagem |
| `DELETE` | `/api/v2/personagens/<id>/condicoes/<slug>` | Remove uma condição ativa |

**Bodies:**

```json
// POST /regalias
{ "regalia_slug": "determinacao_humana" }
// ou
{ "arvore_nivel_slug": "combatente_arvore_1" }

// POST /abilities/:slug/usar
{ "user_id": 1, "contexto": {} }

// POST /descanso
{ "tipo": "curto", "user_id": 1 }

// POST /condicoes
{ "condicao_slug": "queimando_1", "duracao_turnos": 3, "fonte": "tocha", "user_id": 1 }
```

---

## Schema do banco

O schema completo está em `backend/db/schema_v2.sql`. Os modelos SQLAlchemy em `backend/app/models/models.py` são a fonte de verdade para a estrutura de dados em runtime.

**Tabelas de catálogo** (imutáveis — dados do livro de regras):
`catalog_skills`, `catalog_proficiencias`, `catalog_especies`, `catalog_subespecies`, `catalog_antecedentes`, `catalog_condicoes`, `catalog_items`, `catalog_abilities`, `catalog_profissoes`, `catalog_regalias`, `catalog_classes`, `catalog_arvores_regalia`, `catalog_arvore_niveis`

**Tabelas de personagem** (estado da ficha):
`characters`, `character_sections`, `character_skills_v2`, `character_proficiencias_v2`, `character_regalias_v2`, `character_abilities_v2`, `character_effects_v2`, `character_audit_log`
