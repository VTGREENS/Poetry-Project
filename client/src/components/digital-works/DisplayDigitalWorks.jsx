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

const DisplayDigitalWorksCard = ({
  _id, 
  fetchDigitalWorks,
  token,
  title,
  linkUrl,
  imageUrl,
}) => {
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
      <Card
        sx={{ display: "flex", maxWidth: 250, padding: 5, border: "solid",  }}
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
            <Typography variant="h3">{title}</Typography>
            <Typography gutterBottom variant="subtitle">
              {linkUrl}
            </Typography>
            <Typography gutterBottom variant="body1">
              {imageUrl}
            </Typography>
            <Button variant="contained" onClick={() => navigate(`/digital/update/${_id}`)}>
                  Edit
                </Button>
                <br />
                <br />
            <Button variant="contained" onClick={() => deleteDigitalWorks(_id)}>
              DELETE
            </Button>
          </CardContent>
        </Box>
      </Card>
        <br />
    </>
  );
};

export default DisplayDigitalWorksCard;
