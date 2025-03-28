import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesState } from './favoritesSlice';

const FAVORITES_STORAGE_KEY = '@favorites';

export const loadFavorites = async (): Promise<FavoritesState> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    if (favoritesJson) {
      return JSON.parse(favoritesJson);
    }
    return { shows: [] };
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error);
    return { shows: [] };
  }
};

export const saveFavorites = async (favorites: FavoritesState): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des favoris:', error);
  }
}; 