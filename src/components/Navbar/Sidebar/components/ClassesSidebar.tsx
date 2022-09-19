import { Paper, Grid, Button, Typography } from "@mui/material";
import React from "react";

const ClassesSidebar: React.FC<{
  name: string | undefined;
  redirect: string;
  url: string | undefined;
}> = (props) => {
  return (
    <>
      <Paper
        sx={{
          width: 240,
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2} sx={{ ml: 1, width: 240 }}>
          <Button href={props.redirect} disabled={props.name === props.url}>
            <Typography noWrap>{props.name}</Typography>
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default ClassesSidebar;
