import {
  Grid,
  Typography,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const FillDownInput: React.FC<{
  handleAddition: () => void;
  title: string;
  value: string[][];
  handleDeletion: (index: number) => void;
  selectData: any;
  dropdownName: string;
  handleChange: (index: number, index2: number, value: string) => void;
}> = (props) => {
  const renderSelections = props.selectData.map((item: any) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));

  const renderItems = () => {
    return (
      <>
        {props.value.map((item: any, index: number) => {
          return (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Divider></Divider>
                      <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id="outlined-textarea"
                        label="Context Element Name (Fill)"
                        placeholder="Context Element Name (Fill)"
                        value={item[0]}
                        onChange={(e) => {
                          props.handleChange(index, 0, e.target.value!);
                        }}
                        multiline
                      />
                      <Typography>with default value</Typography>
                      <FormControl fullWidth sx={{mt:0.5}}>
                        <InputLabel id="demo-simple-select-label" >
                          {props.dropdownName}
                        </InputLabel>
                        <Select
                        
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item[1]}
                          label={props.dropdownName}
                          onChange={(event) => {
                            props.handleChange(index, 1, event.target.value);
                          }}
                        >
                          {renderSelections}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Divider></Divider>
                    <Button
                      onClick={() => {
                        props.handleDeletion(index);
                      }}
                      sx={{ mt: 1 }}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
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
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h3">{props.title}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button onClick={props.handleAddition}>
            <AddCircleOutlineIcon sx={{ mt: 0.5 }} fontSize="large" />
          </Button>
        </Grid>
        {renderItems()}
      </Grid>
    </>
  );
};

export default FillDownInput;
