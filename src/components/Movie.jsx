import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";

const Movie = ({ name, desc, img, id, isWatchlist, onDelete }) => {
  const { addToWatchlist } = useContext(MovieContext);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const movie = { id, name, desc, img };

    addToWatchlist(movie).then(() => {
      setAdded(true);
      setTimeout(() => setAdded(false), 600);
    });
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={img} className="card-img-top" alt={name} />

        <div className="card-body d-flex flex-column">
          <h5>{name}</h5>
          <p>{desc}</p>

          <Link to={`/movie/${id}`} className="btn btn-dark mt-auto">
            Details
          </Link>

          {!isWatchlist && (
            <button
              onClick={handleAdd}
              className={`btn mt-2 ${
                added ? "btn-success added-animation" : "btn-warning"
              }`}
            >
              {added ? "✔ Added" : "Add to Watchlist"}
            </button>
          )}

          {isWatchlist && (
            <button
              onClick={() => onDelete(id)}
              className="btn btn-danger mt-2"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
