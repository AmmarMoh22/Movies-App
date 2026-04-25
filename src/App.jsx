import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext, MovieProvider } from "./context/MovieContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import AddMovieForm from "./pages/AddMovieForm";
import Register from "./pages/Register";

import "./styles/global.css";

export default function App() {
  return (
    <MovieProvider>
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
    </MovieProvider>
  );
}
