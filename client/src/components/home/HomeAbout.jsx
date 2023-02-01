import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";

const HomeAbout = (props) => {
  const [aboutContent, setAboutContent] = useState({});
  const fetchHomeAboutContent = async () => {
    const url = "http://localhost:4000/about/";
    let myHeaders = new Headers();
    const requestOptions = { method: "GET", headers: myHeaders };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setAboutContent(data.result[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchHomeAboutContent();
  }, []);

  useEffect(() => {
    console.log("homeAbout content state", aboutContent);
  }, [aboutContent]);

  return (
    <>
      <section id="home-about-section"  style={{marginTop: "1rem"}}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignContent: "start",
            margin: "auto",
            paddingTop: "1rem", 
            backgroundColor: "#FFFFFF"
          }}
        >
          <figure style={{ alignContent: "start", position: "relative", top:"0", padding: "auto", margin: "auto", maxWidth: "30vw" }}>
            <img
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "95%",
              }}
              src={aboutContent?.aboutContentImage}
              alt="Photo of Mary Megan Moore"
            />
          </figure>
          <Typography sx={{ width: "20vw"}} variant="p" component="p">
            {aboutContent?.aboutContentText}
          </Typography>
        </Container>
      </section>
    </>
  );
};

export default HomeAbout;
