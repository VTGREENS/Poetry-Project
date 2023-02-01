import React, { useRef } from 'react';
import {
  TextField,
  Button,
  Card,
  CardActions,
} from '@mui/material';

const CreateHomeAbout = (props) => {
  const aboutContentImageRef = useRef();
  const aboutContentTextRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const aboutContentImage = aboutContentImageRef?.current?.value;
    const aboutContentText = aboutContentTextRef?.current?.value;

    let url = 'http://localhost:4000/about/create';

    let bodyObject = JSON.stringify({
      aboutContentImage,
      aboutContentText,
    });
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'Post',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);

      if (data.message === 'Your content has been added') {
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
        <form onSubmit={handleSubmit}>
          <TextField
            id='aboutContentImage'
            label='about content image'
            variant='outlined'
            inputRef={aboutContentImageRef}
          />
          <TextField
            id='aboutContentText'
            label='about content text'
            variant='outlined'
            multiline
            inputRef={aboutContentTextRef}
          />
          <CardActions>
            <Button type='submit' variant='contained' color='primary'>
              Create Home/About
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
};
export default CreateHomeAbout;
