import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Edit Physical Works
const EditWorksPhysical = (props) => {
  const { id } = useParams();
  const [image, setImage] = useState();
  const [imageAltText, setImageAltText] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [msrp, setMsrp] = useState();
  const [links, setLinks] = useState();
  const [signedPrice, setSignedPrice] = useState();
  const [linkSigned, setLinkSigned] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/physical/update/${id}`;

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      title,
      description,
      msrp,
      links,
      signedPrice,
      linkSigned,
    });

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: 'PUT',
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === 'Physical Works Info Updated') {
        // ! Navigate somewhere?
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  //Fetch Physical Works
  // TODO move to WorksPhysicalIndex
  const fetchWorksPhysical = async () => {
    const url = `http://localhost:4000/physical/${id}`;
    let myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setImage(data.worksPhysical.image);
      setImageAltText(data.worksPhysical.imageAltText);
      setTitle(data.worksPhysical.title);
      setDescription(data.worksPhysical.description);
      setMsrp(data.worksPhysical.msrp);
      setLinks(data.worksPhysical.links);
      setSignedPrice(data.worksPhysical.signedPrice);
      setLinkSigned(data.worksPhysical.linkSigned);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchWorksPhysical();
  });

  return (
    <>
    <h3>Hello from Edit Works Physical</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id='image'
          label='image URL'
          variant='outlined'
          value = {image}
          onChange = {(e) => setImage(e.target.value)}
        />
        <TextField
          id='imageAltText'
          label='image Alt Text'
          variant='outlined'
          value = {imageAltText}
          onChange = {(e) => setImageAltText(e.target.value)}
        />
        <TextField
          id='title'
          label='title'
          variant='outlined'
          value = {title}
          onChange = {(e) => setTitle(e.target.value)}
        />
        <TextField
          id='description'
          label='description'
          variant='outlined'
          value = {description}
          onChange = {(e) => setDescription(e.target.value)}
        />
        <TextField
          id='msrp'
          label='msrp'
          variant='outlined'
          value = {msrp}
          onChange = {(e) => setMsrp(e.target.value)}
        />
        <TextField
          id='links'
          label='links'
          variant='outlined'
          value = {links}
          onChange = {(e) => setLinks(e.target.value)}
        />
        <TextField
          id='signedPrice'
          label='signedPrice'
          variant='outlined'
          value = {signedPrice}
          onChange = {(e) => setSignedPrice(e.target.value)}
        />
        <TextField
          id='linkSigned'
          label='linkSigned'
          variant='outlined'
          value = {linkSigned}
          onChange = {(e) => setLinkSigned(e.target.value)}
        />
        <Button type="submit" variant='contained'>Submit Edit</Button>
      </form>
    </>
  );
};

export default EditWorksPhysical;
