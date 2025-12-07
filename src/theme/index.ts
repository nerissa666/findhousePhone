/**
 * 主题常量
 * 这些值应该与 global.css 中定义的 CSS 变量保持一致
 */

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const fontWeight = {
  normal: 'normal',
  bold: 'bold',
  medium: '500',
  semibold: '600',
  extrabold: '800',
  black: '900',
} as const;
