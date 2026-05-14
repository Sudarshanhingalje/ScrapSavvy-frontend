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
import Toast from "../../Components/Common/Snackbar";
import Navbar from "../../Components/Layout/Navbar";
import AuthService from "../../Services/AuthService";
import { ActionCreator } from "../../redux/actions/ActionCreator";
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

  // ================= SIGN IN =================

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      handleSnackbar("Please enter valid credentials", "error", true);

      return;
    }

    try {
      const formData = {
        email,
        password,
      };

      const response = await AuthService.SignIn(formData);

      if (response.status === 200) {
        const profile = response.data.userProfile;

        // ================= CLEAR OLD DATA =================

        localStorage.clear();

        // ================= SAVE USER DATA =================

        localStorage.setItem("name", profile.name);

        localStorage.setItem("email", profile.emailId);

        localStorage.setItem("mobile", profile.mobile);

        // ✅ IMPORTANT
        const payload = JSON.parse(atob(response.data.token.split(".")[1]));

        localStorage.setItem("userId", payload.userId);

        localStorage.setItem("role", profile.userRole);

        // token
        localStorage.setItem("token", response.data.token);

        // redux
        dispatch(ActionCreator.SetUserToken(response.data.token));

        handleSnackbar("✅ Sign-in successful!", "success", true);

        // redirect
        redirectBasedOnRole(profile.userRole);
      } else {
        handleSnackbar("Server error!", "error", true);
      }
    } catch (error) {
      console.error(error);

      handleSnackbar(error?.response?.data || "Login failed!", "error", true);
    }
  };

  // ================= UI =================

  return (
    <>
      <Navbar />

      <div className="centered">
        <div className="sm-container mb-3">
          <div className="header-div text-center mb-4">
            <h1>Welcome Back 👋</h1>

            <p className="text-muted">Sign in to continue to ScrapSavvy</p>
          </div>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* EMAIL */}

            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              placeholder="Enter your email"
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
                placeholder="Enter password"
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
                label="Password"
              />
            </FormControl>

            {/* BUTTON */}

            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleSignin}
            >
              Sign In
            </button>

            {/* LINKS */}

            <div className="text-center">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>

            <Link to="/signup" className="btn btn-light w-100">
              Create New Account
            </Link>
          </Box>
        </div>

        {/* TOAST */}

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
