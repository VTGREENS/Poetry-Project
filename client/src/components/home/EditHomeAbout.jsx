import { Card, TextField, Button, CardActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import StickyFooter from '../footer/StickyFooter';
import jwt_decode from "jwt-decode"

const LongInputField = styled(TextField)(() => ({
  margin: '1rem',
  width: '25vw',
  flexGrow: '3',
  border: 'solid',
  borderColor:'secondary',
  borderWidth: "1px",
  borderRadius: "1rem",
}));

// Edit Home/ About
const EditHomeAbout = ({token}) => {
  const { id } = useParams();
  const [aboutContentImage, setAboutContentImage] = useState('');
  const [aboutContentText, setAboutContentText] = useState('');
  const navigate = useNavigate();
  let decodedToken = token ? jwt_decode(token) : null 

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/about/update/${id}`;

    let bodyObject = JSON.stringify({
      aboutContentImage,
      aboutContentText,
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

      if (data.message === 'Home/About was updated') {
        alert('Home/About Content Updated!')
        navigate('/home');
      } else {
        alert(data.messege);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Fetch Single Home/About post
  const fetchHomeAboutPost = async () => {
    const url = `http://localhost:4000/about/${id}`;
    const myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setAboutContentImage(data.homeAbout.aboutContentImage);
      setAboutContentText(data.homeAbout.aboutContentText);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchHomeAboutPost(id);
  }, []);

  return (
    <>
    {decodedToken ? 
    <Card sx={{  display: 'flex', marginTop: '1rem', padding: '1rem', border: 'solid', borderWidth: "2px", borderRadius: "1rem", }}>
      <form onSubmit={handleSubmit}>
        <LongInputField 
          id='aboutContentImage'
          label='about content image'
          variant='outlined'
          multiline
          value={aboutContentImage}
          onChange={(e) => setAboutContentImage(e.target.value)}
        />
        <LongInputField 
          id='aboutContentText'
          label='about content text'
          variant='outlined'
          multiline
          value={aboutContentText}
          onChange={(e) => setAboutContentText(e.target.value)}
        />
        <CardActions>
          <Button type='submit' variant='contained' color='success'>
            Update Home/About
          </Button>
        </CardActions>
      </form>
    </Card> : null}
    <StickyFooter />
    </>
  );
};

export default EditHomeAbout;
