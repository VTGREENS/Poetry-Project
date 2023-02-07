import styled from "@emotion/styled";
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import IndexNewsletter from "../newsletter/IndexNewsletter"


const Banner = ({ token }) => {
  const navigate = useNavigate()
  const decodedToken = token ? jwt_decode(token) : null;

  const StyledHeader = styled.header`
    height: 6rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    width: 66vw;
    align-items: center;
  `;

  const handleClick = (e) => {
    navigate("/admin")
  }

  return (
    <>
      <StyledHeader>
        <h1>
          Megan Mary Moore 
        </h1>
       

        <Button variant="contained" onClick={handleClick} color="secondary" sx={{justifySelf: "flex-end"}}>ADMIN</Button>
      
      </StyledHeader>
    </>
  );
};

export default Banner;
