/**
 * 主题颜色常量
 * 这些值应该与 global.css 中定义的 CSS 变量保持一致
 */

export const colors = {
  // 主题颜色
  primaryLighterprimary: '#21b97a',
  primaryDark: '#1a8f5e',
  primaryLight: '#4dd4a3',
  primaryLighter: '#e8f5f0', // 最浅色，用于浅色背景

  // 文本颜色
  textPrimary: '#333',
  textSecondary: '#666',
  textTertiary: '#999',
  textWhite: '#ffffff',
  textGray: '#6b7280',

  // 背景颜色
  bgPrimary: '#ffffff',
  bgSecondary: '#f5f5f5',
  bgTertiary: '#f0f0f0',

  // 边框颜色
  border: '#e5e5e5',
  borderLight: '#f0f0f0',
  borderDark: '#d1d1d1',

  // 功能颜色
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
} as const;
