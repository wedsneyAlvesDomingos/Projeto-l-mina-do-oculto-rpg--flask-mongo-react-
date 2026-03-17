# Frontend — Lâmina do Oculto

## Stack

- **React 18** + React Router 6
- **MUI 6** (Material UI) + Emotion (styled)
- MUI X — Data Grid, Charts, Date Pickers
- SweetAlert2
- Chart.js / ApexCharts
- Frontend expõe na porta **5009**

## Configuração

| Variável | Descrição |
|---|---|
| `REACT_APP_LISTEN_ADDRESS` | URL base da API (backend) — ex: `http://localhost:5055` |

## Execução (Docker)

```bash
docker compose up -d --build
# Frontend disponível em http://localhost:5009
```

---

## Estrutura

```
src/
├── services/
│   └── apiV2.js              # Camada de acesso à API v2 do backend
├── hooks/
│   ├── useCatalogs.js        # Carrega catálogos (skills, espécies, condições, etc.) via v2
│   ├── useRegalias.js        # Consulta regalias por classe e árvores de progressão
│   └── darkmode.js           # Tema claro/escuro
├── pages/
│   ├── Home/                 # Página inicial
│   ├── Character/
│   │   ├── Character.js          # Visualização da ficha
│   │   ├── characterSheet.js     # Renderização da sheet
│   │   ├── criarPersonagem.js    # Wizard de criação de personagem
│   │   ├── useCharacterSheet.js  # Hook de estado da ficha (condições e descanso via v2)
│   │   ├── useCharCreation.js    # Hook de criação de personagem
│   │   └── components/           # Subcomponentes da ficha
│   ├── Login/                # Autenticação
│   ├── Profile/              # Perfil de usuário
│   ├── Wiki/                 # Consultas de regras
│   └── HomeLinks/            # Tutoriais e links
├── componentes/
│   ├── Navbar/               # Barra de navegação
│   ├── Footer/               # Rodapé
│   └── themes/               # Tokens, tema escuro, tema claro
├── data/
│   ├── constants/            # Dados estáticos legados (fallback)
│   └── userRole.js
├── routes/
│   ├── AppRoutes.js
│   ├── GeneralRoutes.js
│   └── UnProtectedRoutes.js
└── utils/
    ├── RequireAuth.js
    └── RedirectIfLoggedIn.js
```

---

## Integração com a API

### Camada de serviços v2

`src/services/apiV2.js` centraliza todas as chamadas à API v2 do backend:

```js
// Exemplos de uso
import { getCatalogs, getFicha, aplicarDescanso, aplicarCondicao } from '../services/apiV2';

const catalogs = await getCatalogs();          // GET /api/v2/catalogs
const ficha = await getFicha(personagemId);    // GET /api/v2/personagens/:id/ficha
await aplicarDescanso(id, 'curto', userId);    // POST /api/v2/personagens/:id/descanso
await aplicarCondicao(id, slug, dur, userId);  // POST /api/v2/personagens/:id/condicoes
```

### Hook de catálogos — `useCatalogs`

Carrega todos os catálogos do banco na inicialização, com cache em memória:

```js
const { skills, species, conditions, regalias, loading, error } = useCatalogs();
```

### Hook de regalias — `useRegalias`

Consulta regalias filtradas por tipo e/ou classe, e árvores de progressão:

```js
const { regaliasPorClasse, arvoresPorClasse, loading } = useRegalias({ classeSlug: 'combatente' });
```

### Hook de ficha — `useCharacterSheet`

Gerencia estado completo da ficha de personagem. Condições e descanso usam a API v2 com fallback para v1 quando necessário:

```js
// Descanso: tenta v2 primeiro, fallback para lógica local v1
const handleDescanso = async (tipo) => { ... };

// Condições: aplica via POST /api/v2/personagens/:id/condicoes
const handleCondicao = async (slug, duracao) => { ... };
```

---

## Dados estáticos (legado / fallback)

Os arquivos em `src/data/constants/` (habilidades, espécies, condições, regalias, etc.) são mantidos como **fallback** para quando a API v2 não está disponível. A fonte de verdade em produção são as tabelas `catalog_*` do banco de dados servidas por `/api/v2/catalogs`.

| Arquivo legado | Tabela DB equivalente |
|---|---|
| `habilidades.js` | `catalog_skills` |
| `especies.js` | `catalog_especies` + `catalog_subespecies` |
| `condicoes.js` | `catalog_condicoes` |
| `regalias.js` | `catalog_regalias` |
| `equipamentos.js` | `catalog_items` |
| `profissoes.js` | `catalog_profissoes` |
| `proficiencias.js` | `catalog_proficiencias` |

---

## Testes (271 testes)

```bash
cd frontend && npm test -- --watchAll=false
```

Arquivos de teste em `src/__tests__/`:
- `condicoes.test.js`
- `habilidades.test.js`
- `pipeline.test.js`
- `regras.test.js`
