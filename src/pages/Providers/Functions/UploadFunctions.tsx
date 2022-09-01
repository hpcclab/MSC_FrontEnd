import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Box,
  CssBaseline,
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Player from "../../../components/Viewer/Player";
import UploadTitle from "../../../components/Upload/UploadTitle";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";

const UploadFunctions = () => {
  const [name, setName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };
  const handleUploadFile = () => {
    console.log("a");
  };

  const [vars, setVars] = useState<any>([""]);

  const handleAddition = () => {
    setVars([...vars, ""]);
  };

  const handleDeletion = (index: number) => {
    vars.splice(index, 1);
    setVars([...vars]);
  };

  const handleSelection = (index: number, value: string) => {
    vars[index] = value;
    setVars([...vars]);
  };

  const showVars = () => {
    return (
      <>
        {vars.map((item: any, index: number) => {
          return (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="Name"
                        placeholder="Input Variable Name"
                        multiline
                        onChange={(e) => {
                          handleSelection(index, e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        handleDeletion(index);
                      }}
                      sx={{ mt: 1 }}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="functions" url="" />
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
            <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
              <Grid container spacing={3}>
                <UploadTitle title="Upload Function" />
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  {/** Components go here */}
                  <Grid sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                      {/** Page contents go here */}
                      <InputBox
                        title="Name"
                        label="Enter Name"
                        handleInput={handleNameChange}
                      />
                      <InputBox
                        title="Description"
                        label="Enter Description"
                        handleInput={handleDescChange}
                      />
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography variant="h3">Input Variables</Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Button onClick={handleAddition}>
                              <AddCircleOutlineIcon
                                sx={{ mt: 0.5 }}
                                fontSize="large"
                              />
                            </Button>
                          </Grid>
                        </Grid>
                        {showVars()}
                      </Paper>
                      
                      <BackCreate
                        handleSubmit={handleUploadFile}
                        backDisabled={false}
                        submitDisabled={false}
                        submitTitle="Create Function"
                        goBackTo="/sp-file-list"
                      />
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

export default UploadFunctions;
