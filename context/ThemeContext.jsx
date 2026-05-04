import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@app:theme';

export const themes = {
  dark: {
    background: '#0F1115',
    card: '#181C23',
    border: '#262B36',
    text: '#FFFFFF',
    textSecondary: '#C7C7CC',
    textMuted: '#8E8E93',
    accent: '#E83D84',
    inputBg: '#181C23',
    imageBg: '#262B36',
  },
  light: {
    background: '#F5F5F7',
    card: '#FFFFFF',
    border: '#E5E5EA',
    text: '#1C1C1E',
    textSecondary: '#3C3C43',
    textMuted: '#8E8E93',
    accent: '#E83D84',
    inputBg: '#FFFFFF',
    imageBg: '#E5E5EA',
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    });
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    AsyncStorage.setItem(THEME_KEY, next);
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
