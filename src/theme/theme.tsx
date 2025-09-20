import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';


const ThemeContext = createContext({ scheme: 'light' as ColorSchemeName, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scheme, setScheme] = useState<ColorSchemeName>(Appearance.getColorScheme() || 'light');
  useEffect(() => {
    const sub = Appearance.addChangeListener(s => setScheme(s.colorScheme || 'light'));
    return () => sub.remove();
  }, []);
  const toggle = () => setScheme(s => (s === 'light' ? 'dark' : 'light'));
  return <ThemeContext.Provider value={{ scheme, toggle }}>{children}</ThemeContext.Provider>;
};


export const colors = {
  light: { bg: '#f7f7f8', card: '#fff', text: '#111', primary: '#2563eb', accent: '#06b6d4' },
  dark: { bg: '#0b1220', card: '#071022', text: '#e6eef8', primary: '#60a5fa', accent: '#06b6d4' },
};