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
import { Button, Card, CardContent, CardMedia } from "@mui/material";
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
        <Card>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              sx={{ margin: "2vw" }}
              component="img"
              image="http://placekitten.com/500/500"
              alt="placeholder kitten photo"
            />
            <CardContent>
              <Typography variant="p" component="p">
                This is a sample Card . This is a sample Card. This is
                a sample Card.
              </Typography>
              <Button />
            </CardContent>
          </Box>
        </Card>
        <Card>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              sx={{ margin: "2vw" }}
              component="img"
              image="http://placekitten.com/500/500"
              alt="placeholder kitten photo"
            />
            <CardContent>
              <Typography variant="p" component="p">
                This is a sample Card . This is a sample Card. This is
                a sample Card.
              </Typography>
              <Button />
            </CardContent>
          </Box>
        </Card>
      </StyledSidebar>
    </>
  );
}
