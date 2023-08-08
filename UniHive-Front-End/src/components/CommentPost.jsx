import ReactDOM from "react-dom";
import React, { useState } from "react"; // Import useState from the react package

import { Divider, Avatar, Grid, Paper, TextField, Button } from "@material-ui/core";



// import "./styles.css";
function CommentPost() {

  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState(""); // State to hold the new comment

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const handleCommentChange = (event) => {
    setNewComment(event.target.value); // Update the new comment state
  };

  // const handlePostComment = () => {
  //   // Post the new comment
  //   if (newComment.trim() !== "") {
  //     setComments([...comments, newComment]); // Add new comment to the comments list
  //     setNewComment(""); // Clear the new comment input
  //   }
  // };

  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      const timestamp = new Date().toLocaleString(); // Get the current timestamp
      const updatedComment = {
        text: newComment,
        time: timestamp,
      };
      setComments([...comments, updatedComment]);
      setNewComment("");
    }
  };
  return (
    <div style={{ padding: 14 }}>
      <h1>Comments</h1>
      {/* <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Heeeelllo{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper> */}
<Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <TextField
              label="Add a comment"
              variant="outlined"
              size="small"
              fullWidth
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button variant="contained" color="primary" onClick={handlePostComment}>
              Post Comment
            </Button>
          </Grid>
        </Grid>
      </Paper>


      {/* <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar/>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
             Hello world! Lorem ipsum dolor sit amet consectetur adipisicing elit. {" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Welcome World!{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper> */}
      {/* <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <TextField
              label="Add a comment"
              variant="outlined"
              size="small"
              fullWidth
              value={comment}
              onChange={handleCommentChange}
            />
            <Button variant="contained" color="primary" onClick={handlePostComment}>
              Post Comment
            </Button>
          </Grid>
        </Grid>
      </Paper> */}
      {/* <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper> */}
    {comments.map((comment, index) => (
  <Paper key={index} style={{ padding: "40px 20px", marginTop: 10 }}>
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar alt="Remy Sharp" src={imgLink} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
        <p style={{ textAlign: "left" }}>{comment.text}</p>
        <p style={{ textAlign: "left", color: "gray" }}>
          posted {comment.time}
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
