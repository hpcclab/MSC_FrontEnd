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
  const handleCreateFunc = () => {
    console.log({
      functions: [
        {
          access: "PUBLIC",
          defaultArgs: {},
          forwardRecords: [],
          function: name,
          name: name,
        },
      ],
    });
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
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Input Point Name
                          </Typography>
                          <TextField
                            fullWidth
                            id="outlined-textarea"
                            label="Input Input Name"
                            placeholder="Fill"
                            multiline
                            onChange={(e) => {
                              changeFunction(index, 1, e.target.value);
                            }}
                          />
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
                          <TextField
                            fullWidth
                            id="outlined-textarea"
                            label="Input Variable Name"
                            placeholder="Fill"
                            multiline
                            onChange={(e) => {
                              changeFunction(index, 1, e.target.value);
                            }}
                          />
                          <TextField
                            fullWidth
                            id="outlined-textarea"
                            label="Input Variable Name"
                            placeholder="Fill"
                            multiline
                            onChange={(e) => {
                              changeFunction(index, 2, e.target.value);
                            }}
                          />
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Input References
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              File
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={item[0]}
                              label="File Name"
                              onChange={(event) => {
                                changeFunction(index, 3, event.target.value);
                              }}
                            >
                              {renderOaaSFunctions}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Object
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={item[4]}
                              label="Object Name"
                              onChange={(event) => {
                                changeFunction(index, 4, event.target.value);
                              }}
                            >
                              {renderOaaSFunctions}
                            </Select>
                          </FormControl>
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Output Point Name
                          </Typography>
                          <TextField
                            fullWidth
                            id="outlined-textarea"
                            label="Input Output Name"
                            placeholder="Fill"
                            multiline
                            onChange={(e) => {
                              changeFunction(index, 1, e.target.value);
                            }}
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
                                      Input References
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

                      <BackCreate
                        handleSubmit={handleCreateFunc}
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
