import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Dropzone from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";

const UploadArea: React.FC<{
  setFile: React.Dispatch<React.SetStateAction<any>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
  title: string;
  acceptType: string;
}> = (props) => {
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
          <Typography variant="h5">{props.title}</Typography>
        </Paper>
        <Dropzone
          accept={props.acceptType}
          onDrop={(acceptedFiles) => {
            //console.log(acceptedFiles)
            props.setFileName(acceptedFiles[0].name);
            props.setFile(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Paper
                  sx={{
                    borderWidth: 10,
                    borderStyle: "dashed",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography align="center">
                    <AddIcon fontSize="large" sx={{ mt: 15, mb: 15 }} />
                  </Typography>
                </Paper>
              </div>
            </section>
          )}
        </Dropzone>
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
          <Typography>{props.fileName}</Typography>
        </Paper>
      </Grid>
      
    </>
  );
};

export default UploadArea;
