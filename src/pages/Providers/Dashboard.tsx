import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@emotion/react";
import {
  Box,
  CssBaseline,
  Container,
  Grid,
  createTheme,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import SingleItem from "../../components/Items/SingleItem";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Viewer/Player";
import Bottom from "../../components/Pagination/Bottom";
import VideoInfo from "../../components/Viewer/VideoInfo";

const Dashboard = () => {
  const handleObjPageChange = (e: any, p: any) => {
    setCurrentObjPage(p);
  };
  const [totalItems, setTotalItems] = useState(1);
  const objItemCount: number = 5;
  const objPageNumbers = Math.ceil(totalItems / objItemCount);
  const [currentObjPage, setCurrentObjPage] = useState(1);
  const [objects, setObjects] = useState<any>([]);
  const getTotalItems = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/objects?limit=" +
        objItemCount +
        "&offset=" +
        (currentObjPage - 1) * objItemCount
    );
    setTotalItems(res.data.total);
    setObjects(
      res.data.items.filter((item: any) => item.embeddedRecord !== undefined)
    );
  };
  useEffect(() => {
    getTotalItems();
  }, [currentObjPage]);
  const renderObjects = () => {
    try {
      return (
        <>
          {objects.map((item: any) => {
            return (
              <>
                <SingleItem
                  title={item.embeddedRecord.title}
                  desc={item.embeddedRecord.desc}
                  state={item.cls}
                  videoId={item.id}
                  height={115}
                  thumbnail={null}
                />
              </>
            );
          })}
        </>
      );
    } catch (error) {}
  };

  const handleFuncPageChange = (e: any, p: any) => {
    setCurrentFuncPage(p);
  };

  const [totalFuncItems, setTotalFuncItems] = useState(1);
  const funcItemCount: number = 5;
  const funcPageNumbers = Math.ceil(totalFuncItems / funcItemCount);
  const [currentFuncPage, setCurrentFuncPage] = useState(1);
  const [functions, setFunctions] = useState<any>([]);
  const getFunctions = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/functions?limit=" +
        funcItemCount +
        "&offset=" +
        (currentFuncPage - 1) * funcItemCount
    );
    setTotalFuncItems(res.data.total);
    setFunctions(res.data.items);
  };

  useEffect(() => {
    getFunctions();
  }, [currentFuncPage]);

  const renderFunctions = () => {
    try {
      return (
        <>
          {functions.map((item: any) => {
            return (
              <>
                <SingleItem
                  title={item.name}
                  desc={item.outputCls}
                  state={item.type}
                  videoId={item.id}
                  height={115}
                  thumbnail={null}
                />
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
          <Navbar isViewer={false} section="dashboard" url="" />
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
              <Grid container spacing={3}>
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  {/** Components go here */}
                  <Grid sx={{ mt: 8, height: 825 }}>
                    {/** Page contents go here */}

                    <Grid container spacing={3}>
                      {/* Chart */}

                      <Grid item xs={12} sm container>
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
                                gutterBottom
                                variant="h4"
                                component="div"
                              >
                                Objects
                              </Typography>
                              {objects.length !== 0 ? (
                                <>
                                  {renderObjects()}
                                  <Bottom
                                    count={objPageNumbers}
                                    currentPage={currentObjPage}
                                    handleChange={handleObjPageChange}
                                    redirect="/"
                                    canUpload={false}
                                    type=""
                                  />
                                </>
                              ) : (
                                <>
                                  <VideoInfo
                                    title="There are no objects created"
                                    desc="Try creating the very first object!"
                                  />
                                </>
                              )}

                              <Button
                                fullWidth
                                href="/sp-upload-object"
                                variant="contained"
                                sx={{ mt: 2 }}
                              >
                                Create New Object
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm container>
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
                                gutterBottom
                                variant="h4"
                                component="div"
                              >
                                Functions
                              </Typography>
                              {functions.length !== 0 ? (
                                <>
                                  {renderFunctions()}
                                  <Bottom
                                    count={funcPageNumbers}
                                    currentPage={currentFuncPage}
                                    handleChange={handleFuncPageChange}
                                    redirect="/"
                                    canUpload={false}
                                    type=""
                                  />
                                </>
                              ) : (
                                <>
                                  <VideoInfo
                                    title="There are no functions created"
                                    desc="Try creating the very first function!"
                                  />
                                </>
                              )}

                              <Button
                                fullWidth
                                href="/sp-upload-function"
                                variant="contained"
                                sx={{ mt: 2 }}
                              >
                                Create New Function
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
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

export default Dashboard;
