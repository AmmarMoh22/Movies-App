import React, { useEffect, useState, useContext } from "react";
import Movie from "../components/Movie";
import { MovieContext } from "../context/MovieContext";

export default function Watchlist() {
  const { getWatchlist, removeFromWatchlist } = useContext(MovieContext);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getWatchlist().then((data) => setMovies(data));
  }, []);

  const handleDelete = (id) => {
    removeFromWatchlist(id).then(() => {
      setMovies((prev) => prev.filter((m) => m.id !== id));
    });
  };

  return (
    <div className="container mt-5">
      <h2>My Watchlist</h2>

      <div className="row">
        {movies.map((m) => (
          <Movie
            key={m.id}
            id={m.id}
            name={m.name}
            desc={m.desc}
            img={m.img}
            isWatchlist
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
