import { TextField, Button, Card, CardActions, Box, CssBaseline } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import StickyFooter from '../footer/StickyFooter';
import jwt_decode from 'jwt-decode'

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

const LongInputField = styled(StyledInputField)(() => ({
  width: '25vw',
  flexGrow: '3',
}));

// Edit Physical Works
const EditWorksPhysical = ({ token }) => {
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
  const decodedToken = token ? jwt_decode(token) : null 

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
    myHeaders.append('Authorization', token);

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
        alert('Physical Work Updated!');
        navigate('/physical');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  //Fetch Physical Works
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
    <CssBaseline/>
    {decodedToken ? 
    <Box sx={{}}>
      <Card sx={{ display: 'flex', marginTop: '1rem', padding: '1rem', border: 'solid', borderWidth: "2px", borderRadius: "1rem", }}>
        <form
          sx={{
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            
          }}
          onSubmit={handleSubmit}
        >
          <StyledInputField
            id='image'
            label='image URL'
            variant='outlined'
            multiline
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <StyledInputField
            id='imageAltText'
            label='image Alt Text'
            variant='outlined'
            multiline
            value={imageAltText}
            onChange={(e) => setImageAltText(e.target.value)}
          />
          <StyledInputField
            id='title'
            label='title'
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <StyledInputField
            id='attribution'
            label='attribution'
            variant='outlined'
            value={attribution}
            onChange={(e) => setAttribution(e.target.value)}
          />
          <LongInputField
            id='description'
            label='description'
            variant='outlined'
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <StyledInputField
            id='amazonLink'
            label='amazonLink'
            variant='outlined'
            multiline
            value={amazonLink}
            onChange={(e) => setAmazonLink(e.target.value)}
          />
          <StyledInputField
            id='unsolcitedPressLink'
            label='unsolicitedPressLink'
            variant='outlined'
            multiline
            value={unsolicitedPressLink}
            onChange={(e) => setUnsolicitedPressLink(e.target.value)}
          />
          <StyledInputField
            id='barnesAndNobleLink'
            label='barnesAndNobleLink'
            variant='outlined'
            multiline
            value={barnesAndNobleLink}
            onChange={(e) => setBarnesAndNobleLink(e.target.value)}
          />
          <StyledInputField
            id='linkSigned'
            label='linkSigned'
            variant='outlined'
            multiline
            value={signedLink}
            onChange={(e) => setSignedLink(e.target.value)}
          />
          <StyledInputField
            id='msrp'
            label='msrp'
            variant='outlined'
            value={msrp}
            onChange={(e) => setMsrp(e.target.value)}
          />
          <StyledInputField
            id='signedPrice'
            label='signedPrice'
            variant='outlined'
            value={signedPrice}
            onChange={(e) => setSignedPrice(e.target.value)}
          />
          <CardActions>
            <Button type='submit' variant='contained' color='secondary'>
              Submit Edit
            </Button>
          </CardActions>
        </form>
      </Card>
      </Box> : null}
      <StickyFooter />
    </>
  );
};

export default EditWorksPhysical;
