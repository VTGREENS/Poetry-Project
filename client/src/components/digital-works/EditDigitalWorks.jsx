import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled"

const StyledInputField = styled(TextField)(() => ({
  margin: "1rem",
  flexGrow: "1"
}))

const LongInputField = styled(TextField)(() => ({
  margin: "1rem",
  width: "25vw",
  flexGrow: "3"
}))

const EditDigitalWorks = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/digital/update/${id}`;

    let bodyObj = JSON.stringify({
      title,
      linkUrl,
      imageUrl,
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
      navigate("/digital");
      console.log(data);
      if (data.message === "Digital Work updated") {
        // navigate('/digital')
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchDigitalWork = async () => {
    const url = `http://localhost:4000/digital/${id}`;
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
      setTitle(data.workDigital.title);
      setLinkUrl(data.workDigital.linkUrl);
      setImageUrl(data.workDigital.imageUrl);
      setDescription(data.workDigital.description);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchDigitalWork();
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
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <StyledInputField
                multiline
                id="linkUrl"
                label="Link Url"
                variant="outlined"
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
              />
              <StyledInputField
                multiline
                id="imageUrl"
                label="Image Url"
                variant="outlined"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
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
    </>
  );
};

export default EditDigitalWorks;
