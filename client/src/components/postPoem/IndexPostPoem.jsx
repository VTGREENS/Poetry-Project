import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import CardDisplayPostPoem from "./CardDisplayPostPoem";
import CreatePostPoem from "./CreatePostPoem";
import jwt_decode from "jwt-decode"

const IndexPostPoem = ({token}) => {
  const [postPoem, setPostPoem] = useState([]);
  let decodedToken = token ? jwt_decode(token) : null
  const fetchPostPoems = async () => {
    const url = `http://localhost:4000/post/`;
    let myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setPostPoem(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchPostPoems();
  }, []);
  useEffect(() => {
    console.log("postPoem state", postPoem);
  }, [postPoem]);

  return (
    <>
      <section style={{marginTop: "1rem"}}>
        <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
          {postPoem?.postPoems?.map((postPoem) => (
            <CardDisplayPostPoem
              key={postPoem._id}
              title={postPoem.title}
              attribution={postPoem.attribution}
              date={postPoem.date}
              body={postPoem.body}
              publishedLink={postPoem.publishedLink}
              buyLink={postPoem.buyLink}
              imageLink={postPoem.imageLink}
              featuredIn={postPoem.featuredIn}
              _id={postPoem._id}
              token={token}
              fetchPostPoems={fetchPostPoems}
            />
          ))}
          { decodedToken ? 
        <CreatePostPoem
          postPoem={postPoem}
          token={token}
          fetchPostPoems={fetchPostPoems}
        />: null }

        </Box>
      </section>
    </>
  );
};

export default IndexPostPoem;
