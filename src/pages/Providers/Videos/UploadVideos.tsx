import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid } from "@mui/material";
import React from "react";
import SingleItem from "../../../components/Items/components/SingleItem";
import Navbar from "../../../components/Navbar/Navbar";
import Bottom from "../../../components/Pagination/Bottom";
import Player from "../../../components/Player";

const UVideos = () => {
  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="videos" />
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
                    <SingleItem
                      title="test"
                      desc="test desc"
                      state="ready"
                      thumbnail={""}
                    />
                    <SingleItem
                      title="test"
                      desc="test desc"
                      state="ready"
                      thumbnail={""}
                    />
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

export default UVideos;
