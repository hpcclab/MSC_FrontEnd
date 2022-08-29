import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import SingleItem from "../../../components/Items/SingleItem";
import Navbar from "../../../components/Navbar/Navbar";
import Bottom from "../../../components/Pagination/Bottom";
import Player from "../../../components/Viewer/Player";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import UploadArea from "../../../components/Upload/UploadArea";
import UploadTitle from "../../../components/Upload/UploadTitle";
import ContextItem from "../../../components/Upload/ContextItem";

const UploadVideos = () => {
  const [name, setName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>();

  const [contextFiles, setContextFiles] = useState([]);
  const [contextVariables, setContextVariables] = useState([]);
  const [contextObjectRefs, setContextObjectRefs] = useState([]);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };
  const handleUploadFile = () => {
    console.log("a");
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="videos" url="" />
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
                <UploadTitle title="Upload File" />
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
                      <UploadArea
                        title="Source"
                        setFile={setFile}
                        setFileName={setName}
                        fileName={name}
                      />
                      <UploadArea
                        title="Thumbnail"
                        setFile={setFile}
                        setFileName={setName}
                        fileName={name}
                      />
                      <Grid item xs>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <ContextItem />
                        </Paper>
                      </Grid>
                      <Grid maxWidth="xl" container spacing={3} sx={{ ml: 0 ,mt: 2 }}>
                      <BackCreate
                        handleSubmit={handleUploadFile}
                        backDisabled={false}
                        submitDisabled={false}
                        submitTitle="Upload Video"
                        goBackTo="/sp-video-list"
                      />
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

export default UploadVideos;
