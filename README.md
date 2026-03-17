# Lâmina do Oculto RPG

**Lâmina do Oculto** é uma aplicação web para gerenciamento de fichas de RPG baseada no sistema de regras LDO v0.5. O projeto utiliza Flask + PostgreSQL no backend e React no frontend, com motor de regras backend-cêntrico que calcula fichas completas automaticamente.

---

## Stack

| Camada | Tecnologias |
|---|---|
| **Backend** | Flask · SQLAlchemy · Flask-CORS · Flask-Mail |
| **Banco de dados** | PostgreSQL 15 (psycopg2) |
| **Frontend** | React 18 · React Router 6 · MUI 6 · Emotion |
| **Infraestrutura** | Docker · Docker Compose |

---

## Estrutura do projeto

```
├── backend/
│   ├── app/
│   │   ├── main.py              # Entrypoint Flask + todas as rotas (v1 e v2)
│   │   ├── catalogs.py          # Funções DB-backed para consulta aos catálogos
│   │   ├── config.py            # Configuração via variáveis de ambiente
│   │   ├── userClass.py         # Modelo de usuário legado
│   │   ├── models/
│   │   │   └── models.py        # Todos os modelos SQLAlchemy (catalog_* + character_*)
│   │   ├── services/
│   │   │   ├── rule_engine.py       # Motor de regras (~1200 linhas)
│   │   │   ├── personagem_service.py # CRUD de personagens + cálculo de ficha
│   │   │   └── user_service.py      # Autenticação, email, perfil
│   │   └── templates/           # Templates de e-mail (confirmação, reset de senha)
│   ├── db/
│   │   └── schema_v2.sql        # Schema SQL completo (catálogos + personagens)
│   ├── scripts/
│   │   └── seed_catalogs.py     # Popula as 12 tabelas catalog_* com dados do livro de regras
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── apiV2.js         # Camada de acesso à API v2
│   │   ├── hooks/
│   │   │   ├── useCatalogs.js   # Hook para carregar catálogos do banco
│   │   │   └── useRegalias.js   # Hook para consulta de regalias por classe
│   │   ├── pages/
│   │   │   └── Character/       # Ficha, criação e sheet do personagem
│   │   └── componentes/         # Navbar, temas, UI compartilhada
│   ├── package.json
│   └── Dockerfile
│
├── docs/                        # Documentação técnica
├── docker-compose.yml
└── env-exemple                  # Variáveis de ambiente (copie para .env)
```

---

## Configuração e execução

### Pré-requisitos

- Docker e Docker Compose instalados

### 1. Variáveis de ambiente

```bash
cp env-exemple .env
# Edite .env com suas credenciais reais
```

Variáveis obrigatórias (ver `env-exemple`):

| Variável | Descrição |
|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Credenciais do banco |
| `POSTGRES_HOST` / `POSTGRES_PORT` | Host e porta do PostgreSQL |
| `SECRET_KEY` | Chave para JWT e tokens de e-mail |
| `MAIL_*` | Configurações do servidor SMTP |
| `REACT_APP_LISTEN_ADDRESS` | URL base da API consumida pelo frontend |
| `FRONTEND_URL` | URL do frontend usada nos links de e-mail |

### 2. Subir os serviços

```bash
docker compose up -d --build
```

Serviços expostos:

| Serviço | URL |
|---|---|
| Backend (Flask) | http://localhost:5055 |
| Frontend (React) | http://localhost:5009 |
| PostgreSQL | localhost:5433 |

### 3. Popular os catálogos de regras

Na primeira execução (ou após resetar o banco), popule as tabelas `catalog_*`:

```bash
docker compose exec backend python scripts/seed_catalogs.py
```

Isso insere ~12 tabelas com dados do livro de regras LDO 0.5 (espécies, habilidades, regalias, condições, itens, etc.).

---

## Testes

### Backend (168 testes)

```bash
docker compose exec backend pytest
```

### Frontend (271 testes)

```bash
cd frontend && npm test -- --watchAll=false
```

---

## Documentação técnica

| Documento | Conteúdo |
|---|---|
| [docs/backend.md](docs/backend.md) | Endpoints da API (v1 e v2), serviços, seed |
| [docs/frontend.md](docs/frontend.md) | Estrutura React, hooks v2, integração com API |
| [docs/design-system.md](docs/design-system.md) | Design system, temas, tokens de estilo |
| [docs/regras-negocio-fichas-automatizadas.md](docs/regras-negocio-fichas-automatizadas.md) | Regras de negócio do motor de fichas |
| [docs/schema-database.md](docs/schema-database.md) | Schema do banco de dados v2 |
| [docs/schema-ficha.json](docs/schema-ficha.json) | Contrato JSON da ficha calculada |
| [backend/db/schema_v2.sql](backend/db/schema_v2.sql) | DDL completo do banco |

---

## Contato

Para mais informações, entre em contato com Wedsney Alves.
