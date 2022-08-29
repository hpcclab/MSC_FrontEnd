import { Button } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DropDown: React.FC<{ toggle: boolean; onToggle: () => void }> = (
  props
) => {
  return (
    <>
      {!props.toggle ? (
        <Button>
          <KeyboardArrowUpIcon onClick={props.onToggle} fontSize="large" />
        </Button>
      ) : (
        <Button>
          <KeyboardArrowDownIcon onClick={props.onToggle} fontSize="large" />
        </Button>
      )}
    </>
  );
};

export default DropDown;
