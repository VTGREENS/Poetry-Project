import React from "react";
import { useState } from "react";
import {
  CardMedia,
  Card,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const DisplayNewsletterCard = ({ _id, fetchNewsletters, token, email }) => {
  const navigate = useNavigate();
  async function deleteNewsletters(id) {
    const url = `http://localhost:4000/newsletter/delete/${id}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      console.log(data);
      fetchNewsletters();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Card
        sx={{
          marginBottom: "1rem",
          borderRadius: "1rem",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: "2px",
          width: "34vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <CardContent>
            <Checkbox inputProps={{ "aria-label": "controlled" }} />
            <Typography variant="h5">{email}</Typography>
            <Typography gutterBottom variant="subtitle">
              <CardActions>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => deleteNewsletters(_id)}
                >
                  DELETE
                </Button>
              </CardActions>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default DisplayNewsletterCard;
