import React from "react";
import { useRef } from "react";
import { FormControl, TextField } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const CreateDigitalWorks = (props) => {
  const titleRef = useRef();
  const linkUrlRef = useRef();
  const imageUrlRef = useRef();
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const linkUrl = linkUrlRef.current.value;
    const imageUrl = imageUrlRef.current.value;

    let url = `http://localhost:4000/digital/create`;

    let bodyObject = JSON.stringify({
      title,
      linkUrl,
      imageUrl,
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
      formRef.current.reset();
      console.log("Successfully added a Digital Works");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
           <form onSubmit={handleSubmit} inputRef={formRef}>
        <TextField
          id='title'
          label='Title'
          variant='outlined'
          inputRef={titleRef}
        />
        <TextField
          id='linkUrl'
          label='Link Url'
          variant='outlined'
          inputRef={linkUrlRef}
        />
        <TextField
          id='title'
          label='Title'
          variant='outlined'
          inputRef={titleRef}
        />
        <Button type="submit" variant='contained' color="success">Submit Digital Work</Button>
      </form>
    </>
  );
};

export default CreateDigitalWorks;
