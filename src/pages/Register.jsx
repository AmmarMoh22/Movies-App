import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("");
  const [agree, setAgree] = useState(false);

  const [genres, setGenres] = useState([]);

  const genresList = ["Action", "Comedy", "Drama", "Sci-Fi"];
  const languages = ["English", "Arabic", "French", "Spanish"];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleAgreeChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter((g) => g !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
      language,
      genres,
      agree,
    };

    console.log(formData);
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
      ></Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={handleNameChange}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          sx={inputStyle}
        />

        <FormControl fullWidth margin="normal" sx={inputStyle}>
          <InputLabel>Preferred Language</InputLabel>
          <Select
            value={language}
            onChange={handleLanguageChange}
            label="Preferred Language"
            sx={{
              color: "white",
              ".MuiSvgIcon-root": {
                color: "yellow",
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography sx={{ mt: 2, color: "white" }}>Favorite Genres:</Typography>

        <FormGroup
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {genresList.map((genre) => (
            <FormControlLabel
              key={genre}
              control={
                <Checkbox
                  value={genre}
                  onChange={handleGenreChange}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#fbc02d",
                    },
                  }}
                />
              }
              label={genre}
              sx={{ color: "white" }}
            />
          ))}
        </FormGroup>

        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={handleAgreeChange}
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "#fbc02d",
                },
              }}
            />
          }
          label="I agree to terms"
          sx={{ color: "white" }}
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
          Register
        </Button>
      </form>
    </Container>
  );
}
