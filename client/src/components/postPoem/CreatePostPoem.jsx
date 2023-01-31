import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';



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
      
      <form onSubmit={handleSubmit}>
        <TextField
          id='title'
          label='title'
          variant='outlined'
          inputRef={titleRef}
        />
        <br />
        <TextField
          id='attribution'
          label='attribution'
          variant='outlined'
          inputRef={attributionRef}
        />
        
        <TextField
          id='date'
          label='date'
          variant='outlined'
          inputRef={dateRef}
        />
       <br />
      
        <TextField
          id='body'
          label='body'
          variant='outlined'
          multiline
          inputRef={bodyRef}
        />
        <br />
        <TextField
          id='publishedLink'
          label='published Link'
          variant='outlined'
          inputRef={publishedLinkRef}
        />
        <TextField
          id='buyLink'
          label='buy Link'
          variant='outlined'
          inputRef={buyLinkRef}
        />
        <br />
        <TextField
          id='imageLink'
          label='image Link'
          variant='outlined'
          inputRef={imageLinkRef}
        />
        <TextField
          id='featuredIn'
          label='featured In'
          variant='outlined'
          inputRef={imageLinkRef}
        />
        <br />
        <Button type='submit' variant='contained' color='success'>
          Create Post
        </Button>
      </form>
    </>
  );
};

export default CreatePostPoem;
