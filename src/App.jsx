import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext, MovieProvider } from "./context/MovieContext";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import AddMovieForm from "./pages/AddMovieForm";
import Register from "./pages/Register";

import "./styles/global.css";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/addMovie" element={<AddMovieForm />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
