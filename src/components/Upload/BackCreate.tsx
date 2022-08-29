import { Grid, Button } from "@mui/material";
import React from "react";

const BackCreate: React.FC<{
  handleSubmit: () => void;
  backDisabled: boolean;
  submitDisabled: boolean;
  submitTitle: string;
  goBackTo: string;
}> = (props) => {
  return (
    <>
      <Grid item xs>
        <Button
          disabled={props.backDisabled}
          color="error"
          href={props.goBackTo}
          variant="contained"
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          fullWidth
        >
          Back
        </Button>
      </Grid>
      <Grid item xs>
        <Button
          disabled={props.submitDisabled}
          onClick={props.handleSubmit}
          variant="contained"
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          fullWidth
        >
          {props.submitTitle}
        </Button>
      </Grid>
    </>
  );
};

export default BackCreate;
