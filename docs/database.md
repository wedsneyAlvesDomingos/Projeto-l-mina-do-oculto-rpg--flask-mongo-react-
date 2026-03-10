# Banco de Dados (PostgreSQL)

## Estrutura principal
### users
- id (PK)
- name, email, password
- email_confirmed, confirmation_token
- created_at, updated_at

### characters
- id (PK)
- user_id (FK -> users.id)
- name, race, character_class
- level, experience
- regalia_points
- image, gender, age, description
- created_at, updated_at

### character_sections
- id (PK)
- character_id (FK -> characters.id)
- section_key
- data (JSONB)

## Tabelas de catálogo e relação (preparadas)
- attribute_definitions / character_attributes
- items / character_inventory
- skills / character_skills
- conditions / character_conditions
- proficiencies / character_proficiencies
- regalias / character_regalias

## Filosofia
- Campos base em characters
- Seções flexíveis via JSONB em character_sections
- Evita mudanças de schema para novos itens/perícias

## Reset do schema
Arquivo: backend/db/schema.sql
