import {
  Paper,
  Grid,
  ButtonBase,
  Typography,
  styled,
  Input,
} from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ViewerVideoItem from "../../Items/ViewerVideoItem";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const ViewerSidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "http://oc.oaas.10.131.36.40.nip.io/api/classes/example.video.hls/objects?limit=10000&offset=0"
      );
      setData(res.data.items);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const [input, setInput] = useState("");

  const renderData = () => {
    return (
      <>
        {data.map((video: any) => {
          if (video.status.taskStatus == "SUCCEEDED") {
            return (
              <ViewerVideoItem
                videoId={video.id}
                thumbnail={video.embeddedRecord.thumbnail}
                title={video.embeddedRecord.title}
                desc={video.embeddedRecord.desc}
              />
            );
          }
        })}
      </>
    );
  };
  return (
    <>
      <Input
        sx={{ width: 240 }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></Input>
      {renderData()}
    </>
  );
};

export default ViewerSidebar;
