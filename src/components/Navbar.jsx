import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">🎬 Movies</Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/top-rated">Top Rated</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
          <li>
            <Link to="/addMovie">Add Movie</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
