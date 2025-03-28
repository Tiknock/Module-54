import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useThemeContext';

type PlayersInputProps = {
  playerXName: string;
  playerOName: string;
  setPlayerXName: (name: string) => void;
  setPlayerOName: (name: string) => void;
};

export const PlayersInput: React.FC<PlayersInputProps> = ({
  playerXName,
  playerOName,
  setPlayerXName,
  setPlayerOName
}) => {
  const { colors, theme } = useTheme();

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    textInput: {
      backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
      color: colors.text,
      borderColor: colors.border,
    },
    label: {
      color: colors.text,
    },
    xStyle: {
      color: colors.primary,
    },
    oStyle: {
      color: colors.secondary,
    },
  };

  return (
    <View style={styles.playersContainer}>
      <View style={styles.playerInputContainer}>
        <Text style={[styles.label, dynamicStyles.label, dynamicStyles.xStyle]}>Joueur X:</Text>
        <TextInput
          style={[styles.textInput, dynamicStyles.textInput]}
          value={playerXName}
          onChangeText={setPlayerXName}
          placeholder="Nom du joueur X"
          placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
        />
      </View>
      
      <View style={styles.playerInputContainer}>
        <Text style={[styles.label, dynamicStyles.label, dynamicStyles.oStyle]}>Joueur O:</Text>
        <TextInput
          style={[styles.textInput, dynamicStyles.textInput]}
          value={playerOName}
          onChangeText={setPlayerOName}
          placeholder="Nom du joueur O"
          placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playersContainer: {
    width: '100%',
    marginBottom: 20,
  },
  playerInputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  textInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
}); 