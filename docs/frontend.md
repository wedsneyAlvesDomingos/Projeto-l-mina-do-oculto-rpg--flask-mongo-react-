# Frontend

## Stack
- React 18
- React Router 6
- MUI 6 (Material UI)
- Emotion (styled)
- MUI X (Data Grid, Charts, Date Pickers)
- SweetAlert2
- Chart.js / ApexCharts

## Execução (Docker)
- docker compose up -d --build
- Frontend expõe: http://<host>:5009

## Configuração
- REACT_APP_LISTEN_ADDRESS: base URL da API (backend)

## Estrutura
- src/pages: páginas principais (Home, Login, Character, Wiki)
- src/componentes: Navbar, temas, utilitários
- src/pages/Character/components: componentes de ficha

## Integração com API
- Consome endpoints /users, /login, /personagens
- Base URL via REACT_APP_LISTEN_ADDRESS
