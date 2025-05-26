import type { DefaultTheme } from 'styled-components';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#4361ee',
    secondary: '#3f37c9',
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#212529',
    textSecondary: '#6c757d'
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#4895ef',
    secondary: '#4361ee',
    background: '#121212',
    card: '#1e1e1e',
    text: '#f8f9fa',
    textSecondary: '#adb5bd'
  }
};
