import React, { useState, useEffect } from "react";
import CreateDigitalWorks from "./CreateDigitalWorks";
import DisplayDigitalWorksCard from "./DisplayDigitalWorks";
import { Box } from "@mui/material";
import jwt_decode from "jwt-decode"

const IndexDigitalWorks = ({token}) => {
  const [digitalWorks, setDigitalWorks] = useState([]);
  let decodedToken = token ? jwt_decode(token) : null 
  const fetchDigitalWorks = async () => {
    const url = `http://localhost:4000/digital/`;
    let myHeaders = new Headers();
    // myHeaders.append("Authorization", props.token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setDigitalWorks(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDigitalWorks();
  }, []);

  console.log(digitalWorks);

  return (
    <>
      <section style={{marginTop: "1rem"}}>
       
        <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {digitalWorks?.worksDigital?.map((digitalWork) => (
          <DisplayDigitalWorksCard
            key={digitalWork._id}
            fetchDigitalWorks={fetchDigitalWorks}
            token={token}
            title={digitalWork.title}
            linkUrl={digitalWork.linkUrl}
            imageUrl={digitalWork.imageUrl}
            _id={digitalWork._id}
            description={digitalWork.description}
          />
          
        ))}
         {decodedToken ?
        <CreateDigitalWorks
          digitalWorks={digitalWorks}
          token={token}
          fetchDigitalWorks={fetchDigitalWorks}
        /> : null}
        </Box>
      </section>
    </>
  );
};

export default IndexDigitalWorks;
