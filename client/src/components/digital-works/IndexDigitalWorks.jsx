import React, { useState, useEffect } from "react";
import CreateDigitalWorks from "./CreateDigitalWorks";
import DisplayDigitalWorksCard from "./DisplayDigitalWorks";

const IndexDigitalWorks = (props) => {
  const [digitalWorks, setDigitalWorks] = useState([]);
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
      <CreateDigitalWorks
        digitalWorks={digitalWorks}
        token={props.token}
        fetchDigitalWorks={fetchDigitalWorks}
      />
      <br />
      {digitalWorks?.worksDigital?.map((digitalWork) => (
        <DisplayDigitalWorksCard
          key={digitalWork._id}
          fetchDigitalWorks={fetchDigitalWorks}
          token={props.token}
          title={digitalWork.title}
          linkUrl={digitalWork.linkUrl}
          imageUrl={digitalWork.imageUrl}
          _id={digitalWork._id}
          description={digitalWork.description}
        />
      ))}
    </>
  );
};

export default IndexDigitalWorks;
