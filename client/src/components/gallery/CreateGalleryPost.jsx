import React, { useRef } from "react";
import { Card, CardContent, CardActions } from "@mui/material";
import { TextField, Button } from "@mui/material";
import styled from "@emotion/styled";

const StyledInputField = styled(TextField)(() => ({
  margin: "1rem",
  flexGrow: "1",
  border: "solid",
  borderWidth: "2px",
  borderRadius: "1rem",
}));

const CreateGalleryPost = (props) => {
  const imageURLRef = useRef();
  const altImageTextRef = useRef();
  const attributionRef = useRef();
  const descriptionRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const imageURL = imageURLRef.current.value;
    const altImageText = altImageTextRef.current.value;
    const attribution = attributionRef.current.value;
    const description = descriptionRef.current.value;

    let url = `http://localhost:4000/gallery/create`;

    let bodyObject = JSON.stringify({
      imageURL,
      altImageText,
      attribution,
      description,
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
      props.fetchGalleryPosts();
      console.log(data);

      if (data.message === "Gallery Post Created") {
      } else {
        alert(data.message);
      }
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
        <CardContent>
          <form onSubmit={handleSubmit}>
            <StyledInputField
              multiline
              id="imageURL"
              label="Image URL"
              variant="outlined"
              inputRef={imageURLRef}
            />
            <StyledInputField
              multiline
              id="AltImageText"
              label="Alt Image Text"
              variant="outlined"
              inputRef={altImageTextRef}
            />
            <StyledInputField
              multiline
              id="attribution"
              label="Attribution"
              variant="outlined"
              inputRef={attributionRef}
            />
            <StyledInputField
              multiline
              id="description"
              label="Description"
              variant="outlined"
              inputRef={descriptionRef}
            />
            <CardActions>
              <Button type="submit" variant="contained" color="success">
                Submit Gallery Post
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateGalleryPost;