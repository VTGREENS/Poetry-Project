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
import HomeAbout from "../home/HomeAbout";
import IndexDigitalWorks from "../digital-works/IndexDigitalWorks";
import IndexPostPoem from "../postPoem/IndexPostPoem"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TabBar({token}) {
  // * Get Url Parameters
  const params = useParams();
  const navigate = useNavigate()
  let { page } = params
  console.log(params)

  // * Declare Current Tab state variable
  const [currentTab, setCurrentTab] = useState("home");

  const handleChange = (event, newTab) => {
    navigate(`/${newTab}`);
  };


  useEffect(
    (page) => {
      setCurrentTab(page);
    },
    [page]
  );

  return (
    <>
      <CssBaseline />
      <TabsUnstyled 
        selectionFollowsFocus 
        defaultValue={"home"}
        value={page}
        onChange={handleChange}
      >
        <TabsListUnstyled>
          <TabUnstyled value="home">Home/About</TabUnstyled>
          <TabUnstyled value="physical">Physical Works</TabUnstyled>
          <TabUnstyled value="digital">Digial Works</TabUnstyled>
          <TabUnstyled value="post">Posted Poems</TabUnstyled>
        </TabsListUnstyled>
        <TabPanelUnstyled value="home">
          <HomeAbout token={token}/>
        </TabPanelUnstyled>
        <TabPanelUnstyled value="physical">
          <IndexWorksPhysical token={token}/>
        </TabPanelUnstyled>
        <TabPanelUnstyled value="digital">
          <IndexDigitalWorks token={token}/>
        </TabPanelUnstyled>
        <TabPanelUnstyled value="post">
          <IndexPostPoem token={token}/>
        </TabPanelUnstyled>
      </TabsUnstyled>
    </>
  );
}

export default TabBar;
