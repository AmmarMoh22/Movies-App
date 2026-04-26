import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/watchlist";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async () => {
    const res = await fetch(API_URL);
    return await res.json();
  },
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (movie) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    return await res.json();
  },
);

export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (movie) => movie.id !== action.payload,
        );
      });
  },
});

export default watchlistSlice.reducer;
