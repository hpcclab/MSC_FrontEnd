import { Grid, Paper, Typography, TextField } from "@mui/material";
import React from "react";

const InputBox: React.FC<{
  title: string;
  handleInput: (e: any) => void;
  label: string;
  required: string;
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
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography display="inline" variant="h4" component="div">
                {props.title} 
              </Typography>
              <Typography display="inline" variant="h4" color={"red"}>  {props.required}</Typography>
              <TextField
                fullWidth
                id="outlined-textarea"
                label={props.label}
                placeholder={props.label}
                multiline
                onChange={props.handleInput}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default InputBox;
