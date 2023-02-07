import { css } from "@emotion/react";
import { Box, Container, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import TabBar from "../tabBar/TabBar";
import Typography from "@mui/material/Typography";
import SidebarLeft from "../sidebars/sidebar-left/SidebarLeft";
import IndexSidebarRight from "../sidebars/sidebar-right/IndexSidebarRight";
import StickyFooter from "../footer/StickyFooter";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Banner from "../banner/Banner";

const Layout = ({ token }) => {
  const params = useParams();
  let { page } = params;
  // const theme = useTheme()
  // console.log(theme)
  return (
    <>
      <Box sx={{ backgroundColor: "#FFCBD4", paddingTop: "0", marginTop: "0" }}>
        <Banner token={token}></Banner>
        <Container
          fluid
          sx={{ display: "flex", justifyContent: "center", overflow: "scroll" }}
        >
          <TabBar token={token} />
          {page !== "physical" ? (
            <IndexSidebarRight
              token={token}
              
            />
          ) : null}
        </Container>

        {/* <Grid container spacing={0}>
          <SidebarLeft item xs={2} />
          <TabBar sx={{ position: "sticky" }} item xs={7} />
          <SidebarRight item xs={3} />
        </Grid> */}
      </Box>
      <StickyFooter />
    </>
  );
};

export default Layout;
