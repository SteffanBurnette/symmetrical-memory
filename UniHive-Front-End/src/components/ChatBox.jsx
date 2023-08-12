import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';
import JoinVideoButton from './JoinVideoButton';
import io from "socket.io-client";


const socket= io("http://localhost:3010");


export const getMSG=()=>{
    socket.emit("getChatHistory");
  }

function ChatBox({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadmsg, setLoadMsg]=useState([]);




  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
    socket.emit("getChatHistory");
    socket.on("conversation",(data)=>{
        setLoadMsg(data);
    })
  };


  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {

      setMessages([...messages, newMessage]);
      console.log(messages+" This is the newMessages: "+newMessage);
      console.log("This is the socket: "+ socket);
      socket.emit("directmsg",newMessage);//Emits the sent message to the backend
      setNewMessage('');
    }
}

  const handleClose = () => {
    onClose();
    setMessages('');
    setNewMessage('');
  };

  React.useEffect(()=>{
    socket.on("conversation",(data)=>{
        setLoadMsg(data);
    })
    return () => socket.off('conversation'); //Closes the connection
  },[])
  /*
socket.on("conversation",(data)=>{
    setLoadMsg(data);
})
*/

  return (
    <Paper style={styles.container} open={open} onClose={handleClose}>
    <div>
        <JoinVideoButton/>
    <Divider/>
    </div>  
      <div style={styles.chatContainer}>
        {loadmsg.map((message) => (
          <div key={message.id} style={styles.message}>
            <Typography variant="body1">{message.content}</Typography>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <TextField
          label="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          variant="outlined"
          style={styles.input}
        />
        <IconButton variant="contained" onClick={handleSendMessage} style={styles.button}>
          <SendIcon/>
        </IconButton>
      </div>
    </Paper>
  );
}

const styles = {
  container: {
    borderRadius: '8px',
    padding: '10px',
    width: '300px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
  },
  chatContainer: {
    flex: 1,
    overflowY: 'auto',
  },
  message: {
    backgroundColor: 'purple',
    borderRadius: '8px',
    padding: '8px',
    margin: '8px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: '8px',
    marginRight: '8px',
  },
  button: {
    borderRadius: '8px',
  },
  videoIcon: {
    color: 'green', // Custom icon color 
  },
};

export default ChatBox;