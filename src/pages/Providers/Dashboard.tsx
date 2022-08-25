import { ThemeProvider, useTheme } from "@emotion/react";
import { Box, CssBaseline, Container, Grid, createTheme } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player";

const Dashboard = () => {
  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="dashboard"/>
          {/** Page Content */}
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} alignItems="center" justifyContent="center">
                {/** Components go here */}
                <Player />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
