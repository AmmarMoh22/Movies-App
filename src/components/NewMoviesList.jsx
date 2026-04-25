import React from "react";
import Movie from "./Movie";

export default function NewMoviesList({ movies }) {
  return (
    <div>
      <h3>New Movies</h3>

      <div className="row">
        {movies.map((m) => (
          <Movie key={m.id} name={m.name} desc={m.desc} img={m.img} />
        ))}
      </div>
    </div>
  );
}
