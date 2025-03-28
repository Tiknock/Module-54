import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useThemeContext';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
  editValue: string;
  onEdit: (id: string, text: string) => void;
  onEditChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  editMode,
  editValue,
  onEdit,
  onEditChange,
  onSave,
  onCancel
}) => {
  const { colors } = useTheme();

  const dynamicStyles = {
    container: {
      backgroundColor: colors.boardBackground,
      borderColor: colors.border,
    },
    todoText: {
      color: colors.text,
      textDecorationLine: todo.completed ? 'line-through' as TextStyle['textDecorationLine'] : 'none' as TextStyle['textDecorationLine'],
      opacity: todo.completed ? 0.6 : 1,
    },
    input: {
      backgroundColor: colors.background,
      color: colors.text,
      borderColor: colors.border,
    }
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {!editMode ? (
        <>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onToggle(todo.id)}
          >
            {todo.completed ? (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>

          <Text 
            style={[styles.todoText, dynamicStyles.todoText]}
            numberOfLines={2}
          >
            {todo.text}
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onEdit(todo.id, todo.text)}
            >
              <Ionicons name="pencil" size={20} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onDelete(todo.id)}
            >
              <Ionicons name="trash-outline" size={20} color="tomato" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={[styles.input, dynamicStyles.input]}
            value={editValue}
            onChangeText={onEditChange}
            autoFocus
          />

          <View style={styles.editActionsContainer}>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={onSave}
            >
              <Ionicons name="checkmark" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: 'tomato' }]}
              onPress={onCancel}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  editActionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    width: 35,
    height: 35,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
}); 