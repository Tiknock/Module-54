import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useThemeContext';

type ScoreboardProps = {
  gameCount: number;
  xWins: number;
  oWins: number;
  draws: number;
  playerXName?: string;
  playerOName?: string;
};

export const Scoreboard: React.FC<ScoreboardProps> = ({
  gameCount,
  xWins,
  oWins,
  draws,
  playerXName,
  playerOName
}) => {
  const { colors, theme } = useTheme();

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    container: {
      backgroundColor: colors.card,
      shadowColor: theme === 'dark' ? '#000000' : '#000000',
    },
    title: {
      color: colors.text,
    },
    text: {
      color: colors.text,
    }
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.title]}>Tableau des scores</Text>
      <Text style={[styles.text, dynamicStyles.text]}>Parties jouées: {gameCount}</Text>
      <Text style={[styles.text, dynamicStyles.text]}>
        {playerXName ? playerXName : "Joueur X"}: {xWins} victoires
      </Text>
      <Text style={[styles.text, dynamicStyles.text]}>
        {playerOName ? playerOName : "Joueur O"}: {oWins} victoires
      </Text>
      <Text style={[styles.text, dynamicStyles.text]}>Matchs nuls: {draws}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
}); 