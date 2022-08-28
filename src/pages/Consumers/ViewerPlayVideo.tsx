import { ThemeProvider } from '@emotion/react';
import { createTheme, Box, CssBaseline, Container, Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import Player from '../../components/Player';

type urlParams = {
    videoId: string;
}

const ViewerPlayVideo = () => {

    const employeeId = useParams<urlParams>().videoId;
    return (
        <>
        <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={true} section="viewer" />
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
                  <Player />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
        </>
    )
}

export default ViewerPlayVideo;