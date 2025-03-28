import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useThemeContext';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function TabLayout() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: theme === 'dark' ? '#888' : '#aaa',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="tictactoe"
        options={{
          title: 'Morpion',
          tabBarLabel: 'Morpion',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todolist"
        options={{
          title: 'Liste de Tâches',
          tabBarLabel: 'Tâches',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tvapp"
        options={{
          title: 'Séries TV',
          tabBarLabel: 'TV',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 