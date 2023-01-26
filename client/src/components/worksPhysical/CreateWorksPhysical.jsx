import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';

const CreateWorksPhysical = (props) => {
  
  const imageRef = useRef();
  const imageAltTextRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const msrpRef = useRef();
  const linkAmazonRef = useRef();
  const linkUPRef = useRef();
  const linkBaNRef = useRef();
  const signedPriceRef = useRef();
  const linkSignedRef = useRef();
  

  async function handleSubmit(e) {
    e.preventDefault();
    const image = imageRef?.current?.value;
    const imageAltText = imageAltTextRef?.current?.value;
    const title = titleRef?.current?.value;
    const description = descriptionRef?.current?.value;
    const msrp = msrpRef?.current?.value;
    const linkAmazon = linkAmazonRef?.current?.value;
    const linkUP = linkUPRef?.current?.value;
    const linkBaN = linkBaNRef?.current?.value;
    const signedPrice = signedPriceRef?.current?.value;
    const linkSigned = linkSignedRef?.current?.value;

    let url = 'http://localhost:4000/physical/create';

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      title,
      description,
      msrp,
      linkAmazon,
      linkUP,
      linkBaN,
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
      // props.fetchWorksPhysical();
      console.log(data);
      

      if (data.message === 'Physical Works Created') {
      
      } else {
        alert(data.message);
      }

      
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
    <h2>Complete Input Fields to Create Physical Work</h2>
  
      <form onSubmit={handleSubmit} >
        
        <TextField
          id='image'
          label='image URL'
          variant='outlined'
          inputRef={imageRef}
        />
        <TextField
          id='imageAltText'
          label='image Alt Text'
          variant='outlined'
          inputRef={imageAltTextRef}
        />
        <TextField
          id='title'
          label='title'
          variant='outlined'
          inputRef={titleRef}
        />
        <TextField
          id='description'
          label='description'
          variant='outlined'
          inputRef={descriptionRef}
        />
        <TextField
          id='msrp'
          label='msrp'
          variant='outlined'
          inputRef={msrpRef}
        />
        <TextField
          id='linkAmazon'
          label='linkAmazon'
          variant='outlined'
          inputRef={linkAmazonRef}
        />
         <TextField
          id='linkUP'
          label='linkUP'
          variant='outlined'
          inputRef={linkUPRef}
        />
         <TextField
          id='linkBaN'
          label='linkBaN'
          variant='outlined'
          inputRef={linkBaNRef}
        />
        <TextField
          id='signedPrice'
          label='signedPrice'
          variant='outlined'
          inputRef={signedPriceRef}
        />
        <TextField
          id='linkSigned'
          label='linkSigned'
          variant='outlined'
          inputRef={linkSignedRef}
        />
        <Button type="submit" variant='contained' color="success">Submit Physical Works</Button>
      </form>
    </>
  );
};

export default CreateWorksPhysical;
