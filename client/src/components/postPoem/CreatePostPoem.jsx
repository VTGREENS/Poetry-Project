import React, { useRef } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
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

const LongInputField = styled(TextField)(() => ({
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
  // width: '20vw',
}));

const CreatePostPoem = (props) => {
  const titleRef = useRef();
  const attributionRef = useRef();
  const dateRef = useRef();
  const poemAltTextRef = useRef();
  const publishedLinkRef = useRef();
  const buyLinkRef = useRef();
  const imageLinkRef = useRef();
  const featuredInRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef?.current?.value;
    const attribution = attributionRef?.current?.value;
    const date = dateRef?.current?.value;
    const poemAltText = poemAltTextRef?.current?.value;
    const publishedLink = publishedLinkRef?.current?.value;
    const buyLink = buyLinkRef?.current?.value;
    const imageLink = imageLinkRef?.current?.value;
    const featuredIn = featuredInRef?.current?.value;

    let url = 'http://localhost:4000/post/create';

    let bodyObject = JSON.stringify({
      title,
      attribution,
      date,
      poemAltText,
      publishedLink,
      buyLink,
      imageLink,
      featuredIn,
    });

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'POST',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.fetchPostPoems();
      document.getElementById('postPoem-form').reset();
      console.log(data);

      if (data.message === 'Your post has been added') {
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
        }}
      >
        <CardContent>
          <form id='postPoem-form' onSubmit={handleSubmit} style={{textAlign:'center'}}>
            <StyledInputField
              id='title-input'
              label='Title'
              variant='outlined'
              color="success"
              inputRef={titleRef}
            />
            <StyledInputField
              id='attribution-input'
              label='Attribution'
              variant='outlined'
              color="success"
              inputRef={attributionRef}
            />
            <StyledInputField
              id='date-input'
              label='Date'
              variant='outlined'
              color="success"
              inputRef={dateRef}
            />
            <StyledInputField
              id='published-link-input'
              label='Published Link'
              variant='outlined'
              color="success"
              inputRef={publishedLinkRef}
            />
            <StyledInputField
              id='buy-link-input'
              label='Buy Link'
              variant='outlined'
              color="success"
              inputRef={buyLinkRef}
            />
            <StyledInputField
              id='image-link-input'
              label='Image Link'
              variant='outlined'
              color="success"
              inputRef={imageLinkRef}
            />
            <StyledInputField
              id='featured-in-input'
              label='Featured In'
              variant='outlined'
              color="success"
              inputRef={featuredInRef}
            />
            <LongInputField
              id='body-input'
              label='Poem Alt Text'
              variant='outlined'
              color="success"
              multiline
              inputRef={poemAltTextRef}
            />
            <CardActions sx={{display:'flex', justifyContent:'center'}}>
              <Button sx={{width:'12rem'}}
              type='submit'
              variant='contained' 
              color='primary'>
                Create Post
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreatePostPoem;
