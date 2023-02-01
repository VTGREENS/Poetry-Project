import { TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Edit Physical Works
const EditWorksPhysical = (props) => {
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [title, setTitle] = useState('');
  const [attribution, setAttribution] = useState('');
  const [description, setDescription] = useState('');
  const [msrp, setMsrp] = useState('');
  const [amazonLink, setAmazonLink] = useState('');
  const [unsolicitedPressLink, setUnsolicitedPressLink] = useState('');
  const [barnesAndNobleLink, setBarnesAndNobleLink] = useState('');
  const [signedPrice, setSignedPrice] = useState('');
  const [signedLink, setSignedLink] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/physical/update/${id}`;

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
    myHeaders.append('Authorization', props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'PUT',
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === 'Physical Work Info Updated') {
        navigate('/physical');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  //Fetch Physical Works
  // TODO Token or ID needed?
  const fetchWorkPhysical = async () => {
    const url = `http://localhost:4000/physical/${id}`;
    let myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setImage(data.workPhysical.image);
      setImageAltText(data.workPhysical.imageAltText);
      setTitle(data.workPhysical.title);
      setAttribution(data.workPhysical.attribution);
      setDescription(data.workPhysical.description);
      setMsrp(data.workPhysical.msrp);
      setAmazonLink(data.workPhysical.amazonLink);
      setUnsolicitedPressLink(data.workPhysical.unsolicitedPressLink);
      setBarnesAndNobleLink(data.workPhysical.barnesAndNobleLink);
      setSignedPrice(data.workPhysical.signedPrice);
      setSignedLink(data.workPhysical.signedLink);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchWorkPhysical();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id='image'
          label='image URL'
          variant='outlined'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          id='imageAltText'
          label='image Alt Text'
          variant='outlined'
          value={imageAltText}
          onChange={(e) => setImageAltText(e.target.value)}
        />
        <TextField
          id='title'
          label='title'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id='attribution'
          label='attribution'
          variant='outlined'
          value={attribution}
          onChange={(e) => setAttribution(e.target.value)}
        />
        <TextField
          id='description'
          label='description'
          variant='outlined'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id='msrp'
          label='msrp'
          variant='outlined'
          value={msrp}
          onChange={(e) => setMsrp(e.target.value)}
        />
        <TextField
          id='amazonLink'
          label='amazonLink'
          variant='outlined'
          value={amazonLink}
          onChange={(e) => setAmazonLink(e.target.value)}
        />
        <TextField
          id='unsolcitedPressLink'
          label='unsolicitedPressLink'
          variant='outlined'
          value={unsolicitedPressLink}
          onChange={(e) => setUnsolicitedPressLink(e.target.value)}
        />
        <TextField
          id='barnesAndNobleLink'
          label='barnesAndNobleLink'
          variant='outlined'
          value={barnesAndNobleLink}
          onChange={(e) => setBarnesAndNobleLink(e.target.value)}
        />
        <TextField
          id='signedPrice'
          label='signedPrice'
          variant='outlined'
          value={signedPrice}
          onChange={(e) => setSignedPrice(e.target.value)}
        />
        <TextField
          id='linkSigned'
          label='linkSigned'
          variant='outlined'
          value={signedLink}
          onChange={(e) => setSignedLink(e.target.value)}
        />
        <Button type='submit' variant='contained' color='success'>
          Submit Edit
        </Button>
      </form>
    </>
  );
};

export default EditWorksPhysical;
