import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Box,
  CssBaseline,
  Container,
  Grid,
  Button,
  Paper,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Divider,
  TextField,
  Input,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../../components/Navbar/Navbar";
import Player from "../../../components/Viewer/Player";
import UploadTitle from "../../../components/Upload/UploadTitle";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import UploadArea from "../../../components/Upload/UploadArea";
import axios from "axios";
import FillDownInput from "../../../components/Upload/FillDownInput";
import DoubleInput from "../../../components/Upload/DoubleInput";
import { NearMe } from "@mui/icons-material";

const UploadClasses = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>();

  const [chosenFuncList, setChosenFuncList] = useState([["", ""]]);
  const [totalItems, setTotalItems] = useState(1);
  const itemCount: number = 777;
  const pageNumbers = Math.ceil(totalItems / itemCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const getTotalItems = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/functions?limit=" +
        itemCount +
        "&offset=" +
        (currentPage - 1) * itemCount
    );
    setTotalItems(res.data.total);
    setData(res.data.items);
  };

  useEffect(() => {
    getTotalItems();
    getClassList();
  }, [currentPage]);

  const renderFunctionSelections = data.map((item: any) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));

  const handleAddition = () => {
    setChosenFuncList([...chosenFuncList, ["", ""]]);
  };

  const handleDeletion = (index: number) => {
    chosenFuncList.splice(index, 1);
    setChosenFuncList([...chosenFuncList]);
  };

  const handleSelection = (index: number, value: string) => {
    chosenFuncList[index][0] = value;
    setChosenFuncList([...chosenFuncList]);
  };

  const handleFuncAlias = (index: number, value: string) => {
    chosenFuncList[index][1] = value;
    setChosenFuncList([...chosenFuncList]);
  };

  const showFuncs = () => {
    return (
      <>
        {chosenFuncList.map((item: any, index: number) => {
          return (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Function
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item[0]}
                          label="Function"
                          onChange={(event) => {
                            handleSelection(index, event.target.value);
                          }}
                        >
                          {renderFunctionSelections}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        id="outlined-textarea"
                        placeholder="with alias"
                        multiline
                        value={item[1]}
                        onChange={(e) => {
                          handleFuncAlias(index, e.target.value);
                        }}
                      />
                    </Grid>
                    <Divider></Divider>
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

  const [classList, setClassList] = useState([])

  const getClassList = async () => {
    const res = await axios.get((window as any).ENV.OC_API + "/api/classes")
    setClassList(res.data.items)
  }

  const renderClassSelection = classList.map((item: any) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  var functionsJSON: any = [{}];
  var keySpecsJSON: any = [{}];
  var refSpecsJSON: any = [{}];
  const handleCreateClass = () => {
    // Convert chosenFuncList array into the proper JSON
    functionsJSON = chosenFuncList.map((element, index) => ({
      access: "PUBLIC",
      defaultArgs: {},
      forwardRecords: [],
      function: chosenFuncList[index][0],
      name: chosenFuncList[index][1],
    }));
    // Convert files (unstructured data / keySpecs) array into the proper JSON
    keySpecsJSON = files.map((element, index) => ({
      access: "PUBLIC",
      name: files[index][0],
      provider: "s3",
    }));
    // Convert objectRefs (refSpecs) array into the proper JSON
    refSpecsJSON = objectRefs.map((element, index)=> ({
      cls: objectRefs[index][1],
      name: objectRefs[index][0],
    }))


    //console.log(functionsJSON);
    axios.post((window as any).ENV.OC_API + "/api/classes", {
      description: desc,
      functions: functionsJSON,
      name: name,
      objectType: "SIMPLE",
      parents: [],
      refSpec: refSpecsJSON,
      stateSpec: {
        defaultProvider: "s3",
        keySpecs: keySpecsJSON,
      },
      stateType: "FILES",
    }).then(function (r) {
      alert("The class has been successfully created.")
    })
    // console.log({
    //   description: desc,
    //   functions: functionsJSON,
    //   name: name,
    //   objectType: "SIMPLE",
    //   parents: [],
    //   refSpec: refSpecsJSON,
    //   stateSpec: {
    //     defaultProvider: "s3",
    //     keySpecs: keySpecsJSON,
    //   },
    //   stateType: "FILES",
    // });
  };

  const [files, setFiles] = useState([["", ""]]);
  const handleFileAddition = () => {
    setFiles([...files, ["", ""]]);
  };
  const handleFileDeletion = (index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  };
  const handleFileChange = (index: number, index2: number, value: string) => {
    files[index][index2] = value;
    setFiles([...files]);
  };

  const [variables, setVariables] = useState([["", ""]]);
  const handleVariableAddition = () => {
    setVariables([...variables, ["", ""]]);
  };
  const handleVariableDeletion = (index: number) => {
    variables.splice(index, 1);
    setVariables([...variables]);
  };
  const handleVariableChange = (
    index: number,
    index2: number,
    value: string
  ) => {
    variables[index][index2] = value;
    setVariables([...variables]);
  };

  const [objectRefs, setObjectRefs] = useState([["", ""]]);
  const handleObjectRefAddition = () => {
    setObjectRefs([...objectRefs, ["", ""]]);
  };
  const handleObjectRefDeletion = (index: number) => {
    objectRefs.splice(index, 1);
    setObjectRefs([...objectRefs]);
  };
  const handleObjectRefChange = (
    index: number,
    index2: number,
    value: string
  ) => {
    objectRefs[index][index2] = value;
    setObjectRefs([...objectRefs]);
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={false} section="classes" url="classes" />
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
                <UploadTitle title="Create Class" />
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
                      {/** Start Context Section */}
                      <Grid item xs>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h3">Attributes</Typography>
                          {/** Start Files Section */}
                          <Divider></Divider>
                          <FillDownInput
                            dropdownName="File Name"
                            selectData={data}
                            value={files}
                            title="Unstructured Data"
                            handleAddition={handleFileAddition}
                            handleChange={handleFileChange}
                            handleDeletion={handleFileDeletion}
                            useDropDown={false}
                          />
                          {/** End Files Section */}
                          {/** Start Variables Section */}

                          {/** End Variables Section */}
                          {/** Start Object Refs Section */}
                          <Divider></Divider>
                          <FillDownInput
                            useDropDown={true}
                            dropdownName="Class Name"
                            selectData={classList}
                            value={objectRefs}
                            title="Object References"
                            handleAddition={handleObjectRefAddition}
                            handleChange={handleObjectRefChange}
                            handleDeletion={handleObjectRefDeletion}
                          />
                          {/** End Object Refs Section */}
                        </Paper>
                      </Grid>
                      {/** End Context Section */}
                      {/** Start Function Section */}
                      <Grid item xs>
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
                                <Typography variant="h3">Functions</Typography>
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
                          {showFuncs()}
                        </Paper>
                      </Grid>
                      {/** End Function Section */}
                      <Grid container spacing={3} sx={{ ml: 0, mt: 2 }}>
                        <BackCreate
                          handleSubmit={handleCreateClass}
                          backDisabled={false}
                          submitDisabled={name === ""}
                          submitTitle="Create Class"
                          goBackTo="/sp-class-list"
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

export default UploadClasses;
