import { ThemeProvider, useTheme } from "@emotion/react";
import { Box, CssBaseline, Container, Grid, createTheme, Paper, Typography } from "@mui/material";
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
          <Navbar isViewer={false} section="dashboard" url=""/>
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
                    
                    <Grid container spacing={3} >
                {/* Chart */}
                
                <Grid item xs={12} sm container >
                    
                    <Paper variant="outlined"
                        sx={{
                            height:925,
                            p: 2,
                            margin: 'auto',
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    Objects
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} sm container>
                    <Paper variant="outlined"
                        sx={{
                            height:925,
                            p: 2,
                            margin: 'auto',
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    Functions
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

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

export default Dashboard;
