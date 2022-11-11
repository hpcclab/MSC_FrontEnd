import { Box, Button, List, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClassesSidebar from "./components/ClassesSidebar";
import axios from "axios";

import DropDown from "../../Items/components/DropDown";

const ProviderSidebar: React.FC<{ section: string|undefined; url: string|undefined }> = (props) => {
  const [showClasses, setShowClasses] = useState(true);
  const [data, setData] = useState<any>([]);
  const getTotalItems = async () => {
    const res = await axios.get(
      (window as any).ENV.OC_API + "/api/classes?limit=10000&offset=0"
    );
    setData(res.data.items.filter((item: any) => item._key !== "example.video.hls" && item._key !== "builtin.basic.file"));
  };

  useEffect(() => {
    if (showClasses)
      getTotalItems();
  }, [showClasses]);

  const handleToggleDropdown = () => {
    setShowClasses(!showClasses);
  }
  
  const renderClasses = () => {
    return (
      <>
      {
        data.map((item: any) => {
          return (
            <ClassesSidebar name={item._key} url={props.url} redirect={"/sp-class/"+item._key} />
          )
        })
      }
      </>
    )
  }

  return (
    <>
      <Box sx={{ height: 600 }}>
        <List component="nav">
          <Paper variant="outlined">
            <Button
              href="/sp-dashboard"
              disabled={props.section === "dashboard"}
            >
              <Typography variant="h4">Dashboard</Typography>
            </Button>
          </Paper>
          
          <Paper variant="outlined">
            <Button
              href="/sp-function-list"
              disabled={props.section === "functions"}
            >
              <Typography variant="h4">Functions</Typography>
            </Button>
          </Paper>
          <Paper variant="outlined">
            <Button
              href="/sp-class-list"
              disabled={props.section === "classes"}
            >
              <Typography variant="h4">Classes</Typography>
            </Button>
          </Paper>
          
          <Paper variant="outlined">
            <Button
              href="/sp-object-list"
              disabled={props.section === "objects"}
            >
              <Typography variant="h4">Objects</Typography>
            </Button>
            <DropDown toggle={showClasses} onToggle={handleToggleDropdown} />
          </Paper>
          {showClasses && (
            <Box sx={{ height: 420, overflow: "auto" }}>
              <List component="nav">
              <ClassesSidebar name="example.video.hls" url={props.url} redirect={"/sp-video-list"} />
              <ClassesSidebar name="builtin.basic.file" url={props.url} redirect={"/sp-file-list"} />
                {renderClasses()}
              </List>
            </Box>
          )}
        </List>
      </Box>
    </>
  );
};

export default ProviderSidebar;
