import React, { useRef } from "react";
import { TextField, Button, Card, CardActions } from "@mui/material";
import styled from '@emotion/styled';

const StyledInputField = styled(TextField)(() => ({
  margin: "1rem",
  flexGrow: "1",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderStyle: "solid",
      borderColor: 'black',
      borderWidth: "2px",
      borderRadius: "1rem"
    },
  },
}));

const LongInputField = styled(TextField)(() => ({
  width: '25vw',
  margin: "1rem",
  flexGrow: '3',
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderStyle: "solid",
      borderColor: 'black',
      borderWidth: "2px",
      borderRadius: "1rem"
    },
  },
}));

const CreateWorksPhysical = (props) => {
  const imageRef = useRef();
  const imageAltTextRef = useRef();
  const titleRef = useRef();
  const attributionRef = useRef();
  const descriptionRef = useRef();
  const msrpRef = useRef();
  const amazonLinkRef = useRef();
  const unsolicitedPressLinkRef = useRef();
  const barnesAndNobleLinkRef = useRef();
  const signedPriceRef = useRef();
  const signedLinkRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const image = imageRef?.current?.value;
    const imageAltText = imageAltTextRef?.current?.value;
    const title = titleRef?.current?.value;
    const attribution = attributionRef?.current?.value;
    const description = descriptionRef?.current?.value;
    const msrp = msrpRef?.current?.value;
    const amazonLink = amazonLinkRef?.current?.value;
    const unsolicitedPressLink = unsolicitedPressLinkRef?.current?.value;
    const barnesAndNobleLink = barnesAndNobleLinkRef?.current?.value;
    const signedPrice = signedPriceRef?.current?.value;
    const signedLink = signedLinkRef?.current?.value;

    let url = "http://localhost:4000/physical/create";

    let bodyObject = JSON.stringify({
      image,
      imageAltText,
      title,
      attribution,
      description,
      msrp,
      amazonLink,
      unsolicitedPressLink,
      barnesAndNobleLink,
      signedPrice,
      signedLink,
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
      props.fetchWorksPhysical();
      document.getElementById('physical-form').reset();
      console.log(data);

      if (data.message === "Physical Works Created") {
        alert("Physical Work Created")
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <Card sx={{ display: "flex", marginBottom: "1rem", border: 'solid', borderWidth: "2px", borderRadius: "1rem"}}>
        <form id='physical-form' onSubmit={handleSubmit}>
          <StyledInputField
            id="image"
            label="Image URL"
            variant="outlined"
            color="success"
            inputRef={imageRef}
          />
          <StyledInputField
            id="imageAltText"
            label="Image Alt Text"
            variant="outlined"
            color="success"
            inputRef={imageAltTextRef}
          />
          <StyledInputField
            id="title"
            label="Title"
            variant="outlined"
            color="success"
            inputRef={titleRef}
          />
          <StyledInputField
            id="attribution"
            label="Attribution"
            variant="outlined"
            color="success"
            inputRef={attributionRef}
          />
          <LongInputField
            id="description"
            label="Description"
            variant="outlined"
            color="success"
            multiline
            inputRef={descriptionRef}
          />
          <StyledInputField
            id="amazonLink"
            label="Amazon Link"
            variant="outlined"
            inputRef={amazonLinkRef}
          />
          <StyledInputField
            id="unsolicitedPressLink"
            label="Unsolicited Press Link"
            variant="outlined"
            inputRef={unsolicitedPressLinkRef}
          />
          <StyledInputField
            id="barnesAndNobleLink"
            label="Barnes and Noble Link"
            variant="outlined"
            color="success"
            inputRef={barnesAndNobleLinkRef}
          />
          <StyledInputField
            id="msrp"
            label="MSRP"
            variant="outlined"
            color="success"
            inputRef={msrpRef}
          />
          <StyledInputField
            id="signedPrice"
            label="Signed Price"
            variant="outlined"
            color="success"
            inputRef={signedPriceRef}
          />
          <StyledInputField
            id="signedLink"
            label="Signed Link"
            variant="outlined"
            color="success"
            inputRef={signedLinkRef}
          />
          <CardActions sx={{display:'flex', justifyContent:'center'}}>
          <Button type="submit" variant="contained" color="primary" label='Submit Physical Works'>
            Submit Physical Works
          </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
};

export default CreateWorksPhysical;
