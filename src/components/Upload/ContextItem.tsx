import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Thumbnail from "../Items/components/Thumbnail";
import DropDown from "../Items/components/DropDown";

const ContextItem: React.FC<{
  contextData: any[];
  toggle: boolean;
  onToggle: () => void;
  handleSelection: (index: number, value: string) => void;
  title: string;
  isDropdown: boolean;
  selectData: any[];
}> = (props) => {
  const renderSelections = props.selectData.map((item: any) => (
    <MenuItem value={item.embeddedRecord.title}>
      {item.embeddedRecord.title}
    </MenuItem>
  ));

  const showItems = () => {
    return (
      <>
        {props.contextData.map((item: any, index: number) => {
          return (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      {props.isDropdown && (
                        <>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Default {props.title} Name
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={item}
                              label="Function"
                              onChange={(event) => {
                                props.handleSelection(
                                  index,
                                  event.target.value
                                );
                              }}
                            >
                              {renderSelections}
                            </Select>
                          </FormControl>
                        </>
                      )}
                      {
                        !props.isDropdown && (
                          <>
                          <TextField
                            fullWidth
                            id="outlined-textarea"
                            label="Default Variable Value"
                            placeholder="Default Variable Value"
                            multiline
                            onChange={(e) => {
                              props.handleSelection(index, e.target.value);
                            }}
                          />
                        </>
                        )
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h5">{props.title}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <DropDown toggle={props.toggle} onToggle={props.onToggle} />
          </Grid>
          {props.toggle && <>{showItems()}</>}
        </Grid>
      </Grid>
    </>
  );
};

export default ContextItem;
