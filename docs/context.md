# Contexto da Aplicação

## O que é
Plataforma web para criação e gerenciamento de fichas de RPG, com foco em personagens, atributos, inventário, regalias e progressão.

## Como funciona
- Usuário cria conta e autentica
- Personagens são criados e editados no frontend
- API persiste dados no PostgreSQL
- Estrutura de dados separa campos base (characters) de seções variáveis (character_sections)
- Frontend consome endpoints REST para listar e atualizar personagens

## Fluxo principal
1. Cadastro/Login
2. Listagem de personagens por usuário
3. Edição de ficha por seções
4. Salvamento incremental via PUT

## Objetivo técnico
- Escalabilidade de ficha sem alterações frequentes de schema
- Reuso de componentes UI e temas
- Separação clara entre camadas
