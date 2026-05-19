import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "movies_watchlist";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    console.log("error");
  }
}

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: loadFromStorage(),
    loading: false,
  },
  reducers: {
    addToWatchlist(state, action) {
      const movie = action.payload;
      const exists = state.items.some(
        (m) => (movie.tmdbId && m.tmdbId === movie.tmdbId) || m.id === movie.id,
      );
      if (!exists) {
        const newItem = {
          ...movie,
          id: movie.tmdbId ?? movie.id ?? Date.now(),
        };
        state.items.push(newItem);
        saveToStorage(state.items);
      }
    },
    removeFromWatchlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter((m) => m.id !== id && m.tmdbId !== id);
      saveToStorage(state.items);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
