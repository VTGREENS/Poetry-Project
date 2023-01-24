import { useRef } from 'react';
import { FormControl } from '@mui/material';

const CreatePhysicalWorks = (props) => {
  let imageRef = useRef();
  let imageAltTextRef = useRef();
  let titleRef = useRef();
  let msrpRef = useRef();
  let linksRef = useRef();
  let signedPriceRef = useRef();
  let linkSignedRef = useRef();
  let formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    let image = imageRef.current.value;
    let imageAltText = imageAltTextRef.current.value;
    let title = titleRef.current.value;
    let msrp = msrpRef.current.value;
    let links = linksRef.current.value;
    let signedPrice = signedPriceRef.current.value;
    let linkSigned = linkSignedRef.current.value;

    let url = 'http://localhost:4000/physical/create';

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      title,
      msrp,
      links,
      signedPrice,
      linkSigned,
    });

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'POST',
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      props.fetchPhysicalWorks();
      console.log(data);

      if (data.message === 'Physical Works Created') {
        props.updatePhysicalWorks(data.physicalWorks.title);
      } else {
        alert(data.message);
      }

      formRef.current.reset();
    } catch (error) {}
  }
  return (
    <>
      <FormControl onSubmit={handleSubmit} innerRef={formRef}>
        <TextField
          id='image'
          label='image URL'
          variant='outlined'
          innerRef={imageRef}
        />
        <TextField
          id='imageAltText'
          label='image Alt Text'
          variant='outlined'
          innerRef={imageAltTextRef}
        />
        <TextField
          id='title'
          label='title'
          variant='outlined'
          innerRef={titleRef}
        />
        <TextField
          id='msrp'
          label='msrp'
          variant='outlined'
          innerRef={msrpRef}
        />
        <TextField
          id='links'
          label='links'
          variant='outlined'
          innerRef={linksRef}
        />
        <TextField
          id='signedPrice'
          label='signedPrice'
          variant='outlined'
          innerRef={signedPriceRef}
        />
        <TextField
          id='linkSigned'
          label='linkSigned'
          variant='outlined'
          innerRef={linkSignedRef}
        />
      </FormControl>
    </>
  );
};

export default CreatePhysicalWorks;
