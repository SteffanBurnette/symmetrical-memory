import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {io} from "socket.io-client";

// Sample college and major data from the JSON file
import collegesData from "../../majors.json";

const socket=io(); //Defines the socket.io variable

function SignUp() {
  const [open, setOpen] = useState(false);
  const [collegeLevel, setCollegeLevel] = useState("");
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const navigate= useNavigate();

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
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("College Level:", collegeLevel);
    console.log("Selected College:", selectedCollege);
    console.log("Selected Major:", selectedMajor);

    //##########################################################
  
    // Get the form data from the state
    const formData = {
      fullName,
      email,
      password,
      confirmPassword,
      collegeLevel,
      selectedCollege,
      selectedMajor,
    };


  //Sends the formdata to the server when the backend is listening for user signup
  socket.emit('signup', formData);
  navigate("main");


    //Axios used to send data
/*
    try {
      // Send the form data to the backend API endpoint using Axios
      const response = await axios.post(
        "http://localhost:3010/signup",
        formData
      );

      // Log the response from the backend (optional)
      console.log(response.data);

      // Close the dialog (optional)
      handleClose();
      navigate("main");
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }
*/

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
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            select
            id="college"
            label="College"
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
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

// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

// function SignUp() {
//   const [open, setOpen] = useState(false);
//   const [collegeLevel, setCollegeLevel] = useState("");

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Accessing the form elements by their id attributes and retrieving their values
//     const fullName = document.getElementById("fullName").value;
//     const college = document.getElementById("college").value;
//     const major = document.getElementById("major").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//   };

//   return (
//     <>
//       <Button
//         variant="outlined"
//         sx={{//styling
//           my: 10,//margin vertical
//           px:8,
//           marginRight: 8,
//           borderWidth: "2px",
//           color: "#FBCB1C",
//           borderColor: "#FBCB1C",
//           "&:hover": {
//             color: "black",
//             borderColor: "#FBCB1C",
//             backgroundColor: "#FBCB1C",
//             borderWidth: "2px",
//           },
//         }}
//         onClick={handleOpen}
//       >
//         Sign Up
//       </Button>

//       <Dialog open={open} onClose={handleClose} maxWidth="xs">
//         <DialogTitle>Sign Up</DialogTitle>
//         <DialogContent>
//           {/* Add your input fields here */}
//           <TextField
//             id="fullName"
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />

//           <TextField
//             id="college"
//             label="College"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             defaultValue="CUNY - College Of Staten Island"
//             InputProps={{
//               readOnly: true, // Prevents users from editing the input
//               sx: {
//                 color: "gray", // Set the text color to gray
//               },
//             }}
//           />

//           {/* Replace the College Level TextField with the Select component */}
//           <TextField
//             id = "collegeLevel"
//             select
//             label="College Level"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={collegeLevel}
//             onChange={(e) => setCollegeLevel(e.target.value)}
//           >
//             {/* Add the options for the dropdown menu */}
//             <MenuItem value="Freshman">Freshman</MenuItem>
//             <MenuItem value="Sophomore">Sophomore</MenuItem>
//             <MenuItem value="Junior">Junior</MenuItem>
//             <MenuItem value="Senior">Senior</MenuItem>
//           </TextField>

//           <TextField
//             id = "major"
//             label="Major"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             id = "email"
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             id = "password"
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             id = "confirmPassword"
//             label="Confirm Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>

//         <Button sx={{ color: "black" }} onClick={handleSubmit}>Submit</Button>
//       </Dialog>
//     </>
//   );
// }

// export default SignUp;
