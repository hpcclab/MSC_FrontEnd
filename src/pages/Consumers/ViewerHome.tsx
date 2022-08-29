import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player";
import VideoInfo from "../../components/VideoInfo";
import logo from "../logo.svg";
const mdTheme = createTheme();

const ViewerHome = () => {
  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={true} section="viewer" url=""/>
          {/** Page Content */}
          
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{mt: 8}}>
              <Grid
                item
                xs={12}
                alignItems="center"
                justifyContent="center"
              >
                {/** Components go here */}
                  
                  
                  <VideoInfo title="title" desc="desc123"/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ViewerHome;
