import { createContext } from "react";

export const MovieContext = createContext();

const BASE_URL = "http://localhost:3001/watchlist";

export function MovieProvider({ children }) {
  const getWatchlist = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    return data;
  };

  const addToWatchlist = async (movie) => {
    const existing = await fetch(BASE_URL).then((res) => res.json());
    if (existing.find((m) => m.id === movie.id)) {
      return;
    }

    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
  };

  const removeFromWatchlist = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <MovieContext.Provider
      value={{
        getWatchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
