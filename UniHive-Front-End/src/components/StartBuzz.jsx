import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import collegesData from "../../majors.json";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'; // Import TextField from @mui/material
import io from "socket.io-client";

//Establishes a connection to our backend socket server.
//We can use this to listen to events or emit events.
const socket= io("http://localhost:3010");
/*
export const dataLoader = async () => {
  try {
    const response = await fetch('http://localhost:3011/api/data');
    if (!response.ok) {
      throw new Error('Data was not properly fetched');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
*/
export const userLoader = async () => {
  try {
    const response = await fetch('http://localhost:3011/users');
    if (!response.ok) {
      throw new Error('Data was not properly fetched');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching data');
  }
};



function StartBuzz({ open, onClose }) {
  const [selectedName, setSelectedName] = useState(null);
  const [buzzdata, setBuzzData] = useState(null);


  React.useEffect(() => {
    async function fetchData() {
      const loadedData = await userLoader();
      console.log(loadedData);
      setBuzzData(loadedData);
    }

    fetchData();
  }, []);

  const handleCloseModal = () => {
    onClose();
    //setSelectedName('');
  };

  const handleSubmit = () => {
    // You can access the selected name using the selectedName state variable
    console.log('Selected Name:', selectedName);
    socket.emit("selectedBuzz",selectedName);
    socket.on("Buzzname", (data) => {
      // Handle received data here
      console.log("Received Buzzname data:", data);
      // Update UI or perform actions based on the data
    });
    
    // Perform any other actions or API calls as needed

    // Close the modal
    handleCloseModal();
  };




  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs">
      <DialogTitle>Choose a Name</DialogTitle>
      <DialogContent>
        <Autocomplete
          id="name"
          options={buzzdata}
          getOptionLabel={(buzzdata) => buzzdata.name}
          value={selectedName}
          onChange={(event, newValue) => setSelectedName(newValue)}
          renderInput={(params) => <TextField {...params} label="Select a Name" variant="outlined" />}
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StartBuzz;