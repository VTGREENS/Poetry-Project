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
      <Card sx={{ display: "flex", padding: 5, border: "solid" }}>
      <CardMedia sx={{width:"30vw"}} component="img" image={imageUrl} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <CardContent>
            <Typography variant="h4">{title}</Typography>
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
            </Typography>
            </CardContent>
        </Box>
      </Card>
            <Button
              color="success"
              variant="contained"
              onClick={() => navigate(`/digital/update/${_id}`)}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => deleteDigitalWorks(_id)}
            >
              DELETE
            </Button>
        
    </>
  );
};

export default DisplayDigitalWorksCard;
