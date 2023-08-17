import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import io from "socket.io-client";
import { BiX } from "react-icons/bi";
import theme from "../Themes/theme.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const socket = io("http://localhost:3010");

function CommentPost({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [socketCom, setSocketCom] = useState([]);
  const [users, setUsers]=useState("");
    const [fetchingComments, setFetchingComments] = useState(false);

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  socket.on("getCommentUser", (user)=>{
       setUsers(user);
  })

  socket.on("receivePostComments", (data) => {
    setSocketCom(data);
     socket.emit("getUserOfComment" ,(socketCom.userId));
    // Only emit getPostComments if you're not currently fetching comments
    if (!fetchingComments) {
      //socket.emit("getPostComments");
    }
  });
  
socket.on("returnCommentuser",(data)=>{
  setUsers(data);
})


  const handlePostComment = () => {
    try {
      const timestamp = new Date().toLocaleString();
      const updatedComment = {
        pid: postId,
        text: newComment,
        time: timestamp,
      };

      socket.emit("createComment", updatedComment);
      setComments((prev) => [...prev, updatedComment]);
      setNewComment("");
      socket.emit("getPostComments");
    } catch (e) {
      console.log("This is the create comment error: " + e);
    }
  };

  
  const customTheme = extendTheme({
    styles: {
      global: {
        body: {
          backgroundColor: "black",
          color: "white",
        },
      },
    },
  });


  return (
    <ChakraProvider theme={customTheme}>
      <Box padding={4} maxW="lg" border="1px solid white" borderRadius="md">
        <h1>Comments</h1>

        <Box padding="20px 20px" marginTop={1}>
          <Grid container>
            <Grid item>
              <Avatar />
            </Grid>
            <Grid justifyContent="left" item xs>
              <Input
                placeholder="Add a comment"
                size="sm"
                value={newComment}
                onChange={handleCommentChange}
              />
              <Button colorScheme="blue" onClick={handlePostComment}>
                Post Comment
              </Button>
            </Grid>
          </Grid>
        </Box>

        {socketCom.map((comment) => (
          <Box
            key={comment.id}
            padding="20px"
            marginTop={3}
            border="1px solid white"
            borderRadius="md" // Add an outline around each comment
          >
            <Grid container>
              <Grid item>
                <Avatar src={imgLink} />
              </Grid>
              <Grid justifyContent="center" item xs>
                <h4 style={{ margin: 0, textAlign: "left" }}>{users}</h4>
                <p style={{ textAlign: "center" }}>{comment.content}</p>
                <Button leftIcon={<BiX />} />
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted {comment.createdAt}
                </p>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </ChakraProvider>
  );

}

export default CommentPost;
