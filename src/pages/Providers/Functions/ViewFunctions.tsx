import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleItem from "../../../components/Items/SingleItem";
import Navbar from "../../../components/Navbar/Navbar";
import Bottom from "../../../components/Pagination/Bottom";
import Player from "../../../components/Viewer/Player";
import VideoInfo from "../../../components/Viewer/VideoInfo";

const ViewFunctions = () => {
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
  }, [currentPage]);

  const renderItems = () => {
    try {
      return (
        <>
          {data.map((item: any) => {
            return (
              <>
                <SingleItem
                  title={item._key}
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
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} alignItems="center" justifyContent="center">
                  {/** Components go here */}
                  <Grid sx={{ mt: 8, mb:5 }}>
                    {/** Page contents go here */}
                    {totalItems !== 0 ? <>{renderItems()}</> : <><VideoInfo
                          title="There are no functions created"
                          desc="Try creating the very first function!"
                        /></>}
                  </Grid>
                  {/** Pagination and Upload Button */}
                  <Bottom
                    count={pageNumbers}
                    currentPage={currentPage}
                    handleChange={handlePageChange}
                    redirect="/sp-upload-function"
                    canUpload={true}
                    type="Function"
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
export default ViewFunctions;
