import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';

// Physical Works Table hosts delete Physical Works function and rendors the data from the create Physical Works function
const CardDisplayWorksPhysical = (props) => {
  async function deleteWorksPhysical(id) {
    const url = `http://localhost:4000/physical/delete/${id}`;
    let myHeaders = new Headers();

    let requestOptions = {
      headers: myHeaders,
      method: 'DELETE',
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      console.log(data);
      props.fetchWorksPhysical();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {props.worksPhysical.map((workPhysical) => (
        <Card key={workPhysical._id} sx={{ display: 'flex' }}>
          <CardMedia
            component='img'
            image={workPhysical.image}
            alt={workPhysical.imageAltText}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <CardContent className={classes.content}>
              <Typography variant='h3'>{workPhysical.title}</Typography>
              <Typography gutterBottom variant='subtitle'>
                {attribution}
              </Typography>
              <Typography gutterBottom variant='body1'>
                {workPhysical.description}
              </Typography>
              <Typography id={workPhysical.id + 'signedPrice'}>
                Signed Price: ${workPhysical.signedPrice}
              </Typography>
              <Typography id={workPhysical.id + 'msrp'} gutterBottom variant='body1'>
                MSRP: ${workPhysical.msrp}
              </Typography>
              <CardActions>
                <Button
                  variant='contained'
                  href={workPhysical.signedLink}
                  aria-label='Purchase signed copy from Megan Mary Moore'
                  aria-describedby={workPhysical.id + 'signedPrice'}
                  size='small'
                >
                  Signed Copy
                </Button>
                <Button
                  variant='contained'
                  href={workPhysical.linkUP}
                  aria-label='Purchase from Unsolicited press'
                  aria-describedby={workPhysical.id + 'msrp'}
                  size='small'
                >
                  Unsolicited Press
                </Button>
                <Button
                  variant='contained'
                  href={workPhysical.linkAmazon}
                  aria-label='Purchase on Amazon dot com'
                  aria-describedby={workPhysical.id + 'msrp'}
                  size='small'
                >
                  Amazon
                </Button>
                <Button
                  variant='contained'
                  href={workPhysical.linkBaN}
                  aria-label='Purchase on Barnes and Noble dot com'
                  aria-describedby={workPhysical.id + 'msrp'}
                  size='small'
                >
                  Barnes & Noble
                </Button>
              </CardActions>
            </CardContent>
          </Box>
        </Card>
      ))}
      ;
    </>
  );
};
export default CardDisplayWorksPhysical;
