import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Box,
  CssBaseline,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Viewer/Player";
import VideoInfo from "../../components/Viewer/VideoInfo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { PropaneSharp } from "@mui/icons-material";

type urlParams = {
  videoId: string;
};




const ViewerPlayVideo = () => {
  const [newVideoId, setNewVideoId] = useState("")

  const videoId = useParams<urlParams>().videoId;
  const [videoData, setVideoData] = useState<any>([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [objClass, setObjClass] = useState("");
  const getVideoInfo = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/objects/" + videoId
    );
    console.log(res.data)
    setVideoData(res.data);
    setTaskStatus(res.data.status.taskStatus);
    setObjClass(res.data.cls);
  };
  const [oaasFunctions, setOaaSFunctions] = useState<any>([
    { name: "func1" },
    { name: "func2" },
  ]);

  const getFunctions = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/classes/" + objClass
    );
    //console.log(5)
    //console.log(res);
    setOaaSFunctions(res.data.functions);
  };

  const [files, setFiles] = useState<any>([]);
  const getFileObjs = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API +
        "/api/classes/builtin.basic.file/objects?limit=1337"
    );
    setFiles(res.data.items);
  };

  var inputVars: string[] = [];
  var inputObjs: string[] = [];

  const [chosenFunc, setChosenFunc] = useState("");
  const [funcVars, setFuncVars] = useState<any>([]);
  const [funcObj, setFuncObj] = useState<any>([]);
  const getFunctionInfo = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/functions/" + chosenFunc
    );
    setFuncVars(res.data.variableDescriptions);
    setFuncObj(res.data.validation.inputs);
    inputVars = res.data.variableDescriptions.map((element: any) => "");
    inputObjs = res.data.validation.inputs.map((element: any) => "");
  };

  useEffect(() => {
    if (chosenFunc !== "") {
      console.log(chosenFunc);
    }
  }, [chosenFunc]);

  const [objects, setObjects] = useState<any>([]);
  const getObjects = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/objects?limit=1337"
    );
    setObjects(
      res.data.items.filter((item: any) => item.embeddedRecord !== undefined)
    );
  };

  useEffect(() => {
    getVideoInfo();
    getFileObjs();
    getObjects();
  }, [videoId]);

  useEffect(() => {
    if (objClass !== "") {
      getFunctions();
    }
  }, [objClass]);

  const [functions, setFunctions] = useState([["", "", "", "", ""]]);
  const addFunction = () => {
    setFunctions([...functions, ["", "", "", "", ""]]);
  };
  const deleteFunction = (index: number) => {
    functions.splice(index, 1);
    setFunctions([...functions]);
  };
  const changeFunction = (index: number, index2: number, value: string) => {
    functions[index][index2] = value;
    setFunctions([...functions]);
  };

  const renderInputVariables = () => {
    return (
      <>
        {funcVars.map((item: any, index: number) => {
          return (
            <>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Input Variable Name"
                placeholder="Fill"
                multiline
                onChange={(e) => {
                  inputVars[index] = e.target.value;
                }}
              />
            </>
          );
        })}
      </>
    );
  };
  const renderInputObjects = async (className: string, index: number) => {
    const res = await axios.get(
      (window as any).ENV.OC_API +
        "/api/classes/" +
        className +
        "/objects?limit=1337"
    );
    var items = res.data.items.filter(
      (item: any) => item.embeddedRecord !== undefined
    );
    const renderObjSelection = items.map((item: any) => (
      <MenuItem value={item.id}>
        {item.id} - {item.embeddedRecord.title}
      </MenuItem>
    ));

    return (
      <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">File</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputObjs[index] as string}
            label="File Name"
            onChange={(event) => {
              inputObjs[index] = event.target.value;
            }}
          >
            {renderObjSelection}
          </Select>
        </FormControl>
      </>
    );
  };

  const renderFunctions = () => {
    try {
      const renderOaaSFunctions = oaasFunctions.map((item: any) => (
        <MenuItem
          value={item.name}
          onClick={() => {
            console.log(item);
            setChosenFunc(item.function);
          }}
        >
          {item.name}
        </MenuItem>
      ));
      const renderFiles = files.map((item: any) => (
        <MenuItem value={item.id}>
          {item.id} - {item.embeddedRecord.title}
        </MenuItem>
      ));
      const renderObjects = objects.map((item: any) => (
        <MenuItem value={item.id}>
          {item.id} - {item.embeddedRecord.title}
        </MenuItem>
      ));

      return (
        <>
          {functions.map((item, index) => {
            return (
              <>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    margin: "auto",
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Function Name
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={item[0]}
                              label="Function"
                              onChange={(event) => {
                                changeFunction(index, 0, event.target.value);
                              }}
                            >
                              {renderOaaSFunctions}
                            </Select>
                          </FormControl>
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Input Variables
                          </Typography>
                          {renderInputVariables()}
                          <Divider></Divider>
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Input Objects
                          </Typography>
                          {funcObj.map((element: any, index: number) => {
                            return (
                              <>
                              {renderInputObjects(element.cls, index)}
                              </>
                            )
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            );
          })}
        </>
      );
    } catch (error) {}
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={true} section="viewer" url="" />
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
              <Grid container spacing={3} sx={{ mt: 8 }}>
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  {/** Components go here */}
                  {taskStatus === "SUCCEEDED" ? (
                    <>
                      <Player videoId={videoId} />
                      <VideoInfo
                        title={videoData.embeddedRecord.title}
                        desc={videoData.embeddedRecord.desc}
                      />
                      <Divider></Divider>
                      <Grid>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography variant="h3">Apply Function</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {renderFunctions()}
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={functions[0][0] === "" || newVideoId !== ""}
                        onClick={() => {
                          axios.get(
                            (window as any).ENV.CDS_API +
                              "/oal/" +
                              videoId +
                              ":" +
                              functions[0][0] +
                              "()()?await=true"
                          ).then(function (r) {
                            console.log(r)
                            alert("The function has been applied. It may take a while for the videos list to be updated after refreshing.")
                            setNewVideoId(r.data.id)
                          });
                        }}
                      >
                        Apply
                      </Button>
                      {
                        
                        newVideoId !== "" && (
                          <Button 
                          sx={{mt: 2}}
                          fullWidth
                        variant="contained"
                          href={"/v-player/" + newVideoId}>
                            Watch Video With Applied Function
                          </Button>
                        )
                      }
                    </>
                  ) : (
                    <VideoInfo
                      title="Welcome to MSC's web interface"
                      desc="Select a video to play it or go to the stream provider section"
                    />
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ViewerPlayVideo;
