import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';

const CreateWorksPhysical = (props) => {
  
  const imageRef = useRef();
  const imageAltTextRef = useRef();
  const titleRef = useRef();
  const attributionRef = useRef();
  const descriptionRef = useRef();
  const msrpRef = useRef();
  const amazonLinkRef = useRef();
  const unsolicitedPressLinkRef = useRef();
  const barnesAndNobleLinkRef = useRef();
  const signedPriceRef = useRef();
  const signedLinkRef = useRef();
  

  async function handleSubmit(e) {
    e.preventDefault();
    const image = imageRef?.current?.value;
    const imageAltText = imageAltTextRef?.current?.value;
    const title = titleRef?.current?.value;
    const attribution = attributionRef?.current?.value;
    const description = descriptionRef?.current?.value;
    const msrp = msrpRef?.current?.value;
    const amazonLink = amazonLinkRef?.current?.value;
    const unsolicitedPressLink = unsolicitedPressLinkRef?.current?.value;
    const barnesAndNobleLink = barnesAndNobleLinkRef?.current?.value;
    const signedPrice = signedPriceRef?.current?.value;
    const signedLink = signedLinkRef?.current?.value;

    let url = 'http://localhost:4000/physical/create';

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      title,
      attribution,
      description,
      msrp,
      amazonLink,
      unsolicitedPressLink,
      barnesAndNobleLink,
      signedPrice,
      signedLink,
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
      // TODO Navigate!
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
          id='attribution'
          label='attribution'
          variant='outlined'
          inputRef={attributionRef}
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
          id='amazonLink'
          label='amazonLink'
          variant='outlined'
          inputRef={amazonLinkRef}
        />
         <TextField
          id='unsolicitedPressLink'
          label='unsolicitedPressLink'
          variant='outlined'
          inputRef={unsolicitedPressLinkRef}
        />
         <TextField
          id='barnesAndNobleLink'
          label='barnesAndNobleLink'
          variant='outlined'
          inputRef={barnesAndNobleLinkRef}
        />
        <TextField
          id='signedPrice'
          label='signedPrice'
          variant='outlined'
          inputRef={signedPriceRef}
        />
        <TextField
          id='signedLink'
          label='signedLink'
          variant='outlined'
          inputRef={signedLinkRef}
        />
        <Button type="submit" variant='contained' color="success">Submit Physical Works</Button>
      </form>
    </>
  );
};

export default CreateWorksPhysical;
