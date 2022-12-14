import { Paper, Grid, ButtonBase, Typography, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import Thumbnail from "./components/Thumbnail";

const FileItem: React.FC<{
  title: string;
  desc: string;
  state: string;
  objectId: string;
  height: number;
}> = (props) => {
  const handleDownloadRequest = () => {
    const link = document.createElement("a");
    link.setAttribute(
      "href",
      (window as any).ENV.CDS_API + "/" + props.objectId + "/file"
    );
    link.setAttribute("download", props.title);
    link.setAttribute("target", "_blank");
    link.click();
  };

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
                <Typography gutterBottom variant="h4" component="div">
                  {props.title}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ height: 20 }}>
                  {props.desc}
                </Typography>
                <Typography variant="subtitle2" sx={{ height: 0 }}>
                  {props.objectId}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="div" sx={{ mt: 2.5, ml: 10 }}>
                {props.state}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="success"
                onClick={handleDownloadRequest}
                variant="contained"
                disableElevation
                sx={{ ml: 3, mt: 1, float: 'right' }}
              >
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Download
                </Typography>
              </Button>
              <Grid item>
                <Button
                  color="error"
                  onClick={() => {
                    if (
                      window.confirm("Do you really want to delete this item?")
                    ) {
                      axios
                        .delete(
                          (window as any).ENV.OC_API +
                            "/api/objects/" +
                            props.objectId
                        )
                        .then(function (r) {
                          window.location.reload();
                        });
                    }
                  }}
                  variant="contained"
                  disableElevation
                  sx={{ ml: 3, mt: 1 }}
                >
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Delete
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FileItem;
