import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from "react";

const HomeAbout = (props) => {
  const [aboutContent, setAboutContent] = useState({});
  const fetchHomeAboutContent = async () => {
    const url = 'http://localhost:4000/about/'
    let myHeaders = new Headers();
    const requestOptions = {method: 'GET',
    headers: myHeaders,}

    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      setAboutContent(data.result[0])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchHomeAboutContent();
  }, [])

  useEffect(() => {
    console.log('homeAbout content state', aboutContent);
  }, [aboutContent]);

  return (
    <>
      <Container sx={{display: 'flex', margin: 'auto', padding: 'auto'}}>
        <figure style={{flexGrow:'3', padding: 'auto', margin: 'auto'}}>
          <img style={{width: '95%'}} src={aboutContent?.aboutContentImage} alt="Photo of Mary Megan Moore" />
        </figure>
        <Typography sx={{width:'20vw'}} variant="p" component="p">
          {aboutContent?.aboutContentText}
        </Typography>

      </Container>
    </>
  );
};

export default HomeAbout;
