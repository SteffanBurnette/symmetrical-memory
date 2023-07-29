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

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          my: 10,
          marginRight: 10,
          color: "#FBCB1C",
          borderColor: "#FBCB1C",
          "&:hover": {
            color: "black",
            borderColor: "#FBCB1C",
            backgroundColor: "#FBCB1C",
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
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
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
            label="Major"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <Button sx={{ color: "black" }}>Submit</Button>
      </Dialog>
    </>
  );
}

export default SignUp;