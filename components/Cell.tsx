import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../hooks/useThemeContext';

interface CellProps {
  value: string | null;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  highlighted?: boolean;
}

export function Cell({
  value,
  onPress,
  size = 80,
  style = {},
  textStyle = {},
  disabled = false,
  highlighted = false,
}: CellProps) {
  const { colors } = useTheme();

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    cell: {
      backgroundColor: colors.cellBackground,
      borderColor: colors.border,
    },
    highlighted: {
      backgroundColor: colors.highlightedCell,
      borderColor: colors.primary,
    },
    text: {
      color: colors.text,
    },
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        dynamicStyles.cell,
        { width: size, height: size },
        highlighted && styles.highlighted,
        highlighted && dynamicStyles.highlighted,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.cellText, dynamicStyles.text, textStyle]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 2,
  },
  highlighted: {
    borderWidth: 2,
  },
  cellText: {
    fontSize: 24,
  },
});
