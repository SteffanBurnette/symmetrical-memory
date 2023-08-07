import { useState } from 'react';
import {Form} from "react-router-dom";
import {VideoRoom} from "../components/VideoRoom";
//import './App.css';
//import { socketTest } from './components/Socket';

function JoinVideoButton() {
  const [joined, setJoined] = useState(false)


  //if the user hasnt joined the call the button will show
  //If the user clicks the join button the videoRoom component will render.
  return (
   
    <div>

      
      <h1>WDJ Virtual Call</h1>

      {!joined&&(
        <button onClick={()=>setJoined(true)}>Join Room</button>
        

      )}

        {joined&&(
        <VideoRoom />

      )}
      
     
   
     
    
     
    </div>
    
  
);
}

export default JoinVideoButton
