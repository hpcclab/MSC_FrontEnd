import { ThemeProvider } from '@emotion/react';
import { createTheme, Box, CssBaseline, Container, Grid } from '@mui/material';
import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Player from '../../../components/Player';

const UVideos = () => {
    return (

        <>
        <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="videos"/>
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
    )
}

export default UVideos;