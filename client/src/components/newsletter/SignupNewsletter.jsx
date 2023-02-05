import * as React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardActions } from "@mui/material";
import { Container } from "@mui/system";
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
    
      <Card
        sx={{
          marginBottom: "1rem",
          borderRadius: "1rem",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: "2px",
          width: "15vw",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Container padding-leftmaxWidth="sm">
            <Typography component="h1" variant="h6">
              Newsletter Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <StyledInputField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="success"
                inputRef={emailRef}
              />
              <CardActions>
                <Button type="submit" fullWidth variant="contained">
                  Sign Up
                </Button>
              </CardActions>
            </form>
          </Container>
        </Box>
      </Card>
    
  );
};

export default SignupNewsletter;
