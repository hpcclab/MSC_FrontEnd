import { Paper, Grid, ButtonBase, Typography } from "@mui/material";
import React from "react";
import Thumbnail from "./Thumbnail";

const SingleItem: React.FC<{
  title: string;
  desc: string;
  state: string;
  thumbnail: null | string;
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
          {props.thumbnail !== null && (
            <Grid item>
              <ButtonBase sx={{ width: 196, height: 112 }} href="/player">
                <Thumbnail thumbnail={props.thumbnail} />
              </ButtonBase>
            </Grid>
          )}

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  {props.title}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ height: 70 }}>
                  {props.desc}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="div" sx={{ mt: 4, ml: 10 }}>
                {props.state}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SingleItem;
