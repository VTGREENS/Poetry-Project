import React, { useRef } from 'react';
import { FormControl, TextField, Button, Box } from '@mui/material';

const CreateWorksPhysical = (props) => {
  
  const imageRef = useRef();
  const imageAltTextRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const msrpRef = useRef();
  const linksRef = useRef();
  const signedPriceRef = useRef();
  const linkSignedRef = useRef();
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const image = imageRef.current.value;
    const imageAltText = imageAltTextRef.current.value;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const msrp = msrpRef.current.value;
    const links = linksRef.current.value;
    const signedPrice = signedPriceRef.current.value;
    const linkSigned = linkSignedRef.current.value;

    let url = 'http://localhost:4000/physical/create';

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      title,
      description,
      msrp,
      links,
      signedPrice,
      linkSigned,
    });

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'POST',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.fetchWorksPhysical();
      console.log(data);
      formRef.current.reset();

      if (data.message === 'Physical Works Created') {
        // props.updatePhysicalWorks(data.worksPhysical.title);
      } else {
        alert(data.message);
      }

      
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
    <h2>Hello from CreateWorksPhysical</h2>
  
      <FormControl onSubmit={handleSubmit} innerref={formRef}>
        <TextField
          id='image'
          label='image URL'
          variant='outlined'
          innerref={imageRef}
        />
        <TextField
          id='imageAltText'
          label='image Alt Text'
          variant='outlined'
          innerref={imageAltTextRef}
        />
        <TextField
          id='title'
          label='title'
          variant='outlined'
          innerref={titleRef}
        />
        <TextField
          id='description'
          label='description'
          variant='outlined'
          innerref={descriptionRef}
        />
        <TextField
          id='msrp'
          label='msrp'
          variant='outlined'
          innerref={msrpRef}
        />
        <TextField
          id='links'
          label='links'
          variant='outlined'
          innerref={linksRef}
        />
        <TextField
          id='signedPrice'
          label='signedPrice'
          variant='outlined'
          innerref={signedPriceRef}
        />
        <TextField
          id='linkSigned'
          label='linkSigned'
          variant='outlined'
          innerref={linkSignedRef}
        />
        <Button type="submit" variant='contained' color="success">Submit Physical Works</Button>
      </FormControl>
    </>
  );
};

export default CreateWorksPhysical;
