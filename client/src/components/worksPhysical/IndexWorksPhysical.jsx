import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import CardDisplayWorksPhysical from "./CardDisplayWorksPhysical";
import CreateWorksPhysical from "./CreateWorksPhysical";
import jwt_decode from "jwt-decode";

const IndexWorksPhysical = ({ token }) => {
  const [worksPhysical, setWorksPhysical] = useState([]);
  let decodedToken = token ? jwt_decode(token) : null;
  const fetchWorksPhysical = async () => {
    const url = `http://localhost:4000/physical/`;
    let myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const works = await data.worksPhysical;
      setWorksPhysical(await works);
      console.log(worksPhysical);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchWorksPhysical();
  }, []);

  useEffect(() => {
    console.log("worksPhysical state", worksPhysical);
  }, [worksPhysical]);

  return (
    <>
      <section style={{ marginTop: "1rem" }}>
        <Container sx={{ display: "flex", flexDirection: "column-reverse" }}>
          {worksPhysical?.map((workPhysical) => (
            <CardDisplayWorksPhysical
              key={workPhysical._id}
              image={workPhysical.image}
              imageAltText={workPhysical.imageAltText}
              title={workPhysical.title}
              attribution={workPhysical.attribution}
              description={workPhysical.description}
              msrp={workPhysical.msrp}
              amazonLink={workPhysical.amazonLink}
              unsolicitedPressLink={workPhysical.unsolicitedPressLink}
              barnesAndNobleLink={workPhysical.barnesAndNobleLink}
              signedPrice={workPhysical.signedPrice}
              signedLink={workPhysical.signedLink}
              _id={workPhysical._id}
              token={token}
              fetchWorksPhysical={fetchWorksPhysical}
            />
          ))}
          {decodedToken ? (
            <CreateWorksPhysical
              worksPhysical={worksPhysical}
              token={token}
              fetchWorksPhysical={fetchWorksPhysical}
            />
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default IndexWorksPhysical;
