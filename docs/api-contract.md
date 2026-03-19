# Contrato de API — Lâmina do Oculto

> Documento gerado a partir da análise completa do frontend React.
> Base URL: `REACT_APP_LISTEN_ADDRESS` (ex: `http://localhost:5000`)

---

## Sumário

| Seção | Endpoints |
|---|---|
| [1. Autenticação](#1-autenticação) | Login, Signup, Confirmar Email, Esqueceu Senha, Redefinir Senha |
| [2. Usuários](#2-usuários) | Perfil, Atualizar Perfil, Alterar Senha |
| [3. Personagens (CRUD)](#3-personagens-crud) | Listar, Criar, Atualizar, Deletar |
| [4. Personagens (v2 — Ações)](#4-personagens-v2--ações) | Ficha Calculada, Condições, Descanso, Regalias, Abilities |
| [5. Snapshots de Evolução](#5-snapshots-de-evolução) | Listar, Criar, Restaurar |
| [6. Catálogos (v2)](#6-catálogos-v2) | Todos, Skills, Species, Conditions, Items, Abilities, Classes, Regalias, Árvores, Profissões |

---

## 1. Autenticação

### 1.1 Login

```
POST /login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response 200:**
```json
{
  "message": "string",
  "user": {
    "name": "string",
    "id": "string | number",
    "avatar": "string (base64 ou URL) | null"
  }
}
```

**Response 401 / 400:**
```json
{
  "error": "string"
}
```

> **Notas do frontend:**
> - O frontend armazena `{ name, id, avatar }` em `localStorage("user")`.
> - Se `error` contiver `"Email não confirmado"`, mostra mensagem específica.
> - Sem token JWT — toda autenticação subsequente usa `userId` do localStorage.

---

### 1.2 Cadastro (Signup)

```
POST /users
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response 201:**
```json
{
  "message": "string"
}
```

**Response 400 / 409:**
```json
{
  "error": "string"
}
```

> O frontend espera status 201 para sucesso. Após cadastro, o usuário precisa confirmar email.

---

### 1.3 Confirmar Email

```
POST /confirm_email
```

**Request Body:**
```json
{
  "token": "string"
}
```

**Response 200:**
```json
{
  "message": "string contendo 'sucesso'"
}
```

**Response 400:**
```json
{
  "error": "string"
}
```

> O frontend extrai o token da URL: `/confirmarEmail/:token`
> Verifica se `data.message.includes("sucesso")` para exibir tela de sucesso.

---

### 1.4 Esqueceu Senha

```
POST /forgot-password
```

**Request Body:**
```json
{
  "email": "string (lowercase, trimmed)"
}
```

**Response 200:**
```json
{
  "message": "string"
}
```

**Response 400 / 404:**
```json
{
  "error": "string"
}
```

---

### 1.5 Redefinir Senha

```
POST /reset-password
```

**Request Body:**
```json
{
  "token": "string",
  "new_password": "string (min 6 caracteres)"
}
```

**Response 200:**
```json
{
  "message": "string"
}
```

**Response 400:**
```json
{
  "error": "string"
}
```

> Token extraído da URL: `/redefinirSenha/:token`
> Frontend valida: tamanho mínimo 6 e confirmação.

---

## 2. Usuários

### 2.1 Obter Perfil

```
GET /users/{userId}
```

**Response 200:**
```json
{
  "name": "string",
  "email": "string",
  "avatar": "string (base64) | null"
}
```

> Usado por: `ProfilePage`, `Navbar` (para sincronizar avatar/nome).

---

### 2.2 Atualizar Perfil

```
PUT /users/{userId}
```

**Request Body (avatar):**
```json
{
  "avatar": "string (base64 data URI)"
}
```

**Request Body (nome):**
```json
{
  "name": "string (trimmed)"
}
```

**Response 200 (avatar):**
```json
{
  "avatar": "string"
}
```

**Response 200 (nome):**
```json
{
  "name": "string"
}
```

**Response 400 / 404:**
```json
{
  "error": "string"
}
```

> O frontend faz PUTs parciais — envia somente o campo alterado.
> Após sucesso, atualiza `localStorage("user")` e dispara `window.dispatchEvent(new Event('userProfileUpdated'))`.

---

### 2.3 Alterar Senha

```
PUT /users/{userId}/password
```

**Request Body:**
```json
{
  "current_password": "string",
  "new_password": "string (min 6 caracteres)"
}
```

**Response 200:**
```json
{
  "message": "string"
}
```

**Response 400 / 401:**
```json
{
  "error": "string"
}
```

---

## 3. Personagens (CRUD)

### 3.1 Listar Personagens do Usuário

```
GET /personagens/{userId}
```

**Response 200:**
```json
[
  {
    "id": "string | number",
    "nome_personagem": "string",
    "classe": "string",
    "especie": "string",
    "nivel": "number",
    "habilidades": {
      "Fortitude": 0,
      "Força": 0,
      "Agilidade": 0,
      "...": "number"
    },
    "antecedente": {
      "nome": "string"
    },
    "dinheiro": "number | string",
    "image": "string (base64) | null"
  }
]
```

> O frontend também usa `GET /users/{userId}/personagens` (via CharacterContext).
> Ambos devem retornar o mesmo formato. Recomendação: unificar em um único endpoint.

---

### 3.2 Obter Personagem Individual (via lista)

O frontend **não possui** um endpoint `GET /personagens/:id` individual.
Em vez disso, faz `GET /personagens/{userId}` e filtra pelo `id` no client-side:

```js
const char = data.find(c => c.id === characterId);
```

> **Recomendação**: Criar `GET /personagens/{charId}` para evitar carregar todos os personagens.

---

### 3.3 Criar Personagem

```
POST /users/{userId}/personagens
```

**Request Body — Payload completo:**
```json
{
  "nome_personagem": "string (2-50 chars, regex: ^[a-zA-Z0-9À-ÿ\\s'.,-]{2,50}$)",
  "classe": "Aprendiz",
  "image": "string (base64) | null",
  "nível": 1,
  "pontos_de_regalia": "number",
  "genero": "string",
  "dinheiro": "number | string",
  "idade": "number (10-1000)",
  "altura": "number",
  "descricao": "string (max 2000 chars)",

  "antecedente": "string (nome do antecedente selecionado ou objeto)",

  "habilidades": {
    "Acrobacia": 0,
    "Agilidade": 0,
    "Alquimia": 0,
    "Arcanatec": 0,
    "Arcanismo": 0,
    "Armadilhas": 0,
    "Atletismo": 0,
    "Combate Arcano": 0,
    "Combate Corpo a Corpo": 0,
    "Combate a Distância": 0,
    "Destreza": 0,
    "Enganação": 0,
    "Fortitude": 0,
    "Força": 0,
    "Furtividade": 0,
    "História": 0,
    "Intimidação": 0,
    "Intuição": 0,
    "Investigação": 0,
    "Jurisprudência (Política e leis)": 0,
    "Lidar com animais": 0,
    "Medicina": 0,
    "Natureza": 0,
    "Navegação": 0,
    "Negociação": 0,
    "Ocultismo": 0,
    "Percepção": 0,
    "Performance": 0,
    "Persuasão": 0,
    "Rastreamento": 0,
    "Ritualismo": 0,
    "Sedução": 0,
    "Sobrevivência": 0,
    "Tecnologia": 0,
    "Teologia": 0
  },

  "grupos_marcados": {
    "fisico": false,
    "exploracao": false,
    "conhecimento": false,
    "arcana": false,
    "social": false
  },

  "condições": {},

  "proficiencias": {
    "nome_proficiencia": "number (nível 0-5)"
  },

  "especie": "string (slug: humano, elfo, anao, feerico, etc.)",

  "regalias_de_especie": [
    "object (espécie selecionada com sub-raça)",
    "object (regalia de espécie escolhida)"
  ],

  "regalias_de_aprendiz": {
    "RegaliasDeAprendizSelecionada": {
      "id_regalia": {
        "nome": "string",
        "descricao": "string",
        "custoRegalia": "number"
      }
    }
  },

  "regalias_de_classe": {},
  "regalias_de_especialization": {},

  "regalias_de_profissao": [
    [
      {
        "profissao": "string",
        "habilidade": "string",
        "descricao": "string"
      }
    ]
  ],

  "regaliasCompradas": {
    "regalia_id": "number (custo em pontos)"
  },

  "equipamentos": [
    {
      "name": "string",
      "price": "number",
      "quantity": "number",
      "category": "string"
    }
  ],

  "pv_base_especie": "number",
  "velocidade_base_especie": "number",
  "pv_regalia_classe": "number",
  "pm_regalia_classe": "number",
  "pe_regalia_classe": "number",

  "recursos": {
    "pv_atual": "number",
    "pv_max": "number",
    "pm_atual": "number",
    "pm_max": "number",
    "estamina_atual": "number",
    "estamina_max": "number"
  },

  "defesa": {
    "base": 7,
    "agilidade": "number",
    "armadura": 0,
    "escudo": 0,
    "total": "number"
  },

  "velocidade": {
    "base_especie": "number",
    "bonus_agilidade": "number",
    "total": "number"
  },

  "iniciativa": {
    "total": "number"
  },

  "carga": {
    "capacidade_max": "number"
  }
}
```

**Response 201:**
```json
{
  "id": "string | number",
  "message": "string (opcional)"
}
```

**Response 400:**
```json
{
  "error": "string"
}
```

---

### 3.4 Atualizar Personagem

```
PUT /personagens/{charId}
```

**Request Body — campos possíveis (merge parcial):**

O frontend envia o objeto completo do personagem, mas em certos contextos envia apenas campos específicos:

```json
{
  "nome_personagem": "string",
  "descricao": "string",
  "image": "string (base64) | null",
  "habilidades": { "...": "number" },
  "grupos_marcados": { "...": "boolean" },
  "proficiencias": { "...": "number" },
  "condições": { "slug": "object condição" },
  "equipamentos": ["array de itens"],
  "nivel": "number",
  "experiencia": "number",
  "dinheiro": "number",

  "armas_equipadas": [
    "object item arma | null",
    "object item arma | null"
  ],
  "armadura_equipada": "object item armadura | null",
  "escudo_equipado": "object item escudo | null",

  "moedas": {
    "ouro": "number",
    "prata": "number",
    "cobre": "number"
  },

  "historico_rolagens": [
    {
      "tipo": "string (nome do dado ou habilidade)",
      "resultado": "number",
      "timestamp": "number (Date.now())",
      "detalhes": "string (opcional)"
    }
  ],

  "pv_atual": "number",
  "pe_atual": "number",
  "pm_atual": "number",
  "pv_temp": "number",
  "pe_temp": "number",
  "pm_temp": "number",
  "elemento_personagem": "string",

  "recursos": { "pv_atual": "N", "pv_max": "N", "...": "..." },
  "defesa": { "...": "..." },
  "velocidade": { "...": "..." },
  "iniciativa": { "...": "..." },
  "carga": { "...": "..." },

  "regalias_de_aprendiz": "object",
  "regalias_de_classe": "object",
  "regalias_de_especialization": "object",
  "regalias_de_profissao": "array",
  "regaliasCompradas": "object",
  "pontos_de_regalia": "number"
}
```

**Response 200:**
```json
{
  "message": "string"
}
```

**Response 400 / 404:**
```json
{
  "error": "string"
}
```

> **Comportamento esperado:** O backend deve fazer merge parcial (PATCH-like).
> O frontend envia `{ ...character, campo_alterado: novoValor }` em vários cenários:
> - Salvar ficha completa (botão salvar no header)
> - Auto-save de campos de combate (PV, PE, PM, elemento)
> - Equipar/desequipar arma, armadura, escudo
> - Atualizar moedas
> - Salvar histórico de rolagens (max 50 entradas)
> - Toggle de grupo de habilidades
> - Level up / level down

---

### 3.5 Deletar Personagem

```
DELETE /personagens/{charId}
```

**Response 200:**
```json
{
  "message": "string"
}
```

**Response 404:**
```json
{
  "error": "string"
}
```

---

## 4. Personagens (v2 — Ações)

### 4.1 Obter Ficha Calculada

```
GET /api/v2/personagens/{personagemId}/ficha
```

**Response 200:**
```json
{
  "personagem": "object (dados do personagem)",
  "stats": {
    "pv_max": "number",
    "pe_max": "number",
    "pm_max": "number",
    "defesa_total": "number",
    "velocidade_total": "number",
    "iniciativa": "number",
    "carga_max": "number"
  },
  "condicoes_ativas": [
    {
      "slug": "string",
      "nome": "string",
      "duracao_turnos": "number | null",
      "turnos_restantes": "number | null",
      "fonte": "string"
    }
  ],
  "modificadores": {
    "defesa": "number",
    "ataque": "number",
    "velocidade": "number",
    "percepcao": "number",
    "vantagem": "boolean",
    "desvantagem": "boolean"
  }
}
```

---

### 4.2 Aplicar Condição

```
POST /api/v2/personagens/{personagemId}/condicoes
```

**Request Body:**
```json
{
  "condicao_slug": "string",
  "duracao_turnos": "number | null",
  "fonte": "string | null",
  "user_id": "number"
}
```

**Response 200:**
```json
{
  "message": "string",
  "condicoes_ativas": ["array de condições atualizadas"],
  "modificadores": {
    "defesa": "number",
    "ataque": "number",
    "velocidade": "number",
    "percepcao": "number",
    "vantagem": "boolean",
    "desvantagem": "boolean"
  }
}
```

---

### 4.3 Remover Condição

```
DELETE /api/v2/personagens/{personagemId}/condicoes/{condicaoSlug}
```

**Request Body:**
```json
{
  "user_id": "number"
}
```

**Response 200:**
```json
{
  "message": "string",
  "condicoes_ativas": ["array de condições atualizadas"]
}
```

---

### 4.4 Realizar Descanso

```
POST /api/v2/personagens/{personagemId}/descanso
```

**Request Body:**
```json
{
  "tipo": "string ('curto' | 'longo')",
  "user_id": "number"
}
```

**Response 200:**
```json
{
  "message": "string",
  "recursos": {
    "pv_atual": "number",
    "pv_max": "number",
    "pm_atual": "number",
    "pm_max": "number",
    "estamina_atual": "number",
    "estamina_max": "number"
  },
  "condicoes_removidas": ["string[]"],
  "condicoes_ativas": ["array de condições restantes"]
}
```

> **Descanso Curto:** Restaura 50% estamina (PE) e remove condições de curta duração.
> **Descanso Longo:** Restaura PV, PE e PM ao máximo, remove todas as condições temporárias.

---

### 4.5 Comprar Regalia

```
POST /api/v2/personagens/{personagemId}/regalias
```

**Request Body:**
```json
{
  "regalia_slug": "string",
  "user_id": "number"
}
```

**Response 200:**
```json
{
  "message": "string",
  "pontos_restantes": "number",
  "regalia": {
    "slug": "string",
    "nome": "string",
    "tipo": "string",
    "custo": "number"
  }
}
```

**Response 400:**
```json
{
  "error": "string (pontos insuficientes, pré-requisito não atendido, etc.)"
}
```

---

### 4.6 Usar Habilidade (Ability)

```
POST /api/v2/personagens/{personagemId}/abilities/{abilitySlug}/usar
```

**Request Body:**
```json
{
  "user_id": "number",
  "contexto": {
    "alvo": "string (opcional)",
    "posicao": "string (opcional)"
  }
}
```

**Response 200:**
```json
{
  "message": "string",
  "custo": {
    "pm": "number",
    "pe": "number"
  },
  "recursos_atualizados": {
    "pm_atual": "number",
    "pe_atual": "number"
  },
  "efeito": "string (descrição do resultado)"
}
```

---

## 5. Snapshots de Evolução

### 5.1 Listar Snapshots

```
GET /personagens/{personagemId}/snapshots
```

**Response 200:**
```json
[
  {
    "nivel": "number",
    "data_criacao": "string (ISO 8601)",
    "dados": "object (estado completo do personagem naquele nível)"
  }
]
```

---

### 5.2 Criar Snapshot Manual

```
POST /personagens/{personagemId}/snapshots
```

**Request Body:**
```json
{
  "nivel": "number"
}
```

**Response 201:**
```json
{
  "message": "string",
  "snapshot": {
    "nivel": "number",
    "data_criacao": "string"
  }
}
```

---

### 5.3 Restaurar Snapshot

```
POST /personagens/{personagemId}/snapshots/{nivel}/restaurar
```

**Request Body:**
```json
{
  "user_id": "number"
}
```

**Response 200:**
```json
{
  "message": "string",
  "personagem": "object (estado restaurado)"
}
```

> Usado para regressão de nível: restaura o personagem ao estado do snapshot daquele nível.

---

## 6. Catálogos (v2)

### 6.1 Obter Todos os Catálogos

```
GET /api/v2/catalogs
```

**Response 200:**
```json
{
  "species": [
    {
      "slug": "string",
      "nome": "string",
      "pvBase": "number",
      "velocidadeBase": "number",
      "tamanho": "string",
      "resistencias": ["string[]"],
      "vulnerabilidades": ["string[]"],
      "imunidades": ["string[]"],
      "descricao": "string",
      "obrigatorias": [
        {
          "nome": "string (sub-raça)",
          "regalias": ["array"]
        }
      ]
    }
  ],
  "skills": [
    {
      "slug": "string",
      "nome": "string",
      "categoria": "string (fisico|exploracao|conhecimento|arcana|social)",
      "descricao": "string"
    }
  ],
  "conditions": [
    {
      "slug": "string",
      "id": "string",
      "descricao": "string",
      "duracao": "string",
      "cor": "string (hex)",
      "categoria": "string",
      "penalidades": {},
      "flags": {},
      "danoRecorrente": {},
      "stackRegra": "string",
      "cura": "string",
      "nivel": "number",
      "niveis": "number",
      "niveisDetalhes": [],
      "condicoesImplicitas": []
    }
  ],
  "regalias": [
    {
      "slug": "string",
      "id": "string",
      "nome": "string",
      "tipo": "string (aprendiz|classe|especializacao|opcional)",
      "descricao": "string",
      "custo": "number",
      "prerequisitos": []
    }
  ],
  "classes": [
    {
      "slug": "string",
      "nome": "string",
      "tipo": "string (primaria|especializacao)",
      "descricao": "string"
    }
  ],
  "abilities": [
    {
      "slug": "string",
      "nome": "string",
      "tipo": "string",
      "descricao": "string",
      "custo_pm": "number",
      "custo_pe": "number"
    }
  ],
  "arvores": [
    {
      "slug": "string",
      "classe": "string",
      "nome": "string",
      "regalias": ["string[] (slugs)"]
    }
  ],
  "profissoes": [
    {
      "slug": "string",
      "nome": "string",
      "descricao": "string",
      "ambienteEmprego": "string",
      "rendaPorDia": "number",
      "chanceDeRisco": "string",
      "beneficiosFixos": ["string[]"],
      "habilidades": [
        {
          "nome": "string",
          "descricao": "string",
          "custoRegalia": "number",
          "efeitos": ["string[]"]
        }
      ]
    }
  ],
  "items": [
    {
      "slug": "string",
      "nome": "string",
      "categoria": "string",
      "subcategoria": "string",
      "preco": "number",
      "peso": "number",
      "descricao": "string"
    }
  ]
}
```

> **Cache:** O frontend faz cache de 5 minutos em memória via `useCatalogs`.
> **Acesso por alias:** O hook aceita tanto `species` quanto `especies`, `skills` quanto `habilidades`, `conditions` quanto `condicoes`.
> **Recomendação:** Usar os nomes em inglês (`species`, `skills`, `conditions`) como chaves primárias.

---

### 6.2 Catálogos Individuais

#### Skills (Habilidades)

```
GET /api/v2/catalogs/skills
GET /api/v2/catalogs/skills?categoria={categoria}
```

#### Species (Espécies)

```
GET /api/v2/catalogs/species
GET /api/v2/catalogs/species?subespecies={true|false}
```

#### Conditions (Condições)

```
GET /api/v2/catalogs/conditions
GET /api/v2/catalogs/conditions?categoria={categoria}
```

#### Items (Equipamentos)

```
GET /api/v2/catalogs/items
GET /api/v2/catalogs/items?categoria={categoria}&subcategoria={subcategoria}
```

#### Abilities (Habilidades de classe)

```
GET /api/v2/catalogs/abilities
GET /api/v2/catalogs/abilities?tipo={tipo}
```

#### Classes

```
GET /api/v2/catalogs/classes
GET /api/v2/catalogs/classes?tipo={tipo}
```

#### Regalias

```
GET /api/v2/catalogs/regalias
GET /api/v2/catalogs/regalias?tipo={tipo}&classe={classeSlug}
```

#### Árvores de Regalias

```
GET /api/v2/catalogs/arvores
GET /api/v2/catalogs/arvores?classe={classeSlug}
```

#### Profissões

```
GET /api/v2/catalogs/profissoes
```

> Cada catálogo individual retorna um array de objetos com o mesmo schema descrito em 6.1.

---

## Convenções Gerais

### Headers Obrigatórios

```
Content-Type: application/json
```

### Padrão de Erros

Todas as respostas de erro devem seguir um destes formatos (o frontend verifica nesta ordem):

```json
{ "error": "mensagem de erro" }
```
```json
{ "erro": "mensagem de erro" }
```
```json
{ "message": "mensagem de erro" }
```

O `apiFetch` do frontend extrai: `data.error || data.erro || data.message || "Erro HTTP {status}"`.

### Status Codes Esperados

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso (POST /users, POST /personagens) |
| 400 | Validação / Dados inválidos |
| 401 | Não autorizado / Credenciais inválidas |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex.: email já existe) |
| 500 | Erro interno do servidor |

### Autenticação

O frontend **não envia tokens nos headers**. A identificação do usuário é feita por:

1. `userId` extraído de `localStorage("user").id`
2. Passado como parâmetro na URL (`/personagens/{userId}`, `/users/{userId}`)
3. Ou no body como `user_id` (endpoints v2)

> **Recomendação futura:** Migrar para autenticação baseada em token (JWT) via header `Authorization: Bearer {token}`.

### CORS

O frontend faz requisições de `localhost:3000` (dev) para o backend. CORS deve estar habilitado.

---

## Mapa de Endpoints Completo

| # | Método | Endpoint | Consumido por |
|---|--------|----------|---------------|
| 1 | POST | `/login` | LoginPage |
| 2 | POST | `/users` | SignupPage |
| 3 | POST | `/confirm_email` | confirm_email |
| 4 | POST | `/forgot-password` | ForgotPasswordPage |
| 5 | POST | `/reset-password` | ResetPasswordPage |
| 6 | GET | `/users/{userId}` | ProfilePage, Navbar |
| 7 | PUT | `/users/{userId}` | ProfilePage (avatar, name) |
| 8 | PUT | `/users/{userId}/password` | ProfilePage |
| 9 | GET | `/personagens/{userId}` | Character, useCharacterSheet |
| 10 | GET | `/users/{userId}/personagens` | CharacterContext |
| 11 | POST | `/users/{userId}/personagens` | useCharCreation |
| 12 | PUT | `/personagens/{charId}` | useCharacterSheet, components |
| 13 | DELETE | `/personagens/{charId}` | Character |
| 14 | GET | `/api/v2/personagens/{id}/ficha` | apiV2 (fetchFicha) |
| 15 | POST | `/api/v2/personagens/{id}/condicoes` | useCharacterSheet |
| 16 | DELETE | `/api/v2/personagens/{id}/condicoes/{slug}` | useCharacterSheet |
| 17 | POST | `/api/v2/personagens/{id}/descanso` | useCharacterSheet |
| 18 | POST | `/api/v2/personagens/{id}/regalias` | useRegalias |
| 19 | POST | `/api/v2/personagens/{id}/abilities/{slug}/usar` | apiV2 |
| 20 | GET | `/personagens/{id}/snapshots` | useCharacterSheet |
| 21 | POST | `/personagens/{id}/snapshots` | apiV2 |
| 22 | POST | `/personagens/{id}/snapshots/{nivel}/restaurar` | useCharacterSheet |
| 23 | GET | `/api/v2/catalogs` | useCatalogs |
| 24 | GET | `/api/v2/catalogs/skills` | apiV2 |
| 25 | GET | `/api/v2/catalogs/species` | apiV2 |
| 26 | GET | `/api/v2/catalogs/conditions` | apiV2 |
| 27 | GET | `/api/v2/catalogs/items` | apiV2 |
| 28 | GET | `/api/v2/catalogs/abilities` | apiV2 |
| 29 | GET | `/api/v2/catalogs/classes` | apiV2 |
| 30 | GET | `/api/v2/catalogs/regalias` | apiV2 |
| 31 | GET | `/api/v2/catalogs/arvores` | apiV2 |
| 32 | GET | `/api/v2/catalogs/profissoes` | apiV2 |

---

## Schema do Personagem Completo

Objeto unificado representando o estado completo de um personagem, conforme persistido e lido pelo frontend:

```json
{
  "id": "string | number",
  "nome_personagem": "string",
  "classe": "string",
  "especie": "string",
  "nivel": "number",
  "nível": "number (alias, usado na criação)",
  "experiencia": "number",
  "genero": "string",
  "idade": "number",
  "altura": "number",
  "descricao": "string",
  "image": "string (base64) | null",
  "dinheiro": "number | string",
  "pontos_de_regalia": "number",

  "antecedente": "string | object { nome }",

  "habilidades": {
    "Acrobacia": 0, "Agilidade": 0, "Alquimia": 0, "Arcanatec": 0,
    "Arcanismo": 0, "Armadilhas": 0, "Atletismo": 0,
    "Combate Arcano": 0, "Combate Corpo a Corpo": 0, "Combate a Distância": 0,
    "Destreza": 0, "Enganação": 0, "Fortitude": 0, "Força": 0,
    "Furtividade": 0, "História": 0, "Intimidação": 0, "Intuição": 0,
    "Investigação": 0, "Jurisprudência (Política e leis)": 0,
    "Lidar com animais": 0, "Medicina": 0, "Natureza": 0,
    "Navegação": 0, "Negociação": 0, "Ocultismo": 0, "Percepção": 0,
    "Performance": 0, "Persuasão": 0, "Rastreamento": 0,
    "Ritualismo": 0, "Sedução": 0, "Sobrevivência": 0,
    "Tecnologia": 0, "Teologia": 0
  },

  "grupos_marcados": {
    "fisico": false,
    "exploracao": false,
    "conhecimento": false,
    "arcana": false,
    "social": false
  },

  "proficiencias": {
    "nome_prof": "number (0-5)"
  },

  "condições": {},

  "regalias_de_especie": [],
  "regalias_de_aprendiz": {},
  "regalias_de_classe": {},
  "regalias_de_especialization": {},
  "regalias_de_profissao": [],
  "regaliasCompradas": {},

  "equipamentos": [
    {
      "name": "string",
      "price": "number",
      "quantity": "number",
      "category": "string"
    }
  ],

  "armas_equipadas": ["object | null", "object | null"],
  "armadura_equipada": "object | null",
  "escudo_equipado": "object | null",

  "recursos": {
    "pv_atual": "number",
    "pv_max": "number",
    "pm_atual": "number",
    "pm_max": "number",
    "estamina_atual": "number",
    "estamina_max": "number"
  },

  "pv_atual": "number",
  "pe_atual": "number",
  "pm_atual": "number",
  "pv_temp": "number",
  "pe_temp": "number",
  "pm_temp": "number",
  "pv_base_especie": "number",
  "velocidade_base_especie": "number",
  "pv_regalia_classe": "number",
  "pm_regalia_classe": "number",
  "pe_regalia_classe": "number",

  "defesa": {
    "base": 7,
    "agilidade": "number",
    "armadura": "number",
    "escudo": "number",
    "total": "number"
  },

  "velocidade": {
    "base_especie": "number",
    "bonus_agilidade": "number",
    "total": "number"
  },

  "iniciativa": {
    "total": "number"
  },

  "carga": {
    "capacidade_max": "number"
  },

  "elemento_personagem": "string | null",

  "moedas": {
    "ouro": "number",
    "prata": "number",
    "cobre": "number"
  },

  "historico_rolagens": [
    {
      "tipo": "string",
      "resultado": "number",
      "timestamp": "number",
      "detalhes": "string"
    }
  ]
}
```
