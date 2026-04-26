import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";

export default function Navbar() {
  const watchlist = useSelector((state) => state.watchlist.items);
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
            <Link to="/watchlist" className="nav-link">
              Watchlist
              {watchlist.length > 0 && (
                <span className="watchlist-badge">
                  {watchlist.length > 9 ? "9+" : watchlist.length}
                </span>
              )}
            </Link>
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
