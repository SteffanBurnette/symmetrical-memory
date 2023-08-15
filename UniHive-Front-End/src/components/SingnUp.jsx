import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
// Sample college and major data from the JSON file
import collegesData from "../../majors.json";
import { registerUser } from "../../redux/authAction";
//const socket = io("http://localhost:3010"); //Defines the socket.io variable
import supabase from "../../config";

function SignUp() {
  const [open, setOpen] = useState(false);
  const [collegeLevel, setCollegeLevel] = useState("");
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch college data from the JSON file and set it in the state
    setColleges(collegesData);
  }, []);

  useEffect(() => {
    // Fetch majors based on the selected college and set them in the state
    if (selectedCollege) {
      const college = colleges.find(
        (col) => col.college_Name === selectedCollege
      );
      if (college) {
        setMajors(college.college_Degrees);
      }
    }
  }, [selectedCollege]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Accessing the form elements by their id attributes and retrieving their values

    //##########################################################

    dispatch(
      registerUser({
        email,
        password,
        selectedCollege,
        selectedMajor,
        fullName,
        collegeLevel,
        supabase,
      })
    );

    //navigate("main");
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backroundColor: "#FBCB1C",
        }}
        onClick={handleOpen}
      >
        Sign Up
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        sx={{ "& .MuiDialog-paper": { backgroundColor: "#1B1D21" } }}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          {/* Add your input fields here */}
          <TextField
            id="fullName"
            label="Full Name"
            variant="standard"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextField
            select
            id="college"
            label="College"
            variant="standard"
            fullWidth
            margin="normal"
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: "#1B1D21" }, // Set the background color for the dropdown
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select College
            </MenuItem>
            {colleges.map((college) => (
              <MenuItem key={college.college_Name} value={college.college_Name}>
                {college.college_Name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            id="major"
            label="Major"
            variant="standard"
            fullWidth
            margin="normal"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            disabled={!selectedCollege} // Disable until a college is selected
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: "#1B1D21" }, // Set the background color for the dropdown
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Major
            </MenuItem>
            {majors.map((major) => (
              <MenuItem key={major} value={major}>
                {major}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            id="collegeLevel"
            label="College Level"
            variant="standard"
            fullWidth
            margin="normal"
            value={collegeLevel}
            onChange={(e) => setCollegeLevel(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: { backgroundColor: "#1B1D21" }, // Set the background color for the dropdown
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              Select College Level
            </MenuItem>
            <MenuItem value="Freshman">Freshman</MenuItem>
            <MenuItem value="Sophomore">Sophomore</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </TextField>

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
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignUp;
