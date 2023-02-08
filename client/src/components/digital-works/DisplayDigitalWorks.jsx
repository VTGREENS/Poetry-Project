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
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

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
              variant="body1"
              sx={{ whiteSpace: "pre-wrap" }}
              gutterBottom
            >
              {description}
            </Typography>
            <Typography gutterBottom variant="subtitle">
              <CardActions>
                <Button
                sx={{width: '14.5rem'}}
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
                <Button sx={{color:'white', width: "7rem", backgroundColor: theme.palette.secondary.main}}
                  variant="contained"
                  type="submit"
                  onClick={() => navigate(`/digital/update/${_id}`)}
                  aria-label={`Edit ${title}`} 
                >
                 EDIT
                </Button>
                <Button sx={{color:'black', width: "7rem", backgroundColor: theme.palette.primary.main}}
                  variant="contained"
                  type="submit"
                  onClick={() => deleteDigitalWorks(_id)}
                  aria-label={`Delete ${title}`}
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
