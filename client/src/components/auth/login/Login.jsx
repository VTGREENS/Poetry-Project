import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";

const StyledInputField = styled(TextField)(() => ({
  margin: "1rem",
  flexGrow: "1",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderStyle: "solid",
      borderColor: 'black',
      borderWidth: "2px",
      borderRadius: "1rem"
    },
  },
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Megan Mary Moore Poetry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LogIn({ updateToken }) {
  // * Define hooks for use in submit handler function
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const params = useParams()
  let page = params.page ?? "home"

  async function handleSubmit(e) {
    e.preventDefault();

    // * Grab current values from form
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // * Build fetch request to log in user
    let url = `http://localhost:4000/admin/login`;
    let bodyObject = JSON.stringify({ email, password });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === "success") {
        // !  We are free to navigate back
        // * Store valid token in local storage
        updateToken(data.token);
        // * Navigate to home page 
        navigate(`/${page}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <StyledInputField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          <StyledInputField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
