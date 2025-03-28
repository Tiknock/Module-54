import { Board } from '../../components/Board';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../../hooks/useThemeContext';
import { Header } from '../../components/Header';
import { PlayersInput } from '../../components/PlayersInput';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Scoreboard } from '../../components/Scoreboard';

export default function TicTacToeScreen() {
  const { colors } = useTheme();
  const [gameCount, setGameCount] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');

  const handleGameEnd = (winner: string | null) => {
    if (winner === 'X') {
      setXWins(prev => prev + 1);
    } else if (winner === 'O') {
      setOWins(prev => prev + 1);
    } else {
      setDraws(prev => prev + 1);
    }
    setGameCount(prev => prev + 1);
  };

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    board: {
      backgroundColor: colors.boardBackground,
    },
    scrollView: {
      backgroundColor: colors.background,
    }
  };

  return (
    <ScrollView 
      style={[styles.scrollView, dynamicStyles.scrollView]}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container, dynamicStyles.container]}>
        <Header title="Jeu de Morpion" />
        
        <PlayersInput
          playerXName={playerXName}
          playerOName={playerOName}
          setPlayerXName={setPlayerXName}
          setPlayerOName={setPlayerOName}
        />
        
        <ThemeToggle />
        
        <Board 
          onGameEnd={handleGameEnd}
          cellSize={90}
          boardStyle={[styles.board, dynamicStyles.board]}
        />
        
        <Scoreboard
          gameCount={gameCount}
          xWins={xWins}
          oWins={oWins}
          draws={draws}
          playerXName={playerXName}
          playerOName={playerOName}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  board: {
    borderRadius: 12,
    padding: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
}); 