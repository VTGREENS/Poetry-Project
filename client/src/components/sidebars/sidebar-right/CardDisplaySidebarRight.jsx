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
import { useTheme } from "@mui/material/styles";
import jwt_decode from "jwt-decode"

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
  const decodedToken = token ? jwt_decode(token) : null 
  const navigate = useNavigate();
  const theme = useTheme();
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
      <Card sx={{marginBottom:"1rem", borderRadius: '1rem', borderColor: "black", borderStyle: "solid", width:'17vw'}}>
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
            color='primary'
            aria-label="More info"
            >
              More Info
            </Button>
            </CardActions>
          </CardContent>
        </Box>
        { decodedToken ? 
        <CardActions>
          <Button sx={{color:'white', backgroundColor: theme.palette.secondary.main,
            }}
            variant='contained'
            type='submit'
            onClick={() => navigate(`/sidebarright/update/${_id}`)}
          >
            Edit
          </Button>
          <Button sx={{color:'black', backgroundColor: theme.palette.primary.main,
            }}
            type='submit'
            variant='contained'
            onClick={() => deleteSidebarRight(_id)}
          >
            Delete
          </Button>
        </CardActions> : null}
      </Card>
    </>
  );
};

export default CardDisplaySidebarRight;
