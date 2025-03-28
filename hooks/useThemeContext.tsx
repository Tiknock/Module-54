import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Définir les types pour le thème
export type ThemeType = 'light' | 'dark';

// Définir les couleurs pour chaque thème
export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  card: string;
  boardBackground: string;
  cellBackground: string;
  buttonBackground: string;
  buttonText: string;
  highlightedCell: string;
}

// Palette de couleurs pour le mode clair
const lightColors: ThemeColors = {
  background: '#f5f5f5',
  text: '#222222',
  primary: '#1890ff',
  secondary: '#50a3ff',
  border: '#cccccc',
  card: '#ffffff',
  boardBackground: '#e0e0e0',
  cellBackground: '#ffffff',
  buttonBackground: '#1890ff',
  buttonText: '#ffffff',
  highlightedCell: '#e6f7ff',
};

// Palette de couleurs pour le mode sombre
const darkColors: ThemeColors = {
  background: '#121212',
  text: '#f0f0f0',
  primary: '#1890ff',
  secondary: '#50a3ff',
  border: '#444444',
  card: '#222222',
  boardBackground: '#222222',
  cellBackground: '#333333',
  buttonBackground: '#1890ff',
  buttonText: '#ffffff',
  highlightedCell: '#004c8c',
};

// Interface pour le contexte de thème
interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

// Création du contexte avec une valeur par défaut
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightColors,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Props pour le provider
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider du contexte de thème
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Utiliser le schéma de couleur du système comme valeur initiale
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme as ThemeType || 'light');

  // Effet pour suivre les changements de thème du système
  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme as ThemeType);
    }
  }, [systemColorScheme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Sélectionner les couleurs en fonction du thème actuel
  const colors = theme === 'light' ? lightColors : darkColors;

  const value = {
    theme,
    colors,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 