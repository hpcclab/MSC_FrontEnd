import { Paper, Grid, ButtonBase, Typography, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import Thumbnail from "./components/Thumbnail";

const SingleItem: React.FC<{
  title: string;
  desc: string;
  state: string;
  thumbnail: null | string | undefined;
  videoId: string;
  height: number;
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
          {!(props.thumbnail === undefined || props.thumbnail === null) && (
            <Grid item>
              <ButtonBase
                disabled={props.state != "SUCCEEDED"}
                sx={{ width: 196, height: 112 }}
                //onClick={()=>{console.log((window as any).ENV.OC_API)}}
                href={"/v-player/" + props.videoId}
              >
                <Thumbnail thumbnail={props.thumbnail} />
              </ButtonBase>
            </Grid>
          )}

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography noWrap gutterBottom variant="h4" component="div">
                  {props.title}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ height: 60 }}>
                  {props.desc}
                </Typography>
                {
                (props.videoId !== "" && props.videoId !== null && props.videoId !== undefined)  && (
                  <Typography variant="subtitle2" sx={{ height: 5 }}>
                    Id - {props.videoId}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid item justifyContent="flex-end">
              {props.state !== "TASK" && props.state !== "LOGICAL" && (
                <>
                  <Button
                    sx={{float: 'right'}}
                    color="error"
                    disabled={
                      (props.title === "example.video.mp4" ||
                        props.title === "example.video.hls" ||
                        props.title === "builtin.basic.file") &&
                      props.state === "SIMPLE"
                    }
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      if (
                        window.confirm(
                          "Do you really want to delete this item?"
                        )
                      ) {
                        if (props.videoId !== "") {
                          axios
                            .delete(
                              (window as any).ENV.OC_API +
                                "/api/objects/" +
                                props.videoId
                            )
                            .then(function (r) {
                              window.location.reload();
                            });
                        } else {
                          axios
                            .delete(
                              (window as any).ENV.OC_API +
                                "/api/classes/" +
                                props.title
                            )
                            .then(function (r) {
                              window.location.reload();
                            });
                        }
                      }
                    }}
                  >
                    <Typography sx={{ cursor: "pointer" }} variant="body2">
                      Delete
                    </Typography>
                  </Button>
                </>
              )}
              <Typography variant="h4" sx={{ mt: 1.5 }}>
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
