import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function SignUp() {
  const [open, setOpen] = useState(false);
  const [collegeLevel, setCollegeLevel] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Accessing the form elements by their id attributes and retrieving their values
    const fullName = document.getElementById("fullName").value;
    const college = document.getElementById("college").value;
    const major = document.getElementById("major").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    


  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{//styling
          my: 10,//margin vertical
          px:8,
          marginRight: 8,
          borderWidth: "2px",
          color: "#FBCB1C",
          borderColor: "#FBCB1C",
          "&:hover": {
            color: "black",
            borderColor: "#FBCB1C",
            backgroundColor: "#FBCB1C",
            borderWidth: "2px",
          },
        }}
        onClick={handleOpen}
      >
        Sign Up
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          {/* Add your input fields here */}
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="college"
            label="College"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue="CUNY - College Of Staten Island"
            InputProps={{
              readOnly: true, // Prevents users from editing the input
              sx: {
                color: "gray", // Set the text color to gray
              },
            }}
          />

          {/* Replace the College Level TextField with the Select component */}
          <TextField
            id = "collegeLevel"
            select
            label="College Level"
            variant="outlined"
            fullWidth
            margin="normal"
            value={collegeLevel}
            onChange={(e) => setCollegeLevel(e.target.value)}
          >
            {/* Add the options for the dropdown menu */}
            <MenuItem value="Freshman">Freshman</MenuItem>
            <MenuItem value="Sophomore">Sophomore</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </TextField>

          <TextField
            id = "major"
            label="Major"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id = "email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id = "password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id = "confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <Button sx={{ color: "black" }} onClick={handleSubmit}>Submit</Button>
      </Dialog>
    </>
  );
}

export default SignUp;