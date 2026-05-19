import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";
import "../styles/Movie.css";

const Movie = ({ name, desc, img, id, tmdbId, isWatchlist }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const watchlist = useSelector((state) => state.watchlist.items);
  const movieId = isWatchlist ? tmdbId : id;
  const alreadyInWatchlist = watchlist.some(
    (m) => m.tmdbId === id || m.id === id
  );

  const handleAdd = () => {
    dispatch(addToWatchlist({ tmdbId: id, name, desc, img }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleRemove = () => {
    dispatch(removeFromWatchlist(id));
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="movie-card">
        <div className="movie-card-img-wrap">
          <img src={img} className="movie-card-img" alt={name} loading="lazy" />
          <div className="movie-card-overlay">
            <Link to={`/movie/${movieId}`} className="overlay-btn">
              View Details
            </Link>
          </div>
        </div>

        <div className="movie-card-body">
          <h5 className="movie-card-title">{name}</h5>
          <p className="movie-card-desc">{desc}</p>

          {isWatchlist ? (
            <button onClick={handleRemove} className="btn-movie btn-remove">
              ✕ Remove
            </button>
          ) : alreadyInWatchlist ? (
            <button className="btn-movie btn-added" disabled>
              ✓ In Watchlist
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className={`btn-movie ${added ? "btn-added" : "btn-add"}`}
            >
              {added ? "✓ Added!" : "+ Watchlist"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
