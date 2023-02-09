import {
  TextField,
  Button,
  CardContent,
  Card,
  CardActions,
  CssBaseline,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import jwt_decode from "jwt-decode"
import StickyFooter from '../footer/StickyFooter';

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

// Edit Post Poem
const EditPostPoem = ({token}) => {
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
  let decodedToken = token ? jwt_decode(token) : null

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
      if (data.message === 'Post/Poem updated') {
        alert('Poem Post Has Been Updated!')
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
    <CssBaseline/>
    {decodedToken ? 
      <Card sx={{ display: 'flex', display: 'flex', marginTop: '1rem', padding: '1rem', border: 'solid', borderWidth: "2px", borderRadius: "1rem",  }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
            <StyledInputField
              id='date'
              label='date'
              variant='outlined'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <StyledInputField
              id='publishedLink'
              label='published Link'
              variant='outlined'
              value={publishedLink}
              onChange={(e) => setPublishedLink(e.target.value)}
            />
            <br />
            <StyledInputField
              id='buyLink'
              label='buy Link'
              variant='outlined'
              value={buyLink}
              onChange={(e) => setBuyLink(e.target.value)}
            />
            <StyledInputField
              id='imageLink'
              label='image Link'
              variant='outlined'
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <StyledInputField
              id='featuredIn'
              label='Featured In'
              variant='outlined'
              value={featuredIn}
              onChange={(e) => setFeaturedIn(e.target.value)}
            />
            <LongInputField
              id='body'
              label='body'
              variant='outlined'
              multiline
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <CardActions>
              <Button type='submit' variant='contained' color='secondary'>
                Edit Poem Post
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card> : null }
      <StickyFooter/>
    </>
  );
};
export default EditPostPoem;
