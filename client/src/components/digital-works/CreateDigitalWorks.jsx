import React, { useRef } from "react";
import { Card, CardContent, CardActions } from "@mui/material";
import { TextField, Button } from "@mui/material";
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

const CreateDigitalWorks = (props) => {
  const titleRef = useRef();
  const linkUrlRef = useRef();
  const imageUrlRef = useRef();
  const descriptionRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const linkUrl = linkUrlRef.current.value;
    const imageUrl = imageUrlRef.current.value;
    const description = descriptionRef.current.value;

    let url = `http://localhost:4000/digital/create`;

    let bodyObject = JSON.stringify({
      title,
      linkUrl,
      imageUrl,
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
      props.fetchDigitalWorks();
      console.log(data);

      if (data.message === "Digital Works Created") {
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
          width: "100%",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <StyledInputField
              multiline
              id="title"
              label="Title"
              variant="outlined"
              color="success"
              inputRef={titleRef}
            />
            <StyledInputField
              multiline
              id="linkUrl"
              label="Link to Publication"
              variant="outlined"
              color="success"
              inputRef={linkUrlRef}
            />
            <StyledInputField
              multiline
              id="imageUrl"
              label="Image URL"
              variant="outlined"
              color="success"
              inputRef={imageUrlRef}
            />
            <StyledInputField
              multiline
              id="description"
              label="Description"
              variant="outlined"
              color="success"
              inputRef={descriptionRef}
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary">
                Submit Digital Work
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateDigitalWorks;
