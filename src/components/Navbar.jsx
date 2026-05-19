import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/top-rated", label: "Top Rated", icon: "⭐" },
  { to: "/watchlist", label: "Watchlist", icon: "🔖" },
  { to: "/addMovie", label: "Add Movie", icon: "➕" },
  { to: "/register", label: "Register", icon: "👤" },
];

export default function Navbar() {
  const location = useLocation();
  const watchlist = useSelector((state) => state.watchlist.items);
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">🎬 Cinematic</Link>
          </div>

          <ul className="nav-links">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={isActive(to) ? "active" : ""}>
                  {label}
                  {label === "Watchlist" && watchlist.length > 0 && (
                    <span className="watchlist-badge">
                      {watchlist.length > 9 ? "9+" : watchlist.length}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className={`nav-hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div
        className={`drawer-overlay ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`nav-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-header">
          <span className="drawer-logo">🎬 Cinematic</span>
          <button
            className="drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="drawer-links">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <li key={to}>
              <Link to={to} className={isActive(to) ? "active" : ""}>
                <span>{icon}</span>
                {label}
                {label === "Watchlist" && watchlist.length > 0 && (
                  <span
                    className="watchlist-badge"
                    style={{ marginLeft: "auto" }}
                  >
                    {watchlist.length > 9 ? "9+" : watchlist.length}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
