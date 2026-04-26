import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Footer from "../components/footer";

const apiKey = "&api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/w500/";
const path = "/discover/movie?sort_by=popularity.desc";
const apiUrl = url + path + apiKey;

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
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
        <Footer />
      </div>
    </div>
  );
}
