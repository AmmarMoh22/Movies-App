import { useEffect, useState } from "react";
import Movie from "../components/Movie";

const API = "https://api.themoviedb.org/3/movie/top_rated?api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const imgPath = "https://image.tmdb.org/t/p/w500/";

export default function TopRated() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((d) => setMovies(d.results ?? []));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Top Rated</h1>
        <p className="page-subtitle">The highest-rated films of all time</p>
      </div>
      <div className="container">
        <div className="row">
          {movies.map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              name={m.title}
              desc={m.overview}
              img={imgPath + m.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
