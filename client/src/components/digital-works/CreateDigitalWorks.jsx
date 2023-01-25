import { useRef } from 'react';
import { FormGroup } from '@mui/material';
import { FormLabel } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { Button, Form } from "reactstrap";

const CreateDigitalWorks = (props) => {
    const titleRef = useRef();
    const linkUrlRef = useRef();
    const imageUrlRef = useRef();
    const formRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        const title = titleRef.current.value;
        const linkUrl = linkUrlRef.current.value;
        const imageUrl = imageUrlRef.current.value;

        let url = `http://localhost:4000/digital/create`;

        let bodyObject = JSON.stringify({
            title,
            linkUrl,
            imageUrl,
          });

          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", props.token);
      
        const requestOptions = {
            headers: myHeaders,
            body: bodyObject,
            method: "POST",
          };

          try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            props.fetchDigitalWorks();
            formRef.current.reset();
            console.log("Successfully added a new Digital Work");
          } catch (error) {
            console.log(error.message);
          }
        }

    return ( 
      <>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <OutlinedInput innerRef={titleRef} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Url Link</FormLabel>
          <OutlinedInput innerRef={linkUrlRef} type="textarea" />
        </FormGroup>
        <FormGroup>
          <FormLabel>Image Url</FormLabel>
          <OutlinedInput innerRef={imageUrlRef} />
        </FormGroup>
          <Button color="primary">Submit Digital Work</Button>
      </Form>
    </>
     );
}
 
export default CreateDigitalWorks;