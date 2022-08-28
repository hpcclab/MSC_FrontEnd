import { Grid, Button } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const UploadButton: React.FC<{ redirect: string }> = (props) => {
  return (
    <>
      <Grid item>
        <Button 
        size="large" 
        href={props.redirect}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </Button>
      </Grid>
    </>
  );
};

export default UploadButton;
