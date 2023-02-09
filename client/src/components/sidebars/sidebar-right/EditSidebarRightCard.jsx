import { TextField, Button, Card, CardActions, CssBaseline } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import StickyFooter from '../../footer/StickyFooter';
import jwt_decode from "jwt-decode"
import { Container } from '@mui/system';


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

// Edit SidebarRightCard
const EditSidebarRightCard = ({ token }) => {
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [infoLink, setInfoLink] = useState('');
  const navigate = useNavigate();
  const decodedToken = token ? jwt_decode(token) : null 

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/sidebarright/update/${id}`;

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      excerpt,
      infoLink,
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
      if (data.message === 'Sidebar Card Updated') {
        alert('Sidebar Card Updated');
        navigate('/home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  // Fetch Single SidebarRightCard
  const fetchSidebarRightCard = async () => {
    const url = `http://localhost:4000/sidebarright/${id}`;

    let myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setImage(data.sidebarRight.image);
      setImageAltText(data.sidebarRight.imageAltText);
      setExcerpt(data.sidebarRight.excerpt);
      setInfoLink(data.sidebarRight.infoLink);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSidebarRightCard();
  }, []);

  return (
    <>
    <CssBaseline/>
    <Container>
    {decodedToken ? 
    
    <Card sx={{ display: 'flex', margin: '1rem', justifyContent: 'center',border: 'solid', borderRadius: '1rem', borderColor: 'black', borderWidth: "2px", backgroundColor: "#FFFFFF" }}>
      <form onSubmit={handleSubmit}>
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
          id='excerpt'
          label='excerpt'
          variant='outlined'
          multiline
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          />
        <StyledInputField
          id='image'
          label='image URL'
          variant='outlined'
          multiline
          value={infoLink}
          onChange={(e) => setInfoLink(e.target.value)}
          />
          <CardActions>
        <Button type='submit' variant='contained' color='secondary'>
          Submit Edit
        </Button>
          </CardActions>
      </form>
      </Card> : null }
      <StickyFooter  />
          </Container>
    </>
  );
};
export default EditSidebarRightCard;
