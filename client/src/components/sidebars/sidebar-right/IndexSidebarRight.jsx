import React, { useState, useEffect } from 'react';
import CreateSidebarRightCard from './CreateSidebarRightCard';
import CardDisplaySidebarRight from './CardDisplaySidebarRight';
import { Container } from '@mui/material'
import styled from "@emotion/styled";
import jwt_decode from "jwt-decode"

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  background-color: primary;
  position: sticky;
`;

const IndexSidebarRight = ({token}) => {
  const [sidebarRight, setSidebarRight] = useState([]);
  const decodedToken = token ? jwt_decode(token) : null
  const fetchSidebarRightCards = async () => {
    
    const url = `http://localhost:4000/sidebarright/`;
    let myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.message === 'Retrieved Sidebar Content')
        setSidebarRight(data.sidebarRight);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSidebarRightCards();
  }, []);
  useEffect(() => {
    console.log('sidebarRight state', sidebarRight);
  }, [sidebarRight]);

  return (
    <>
      <section>
      <StyledSidebar>
        <Container>
          {decodedToken ? 
          <CreateSidebarRightCard token={token} fetchSidebarRightCards={fetchSidebarRightCards} />
          : null }
        </Container>
          
        <Container sx={{display:'flex', flexDirection:'column-reverse'}}>
        {sidebarRight?.map((sidebarItem) => (
          <CardDisplaySidebarRight
            key={sidebarItem._id}
            image={sidebarItem.image}
            imageAltText={sidebarItem.imageAltText}
            excerpt={sidebarItem.excerpt}
            infoLink={sidebarItem.infoLink}
            _id={sidebarItem._id}
            token={token}
            fetchSidebarRight={fetchSidebarRightCards}
          />
        ))}
        </Container>
        </StyledSidebar>
      </section>
    </>
  );
};

export default IndexSidebarRight;
