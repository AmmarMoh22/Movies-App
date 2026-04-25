import { useEffect, useState } from "react";
import "../styles/Slider.css";

const API =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=9813ce01a72ca1bd2ae25f091898b1c7";

const IMG = "https://image.tmdb.org/t/p/original/";

export default function Slider() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % movies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <div
      className="slider"
      style={{ backgroundImage: `url(${IMG + movie.backdrop_path})` }}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        <p>{movie.overview.slice(0, 120)}...</p>
      </div>
    </div>
  );
}