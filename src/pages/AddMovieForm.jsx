import React, { useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function AddMovieForm() {
  const { addToWatchlist } = useContext(MovieContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !desc || !img) {
      alert("Invalid input");
      return;
    }

    const newMovie = {
      id: Date.now(),
      name,
      desc,
      img,
    };

    addToWatchlist(newMovie).then(() => {
      alert("Movie added to watchlist!");
      setName("");
      setDesc("");
      setImg("");
    });
  };

  return (
    <div className="container mt-5">
      <h3>Add Movie to Watchlist</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Movie Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <button className="btn btn-primary">Add to Watchlist</button>
      </form>
    </div>
  );
}
