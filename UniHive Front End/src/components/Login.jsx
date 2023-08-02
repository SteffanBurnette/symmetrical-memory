import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

function Login() {

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //const history = useHistory();
const navigate= useNavigate();

const formData={username, password};

  const handleLogin = async () => {
    // Here you can handle the login logic with the email and password
    console.log("Username:",username);
    console.log("Password:", password);


    try {
      // Send the form data to the backend API endpoint using Axios
      const response = await axios.post("http://localhost:3010/login", formData);

      // Log the response from the backend (optional)
      console.log(response.data);

      // Close the dialog (optional)
      handleClose();
     
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }

   
    handleClose(); // Close the modal after login logic
     // Redirect to the main page
     navigate("main");
    // history.push('/');
  };




  return (
    <>
      <Button
        variant="outlined"
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
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
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
