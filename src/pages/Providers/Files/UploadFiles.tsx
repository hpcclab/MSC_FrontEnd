import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Player from "../../../components/Viewer/Player";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import UploadArea from "../../../components/Upload/UploadArea";
import UploadTitle from "../../../components/Upload/UploadTitle";

const UploadFiles = () => {
  const [name, setName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>();

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
          <Navbar isViewer={false} section="files" url="" />
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
                      <UploadArea title="Source" setFile={setFile} setFileName={setName} fileName={name}/>
                      
                      <BackCreate
                        handleSubmit={handleUploadFile}
                        backDisabled={false}
                        submitDisabled={false}
                        submitTitle="Upload File"
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

export default UploadFiles;
