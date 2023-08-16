import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng"; //Imports the Agora Libary
//uses webRtc server to set up our video calls
import { useState, useEffect, useRef } from "react";

//Takes in a user because we will need to display the video of every user
export const VideoPlayer = ({ user }) => {
  //The ref is useful for getting the lower level dom object
  const ref = useRef();

  //Tells the page to play using teh agora libary
  useEffect(() => {
    //Will create a video Player inside of the current dom element thanks to ref.current
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      Uid:{user.uid}
      <div ref={ref} style={{ width: "250px", height: "250px"}}></div>
    </div>
  );
};
