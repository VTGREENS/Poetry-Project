import React, { useRef } from 'react';
import {Card, CardContent, TextField, Button, CardActions } from '@mui/material'

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
      <Card sx={{ display: 'flex' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              id='image'
              label='image'
              variant='outlined'
              inputRef={imageRef}
            />
            <TextField
              id='imageAltText'
              label='imageAltText'
              variant='outlined'
              inputRef={imageAltTextRef}
            />
            <br />
            <TextField
              id='excerpt'
              label='excerpt'
              variant='outlined'
              inputRef={excerptRef}
            />
            <TextField
              id='infoLink'
              label='info link'
              variant='outlined'
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