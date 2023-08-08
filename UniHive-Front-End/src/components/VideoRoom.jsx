import React from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng'; //Imports the Agora Libary
//uses webRtc server to set up our video calls
import {useState, useEffect} from "react";
import {VideoPlayer} from "./VideoPlayer";

 

//These are the three things that we need to set up the agroa libary to connect to the server.

const APP_ID="89e81fddd6d6426e91fefdb00a495f13";
//The ID of the project on agora.
const TOKEN="007eJxTYDheZt8Vo7pi9hwXGYFvh+8t0+5tNRFb/9p+3Sct55PL2j4rMFhYploYpqWkpJilmJkYmaVaGqalpqUkGRgkmliaphkal7BeTGkIZGQw3BjLzMgAgSA+O0NoXqZHZlkqAwMA6/khMA=="; 
  //In order for the client to connect to the chat room they need to have a token
const CHANNEL="UniHive";
//The name of the channel

//We need to create a client to connect to the chatroom.
const client= AgoraRTC.createClient({
    
    mode:'rtc', //"rtc": Sets the channel profile as communication. 
    //It is used for a one-on-one call or a group call where all users in the channel can converse freely.
    codec:'vp8',
    //The codec that the Web browser uses for encoding. Use VP8 for encoding.


});


export const VideoRoom=()=>{

    const [users, setUsers]=useState([]);
    //Keeps track of our tracks so that we can clean them up later (Audio/video tracks).
    const [localTracks, setLocalTracks]=useState([]);


      async function handleUserJoined(user, mediaType){
        await client.subscribe(user, mediaType);


        //Allows multiple users to join the same videocall by adding them to the array/stack of users.
        if(mediaType==="video"){

            setUsers((previousUsers)=>[...previousUsers, user]);

        }

        if(mediaType==="audio"){
           user.audioTrack.play();

          

        }


    }

    const handleUserLeft=(user)=>{
         //Filters the users that leave out of the array so that their info does not still show.
         //Finds the uid of the user that left and removes them.
         setUsers((previousUsers)=>
         previousUsers.filter((u)=>u.uid !== user.uid)
         );


    };

    useEffect(()=>{
        //A listener that keeps track of when a user has joined. Will envoke the function once the user joins.
        client.on('user-published', handleUserJoined);
        //A listener that waits for when a user leaves to envoke the handleUserLeft callback
        client.on('user-left', handleUserLeft);


        //NOTE that we can use async/await here instead of promise chaining.

        //Tells the browser to connect to the agora.io server
        //We can provide a uid(user id) in the last spot but for now i just used null.
        client.join(APP_ID, CHANNEL, TOKEN, null)
        .then((uid)=>
           Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
        ).then(([tracks, uid])=>{//Tracks are objects that describe the audio in our video
            const[audioTrack, videoTrack]=tracks; //Index 0 is audio, index 1 is video
            setLocalTracks(tracks);//Stores the tracks in our state
            setUsers((previousUsers)=>[...previousUsers, {
                uid,
                videoTrack, //Displays the video on the page.
                audioTrack,
            },]);
            client.publish(tracks);// Will tell every other user on the webcam


            return () =>{
               //Cleans up the tracks
               for(let localTrack of localTracks){
                //Stops the page from consuming the webcam and/or mics.
                localTrack.stop();
                localTrack.close();
               }


                //Turns off the event listeners.
                client.off('user-published', handleUserJoined);
                client.off('user-left', handleUserLeft);

                //Unpublishes your tracks when you leave the chat room.
                //client.leave informs agroa that you no longer want to be connected.
                client.unpublish(tracks).then(()=> client.leave());
            }

        }
            )
        //This is a Promise Chain

    }, [])



    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            Video Room

            <div style={{display:'grid', gridTemplateColumns:'repeat(2,200px)'}}>
            {users.map((user)=>( 
            <VideoPlayer key={user.uid} user={user} />
            ))}
           
           </div>

        </div>

    );
};