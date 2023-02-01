import {
  TextField,
  Button,
  CardContent,
  Card,
  CardActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Edit Post Poem
const EditPostPoem = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [attribution, setAttribution] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');
  const [publishedLink, setPublishedLink] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [featuredIn, setFeaturedIn] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/post/update/${id}`;

    let bodyObject = JSON.stringify({
      title,
      attribution,
      date,
      body,
      publishedLink,
      buyLink,
      imageLink,
      featuredIn,
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
      if (data.message === 'Post/Poem updated') {
        navigate('/post');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Fetch Single Poem Post

  const fetchPoemPost = async () => {
    const url = `http://localhost:4000/post/${id}`;
    let myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setTitle(data.postPoem.title);
      setAttribution(data.postPoem.attribution);
      setDate(data.postPoem.date);
      setBody(data.postPoem.body);
      setPublishedLink(data.postPoem.publishedLink);
      setBuyLink(data.postPoem.buyLink);
      setImageLink(data.postPoem.imageLink);
      setFeaturedIn(data.postPoem.featuredIn);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPoemPost();
  }, []);
  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              id='date'
              label='date'
              variant='outlined'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              id='publishedLink'
              label='published Link'
              variant='outlined'
              value={publishedLink}
              onChange={(e) => setPublishedLink(e.target.value)}
            />
            <br />
            <TextField
              id='buyLink'
              label='buy Link'
              variant='outlined'
              value={buyLink}
              onChange={(e) => setBuyLink(e.target.value)}
            />
            <TextField
              id='imageLink'
              label='image Link'
              variant='outlined'
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <TextField
              id='featuredIn'
              label='Featured In'
              variant='outlined'
              value={featuredIn}
              onChange={(e) => setFeaturedIn(e.target.value)}
            />
            <TextField
              id='body'
              label='body'
              variant='outlined'
              multiline
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <CardActions>
              <Button type='submit' variant='contained' color='success'>
                Edit Poem Post
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
export default EditPostPoem;
