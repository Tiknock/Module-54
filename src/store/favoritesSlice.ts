import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFavorites, saveFavorites } from './persistence';

export interface Show {
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

export interface FavoritesState {
  shows: Show[];
}

const initialState: FavoritesState = {
  shows: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Show>) => {
      if (!state.shows.some(show => show.show.id === action.payload.show.id)) {
        state.shows.push(action.payload);
        saveFavorites(state);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.shows = state.shows.filter(show => show.show.id !== action.payload);
      saveFavorites(state);
    },
    toggleFavorite: (state, action: PayloadAction<Show>) => {
      const index = state.shows.findIndex(show => show.show.id === action.payload.show.id);
      if (index === -1) {
        state.shows.push(action.payload);
      } else {
        state.shows.splice(index, 1);
      }
      saveFavorites(state);
    },
    setFavorites: (state, action: PayloadAction<FavoritesState>) => {
      state.shows = action.payload.shows;
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 