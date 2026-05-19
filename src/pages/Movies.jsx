import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Footer from "../components/footer";

const apiKey = "&api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc" + apiKey;
const imgPath = "https://image.tmdb.org/t/p/w500/";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((r) => r.json())
      .then((d) => setMovies(d.results ?? []))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="section-heading">Popular Now</h2>
      <div className="row">
        {movies.map((m) => (
          <Movie
            key={m.id}
            id={m.id}
            name={m.title}
            desc={m.overview}
            img={imgPath + m.poster_path}
            isWatchlist={false}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
