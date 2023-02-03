import React, { useRef } from 'react';
import { TextField, Button, Card, CardActions } from '@mui/material';
import styled from '@emotion/styled';

const StyledInputField = styled(TextField)(() => ({
  margin: '1rem',
  flexGrow: '1',
  border: 'solid',
  borderWidth: '2px',
  borderRadius: '1rem',
}));

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
        alert('Home/About Content Created!');
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
          marginBottom: '1rem',
          borderRadius: '1rem',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: '2px',
          width: '48vw',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          <StyledInputField
            id='aboutContentImage'
            label='about content image'
            variant='outlined'
            multiline
            inputRef={aboutContentImageRef}
          />
          <StyledInputField
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
