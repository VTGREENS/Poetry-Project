import React, { useRef } from 'react';
import {Card, CardContent, TextField, Button, CardActions } from '@mui/material'
import styled from '@emotion/styled';

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

const CreateSidebarRightCard = ({token, fetchSidebarRightCards}) => {
  const imageRef = useRef();
  const imageAltTextRef = useRef();
  const excerptRef = useRef();
  const infoLinkRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const image = imageRef?.current?.value;
    const imageAltText = imageAltTextRef?.current?.value;
    const excerpt = excerptRef?.current?.value;
    const infoLink = infoLinkRef?.current?.value;

    let url = 'http://localhost:4000/sidebarright/create';

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      excerpt,
      infoLink,
    });

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'POST',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      fetchSidebarRightCards();
      document.getElementById('sidebar-form').reset();
      console.log(data);

      if (data.message === 'Content Created') {
        alert('Card Created')
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <Card sx={{ marginBottom:"1rem", borderRadius: '1rem', borderColor: "black", borderStyle: "solid", borderWidth:'2px', width:'17vw', backgroundColor: "#FFFFFF" }}>
        <CardContent>
          <form id='sidebar-form' onSubmit={handleSubmit}>
            <StyledInputField
              id='image'
              label='Image'
              variant='outlined'
              color="success"
              inputRef={imageRef}
            />
            <StyledInputField
              id='imageAltText'
              label='Image Alt Text'
              variant='outlined'
              color="success"
              inputRef={imageAltTextRef}
            />
            <br />
            <StyledInputField
              id='excerpt'
              label='Excerpt'
              variant='outlined'
              color="success"
              multiline
              inputRef={excerptRef}
            />
            <StyledInputField
              id='infoLink'
              label='Information Link'
              variant='outlined'
              color="success"
              inputRef={infoLinkRef}
            />
            <CardActions>
              <Button type='submit' variant='contained' color='primary'>
                Create Sidebar Card
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateSidebarRightCard;