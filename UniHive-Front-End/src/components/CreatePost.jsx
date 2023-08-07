import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import io from "socket.io-client";

const socket = io("http://localhost:3010");

function CreatePost({ open, onClose }) {
    const [postContent, setPostContent] = useState('');
  
    const handleClose = () => {
      onClose();
      setPostContent('');
    };
  
    const handleSubmit = () => {
      const formData = {
        postContent,
      };
  
      socket.emit("createPost", formData);
  
      handleClose();
    };
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Post Content"
            variant="outlined"
            fullWidth
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default CreatePost;
