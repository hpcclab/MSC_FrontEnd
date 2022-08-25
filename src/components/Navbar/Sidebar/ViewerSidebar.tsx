import { Paper, Grid, ButtonBase, Typography, styled } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const ViewerSidebar = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:8088/api/classes/example.video/objects?limit=100&offset=27');
            setData(res.data.items);
            setLoading(false);
        }
        fetchPosts();
    }, []);
    const renderThumbnail = (video: any) => {
        if (video.embeddedRecord.thumbnail !== '') {
            return (
                <>
                <Img alt="complex" src={video.embeddedRecord.thumbnail} />
                </>
            )
        }
        else {
            return (
                <>
                <Img alt="complex" src="https://i.ytimg.com/vi/BH4IMzxBg14/maxresdefault.jpg" />
                </>
            )
        }
    }
    const renderData = (data: any) => {
        return (
            <div>
                {data.map((video: any) => {
                    if (video.access == "PUBLIC") {
                    return (
                        <Paper
                            variant="outlined"
                            sx={{
                                
                                p: 2,
                                margin: 'auto',
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <Grid container spacing={2} >
                                <Grid item>
                                    <ButtonBase sx={{ width: 196, height: 112 }} onClick={()=>{console.log(video)}}>
                                        {renderThumbnail(video)}
                                    </ButtonBase>
                                </Grid>
                                <Grid  item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs >
                                            <Typography noWrap variant="h5" sx={{width:220, fontWeight: 'bold'}}>
                                                {video.embeddedRecord.title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {video.embeddedRecord.desc}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                })}
            </div>
        )
    }
    return (
        <>
        </>
    )
}

export default ViewerSidebar;