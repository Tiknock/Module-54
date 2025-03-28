import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useTheme } from '../hooks/useThemeContext';

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { colors, theme } = useTheme();
  
  // Animation pour faire tourner le logo
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    title: {
      color: colors.text,
    },
    logo: {
      tintColor: theme === 'dark' ? '#61dafb' : undefined,
      opacity: theme === 'dark' ? 0.9 : 1,
    },
    ticTacToeLogo: {
      backgroundColor: colors.boardBackground,
      borderColor: colors.border,
    },
    xStyle: {
      color: colors.primary,
    },
    oStyle: {
      color: colors.secondary,
    },
  };

  return (
    <View style={styles.headerContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Image 
          source={require('../assets/images/react-logo.png')} 
          style={[styles.logo, dynamicStyles.logo]}
          resizeMode="contain"
        />
      </Animated.View>
      
      <View style={styles.titleContainer}>
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
        <View style={[styles.ticTacToeLogo, dynamicStyles.ticTacToeLogo]}>
          <View style={styles.ticTacToeRow}>
            <Text style={[styles.ticTacToeText, dynamicStyles.xStyle]}>X</Text>
            <Text style={[styles.ticTacToeText, dynamicStyles.oStyle]}>O</Text>
            <Text style={[styles.ticTacToeText, dynamicStyles.xStyle]}>X</Text>
          </View>
          <View style={styles.ticTacToeRow}>
            <Text style={[styles.ticTacToeText, dynamicStyles.oStyle]}>O</Text>
            <Text style={[styles.ticTacToeText, dynamicStyles.xStyle]}>X</Text>
            <Text style={[styles.ticTacToeText, dynamicStyles.oStyle]}>O</Text>
          </View>
          <View style={styles.ticTacToeRow}>
            <Text style={[styles.ticTacToeText, dynamicStyles.xStyle]}>X</Text>
            <Text style={[styles.ticTacToeText, dynamicStyles.oStyle]}>O</Text>
            <Text style={[styles.ticTacToeText, dynamicStyles.xStyle]}>X</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 15,
  },
  ticTacToeLogo: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticTacToeRow: {
    flexDirection: 'row',
  },
  ticTacToeText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 16,
    height: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 