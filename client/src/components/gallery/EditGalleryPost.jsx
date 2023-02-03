import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled"
import StickyFooter from "../footer/StickyFooter";

const StyledInputField = styled(TextField)(() => ({
  margin: "1rem",
  flexGrow: "1"
}))

const LongInputField = styled(TextField)(() => ({
  margin: "1rem",
  width: "25vw",
  flexGrow: "3"
}))

const EditGalleryPost = (props) => {
  const { id } = useParams();
  const [imageURL, setImageURL] = useState("");
  const [altImageText, setAltImageText] = useState("");
  const [attribution, setAttribution] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/gallery/update/${id}`;

    let bodyObj = JSON.stringify({
      imageURL,
      altImageText,
      attribution,
      description,
    });

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObj,
      method: "PUT",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      navigate("/gallery");
      console.log(data);
      if (data.message === "Gallery Post updated") {
        // navigate('/digital')
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchGalleryPosts = async () => {
    const url = `http://localhost:4000/gallery/${id}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setImageURL(data.galleryPost.imageURL);
      setAltImageText(data.galleryPost.altImageText);
      setAttribution(data.galleryPost.attribution);
      setDescription(data.galleryPost.description);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchGalleryPosts();
  }, []);

  return (
    <>
      <Card sx={{ Display: "flex", padding: 5, border: "solid" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <StyledInputField
                multiline
                id="imageURL"
                label="Image URL"
                variant="outlined"
                value={imageURL}
                onChange={(event) => setImageURL(event.target.value)}
              />
              <StyledInputField
                multiline
                id="imageAltText"
                label="Image Alt Text"
                variant="outlined"
                value={altImageText}
                onChange={(event) => setAltImageText(event.target.value)}
              />
              <StyledInputField
                multiline
                id="attribution"
                label="Attribution"
                variant="outlined"
                value={attribution}
                onChange={(event) => setAttribution(event.target.value)}
              />
              <LongInputField
                multiline
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Button color="success" type="submit" variant="contained">
                Submit Update
              </Button>
            </form>
          </CardContent>
        </Box>
      </Card>
      <StickyFooter />
    </>
  );
};

export default EditGalleryPost;