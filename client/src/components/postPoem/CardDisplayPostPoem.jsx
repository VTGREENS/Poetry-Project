import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

// CardDisplayPostPoem houses delete function, displays posted poems onto IndexPostPoem.
const CardDisplayPostPoem = ({
  title,
  attribution,
  date,
  body,
  publishedLink,
  buyLink,
  imageLink,
  featuredIn,
  token,
  _id,
  fetchPostPoems,
}) => {
  const navigate = useNavigate();
  async function deletePostPoem(_id) {
    const url = `http://localhost:4000/post/delete/${_id}`;
    let myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    let requestOptions = {
      headers: myHeaders,
      method: 'DELETE',
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      fetchPostPoems();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card sx={{ display: 'flex', padding: 2 }}>
        {imageLink ? (
          <CardMedia sx={{ width: '30vw' }} component='img' image={imageLink} />
        ) : null}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <CardContent className='card-content'>
            <Typography variant='h4'>{title}</Typography>
            {attribution ? (
              <Typography gutterBottom variant='h5'>
                {attribution} {date}
              </Typography>
            ) : null}
            {body ? (
              <Typography sx={{ whiteSpace: 'pre-wrap' }}gutterBottom variant='body1' component='body'>
                {body}
              </Typography>
            ) : null}
            {featuredIn ? (
              <Typography gutterBottom variant='h6'>
                Featured In: {featuredIn}
              </Typography>
            ) : null}

            <CardActions>
              {publishedLink ? (
                <Button
                  variant='contained'
                  href={publishedLink}
                  aria-label='Link to external publication site'
                  aria-describedby={_id + 'publishedLink'}
                  size='small'
                >
                  Publication Link
                </Button>
              ) : null}
              {buyLink ? (
                <Button
                  variant='contained'
                  href={buyLink}
                  aria-label='Link to buy collection that this poem is published in'
                  aria-describedby={_id + 'buyLink'}
                  size='small'
                >
                  Buy Collection
                </Button>
              ) : null}
              {/* <div css={css`display: block;`}> </div> */}
            </CardActions>
            <CardActions>
              <Button
                type='submit'
                variant='contained'
                color='success'
                onClick={() => navigate(`/post/update/${_id}`)}
              >
                Update
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='error'
                onClick={() => deletePostPoem(_id)}
              >
                Delete
              </Button>
            </CardActions>
          </CardContent>
        </Box>
      </Card>
      <></>
    </>
  );
};
export default CardDisplayPostPoem;
