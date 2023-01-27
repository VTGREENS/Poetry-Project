import React, { useRef } from 'react';

const CreatePostPoem = (props) => {
  const titleRef = useRef();
  const authorRef = useRef();
  const dateRef = useRef();
  const bodyRef = useRef();
  const linkPublishedRef = useRef();
  const linkBuyRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef?.current?.value;
    const author = authorRef?.current?.value;
    const date = dateRef?.current?.value;
    const body = bodyRef?.current?.value;
    const linkPublished = linkPublishedRef?.current?.value;
    const linkBuy = linkBuyRef?.current?.value;

    let url = 'http://localhost:4000/post/create';

    let bodyObject = JSON.stringify({
      title,
      author,
      date,
      body,
      linkPublished,
      linkBuy,
    });

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'POST',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);

      if (data.message === 'Your post has been added') {
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return(
    <>
    <h2>Hello from Create Post Poem</h2>
    </>

  )
};

export default CreatePostPoem;
