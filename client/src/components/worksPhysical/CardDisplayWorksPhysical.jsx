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

// Physical Works Table hosts delete Physical Works function and rendors the data from the create Physical Works function
const CardDisplayWorksPhysical = ({image, imageAltText, title, attribution, description, msrp, amazonLink, unsolicitedPressLink, barnesAndNobleLink, signedPrice, signedLink, _id, token, fetchWorksPhysical}) => {
  const navigate = useNavigate();
  async function deleteWorksPhysical(_id) {
    const url = `http://localhost:4000/physical/delete/${_id}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    let requestOptions = {
      headers: myHeaders,
      method: 'DELETE',
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      fetchWorksPhysical();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    
     <Card sx={{ display: "flex" }}>
  <CardMedia sx={{width:"30vw"}} component="img" image={image} alt={imageAltText} />
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    }}
  >
    <CardContent className="card-content">
      <Typography variant="h3">{title}</Typography>
      <Typography gutterBottom variant="h5">
        {attribution}
      </Typography>
      <Typography gutterBottom variant="body1">
        {description}
      </Typography>
      <Typography _id={_id + "signedPrice"}>
        Signed Price: ${signedPrice}
      </Typography>
      <Typography _id={_id + "msrp"} gutterBottom variant="body1">
        MSRP: ${msrp}
      </Typography>
      <CardActions>
        <Button
          variant="contained"
          href={signedLink}
          aria-label="Purchase signed copy from Megan Mary Moore"
          aria-describedby={_id + "signedPrice"}
          size="small"
        >
          Signed Copy
        </Button>
        {unsolicitedPressLink ? <Button
          variant="contained"
          href={unsolicitedPressLink}
          aria-label="Purchase from Unsolicited press"
          aria-describedby={_id + "msrp"}
          size="small"
        >
          Unsolicited Press
        </Button> :null}
        {amazonLink ? <Button
          variant="contained"
          href={amazonLink}
          aria-label="Purchase on Amazon dot com"
          aria-describedby={_id + "msrp"}
          size="small"
        >
          Amazon
        </Button> : null}
        {barnesAndNobleLink ? <Button
          variant="contained"
          href={barnesAndNobleLink}
          aria-label="Purchase on Barnes and Noble dot com"
          aria-describedby={_id + "msrp"}
          size="small"
        >
          Barnes & Noble
        </Button> :null}
      </CardActions>
    </CardContent>
  </Box>
</Card>
<>
<Button type='submit' variant= "contained" color="success" onClick={() => navigate(`/physical/update/${_id}`)}>Update</Button>
<Button type='submit' variant= "contained" color="error" onClick={() => deleteWorksPhysical(_id)}>Delete</Button>
</>
    </>
  );
};
export default CardDisplayWorksPhysical;
