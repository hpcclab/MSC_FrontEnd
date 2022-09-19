import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewerHome from "./pages/Consumers/ViewerHome";
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Providers/Dashboard";
import UploadFiles from "./pages/Providers/Files/UploadFiles";
import ViewFiles from "./pages/Providers/Files/ViewFiles";
import UploadFunctions from "./pages/Providers/Functions/UploadFunctions";
import ViewFunctions from "./pages/Providers/Functions/ViewFunctions";
import UploadClasses from "./pages/Providers/Classes/UploadClasses";
import ViewClasses from "./pages/Providers/Classes/ViewClasses";
import ViewObjects from "./pages/Providers/Objects/ViewObjects";
import UploadVideos from "./pages/Providers/Videos/UploadVideos";
import ViewVideos from "./pages/Providers/Videos/ViewVideos";
import { Switch } from "@mui/material";
import ViewerPlayVideo from "./pages/Consumers/ViewerPlayVideo";
import ViewSingleClass from "./pages/Providers/Classes/ViewSingleClass";
import UploadObjects from "./pages/Providers/Objects/UploadObjects";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewerHome />} />
          <Route path="/sp-dashboard" element={<Dashboard />} />
          <Route path="/sp-video-list" element={<ViewVideos />} />
          <Route path="/sp-upload-video" element={<UploadVideos />} />
          <Route path="/sp-file-list" element={<ViewFiles />} />
          <Route path="/sp-upload-file" element={<UploadFiles />} />
          <Route path="/sp-function-list" element={<ViewFunctions />} />
          <Route path="/sp-upload-function" element={<UploadFunctions />} />
          <Route path="/sp-class-list" element={<ViewClasses />} />
          <Route path="/sp-object-list" element={<ViewObjects />} />
          <Route path="/sp-upload-object" element={<UploadObjects />} />
          <Route path="/sp-upload-class" element={<UploadClasses />} />
          <Route path="/v-player/:videoId" element={<ViewerPlayVideo />} />
          <Route path="/sp-class/:className" element={<ViewSingleClass />} />
          <Route path="*" element={<ViewerHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
