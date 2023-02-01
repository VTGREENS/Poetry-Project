import { Card, TextField, Button, CardActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Edit Home/ About
const EditHomeAbout = (props) => {
  const { id } = useParams();
  const [aboutContentImage, setAboutContentImage] = useState('');
  const [aboutContentText, setAboutContentText] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/about/update/${id}`;

    let bodyObject = JSON.stringify({
      aboutContentImage,
      aboutContentText,
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

      if (data.message === 'Home/About was updated') {
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
    <Card sx={{ display: 'flex' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id='aboutContentImage'
          label='about content image'
          variant='outlined'
          value={aboutContentImage}
          onChange={(e) => setAboutContentImage(e.target.value)}
        />
        <TextField
          id='aboutContentText'
          label='about content text'
          variant='outlined'
          value={aboutContentText}
          onChange={(e) => setAboutContentText(e.target.value)}
        />
        <CardActions>
          <Button type='submit' variant='contained' color='success'>
            Update Home/About
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default EditHomeAbout;
