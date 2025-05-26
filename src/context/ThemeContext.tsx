import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext
} from 'react';
import type { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  themeStyles: DefaultTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({
  children
}: {
  children: ReactNode | ((value: ThemeContextValue) => ReactNode);
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('weatherAppTheme') as Theme | null;
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('weatherAppTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    themeStyles: theme === 'light' ? lightTheme : darkTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
