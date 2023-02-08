import {
  Container,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"

//DisplayHomeAbout houses delete function, displays about content onto IndexHomeAbout.

const DisplayHomeAbout = ({
  aboutContentImage,
  aboutContentText,
  token,
  _id,
  fetchHomeAboutContent,
}) => {
  const navigate = useNavigate();
  let decodedToken = token ? jwt_decode(token) : null 
  async function deleteHomeAbout(_id) {
    const url = `http://localhost:4000/about/delete/${_id}`;
    let myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    let requestOptions = {
      headers: myHeaders,
      method: 'DELETE',
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      fetchHomeAboutContent();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignContent: 'start',
          margin: 'auto',
          marginTop: '1rem',
          paddingTop: '1rem',
          backgroundColor: '#FFFFFF',
          border:'solid',
          borderRadius:"1rem",
          borderWidth:"2px",
          width: '48vw'
        }}
      >
        <Container sx={{display:'flex', flexDirection: "column"}}>
          <figure
            style={{
              alignContent: 'start',
              position: 'relative',
              top: '0',
              padding: 'auto',
              margin: 'auto',
              maxWidth: '30vw',
            }}
          >
            <img
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '95%',
              }}
              src={aboutContentImage}
              alt='Photo of Mary Megan Moore'
            />
          </figure>
          {decodedToken ? 
          <ButtonGroup sx={{padding:'3px', margin:'1rem', gap:'10px'}}>
            <Button
              type='submit'
              color='secondary'
              variant='contained'
              onClick={() => navigate(`/about/update/${_id}`)}
            >
              Edit
            </Button>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              onClick={() => deleteHomeAbout(_id)}
            >
              Delete
            </Button>
          </ButtonGroup> : null}
        </Container>
        <Typography sx={{ width: '20vw' }} variant='p' component='p'>
          {aboutContentText}
        </Typography>
      </Container>
    </>
  );
};

export default DisplayHomeAbout;
