import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ObjectReference: React.FC<{
  item: string;
  handleObjRefChange: (index: number, value: string) => void;
  index: number;
  className: string;
}> = (props) => {
  const [objects, setObjects] = useState<any>([]);
  const getObjects = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/classes/"+ props.className +"/objects?limit=1337"
    );
    setObjects(
      res.data.items.filter((item: any) => item.embeddedRecord !== undefined)
    );
  };

  useEffect(() => {
    getObjects();
  }, [5]);
  const renderObjects = objects.map((item: any) => (
    <MenuItem value={item.id}>
      {item.embeddedRecord.title}
    </MenuItem>
  ));

  return (
    <>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Object Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.item}
            label="Object Name"
            onChange={(event) => {
              props.handleObjRefChange(props.index, event.target.value);
            }}
          >
            {renderObjects}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default ObjectReference;
