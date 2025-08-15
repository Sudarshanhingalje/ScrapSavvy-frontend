import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import Navbar from "../Common/Navbar";
import Toast from "../Common/Snackbar";
import { ValidateEmail, ValidatePassword } from "./Validation";

const Signup = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const validate = () => {
    const tempErrors = {};
    let isValid = true;
    if (name === undefined || name === "") {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (email === undefined || email === "") {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!ValidateEmail(email, tempErrors)) {
      isValid = false;
    }

    if (mobile === undefined || mobile === "") {
      tempErrors.mobile = "Mobile is required";
      isValid = false;
    }

    if (mobile !== undefined || mobile !== "") {
      if (mobile.length < 10 || mobile.length > 10) {
        tempErrors.mobile = "Mobile number must be 10 digits";
        isValid = false;
      }
    }

    if (companyName === undefined || companyName === "") {
      tempErrors.companyName = "Company name is required";
      isValid = false;
    }

    if (companyAddress === undefined || companyAddress === "") {
      tempErrors.companyAddress = "Company address is required";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (!ValidatePassword(password)) {
      tempErrors.password = "Invalid password";
      isValid = false;
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (userRole === undefined || userRole === "") {
      tempErrors.userRole = "User role is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    //dispatch(ActionCreator.SetUserProfile({"email": email, "password": password}));
    if (validate()) {
      let formData = {
        email: email,
        name: name,
        mobile: mobile,
        companyName: companyName,
        companyAddress: companyAddress,
        password: password,
        confirmPassword: confirmPassword,
        userRole: userRole,
      };
      await AuthService.SignUp(formData)
        .then((response) => {
          if (response.status === 201) {
            handleSnackbar("Sign-up successful!", "success", true);
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
          } else {
            handleSnackbar("Server error!", "error", true);
          }
        })
        .catch((error) => {
          handleSnackbar(error.response.data, "error", true);
        });
    }
  };

  const handleSnackbar = (message, severity, show) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(show);
  };

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Navbar />
      <div className="md-container">
        <Toast
          open={snackbarOpen}
          close={handleSnackbarClose}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
        <div className="header-div">
          <h1>Sign up</h1>
        </div>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                variant="outlined"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Address"
                variant="outlined"
                multiline
                rows={3}
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                error={!!errors.companyAddress}
                helperText={errors.companyAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label">Sign up as </InputLabel>
                <Select
                  labelId="category-select-label"
                  value={userRole}
                  onChange={handleRoleChange}
                  label="Product category"
                  error={!!errors.userRole}
                  helperText={errors.userRole}
                >
                  <MenuItem value="company">Company</MenuItem>
                  <MenuItem value="scrapyard">Scrapyard</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showCPassword ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCPassword}
                        onMouseDown={handleMouseDownCPassword}
                        edge="end"
                      >
                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6}>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link type="button" className="btn btn-light w-100" to="/signin">
                Have an account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Signup;
