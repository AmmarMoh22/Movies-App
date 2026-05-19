// MovieContext — localStorage-based (replaces json-server calls)
import { createContext } from "react";

export const MovieContext = createContext();

const STORAGE_KEY = "movies_watchlist";

function getStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function setStored(items) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
  catch {}
}

export function MovieProvider({ children }) {
  const getWatchlist = () => getStored();

  const addToWatchlist = (movie) => {
    const existing = getStored();
    if (existing.find((m) => m.id === movie.id)) return;
    setStored([...existing, movie]);
  };

  const removeFromWatchlist = (id) => {
    setStored(getStored().filter((m) => m.id !== id));
  };

  return (
    <MovieContext.Provider value={{ getWatchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
}
