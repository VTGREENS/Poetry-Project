import React from "react";
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
import styled from "@emotion/styled"
import jwt_decode from 'jwt-decode'

const DisplayDigitalWorksCard = ({
  _id,
  fetchDigitalWorks,
  token,
  title,
  linkUrl,
  imageUrl,
  description,
}) => {

  const decodedToken = token ? jwt_decode(token) : null 
  const navigate = useNavigate();
  async function deleteDigitalWorks(id) {
    const url = `http://localhost:4000/digital/delete/${id}`;
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
      fetchDigitalWorks();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
       <Card sx={{ display: "flex", marginBottom: "1rem", border:'solid', borderWidth:'2px', borderRadius:'1rem' }}>
        <CardMedia sx={{ width: "30vw" }} component="img" image={imageUrl} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography
              sx={{ whiteSpace: "pre-wrap" }}
              multiline
              gutterBottom
              variant="body1"
            >
              {description}
            </Typography>
            <Typography gutterBottom variant="subtitle">
              <CardActions>
                <Button
                  variant="contained"
                  href={linkUrl}
                  aria-label="Link"
                  size="small"
                >
                  Link to Publication
                </Button>
              </CardActions>
              { decodedToken ?
              <CardActions>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => navigate(`/digital/update/${_id}`)}
                >
                  Update
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => deleteDigitalWorks(_id)}
                >
                  DELETE
                </Button>
              </CardActions> : null}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default DisplayDigitalWorksCard;
