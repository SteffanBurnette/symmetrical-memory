import { useState } from "react";
import { Form } from "react-router-dom";
import { VideoRoom } from "../components/VideoRoom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

//import './App.css';
//import { socketTest } from './components/Socket';

// Create your theme configuration
const theme = createTheme({
  // Your theme configuration
  palette: {
    mode: "dark", // Set the theme type to dark
    primary: {
      main: "#FBCB1C", // dark grayblue = 1B1D21
    },
  },
});

function JoinVideoButton({ callState, setCallState }) {
  const [joined, setJoined] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const navigate = useNavigate();

  const handleJoinCall = () => {
    setJoined(true); // Set joined state to true
    setCallEnded(false); // Reset callEnded state to false
    //navigate("video");
  };
  const handleEndCall = () => {
    setJoined(false);
    setCallEnded(true);

    // Reset state after 3 seconds
    setTimeout(() => {
      setCallEnded(false);
    }, 3000);
  };
  //if the user hasnt joined the call the button will show
  //If the user clicks the join button the videoRoom component will render.
  return (
    <ThemeProvider theme={theme}>
      <div>
        {!joined && !callEnded && (
          <button onClick={handleJoinCall}>
            <IconButton>
              <DuoOutlinedIcon sx={{ color: "green" }} />
            </IconButton>
          </button>
        )}

        {joined && !callEnded && <VideoRoom onEndCall={handleEndCall} />}

        {callEnded && (
          <button onClick={() => setCallEnded(false)}>
            <IconButton>
              <DuoOutlinedIcon sx={{ color: "green" }} />
            </IconButton>
          </button>
        )}
      </div>
    </ThemeProvider>
  );
}

export default JoinVideoButton;
