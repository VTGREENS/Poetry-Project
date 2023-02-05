import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditDigitalWorks from "./components/digital-works/EditDigitalWorks";
import EditWorksPhysical from "./components/worksPhysical/EditWorksPhysical";
import EditPostPoem from "./components/postPoem/EditPostPoem";
import EditHomeAbout from "./components/home/EditHomeAbout";
import EditSidebarRightCard from "./components/sidebars/sidebar-right/EditSidebarRightCard";
import EditGalleryPost from "./components/gallery/EditGalleryPost";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#FFCBD4" },
    secondary: { main: "#008854" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { border: "thin solid black" },
      },
    }
  },
});

function App() {
  // TODO Remove sampleToken after implementing AUTH aasdf
  let sampleToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2VhYjQ3ZWUxMDRmNjBjMDMwZmVmZCIsImlhdCI6MTY3NTQ1ODE3NCwiZXhwIjoxNjc1NzE3Mzc0fQ.Lq-xwqe7FU-HKnNY9PokrN2-2Wo4uoasFwe6rMZCA6Q";
  const [sessionToken, setSessionToken] = useState(sampleToken);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/:page" element={<Layout token={sessionToken} />} />
          <Route
            path="/digital/update/:id"
            element={<EditDigitalWorks token={sessionToken} />}
          />
          <Route
            path="/physical/update/:id"
            element={<EditWorksPhysical token={sessionToken} />}
          />
          <Route
            path="/post/update/:id"
            element={<EditPostPoem token={sessionToken} />}
          />
          <Route
            path="/about/update/:id"
            element={<EditHomeAbout token={sessionToken} />}
          />
          <Route
            path="/sidebarright/update/:id"
            element={<EditSidebarRightCard token={sessionToken} />}
          />
          <Route
            path="/gallery/update/:id"
            element={<EditGalleryPost token={sessionToken} />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
