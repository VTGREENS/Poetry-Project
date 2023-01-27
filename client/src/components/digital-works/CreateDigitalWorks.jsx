import React, { useRef } from 'react';
import { Card, CardContent, FormGroup } from '@mui/material';
import { FormLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { TextField, Button } from '@mui/material';

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
            method: 'POST',
          };

          try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchDigitalWorks();
            console.log(data);
            // formRef.current.reset();
      
            if (data.message === 'Digital Works Created') {
            
            } else {
              alert(data.message);
            }
      
            
          } catch (error) {
            console.log(error.message)
          }
        }

    return ( 
      <>
      <Card sx={{ maxWidth: 250, padding: 5, border: "solid" }}>
        <CardContent>
        <form onSubmit={handleSubmit} >
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
          id='imageUrl'
          label='Image Url'
          variant='outlined'
          inputRef={imageUrlRef}
        />
        <Button type="submit" variant='contained' color="success">Submit Digital Work</Button>
      </form>
      </CardContent>
      </Card>
    </>
  );
};

export default CreateDigitalWorks;
