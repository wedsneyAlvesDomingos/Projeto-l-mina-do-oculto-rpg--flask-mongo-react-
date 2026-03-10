# Backend

## Stack
- Flask
- SQLAlchemy + Flask-SQLAlchemy
- Flask-Mail
- Flask-CORS
- PostgreSQL (psycopg2)

## Configuração
Variáveis principais (ver backend/.env):
- FLASK_ENV
- SECRET_KEY
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- POSTGRES_HOST
- POSTGRES_PORT
- MAIL_* (SMTP)

## Execução (Docker)
- docker compose up -d --build
- Backend expõe: http://<host>:5055

## Endpoints
### Usuários
- POST /users
  - body: { name, email, password }
- POST /login
  - body: { email, password }
- POST /confirm_email
  - body: { token }

### Personagens
- POST /users/{user_id}/personagens
  - body: payload do personagem (campos base + seções)
- GET /personagens/{user_id}
- PUT /personagens/{personagem_id}

## Modelo de dados (resumo)
- Base em characters + sections
- Campos base normalizados em characters
- Dados variáveis por seção em character_sections

## Observações
- CORS habilitado no app
- Mail sender URL definido em app/main.py
