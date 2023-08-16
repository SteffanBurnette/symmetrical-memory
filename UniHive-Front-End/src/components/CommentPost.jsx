import ReactDOM from "react-dom";
import React, { useState } from "react"; // Import useState from the react package
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import io from "socket.io-client";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const socket = io("http://localhost:3010");

// import "./styles.css";
function CommentPost(postId) {
  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState(""); // State to hold the new comment
  const [socketCom, setSocketCom] = useState([]);

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const handleCommentChange = (event) => {
    //event.handleDefault;
    setNewComment(event.target.value); // Update the new comment state
  };

  socket.on("receivePostComments", (data) => {
    console.log(data);
    setSocketCom(data);
    //socket.emit("getPostComments");
  });

  const handlePostComment = () => {
    try {
      const timestamp = new Date().toLocaleString(); // Get the current timestamp
      const updatedComment = {
        pid: postId,
        text: newComment,
        time: timestamp,
      };
      console.log(updatedComment);
      socket.emit("createComment", updatedComment); //Creates the comment
      setComments((prev) => [...prev, updatedComment]);
      
      console.log(socketCom);  
      setNewComment("");
      socket.emit("getPostComments");
    } catch (e) {
      console.log("This is the create comment error: " + e);
    }
  };

  // onSubmit={handleSubmit}
  return (
    <div style={{ padding: 14 }}>
      <h1>Comments</h1>

      <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <TextField
              label="Add a comment"
              variant="standard"
              size="small"
              fullWidth
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostComment}
            >
              Post Comment
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {socketCom.map((comment) => (
        <Paper key={comment.id} style={{ padding: "40px 20px", marginTop: 10 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={imgLink} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>Hady M Bah</h4>
              <p style={{ textAlign: "left" }}>{comment.content}</p>
              <Button><HighlightOffIcon/></Button>
              <p style={{ textAlign: "left", color: "gray" }}>
                posted {comment.createdAt}
              </p>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default CommentPost;
// const rootElement = document.getElementById("root");
