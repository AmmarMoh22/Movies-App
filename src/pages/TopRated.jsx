import { useEffect, useState } from "react";
import Movie from "../components/Movie";

const API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const imgPath = "https://image.tmdb.org/t/p/w500/";

export default function TopRated() {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setRatedMovies(data.results);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {ratedMovies.map((m) => (
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
  );
}
