import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
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
      <h4>Hello from card display works physical</h4>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 240 }}
          image='https://res.cloudinary.com/dgn8ptcxp/image/upload/v1674141868/cute_cat.jpg'
          title='To Daughter A Devil'
        />
        <CardContent>
          <Typography align='center' gutterBottom variant='h5' component='div'>
            To Daughter A Devil
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            To Daughter a Devil explores women in horror and the horror in being
            woman. Each poem puts a magnifying glass to the female body and uses
            the most beautiful and the most terrifying parts to paint a picture
            of growing up and learning to live with — and possibly love — the
            evil that lives inside of us.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Uncsolicited Press</Button>
          <Button size='small'>Amazon</Button>
          <Button size='small'>Direct</Button>
        </CardActions>
      </Card>
      
    </>
  );
};
export default CardDisplayWorksPhysical;
