import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Box,
  CssBaseline,
  Container,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleItem from "../../../components/Items/SingleItem";
import Navbar from "../../../components/Navbar/Navbar";
import Bottom from "../../../components/Pagination/Bottom";
import Player from "../../../components/Viewer/Player";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import UploadArea from "../../../components/Upload/UploadArea";
import UploadTitle from "../../../components/Upload/UploadTitle";
import ContextItem from "../../../components/Upload/ContextItem";
import axios from "axios";

const UploadVideos = () => {
  const [fileName, setFileName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>();
  const [name, setName] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<any>();
  const [thumbnailName, setThumbnailName] = useState(
    "There is no file selected"
  );

  const [contextFiles, setContextFiles] = useState(["", ""]);
  const [toggleFiles, setToggleFiles] = useState(true);
  const handleToggleFiles = () => {
    setToggleFiles(!toggleFiles);
  };
  const handleFileSelection = (index: number, value: string) => {
    contextFiles[index] = value;
    setContextFiles([...contextFiles]);
  };
  const [contextVariables, setContextVariables] = useState([""]);
  const [toggleVariables, setToggleVariables] = useState(true);
  const handleToggleVariables = () => {
    setToggleVariables(!toggleVariables);
  };
  const handleVariableSelection = (index: number, value: string) => {
    contextFiles[index] = value;
    setContextFiles([...contextFiles]);
  };
  const [contextObjRefs, setContextObjRefs] = useState([""]);
  const [toggleObjRef, setToggleObjRef] = useState(true);
  const handleToggleObjRef = () => {
    setToggleObjRef(!toggleObjRef);
  };
  const handleObjRefSelection = (index: number, value: string) => {
    contextObjRefs[index] = value;
    setContextObjRefs([...contextObjRefs]);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleFileNameChange = (e: any) => {
    setFileName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };
  const handleThumbnailNameChange = (e: any) => {
    setThumbnailName(e.target.value);
  };
  const [progress, setProgress] = useState(0);
  const handleUploadThumbnail = async () => {
    setProgress(0);
    await axios
      .post("http://oc.oaas.10.131.36.40.nip.io/api/object-construct", {
        cls: "builtin.basic.file",
        embeddedRecord: {
          title: name + " thumbnail",
          desc: "Thumbnail for video object: " + name,
        },
        keys: ["file"],
      })
      .then(function (response) {
        setThumbnailURL(
          "http://cds.10.131.36.40.nip.io/oal/" +
            response.data.object.id +
            "/file"
        );
        axios
          .put(response.data.uploadUrls.file, thumbnailFile, {
            headers: {
              "Content-Type": thumbnailFile.type,
            },
            onUploadProgress: (prog) => {
              setProgress(Math.round((prog.loaded / prog.total) * 100));
            },
          })
          .then(function (res) {
            console.log(thumbnailURL, 5);
          });
      });
  };

  const handleUploadVideo = async () => {
    setProgress(0);
    console.log(thumbnailURL);
    await axios
      .post("http://oc.oaas.10.131.36.40.nip.io/api/object-construct", {
        cls: "example.video",
        embeddedRecord: {
          title: name,
          desc: desc,
          thumbnail: thumbnailURL,
        },
        keys: ["video"],
      })
      .then(function (response) {
        axios
          .put(response.data.uploadUrls.video, file, {
            headers: {
              "Content-Type": file.type,
            },
            onUploadProgress: (prog) => {
              setProgress(Math.round((prog.loaded / prog.total) * 100));
            },
          })
          .then(function (res) {
            axios
              .get(
                "http://cds.10.131.36.40.nip.io/oal/" +
                  response.data.object.id +
                  ":tohls()()"
              )
              .then(function (r) {
                setProgress(0);
                console.log(r);
              });
          });
      });
  };

  const handleUploadFile = async () => {
    await handleUploadThumbnail();
    await handleUploadVideo();
  };

  const [numFiles, setNumFiles] = useState(0);
  const [choosableFiles, setChooseableFiles] = useState<any>([]);
  const getChoosableFiles = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/classes/builtin.basic.file/objects?limit=100000&offset=0"
    );
    setChooseableFiles(res.data.items.filter((item: any) => item.embeddedRecord !== undefined));
    setNumFiles(res.data.total as number);
  };
  const [choosableObj, setChooseableObj] = useState<any>([]);
  const getChoosableObj = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/objects?limit=100000&offset=0"
    );
    //res.data.items.splice(2, 3);
    setChooseableObj(res.data.items.filter((item: any) => item.embeddedRecord !== undefined));
  };
  useEffect(() => {
    getChoosableFiles();
    getChoosableObj();
  }, [5]);

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
                <UploadTitle title="Upload Video" />
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
                        setFileName={setFileName}
                        fileName={fileName}
                      />
                      <UploadArea
                        title="Thumbnail"
                        setFile={setThumbnailFile}
                        setFileName={setThumbnailName}
                        fileName={thumbnailName}
                      />
                      <Grid item xs>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {numFiles !== 0 && (
                            <>
                              <ContextItem
                                isDropdown={true}
                                title="Files"
                                contextData={contextFiles}
                                handleSelection={handleFileSelection}
                                toggle={toggleFiles}
                                onToggle={handleToggleFiles}
                                selectData={choosableFiles}
                              />
                              <Divider sx={{ mt: 2 }}></Divider>
                              <ContextItem
                                isDropdown={false}
                                title="Variables"
                                contextData={contextVariables}
                                handleSelection={handleVariableSelection}
                                toggle={toggleVariables}
                                onToggle={handleToggleVariables}
                                selectData={choosableFiles}
                              />
                            </>
                          )}

                          <Divider sx={{ mt: 2 }}></Divider>
                          <ContextItem
                            isDropdown={true}
                            title="Object References"
                            contextData={contextObjRefs}
                            handleSelection={handleObjRefSelection}
                            toggle={toggleObjRef}
                            onToggle={handleToggleObjRef}
                            selectData={choosableObj}
                          />
                        </Paper>
                      </Grid>
                      <Grid
                        maxWidth="xl"
                        container
                        spacing={3}
                        sx={{ ml: 0, mt: 2 }}
                      >
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
