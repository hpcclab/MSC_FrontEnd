import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Player from "../../../components/Viewer/Player";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import UploadArea from "../../../components/Upload/UploadArea";
import UploadTitle from "../../../components/Upload/UploadTitle";
import axios from "axios";

const UploadFiles = () => {
  const [fileName, setFileName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>();
  const [name, setName] = useState("")
  const [progress, setProgress] = useState(0)

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };
  const handleUploadFile = () => {
    setProgress(0)
    axios.post((window as any).ENV.OC_API + '/api/object-construct', {
      cls: "builtin.basic.file",
      embeddedRecord: {
        title: name,
        desc: desc,
      },
      keys: ["file"]
    }).then(function (response) {
      axios.put(response.data.uploadUrls.file, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: prog => {
          setProgress(Math.round((prog.loaded / prog.total) * 100))
        }
      }).then(function () {alert("File has sucessfully uploaded!")})
    })
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
                        required="*"
                      />
                      <InputBox
                        title="Description"
                        label="Enter Description"
                        handleInput={handleDescChange}
                        required=""
                      />
                      <UploadArea acceptType="" title="Source" setFile={setFile} setFileName={setFileName} fileName={fileName}/>
                      
                      <BackCreate
                        handleSubmit={handleUploadFile}
                        backDisabled={progress !== 0 && progress !== 100}
                        submitDisabled={(progress !== 0 && progress !== 100) || (file === undefined || name === "")}
                        submitTitle="Upload File"
                        goBackTo="/sp-file-list"
                      />
                      
                    </Grid>
                    <LinearProgress sx={{mt: 2}} variant="determinate" value={progress} />
                      {progress}%
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
