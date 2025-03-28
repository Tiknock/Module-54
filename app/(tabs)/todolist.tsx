import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ScrollView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useThemeContext';
import { TodoItem } from '../../components/TodoItem';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoListScreen() {
  const { colors, theme } = useTheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const addTodo = () => {
    if (text.trim().length === 0) {
      Alert.alert('Erreur', 'Veuillez entrer une tâche');
      return;
    }
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const handleEditChange = (text: string) => {
    setEditValue(text);
  };

  const saveEdit = () => {
    if (editValue.trim().length === 0) {
      Alert.alert('Erreur', 'La tâche ne peut pas être vide');
      return;
    }

    setTodos(
      todos.map(todo => 
        todo.id === editingId ? { ...todo, text: editValue.trim() } : todo
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  // Styles dynamiques basés sur le thème
  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
    },
    input: {
      backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
      color: colors.text,
      borderColor: colors.border,
    },
    addButton: {
      backgroundColor: colors.primary,
    },
    addButtonText: {
      color: colors.buttonText,
    },
    todoItem: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    todoText: {
      color: colors.text,
    },
    completed: {
      textDecorationLine: 'line-through' as 'line-through' | 'none' | 'underline' | 'underline line-through',
      opacity: 0.7,
    },
    emptyText: {
      color: colors.text,
      opacity: 0.6,
    },
    scrollView: {
      backgroundColor: colors.background,
    },
  };

  return (
    <ScrollView 
      style={[styles.scrollView, dynamicStyles.scrollView]}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={[styles.container, dynamicStyles.container]}>
        <Text style={[styles.title, dynamicStyles.title]}>Ma Liste de Tâches</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, dynamicStyles.input]}
            placeholder="Ajouter une tâche..."
            placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity 
            style={[styles.addButton, dynamicStyles.addButton]}
            onPress={addTodo}
          >
            <Text style={[styles.addButtonText, dynamicStyles.addButtonText]}>Ajouter</Text>
          </TouchableOpacity>
        </View>
        
        {todos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, dynamicStyles.emptyText]}>
              Aucune tâche pour le moment
            </Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                editMode={editingId === item.id}
                editValue={editValue}
                onEdit={startEditing}
                onEditChange={handleEditChange}
                onSave={saveEdit}
                onCancel={cancelEdit}
              />
            )}
          />
        )}
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  todoCheckbox: {
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
}); 