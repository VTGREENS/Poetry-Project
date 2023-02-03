import React, { useRef } from "react";
import { TextField, Button, Card, CardActions } from "@mui/material";
import styled from '@emotion/styled';

const StyledInputField = styled(TextField)(() => ({
  margin: '1rem',
  flexGrow: '1',
  border: 'solid',
  borderColor:'secondary',
  borderWidth: "2px",
  borderRadius: "1rem",
}));

const LongInputField = styled(TextField)(() => ({
  margin: '1rem',
  width: '25vw',
  flexGrow: '3',
  border: 'solid',
  borderWidth: "2px",
  borderRadius: "1rem",
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
      console.log(data);

      if (data.message === "Physical Works Created") {
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <Card sx={{ display: "flex", marginBottom: "1rem", border: 'solid', borderWidth: "2px", borderRadius: "1rem", }}>
        <form onSubmit={handleSubmit}>
          <StyledInputField
            id="image"
            label="image URL"
            variant="outlined"
            inputRef={imageRef}
          />
          <StyledInputField
            id="imageAltText"
            label="image Alt Text"
            variant="outlined"
            inputRef={imageAltTextRef}
          />
          <StyledInputField
            id="title"
            label="title"
            variant="outlined"
            inputRef={titleRef}
          />
          <StyledInputField
            id="attribution"
            label="attribution"
            variant="outlined"
            inputRef={attributionRef}
          />
          <LongInputField
            id="description"
            label="description"
            variant="outlined"
            multiline
            inputRef={descriptionRef}
          />
          <StyledInputField
            id="amazonLink"
            label="amazonLink"
            variant="outlined"
            inputRef={amazonLinkRef}
          />
          <StyledInputField
            id="unsolicitedPressLink"
            label="unsolicitedPressLink"
            variant="outlined"
            inputRef={unsolicitedPressLinkRef}
          />
          <StyledInputField
            id="barnesAndNobleLink"
            label="barnesAndNobleLink"
            variant="outlined"
            inputRef={barnesAndNobleLinkRef}
          />
          <StyledInputField
            id="msrp"
            label="msrp"
            variant="outlined"
            inputRef={msrpRef}
          />
          <StyledInputField
            id="signedPrice"
            label="signedPrice"
            variant="outlined"
            inputRef={signedPriceRef}
          />
          <StyledInputField
            id="signedLink"
            label="signedLink"
            variant="outlined"
            inputRef={signedLinkRef}
          />
          <CardActions>
          <Button type="submit" variant="contained" color="primary">
            Submit Physical Works
          </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
};

export default CreateWorksPhysical;
