import { Box, Button, List, Paper, Typography } from '@mui/material';
import React from 'react';

const ProviderSidebar: React.FC<{section: string}> = (props) => {
    return (
        <>
        <Box sx={{ height: 600 }}>
          <List component="nav">
            <Paper variant="outlined">
              <Button href="/sp-dashboard" disabled={props.section === "dashboard"}>
                <Typography variant="h4">Dashboard</Typography>
              </Button>
            </Paper>
            <Paper variant="outlined">
              <Button href="/sp-video-list" disabled={props.section === "videos"} >
                <Typography variant="h4">Videos</Typography>
              </Button>
            </Paper>
            <Paper variant="outlined">
              <Button href="/sp-file-list" disabled={props.section === "files"}>
                <Typography variant="h4">Files</Typography>
              </Button>
            </Paper>
            <Paper variant="outlined">
              <Button href="/sp-function-list" disabled={props.section === "functions"}>
                <Typography variant="h4">Functions</Typography>
              </Button>
            </Paper>
            <Paper variant="outlined">
              <Button href="/sp-object-list" disabled={props.section === "objects"}>
                <Typography variant="h4">Objects</Typography>
              </Button>
            </Paper>
            <Box sx={{ height: 420, overflow: "auto" }}>
              <List component="nav"></List>
            </Box>
          </List>
        </Box>
        </>
    )
}

export default ProviderSidebar;