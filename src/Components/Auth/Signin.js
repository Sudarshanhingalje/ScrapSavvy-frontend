import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { ActionCreator } from "../../State/Actions/ActionCreator";
import Navbar from "../Common/Navbar";
import Toast from "../Common/Snackbar";
import { ValidateEmail, ValidatePassword } from "./Validation";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {}, []);

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const tempErrors = {};
    let isValid = true;

    isValid = ValidateEmail(email, tempErrors) && isValid;
    isValid = ValidatePassword(password, tempErrors, "password") && isValid;

    setErrors(tempErrors);
    return isValid;
  };

  // ---------------- REDIRECT ----------------
  const redirectBasedOnRole = (role) => {
    setTimeout(() => {
      if (role === "company") navigate("/company-dashboard");
      else if (role === "scrapyard") navigate("/scrapyard-dashboard");
      else if (role === "customer") navigate("/customer-dashboard");
    }, 800);
  };

  // ---------------- SIGNIN ----------------
  const handleSignin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      handleSnackbar("Invalid credentials!", "error", true);
      return;
    }

    const formData = {
      email,
      password,
    };

    try {
      const response = await AuthService.SignIn(formData);

      if (response.status === 200) {
        const profile = response.data.userProfile;

        // ---------------- STORE USER DATA ----------------
        localStorage.setItem("name", profile.name);
        localStorage.setItem("email", profile.emailId);
        localStorage.setItem("mobile", profile.mobile);

        // ✅ IMPORTANT FIX (NO ownerId anymore)
        localStorage.setItem("userId", profile.userProfileId);
        localStorage.setItem("role", profile.userRole);

        // token
        localStorage.setItem("token", response.data.token);

        // redux
        dispatch(ActionCreator.SetUserToken(response.data.token));

        handleSnackbar("Sign-in successful!", "success", true);

        redirectBasedOnRole(profile.userRole);
      } else {
        handleSnackbar("Server error!", "error", true);
      }
    } catch (error) {
      handleSnackbar(error?.response?.data || "Login failed!", "error", true);
    }
  };

  // ---------------- UI HELPERS ----------------
  const handleSnackbar = (message, severity, show) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(show);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleClickShowPassword = () => setShowPassword((s) => !s);

  const handleMouseDownPassword = (event) => event.preventDefault();

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />

      <div className="centered">
        <div className="sm-container mb-3">
          <div className="header-div">
            <h1>Sign in</h1>
          </div>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* EMAIL */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />

            {/* PASSWORD */}
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {/* BUTTON */}
            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleSignin}
            >
              Sign in
            </button>

            <Link to="/forgotPassword">Forgot password?</Link>

            <Link to="/signup" className="btn btn-light w-100">
              Don't have an account?
            </Link>
          </Box>
        </div>

        <Toast
          open={snackbarOpen}
          close={handleSnackbarClose}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </div>
    </>
  );
};

export default Signin;
