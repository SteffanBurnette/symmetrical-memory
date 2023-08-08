import { useState } from "react";
import { Form } from "react-router-dom";
import { VideoRoom } from "../components/VideoRoom";
import { TextField, Button, Paper, Typography, Divider, IconButton } from '@mui/material';
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';
//import './App.css';
//import { socketTest } from './components/Socket';

function JoinVideoButton() {
  const [joined, setJoined] = useState(false);

  //if the user hasnt joined the call the button will show
  //If the user clicks the join button the videoRoom component will render.
  return (
    <div>

      {!joined && (
        <button onClick={() => setJoined(true)}>
          <IconButton>
            <DuoOutlinedIcon sx={{color: 'green'}}/>
          </IconButton>
        </button>
      )}

      {joined && <VideoRoom />}
    </div>
  );
} 

export default JoinVideoButton;