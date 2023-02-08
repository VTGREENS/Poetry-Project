import styled from "@emotion/styled";
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import IndexNewsletter from "../newsletter/IndexNewsletter";

const Banner = ({ page, token, updateToken }) => {
  const navigate = useNavigate();
  const decodedToken = token ? jwt_decode(token) : null;

  const StyledHeader = styled.header`
    height: 6rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    width: 80%;
    align-items: center;
  `;

  const handleAdminClick = (e) => {
    navigate(`/login/${page}`);
  };
  
  const handleLogOutClick = (e) => {
    updateToken('')
    navigate(`/${page}`)
  }

  return (
    <>
      <StyledHeader>
        <h1>Megan Mary Moore</h1>
        {!decodedToken ? (
          <Button
            variant="contained"
            onClick={handleAdminClick}
            color="secondary"
            sx={{ justifySelf: "flex-end" }}
          >
            ADMIN
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleLogOutClick}
            color="secondary"
            sx={{ justifySelf: "flex-end" }}
          >
            LOG OUT
          </Button>
        )}
      </StyledHeader>
    </>
  );
};

export default Banner;
