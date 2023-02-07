import React, { useState, useEffect } from "react";
import CreateGalleryPost from "./CreateGalleryPost";
import DisplayGalleryPostCard from "./DisplayGalleryPostCard";
import { Box } from "@mui/material";
import jwt_decode from "jwt-decode"

const IndexGalleryPost = ({token}) => {
  const [galleryPosts, setGalleryPosts] = useState([]);
  let decodedToken = token ? jwt_decode(token) : null 
  const fetchGalleryPosts = async () => {
    const url = `http://localhost:4000/gallery/`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setGalleryPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchGalleryPosts();
  }, []);

  console.log(galleryPosts);

  return (
    <>
      <section style={{marginTop: "1rem"}}>
        { decodedToken ?
        <CreateGalleryPost
          galleryPosts={galleryPosts}
          token={props.token}
          fetchGalleryPosts={fetchGalleryPosts}
        /> : null}
        <br />
        <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {galleryPosts?.galleryPost?.map((galleryPost) => (
          <DisplayGalleryPostCard
            key={galleryPost._id}
            fetchGalleryPosts={fetchGalleryPosts}
            token={props.token}
            imageURL={galleryPost.imageURL}
            altImageText={galleryPost.altImageText}
            attribution={galleryPost.attribution}
            _id={galleryPost._id}
            description={galleryPost.description}
          />
          
        ))}
        </Box>
      </section>
    </>
  );
};

export default IndexGalleryPost;
