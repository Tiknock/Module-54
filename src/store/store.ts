import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import { loadFavorites } from './persistence';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// Charger les favoris au démarrage
loadFavorites().then(favorites => {
  store.dispatch({ type: 'favorites/setFavorites', payload: favorites });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 