import React, { useRef } from 'react';
import { TextField, Button, Card, CardActions } from '@mui/material';
import styled from '@emotion/styled';

const StyledInputField = styled(TextField)(() => ({
  margin: '1rem',
  flexGrow: '1',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: '2px',
      borderRadius: '1rem',
    },
  },
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
      props.fetchHomeAboutContent();
      document.getElementById('homeAbout-form').reset();
      

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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          alignContent: 'start',
          margin: 'auto',
          marginTop: '1rem',
          paddingTop: '1rem',
          backgroundColor: '#FFFFFF',
          border:'solid',
          borderRadius:"1rem",
          borderWidth:"2px",
          width: '48vw'
        }}
        
      >
        <form id='homeAbout-form' onSubmit={handleSubmit}>
          <StyledInputField
            sx={{ flexGrow: '1' }}
            id='aboutContentImage'
            label='About Content Image'
            variant='outlined'
            multiline
            color='success'
            inputRef={aboutContentImageRef}
          />
          <StyledInputField
            sx={{ flexGrow: '1' }}
            id='aboutContentText'
            label='About Content Text'
            variant='outlined'
            multiline
            color='success'
            inputRef={aboutContentTextRef}
          />
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
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
