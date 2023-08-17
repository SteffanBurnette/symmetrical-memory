import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng"; //Imports the Agora Libary
//uses webRtc server to set up our video calls
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

// Create a selector function to get the user's email
export const selectUserEmail = createSelector(
  (state) => state.auth.userInfo,
  (userInfo) => userInfo?.email || null
);


//Takes in a user because we will need to display the video of every user
export const VideoPlayer = ({ user }) => {
  //The ref is useful for getting the lower level dom object
  const ref = useRef();
  const dispatch= useDispatch();
  const email= useSelector((state)=>{
    state.auth.email;
  })
  const userEmail = useSelector(selectUserEmail);

  //Tells the page to play using teh agora libary
  useEffect(() => {
    //Will create a video Player inside of the current dom element thanks to ref.current
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      Uid:{userEmail}
      <div ref={ref} style={{ width: "350px", height: "350px"}}></div>
    </div>
  );
};
