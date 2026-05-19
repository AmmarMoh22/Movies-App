import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Slider.css";

const API = "https://api.themoviedb.org/3/movie/now_playing?api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const IMG = "https://image.tmdb.org/t/p/original/";

export default function Slider() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex]   = useState(0);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((d) => setMovies(d.results?.slice(0, 8) ?? []));
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % movies.length), 5000);
    return () => clearInterval(id);
  }, [movies]);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <div
      className="slider"
      style={{ backgroundImage: `url(${IMG + movie.backdrop_path})` }}
    >
      <div className="overlay">
        <span className="slider-badge">🎬 Now Playing</span>

        <h1>{movie.title}</h1>

        <p>{movie.overview?.slice(0, 160)}…</p>

        <div className="slider-actions">
          <Link to={`/movie/${movie.id}`} className="slider-btn-primary">
            View Details
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="slider-dots">
        {movies.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
