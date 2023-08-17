import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useEffect } from "react";
import { VideoPlayer } from "./VideoPlayer";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const APP_ID = "89e81fddd6d6426e91fefdb00a495f13";
const TOKEN =
  "007eJxTYGjXtmL+2rD+a733/2dT1MMD/C1W/5ih8yn28eHWBZ4z7AIVGCwsUy0M01JSUsxSzEyMzFItDdNS01KSDAwSTSxN0wyN64/dSWkIZGTYWf2MgREKQXx2htC8TI/MslQGBgA5DiMI";
const CHANNEL = "UniHive";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export const VideoRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoStopped, setIsVideoStopped] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);

  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#FBCB1C",
      },
    },
  });

  async function handleUserJoined(user, mediaType) {
    // ... (previous handleUserJoined logic)
  }

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  const handleEndCall = () => {
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
    }
    client.unpublish(localTracks);
    client.leave();

    setIsCallEnded(true); // Set the call ended state to true
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);

        return () => {
          for (let localTrack of localTracks) {
            localTrack.stop();
            localTrack.close();
          }

          client.off("user-published", handleUserJoined);
          client.off("user-left", handleUserLeft);

          client.unpublish(tracks).then(() => client.leave());
        };
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isCallEnded ? null : (
        <div style={{ position: "absolute", top: -315, right: 450 }}>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,350px)",
                gridGap: "10px",
                border: "2px solid purple",
                backgroundColor: "black",
              }}
            >
              {users.map((user) => (
                <VideoPlayer key={user.uid} user={user} />
              ))}
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {!isCallEnded && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CallEndIcon />}
                  onClick={() => handleEndCall()}
                >
                  Leave Call
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

// import React from "react";
// import AgoraRTC from "agora-rtc-sdk-ng"; //Imports the Agora Libary
// //uses webRtc server to set up our video calls
// import { useState, useEffect } from "react";
// import { VideoPlayer } from "./VideoPlayer";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import { Button } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// //These are the three things that we need to set up the agroa libary to connect to the server.

// const APP_ID = "89e81fddd6d6426e91fefdb00a495f13";
// //The ID of the project on agora.
// const TOKEN =
//   "007eJxTYGjXtmL+2rD+a733/2dT1MMD/C1W/5ih8yn28eHWBZ4z7AIVGCwsUy0M01JSUsxSzEyMzFItDdNS01KSDAwSTSxN0wyN64/dSWkIZGTYWf2MgREKQXx2htC8TI/MslQGBgA5DiMI";
// //In order for the client to connect to the chat room they need to have a token
// const CHANNEL = "UniHive";
// //The name of the channel

// //We need to create a client to connect to the chatroom.
// const client = AgoraRTC.createClient({
//   mode: "rtc", //"rtc": Sets the channel profile as communication.
//   //It is used for a one-on-one call or a group call where all users in the channel can converse freely.
//   codec: "vp8",
//   //The codec that the Web browser uses for encoding. Use VP8 for encoding.
// });

// export const VideoRoom = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoStopped, setIsVideoStopped] = useState(false);
//   const [isCallEnded, setIsCallEnded] = useState(false);

//   const [users, setUsers] = useState([]);
//   //Keeps track of our tracks so that we can clean them up later (Audio/video tracks).
//   const [localTracks, setLocalTracks] = useState([]);

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//       primary: {
//         main: "#FBCB1C",
//       },
//     },
//   });

//   async function handleUserJoined(user, mediaType) {
//     await client.subscribe(user, mediaType);

//     if (mediaType === "video") {
//       setUsers((previousUsers) => [...previousUsers, user]);
//       user.audioTrack.play();
//     }

//     if (mediaType === "audio") {
//       // Handle audio subscription
//     }

//     // Mute and stop video handling
//     if (user.uid === localTracks[0].getTrack().getUserId()) {
//       if (isMuted) user.audioTrack.setVolume(0);
//       if (isVideoStopped) user.videoTrack.stop();
//     }
//   }

//   const handleUserLeft = (user) => {
//     //Filters the users that leave out of the array so that their info does not still show.
//     //Finds the uid of the user that left and removes them.
//     setUsers((previousUsers) =>
//       previousUsers.filter((u) => u.uid !== user.uid)
//     );
//   };

//   const handleEndCall = () => {
//     for (let localTrack of localTracks) {
//       localTrack.stop();
//       localTrack.close();
//     }
//     client.unpublish(localTracks);
//     client.leave();
//     // Additional cleanup and state reset if needed
    
//   };

//   useEffect(() => {
//     //A listener that keeps track of when a user has joined. Will envoke the function once the user joins.
//     client.on("user-published", handleUserJoined);
//     //A listener that waits for when a user leaves to envoke the handleUserLeft callback
//     client.on("user-left", handleUserLeft);

//     //NOTE that we can use async/await here instead of promise chaining.

