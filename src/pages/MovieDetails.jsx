import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";
import "../styles/MovieDetails.css";
import Loader from "../components/Loader";

const apiKey  = "api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url     = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch   = useDispatch();
  const watchlist  = useSelector((s) => s.watchlist.items);
  const [movie, setMovie] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`${url}/movie/${id}?${apiKey}`)
      .then((r) => r.json())
      .then(setMovie);
  }, [id]);

  if (!movie) return <Loader />;

  const posterUrl   = movie.poster_path   ? IMG_BASE + "w500"     + movie.poster_path   : "";
  const backdropUrl = movie.backdrop_path ? IMG_BASE + "original" + movie.backdrop_path : "";

  const inWatchlist = watchlist.some((m) => m.tmdbId === movie.id || m.id === movie.id);
  const rating      = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const handleAdd = () => {
    dispatch(addToWatchlist({
      tmdbId: movie.id,
      name:   movie.title,
      desc:   movie.overview,
      img:    posterUrl,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleRemove = () => {
    dispatch(removeFromWatchlist(movie.id));
  };

  return (
    <div>
      {/* Hero backdrop */}
      <div
        className="movie-hero"
        style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined }}
      >
        <div className="container movie-hero-content">
          <h1>{movie.title}</h1>
        </div>
      </div>

      {/* Detail content */}
      <div className="container movie-container">
        <div className="row g-4">
          {/* Poster */}
          <div className="col-md-4">
            {posterUrl && (
              <img src={posterUrl} className="movie-poster img-fluid" alt={movie.title} />
            )}
          </div>

          {/* Info */}
          <div className="col-md-8">
            <div className="movie-info">
              <h2>{movie.title}</h2>

              <p className="movie-meta">
                <span>{movie.release_date?.slice(0, 4)}</span>
                {movie.runtime > 0 && <span>{movie.runtime} min</span>}
                <span className="meta-rating">⭐ {rating}</span>
              </p>

              <p>{movie.overview}</p>

              {/* Badges */}
              <div style={{ marginBottom: 20 }}>
                {movie.original_language && (
                  <span className="badge-custom">
                    {movie.original_language.toUpperCase()}
                  </span>
                )}
                {movie.genres?.map((g) => (
                  <span key={g.id} className="badge-custom">{g.name}</span>
                ))}
              </div>

              {/* Watchlist action */}
              {inWatchlist ? (
                <button onClick={handleRemove} className="btn-movie btn-remove" style={{ width: "auto", padding: "10px 24px" }}>
                  ✕ Remove from Watchlist
                </button>
              ) : (
                <button onClick={handleAdd} className={`btn-movie ${added ? "btn-added" : "btn-add"}`} style={{ width: "auto", padding: "10px 24px" }}>
                  {added ? "✓ Added to Watchlist!" : "+ Add to Watchlist"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
