import { css } from "@emotion/react";
import { Box, Container, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import TabBar from "../tabBar/TabBar";
import Typography from "@mui/material/Typography";
import SidebarLeft from "../sidebars/sidebar-left/SidebarLeft";
import SidebarRight from "../sidebars/sidebar-right/SidebarRight";
import StickyFooter from "../footer/StickyFooter";
import { useParams } from "react-router-dom";

const Layout = ({ token }) => {
  const params = useParams()
  let { page } = params
  return (
    <>
      <Box>
        <header style={{ background: "#ffdddd" }}>
          <h1>Placeholder Header</h1>
        </header>
        <Container fluid sx={{display:"flex", justifyContent: 'space-evenly', alignItems: "flex-start"}} >
          <SidebarLeft sx={{position: 'sticky', top: '0'}}/>
          <TabBar/>
          {page !== "physical" ? <SidebarLeft sx={{position: 'sticky', top: '0'}}/> : null}
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
