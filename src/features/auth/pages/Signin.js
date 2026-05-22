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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setToken, setUser } from "../../../redux/actions/authSlice";

import Navbar from "../../../shared/components/Navbar";
import Toast from "../../../shared/components/Snackbar";
import AuthService from "../../../shared/services/AuthService";
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

  // ================= VALIDATION =================
  const validate = () => {
    const tempErrors = {};
    let isValid = true;

    isValid = ValidateEmail(email, tempErrors) && isValid;
    isValid = ValidatePassword(password, tempErrors, "password") && isValid;

    setErrors(tempErrors);
    return isValid;
  };

  // ================= REDIRECT =================
  const redirectBasedOnRole = (role) => {
    setTimeout(() => {
      if (role === "company") {
        navigate("/company-dashboard");
      } else if (role === "scrapyard") {
        navigate("/scrapyard-dashboard");
      } else if (role === "customer") {
        navigate("/customer-dashboard");
      }
    }, 1000);
  };

  // ================= SNACKBAR =================
  const handleSnackbar = (message, severity, show) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(show);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // ================= PASSWORD =================
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ================= SIGNIN =================
  const handleSignin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      handleSnackbar("Please enter valid credentials", "error", true);
      return;
    }

    try {
      const response = await AuthService.SignIn({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      if (response.status !== 200) {
        handleSnackbar("Server error!", "error", true);
        return;
      }

      const profile = response.data.userProfile;

      // ✅ SAFE CHECK (VERY IMPORTANT)
      if (!profile) {
        handleSnackbar("User profile not found in response", "error", true);
        return;
      }

      const token = response.data.token;

      if (!token) {
        handleSnackbar("Token missing from response", "error", true);
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));

      const userPayload = {
        userId: payload.userId,
        name: profile.name || "",
        email: profile.email || profile.emailId || "",
        role: profile.userRole || "",
      };

      localStorage.clear();

      localStorage.setItem("name", profile.name || "");
      localStorage.setItem("email", profile.email || profile.emailId || "");
      localStorage.setItem("mobile", profile.mobile || "");
      localStorage.setItem("token", token);
      localStorage.setItem("role", profile.userRole || "");
      localStorage.setItem("userId", payload.userId);
      localStorage.setItem("user", JSON.stringify(userPayload));

      dispatch(setToken(token));
      dispatch(setUser(userPayload));

      handleSnackbar("✅ Sign-in successful!", "success", true);

      redirectBasedOnRole(profile.userRole);
    } catch (error) {
      console.error(error);
      handleSnackbar(error?.response?.data || "Login failed!", "error", true);
    }
  };

  return (
    <>
      <Navbar />

      <div className="centered">
        <div className="sm-container mb-3">
          <div className="header-div">
            <h1>Welcome Back 👋</h1>
            <p>Sign in to continue to ScrapSavvy</p>
          </div>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email Address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />

            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>

              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSignin}
            >
              Sign In
            </button>

            <div className="text-center">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>

            <Link to="/signup" className="btn btn-light w-100">
              Create New Account
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
