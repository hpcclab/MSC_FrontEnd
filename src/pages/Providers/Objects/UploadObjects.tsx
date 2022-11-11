import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Box,
  CssBaseline,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Player from "../../../components/Viewer/Player";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import UploadArea from "../../../components/Upload/UploadArea";
import UploadTitle from "../../../components/Upload/UploadTitle";
import axios from "axios";
import { isConstructorDeclaration } from "typescript";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DropDown from "../../../components/Items/components/DropDown";
import ObjectReference from "../../../components/Upload/ObjectRefererence";
import Dropzone from "react-dropzone";
import {
  ContentPasteOffSharp,
  SentimentSatisfiedAltSharp,
} from "@mui/icons-material";

const UploadObjects = () => {
  const [fileName, setFileName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");
  var files: any = [];
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<any>();
  var keySpecType: string = "";
  const [canUpload, setCanUpload] = useState(false);
  const [array, setArray] = useState<any>([]);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  var keyJSON = [];

  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/classes?limit=1337"
    );
    setClasses(res.data.items);
  };
  useEffect(() => {
    getClasses();
  }, [5]);

  const [chosenClass, setChosenClass] = useState("");

  const classSelection = classes.map((item: any) => (
    <MenuItem value={item._key}>{item._key}</MenuItem>
  ));

  var keyArray: any = [];
  const [keySpecs, setKeySpecs] = useState([]);
  const [refSpecs, setRefSpecs] = useState([]);
  const getClassInfo = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/classes/" + chosenClass
    );
    setKeySpecs(res.data.stateSpec.keySpecs);
    try {
      //console.log(5)
      files = res.data.stateSpec.keySpecs.map((element: any) => File);
      console.log(files, 1);
    } catch {
      files = [];
    }
    setArray([...files]);
    try {
      var temp = res.data.refSpec.map((element: any) => [
        element.name,
        element.cls,
        "",
      ]);
      setObjRefs(res.data.refSpec.map((element: any) => ""));

      setRefSpecs(temp);
    } catch {
      setRefSpecs([]);
      setObjRefs([]);
    }
    keyArray = res.data.stateSpec.keySpecs.map((element: any) => element.name);
    //console.log(keyArray, 100);
    //console.log(res.data.refSpec.map((element: any) => ([element.name, element.cls, ""])));
  };

  useEffect(() => {
    if (chosenClass !== "") {
      getClassInfo();
    }
  }, [chosenClass]);
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

  const handleFileDrop = (index: number, file: any) => {
    //console.log(files[index], 1)
    //console.log(files[index])
    array[index] = file[0];
    setArray([...array]);
    console.log(array);
    //console.log(files, 5)
    //console.log(files[index], 2)
  };

  const renderKeySpecs = () => {
    try {
    } catch {}
    return (
      <>
        {keySpecs.map((item: any, index: number) => {
          //console.log(keySpecs)
          return (
            <>
              <Grid item xs={12}>
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
                  <Typography variant="h5">{item["name"]}</Typography>
                </Paper>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleFileDrop(index, acceptedFiles);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Paper
                          sx={{
                            borderWidth: 10,
                            borderStyle: "dashed",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography align="center">
                            <AddIcon fontSize="large" sx={{ mt: 15, mb: 15 }} />
                          </Typography>
                        </Paper>
                      </div>
                    </section>
                  )}
                </Dropzone>
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
                  {array[index] !== undefined && (
                    <Typography>{array[index]["name"]}</Typography>
                  )}
                </Paper>
              </Grid>
            </>
          );
        })}
      </>
    );
  };

  const [refDropdown, setRefDropdown] = useState(true);
  const handleRefDropdown = () => {
    setRefDropdown(!refDropdown);
  };

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
    getObjects();
  }, [5]);
  const renderObjects = objects.map((item: any) => (
    <MenuItem value={item.id}>
      {item.id} - {item.embeddedRecord.title}
    </MenuItem>
  ));
  const [objRefs, setObjRefs] = useState([""]);
  const handleObjRefChange = (index: number, value: string) => {
    objRefs[index] = value;
    setObjRefs([...objRefs]);
  };

  const renderObjRefs = () => {
    return (
      <>
        {refSpecs.map((item: any, index: number) => {
          return (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <ObjectReference
                      className={item[1]}
                      index={index}
                      item={objRefs[index]}
                      handleObjRefChange={handleObjRefChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        })}
      </>
    );
  };
  const handleUploadFile = () => {
    //console.log(objRefs);
    setProgress(0);
    //console.log(keySpecs, 69)
    keyJSON = keySpecs.map((element: any) => element.name);
    //console.log(array);
    axios
      .post((window as any).ENV.OC_API + "/api/object-construct", {
        cls: chosenClass,
        embeddedRecord: {
          title: name,
          desc: desc,
        },
        keys: keyJSON,
      })
      .then(async function (response) {
        await array.map(async (element: any, index: number) => {
          console.log(response.data.uploadUrls[keySpecs[index]["name"]]);
          // console.log(keySpecs[index]["name"])
          // keySpecType = keySpecs[index]["name"];
          // console.log(keySpecType);
          var file = element;
          console.log(element);
          await axios
            .put(response.data.uploadUrls[keySpecs[index]["name"]], file, {
              headers: {
                "Content-Type": file["type"],
                //"Content-Length": element["size"]
              },
              onUploadProgress: (prog) => {
                setProgress(Math.round((prog.loaded / prog.total) * 100));
              },
            })
            .then(function (r) {
              alert("The object has been successfully created.");
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      });
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
                <UploadTitle title="Upload Object" />
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
                      {/** Class Selection */}
                      <Grid item xs={12}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            margin: "auto",
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#1A2027"
                                : "#fff",
                          }}
                        >
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                display="inline"
                                variant="h4"
                                color={"black"}
                              >
                                Default Class
                              </Typography>

                              <Typography
                                display="inline"
                                variant="h4"
                                color={"red"}
                              >
                                {" "}
                                *
                              </Typography>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Default Class Name
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={chosenClass}
                                  label="Class"
                                  onChange={(event) => {
                                    setChosenClass(event.target.value);
                                  }}
                                >
                                  {classSelection}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      {/** End Class Selection */}
                      {renderKeySpecs()}
                      <Grid item xs={12}>
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
                                <Typography variant="h3">
                                  Object References
                                  <DropDown
                                    onToggle={handleRefDropdown}
                                    toggle={refDropdown}
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                            {refDropdown && renderObjRefs()}
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
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
                                <Typography variant="h3">Variables</Typography>
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
                            {showVars()}
                          </Grid>
                        </Paper>
                      </Grid>
                      <BackCreate
                        handleSubmit={handleUploadFile}
                        backDisabled={progress !== 0 && progress !== 100}
                        submitDisabled={
                          (progress !== 0 && progress !== 100) ||
                          name === "" ||
                          chosenClass === ""
                        }
                        submitTitle="Upload File"
                        goBackTo="/sp-file-list"
                      />
                    </Grid>
                    <LinearProgress
                      sx={{ mt: 2 }}
                      variant="determinate"
                      value={progress}
                    />
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

export default UploadObjects;

/**
 * 
 * <UploadArea
                        setFileName={setFileName}
                        setFile={setFile}
                        fileName={fileName}
                        title={keySpecType}
                        acceptType=""
                      />
 */
