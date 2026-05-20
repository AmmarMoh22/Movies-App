import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Toast({ toast, onClose }) {
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={toast.severity ?? "success"}
        variant="filled"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.88rem",
          fontWeight: 500,
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          "& .MuiAlert-icon": { fontSize: "1.1rem" },
          ...(toast.severity === "success" && {
            background: "#1a2e1a",
            color: "#48c78e",
            border: "1px solid rgba(72,199,142,0.25)",
            "& .MuiAlert-icon": { color: "#48c78e" },
          }),
          ...(toast.severity === "error" && {
            background: "#2e1a1a",
            color: "#f05252",
            border: "1px solid rgba(240,82,82,0.25)",
            "& .MuiAlert-icon": { color: "#f05252" },
          }),
          ...(toast.severity === "warning" && {
            background: "#2e251a",
            color: "#e8b84b",
            border: "1px solid rgba(232,184,75,0.25)",
            "& .MuiAlert-icon": { color: "#e8b84b" },
          }),
          ...(toast.severity === "info" && {
            background: "#1a1f2e",
            color: "#60a5fa",
            border: "1px solid rgba(96,165,250,0.25)",
            "& .MuiAlert-icon": { color: "#60a5fa" },
          }),
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
