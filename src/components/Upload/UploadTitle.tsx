import { Paper, Typography } from "@mui/material";
import React from "react";

const UploadTitle: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          margin: "auto",
          //flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Typography variant="h2">{props.title}</Typography>
      </Paper>
    </>
  );
};

export default UploadTitle;
