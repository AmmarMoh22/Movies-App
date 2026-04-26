import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";

const Movie = ({ name, desc, img, id, tmdbId, isWatchlist }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const movieId = isWatchlist ? tmdbId : id;

  const handleAdd = () => {
    dispatch(
      addToWatchlist({
        tmdbId: id,
        name,
        desc,
        img,
      }),
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  const handleRemove = () => {
    dispatch(removeFromWatchlist(id));
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={img} className="card-img-top" alt={name} />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>

          <Link to={`/movie/${movieId}`} className="btn btn-dark mt-auto">
            View Details
          </Link>

          {isWatchlist ? (
            <button onClick={handleRemove} className="btn btn-danger mt-2">
              Remove from Watchlist
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className={`btn mt-2 ${added ? "btn-success" : "btn-warning"}`}
            >
              {added ? "Added ✓" : "Add to Watchlist"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
