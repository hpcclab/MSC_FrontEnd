import { PropaneSharp } from "@mui/icons-material";
import { Grid, Pagination, Button } from "@mui/material";
import { count } from "console";
import React from "react";
import PaginationSection from "./components/PaginationSection";
import UploadButton from "./components/UploadButton";

const Bottom: React.FC<{
  count: number;
  currentPage: number;
  handleChange: () => void;
  redirect: string;
  canUpload: boolean;
}> = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <PaginationSection
            count={props.count}
            currentPage={props.currentPage}
            handleChange={props.handleChange}
          />
          {props.canUpload && <UploadButton redirect={props.redirect} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Bottom;
