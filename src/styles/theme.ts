// Theme mode type
export type ThemeMode = 'light' | 'dark';

// Base color palette
interface ColorPalette {
  // Brand colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Status colors
  error: string;
  success: string;
  warning: string;
  info: string;
  
  // Neutral colors
  white: string;
  black: string;
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

const colors: ColorPalette = {
  // Brand colors
  primary: '#8b4513', // SaddleBrown
  secondary: '#d2b48c', // Tan
  accent: '#5e3a1a', // Darker brown
  
  // Status colors
  error: '#e53e3e',
  success: '#38a169',
  warning: '#dd6b20',
  info: '#3182ce',
  
  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Base theme configuration that doesn't include mode-specific colors
const baseTheme = {
  // Fonts
  fonts: {
    body: "'Roboto', sans-serif",
    main: "'Roboto', sans-serif",
    heading: "'Cinzel', serif",
    display: "'Bodoni Moda', serif",
    accent: "'Bodoni Moda', serif",
    code: "'Source Code Pro', monospace",
  },
  // Breakpoints
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  // Border radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(139, 69, 19, 0.5)',
    none: 'none',
  },
  // Typography
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  // Base theme doesn't include colors, they're defined in light/dark themes
};

// Theme colors type
export interface ThemeColors extends ColorPalette {
  // Theme-specific colors
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
  active: string;
  disabled: string;
  light: string;
}

// Theme type
export interface Theme extends Omit<typeof baseTheme, 'colors'> {
  mode: ThemeMode;
  colors: ThemeColors;
}

// Light theme
export const lightTheme: Theme = {
  ...baseTheme,
  mode: 'light',
  colors: {
    ...colors,
    // Backgrounds
    background: colors.gray[50],
    surface: colors.white,
    // Text
    text: colors.gray[900],
    textSecondary: colors.gray[600],
    // Borders
    border: colors.gray[200],
    // States
    hover: colors.gray[100],
    active: colors.gray[200],
    disabled: colors.gray[300],
    light: colors.white,
  },
};

// Dark theme
export const darkTheme: Theme = {
  ...baseTheme,
  mode: 'dark',
  colors: {
    ...colors,
    // In dark mode, we swap primary and secondary
    primary: colors.secondary,
    secondary: colors.primary,
    light: colors.white,
    // Backgrounds
    background: colors.gray[900],
    surface: colors.gray[800],
    // Text
    text: colors.white,
    textSecondary: colors.gray[300],
    // Borders
    border: colors.gray[700],
    // States
    hover: colors.gray[700],
    active: colors.gray[600],
    disabled: colors.gray[500],
  },
};

// Default export (light theme)
export const theme = lightTheme;

// Helper function to get theme by mode
export const getTheme = (mode: ThemeMode): Theme => 
  mode === 'dark' ? darkTheme : lightTheme;

// Extend styled-components DefaultTheme with our theme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
