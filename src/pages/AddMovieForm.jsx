import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../redux/watchlistSlice";
import Toast from "../components/Toast";
import Footer from "../components/footer";

export default function AddMovieForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img,  setImg]  = useState("");
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !desc.trim() || !img.trim()) {
      showToast("Please fill in all fields.", "warning");
      return;
    }

    dispatch(addToWatchlist({ name: name.trim(), desc: desc.trim(), img: img.trim() }));
    showToast(`"${name.trim()}" added to your watchlist!`, "success");
    setName("");
    setDesc("");
    setImg("");
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Add a Movie</h1>
        <p className="page-subtitle">Manually add a title to your watchlist</p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <form onSubmit={handleSubmit} className="add-movie-form">

              <div className="form-field">
                <label className="form-label">Movie Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Inception"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={4}
                  placeholder="Brief description of the movie…"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Poster Image URL</label>
                <input
                  className="form-input"
                  type="url"
                  placeholder="https://example.com/poster.jpg"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
                {img && (
                  <img
                    src={img}
                    alt="Poster preview"
                    className="poster-preview"
                    onError={(e) => { e.target.style.display = "none"; }}
                    onLoad={(e) => { e.target.style.display = "block"; }}
                  />
                )}
              </div>

              <button type="submit" className="btn-submit">
                + Add to Watchlist
              </button>

            </form>
          </div>
        </div>
      </div>

      <Toast toast={toast} onClose={closeToast} />
      <Footer />
    </div>
  );
}
