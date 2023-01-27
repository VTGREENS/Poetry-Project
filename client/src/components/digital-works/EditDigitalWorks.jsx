import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, FormGroup } from '@mui/material';
import { FormLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { TextField, Button } from '@mui/material';


const EditDigitalWorks = (props) => {
  const { id } = useParams();
//   const [digitalWork, setDigitalWork] = useState("");
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
 
  async function handleSubmit(e) {
    e.preventDefault();
    let url = `http://localhost:4000/digital/update/${id}`;

    let bodyObj = JSON.stringify({
      title,
      linkUrl,
      imageUrl,
    });

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObj,
      method: "PUT",
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
        if (data.message === 'Digital Work updated'){
            // navigate('/digital/')
        } else {
            alert(data.message)
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchDigitalWork = async () => {
        const url = `http://localhost:4000/digital/${id}`;
        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
    
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data)
            setTitle(data.workDigital.title);
            setLinkUrl(data.workDigital.linkUrl);
            setImageUrl(data.workDigital.imageUrl);
          } catch (err) {
            console.log(err.message);
          }
        };

        useEffect(() => {
              fetchDigitalWork();
          }, []);
      
          return (
            <>
<Card sx={{ maxWidth: 250, padding: 5, border: "solid" }}>
        <CardContent>
        <form onSubmit={handleSubmit} >
        <TextField
          id='title'
          label='Title'
          variant='outlined'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id='linkUrl'
          label='Link Url'
          variant='outlined'
          value={linkUrl}
          onChange={(event) => setLinkUrl(event.target.value)}
        />
        <TextField
          id='imageUrl'
          label='Image Url'
          variant='outlined'
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
        <Button color='success' type="submit" variant='contained' color="success">Submit Edit</Button>
      </form>
      </CardContent>
      </Card>
      <br />
            </>
          );
        };

          export default EditDigitalWorks;