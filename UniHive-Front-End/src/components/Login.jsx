import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authAction";
import supabase from "../../config";
const socket = io("http://localhost:3010");

function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //const history = useHistory();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Here you can handle the login logic with the email and password
    const formData = {
      email,
      password,
    };

    socket.emit("login", formData);
    dispatch(loginUser({ email, password, supabase }));
    //Sends the formdata to the server when the backend is listening for user login
    handleClose(); // Close the modal after login logic
    // Redirect to the main page after credentials are inputted
    navigate("main");
  };

  return (
    <>
      <Button
        variant="standard"
        sx={{
          my: 10,
          borderWidth: "2px",
          marginRight: 10,
          color: "#FBCB1C",
          borderColor: "#FBCB1C",
          "&:hover": {
            color: "white",
            borderColor: "#FBCB1C",
            // backgroundColor: "gray",
            borderWidth: "2px",
          },
        }}
        onClick={handleOpen}
      >
        Log in
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        sx={{ "& .MuiDialog-paper": { backgroundColor: "#1B1D21" } }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {/* Add your input fields here */}
          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="outlined"
            sx={{
              my: 5,
              borderWidth: "2px",
              color: "white",
              borderColor: "gray",
              borderWidth: "1px",
              "&:hover": {
                color: "black",
                borderColor: "black",
                backgroundColor: "#FBCB1C",
                borderWidth: "1px",
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Login;
