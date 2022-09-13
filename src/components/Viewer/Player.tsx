import React from "react";
import { FormControl, Button, TextField, Stack, Slider } from "@mui/material";
import * as yup from "yup";
import { useState, useCallback, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Hls from "hls.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeDown from "@mui/icons-material/VolumeDown";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import axios from "axios";

interface IState {
  video: {
    vid: number;
    title: string;
    url: string;
    thumbnail: string;
    description?: string;
  };
}

interface fInput {
  playbackRate: Number;
}

const Player: React.FC<{videoId: string | undefined}> = (props) => {
  // validate input

  // Video Source
  const [src, setSrc] = useState(
    "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8"
  );

  const [video, setVideo] = useState<IState["video"]>();
  const [hls, setHls] = useState(new Hls());
  const videoEl = useRef<any>(null);
  const [posts, setPosts] = useState();
  const [currentVid, setCurrentVid] = React.useState<string | undefined>("");

  const [loaded, setLoaded] = useState(true);
  React.useEffect(() => {
    if (currentVid != props.videoId && props.videoId != '') {
      //console.log(5);
      setCurrentVid(props.videoId);
      setHls(new Hls());
      //console.log(hls);
      //console.log(videoEl.current);
      if (hls == null) {
        setHls(new Hls());
      }
      if (videoEl.current) {
        //console.log(hls);
        //console.log(videoEl.current, 5);
        if (hls != null) {
          //console.log(2);
          hls.loadSource(
            //src
            (window as any).ENV.CDS_API + 'oal/'+ props.videoId +'/video.m3u8'
            //test
            //"file:../../1/video.m3u8"
          );
          hls.attachMedia(videoEl.current);
          videoEl.current.volume = volume / 100;
          //videoEl.current.playbackRate = fInput.playbackRate;
          setTime(0);
          hls.subtitleDisplay = subtitle;
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            videoEl.current.play();
          });
        }
      }
      return () => {
        /*
      if (hls) {
        hls.destroy();
      }
      */
        // most likely cause of issues
        //setHls(null)
      };
    }
  }, [loaded]);

  // Change Playback Rate
  const submitFunction: SubmitHandler<fInput> = (data) => {
    console.log(data);
    setHls(new Hls());
    videoEl.current.playbackRate = data.playbackRate;
  };

  // Change Audio Levels
  const [volume, setVolume] = React.useState(30);
  // handle slider change
  const handleAudioChange = (event: any, newVolume: any) => {
    setVolume(newVolume);
    videoEl.current.volume = newVolume / 100;
    //videoEl.current.currentTime = newValue/100*videoEl.current.duration;
    //console.log(videoEl.current.currentTime);
  };

  // Change Current Video Time
  const [time, setTime] = React.useState(0);
  const handleTimeChange = (event: any, newTime: any) => {
    setTime(newTime);
    videoEl.current.currentTime = (newTime / 100) * videoEl.current.duration;
    console.log(
      (videoEl.current.currentTime / videoEl.current.duration) * 100,
      (newTime / 100) * videoEl.current.duration
    );
  };

  // Subtitle
  const [subtitle, setSubtitle] = React.useState(false);

  return (
    <>
      <FormControl fullWidth>
        <video ref={videoEl} controls />
        
      </FormControl>
    </>
  );
};

export default Player;
/*
        <Slider aria-label="Time" value={time} onChange={(handleTimeChange)} />

*/

/*
<form onSubmit={handleSubmit(submitFunction)} >
          <TextField {...register('playbackRate' as const)} placeholder="Input Desired Playback Speed"
            error={Boolean(errors['playbackRate'])}
          ></TextField>
          <Button type="submit">Assign</Button>
        </form>

*/
/*
<Button startIcon={<SubtitlesIcon />} variant="contained" onClick={() => {
            if (subtitle) {
              setSubtitle(!subtitle)
              setOnoff('off')
            } else {
              setSubtitle(!subtitle)
              setOnoff('on')
            }
            if (hls == null) {
              setHls(new Hls())
            }
          }}>Subtitles {onoff}</Button>
*/

/*
<Button 
          startIcon={<FullscreenIcon />} 
          variant="contained" 
          onClick={() => {
            if (videoEl.current.requestFullscreen) {
              videoEl.current.requestFullscreen();
            } else if (videoEl.current.msRequestFullscreen) {
              videoEl.current.msRequestFullscreen();
            } else if (videoEl.current.mozRequestFullScreen) {
              videoEl.current.mozRequestFullScreen();
            } else if (videoEl.current.webkitRequestFullscreen) {
              videoEl.current.webkitRequestFullscreen();
            }
          }
          }
          >Full Screen</Button>

*/

/**
 * 
 * <Stack spacing={2} direction="row" sx={{ mt: 1 }} alignItems="center">
          <Button
            startIcon={<PlayArrowIcon />}
            variant="contained"
            onClick={() => {
              videoEl.current.play();
            }}
          >
            Play
          </Button>
          <Button
            startIcon={<PauseIcon />}
            variant="contained"
            onClick={() => {
              videoEl.current.pause();
            }}
          >
            Pause
          </Button>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={handleAudioChange}
          />
          <VolumeUp />
        </Stack>
 */