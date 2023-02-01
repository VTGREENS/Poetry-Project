import React, { useState, useEffect } from "react";
import SignupNewsletter from "./SignupNewsletter";
import { Box } from "@mui/material";
import DisplayNewsletterCard from "./DisplayNewsletterCard";

const IndexNewsletter = (props) => {
  const [newsletters, setNewsletters] = useState([]);
  const fetchNewsletters = async () => {
    const url = `http://localhost:4000/newsletter/`;
    let myHeaders = new Headers();
    // myHeaders.append("Authorization", props.token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchNewsletters();
  }, []);

  console.log(newsletters);

  return (
    <>
      <section style={{ marginTop: "1rem" }}>
        <SignupNewsletter
          newsletters={newsletters}
          token={props.token}
          fetchNewsletters={fetchNewsletters}
        />
        <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
          {newsletters?.newsletter?.map((newsletter) => (
            <DisplayNewsletterCard
              key={newsletter._id}
              fetchNewsletters={fetchNewsletters}
              token={props.token}
              email={newsletter.email}
              _id={newsletter._id}
            />
          ))}
        </Box>
        <br />
      </section>
    </>
  );
};

export default IndexNewsletter;
