import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import CreateHomeAbout from './CreateHomeAbout';
import DisplayHomeAbout from './DisplayHomeAbout';
import jwt_decode from 'jwt-decode';

const IndexHomeAbout = ({ token }) => {
  const [aboutContent, setAboutContent] = useState([]);
  let decodedToken = token ? jwt_decode(token) : null;

  const fetchHomeAboutContent = async () => {
    const url = 'http://localhost:4000/about/';
    let myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.message === 'success') {
        setAboutContent(data.homeAbout);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchHomeAboutContent();
  }, []);

  useEffect(() => {
    console.log('homeAbout content state', aboutContent);
  }, [aboutContent]);

  return (
    <>
      <section id='home-about-section' style={{ margin: '1rem' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {aboutContent?.map((aboutItem) => (
            <DisplayHomeAbout
              key={aboutItem._id}
              aboutContentImage={aboutItem.aboutContentImage}
              aboutContentText={aboutItem.aboutContentText}
              _id={aboutItem._id}
              token={token}
              fetchHomeAboutContent={fetchHomeAboutContent}
            />
          ))}

          {decodedToken ? (
            <CreateHomeAbout
              token={token}
              fetchHomeAboutContent={fetchHomeAboutContent}
            />
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default IndexHomeAbout;
