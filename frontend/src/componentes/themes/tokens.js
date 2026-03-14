/**
 * tokens.js — Design Tokens · Lâmina do Oculto
 *
 * Fonte única de verdade para todas as cores e estilos da interface.
 * Importe este arquivo em qualquer componente em vez de usar valores
 * hexadecimais "soltos".
 *
 * Uso:
 *   import { colors, gradients, shadows, surfaces } from '../themes/tokens';
 *   <Box sx={{ backgroundColor: colors.blood }} />
 */

/* ═══════════════════════════════════════════════════════
   PALETA BASE — as 10 cores canônicas do projeto
   ═══════════════════════════════════════════════════════ */
export const colors = {
  /* Vermelhos / Marrons — tom de sangue e ferrugem */
  blood:     '#40150A', // vermelho sangue escuro — títulos, bordas primárias
  crimson:   '#5B1F0F', // marrom-carmim — textos de destaque quente
  scarlet:   '#7B3311', // laranja-ferrugem — ações de perigo, crítico
  garnet:    '#931C4A', // bordô/carmesim — classe, magia, perigo

  /* Dourados / Oliva — tom de pergaminho e metal */
  gold:      '#BB8130', // dourado âmbar — indicadores, selecionados, loja
  bronze:    '#AB6422', // bronze queimado — espécie, hover de dourado
  olive:     '#756A34', // oliva/sépia — bordas neutras, separadores, tabs

  /* Verdes — tom de floresta e segurança */
  forest:    '#454E30', // verde-musgo médio — ações secundárias, descanso
  moss:      '#2F3C29', // verde-musgo escuro — equipados, confirmações
  midnight:  '#162A22', // verde noturno — fundos de cabeçalho, gradientes
};

/* ═══════════════════════════════════════════════════════
   TONS DERIVADOS (variantes automáticas)
   ═══════════════════════════════════════════════════════ */
export const derived = {
  /* Fundos de superfície — modo claro */
  bgPage:       '#f5f3eb', // fundo geral da página
  bgSurface:    '#faf9f5', // cards, tabelas linhas pares
  bgSurfaceAlt: '#f5f3eb', // tabelas linhas ímpares
  bgEquipped:   '#e8f0e8', // linha equipada na tabela

  /* Fundos — modo escuro */
  bgDark:       '#0d1a10', // fundo geral dark
  bgDarkSurface:'#2a3c28', // cards dark (verde musgo)
  bgDarkAlt:    '#1f2e1a', // alternado dark (verde musgo médio)

  /* Texto */
  textPrimary:      '#40150A',
  textSecondary:    '#5B1F0F',
  textMuted:        '#756A34',
  textOnDark:       '#f1e6d6',
  textOnDarkMuted:  '#c8b99a',

  /* Bordas */
  borderPrimary:    '#756A34',
  borderLight:      '#756A3444',
  borderDark:       '#40150A',
};

/* ═══════════════════════════════════════════════════════
   GRADIENTES
   ═══════════════════════════════════════════════════════ */
export const gradients = {
  /** Cabeçalho padrão de seção (CardHeader) */
  header:      `linear-gradient(135deg, ${colors.midnight} 0%, ${colors.blood} 100%)`,

  /** Navbar / AppBar */
  navbar:      `linear-gradient(135deg, ${colors.midnight} 0%, ${colors.moss} 50%, ${colors.olive} 100%)`,

  /** Loja de equipamentos */
  shopHeader:  `linear-gradient(135deg, ${colors.moss} 0%, ${colors.forest} 50%, ${colors.olive} 100%)`,

  /** Loja de regalias */
  regaliasHeader: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.bronze} 50%, ${colors.olive} 100%)`,

  /** Footer */
  footer:      `linear-gradient(135deg, ${colors.midnight} 0%, ${colors.blood} 100%)`,

  /** Cabeçalho de espécie */
  especieHeader: `linear-gradient(135deg, ${colors.crimson} 0%, ${colors.bronze} 100%)`,

  /** Cabeçalho de classe */
  classeHeader:  `linear-gradient(135deg, ${colors.garnet} 0%, ${colors.crimson} 100%)`,

  /** Cabeçalho de profissão */
  profissaoHeader: `linear-gradient(135deg, ${colors.midnight} 0%, ${colors.moss} 100%)`,

  /** Regalias de aprendiz */
  aprendizHeader: `linear-gradient(135deg, ${colors.moss} 0%, ${colors.forest} 100%)`,
};

/* ═══════════════════════════════════════════════════════
   SOMBRAS
   ═══════════════════════════════════════════════════════ */
export const shadows = {
  card:   '0 4px 12px rgba(0,0,0,0.10)',
  cardMd: '0 6px 20px rgba(0,0,0,0.15)',
  glow:   `0 0 24px ${colors.olive}44`,
};

/* ═══════════════════════════════════════════════════════
   SUPERFÍCIES PRONTAS (sectionStyle / cardHeaderStyle)
   ═══════════════════════════════════════════════════════ */
export const surfaces = {
  /** Aplicar como sx em Card/Paper de seção */
  section: {
    borderRight:  `2px solid ${colors.olive}`,
    borderLeft:   `2px solid ${colors.olive}`,
    borderRadius: '12px',
    backgroundColor: 'var(--surface-paper)',
    mb: 2,
    boxShadow: shadows.card,
  },

  /** Aplicar como sx em CardHeader */
  cardHeader: {
    background:   gradients.header,
    color:        'white',
    borderRadius: '12px 12px 0 0',
    py:           1,
  },
};

/* ═══════════════════════════════════════════════════════
   CHIPS DE STATUS (prontos para sx)
   ═══════════════════════════════════════════════════════ */
export const chips = {
  equipped:    { backgroundColor: colors.moss,    color: '#fff', fontWeight: 'bold' },
  gold:        { backgroundColor: colors.olive,   color: '#fff', fontWeight: 'bold' },
  danger:      { backgroundColor: colors.garnet,  color: '#fff' },
  success:     { backgroundColor: '#2E7D32',      color: '#fff' },
  warning:     { backgroundColor: colors.scarlet, color: '#fff' },
  info:        { backgroundColor: colors.midnight,color: '#fff' },
  neutral:     { backgroundColor: `${colors.olive}22`, color: colors.blood },
};

/* ═══════════════════════════════════════════════════════
   TIPOGRAFIA
   ═══════════════════════════════════════════════════════ */
export const typography = {
  fontSerif:  '"Esteban", serif',
  fontSans:   '"Inter", sans-serif',
};

/* ═══════════════════════════════════════════════════════
   BREAKPOINTS (referência — os valores são do MUI padrão)
   ═══════════════════════════════════════════════════════ */
export const bp = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 };
