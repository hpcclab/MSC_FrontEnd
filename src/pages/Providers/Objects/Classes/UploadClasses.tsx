import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import Player from "../../../../components/Player";
import OaaS from '../../../../APIs/OaaSAPI'

type urlParams = {
  test: string;
}

const UploadClasses = () => {
  const OaaSAPI = OaaS();
  const test = useParams<urlParams>().test;
  const videos = OaaSAPI.getVideos(1, 5);

  const [test1, setTest] = useState(0);
  useEffect(() => {
    console.log(videos)
    setTest(test1 + 1);
  })


  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="classes" url=""/>
          {/** Page Content */}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  {/** Components go here */}
                  <Grid sx={{ mt: 8, height: 825 }}>
                    {/** Page contents go here */}
                  </Grid>
                  {/** End Components go here */}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UploadClasses;
