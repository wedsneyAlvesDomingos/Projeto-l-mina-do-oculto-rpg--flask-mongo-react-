/**
 * index.js — Themes barrel export
 *
 * Re-exporta tudo da pasta themes para imports limpos:
 *
 *   import { colors, lightTheme, Darktheme } from '../themes';
 *   import { gradients, surfaces } from '../themes';
 */
export { default as lightTheme } from './lightTheme';
export { default as Darktheme  } from './darkTheme';
export * from './tokens';
