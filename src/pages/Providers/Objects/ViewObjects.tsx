import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleItem from "../../../components/Items/SingleItem";
import Navbar from "../../../components/Navbar/Navbar";
import Bottom from "../../../components/Pagination/Bottom";
import Player from "../../../components/Viewer/Player";
import VideoInfo from "../../../components/Viewer/VideoInfo";

const ViewObjects = () => {
  const handlePageChange = (e: any, p: any) => {
    setCurrentPage(p);
  };

  const [totalItems, setTotalItems] = useState(1);
  const itemCount: number = 5;
  const pageNumbers = Math.ceil(totalItems / itemCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const getTotalItems = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/objects?limit=" +
        itemCount +
        "&offset=" +
        (currentPage - 1) * itemCount
    );
    setTotalItems(res.data.total);
    setData(
      res.data.items.filter((item: any) => item.embeddedRecord !== undefined)
    );
  };

  useEffect(() => {
    getTotalItems();
  }, [currentPage]);

  const renderItems = () => {
    try {
      return (
        <>
          {data.map((item: any) => {
            return (
              <>
                <SingleItem
                  title={item.embeddedRecord.title}
                  desc={item.embeddedRecord.desc}
                  state={item.cls}
                  videoId={item.id}
                  height={115}
                  thumbnail={item.embeddedRecord.thumbnail}
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
          <Navbar isViewer={false} section="objects" url="" />
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
                  <Grid sx={{ mt: 8, mb: 5 }}>
                    {/** Page contents go here */}
                    {totalItems !== 0 ? (
                      <>{renderItems()}</>
                    ) : (
                      <>
                        <VideoInfo
                          title="There are no objects created"
                          desc="Try creating the very first object!"
                        />
                      </>
                    )}
                  </Grid>
                  {/** Pagination and Upload Button */}
                  <Bottom
                    count={pageNumbers}
                    currentPage={currentPage}
                    handleChange={handlePageChange}
                    redirect="/sp-upload-object"
                    canUpload={true}
                  />
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

export default ViewObjects;
