'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'ocean';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_ORDER: Theme[] = ['dark', 'light', 'ocean'];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // On client mount, sync state with html class
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && THEME_ORDER.includes(saved)) {
      applyThemeClass(saved);
      setThemeState(saved);
    } else {
      const isLight = document.documentElement.classList.contains('light');
      const isOcean = document.documentElement.classList.contains('ocean');
      setThemeState(isOcean ? 'ocean' : isLight ? 'light' : 'dark');
    }
    setMounted(true);
  }, []);

  const applyThemeClass = (newTheme: Theme) => {
    // Remove all theme classes first
    document.documentElement.classList.remove('light', 'ocean');
    // Add the appropriate class (dark is default - no class needed)
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else if (newTheme === 'ocean') {
      document.documentElement.classList.add('ocean');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      applyThemeClass(newTheme);
    }
  };

  const toggleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};