import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchWatchlist } from "../redux/watchlistSlice";
import Movie from "../components/Movie";
import Footer from "../components/footer";
import Loader from "../components/Loader";

export default function Watchlist() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="row">
        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <h3>No movies in watchlist</h3>
        ) : (
          items.map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              tmdbId={m.tmdbId}
              name={m.name}
              desc={m.desc}
              img={m.img}
              isWatchlist={true}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
