import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { toggleFavorite } from '../src/store/favoritesSlice';
import { RootState } from '../src/store/store';

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

interface MovieProps {
  show: Show;
}

export const Movie: React.FC<MovieProps> = ({ show }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.shows);
  const isFavorite = favorites.some(fav => fav.show.id === show.show.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(show));
  };

  return (
    <View style={[styles.showCard, { backgroundColor: colors.card }]}>
      {show.show.image && (
        <Image
          source={{ uri: show.show.image.medium }}
          style={styles.showImage}
        />
      )}
      <View style={styles.showInfo}>
        <Text style={[styles.showTitle, { color: colors.text }]}>
          {show.show.name}
        </Text>
        <Text style={[styles.showRating, { color: colors.text }]}>
          Note: {show.show.rating.average || 'N/A'}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={isFavorite ? colors.primary : colors.text} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  showCard: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  showImage: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 10,
  },
  showInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  showTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  showRating: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 