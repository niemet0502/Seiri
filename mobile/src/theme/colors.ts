export type ThemeColors = {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Background colors
  background: string;
  backgroundLight: string;
  backgroundCard: string;

  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;

  // Status colors
  success: string;
  error: string;
  warning: string;
  info: string;

  // Task status colors
  overdue: string;
  today: string;
  tomorrow: string;
  week: string;
  future: string;

  // Border colors
  border: string;
  borderLight: string;

  // Other
  white: string;
  black: string;
  transparent: string;
};

export const darkColors: ThemeColors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',

  background: '#0f0f1a',
  backgroundLight: '#191a23',
  backgroundCard: '#1e1f2e',

  text: '#ffffff',
  textSecondary: '#a0a0b0',
  textMuted: '#6b6b7b',

  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  overdue: '#ef4444',
  today: '#f59e0b',
  tomorrow: '#3b82f6',
  week: '#8b5cf6',
  future: '#6b7280',

  border: '#2c2d3c',
  borderLight: '#3a3b4f',

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export const lightColors: ThemeColors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',

  background: '#f5f5f9',
  backgroundLight: '#eeeef4',
  backgroundCard: '#ffffff',

  text: '#1a1a2e',
  textSecondary: '#5a5a6e',
  textMuted: '#9a9ab0',

  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  overdue: '#ef4444',
  today: '#f59e0b',
  tomorrow: '#3b82f6',
  week: '#8b5cf6',
  future: '#6b7280',

  border: '#e0e0ea',
  borderLight: '#d0d0dc',

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// Backward compatibility — default dark colors
export const colors = darkColors;
