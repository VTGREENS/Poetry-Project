import React, { useState, useEffect } from 'react';
import CreatePostPoem from './CreatePostPoem';

const IndexPostPoem = (props) => {
  const [postPoem, setPostPoem] = useState();
  const fetchPostPoems = async () => {
    const url = `http://localhost:4000/post/`;
    const requestOptions = {
      method: 'GET',
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
      <h1>hello from index post poem</h1>
      <CreatePostPoem />
    </>
  );
};

export default IndexPostPoem;
