import { TextField, Button, Card, CardActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Edit SidebarRightCard
const EditSidebarRightCard = ({ token }) => {
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [infoLink, setInfoLink] = useState('');
  const navigate = useNavigate();

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
    <Card sx={{ display: 'flex', margin: '1rem', justifyContent: 'center', borderRadius: '1rem', borderColor: 'black' }}>
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
          id='excerpt'
          label='excerpt'
          variant='outlined'
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          />
        <TextField
          id='image'
          label='image URL'
          variant='outlined'
          value={infoLink}
          onChange={(e) => setInfoLink(e.target.value)}
          />
          <CardActions>
        <Button type='submit' variant='contained' color='secondary'>
          Submit Edit
        </Button>
          </CardActions>
      </form>
          </Card>
    </>
  );
};
export default EditSidebarRightCard;
