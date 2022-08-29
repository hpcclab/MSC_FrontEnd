import { Grid, Pagination } from "@mui/material";
import { count } from "console";
import React from "react";

const PaginationSection: React.FC<{
  count: number;
  currentPage: number;
  handleChange: (e: any, p: any) => void;
}> = (props) => {
  return (
    <>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Pagination
            //sx={{ml:69}}
            count={props.count}
            size="large"
            page={props.currentPage}
            variant="outlined"
            shape="rounded"
            onChange={props.handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaginationSection;
