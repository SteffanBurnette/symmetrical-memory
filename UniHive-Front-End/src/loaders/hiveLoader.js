import react from "react";
import io from "socket.io-client";


// Client side

const socket = io(); // connect to server

async function loadData() {

  // Show loading indicator
 // showLoader(); 
  
  // Emit loadData event
  socket.emit('loadData');

  // Handle response
  socket.on('dataLoaded', (data) => {

    // Hide loading indicator
   // hideLoader();

    // Access group data
    const groups = data.groups;
    
    // Display groups...

    return groups;
  });

}

// Usage
loadData();