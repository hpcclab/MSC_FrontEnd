import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, CssBaseline, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player";
import VideoInfo from "../../components/VideoInfo";

type urlParams = {
  videoId: string;
};

const ViewerPlayVideo = () => {
  const videoId = useParams<urlParams>().videoId;
  const [videoData, setVideoData] = useState<any>([]);
  const [taskStatus, setTaskStatus] = useState("");

  const getVideoInfo = async () => {
    const res = await axios.get(
      "http://oc.oaas.10.131.36.40.nip.io/api/objects/" + videoId
    );
    setVideoData(res.data);
    setTaskStatus(res.data.status.taskStatus);
  };

  useEffect(() => {
    getVideoInfo();
    //console.log(videoData)
  }, [videoId]);

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/** Navbar and Sidebar */}
          <Navbar isViewer={true} section="viewer" url=""/>
          {/** Page Content */}
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ mt: 8 }}>
              <Grid item xs={12} alignItems="center" justifyContent="center">
                {/** Components go here */}
                {taskStatus === "SUCCEEDED" && (
                  <>
                    <Player videoId={videoId}/>
                    <VideoInfo title={videoData.embeddedRecord.title} desc={videoData.embeddedRecord.desc} /> 
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ViewerPlayVideo;
