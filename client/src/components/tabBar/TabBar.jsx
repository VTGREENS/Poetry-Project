import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
import TabUnstyled from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router-dom";
import IndexWorksPhysical from "../worksPhysical/IndexWorksPhysical";
import IndexHomeAbout from "../home/IndexHomeAbout";
import IndexDigitalWorks from "../digital-works/IndexDigitalWorks";
import IndexPostPoem from "../postPoem/IndexPostPoem";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { flexbox, maxWidth } from "@mui/system";

// import makeStyles from "@mui/material/styles/makeStyles";

const StyledTabsList = styled(TabsListUnstyled)(() => ({
  marginLeft: "1rem",
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "80vw",
  borderStyle: "solid",
  borderColor: "black",
  borderWidth: "2px",
  borderRadius: "1rem",
  backgroundColor: "black",
}));

const StyledTab = styled(TabUnstyled)(() => ({
  textDecoration: "none",
  color: "black",
  backgroundColor: "#ffffff",
  fontSize: "20px",
  height: "2.5em",
  flexGrow: "1",
  marginLeft: ".15em",
  borderStyle: "solid",
  borderColor: "#FFffff",
  fontWeight: "bold",
  fontFamily: "monospace",
  "&:hover": {
    color: "white",
    backgroundColor: "#008854",
    borderColor: "#008854"
  },
}));

const RightTab = styled(StyledTab)(() => ({
  borderStartEndRadius: ".8rem",
  borderEndEndRadius: ".8rem",
}));

const LeftTab = styled(StyledTab)(() => ({
  marginLeft: "0",
  borderEndStartRadius: ".8rem",
  borderStartStartRadius: ".8rem",
}));

function TabBar({ token }) {
  // * Get Url Parameters
  const params = useParams();
  const navigate = useNavigate();
  let { page } = params;
  console.log(params);



  // ? when tab is changed, this runs, navigating to the new tab's page
  const handleChange = (event, newTab) => {
    navigate(`/${newTab}`);
  };
  return (
    <>
      <main style={page !== "physical" ? {maxWidth: "50vw"} : {maxWidth: "66vw"}}>
        <CssBaseline />
        <TabsUnstyled
          selectionFollowsFocus
          defaultValue={"home"}
          value={page}
          onChange={handleChange}
        >
          <StyledTabsList>
            <LeftTab value="home">Home/About</LeftTab>
            <StyledTab value="physical">Physical Works</StyledTab>
            <StyledTab value="digital">Digital Works</StyledTab>
            <RightTab value="post">Posted Poems</RightTab>
          </StyledTabsList>
          <TabPanelUnstyled value="home">
            <IndexHomeAbout token={token} />
          </TabPanelUnstyled>
          <TabPanelUnstyled value="physical">
            <IndexWorksPhysical token={token} />
          </TabPanelUnstyled>
          <TabPanelUnstyled value="digital">
            <IndexDigitalWorks token={token} />
          </TabPanelUnstyled>
          <TabPanelUnstyled value="post">
            <IndexPostPoem token={token} />
          </TabPanelUnstyled>
        </TabsUnstyled>
      </main>
    </>
  );
}

export default TabBar;
