import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ListRenderItem
} from 'react-native';
import { useTheme } from '../../hooks/useThemeContext';
import search from '../../src/api';
import { Movie } from '../../components/Movie';

interface Show {
  show: {
    id: number;
    name: string;
    rating: {
      average: number | null;
    };
    image: {
      medium: string;
    } | null;
  };
}

export default function TVAppScreen() {
  const { colors, theme } = useTheme();
  const [query, setQuery] = useState<string>('');
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    if (query.trim().length === 0) return;
    
    setLoading(true);
    try {
      const results = await search(query);
      setShows(results);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderShow: ListRenderItem<Show> = ({ item }) => (
    <Movie show={item} />
  );

  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    input: {
      backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
      color: colors.text,
      borderColor: colors.border,
    },
    searchButton: {
      backgroundColor: colors.primary,
    },
    searchButtonText: {
      color: colors.buttonText,
    },
  };

  const ListHeaderComponent: React.FC = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Recherche de Séries TV</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          placeholder="Rechercher une série..."
          placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity 
          style={[styles.searchButton, dynamicStyles.searchButton]}
          onPress={handleSearch}
        >
          <Text style={[styles.searchButtonText, dynamicStyles.searchButtonText]}>
            Rechercher
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListEmptyComponent: React.FC = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Text style={[styles.emptyText, { color: colors.text }]}>
          Aucune série trouvée
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <FlatList<Show>
        data={shows}
        renderItem={renderShow}
        keyExtractor={item => item.show.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
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
  searchButton: {
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
}); 