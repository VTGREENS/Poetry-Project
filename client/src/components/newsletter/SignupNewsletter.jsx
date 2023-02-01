import * as React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";

const theme = createTheme();

const SignupNewsletter = (props) => {
  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;

    let url = `http://localhost:4000/newsletter/signup`;

    let bodyObject = JSON.stringify({
      email,
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.fetchNewsletters();
      console.log(data);

      if (data.message === "Email Submitted") {
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ display: "flex", padding: 1, marginBottom: "1rem" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography component="h1" variant="h5">
            Newsletter Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
            />
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </form>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default SignupNewsletter;
