import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Cell } from './Cell';
import { useTheme } from '../hooks/useThemeContext';

// Définir les types pour les props
interface BoardProps {
  rows?: number;
  columns?: number;
  cellSize?: number;
  cellStyle?: object;
  boardStyle?: object;
  onCellPress?: (row: number, col: number) => void;
  onGameEnd?: (winner: string | null) => void;
}

// Définir le type pour les données du tableau
type BoardData = (string | null)[][];

export function Board({
  rows = 3,
  columns = 3,
  cellSize = 80,
  cellStyle = {},
  boardStyle = {},
  onCellPress = () => {},
  onGameEnd = () => {},
}: BoardProps) {
  const { colors } = useTheme();
  
  // États pour le jeu
  const [boardData, setBoardData] = useState<BoardData>(
    Array(rows).fill(null).map(() => Array(columns).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    board: {
      backgroundColor: colors.boardBackground,
      borderColor: colors.border,
    },
    text: {
      color: colors.text,
    },
    resetButton: {
      backgroundColor: colors.buttonBackground,
    },
    resetButtonText: {
      color: colors.buttonText,
    },
  };

  // Vérifier s'il y a un gagnant
  const checkWinner = (board: BoardData): [boolean, [number, number][]] => {
    const size = board.length;
    
    // Vérifier les lignes
    for (let row = 0; row < size; row++) {
      const firstCell = board[row][0];
      if (firstCell) {
        let isWinningRow = true;
        for (let col = 1; col < size; col++) {
          if (board[row][col] !== firstCell) {
            isWinningRow = false;
            break;
          }
        }
        if (isWinningRow) {
          return [true, Array.from({ length: size }, (_, i) => [row, i])];
        }
      }
    }
    
    // Vérifier les colonnes
    for (let col = 0; col < size; col++) {
      const firstCell = board[0][col];
      if (firstCell) {
        let isWinningCol = true;
        for (let row = 1; row < size; row++) {
          if (board[row][col] !== firstCell) {
            isWinningCol = false;
            break;
          }
        }
        if (isWinningCol) {
          return [true, Array.from({ length: size }, (_, i) => [i, col])];
        }
      }
    }
    
    // Vérifier la diagonale principale
    const firstCellDiag1 = board[0][0];
    if (firstCellDiag1) {
      let isWinningDiag1 = true;
      for (let i = 1; i < size; i++) {
        if (board[i][i] !== firstCellDiag1) {
          isWinningDiag1 = false;
          break;
        }
      }
      if (isWinningDiag1) {
        return [true, Array.from({ length: size }, (_, i) => [i, i])];
      }
    }
    
    // Vérifier la diagonale secondaire
    const firstCellDiag2 = board[0][size - 1];
    if (firstCellDiag2) {
      let isWinningDiag2 = true;
      for (let i = 1; i < size; i++) {
        if (board[i][size - 1 - i] !== firstCellDiag2) {
          isWinningDiag2 = false;
          break;
        }
      }
      if (isWinningDiag2) {
        return [true, Array.from({ length: size }, (_, i) => [i, size - 1 - i])];
      }
    }
    
    return [false, []];
  };

  // Vérifier s'il y a un match nul
  const checkDraw = (board: BoardData): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  };

  // Vérifier si une cellule fait partie des cellules gagnantes
  const isWinningCell = (rowIndex: number, colIndex: number): boolean => {
    return winningCells.some(([r, c]) => r === rowIndex && c === colIndex);
  };

  // Fonction pour réinitialiser le jeu
  const resetGame = () => {
    setBoardData(Array(rows).fill(null).map(() => Array(columns).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    setWinningCells([]);
  };

  // Fonction pour gérer l'appui sur une cellule
  const handleCellPress = (rowIndex: number, colIndex: number) => {
    // Ne rien faire si le jeu est terminé ou si la case est déjà occupée
    if (gameOver || boardData[rowIndex][colIndex] !== null) {
      return;
    }

    // Mettre à jour le tableau
    const newBoardData = [...boardData];
    newBoardData[rowIndex][colIndex] = currentPlayer;
    setBoardData(newBoardData);

    // Appeler la fonction de rappel externe
    onCellPress(rowIndex, colIndex);

    // Vérifier s'il y a un gagnant
    const [hasWinner, winningPositions] = checkWinner(newBoardData);
    if (hasWinner) {
      setWinner(currentPlayer);
      setWinningCells(winningPositions);
      setGameOver(true);
      onGameEnd(currentPlayer);
      return;
    }

    // Vérifier s'il y a un match nul
    if (checkDraw(newBoardData)) {
      setGameOver(true);
      onGameEnd(null);
      return;
    }

    // Passer au joueur suivant
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Rendu du tableau
  return (
    <View>
      <View style={[styles.board, dynamicStyles.board, boardStyle]}>
        {boardData.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                value={cell}
                size={cellSize}
                style={cellStyle}
                highlighted={isWinningCell(rowIndex, colIndex)}
                onPress={() => handleCellPress(rowIndex, colIndex)}
                disabled={gameOver || cell !== null}
              />
            ))}
          </View>
        ))}
      </View>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={[styles.gameOverText, dynamicStyles.text]}>
            {winner ? `Joueur ${winner} a gagné !` : 'Match nul !'}
          </Text>
          <TouchableOpacity 
            style={[styles.resetButton, dynamicStyles.resetButton]} 
            onPress={resetGame}
          >
            <Text style={[styles.resetButtonText, dynamicStyles.resetButtonText]}>Rejouer</Text>
          </TouchableOpacity>
        </View>
      )}

      {!gameOver && (
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, dynamicStyles.text]}>
            Tour du joueur: {currentPlayer}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    padding: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  gameOverContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
