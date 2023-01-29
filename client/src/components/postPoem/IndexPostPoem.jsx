import React, { useState, useEffect } from 'react';
import CardDisplayPostPoem from './CardDisplayPostPoem';
import CreatePostPoem from './CreatePostPoem';

const IndexPostPoem = (props) => {
  const [postPoem, setPostPoem] = useState([]);
  const fetchPostPoems = async () => {
    const url = `http://localhost:4000/post/`;
    let myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
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
    console.log('postPoem state', postPoem);
  }, [postPoem]);

  return (
    <>
      
      <CreatePostPoem postPoem={postPoem} token={props.token} fetchPostPoems={fetchPostPoems}/>
      

      {postPoem?.postPoems?.map((postPoem) => (
        <CardDisplayPostPoem
          key={postPoem._id}
          title={postPoem.title}
          attribution={postPoem.attribution}
          date={postPoem.date}
          body={postPoem.body}
          publishedLink={postPoem.publishedLink}
          buyLink={postPoem.buyLink}
          _id={postPoem._id}
          token={props.token}
          fetchPostPoems={fetchPostPoems}
        />
      ))}
    </>
  );
};

export default IndexPostPoem;