//     //Tells the browser to connect to the agora.io server
//     //We can provide a uid(user id) in the last spot but for now i just used null.
//     client
//       .join(APP_ID, CHANNEL, TOKEN, null)
//       .then((uid) =>
//         Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
//       )
//       .then(([tracks, uid]) => {
//         //Tracks are objects that describe the audio in our video
//         const [audioTrack, videoTrack] = tracks; //Index 0 is audio, index 1 is video
//         setLocalTracks(tracks); //Stores the tracks in our state
//         setUsers((previousUsers) => [
//           ...previousUsers,
//           {
//             uid,
//             videoTrack, //Displays the video on the page.
//             audioTrack,
//           },
//         ]);
//         client.publish(tracks); // Will tell every other user on the webcam

//         return () => {
//           //Cleans up the tracks
//           for (let localTrack of localTracks) {
//             //Stops the page from consuming the webcam and/or mics.
//             localTrack.stop();
//             localTrack.close();
//           }

//           //Turns off the event listeners.
//           client.off("user-published", handleUserJoined);
//           client.off("user-left", handleUserLeft);

//           //Unpublishes your tracks when you leave the chat room.
//           //client.leave informs agroa that you no longer want to be connected.
//           client.unpublish(tracks).then(() => client.leave());
//         };
//       });
//     //This is a Promise Chain
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{position: "absolute", top: -315, right: 450}}>
//         <div>
//           <div
//             style={{ display: "grid", gridTemplateColumns: "repeat(2,350px)", gridGap: '10px', 
//             border: "2px solid purple", backgroundColor: "black"  }}
//           >
//             {users.map((user) => (
//               <VideoPlayer key={user.uid} user={user}/>
//             ))}
//           </div>
//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             {!isCallEnded && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 startIcon={<CallEndIcon />}
//                 onClick={() => handleEndCall()}
//               >
//                 Leave Call
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// };













/**
 * The mute and stop audio button
 *   {!isCallEnded && (
    <Button
      variant="contained"
      color={isMuted ? 'default' : 'primary'}
      startIcon={<MicOffIcon />}
      onClick={() => setIsMuted((prev) => !prev)}
    >
      {isMuted ? 'Unmute' : 'Mute'}
    </Button>
  )}
  {!isCallEnded && (
    <Button
      variant="contained"
      color={isVideoStopped ? 'default' : 'primary'}
      startIcon={<VideocamOffIcon />}
      onClick={() => setIsVideoStopped((prev) => !prev)}
    >
      {isVideoStopped ? 'Start Video' : 'Stop Video'}
    </Button>
  )}
 */
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////REVIEW THIS AGORA.IO MUTE BUTTON'//////////////////
/**
   * import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './VideoChat.css'; // Import your CSS file for styling

const VideoChat = () => {
  const [localTracks, setLocalTracks] = useState({
    audioTrack: null,
    videoTrack: null,
  });
  const [remoteUsers, setRemoteUsers] = useState({});
  const [micMuted, setMicMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
  });

  useEffect(() => {
    async function setupTracksAndJoin() {
      const uid = await client.join(appId, channel, token || null);

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();

      videoTrack.play('local-player');

      await client.publish([audioTrack, videoTrack]);

      setLocalTracks({
        audioTrack,
        videoTrack,
      });
    }

    setupTracksAndJoin();

    return () => {
      if (localTracks.audioTrack) {
        localTracks.audioTrack.stop();
        localTracks.audioTrack.close();
      }
      if (localTracks.videoTrack) {
        localTracks.videoTrack.stop();
        localTracks.videoTrack.close();
      }
      client.leave();
    };
  }, []);

  useEffect(() => {
    function handleUserPublished(user, mediaType) {
      if (mediaType === 'video') {
        setRemoteUsers((prevUsers) => ({ ...prevUsers, [user.uid]: user }));
      }
    }

    function handleUserLeft(user) {
      setRemoteUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        delete updatedUsers[user.uid];
        return updatedUsers;
      });
    }

    client.on('user-published', handleUserPublished);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-left', handleUserLeft);
    };
  }, []);

  const toggleMic = () => {
    localTracks.audioTrack.setEnabled(!micMuted);
    setMicMuted(!micMuted);
  };

  const toggleVideo = () => {
    localTracks.videoTrack.setEnabled(!videoMuted);
    setVideoMuted(!videoMuted);
  };

  return (
    <div className="video-chat">
      <div className="local-player">
        <p className="player-name">Local Video</p>
        <div id="local-player" className="player"></div>
      </div>
      {Object.values(remoteUsers).map((user) => (
        <div key={user.uid} className="remote-player">
          <p className="player-name">Remote User ({user.uid})</p>
          <div id={`remote-player-${user.uid}`} className="player"></div>
        </div>
      ))}
      <div className="controls">
        <button onClick={toggleMic}>
          {micMuted ? 'Unmute Mic' : 'Mute Mic'}
        </button>
        <button onClick={toggleVideo}>
          {videoMuted ? 'Unmute Video' : 'Mute Video'}
        </button>
      </div>
    </div>
  );
};

export default VideoChat;

   */
