import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Card, CardContent, CardMedia, } from "@mui/material";
import styled from "@emotion/styled";

const drawerWidth = "inherit";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  background: #ffdddd
  position: sticky;
`;
export default function PermanentDrawerLeft() {
  return (
    <>
      <StyledSidebar>
        <Card sx={{marginBottom:"1rem"}}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              sx={{ margin: "2vw" }}
              component="img"
              image="https://res.cloudinary.com/duh9psfze/image/upload/v1674835092/Website/Cover_To_Daughter_a_Devil_epzsef.png"
              alt="To Daughter a Devil Cover Image"
            />
            <CardContent>
              <Typography variant="p" component="p">
              To Daughter a Devil explores women in horror and the horror in being woman.
              </Typography>
              <Button 
              href='/physical' variant='contained' color='primary'>More Info</Button>
            </CardContent>
          </Box>
        </Card>
        <Card sx={{marginBottom:"1rem"}}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              sx={{ margin: "2vw" }}
              component="img"
              image="https://www.unsolicitedpress.com/uploads/1/8/8/2/18828530/s224039681740579826_p252_i1_w640.jpeg"
              alt="Dwellers Cover Image"
            />
            <CardContent>
              <Typography variant="p" component="p">
              Dwellers is a love letter to a girlhood that is often overlooked.
              </Typography>
              <Button 
              href='/physical' variant='contained' color='secondary'>More Info</Button>
            </CardContent>
          </Box>
        </Card>
      </StyledSidebar>
    </>
  );
}
