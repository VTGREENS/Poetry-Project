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
  width: '25vw',
}));

const CreatePostPoem = (props) => {
  const titleRef = useRef();
  const attributionRef = useRef();
  const dateRef = useRef();
  const bodyRef = useRef();
  const publishedLinkRef = useRef();
  const buyLinkRef = useRef();
  const imageLinkRef = useRef();
  const featuredInRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef?.current?.value;
    const attribution = attributionRef?.current?.value;
    const date = dateRef?.current?.value;
    const body = bodyRef?.current?.value;
    const publishedLink = publishedLinkRef?.current?.value;
    const buyLink = buyLinkRef?.current?.value;
    const imageLink = imageLinkRef?.current?.value;
    const featuredIn = featuredInRef?.current?.value;

    let url = 'http://localhost:4000/post/create';

    let bodyObject = JSON.stringify({
      title,
      attribution,
      date,
      body,
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
          justifyContent: 'center',
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <StyledInputField
              id='title-input'
              label='title'
              variant='outlined'
              color="success"
              inputRef={titleRef}
            />
            <StyledInputField
              id='attribution-input'
              label='attribution'
              variant='outlined'
              color="success"
              inputRef={attributionRef}
            />
            <StyledInputField
              id='date-input'
              label='date'
              variant='outlined'
              color="success"
              inputRef={dateRef}
            />
            <StyledInputField
              id='published-link-input'
              label='published Link'
              variant='outlined'
              color="success"
              inputRef={publishedLinkRef}
            />
            <StyledInputField
              id='buy-link-input'
              label='buy Link'
              variant='outlined'
              color="success"
              inputRef={buyLinkRef}
            />
            <StyledInputField
              id='image-link-input'
              label='image Link'
              variant='outlined'
              color="success"
              inputRef={imageLinkRef}
            />
            <StyledInputField
              id='featured-in-input'
              label='featured In'
              variant='outlined'
              color="success"
              inputRef={featuredInRef}
            />
            <LongInputField
              id='body-input'
              label='body'
              variant='outlined'
              color="success"
              multiline
              inputRef={bodyRef}
            />
            <CardActions>
              <Button type='submit' variant='contained' color='primary'>
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
