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
  marginRight: "1.5rem",
  display: "flex",
  justifyContent: "stretch",
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
  borderStartStartRadius: ".8rem"
}));

const StyledTabPanel = styled(TabPanelUnstyled)(() => ({
  marginRight: "3rem",
  width: "100%"
}))

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
  let style = page === "physical" ? {maxWidth: "80%"} : {width: "90vw"}
  return (
    <>
      <CssBaseline />
      <main>
        <TabsUnstyled
          selectionFollowsFocus
          defaultValue={"home"}
          value={page}
          onChange={handleChange}
          sx={{display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center"}}
        >
          <StyledTabsList sx={style}>
            <LeftTab value="home">Home/About</LeftTab>
            <StyledTab value="physical">Physical Works</StyledTab>
            <StyledTab value="digital">Digital Works</StyledTab>
            <RightTab value="post">Posted Poems</RightTab>
          </StyledTabsList>
          <StyledTabPanel value="home">
            <IndexHomeAbout token={token} />
          </StyledTabPanel>
          <StyledTabPanel value="physical">
            <IndexWorksPhysical token={token} />
          </StyledTabPanel>
          <StyledTabPanel value="digital">
            <IndexDigitalWorks token={token} />
          </StyledTabPanel>
          <StyledTabPanel value="post">
            <IndexPostPoem token={token} />
          </StyledTabPanel>
        </TabsUnstyled>
      </main>
    </>
  );
}

export default TabBar;
