import { TextField, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../redux/watchlistSlice";

export default function AddMovieForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !desc || !img) {
      alert("Invalid input");
      return;
    }

    const newMovie = {
      name,
      desc,
      img,
    };

    dispatch(addToWatchlist(newMovie));
    alert("Movie added to watchlist!");
    setName("");
    setDesc("");
    setImg("");
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#fbc02d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fbc02d",
      },
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fbc02d",
    },
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 9, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem" },
        }}
        gutterBottom
      >
        Add Movie
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Movie Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Description"
          margin="normal"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Image URL"
          margin="normal"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          sx={inputStyle}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#fbc02d",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#805208",
            },
          }}
        >
          Add to Watchlist
        </Button>
      </form>
    </Container>
  );
}
