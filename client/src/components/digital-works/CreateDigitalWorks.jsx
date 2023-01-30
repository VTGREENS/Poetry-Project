import React, { useRef } from "react";
import { Card, CardContent, FormGroup, CardActions } from "@mui/material";
import { FormLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { TextField, Button } from "@mui/material";

const CreateDigitalWorks = (props) => {
  const titleRef = useRef();
  const linkUrlRef = useRef();
  const imageUrlRef = useRef();
  const formRef = useRef();
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
      // formRef.current.reset();

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
      <Card sx={{ display:"flex" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              multiline
              id="title"
              label="Title"
              variant="outlined"
              inputRef={titleRef}
            />
            <TextField
              multiline
              id="linkUrl"
              label="Link to Publication"
              variant="outlined"
              inputRef={linkUrlRef}
            />
            <TextField
              multiline
              id="imageUrl"
              label="Image URL"
              variant="outlined"
              inputRef={imageUrlRef}
            />
            <TextField
              multiline
              id="description"
              label="Description"
              variant="outlined"
              inputRef={descriptionRef}
            />
            <CardActions>
            <Button type="submit" variant="contained" color="success">
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
