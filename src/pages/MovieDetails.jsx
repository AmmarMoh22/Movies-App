import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/MovieDetails.css";

const apiKey = "api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";
const BACKDROP_SIZE = "original";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${url}/movie/${id}?${apiKey}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <h2 className="text-center mt-5">Loading...</h2>;

  const posterUrl = movie.poster_path
    ? IMG_BASE + POSTER_SIZE + movie.poster_path
    : "";

  const backdropUrl = movie.backdrop_path
    ? IMG_BASE + BACKDROP_SIZE + movie.backdrop_path
    : "";

  return (
    <div>
      <div
        className="movie-hero"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : "black",
        }}
      >
        <div className="container movie-hero-content">
          <h1>{movie.title}</h1>
        </div>
      </div>
      <div className="container movie-container">
        <div className="row">
          <div className="col-md-4">
            <img
              src={posterUrl}
              className="img-fluid movie-poster"
              alt={movie.title}
            />
          </div>

          <div className="col-md-8">
            <div className="movie-info">
              <h2>{movie.title}</h2>

              <p className="movie-meta">
                {movie.release_date} • ⭐ {movie.vote_average}
              </p>

              <p>{movie.overview}</p>

              <div className="mt-3">
                <span className="badge-custom">
                  {movie.original_language?.toUpperCase()}
                </span>

                {movie.genres?.map((g) => (
                  <span key={g.id} className="badge-custom">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
