import React, { useState } from "react";
import {
  IconButton,
} from "@mui/material";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { VideoRoom } from "../components/VideoRoom";
import io from "socket.io-client"; 

const socket = io("http://localhost:3010");
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FBCB1C",
    },
  },
});

function JoinVideoButton({ callEnded, onCallEnded }) {
  const [joined, setJoined] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const handleJoinCall = () => {
    setJoined(true);
    setCallEnded(false);
  };

  const handleEndCall = () => {
    setJoined(false);
    //setCallEnded(true);
    setCallEnded(true);
    onCallEnded(); 
    setTimeout(() => {
      setCallEnded(false);
    }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {!joined && !callEnded && (
          <IconButton onClick={handleJoinCall}>
            <DuoOutlinedIcon sx={{ color: "green" }} />
          </IconButton>
        )}

        {joined && !callEnded && <VideoRoom onEndCall={handleEndCall} />}

        {callEnded && (
          <IconButton onClick={() => setCallEnded(false)}>
            <DuoOutlinedIcon sx={{ color: "green" }} />
          </IconButton>
        )}
      </div>
    </ThemeProvider>
  ); 
}

export default JoinVideoButton;
