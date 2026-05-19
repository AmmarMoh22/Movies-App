import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";
import Toast from "./Toast";
import "../styles/Movie.css";

const Movie = ({ name, desc, img, id, tmdbId, isWatchlist }) => {
  const dispatch  = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.items);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const movieId = isWatchlist ? tmdbId : id;
  const alreadyInWatchlist = watchlist.some(
    (m) => m.tmdbId === id || m.id === id
  );

  const showToast = (message, severity = "success") =>
    setToast({ open: true, message, severity });

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const handleAdd = () => {
    dispatch(addToWatchlist({ tmdbId: id, name, desc, img }));
    showToast(`"${name}" added to watchlist!`, "success");
  };

  const handleRemove = () => {
    dispatch(removeFromWatchlist(id));
    showToast(`"${name}" removed from watchlist.`, "info");
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
            <button onClick={handleAdd} className="btn-movie btn-add">
              + Watchlist
            </button>
          )}

          <Link to={`/movie/${movieId}`} className="btn-movie btn-details">
            View Details
          </Link>
        </div>
      </div>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
};

export default Movie;
