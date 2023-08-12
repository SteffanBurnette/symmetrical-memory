import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import collegesData from "../../majors.json";
import Divider from '@mui/material/Divider';
import io from "socket.io-client"; //Used to create connection with backend


const socket= io("http://localhost:3010");

function CreateHive({ open, onClose }) {
  const [hiveName, setHiveName] = useState('');
  const [hiveDescription, setHiveDescription] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [form, setForm]=useState();

  useEffect(() => {
    // Fetch college data from the JSON file and set it in the state
    setColleges(collegesData);
  }, []);

  useEffect(() => {
    // Fetch majors based on the selected college and set them in the state
    if (selectedCollege) {
      const college = colleges.find((col) => col.college_Name === selectedCollege);
      if (college) {
        setMajors(college.college_Degrees);
      }
    }
  }, [selectedCollege, colleges, form]);

  const handleClose = () => {
    onClose();
    setHiveName('');
    setHiveDescription('');
    setSelectedCollege("");
    setSelectedMajor("");
  };

  const handleSubmit = () => {
    // Add your logic here to handle the "Create Hive" functionality
    console.log('Hive Name:', hiveName);
    console.log('Hive Description:', hiveDescription);
    console.log('Selected College:', selectedCollege);
    console.log('Selected Major:', selectedMajor);


    const formData={hiveName, hiveDescription, selectedCollege, selectedMajor};
    // Perform any additional actions or API calls as needed
    //Emits an event to the create group connection
    setForm(formData); //Trying to have the sidebar rerender when the new group is created
    socket.emit("creategroup",formData);

  /*
    groupChatNamespace.on("connection", (socket) => {
        console.log("Client connected to /groupchat namespace");
        socket.emit("creategroup",formData);
        
        });

*/
    // Close the modal
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Create Hive</DialogTitle>
      <DialogContent>
        <TextField
          label="Hive Name"
          variant="outlined"
          fullWidth
          value={hiveName}
          onChange={(e) => setHiveName(e.target.value)}
        />
        
        <TextField
          label="Hive Description"
          variant="outlined"
          fullWidth
          value={hiveDescription}
          onChange={(e) => setHiveDescription(e.target.value)}
          multiline
          rows={3}
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

export default CreateHive;

