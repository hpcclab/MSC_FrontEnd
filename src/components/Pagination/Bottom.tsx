import { PropaneSharp } from "@mui/icons-material";
import { Grid, Pagination, Button } from "@mui/material";
import { count } from "console";
import React from "react";
import PaginationSection from "./components/PaginationSection";
import UploadButton from "./components/UploadButton";

const Bottom: React.FC<{
  count: number;
  currentPage: number;
  handleChange: (e: any, p: any) => void;
  redirect: string;
  canUpload: boolean;
  type: string;
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
          {props.canUpload && <Button variant="contained" href={props.redirect}> Add new {props.type}</Button>}
        </Grid>
      </Grid>
    </>
  );
};

export default Bottom;
