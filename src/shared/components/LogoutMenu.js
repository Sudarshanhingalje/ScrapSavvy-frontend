import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    localStorage.clear();

    navigate("/signin");
  };

  return (
    <Button
      onClick={handleLogout}
      startIcon={<ExitToAppIcon />}
      sx={{
        px: "18px",
        py: "8px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
        color: "#fff",
        fontFamily: "'Rajdhani', 'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: "13px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        border: "1px solid rgba(220,38,38,0.6)",
        boxShadow: "0 4px 20px rgba(220,38,38,0.35)",
        transition: "all 0.25s ease",

        "&:hover": {
          background: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
          boxShadow: "0 6px 24px rgba(220,38,38,0.45)",
          transform: "translateY(-1px)",
        },

        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      Logout
    </Button>
  );
}
