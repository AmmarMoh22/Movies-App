import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWatchlist } from "../redux/watchlistSlice";
import Movie from "../components/Movie";
import Footer from "../components/footer";

export default function Watchlist() {
  const { items } = useSelector((state) => state.watchlist);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">My Watchlist</h1>
        <p className="page-subtitle">
          {items.length === 0
            ? "Nothing saved yet — browse movies and hit Add to Watchlist"
            : `${items.length} movie${items.length !== 1 ? "s" : ""} saved`}
        </p>
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🎬</span>
            <p>Your watchlist is empty</p>
          </div>
        ) : (
          <div className="row">
            {items.map((m) => (
              <Movie
                key={m.id}
                id={m.id}
                tmdbId={m.tmdbId}
                name={m.name}
                desc={m.desc}
                img={m.img}
                isWatchlist={true}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
