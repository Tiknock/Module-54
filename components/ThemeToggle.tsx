import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useThemeContext';

export const ThemeToggle: React.FC = () => {
  const { colors, theme, toggleTheme } = useTheme();

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    button: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.buttonText,
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.themeButton, dynamicStyles.button]}
      onPress={toggleTheme}
    >
      <Text style={[styles.themeButtonText, dynamicStyles.buttonText]}>
        {theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 