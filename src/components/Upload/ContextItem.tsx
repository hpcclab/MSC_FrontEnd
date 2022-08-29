import { Grid, Typography, Button } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ContextItem: React.FC<{}> = (props) => {

    return (
        <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5">Files</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  console.log(5)
                }}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </>
    )
}

export default ContextItem;