import { Paper, Grid, ButtonBase, Typography } from "@mui/material";
import React from "react";
import Thumbnail from "./components/Thumbnail";

const ViewerVideoItem: React.FC<{
  thumbnail: string | undefined | null;
  title: string;
  desc: string;
  videoId: string;
}> = (props) => {
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
          <Grid item>
            <ButtonBase
              sx={{ width: 196, height: 112 }}
              href={"/v-player/" + props.videoId}
            >
              <Thumbnail thumbnail={props.thumbnail} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  noWrap
                  variant="h5"
                  sx={{ width: 220, fontWeight: "bold" }}
                >
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

export default ViewerVideoItem;
