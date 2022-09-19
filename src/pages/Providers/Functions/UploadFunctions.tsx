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
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Player from "../../../components/Viewer/Player";
import UploadTitle from "../../../components/Upload/UploadTitle";
import BackCreate from "../../../components/Upload/BackCreate";
import InputBox from "../../../components/Upload/InputBox";
import axios from "axios";

const UploadFunctions = () => {
  const [name, setName] = useState("There is no file selected");
  const [desc, setDesc] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  var inputsJSON: any = [];
  var varsJSON: any = [];
  const handleCreateFunc = () => {
    inputsJSON = refs.map((element) => ({ cls: element[1], labels: [] }));
    varsJSON = vars.map((element: any) => ({ name: element }));
    //console.log(varsJSON);

    //console.log(inputsJSON)
    axios.post((window as any).ENV.OC_API + "api/functions", [{
      description: desc,
      name: name,
      outputCls: chosenClass,
      provision: {
        knative: {
          env: {},
          image: dockerURL,
        },
        type: "DURABLE",
      },
      type: "TASK",
      validation: {
        bindingRequirement: {},
        inputs: inputsJSON,
      },
      variableDescriptions: varsJSON,
    }]);

    // console.log({
    //   description: desc,
    //   name: name,
    //   outputCls: chosenClass,
    //   provision: {
    //     knative: {
    //       env: {},
    //       image: dockerURL,
    //     },
    //     type: "DURABLE",
    //   },
    //   type: "TASK",
    //   validation: {
    //     bindingRequirement: {},
    //     inputs: inputsJSON,
    //   },
    //   variableDescriptions: varsJSON,
    // });
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

  const [executionType, setExecutionType] = React.useState("");

  const handleExecutionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExecutionType((event.target as HTMLInputElement).value);
  };

  const [dockerURL, setDockerURL] = useState("");
  const handleDockerURLChange = (e: any) => {
    setDockerURL(e.target.value);
  };

  const [refs, setRefs] = useState([["", ""]]);
  const addRef = () => {
    setRefs([...refs, ["", ""]]);
  };
  const deleteRef = (index: number) => {
    refs.splice(index, 1);
    setRefs([...refs]);
  };
  const changeRefType = (index: number, refType: string) => {
    refs[index][0] = refType;
    setRefs([...refs]);
  };
  const changeRefValue = (index: number, value: string) => {
    refs[index][1] = value;
    setRefs([...refs]);
  };

  const [totalItems, setTotalItems] = useState(1);
  const itemCount: number = 777;
  const pageNumbers = Math.ceil(totalItems / itemCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const getTotalItems = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/classes?limit=" +
        itemCount +
        "&offset=" +
        (currentPage - 1) * itemCount
    );
    setTotalItems(res.data.total);
    setData(res.data.items);
  };

  useEffect(() => {
    getTotalItems();
  }, [currentPage]);

  const renderClassSelection = data.map((item: any) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));

  const showRefs = () => {
    return (
      <>
        {refs.map((item: any, index: number) => {
          return (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm container>
                  <Grid item>
                    <Typography variant="h3">{index + 1}</Typography>
                  </Grid>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Class
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item[1]}
                          label="Class Name"
                          onClick={() => {
                            changeRefType(index, "object");
                          }}
                          onChange={(event) => {
                            changeRefValue(index, event.target.value);
                          }}
                        >
                          {renderClassSelection}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        deleteRef(index);
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

  const [oaasFunctions, setOaaSFunctions] = useState<any>([]);
  const [videoId, setVideoId] = useState("");
  const getFunctions = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/functions?limit=10000&offset=0"
    );
    setOaaSFunctions(res.data.items);
  };

  useEffect(() => {
    getFunctions();
  }, [videoId]);

  const [functions, setFunctions] = useState([["a", "b", "c", "d", "e"]]);
  const addFunction = () => {
    setFunctions([...functions, ["a", "b", "c", "d", "e"]]);
  };
  const deleteFunction = (index: number) => {
    functions.splice(index, 1);
    setFunctions([...functions]);
  };
  const changeFunction = (index: number, index2: number, value: string) => {
    functions[index][index2] = value;
    setFunctions([...functions]);
  };
  const renderOaaSFunctions = oaasFunctions.map((item: any) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "api/classes?limit=1337"
    );
    setClasses(res.data.items);
  };
  useEffect(() => {
    getClasses();
  }, [5]);

  const [chosenClass, setChosenClass] = useState("");

  const classSelection = classes.map((item: any) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));

  const renderFunctions = () => {
    return (
      <>
        {functions.map((item, index) => {
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
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Grid item xs={12} sm container>
                        <Grid item xs>
                          <TextField
                            fullWidth
                            id="outlined-textarea"
                            //label={props.label}
                            //placeholder={props.label}
                            multiline
                            //onChange={props.handleInput}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
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
                <UploadTitle title="Create Function" />
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

                      {/** Start Input Variables */}
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
                                      Input Variables
                                    </Typography>
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
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      {/** End Input Variables */}

                      {/** Start Input References */}
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
                                      Input Objects
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Button onClick={addRef}>
                                    <AddCircleOutlineIcon
                                      sx={{ mt: 0.5 }}
                                      fontSize="large"
                                    />
                                  </Button>
                                </Grid>
                                {showRefs()}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      {/** End Input References */}

                      {/** Start Execution */}

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
                              <Grid item xs={12} sm container>
                                <FormControl>
                                  <FormLabel id="demo-controlled-radio-buttons-group">
                                    Execution
                                  </FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={executionType}
                                    onChange={handleExecutionTypeChange}
                                  >
                                    <FormControlLabel
                                      value="single"
                                      control={<Radio />}
                                      label="Single"
                                    />
                                    <FormControlLabel
                                      value="dataFlow"
                                      disabled
                                      control={<Radio />}
                                      label={
                                        <>
                                          <Typography>
                                            {/** 
                                             * 
                                              <Button
                                              onClick={() => {
                                                setExecutionType("dataFlow");
                                                addFunction();
                                              }}
                                            >
                                              <AddCircleOutlineIcon />
                                            </Button>
                                             * 
                                             */}
                                            Data Flow
                                          </Typography>
                                        </>
                                      }
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      {/** End Execution */}

                      {executionType === "single" && (
                        <InputBox
                          title="Docker Image URL"
                          label="Docker Image URL"
                          handleInput={handleDockerURLChange}
                        />
                      )}
                      {executionType === "dataFlow" && <>{renderFunctions()}</>}
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
                      <BackCreate
                        handleSubmit={handleCreateFunc}
                        backDisabled={false}
                        submitDisabled={false}
                        submitTitle="Create Function"
                        goBackTo="/sp-function-list"
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
