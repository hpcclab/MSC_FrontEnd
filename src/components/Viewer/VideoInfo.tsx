import { Paper, Grid, Typography } from "@mui/material";
import { title } from "process";
import React from "react";

const VideoInfo: React.FC<{ title: string; desc: string }> = (props) => {
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
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {props.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.desc}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default VideoInfo;
