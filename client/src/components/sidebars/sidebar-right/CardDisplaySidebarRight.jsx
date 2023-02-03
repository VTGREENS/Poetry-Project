import { useNavigate } from 'react-router-dom';
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';

// DisplaySidebarRight houses delete function, displays sidebar content onto IndexSidebarRight.

const CardDisplaySidebarRight = ({
  image,
  imageAltText,
  excerpt,
  infoLink,
  token,
  _id,
  fetchSidebarRight,
}) => {
  const navigate = useNavigate();
  async function deleteSidebarRight(_id) {
    const url = `http://localhost:4000/sidebarright/delete/${_id}`;
    let myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    let requestOptions = {
      headers: myHeaders,
      method: 'DELETE',
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      fetchSidebarRight();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card sx={{marginBottom:"1rem", borderRadius: '1rem', borderColor: "black", borderStyle: "solid", width:'15vw'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{ margin: ".6rem 0 .6rem .6rem", width: "80%" }}
            component='img'
            image={image}
            alt={imageAltText}
          />
          <CardContent>
            <Typography variant='p' component='p'>
              {excerpt}
            </Typography>
            <CardActions>
            <Button 
            href={infoLink} 
            variant='contained' 
            color='primary'>
              More Info
            </Button>
            </CardActions>
          </CardContent>
        </Box>
        <CardActions>
          <Button
            type='submit'
            color='success'
            onClick={() => navigate(`/sidebarright/update/${_id}`)}
          >
            Edit
          </Button>
          <Button
            type='submit'
            color='error'
            onClick={() => deleteSidebarRight(_id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CardDisplaySidebarRight;
